import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Activity,
  AlertTriangle,
  Coins,
  Droplets
} from 'lucide-react';
import { formatNumber, formatCurrency, formatDate } from '../../utils';

export default function Analytics({ transactions, pools, tokens }) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');

  const analyticsData = useMemo(() => {
    const now = new Date();
    let filteredTransactions = transactions;

    // Filter by timeframe
    if (selectedTimeframe !== 'all') {
      const hours = selectedTimeframe === '1h' ? 1 : selectedTimeframe === '24h' ? 24 : 168; // 1 week
      const cutoffTime = new Date(now.getTime() - hours * 60 * 60 * 1000);
      filteredTransactions = transactions.filter(tx => new Date(tx.timestamp) >= cutoffTime);
    }

    // Calculate metrics
    const totalTransactions = filteredTransactions.length;
    const totalVolume = filteredTransactions.reduce((sum, tx) => sum + (tx.amountIn || 0), 0);
    
    const transactionTypes = filteredTransactions.reduce((acc, tx) => {
      acc[tx.type] = (acc[tx.type] || 0) + 1;
      return acc;
    }, {});

    const rugPulls = filteredTransactions.filter(tx => tx.type === 'rug_pull');
    const totalRuggedValue = rugPulls.reduce((sum, tx) => sum + (tx.amountIn || 0), 0);

    // Calculate average slippage for swaps
    const swaps = filteredTransactions.filter(tx => tx.type === 'swap');
    const averageSlippage = swaps.length > 0 
      ? swaps.reduce((sum, tx) => sum + (tx.slippage || 0), 0) / swaps.length 
      : 0;

    // Token performance
    const tokenPerformance = tokens.map(token => {
      const tokenTransactions = filteredTransactions.filter(tx => tx.tokenId === token.id);
      const tokenPools = pools.filter(pool => pool.tokenId === token.id);
      const isRugged = tokenPools.some(pool => pool.isRugged);
      
      return {
        ...token,
        transactionCount: tokenTransactions.length,
        totalVolume: tokenTransactions.reduce((sum, tx) => sum + (tx.amountIn || 0), 0),
        isRugged,
        poolCount: tokenPools.length
      };
    }).sort((a, b) => b.totalVolume - a.totalVolume);

    return {
      totalTransactions,
      totalVolume,
      transactionTypes,
      rugPulls: rugPulls.length,
      totalRuggedValue,
      averageSlippage,
      tokenPerformance
    };
  }, [transactions, pools, tokens, selectedTimeframe]);

  const timeframes = [
    { value: '1h', label: '1 Hour' },
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: 'all', label: 'All Time' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
          <p className="text-white/70">
            Insights and metrics from your simulation activity
          </p>
        </div>
        
        <div className="flex gap-2">
          {timeframes.map((timeframe) => (
            <Button
              key={timeframe.value}
              className={`${
                selectedTimeframe === timeframe.value
                  ? 'bg-white/25 text-white border-white/40 backdrop-blur-sm'
                  : 'bg-white/10 text-white/80 border-white/20 hover:bg-white/20 hover:border-white/30'
              } backdrop-blur-sm`}
              size="sm"
              onClick={() => setSelectedTimeframe(timeframe.value)}
            >
              {timeframe.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/10 backdrop-blur-md border border-white/20  hover:border-white/30 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white group-hover:text-cyan-200 transition-colors duration-300">Total Transactions</CardTitle>
            <Activity className="h-4 w-4 text-white/60 group-hover:text-cyan-300 transition-colors duration-300" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white group-hover:text-cyan-100 transition-colors duration-300">{analyticsData.totalTransactions}</div>
            <p className="text-xs text-white/60 group-hover:text-white/80 transition-colors duration-300">
              {selectedTimeframe !== 'all' && `Last ${timeframes.find(t => t.value === selectedTimeframe)?.label}`}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border border-white/20  hover:border-white/30 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white group-hover:text-green-200 transition-colors duration-300">Total Volume</CardTitle>
            <DollarSign className="h-4 w-4 text-white/60 group-hover:text-green-300 transition-colors duration-300" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white group-hover:text-green-100 transition-colors duration-300">{formatCurrency(analyticsData.totalVolume)}</div>
            <p className="text-xs text-white/60 group-hover:text-white/80 transition-colors duration-300">
              Across all transactions
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border border-white/20  hover:border-white/30 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white group-hover:text-red-200 transition-colors duration-300">Rug Pulls</CardTitle>
            <AlertTriangle className="h-4 w-4 text-white/60 group-hover:text-red-300 transition-colors duration-300" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-300 group-hover:text-red-200 transition-colors duration-300">{analyticsData.rugPulls}</div>
            <p className="text-xs text-white/60 group-hover:text-white/80 transition-colors duration-300">
              {formatCurrency(analyticsData.totalRuggedValue)} stolen
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border border-white/20  hover:border-white/30 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white group-hover:text-purple-200 transition-colors duration-300">Avg Slippage</CardTitle>
            <TrendingUp className="h-4 w-4 text-white/60 group-hover:text-purple-300 transition-colors duration-300" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white group-hover:text-purple-100 transition-colors duration-300">{analyticsData.averageSlippage.toFixed(2)}%</div>
            <p className="text-xs text-white/60 group-hover:text-white/80 transition-colors duration-300">
              On swap transactions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Types */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/10 backdrop-blur-md border border-white/20  hover:border-white/30 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group">
          <CardHeader>
            <CardTitle className="text-white group-hover:text-blue-200 transition-colors duration-300">Transaction Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(analyticsData.transactionTypes).map(([type, count]) => (
                <div key={type} className="flex items-center justify-between hover:bg-white/5 rounded-lg p-2 transition-all duration-200">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      type === 'rug_pull' ? 'bg-red-400' :
                      type === 'swap' ? 'bg-blue-400' :
                      type === 'create_pool' ? 'bg-green-400' :
                      type === 'mint_token' ? 'bg-purple-400' : 'bg-slate-400'
                    }`} />
                    <span className="capitalize font-medium text-white">
                      {type.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white">{count}</span>
                    <span className="text-sm text-white/60">
                      ({((count / analyticsData.totalTransactions) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border border-white/20  hover:border-white/30 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 group">
          <CardHeader>
            <CardTitle className="text-white group-hover:text-cyan-200 transition-colors duration-300">Token Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.tokenPerformance.slice(0, 5).map((token) => (
                <div key={token.id} className="flex items-center justify-between p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-md hover:shadow-cyan-500/10 transition-all duration-200 group/item">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${token.isRugged ? 'bg-red-400' : 'bg-green-400'}`} />
                    <div>
                      <p className="font-medium text-white group-hover/item:text-cyan-100 transition-colors duration-200">{token.symbol}</p>
                      <p className="text-sm text-white/60 group-hover/item:text-white/80 transition-colors duration-200">{token.transactionCount} transactions</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-white group-hover/item:text-cyan-100 transition-colors duration-200">{formatCurrency(token.totalVolume)}</p>
                    <div className="flex items-center space-x-2">
                      <Badge className={token.isRugged ? "bg-red-500/20 text-red-200 border-red-400/30" : "bg-cyan-500/20 text-cyan-200 border-cyan-400/30"}>
                        {token.isRugged ? 'Rugged' : 'Active'}
                      </Badge>
                      <span className="text-sm text-white/60 group-hover/item:text-white/80 transition-colors duration-200">
                        {token.poolCount} pool{token.poolCount !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-white/10 backdrop-blur-md border border-white/20  hover:border-white/30 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 group">
        <CardHeader>
          <CardTitle className="text-white group-hover:text-indigo-200 transition-colors duration-300">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.slice(0, 10).map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-md hover:shadow-indigo-500/10 transition-all duration-200 group/item">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    tx.type === 'rug_pull' ? 'bg-red-400' :
                    tx.type === 'swap' ? 'bg-blue-400' :
                    tx.type === 'create_pool' ? 'bg-green-400' :
                    tx.type === 'mint_token' ? 'bg-purple-400' : 'bg-slate-400'
                  }`} />
                  <div>
                    <p className="font-medium capitalize text-white group-hover/item:text-indigo-100 transition-colors duration-200">{tx.type.replace('_', ' ')}</p>
                    <p className="text-sm text-white/60 group-hover/item:text-white/80 transition-colors duration-200">{tx.tokenSymbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-white group-hover/item:text-indigo-100 transition-colors duration-200">
                    {tx.type === 'rug_pull' ? formatCurrency(tx.amountIn) : 
                     tx.type === 'swap' ? `${formatNumber(tx.amountIn)} → ${formatNumber(tx.amountOut)}` :
                     formatNumber(tx.amountIn)}
                  </p>
                  <p className="text-sm text-white/60 group-hover/item:text-white/80 transition-colors duration-200">{formatDate(tx.timestamp)}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Educational Insights */}
      <Card className="bg-blue-500/20 border-blue-400/30 backdrop-blur-md hover:bg-blue-500/25 hover:border-blue-400/40 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group">
        <CardHeader>
          <CardTitle className="text-blue-200 group-hover:text-blue-100 transition-colors duration-300">Educational Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-blue-200 group-hover:text-blue-100 transition-colors duration-300">
            <div>
              <h4 className="font-medium mb-2 text-blue-100 group-hover:text-blue-50 transition-colors duration-300">What These Metrics Tell Us:</h4>
              <ul className="space-y-1 text-sm">
                <li>• <strong>High slippage</strong> indicates low liquidity or large trade sizes</li>
                <li>• <strong>Rug pulls</strong> can happen at any time, causing 95%+ losses</li>
                <li>• <strong>Transaction volume</strong> shows how active the ecosystem is</li>
                <li>• <strong>Token performance</strong> reveals which projects succeed vs. fail</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-blue-100 group-hover:text-blue-50 transition-colors duration-300">Real-World Implications:</h4>
              <ul className="space-y-1 text-sm">
                <li>• Always check liquidity depth before large trades</li>
                <li>• Diversify across multiple projects to reduce risk</li>
                <li>• Monitor for suspicious activity patterns</li>
                <li>• Never invest more than you can afford to lose</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
