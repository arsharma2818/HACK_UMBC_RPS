import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Coins, 
  Droplets, 
  Activity, 
  TrendingUp, 
  AlertCircle,
  Clock,
  Plus,
  ArrowRight
} from "lucide-react";
import { format } from "date-fns";

export default function Dashboard({ tokens, pools, transactions, onRefresh }) {
  const activePoolsCount = pools.filter(p => p.is_active && !p.rug_pulled).length;
  const ruggedPoolsCount = pools.filter(p => p.rug_pulled).length;
  const totalTransactions = transactions.length;
  const recentTransactions = transactions.slice(0, 5);

  const statsCards = [
    {
      title: "Tokens Created",
      value: tokens.length,
      icon: Coins,
      color: "blue",
      subtitle: "Total minted tokens"
    },
    {
      title: "Active Pools", 
      value: activePoolsCount,
      icon: Droplets,
      color: "green",
      subtitle: "Pools with liquidity"
    },
    {
      title: "Transactions",
      value: totalTransactions,
      icon: Activity,
      color: "purple",
      subtitle: "All trading activity"
    },
    {
      title: "Rug Pulls",
      value: ruggedPoolsCount,
      icon: TrendingUp,
      color: "red",
      subtitle: "Executed rug pulls"
    }
  ];

  const getTransactionTypeColor = (type) => {
    switch (type) {
      case 'swap': return 'bg-blue-100 text-blue-800';
      case 'add_liquidity': return 'bg-green-100 text-green-800';
      case 'remove_liquidity': return 'bg-yellow-100 text-yellow-800';
      case 'rug_pull': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <Card className="border-l-4 border-l-sky-500 bg-gradient-to-r from-sky-50 to-blue-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-sky-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Welcome to the Educational Simulator
              </h3>
              <p className="text-slate-600 mb-4">
                This is a safe environment to learn about cryptocurrency mechanics and rug pull scams. 
                No real money is involved - everything here is for educational purposes only.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" className="bg-sky-600 hover:bg-sky-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Token
                </Button>
                <Button size="sm" variant="outline">
                  View Learning Resources
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${stat.color}-500 opacity-5 rounded-full transform translate-x-8 -translate-y-8`} />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                {stat.title}
              </CardTitle>
              <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              <p className="text-xs text-slate-500 mt-1">{stat.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentTransactions.length > 0 ? (
                <div className="space-y-3">
                  {recentTransactions.map((tx, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge className={getTransactionTypeColor(tx.type)}>
                          {tx.type.replace('_', ' ')}
                        </Badge>
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            {tx.type === 'rug_pull' ? 'Rug Pull Executed' : 
                             tx.type === 'swap' ? 'Token Swap' :
                             tx.type === 'add_liquidity' ? 'Liquidity Added' :
                             'Liquidity Removed'}
                          </p>
                          <p className="text-xs text-slate-500">
                            {format(new Date(tx.created_date), "MMM d, h:mm a")}
                          </p>
                        </div>
                      </div>
                      {tx.price_impact && (
                        <div className="text-right">
                          <p className="text-sm font-medium text-slate-900">
                            {tx.price_impact > 0 ? '+' : ''}{tx.price_impact.toFixed(2)}%
                          </p>
                          <p className="text-xs text-slate-500">Price Impact</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Activity className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">No transactions yet</p>
                  <p className="text-sm text-slate-400">Start by creating a token and setting up a pool</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Coins className="w-4 h-4 mr-2" />
                Create Token
              </Button>
              <Button className="w-full justify-start" variant="outline" disabled={tokens.length === 0}>
                <Droplets className="w-4 h-4 mr-2" />
                Setup Pool
              </Button>
              <Button className="w-full justify-start" variant="outline" disabled={pools.length === 0}>
                <Activity className="w-4 h-4 mr-2" />
                Make Swap
              </Button>
              <Button 
                className="w-full justify-start border-red-200 text-red-700 hover:bg-red-50" 
                variant="outline" 
                disabled={activePoolsCount === 0}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Execute Rug Pull
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-sm">Learning Tip</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-slate-600">
                  📚 Rug pulls work by removing liquidity suddenly, causing token prices to crash to near zero.
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Learn More About AMMs
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}