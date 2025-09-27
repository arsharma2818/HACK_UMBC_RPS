import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
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
      description: "Mint your own test token with customizable parameters"
    },
    {
      number: "02", 
      title: "Set Up Liquidity",
      description: "Create a liquidity pool and observe market dynamics"
    },
    {
      number: "03",
      title: "Execute & Learn",
      description: "Run rug pull simulations and analyze the outcomes"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-32 bg-gradient-to-br from-slate-50 via-white to-sky-50">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
        
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
                <Link to={createPageUrl("Simulator")}>
                  <Button size="lg" className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-3">
                    <Play className="w-5 h-5 mr-2" />
                    Start Learning
                  </Button>
                </Link>
                <Link to={createPageUrl("Learn")}>
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
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-blue-500/20 rounded-3xl blur-3xl -m-4" />
              <Card className="relative bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
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

      {/* How It Works */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Learn through experience with our step-by-step simulation process
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <div className="text-5xl font-bold text-sky-100 mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-slate-600">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-slate-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
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
          <Link to={createPageUrl("Simulator")}>
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