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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tokens</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTokens}</div>
            <p className="text-xs text-muted-foreground">
              {totalTokens > 0 ? `${totalTokens} tokens created` : 'No tokens yet'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Liquidity Pools</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPools}</div>
            <p className="text-xs text-muted-foreground">
              {rugPulls > 0 ? `${rugPulls} rugged` : 'All pools active'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value Locked</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalTVL)}</div>
            <p className="text-xs text-muted-foreground">
              Across all pools
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTransactions}</div>
            <p className="text-xs text-muted-foreground">
              Total transactions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
              <Button variant="outline" size="sm" onClick={onRefresh}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.length > 0 ? (
                recentTransactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        tx.type === 'rug_pull' ? 'bg-red-500' : 
                        tx.type === 'swap' ? 'bg-blue-500' : 'bg-green-500'
                      }`} />
                      <div>
                        <p className="font-medium text-sm">{tx.getTypeDisplay?.() || tx.type}</p>
                        <p className="text-xs text-muted-foreground">{tx.tokenSymbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {tx.type === 'swap' ? `${formatNumber(tx.amountIn)} → ${formatNumber(tx.amountOut)}` : 
                         tx.type === 'rug_pull' ? 'Rug Pull' : formatNumber(tx.amountIn)}
                      </p>
                      <p className="text-xs text-muted-foreground">{formatDate(tx.timestamp)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No transactions yet</p>
                  <p className="text-xs">Start by minting a token or creating a pool</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Token Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Token Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tokens.length > 0 ? (
                tokens.slice(0, 5).map((token) => {
                  const priceChange = getTokenPriceChange(token);
                  return (
                    <div key={token.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{token.symbol}</p>
                        <p className="text-xs text-muted-foreground">{token.name}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">
                            {formatNumber(token.totalSupply)}
                          </span>
                          {priceChange !== 0 && (
                            <Badge variant={priceChange > 0 ? "default" : "destructive"}>
                              {priceChange > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                              {Math.abs(priceChange).toFixed(1)}%
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{formatDate(token.created_date)}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-muted-foreground">
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
