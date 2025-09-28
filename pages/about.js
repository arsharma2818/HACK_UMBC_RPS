import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Target, Users, BookOpen, Mail, Heart, Github, Twitter } from "lucide-react";

export default function About() {
  const team = [
    {
      name: "Alex Chen",
      role: "Security Researcher",
      bio: "Former blockchain security auditor with 5+ years of DeFi research experience."
    },
    {
      name: "Sarah Johnson", 
      role: "Educational Designer",
      bio: "Specializes in making complex financial concepts accessible to everyone."
    },
    {
      name: "Marcus Rodriguez",
      role: "Full-Stack Developer", 
      bio: "Built secure trading systems and educational platforms for fintech companies."
    }
  ];

  const values = [
    {
      icon: Shield,
      title: "Safety First",
      description: "We prioritize user safety by providing risk-free learning environments that never involve real funds."
    },
    {
      icon: BookOpen,
      title: "Education Over Profit",
      description: "Our mission is purely educational - we don't profit from user losses or promote any investment strategies."
    },
    {
      icon: Users,
      title: "Community Driven", 
      description: "Built by the community, for the community. We listen to feedback and continuously improve our resources."
    },
    {
      icon: Target,
      title: "Evidence Based",
      description: "All our educational content is based on real-world data and documented scam patterns."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Hero Section */}
      <section className="pt-16 pb-12 bg-gradient-to-r from-slate-50 via-white to-sky-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            Made with Purpose
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            About 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600"> RugGuard</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            We're on a mission to protect cryptocurrency investors through education. 
            By understanding how scams work, you can better protect yourself and your investments.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Mission</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Empowering crypto investors with the knowledge they need to identify and avoid scams
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-sm text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-sky-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Why We Built This</h2>
          </div>

          <div className="prose prose-slate mx-auto">
            <Card className="border-l-4 border-l-amber-500 bg-amber-50 border-amber-200">
              <CardContent className="p-8">
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  In 2024 alone, cryptocurrency investors lost over <strong>$2.8 billion</strong> to DeFi scams, 
                  with rug pulls accounting for 37% of these losses. Behind each statistic are real people who 
                  lost their savings to sophisticated scams they didn't understand.
                </p>
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  We realized that the best defense against these scams isn't just telling people to "be careful" - 
                  it's showing them exactly how scams work so they can recognize the warning signs.
                </p>
                <p className="text-slate-700 text-lg leading-relaxed">
                  That's why we created RugGuard: a safe environment where you can experience rug pulls and 
                  other DeFi mechanics firsthand, without risking real money. Knowledge is the best protection.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Meet the Team</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Security researchers, educators, and developers passionate about crypto safety
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-0 shadow-sm text-center">
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">
                      {member.name.split(' ').map(n => n.charAt(0)).join('')}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-sky-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Source & Contact */}
      <section className="py-16 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Open Source & Community
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            RugGuard is open source and community-driven. We believe that security education should be 
            transparent and accessible to everyone.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button variant="outline" className="bg-white text-slate-900 hover:bg-slate-100">
              <Github className="w-5 h-5 mr-2" />
              View on GitHub
            </Button>
            <Button variant="outline" className="bg-white text-slate-900 hover:bg-slate-100">
              <Twitter className="w-5 h-5 mr-2" />
              Follow Updates
            </Button>
            <Button variant="outline" className="bg-white text-slate-900 hover:bg-slate-100">
              <Mail className="w-5 h-5 mr-2" />
              Contact Us
            </Button>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 text-left max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-white mb-3">Disclaimer</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              RugGuard is an educational tool only. No real cryptocurrency transactions occur on this platform. 
              This tool is designed for learning purposes and should not be considered financial advice. 
              Always do your own research before making investment decisions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}