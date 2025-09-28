import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { AlertTriangle, BookOpen } from "lucide-react";

export default function Mod1() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-12 px-4 flex items-center justify-center">
      {/* Main Content */}
      <Card className="max-w-3xl w-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl p-8">
        <CardContent className="space-y-6">
          {/* Module Header */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <BookOpen className="w-4 h-4" />
              Liquidity Locks
            </div>
            <h1 className="text-3xl font-bold text-white underline decoration-green-400 mb-2">
              Understanding Liquidity Locks in DeFi
            </h1>
            <p className="text-white/70">
              How liquidity locks work and why they're important for project credibility.
            </p>
          </div>

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-semibold text-green-300 mb-2">
              What Are Liquidity Locks?
            </h2>
            <p className="text-white/80 leading-relaxed">
              In decentralized finance (DeFi), the security of the <span className="font-semibold text-white">liquidity pool</span> is crucial. A liquidity lock restricts access to funds in a pool for a predetermined period, preventing developers from performing a rug pull and leaving investors with worthless tokens.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold text-blue-300 mb-2">
              How Liquidity Locks Work
            </h2>
            <p className="text-white/80 leading-relaxed">
              Typically, a portion of a project's liquidity—including the project token and a stablecoin or major cryptocurrency—is deposited into a smart contract that enforces a <span className="font-medium text-white">time-bound restriction</span>. During this period, neither the developers nor anyone else can withdraw the funds.
            </p>
            <p className="text-white/80 leading-relaxed mt-2">
              These locks are often handled by third-party services or blockchain protocols specializing in secure smart contract custody. Because the lock is publicly verifiable on the blockchain, investors can confirm that the funds are untouchable for the set duration, ensuring transparency and trust.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-semibold text-purple-300 mb-2">
              Why Liquidity Locks Are Important
            </h2>
            <ul className="list-disc list-inside text-white/80 space-y-2">
              <li>
                <span className="font-semibold text-white">Prevents Rug Pulls:</span> Locked funds protect against sudden liquidity withdrawals, reducing the risk of instant price collapse.
              </li>
              <li>
                <span className="font-semibold text-white">Builds Investor Confidence:</span> Transparent liquidity locks signal a team's commitment to long-term project success.
              </li>
              <li>
                <span className="font-semibold text-white">Supports Market Stability:</span> Locked liquidity prevents extreme fluctuations, improving trading conditions.
              </li>
              <li>
                <span className="font-semibold text-white">Encourages Responsible Development:</span> Developers focus on genuine project growth rather than quick scam exits.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <p className="text-white/80 leading-relaxed mt-2">
              While liquidity locks do not guarantee absolute safety, they are a key factor in assessing a project's credibility. Investors should always verify the lock duration, the amount of liquidity locked, and whether the contract is handled by a reputable service. Projects with long-term, verifiable locks generally indicate a more serious and trustworthy approach.
            </p>
          </section>

          {/* Tip Box */}
          <div className="bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm rounded-lg p-4">
            <AlertTriangle className="inline w-5 h-5 text-amber-300 mr-2" />
            <span className="text-white/90">
              Checking liquidity locks is essential for mitigating risk in DeFi. Always confirm the lock parameters on-chain to ensure transparency and protect your investments.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
