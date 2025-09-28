import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils/index";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
  Shield,
  BookOpen,
  BarChart3,
  AlertTriangle,
  TrendingUp,
  Users,
  CheckCircle,
  ArrowRight,
  Play,
  Gamepad2,
  Zap
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Shield,
      title: "Learn Without Risk",
      description: "Experience how rug pulls work in a completely safe environment with no real funds at stake."
    },
    {
      icon: BarChart3,
      title: "See the Math",
      description: "Understand the mechanics behind AMMs, liquidity pools, and how market manipulation actually works."
    },
    {
      icon: AlertTriangle,
      title: "Spot Red Flags",
      description: "Learn to identify warning signs and suspicious patterns before they cost you real money."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Create a Token",
      description: "Mint your own test token with customizable parameters",
      icon: Users
    },
    {
      number: "02",
      title: "Set Up Liquidity",
      description: "Create a liquidity pool and observe market dynamics",
      icon: BarChart3
    },
    {
      number: "03",
      title: "Execute & Learn",
      description: "Run rug pull simulations and analyze the outcomes",
      icon: AlertTriangle
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-4rem)] pt-16 pb-24 lg:pt-24 lg:pb-32 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
        {/* Glassy background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl" />
        </div>

        {/* Glassy overlay */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="mb-16 lg:mb-0 relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Shield className="w-4 h-4" />
                Educational Simulation Platform
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Learn About
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400"> Crypto Scams</span>
                <br />Without Getting Burned
              </h1>

              <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-xl">
                Understand how rug pulls and other cryptocurrency scams work through hands-on simulations in a completely safe environment.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/simulator">
                  <Button size="lg" className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border border-white/30 px-8 py-3">
                    <Play className="w-5 h-5 mr-2" />
                    Start Learning
                  </Button>
                </Link>
                <Link to="/learn">
                  <Button size="lg" variant="outline" className="bg-transparent backdrop-blur-md text-white border-white/30 hover:bg-white/10 px-8 py-3">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Browse Resources
                  </Button>
                </Link>
              </div>

              <div className="mt-8 flex items-center gap-6 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  No Real Money
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  100% Educational
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Open Source
                </div>
              </div>
            </div>

            <MouseFollowCard />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce select-none pointer-events-none">
          <div className="flex flex-col items-center gap-2 text-white/60">
            <span className="text-sm font-medium text-center">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-center justify-center backdrop-blur-sm bg-white/5">
              <div className="w-1 h-3 bg-white/60 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
        {/* Glassy background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/6 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Why RugGuard Works
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              The best way to understand cryptocurrency scams is to see them in action.
              Our simulator provides hands-on experience without the financial risk.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300 shadow-2xl">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/30">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Scroll Story (Apple-style sticky transitions) */}
      <section className="relative py-24 bg-gradient-to-b from-slate-800 to-slate-900">
        {/* Glassy background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              How It Works
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Scroll to explore the journey from token creation to insights
            </p>
          </div>

          {/* Sticky visual + scroll steps */}
          <ScrollStory steps={steps} />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
        {/* Glassy background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
              <div className="text-4xl font-bold text-white mb-2">$2.8B</div>
              <p className="text-white/80">Lost to DeFi scams in 2024</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
              <div className="text-4xl font-bold text-white mb-2">37%</div>
              <p className="text-white/80">Of losses from rug pulls</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
              <div className="text-4xl font-bold text-white mb-2">0</div>
              <p className="text-white/80">Real funds at risk here</p>
            </div>
          </div>
        </div>
      </section>

      {/* Investing Game Promotion */}
      <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/3 w-72 h-72 bg-green-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-yellow-500/20 backdrop-blur-md text-white border border-green-400/30 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Gamepad2 className="w-4 h-4" />
                New Interactive Game
              </div>

              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                🎮 Rugpull Simulator: The Investing Game
              </h2>

              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                Experience the wild world of crypto investing in our fun, educational game. Start with $100 and learn about risk,
                volatility, and diversification as you navigate through market events, social media pumps, and the dreaded rug pull!
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                  <div>
                    <span className="text-white font-semibold">ScamCoin (High Risk)</span>
                    <span className="text-white/70 block text-sm">Looks promising but will rugpull in the end</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0" />
                  <div>
                    <span className="text-white font-semibold">MemeCoin (Volatile)</span>
                    <span className="text-white/70 block text-sm">Swings wildly based on social media hype</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                  <div>
                    <span className="text-white font-semibold">StableCoin (Safe)</span>
                    <span className="text-white/70 block text-sm">Boring but reliable, stays around $1</span>
                  </div>
                </div>
              </div>

              <Link to="/investing-game">
                <Button size="lg" className="bg-gradient-to-r from-green-600 to-yellow-600 hover:from-green-700 hover:to-yellow-700 text-white px-8 py-3">
                  <Gamepad2 className="w-5 h-5 mr-2" />
                  Play Investing Game
                </Button>
              </Link>
            </div>

            <div className="relative">
              <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="text-center">
                      <h4 className="text-xl font-bold text-white mb-2">Game Dashboard Preview</h4>
                      <p className="text-white/70 text-sm">Portfolio: $127.50 (+27.50%)</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                          <span className="text-sm text-white/80">ScamCoin</span>
                        </div>
                        <p className="text-lg font-bold text-white">$3.20</p>
                        <p className="text-sm text-green-400">+540% 🚀</p>
                      </div>
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm text-white/80">MemeCoin</span>
                        </div>
                        <p className="text-lg font-bold text-white">$4.50</p>
                        <p className="text-sm text-yellow-400">+125% ⚡</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm border border-red-400/30 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        <span className="font-medium text-red-300">Market Alert</span>
                      </div>
                      <p className="text-sm text-red-200">
                        📰 Elon tweets about memes! 🚀<br />
                        MemeCoin surges 250%!
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-white/60">
                        🎯 Learn risk management through interactive gameplay
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Glassy background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Learn?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of users who've learned to spot crypto scams before losing real money.
              Start your risk-free education today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/investing-game">
                <Button size="lg" className="bg-gradient-to-r from-green-600 to-yellow-600 hover:from-green-700 hover:to-yellow-700 text-white px-8 py-3">
                  <Gamepad2 className="w-5 h-5 mr-2" />
                  Play Investing Game
                </Button>
              </Link>
              <Link to="/simulator">
                <Button size="lg" className="bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30 px-8 py-3">
                  <Play className="w-5 h-5 mr-2" />
                  Launch Simulator
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ScrollStory({ steps }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const stepRefs = React.useRef([]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-index'));
            if (!Number.isNaN(idx)) setActiveStep(idx);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -50% 0px",
        threshold: 0.4,
      }
    );

    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const ActiveIcon = steps[activeStep]?.icon || Shield;

  return (
    <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
      {/* Sticky Visual */}
      <div className="relative">
        <div className="md:sticky md:top-24">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl blur-2xl -z-10" />
            <Card className="border border-white/20 shadow-2xl bg-white/10 backdrop-blur-md">
              <CardContent className="p-10">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center mb-6 transition-all duration-500">
                    <ActiveIcon className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-sm uppercase tracking-widest text-white/70 mb-2">Step {steps[activeStep]?.number}</p>
                  <h3 className="text-2xl font-bold text-white mb-3">{steps[activeStep]?.title}</h3>
                  <p className="text-white/80 leading-relaxed max-w-md">
                    {steps[activeStep]?.description}
                  </p>
                  <div className="mt-8 grid grid-cols-2 gap-4 w-full">
                    <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-4 text-left">
                      <p className="text-xs text-white/70">Progress</p>
                      <p className="text-lg font-semibold text-white">{activeStep + 1} / {steps.length}</p>
                    </div>
                    <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-4 text-left">
                      <p className="text-xs text-white/70">Focus</p>
                      <p className="text-lg font-semibold text-white">{steps[activeStep]?.title}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-6 hidden md:flex items-center justify-center gap-2 text-white/60">
            <span className="text-xs">Scroll</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Scroll Steps */}
      <div className="flex flex-col will-change-transform">
        {steps.map((step, index) => {
          const isActive = activeStep === index;
          return (
            <article
              key={index}
              data-index={index}
              ref={(el) => (stepRefs.current[index] = el)}
              className="relative mb-24 last:mb-0 min-h-[85vh] flex items-center"
            >
              <div
                className={`w-full rounded-3xl p-8 md:p-12 transition-all duration-500 backdrop-blur-md border translate-z-0 ${isActive
                    ? 'bg-white/25 border-white/40 shadow-2xl ring-2 ring-cyan-300/40 scale-[1.01]'
                    : 'bg-white/8 border-white/15 opacity-70'
                  }`}
              >
                <div className="flex items-start gap-6">
                  <div className={`text-5xl font-bold transition-colors ${isActive ? 'text-white/90' : 'text-white/40'}`}>
                    {step.number}
                  </div>
                  <div>
                    <h4 className={`text-2xl font-semibold transition-colors ${isActive ? 'text-white' : 'text-white/70'} mb-3`}>
                      {step.title}
                    </h4>
                    <p className={`leading-relaxed mb-6 transition-colors ${isActive ? 'text-white/85' : 'text-white/60'}`}>
                      {step.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {index === 0 && <Badge>Custom supply</Badge>}
                      {index === 1 && <Badge>Pool ratio</Badge>}
                      {index === 2 && <Badge variant="destructive">Risk factors</Badge>}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function Badge({ children, variant }) {
  const base = "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border";
  const styles =
    variant === "destructive"
      ? "bg-rose-500/20 text-rose-300 border-rose-400/30"
      : "bg-white/20 text-white border-white/30";
  return <span className={`${base} ${styles}`}>{children}</span>;
}

function MouseFollowCard() {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = React.useState(false);
  const cardRef = React.useRef(null);

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      if (cardRef.current && isHovering) {
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) * 0.15;
        const deltaY = (e.clientY - centerY) * 0.15;

        setMousePosition({ x: deltaX, y: deltaY });
      }
    };

    if (isHovering) {
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovering]);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className="relative cursor-pointer perspective-1000"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-3xl blur-3xl -m-4" />
      <Card
        className={`relative bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl transition-all duration-300 ease-out ${isHovering ? 'shadow-3xl bg-white/15' : ''
          }`}
        style={{
          transform: isHovering
            ? `translate(${mousePosition.x}px, ${mousePosition.y}px) rotateX(${mousePosition.y * -0.1}deg) rotateY(${mousePosition.x * 0.1}deg)`
            : 'translate(0px, 0px) rotateX(0deg) rotateY(0deg)'
        }}
      >
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">ScamCoin Pool</h3>
              <div className="bg-red-500/20 backdrop-blur-sm text-red-300 border border-red-400/30 px-3 py-1 rounded-full text-sm">
                Suspicious Activity
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <p className="text-sm text-white/70">Token Reserve</p>
                <p className="text-2xl font-bold text-white">1,000,000</p>
                <p className="text-sm text-green-400">↓ -98%</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <p className="text-sm text-white/70">SOL Reserve</p>
                <p className="text-2xl font-bold text-white">100</p>
                <p className="text-sm text-red-400">↓ -95%</p>
              </div>
            </div>

            <div className="bg-amber-500/20 backdrop-blur-sm border border-amber-400/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <p className="font-medium text-amber-300">Rug Pull Detected</p>
              </div>
              <p className="text-sm text-amber-200">
                95% of liquidity removed by pool creator
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}