import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { AlertTriangle, TrendingDown, AlertCircle, Shield } from 'lucide-react';
import LiquidityPool from '../../entities/liquiditypool';
import Transaction from '../../entities/transaction';
import { formatNumber, formatCurrency } from '../../utils';

export default function RugPull({ pools, tokens, onRugComplete }) {
  const [selectedPool, setSelectedPool] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [rugResult, setRugResult] = useState(null);

  const activePools = pools.filter(pool => !pool.isRugged);

  const handlePoolSelect = (poolId) => {
    const pool = pools.find(p => p.id === poolId);
    setSelectedPool(pool);
  };

  const calculateRugImpact = (pool) => {
    if (!pool) return null;

    // Calculate how much the creator can steal
    const maxStealable = pool.totalLiquidity * 0.95; // Can steal up to 95%
    
    // Calculate new reserves after rug
    const newTokenReserve = pool.tokenReserve * 0.05; // Leave 5%
    const newSolReserve = pool.solReserve * 0.05;
    
    // Calculate new price (will be much lower)
    const newPrice = newSolReserve / newTokenReserve;
    const oldPrice = pool.solReserve / pool.tokenReserve;
    const priceDrop = ((oldPrice - newPrice) / oldPrice) * 100;

    return {
      maxStealable,
      newTokenReserve,
      newSolReserve,
      priceDrop,
      newPrice,
      oldPrice
    };
  };

  const executeRugPull = async () => {
    if (!selectedPool) {
      return;
    }

    if (selectedPool.isRugged) {
      return;
    }

    setIsLoading(true);
    setSuccess(false);
    setRugResult(null);

    try {
      const rugImpact = calculateRugImpact(selectedPool);
      
      // Update pool to reflect rug pull
      const updatedPool = new LiquidityPool({
        ...selectedPool,
        isRugged: true,
        rugDate: new Date().toISOString(),
        tokenReserve: rugImpact.newTokenReserve,
        solReserve: rugImpact.newSolReserve,
        totalLiquidity: rugImpact.newTokenReserve * rugImpact.newSolReserve
      });

      await updatedPool.save();

      // Create transaction record for the rug pull
      const transaction = new Transaction({
        type: 'rug_pull',
        tokenId: selectedPool.tokenId,
        tokenSymbol: selectedPool.tokenSymbol,
        poolId: selectedPool.id,
        amountIn: rugImpact.maxStealable,
        amountOut: rugImpact.maxStealable,
        tokenIn: 'Liquidity',
        tokenOut: 'Stolen Funds',
        price: 1, // 1:1 ratio since it's theft
        user: 'Malicious Creator'
      });

      await transaction.save();

      setRugResult({
        pool: selectedPool,
        impact: rugImpact,
        stolenAmount: rugImpact.maxStealable
      });

      setSuccess(true);

      if (onRugComplete) {
        onRugComplete();
      }

      // Reset form
      setSelectedPool(null);

      // Reset success message after 10 seconds
      setTimeout(() => {
        setSuccess(false);
        setRugResult(null);
      }, 10000);

    } catch (error) {
      console.error('Error executing rug pull:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Warning Banner */}
      <Card className="border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-red-600 mt-1" />
            <div>
              <h3 className="font-semibold text-red-800 mb-2">⚠️ Educational Rug Pull Simulation</h3>
              <p className="text-red-700 mb-3">
                This is a safe, educational simulation to help you understand how rug pulls work. 
                <strong> No real funds are at risk.</strong> This demonstrates the mechanics of how 
                malicious token creators steal liquidity from investors.
              </p>
              <div className="text-sm text-red-600 space-y-1">
                <p>• This simulation shows how 95% of liquidity can be stolen instantly</p>
                <p>• Token prices can drop 95%+ when liquidity is removed</p>
                <p>• This is why due diligence is crucial before investing</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pool Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5" />
            Select Pool to Rug
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Choose an active liquidity pool to simulate a rug pull attack
          </p>
        </CardHeader>
        <CardContent>
          {activePools.length > 0 ? (
            <div className="space-y-3">
              {activePools.map((pool) => (
                <button
                  key={pool.id}
                  onClick={() => handlePoolSelect(pool.id)}
                  className={`w-full p-4 border rounded-lg text-left transition-colors ${
                    selectedPool?.id === pool.id
                      ? 'border-red-500 bg-red-50'
                      : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{pool.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatNumber(pool.tokenReserve)} {pool.tokenSymbol} • {formatNumber(pool.solReserve)} SOL
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">Active</Badge>
                      <p className="text-sm text-muted-foreground mt-1">
                        TVL: {formatCurrency(pool.totalLiquidity)}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Shield className="h-8 w-8 mx-auto mb-2" />
              <p>No active pools available</p>
              <p className="text-sm">All pools have been rugged or no pools exist yet</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Rug Pull Simulation */}
      {selectedPool && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Rug Pull Simulation
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Simulating a rug pull on {selectedPool.name}
            </p>
          </CardHeader>
          <CardContent>
            {success && rugResult && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                  <div>
                    <p className="font-medium text-red-800">Rug Pull Executed!</p>
                    <p className="text-sm text-red-700">This is what happens to investors</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-white rounded border">
                      <p className="text-red-700 font-medium">Amount Stolen</p>
                      <p className="text-lg font-bold text-red-800">
                        {formatCurrency(rugResult.stolenAmount)}
                      </p>
                    </div>
                    <div className="p-3 bg-white rounded border">
                      <p className="text-red-700 font-medium">Price Drop</p>
                      <p className="text-lg font-bold text-red-800">
                        -{rugResult.impact.priceDrop.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded border">
                    <p className="text-red-700 font-medium mb-2">Impact on Investors:</p>
                    <ul className="space-y-1 text-red-600">
                      <li>• Token holders lose {rugResult.impact.priceDrop.toFixed(1)}% of their investment</li>
                      <li>• Liquidity providers lose {formatCurrency(rugResult.stolenAmount)} in stolen funds</li>
                      <li>• Token becomes nearly worthless (95%+ price drop)</li>
                      <li>• Trading becomes impossible due to lack of liquidity</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-6">
              {/* Current Pool State */}
              <div className="p-4 bg-slate-50 rounded-lg">
                <h4 className="font-medium mb-3">Current Pool State</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Token Reserve</p>
                    <p className="font-medium">{formatNumber(selectedPool.tokenReserve)} {selectedPool.tokenSymbol}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">SOL Reserve</p>
                    <p className="font-medium">{formatNumber(selectedPool.solReserve)} SOL</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Value Locked</p>
                    <p className="font-medium">{formatCurrency(selectedPool.totalLiquidity)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Current Price</p>
                    <p className="font-medium">{formatCurrency(selectedPool.getTokenPrice())} SOL/{selectedPool.tokenSymbol}</p>
                  </div>
                </div>
              </div>

              {/* Predicted Impact */}
              {(() => {
                const impact = calculateRugImpact(selectedPool);
                return (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-medium text-red-800 mb-3">Predicted Impact</h4>
                    <div className="space-y-3 text-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-red-700">Amount Stealable</p>
                          <p className="font-bold text-red-800">{formatCurrency(impact.maxStealable)}</p>
                        </div>
                        <div>
                          <p className="text-red-700">Price Drop</p>
                          <p className="font-bold text-red-800">-{impact.priceDrop.toFixed(1)}%</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-red-700 font-medium">After Rug Pull:</p>
                        <p className="text-red-600">
                          • Token price drops from {formatCurrency(impact.oldPrice)} to {formatCurrency(impact.newPrice)} SOL
                          • Only {formatNumber(impact.newTokenReserve)} tokens and {formatNumber(impact.newSolReserve)} SOL remain
                          • Investors lose 95%+ of their investment
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Educational Warning */}
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-800">How to Spot Rug Pulls</p>
                    <p className="text-sm text-amber-700 mt-1">
                      Before investing, check: creator's reputation, liquidity locks, 
                      token distribution, and community trust. This simulation shows why 
                      these protections are crucial.
                    </p>
                  </div>
                </div>
              </div>

              <Button 
                onClick={executeRugPull}
                className="w-full bg-red-600 hover:bg-red-700"
                disabled={isLoading || selectedPool?.isRugged}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Executing Rug Pull...
                  </>
                ) : (
                  <>
                    <TrendingDown className="h-4 w-4 mr-2" />
                    Execute Rug Pull Simulation
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
