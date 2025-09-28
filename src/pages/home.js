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
  Play
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
      <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-32 bg-gradient-to-br from-slate-50 via-white to-sky-50 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 via-transparent to-blue-500/5 animate-pulse-slow" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="mb-16 lg:mb-0">
              <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
                <Shield className="w-4 h-4" />
                Educational Simulation Platform
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Learn About
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600"> Crypto Scams</span>
                <br />Without Getting Burned
              </h1>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-xl">
                Understand how rug pulls and other cryptocurrency scams work through hands-on simulations in a completely safe environment.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/simulator">
                  <Button size="lg" className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-3">
                    <Play className="w-5 h-5 mr-2" />
                    Start Learning
                  </Button>
                </Link>
                <Link to="/learn">
                  <Button size="lg" variant="outline" className="px-8 py-3">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Browse Resources
                  </Button>
                </Link>
              </div>
              
              <div className="mt-8 flex items-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  No Real Money
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  100% Educational
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Open Source
                </div>
              </div>
            </div>
            
            <MouseFollowCard />
          </div>
        </div>
        
         {/* Scroll indicator */}
         <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
           <div className="flex flex-col items-center gap-2 text-slate-400">
             <span className="text-sm font-medium text-center">Scroll to explore</span>
             <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex items-center justify-center">
               <div className="w-1 h-3 bg-slate-400 rounded-full animate-pulse" />
             </div>
           </div>
         </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
              Why RugGuard Works
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              The best way to understand cryptocurrency scams is to see them in action. 
              Our simulator provides hands-on experience without the financial risk.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-sky-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Scroll Story (Apple-style sticky transitions) */}
      <section className="relative py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Scroll to explore the journey from token creation to insights
            </p>
          </div>

          {/* Sticky visual + scroll steps */}
          <ScrollStory steps={steps} />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-sky-600 mb-2">$2.8B</div>
              <p className="text-slate-600">Lost to DeFi scams in 2024</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-sky-600 mb-2">37%</div>
              <p className="text-slate-600">Of losses from rug pulls</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-sky-600 mb-2">0</div>
              <p className="text-slate-600">Real funds at risk here</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-sky-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Learn?
          </h2>
          <p className="text-xl text-sky-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who've learned to spot crypto scams before losing real money.
            Start your risk-free education today.
          </p>
          <Link to="/simulator">
            <Button size="lg" variant="outline" className="bg-white text-sky-600 hover:bg-slate-50 px-8 py-3">
              <Play className="w-5 h-5 mr-2" />
              Launch Simulator
            </Button>
          </Link>
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
            <div className="absolute inset-0 bg-gradient-to-br from-sky-400/20 to-blue-500/20 rounded-3xl blur-2xl -z-10" />
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-xl">
              <CardContent className="p-10">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-2xl bg-sky-100 flex items-center justify-center mb-6 transition-all duration-500">
                    <ActiveIcon className="w-10 h-10 text-sky-600" />
                  </div>
                  <p className="text-sm uppercase tracking-widest text-slate-500 mb-2">Step {steps[activeStep]?.number}</p>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{steps[activeStep]?.title}</h3>
                  <p className="text-slate-600 leading-relaxed max-w-md">
                    {steps[activeStep]?.description}
                  </p>
                  <div className="mt-8 grid grid-cols-2 gap-4 w-full">
                    <div className="rounded-xl bg-slate-50 p-4 text-left">
                      <p className="text-xs text-slate-500">Progress</p>
                      <p className="text-lg font-semibold text-slate-900">{activeStep + 1} / {steps.length}</p>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-4 text-left">
                      <p className="text-xs text-slate-500">Focus</p>
                      <p className="text-lg font-semibold text-slate-900">{steps[activeStep]?.title}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-6 hidden md:flex items-center justify-center gap-2 text-slate-500">
            <span className="text-xs">Scroll</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Scroll Steps */}
      <div className="flex flex-col">
        {steps.map((step, index) => (
          <article
            key={index}
            data-index={index}
            ref={(el) => (stepRefs.current[index] = el)}
            className={`relative mb-8 last:mb-0 min-h-[70vh] md:min-h-[85vh] flex items-center`}
          >
            <div className={`w-full rounded-3xl p-8 md:p-12 transition-all duration-500 ${
              activeStep === index ? 'bg-white shadow-lg' : 'bg-white/60'
            }`}>
              <div className="flex items-start gap-6">
                <div className={`text-5xl font-bold ${activeStep === index ? 'text-sky-200' : 'text-slate-200'}`}>{step.number}</div>
                <div>
                  <h4 className="text-2xl font-semibold text-slate-900 mb-3">{step.title}</h4>
                  <p className="text-slate-600 leading-relaxed mb-6">{step.description}</p>
                  <div className="flex flex-wrap gap-3">
                    {index === 0 && (
                      <Badge>Custom supply</Badge>
                    )}
                    {index === 1 && (
                      <Badge>Pool ratio</Badge>
                    )}
                    {index === 2 && (
                      <Badge variant="destructive">Risk factors</Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Badge({ children, variant }) {
  const base = "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium";
  const styles =
    variant === "destructive"
      ? "bg-rose-100 text-rose-700"
      : "bg-sky-100 text-sky-700";
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
      <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-blue-500/20 rounded-3xl blur-3xl -m-4" />
      <Card 
        className={`relative bg-white/80 backdrop-blur-sm border-0 shadow-2xl transition-all duration-300 ease-out ${
          isHovering ? 'shadow-3xl' : ''
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
              <h3 className="font-semibold text-slate-900">ScamCoin Pool</h3>
              <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                Suspicious Activity
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm text-slate-500">Token Reserve</p>
                <p className="text-2xl font-bold text-slate-900">1,000,000</p>
                <p className="text-sm text-green-600">↓ -98%</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm text-slate-500">SOL Reserve</p>
                <p className="text-2xl font-bold text-slate-900">100</p>
                <p className="text-sm text-red-600">↓ -95%</p>
              </div>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <p className="font-medium text-amber-800">Rug Pull Detected</p>
              </div>
              <p className="text-sm text-amber-700">
                95% of liquidity removed by pool creator
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}