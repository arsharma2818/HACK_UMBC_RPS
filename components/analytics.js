import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, BarChart3, TrendingDown, TrendingUp, Droplets, Info } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

export default function Analytics({ transactions, pools, tokens }) {
  const [selectedPoolId, setSelectedPoolId] = useState("");

  const chartData = useMemo(() => {
    if (!selectedPoolId) return [];

    const poolTransactions = transactions
      .filter(tx => tx.pool_id === selectedPoolId)
      .sort((a, b) => new Date(a.created_date) - new Date(b.created_date));

    return poolTransactions.map(tx => {
      const price = tx.reserves_after.base / tx.reserves_after.token;
      return {
        date: new Date(tx.created_date),
        price: isFinite(price) ? price : 0,
        liquidity: tx.reserves_after.base,
        type: tx.type,
      };
    });
  }, [transactions, selectedPoolId]);
  
  const poolInsights = useMemo(() => {
    if (!selectedPoolId || chartData.length === 0) return null;
    
    const initialTx = chartData[0];
    const latestTx = chartData[chartData.length - 1];
    const initialPrice = chartData.find(d => d.price > 0)?.price || 0;
    const latestPrice = latestTx.price;
    const priceChange = initialPrice > 0 ? ((latestPrice - initialPrice) / initialPrice) * 100 : 0;

    const rugged = pools.find(p => p.id === selectedPoolId)?.rug_pulled || false;

    return {
      priceChange,
      rugged,
      liquidityChange: ((latestTx.liquidity - initialTx.liquidity) / initialTx.liquidity) * 100,
      totalSwaps: chartData.filter(d => d.type === 'swap').length
    }

  }, [chartData, selectedPoolId, pools]);

  if (pools.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="text-center py-12">
            <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No Data to Analyze</h3>
            <p className="text-slate-600 mb-4">
              Create tokens, set up liquidity pools, and perform swaps to generate data for analysis.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Simulation Analytics</h2>
        <p className="text-slate-600">
          Analyze the results of your simulation to understand market dynamics.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Pool Analysis
            </div>
            <div className="w-64">
              <Select value={selectedPoolId} onValueChange={setSelectedPoolId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a pool..." />
                </SelectTrigger>
                <SelectContent>
                  {pools.map(pool => {
                    const token = tokens.find(t => t.id === pool.token_id);
                    return (
                      <SelectItem key={pool.id} value={pool.id}>
                        {token?.symbol}/{pool.base_currency} Pool
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!selectedPoolId ? (
            <div className="text-center py-12">
              <Info className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">Please select a pool to view analytics.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {poolInsights && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-slate-50">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Price Change</span>
                        {poolInsights.priceChange > 0 ? <TrendingUp className="text-green-500 w-5 h-5" /> : <TrendingDown className="text-red-500 w-5 h-5" />}
                      </div>
                      <p className={`text-2xl font-bold ${poolInsights.priceChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {poolInsights.priceChange.toFixed(2)}%
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-50">
                    <CardContent className="pt-6">
                      <span className="text-sm text-slate-600">Total Swaps</span>
                      <p className="text-2xl font-bold">{poolInsights.totalSwaps}</p>
                    </CardContent>
                  </Card>
                  <Card className={`${poolInsights.rugged ? 'bg-red-50' : 'bg-green-50'}`}>
                    <CardContent className="pt-6">
                      <span className={`text-sm ${poolInsights.rugged ? 'text-red-700' : 'text-green-700'}`}>Pool Status</span>
                      <p className={`text-2xl font-bold ${poolInsights.rugged ? 'text-red-700' : 'text-green-700'}`}>
                        {poolInsights.rugged ? 'Rug Pulled' : 'Active'}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}
              
              <div className="space-y-4">
                <h3 className="font-semibold">Token Price</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(date) => format(date, 'HH:mm')} />
                    <YAxis domain={['auto', 'auto']} tickFormatter={(value) => value.toExponential(2)} />
                    <Tooltip 
                      labelFormatter={(date) => format(date, 'MMM d, yyyy HH:mm')}
                      formatter={(value) => value.toFixed(8)}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="price" stroke="#2A7FFF" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Liquidity ({pools.find(p => p.id === selectedPoolId)?.base_currency})</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(date) => format(date, 'HH:mm')} />
                    <YAxis />
                    <Tooltip labelFormatter={(date) => format(date, 'MMM d, yyyy HH:mm')} />
                    <Legend />
                    <Line type="monotone" dataKey="liquidity" name="Base Currency Reserve" stroke="#10B981" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}