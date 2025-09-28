import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Shield, Users, BookOpen, Heart, Github, Target } from 'lucide-react';

export default function About() {
  const team = [
    {
      name: "Educational Team",
      role: "DeFi Education Specialists",
      description: "Dedicated to making cryptocurrency education accessible and safe."
    }
  ];

  const values = [
    {
      icon: Shield,
      title: "Safety First",
      description: "We prioritize educational safety, ensuring no real funds are ever at risk."
    },
    {
      icon: BookOpen,
      title: "Learning Focused",
      description: "Our platform is designed specifically for education, not investment advice."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Built by educators, for educators, with the community's needs in mind."
    },
    {
      icon: Target,
      title: "Evidence Based",
      description: "Content grounded in real data and documented scam patterns."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - dark / glassy */}
      <section className="relative pt-16 pb-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/5 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl" />
        </div>
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            Made with Purpose
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">RugGuard</span>
          </h1>
          <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-3xl mx-auto">
            We protect cryptocurrency investors through education and hands-on, risk-free simulations.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-300" />
              No Real Money
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-300" />
              100% Educational
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-300" />
              Community Driven
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section - glassy cards */}
      <section className="relative py-20 bg-gradient-to-b from-slate-900 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/6 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Empowering investors with practical knowledge to identify and avoid scams
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300 shadow-2xl text-center"
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/30">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{value.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section - highlighted notice */}
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Why We Built This</h2>
          </div>
          <Card className="border border-amber-400/30 bg-amber-500/10 backdrop-blur-md">
            <CardContent className="p-8">
              <p className="text-amber-100 text-lg leading-relaxed mb-6">
                In 2024, investors lost over <strong className="text-white">$2.8 billion</strong> to DeFi scams. Rug pulls accounted for a
                significant portion of those losses. Behind each statistic are real people who lost their savings.
              </p>
              <p className="text-amber-100 text-lg leading-relaxed mb-6">
                The best defense is understanding. We show exactly how scams work so you can recognize the warning signs.
              </p>
              <p className="text-amber-100 text-lg leading-relaxed">
                RugGuard provides a safe environment to experience DeFi mechanics firsthand, without risking real money.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Team Section removed per request */}

      {/* Open Source & Contact */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Open Source & Community</h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            RugGuard is open source and community-driven. Security education should be transparent and accessible to everyone.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <Button className="bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30">
              <Github className="w-5 h-5 mr-2" />
              View on GitHub
            </Button>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-left max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-white mb-3">Disclaimer</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              RugGuard is an educational tool only. No real cryptocurrency transactions occur on this platform. This tool is
              designed for learning purposes and should not be considered financial advice. Always do your own research before
              making investment decisions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
