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
              Protection Strategies
            </div>
            <h1 className="text-3xl font-bold text-white underline decoration-cyan-400 mb-2">
              How to Research and Protect Your Investments
            </h1>
            <p className="text-white/70">
              Best practices for researching projects and protecting your investments.
            </p>
          </div>

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-semibold text-cyan-300 mb-2">
              1. Verify the Team and Their Track Record
            </h2>
            <p className="text-white/80 leading-relaxed">
              Check if the project team is transparent with verifiable credentials. Research founders, developers, and advisors, looking for a credible history in other projects. <span className="font-semibold text-white">Anonymous or unverifiable teams</span> are a red flag.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold text-purple-300 mb-2">
              2. Audit the Smart Contract
            </h2>
            <p className="text-white/80 leading-relaxed">
              Independent audits analyze smart contract code for vulnerabilities and malicious functions. Be cautious if a project lacks an audit or relies on an unknown firm. Even audited contracts carry some risk, but audits significantly reduce exposure to malicious code.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-semibold text-green-300 mb-2">
              3. Check Liquidity and Locking Mechanisms
            </h2>
            <p className="text-white/80 leading-relaxed">
              Ensure a significant portion of liquidity is <span className="font-semibold text-white">locked</span> for a substantial period. Verify lock status via blockchain explorers or third-party services. Unlocked or easily withdrawable liquidity is a major warning sign.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-semibold text-orange-300 mb-2">
              4. Analyze Tokenomics
            </h2>
            <p className="text-white/80 leading-relaxed">
              Examine token supply distribution and incentives. Watch for projects where large portions favor the team, advisors, or early investors. Sustainable tokenomics feature gradual releases and fair distribution.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-semibold text-red-300 mb-2">
              5. Evaluate Community Engagement and Transparency
            </h2>
            <p className="text-white/80 leading-relaxed">
              Active communities provide early warnings about suspicious activity. Look for transparent communication through social media, forums, and updates. Avoid projects that rely solely on hype or make unrealistic promises.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-semibold text-teal-300 mb-2">
              6. Assess Project Documentation
            </h2>
            <p className="text-white/80 leading-relaxed">
              Well-documented projects provide whitepapers, roadmaps, and technical explanations. Vague or poorly written documentation can indicate inexperience or intent to mislead investors.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-semibold text-indigo-300 mb-2">
              7. Start Small and Diversify
            </h2>
            <p className="text-white/80 leading-relaxed">
              Even after thorough research, investments carry risk. Begin with a small allocation and avoid funds you cannot afford to lose. Diversifying across multiple projects reduces exposure to any single failure.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-semibold text-rose-300 mb-2">
              8. Use Trusted Platforms and Tools
            </h2>
            <p className="text-white/80 leading-relaxed">
              Engage through reputable DEXs and wallets, using blockchain explorers, analytics tools, and scam detection platforms to cross-check claims. Staying informed about threats and trends strengthens investor defenses.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-semibold text-amber-300 mb-2">
              9. Watch for Red Flags and FOMO Tactics
            </h2>
            <p className="text-white/80 leading-relaxed">
              Avoid projects that pressure you to invest quickly, promise guaranteed returns, or rely on aggressive marketing. Calm and objective evaluation is essential.
            </p>
          </section>

          {/* Tip Box */}
          <div className="bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm rounded-lg p-4">
            <AlertTriangle className="inline w-5 h-5 text-amber-300 mr-2" />
            <span className="text-white/90">
              Combining careful research, risk management, and vigilance significantly reduces the likelihood of falling victim to rug pulls or other DeFi scams. Skepticism, verification, and disciplined decision-making are key to protecting your investments.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
