import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { RugpullSimulator } from "../target/types/rugpull_simulator";
import { PublicKey, Keypair, SystemProgram } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, MINT_SIZE, createInitializeMintInstruction, getMinimumBalanceForRentExemptMint, ACCOUNT_SIZE, createInitializeAccountInstruction, getMinimumBalanceForRentExemptAccount } from "@solana/spl-token";

// Multi-Pool Usage Example
export async function multiPoolExample() {
    // Configure the client to use the local cluster.
    anchor.setProvider(anchor.AnchorProvider.env());
    const program = anchor.workspace.RugpullSimulator as Program<RugpullSimulator>;
    const provider = anchor.getProvider();

    // Create keypairs for different pools
    const scamMint1 = Keypair.generate();
    const scamMint2 = Keypair.generate();
    const scamMint3 = Keypair.generate();
    const wsolMint = Keypair.generate(); // In practice, use actual WSOL mint

    const initializer = Keypair.generate();

    // Pool IDs (0, 1, 2)
    const pool0Id = 0;
    const pool1Id = 1;
    const pool2Id = 2;

    // Derive Pool PDAs
    const [pool0PDA] = PublicKey.findProgramAddressSync(
        [Buffer.from("pool"), Buffer.from([pool0Id])],
        program.programId
    );

    const [pool1PDA] = PublicKey.findProgramAddressSync(
        [Buffer.from("pool"), Buffer.from([pool1Id])],
        program.programId
    );

    const [pool2PDA] = PublicKey.findProgramAddressSync(
        [Buffer.from("pool"), Buffer.from([pool2Id])],
        program.programId
    );

    // Create Token Vaults for each pool
    const scamVault0 = Keypair.generate();
    const solVault0 = Keypair.generate();

    const scamVault1 = Keypair.generate();
    const solVault1 = Keypair.generate();

    const scamVault2 = Keypair.generate();
    const solVault2 = Keypair.generate();

    console.log("=== Multi-Pool Rug Pull Simulator Example ===");

    // 1. Initialize Pool 0
    console.log("\n1. Initializing Pool 0...");
    try {
        await program.methods
            .initializePool(pool0Id)
            .accounts({
                pool: pool0PDA,
                scamVault: scamVault0.publicKey,
                solVault: solVault0.publicKey,
                scamMint: scamMint1.publicKey,
                wsolMint: wsolMint.publicKey,
                initializer: initializer.publicKey,
                systemProgram: SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
                rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            })
            .signers([initializer, scamVault0, solVault0])
            .rpc();

        console.log("✅ Pool 0 initialized successfully!");
        console.log(`Pool 0 PDA: ${pool0PDA.toString()}`);
    } catch (error) {
        console.log("❌ Error initializing Pool 0:", error);
    }

    // 2. Initialize Pool 1
    console.log("\n2. Initializing Pool 1...");
    try {
        await program.methods
            .initializePool(pool1Id)
            .accounts({
                pool: pool1PDA,
                scamVault: scamVault1.publicKey,
                solVault: solVault1.publicKey,
                scamMint: scamMint2.publicKey,
                wsolMint: wsolMint.publicKey,
                initializer: initializer.publicKey,
                systemProgram: SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
                rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            })
            .signers([initializer, scamVault1, solVault1])
            .rpc();

        console.log("✅ Pool 1 initialized successfully!");
        console.log(`Pool 1 PDA: ${pool1PDA.toString()}`);
    } catch (error) {
        console.log("❌ Error initializing Pool 1:", error);
    }

    // 3. Initialize Pool 2
    console.log("\n3. Initializing Pool 2...");
    try {
        await program.methods
            .initializePool(pool2Id)
            .accounts({
                pool: pool2PDA,
                scamVault: scamVault2.publicKey,
                solVault: solVault2.publicKey,
                scamMint: scamMint3.publicKey,
                wsolMint: wsolMint.publicKey,
                initializer: initializer.publicKey,
                systemProgram: SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
                rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            })
            .signers([initializer, scamVault2, solVault2])
            .rpc();

        console.log("✅ Pool 2 initialized successfully!");
        console.log(`Pool 2 PDA: ${pool2PDA.toString()}`);
    } catch (error) {
        console.log("❌ Error initializing Pool 2:", error);
    }

    // 4. Example: Swap on Pool 1
    console.log("\n4. Example Swap on Pool 1...");
    const user = Keypair.generate();
    const userScamAta = Keypair.generate();
    const userSolAta = Keypair.generate();

    try {
        await program.methods
            .swap(pool1Id, true, new anchor.BN(1000)) // Buy 1000 scam tokens
            .accounts({
                pool: pool1PDA,
                scamVault: scamVault1.publicKey,
                solVault: solVault1.publicKey,
                userScamAta: userScamAta.publicKey,
                userSolAta: userSolAta.publicKey,
                user: user.publicKey,
                tokenProgram: TOKEN_PROGRAM_ID,
            })
            .signers([user])
            .rpc();

        console.log("✅ Swap on Pool 1 executed successfully!");
    } catch (error) {
        console.log("❌ Error swapping on Pool 1:", error);
    }

    // 5. Example: Rug Pull on Pool 0
    console.log("\n5. Example Rug Pull on Pool 0...");
    const authorityScamAta = Keypair.generate();
    const authoritySolAta = Keypair.generate();

    try {
        await program.methods
            .rugPull(pool0Id)
            .accounts({
                pool: pool0PDA,
                scamVault: scamVault0.publicKey,
                solVault: solVault0.publicKey,
                authorityScamAta: authorityScamAta.publicKey,
                authoritySolAta: authoritySolAta.publicKey,
                authority: initializer.publicKey,
                tokenProgram: TOKEN_PROGRAM_ID,
            })
            .signers([initializer])
            .rpc();

        console.log("🚨 RUG PULL on Pool 0 executed! All liquidity drained!");
    } catch (error) {
        console.log("❌ Error executing rug pull on Pool 0:", error);
    }

    // 6. Example: Provide Liquidity to Pool 2
    console.log("\n6. Providing Liquidity to Pool 2...");
    const lpProvider = Keypair.generate();

    const [userPositionPDA] = PublicKey.findProgramAddressSync(
        [
            Buffer.from("user_position"),
            lpProvider.publicKey.toBuffer(),
            Buffer.from([pool2Id])
        ],
        program.programId
    );

    try {
        await program.methods
            .provideLiquidity(pool2Id, new anchor.BN(5000))
            .accounts({
                pool: pool2PDA,
                userPosition: userPositionPDA,
                user: lpProvider.publicKey,
                systemProgram: SystemProgram.programId,
            })
            .signers([lpProvider])
            .rpc();

        console.log("✅ Liquidity provided to Pool 2!");
        console.log(`User Position PDA: ${userPositionPDA.toString()}`);
    } catch (error) {
        console.log("❌ Error providing liquidity to Pool 2:", error);
    }

    console.log("\n=== Multi-Pool Example Complete ===");
    console.log(`
Summary of created pools:
- Pool 0: ${pool0PDA.toString()} (Rug Pulled! 🚨)
- Pool 1: ${pool1PDA.toString()} (Had a swap transaction)
- Pool 2: ${pool2PDA.toString()} (Received liquidity)

Key Features Demonstrated:
✅ Multiple independent pools with unique IDs (0, 1, 2)
✅ Each pool has its own PDA and token vaults
✅ Swaps work on specific pools
✅ Rug pulls target specific pools
✅ LP tracking per user per pool
✅ Extensible design for more pools
  `);
}

