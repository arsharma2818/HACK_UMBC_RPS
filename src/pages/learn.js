import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { 
  AlertTriangle, 
  Droplets, 
  TrendingDown, 
  Shield, 
  BookOpen, 
  Eye,
  DollarSign,
  Users,
  Lock,
  Zap
} from "lucide-react";

export default function Learn() {
  const topics = [
    {
      icon: AlertTriangle,
      title: "What are Rug Pulls?",
      description: "Learn about the most common DeFi scam and how creators steal liquidity from investors.",
      difficulty: "Beginner",
      readTime: "3 min",
      color: "red",
      link: createPageUrl("Mod1")
    },
    {
      icon: Droplets,
      title: "How AMMs Work",
      description: "Understand automated market makers, liquidity pools, and the constant product formula.",
      difficulty: "Beginner", 
      readTime: "2 min",
      color: "blue",
      link: createPageUrl("Mod2")
    },
    {
      icon: TrendingDown,
      title: "Rug Pull Mechanics",
      description: "Deep dive into how liquidity removal affects token prices and holder positions.",
      difficulty: "Intermediate",
      readTime: "12 min",
      color: "purple",
      link: createPageUrl("Mod3")
    },
    {
      icon: Eye,
      title: "Red Flags to Watch",
      description: "Identify warning signs of potential scam projects before investing.",
      difficulty: "Beginner",
      readTime: "6 min",
      color: "amber",
      link: createPageUrl("Mod4")
    },
    {
      icon: Lock,
      title: "Liquidity Locks",
      description: "How liquidity locks work and why they're important for project credibility.",
      difficulty: "Intermediate",
      readTime: "10 min",
      color: "green",
      link: createPageUrl("Mod5")
    },
    {
      icon: Shield,
      title: "Protection Strategies",
      description: "Best practices for researching projects and protecting your investments.",
      difficulty: "Intermediate",
      readTime: "15 min",
      color: "indigo",
      link: createPageUrl("Mod6")
    }
  ];

  const stats = [
    {
      value: "$2.8B",
      label: "Lost to DeFi scams in 2024",
      icon: DollarSign
    },
    {
      value: "37%",
      label: "Of losses from rug pulls", 
      icon: TrendingDown
    },
    {
      value: "10,000+",
      label: "Users educated monthly",
      icon: Users
    }
  ];




  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Hero Section */}
      <section className="pt-16 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              Educational Resources
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Learn About
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400"> Crypto Security</span>
            </h1>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Comprehensive guides to help you understand DeFi mechanics, spot potential scams, 
              and protect your investments in the cryptocurrency space.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center justify-center gap-4 p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <p className="text-white/70 text-sm">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Topics */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Learning Topics
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Start with the basics and work your way up to advanced protection strategies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 group cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4`}>
                      <topic.icon className={`w-6 h-6 text-white`} />
                    </div>
                    <div className="flex gap-2">
                      <Badge className="bg-cyan-500/20 text-cyan-200 border-cyan-400/30">
                        {topic.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg text-white group-hover:text-cyan-300 transition-colors">
                    {topic.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 mb-4 leading-relaxed">
                    {topic.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/60 flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {topic.readTime}
                    </span>
                    <Link to={topic.link}>
                      <Button 
                        size="sm" 
                        className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
                      >
                        Read More
                      </Button>
                    </Link>
                    
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Learning CTA */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready for Hands-On Learning?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Put your knowledge to the test with our interactive rug pull simulator. 
            Experience how scams work without risking real money.
          </p>

          <Link to={createPageUrl("Simulator")}>
            <Button 
              size="lg" 
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-md px-8 py-3"
            >
              <Zap className="w-5 h-5 mr-2" />
              Try the Simulator
          </Button>
          </Link>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Common Questions
          </h2>
          
          <div className="space-y-4">
            {[
              {
                question: "Is this simulator safe to use?",
                answer: "Yes, completely safe. No real cryptocurrency is involved - everything is simulated for educational purposes only."
              },
              {
                question: "What's the difference between a rug pull and other scams?",
                answer: "Rug pulls specifically involve removing liquidity from trading pools, while other scams might involve fake projects, exit scams, or smart contract exploits."
              },
              {
                question: "How can I spot a potential rug pull before it happens?",
                answer: "Look for red flags like anonymous teams, lack of locked liquidity, concentrated token ownership, and unrealistic promises of returns."
              }
            ].map((faq, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                  <p className="text-white/70">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}