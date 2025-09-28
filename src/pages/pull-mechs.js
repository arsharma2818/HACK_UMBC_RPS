import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { AlertTriangle, BookOpen } from "lucide-react";

export default function Mod3() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4 flex items-center justify-center">
      {/* Main Content */}
      <Card className="max-w-3xl w-full border-0 shadow-lg p-8">
        <CardContent className="space-y-6">
          {/* Module Header */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <BookOpen className="w-4 h-4" />
              Rug Pull Mechanics
            </div>
            <h1 className="text-3xl font-bold text-slate-900 underline decoration-red-400 mb-2">
              Mechanics of Rug Pull Scams in DeFi
            </h1>
            <p className="text-slate-600">
              Deep dive into how liquidity removal affects token prices and holder positions.
            </p>
          </div>

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-semibold text-red-700 mb-2">
              What is a Rug Pull?
            </h2>
            <p className="text-slate-700 leading-relaxed">
              In decentralized finance (DeFi), a <span className="font-semibold">rug pull</span> is one of the most notorious scams. It primarily revolves around manipulating liquidity pools to the detriment of token holders. Understanding liquidity, token pricing, and how removing liquidity can devastate investors is critical.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold text-purple-700 mb-2">
              How Rug Pulls Exploit AMMs
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Most rug pulls occur on decentralized exchanges (DEXs) that use Automated Market Makers (AMMs). Token prices are determined by the ratio of two assets in a liquidity pool, governed by the <span className="font-semibold">constant product formula</span> (<code className="bg-purple-100 px-1 rounded">x × y = k</code>). Traders swap tokens by interacting with the pool, which automatically adjusts balances to maintain this formula. Sudden changes in liquidity can immediately and drastically affect the token’s market value.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">
              How a Rug Pull Unfolds
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Project creators who retain control over the liquidity pool can withdraw large amounts of the paired asset, such as ETH or USDC. When this happens, the pool is drained, leaving only the scam token. According to the constant product formula, removing significant liquidity skews the token ratio, causing the token’s price to collapse toward zero almost instantly.
            </p>
            <p className="text-slate-700 leading-relaxed mt-2">
              For token holders, the impact is catastrophic. Tokens lose almost all value, and selling afterward yields negligible returns. Investors who believed in the legitimacy of the project suddenly hold an asset with no market utility.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-semibold text-rose-700 mb-2">
              Variations and Subtle Manipulations
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Some rug pulls involve partial liquidity drains to create panic selling or temporary liquidity locks with retained withdrawal ability. These strategies exploit the same vulnerability: the direct relationship between liquidity and token price in AMMs.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-semibold text-green-700 mb-2">
              Protecting Yourself
            </h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-slate-700 leading-relaxed">
                Key safeguards to look for:
              </p>
              <ul className="list-disc list-inside text-slate-700 mt-2 space-y-1">
                <li>Liquidity permanently locked in a trusted smart contract</li>
                <li>Project creators cannot withdraw liquidity arbitrarily</li>
                <li>Transparent smart contract audits</li>
              </ul>
              <p className="mt-3 text-slate-700">
                <AlertTriangle className="inline w-4 h-4 text-rose-600 mr-1" />
                Recognizing the connection between liquidity removal and price collapse helps investors spot red flags and navigate DeFi safely.
              </p>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