// Account Structure Documentation
export const accountStructureExample = {
    poolState: {
        discriminator: "8 bytes",
        pool_id: "1 byte (u8)",
        scam_vault: "32 bytes (Pubkey)",
        sol_vault: "32 bytes (Pubkey)",
        scam_mint: "32 bytes (Pubkey)",
        wsol_mint: "32 bytes (Pubkey)",
        authority: "32 bytes (Pubkey)",
        total_lp_supply: "8 bytes (u64)",
        total_space: "177 bytes"
    },

    userPoolPosition: {
        discriminator: "8 bytes",
        user: "32 bytes (Pubkey)",
        pool_id: "1 byte (u8)",
        lp_tokens: "8 bytes (u64)",
        total_space: "49 bytes"
    },

    pdaDerivation: {
        pool: ["pool", pool_id_as_u8_array],
        user_position: ["user_position", user_pubkey, pool_id_as_u8_array]
    },

    functions: [
        "initialize_pool(pool_id: u8) - Creates a new pool with given ID (0-2)",
        "swap(pool_id: u8, is_buy: bool, amount_in: u64) - Swaps on specific pool",
        "rug_pull(pool_id: u8) - Drains specific pool (authority only)",
        "provide_liquidity(pool_id: u8, amount: u64) - Adds LP tokens to pool",
        "remove_liquidity(pool_id: u8, lp_amount: u64) - Removes LP tokens from pool"
    ]
};