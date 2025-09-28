import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  Coins, 
  Droplets, 
  AlertTriangle,
  RefreshCw,
  Activity
} from 'lucide-react';
import { formatNumber, formatCurrency, formatDate } from '../../utils';

export default function Dashboard({ tokens, pools, transactions, onRefresh }) {
  const totalTokens = tokens.length;
  const totalPools = pools.length;
  const totalTransactions = transactions.length;

  const resetAllData = () => {
    if (window.confirm('Are you sure you want to reset all simulation data? This will delete all tokens, pools, and transactions.')) {
      localStorage.removeItem('tokens');
      localStorage.removeItem('liquidityPools');
      localStorage.removeItem('transactions');
      console.log('All simulation data cleared!');
      window.location.reload(); // Refresh to reload the page with empty data
    }
  };
  
  // Calculate total value locked
  const totalTVL = pools.reduce((sum, pool) => sum + (pool.totalLiquidity || 0), 0);
  
  // Calculate rug pull count
  const rugPulls = pools.filter(pool => pool.isRugged).length;
  
  // Get recent transactions
  const recentTransactions = transactions.slice(0, 5);
  
  // Calculate price changes for tokens
  const getTokenPriceChange = (token) => {
    const tokenTransactions = transactions.filter(tx => tx.tokenId === token.id);
    if (tokenTransactions.length < 2) return 0;
    
    const latest = tokenTransactions[0];
    const previous = tokenTransactions[1];
    return ((latest.price - previous.price) / previous.price) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:border-white/30 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white group-hover:text-cyan-200 transition-colors duration-300">Total Tokens</CardTitle>
            <Coins className="h-4 w-4 text-white/60 group-hover:text-cyan-300 transition-colors duration-300" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white group-hover:text-cyan-100 transition-colors duration-300">{totalTokens}</div>
            <p className="text-xs text-white/60 group-hover:text-white/80 transition-colors duration-300">
              {totalTokens > 0 ? `${totalTokens} tokens created` : 'No tokens yet'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:border-white/30 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white group-hover:text-blue-200 transition-colors duration-300">Liquidity Pools</CardTitle>
            <Droplets className="h-4 w-4 text-white/60 group-hover:text-blue-300 transition-colors duration-300" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white group-hover:text-blue-100 transition-colors duration-300">{totalPools}</div>
            <p className="text-xs text-white/60 group-hover:text-white/80 transition-colors duration-300">
              {rugPulls > 0 ? `${rugPulls} rugged` : 'All pools active'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:border-white/30 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white group-hover:text-green-200 transition-colors duration-300">Total Value Locked</CardTitle>
            <TrendingUp className="h-4 w-4 text-white/60 group-hover:text-green-300 transition-colors duration-300" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white group-hover:text-green-100 transition-colors duration-300">{formatCurrency(totalTVL)}</div>
            <p className="text-xs text-white/60 group-hover:text-white/80 transition-colors duration-300">
              Across all pools
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:border-white/30 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white group-hover:text-purple-200 transition-colors duration-300">Transactions</CardTitle>
            <Activity className="h-4 w-4 text-white/60 group-hover:text-purple-300 transition-colors duration-300" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white group-hover:text-purple-100 transition-colors duration-300">{totalTransactions}</div>
            <p className="text-xs text-white/60 group-hover:text-white/80 transition-colors duration-300">
              Total transactions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:border-white/30 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 group">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white group-hover:text-indigo-200 transition-colors duration-300">Recent Transactions</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={onRefresh} className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:shadow-md hover:shadow-cyan-500/20 transition-all duration-300">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button variant="destructive" size="sm" onClick={resetAllData} className="bg-red-500/20 border-red-400/30 text-red-200 hover:bg-red-500/30 hover:shadow-md hover:shadow-red-500/20 transition-all duration-300">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Reset All
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.length > 0 ? (
                recentTransactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-md hover:shadow-indigo-500/10 transition-all duration-200 group/item">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        tx.type === 'rug_pull' ? 'bg-red-400' : 
                        tx.type === 'swap' ? 'bg-blue-400' : 'bg-green-400'
                      }`} />
                      <div>
                        <p className="font-medium text-sm text-white group-hover/item:text-indigo-100 transition-colors duration-200">{tx.getTypeDisplay?.() || tx.type}</p>
                        <p className="text-xs text-white/60 group-hover/item:text-white/80 transition-colors duration-200">{tx.tokenSymbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-white group-hover/item:text-indigo-100 transition-colors duration-200">
                        {tx.type === 'swap' ? `${formatNumber(tx.amountIn)} → ${formatNumber(tx.amountOut)}` : 
                         tx.type === 'rug_pull' ? 'Rug Pull' : formatNumber(tx.amountIn)}
                      </p>
                      <p className="text-xs text-white/60 group-hover/item:text-white/80 transition-colors duration-200">{formatDate(tx.timestamp)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-white/60">
                  <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No transactions yet</p>
                  <p className="text-xs">Start by minting a token or creating a pool</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Token Overview */}
        <Card className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:border-white/30 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 group">
          <CardHeader>
            <CardTitle className="text-white group-hover:text-cyan-200 transition-colors duration-300">Token Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tokens.length > 0 ? (
                tokens.slice(0, 5).map((token) => {
                  const priceChange = getTokenPriceChange(token);
                  return (
                    <div key={token.id} className="flex items-center justify-between p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-md hover:shadow-cyan-500/10 transition-all duration-200 group/item">
                      <div>
                        <p className="font-medium text-sm text-white group-hover/item:text-cyan-100 transition-colors duration-200">{token.symbol}</p>
                        <p className="text-xs text-white/60 group-hover/item:text-white/80 transition-colors duration-200">{token.name}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-white group-hover/item:text-cyan-100 transition-colors duration-200">
                            {formatNumber(token.totalSupply)}
                          </span>
                          {priceChange !== 0 && (
                            <Badge className={priceChange > 0 ? "bg-green-500/20 text-green-200 border-green-400/30" : "bg-red-500/20 text-red-200 border-red-400/30"}>
                              {priceChange > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                              {Math.abs(priceChange).toFixed(1)}%
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-white/60 group-hover/item:text-white/80 transition-colors duration-200">{formatDate(token.created_date)}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-white/60">
                  <Coins className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No tokens yet</p>
                  <p className="text-xs">Create your first token to get started</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Warning Banner */}
      {rugPulls > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="font-medium text-red-800">
                  {rugPulls} Pool{rugPulls > 1 ? 's' : ''} Rugged
                </p>
                <p className="text-sm text-red-700">
                  {rugPulls} liquidity pool{rugPulls > 1 ? 's have' : ' has'} been rugged in this simulation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
