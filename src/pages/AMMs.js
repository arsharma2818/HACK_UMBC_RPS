import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { AlertTriangle, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";

export default function Mod2() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-12 px-4 flex items-center justify-center">
      {/* Main Content */}
      <Card className="max-w-3xl w-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl p-8">
        <CardContent className="space-y-6">
          {/* Module Header */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <BookOpen className="w-4 h-4" />
              How AMMs Work
            </div>
            <h1 className="text-3xl font-bold text-white underline decoration-purple-400 mb-2">
              Understanding AMMs and Liquidity Pools
            </h1>
            <p className="text-white/70">
              Understand automated market makers, liquidity pools, and the constant product formula.
            </p>
          </div>

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-semibold text-purple-300 mb-2">
              What Are AMMs?
            </h2>
            <p className="text-white/80 leading-relaxed">
              Automated Market Makers (AMMs) are the backbone of decentralized exchanges (DEXs) like <span className="font-semibold text-white">Uniswap, SushiSwap, and PancakeSwap</span>. Instead of relying on traditional order books, AMMs use smart contracts to enable direct peer-to-peer trading. Anyone can trade or provide liquidity without a middleman, creating an open and accessible financial market.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold text-indigo-300 mb-2">
              Liquidity Pools
            </h2>
            <p className="text-white/80 leading-relaxed">
              At the heart of every AMM are <span className="font-medium text-indigo-300">liquidity pools</span>, which hold pairs of tokens—such as ETH/USDC or BTC/DAI. Instead of matching buyers and sellers, these pools allow users to swap tokens by interacting directly with the pool. Liquidity providers (LPs) deposit equal values of both tokens and earn a share of trading fees.
            </p>
            <p className="text-white/80 leading-relaxed mt-2">
              For example, depositing $1,000 of ETH and $1,000 of USDC helps create a market where others can trade between the two assets. The larger and more balanced the pool, the easier it is for traders to execute transactions with minimal <span className="italic text-white/90">slippage</span>.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-semibold text-blue-300 mb-2">
              The Constant Product Formula
            </h2>
            <p className="text-white/80 leading-relaxed">
              The key mechanism that keeps these pools functioning is the <span className="font-semibold text-white">constant product formula</span>, expressed as <code className="bg-white/20 text-white px-1 rounded">x × y = k</code>. Here, x and y represent the quantities of the two tokens in the pool, and k remains constant during trades.
            </p>
            <p className="text-white/80 leading-relaxed mt-2">
              Whenever a trade occurs, the pool automatically adjusts token ratios to maintain this constant. For example, buying ETH from an ETH/USDC pool decreases ETH, increases USDC, and slightly raises the price of ETH to keep the product unchanged.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-semibold text-emerald-300 mb-2">
              Implications & Risks
            </h2>
            <p className="text-white/80 leading-relaxed">
              Prices in an AMM are determined by <span className="font-medium text-white">supply and demand</span>. Large trades can cause higher slippage by disrupting token ratios. Liquidity providers earn fees but also face <span className="font-medium text-rose-300">impermanent loss</span>, which occurs when token prices diverge significantly.
            </p>
            <p className="text-white/80 leading-relaxed mt-2">
              Despite these risks, AMMs have revolutionized DeFi by enabling permissionless trading and passive income opportunities. Anyone can provide liquidity or trade at any time—no counterparty required.
            </p>
          </section>

          {/* Tip Box */}
          <div className="bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm rounded-lg p-4">
            <AlertTriangle className="inline w-5 h-5 text-amber-300 mr-2" />
            <span className="text-white/90">
              Understanding liquidity pools, the constant product formula, and pricing dynamics is essential for navigating DeFi safely.
            </span>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
