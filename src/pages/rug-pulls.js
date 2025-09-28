import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { AlertTriangle, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";

export default function Mod1() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4 flex items-center justify-center">
      {/* Main Content */}
      <Card className="max-w-3xl w-full border-0 shadow-lg p-8">
        <CardContent className="space-y-6">
          {/* Module Header */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <BookOpen className="w-4 h-4" />
              What are Rug Pulls?
            </div>
            <h1 className="text-3xl font-bold text-slate-900 underline decoration-blue-400 mb-2">
              Understanding Rug Pull Scams in DeFi
            </h1>
            <p className="text-slate-600">
              Learn about the most common DeFi scam and how creators steal liquidity from investors.
            </p>
          </div>

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">
              What is a Rug Pull?
            </h2>
            <p className="text-slate-700 leading-relaxed">
              In the world of decentralized finance (DeFi), opportunities for
              profit often come with significant risk. Among the most notorious
              scams is the <span className="font-semibold">rug pull</span>, a
              deceptive tactic where project creators abruptly withdraw
              investors’ funds, leaving them with worthless tokens. The name
              comes from the idea of{" "}
              <span className="italic">pulling the rug out from under someone</span>
              —investors believe they are standing on solid ground, but the
              support is suddenly removed.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold text-purple-700 mb-2">
              How It Happens
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Developers create a new token and promote it as the next big
              investment opportunity. They hype the project through social
              media, flashy websites, and promises of high returns. To trade or
              provide liquidity for the token, investors pair it with a trusted
              cryptocurrency (like{" "}
              <span className="font-medium text-purple-800">Ethereum (ETH)</span>{" "}
              or a stablecoin) in a liquidity pool. Once enough investors
              contribute, the pool contains a significant amount of valuable
              cryptocurrency.
            </p>
            <p className="text-slate-700 leading-relaxed mt-2">
              The scam occurs when project creators exploit their control over
              the liquidity pool. If the smart contract lacks safeguards, they
              can withdraw all valuable tokens and leave behind worthless ones,
              collapsing the token’s price to near zero within seconds.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-semibold text-rose-700 mb-2">
              Variations of Rug Pulls
            </h2>
            <ul className="list-disc list-inside text-slate-700 space-y-1">
              <li>
                <span className="font-medium">Liquidity Theft:</span> Directly
                draining the liquidity pool.
              </li>
              <li>
                <span className="font-medium">Dump and Exit:</span> Creators
                sell large token holdings at inflated prices after hype.
              </li>
              <li>
                <span className="font-medium">Malicious Smart Contracts:</span>{" "}
                Hidden code prevents selling or alters token mechanics to favor
                developers.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-semibold text-green-700 mb-2">
              How to Protect Yourself
            </h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-slate-700 leading-relaxed">
                Stay alert for these red flags:
              </p>
              <ul className="list-disc list-inside text-slate-700 mt-2 space-y-1">
                <li>Anonymous or unverifiable development team</li>
                <li>No independent audit of the smart contract</li>
                <li>Liquidity not locked in a time-bound contract</li>
                <li>Marketing that focuses on hype over real utility</li>
              </ul>
              <p className="mt-3 text-slate-700">
                <AlertTriangle className="inline w-4 h-4 text-rose-600 mr-1" />
                Always question unrealistic promises and verify technical
                details before investing.
              </p>
            </div>
          </section>
        </CardContent>
      </Card>

    </div>
  );
}
