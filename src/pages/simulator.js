import React, { useState, useEffect } from "react";
import { Token, LiquidityPool, Transaction } from "../entities/all";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { AlertTriangle, BookOpen, BarChart3, Coins, Droplets, Zap, TrendingDown } from "lucide-react";

import Dashboard from "../components/simulator/dashboard";
import MintToken from "../components/simulator/minttoken";
import CreatePool from "../components/simulator/createpool";
import SwapInterface from "../components/simulator/swapinterface";
import RugPull from "../components/simulator/rugpull";
import Analytics from "../components/simulator/analytics";

export default function Simulator() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [tokens, setTokens] = useState([]);
  const [pools, setPools] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [tokensData, poolsData, transactionsData] = await Promise.all([
      Token.list("-created_date"),
      LiquidityPool.list("-created_date"),
      Transaction.list("-created_date", 50)
    ]);
    setTokens(tokensData);
    setPools(poolsData);
    setTransactions(transactionsData);
  };

  const refreshData = () => {
    loadData();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Context Bar */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Educational Sandbox
              </Badge>
              <div className="text-sm text-slate-600">
                {tokens.length} tokens • {pools.length} pools • {transactions.length} transactions
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Simulation Active • No Real Funds
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Rug Pull Simulator
          </h1>
          <p className="text-slate-600">
            Learn how cryptocurrency scams work in a safe, controlled environment
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 h-auto p-1 bg-slate-100/60 backdrop-blur-sm">
            <TabsTrigger 
              value="dashboard" 
              className="flex items-center gap-2 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger 
              value="mint" 
              className="flex items-center gap-2 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <Coins className="w-4 h-4" />
              <span className="hidden sm:inline">Mint</span>
            </TabsTrigger>
            <TabsTrigger 
              value="pool" 
              className="flex items-center gap-2 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <Droplets className="w-4 h-4" />
              <span className="hidden sm:inline">Pool</span>
            </TabsTrigger>
            <TabsTrigger 
              value="swap" 
              className="flex items-center gap-2 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <Zap className="w-4 h-4" />
              <span className="hidden sm:inline">Swap</span>
            </TabsTrigger>
            <TabsTrigger 
              value="rug" 
              className="flex items-center gap-2 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <TrendingDown className="w-4 h-4" />
              <span className="hidden sm:inline">Rug</span>
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="flex items-center gap-2 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="dashboard" className="space-y-6">
              <Dashboard 
                tokens={tokens} 
                pools={pools} 
                transactions={transactions} 
                onRefresh={refreshData}
              />
            </TabsContent>
            
            <TabsContent value="mint" className="space-y-6">
              <MintToken onTokenCreated={refreshData} />
            </TabsContent>
            
            <TabsContent value="pool" className="space-y-6">
              <CreatePool tokens={tokens} onPoolCreated={refreshData} />
            </TabsContent>
            
            <TabsContent value="swap" className="space-y-6">
              <SwapInterface pools={pools} tokens={tokens} onSwapComplete={refreshData} />
            </TabsContent>
            
            <TabsContent value="rug" className="space-y-6">
              <RugPull pools={pools} tokens={tokens} onRugComplete={refreshData} />
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-6">
              <Analytics transactions={transactions} pools={pools} tokens={tokens} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}