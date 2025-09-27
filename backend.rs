use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount, Transfer};

declare_id!("YourProgramPublicKeyHere1111111111111111111111");

#[program]
pub mod rugpull_simulator {
    use super::*;

    pub fn initialize_pool(ctx: Context<InitializePool>, amount_token: u64, amount_sol: u64) -> Result<()> {
        // Store initial liquidity
        let pool = &mut ctx.accounts.pool;
        pool.token_reserve = amount_token;
        pool.sol_reserve = amount_sol;
        pool.authority = ctx.accounts.initializer.key();
        Ok(())
    }

    pub fn swap(ctx: Context<Swap>, is_buy: bool, amount_in: u64) -> Result<()> {
        let pool = &mut ctx.accounts.pool;

        // Constant product: x * y = k
        let (mut token_reserve, mut sol_reserve) = (pool.token_reserve, pool.sol_reserve);

        if is_buy {
            // User provides SOL, receives tokens
            let sol_in = amount_in;
            let new_sol_reserve = sol_reserve + sol_in;
            let new_token_reserve = (token_reserve * sol_reserve) / new_sol_reserve;

            let tokens_out = token_reserve - new_token_reserve;

            // Update reserves
            pool.token_reserve = new_token_reserve;
            pool.sol_reserve = new_sol_reserve;

            msg!("Swapped SOL for {} tokens", tokens_out);
        } else {
            // User provides tokens, receives SOL
            let token_in = amount_in;
            let new_token_reserve = token_reserve + token_in;
            let new_sol_reserve = (sol_reserve * token_reserve) / new_token_reserve;

            let sol_out = sol_reserve - new_sol_reserve;

            // Update reserves
            pool.token_reserve = new_token_reserve;
            pool.sol_reserve = new_sol_reserve;

            msg!("Swapped tokens for {} SOL", sol_out);
        }
        Ok(())
    }

    pub fn rug_pull(ctx: Context<RugPull>) -> Result<()> {
        let pool = &mut ctx.accounts.pool;

        require_keys_eq!(ctx.accounts.authority.key(), pool.authority, CustomError::Unauthorized);

        let drained_sol = pool.sol_reserve;
        let drained_tokens = pool.token_reserve;

        pool.sol_reserve = 0;
        pool.token_reserve = 0;

        msg!("Liquidity drained! {} SOL and {} tokens removed.", drained_sol, drained_tokens);

        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializePool<'info> {
    #[account(init, payer = initializer, space = 8 + 40)]
    pub pool: Account<'info, PoolState>,

    #[account(mut)]
    pub initializer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Swap<'info> {
    #[account(mut)]
    pub pool: Account<'info, PoolState>,
}

#[derive(Accounts)]
pub struct RugPull<'info> {
    #[account(mut)]
    pub pool: Account<'info, PoolState>,
    pub authority: Signer<'info>,
}

#[account]
pub struct PoolState {
    pub token_reserve: u64,
    pub sol_reserve: u64,
    pub authority: Pubkey,
}

#[error_code]
pub enum CustomError {
    #[msg("Unauthorized action.")]
    Unauthorized,
}