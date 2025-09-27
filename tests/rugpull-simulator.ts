import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import {
  TOKEN_PROGRAM_ID,
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
} from "@solana/spl-token";
import { RugpullSimulator } from "../target/types/rugpull_simulator";

// Helper: print vault balances
async function logBalances(
  provider: anchor.AnchorProvider,
  label: string,
  scamVault: anchor.web3.PublicKey,
  solVault: anchor.web3.PublicKey,
  scamMint: anchor.web3.PublicKey,
  wsolMint: anchor.web3.PublicKey,
  user: anchor.web3.PublicKey
) {
  const conn = provider.connection;

  const { value: scamVaultBal } = await conn.getTokenAccountBalance(scamVault);
  const { value: solVaultBal } = await conn.getTokenAccountBalance(solVault);

  console.log(`\n=== ${label} ===`);
  console.log(`Pool scamVault: ${scamVaultBal.uiAmount}`);
  console.log(`Pool solVault:  ${solVaultBal.uiAmount}`);
}

describe("Rugpull Simulator", () => {
  const provider = anchor.AnchorProvider.local();
  anchor.setProvider(provider);

  const program = anchor.workspace
    .RugpullSimulator as Program<RugpullSimulator>;

  const connection = provider.connection;
  const wallet = provider.wallet as anchor.Wallet;

  let scamMint: anchor.web3.PublicKey;
  let wsolMint: anchor.web3.PublicKey;
  let poolPda: anchor.web3.PublicKey;
  let bump: number;
  const POOL_ID = 0; // use pool 0 for tests (supports 0,1,2)

  // Vault accounts
  let scamVault: anchor.web3.PublicKey;
  let solVault: anchor.web3.PublicKey;

  // User ATAs
  let userScamAta: anchor.web3.PublicKey;
  let userSolAta: anchor.web3.PublicKey;

  it("Initialize scam + wSOL mints", async () => {
    // Create scam mint (decimals=0 for simplicity)
    scamMint = await createMint(
      connection,
      wallet.payer,
      wallet.publicKey,
      null,
      0
    );

    // Create fake WSOL mint
    wsolMint = await createMint(
      connection,
      wallet.payer,
      wallet.publicKey,
      null,
      0
    );

    // Create user ATAs for scam + wsol
    userScamAta = (
      await getOrCreateAssociatedTokenAccount(
        connection,
        wallet.payer,
        scamMint,
        wallet.publicKey
      )
    ).address;

    userSolAta = (
      await getOrCreateAssociatedTokenAccount(
        connection,
        wallet.payer,
        wsolMint,
        wallet.publicKey
      )
    ).address;

    // Mint some fake WSOL to the user
    await mintTo(connection, wallet.payer, wsolMint, userSolAta, wallet.payer, 100);

    console.log("Created scamMint:", scamMint.toBase58());
    console.log("Created wsolMint:", wsolMint.toBase58());
    console.log("User ATAs:", {
      scamAta: userScamAta.toBase58(),
      solAta: userSolAta.toBase58(),
    });
  });

  it("Initialize pool", async () => {
    [poolPda, bump] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("pool"), Buffer.from([POOL_ID])],
      program.programId
    );

    // Create vault keypairs first (since they're marked as init in Rust)
    const scamVaultKeypair = anchor.web3.Keypair.generate();
    const solVaultKeypair = anchor.web3.Keypair.generate();

    scamVault = scamVaultKeypair.publicKey;
    solVault = solVaultKeypair.publicKey;

    // Call initialize with the vault keypairs
    await program.methods
      .initializePool(POOL_ID)
      .accounts({
        pool: poolPda,
        scamVault,
        solVault,
        scamMint,
        wsolMint: wsolMint,
        initializer: wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      } as any)
      .signers([scamVaultKeypair, solVaultKeypair])
      .rpc();

    // Mint liquidity to vaults
    await mintTo(connection, wallet.payer, scamMint, scamVault, wallet.payer, 1000);
    await mintTo(connection, wallet.payer, wsolMint, solVault, wallet.payer, 10);

    await logBalances(
      provider,
      "After Pool Init",
      scamVault,
      solVault,
      scamMint,
      wsolMint,
      wallet.publicKey
    );
  });

  it("Swap WSOL → Scam Tokens", async () => {
    await program.methods
      .swap(POOL_ID, true, new anchor.BN(1))
      .accounts({
        pool: poolPda,
        scamVault,
        solVault,
        userScamAta,
        userSolAta,
        user: wallet.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
      } as any)
      .rpc();

    await logBalances(
      provider,
      "After Swap (User bought scam tokens)",
      scamVault,
      solVault,
      scamMint,
      wsolMint,
      wallet.publicKey
    );
  });

  it("Rug Pull 💀", async () => {
    await program.methods
      .rugPull(POOL_ID)
      .accounts({
        pool: poolPda,
        scamVault,
        solVault,
        authorityScamAta: userScamAta, // scammer drains to themselves
        authoritySolAta: userSolAta,
        authority: wallet.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
      } as any)
      .rpc();

    await logBalances(
      provider,
      "After Rugpull",
      scamVault,
      solVault,
      scamMint,
      wsolMint,
      wallet.publicKey
    );
  });
});