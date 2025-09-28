import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { AlertTriangle, BookOpen } from "lucide-react";

export default function Mod4() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-12 px-4 flex items-center justify-center">
      {/* Main Content */}
      <Card className="max-w-3xl w-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl p-8">
        <CardContent className="space-y-6">
          {/* Module Header */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <BookOpen className="w-4 h-4" />
              Red Flags to Watch
            </div>
            <h1 className="text-3xl font-bold text-white underline decoration-red-400 mb-2">
              Identifying Warning Signs Before Investing
            </h1>
            <p className="text-white/70">
              Identify warning signs of potential scam projects before investing.
            </p>
          </div>

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-semibold text-red-300 mb-2">
              Anonymous or Unverified Team
            </h2>
            <p className="text-white/80 leading-relaxed">
              Projects with an <span className="font-semibold text-white">anonymous team</span> or unverifiable credentials are risky. Legitimate projects usually disclose founders, developers, and advisors. Hidden or pseudonymous teams make accountability difficult if something goes wrong.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold text-purple-300 mb-2">
              No Smart Contract Audit
            </h2>
            <p className="text-white/80 leading-relaxed">
              Independent audits by reputable firms identify vulnerabilities, malicious code, or loopholes. Projects without audits—or with unreliable audits—pose a higher risk of rug pulls and exploits.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-semibold text-blue-300 mb-2">
              Liquidity That Isn't Locked
            </h2>
            <p className="text-white/80 leading-relaxed">
              Developers can withdraw funds at any time if liquidity isn't locked in a time-bound contract or via a third-party service. Always verify liquidity lock status and duration to reduce the risk of losing funds.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-semibold text-emerald-300 mb-2">
              Excessive Hype and Unrealistic Promises
            </h2>
            <p className="text-white/80 leading-relaxed">
              Projects focusing on marketing hype over technical fundamentals are risky. Promises of guaranteed high returns, rapid growth, or insider knowledge often indicate potential scams.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-semibold text-rose-300 mb-2">
              Unusual Tokenomics or Supply
            </h2>
            <p className="text-white/80 leading-relaxed">
              Beware of disproportionate token allocations to the team or tokens that can be minted or sold at will. Such designs favor insiders at the expense of regular investors.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-semibold text-orange-300 mb-2">
              Copycat Projects
            </h2>
            <p className="text-white/80 leading-relaxed">
              Scammers often replicate successful DeFi projects with subtle differences to siphon funds. Watch for similar names, logos, or websites lacking transparency or community support.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-semibold text-indigo-300 mb-2">
              Pressure Tactics and FOMO
            </h2>
            <p className="text-white/80 leading-relaxed">
              High-pressure campaigns or fear-of-missing-out (FOMO) tactics encourage rapid investments. Urgency alone is a major warning sign.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-semibold text-teal-300 mb-2">
              Limited or Low-Quality Documentation
            </h2>
            <p className="text-white/80 leading-relaxed">
              Legitimate projects provide whitepapers, roadmaps, and technical details. Sparse or poorly written documentation often signals a deceptive project.
            </p>
          </section>

          {/* Tip Box */}
          <div className="bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm rounded-lg p-4">
            <AlertTriangle className="inline w-5 h-5 text-amber-300 mr-2" />
            <span className="text-white/90">
              Being aware of these red flags, performing due diligence, and questioning overly optimistic claims are essential to reducing the risk of rug pulls or other DeFi scams.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
