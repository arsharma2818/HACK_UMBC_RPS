// Multi-Pool Usage Guide for Your Updated Rug Pull Simulator

// 1. POOL INITIALIZATION EXAMPLE
// Create 3 separate pools (IDs: 0, 1, 2)

const pool0Id = 0;
const pool1Id = 1; 
const pool2Id = 2;

// Derive Pool PDAs (each pool has its own account)
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

// Initialize each pool separately
await program.methods
  .initializePool(pool0Id)
  .accounts({
    // ... pool0 specific accounts
  })
  .rpc();

await program.methods
  .initializePool(pool1Id) 
  .accounts({
    // ... pool1 specific accounts
  })
  .rpc();

await program.methods
  .initializePool(pool2Id)
  .accounts({
    // ... pool2 specific accounts  
  })
  .rpc();

// 2. SWAP ON SPECIFIC POOL
// Users can swap on any pool by specifying pool_id

// Swap on Pool 0
await program.methods
  .swap(pool0Id, true, new anchor.BN(1000))
  .accounts({
    pool: pool0PDA,
    // ... other pool0 specific accounts
  })
  .rpc();

// Swap on Pool 1 (completely independent)
await program.methods
  .swap(pool1Id, false, new anchor.BN(500))
  .accounts({
    pool: pool1PDA, 
    // ... other pool1 specific accounts
  })
  .rpc();

// 3. RUG PULL SPECIFIC POOL
// Authority can drain any specific pool

// Rug pull ONLY Pool 1 (Pool 0 and 2 remain intact)
await program.methods
  .rugPull(pool1Id)
  .accounts({
    pool: pool1PDA,
    // ... pool1 vault accounts
  })
  .signers([authority])
  .rpc();

// 4. LP TOKEN MANAGEMENT PER POOL
// Each user can have LP positions in multiple pools

// User provides liquidity to Pool 0
const [userPool0Position] = PublicKey.findProgramAddressSync(
  [
    Buffer.from("user_position"),
    user.publicKey.toBuffer(), 
    Buffer.from([pool0Id])
  ],
  program.programId
);

await program.methods
  .provideLiquidity(pool0Id, new anchor.BN(2000))
  .accounts({
    pool: pool0PDA,
    userPosition: userPool0Position,
    user: user.publicKey,
  })
  .rpc();

// Same user provides liquidity to Pool 2 (separate LP position)
const [userPool2Position] = PublicKey.findProgramAddressSync(
  [
    Buffer.from("user_position"),
    user.publicKey.toBuffer(),
    Buffer.from([pool2Id]) 
  ],
  program.programId
);

await program.methods
  .provideLiquidity(pool2Id, new anchor.BN(1500))
  .accounts({
    pool: pool2PDA,
    userPosition: userPool2Position, 
    user: user.publicKey,
  })
  .rpc();

// 5. KEY BENEFITS OF MULTI-POOL DESIGN

/*
✅ INDEPENDENT POOLS
- Each pool (0, 1, 2) is completely separate
- Different tokens, different liquidity, different authorities
- Rug pulling one pool doesn't affect others

✅ EXTENSIBLE DESIGN  
- Easy to support more pools by just increasing the ID limit
- Currently limited to 3 pools (IDs 0-2) but easily changeable
- Just change: require!(pool_id < 3, CustomError::InvalidPoolId);

✅ PER-POOL LP TRACKING
- Users can provide liquidity to multiple pools
- Each pool tracks total LP supply independently
- LP tokens are pool-specific (can't use Pool 0 LPs on Pool 1)

✅ GRANULAR CONTROL
- Swap on specific pools
- Rug pull specific pools
- Query specific pool states
- Manage liquidity per pool

✅ REALISTIC AMM BEHAVIOR
- Multiple trading pairs (Pool 0: TokenA/SOL, Pool 1: TokenB/SOL, etc.)
- Independent price discovery per pool
- Separate liquidity management
*/

// 6. ERROR HANDLING
/*
The program includes custom errors:
- InvalidPoolId: If pool_id >= 3
- InsufficientLPTokens: If trying to remove more LP tokens than owned
- Unauthorized: If non-authority tries to rug pull
*/