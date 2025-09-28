import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Shield, Users, BookOpen, Heart } from 'lucide-react';

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
      icon: Heart,
      title: "Empowering Users",
      description: "We believe knowledge is power in the complex world of DeFi."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-16 pb-24 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">RugGuard</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            An educational platform designed to help users understand cryptocurrency scams 
            through safe, hands-on simulations.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              To democratize DeFi education by providing a safe environment where users can 
              learn about cryptocurrency risks without financial exposure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-sky-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
              Why We Built This
            </h2>
          </div>

          <div className="prose prose-lg max-w-none text-slate-600">
            <p className="text-lg leading-relaxed mb-6">
              The cryptocurrency space has seen explosive growth, but with it comes significant risks. 
              In 2024 alone, over $2.8 billion was lost to DeFi scams, with rug pulls accounting for 
              37% of these losses.
            </p>
            
            <p className="text-lg leading-relaxed mb-6">
              We recognized that traditional educational methods weren't enough. Reading about scams 
              in articles doesn't prepare you for the psychological and technical realities of 
              encountering them in real-time.
            </p>
            
            <p className="text-lg leading-relaxed mb-6">
              RugGuard was created to bridge this gap. By providing a safe, controlled environment 
              where users can experience these scenarios firsthand, we help build the muscle memory 
              and pattern recognition needed to stay safe in the real world.
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mt-8">
              <p className="text-amber-800 font-medium mb-2">
                ⚠️ Important Disclaimer
              </p>
              <p className="text-amber-700">
                RugGuard is purely educational. It does not provide investment advice, and all 
                simulations are completely safe with no real cryptocurrency involved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
              Our Team
            </h2>
            <p className="text-xl text-slate-600">
              Committed to making DeFi education accessible and safe
            </p>
          </div>

          <div className="grid md:grid-cols-1 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-8">
                  <div className="w-24 h-24 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-12 h-12 text-sky-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-sky-600 font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
