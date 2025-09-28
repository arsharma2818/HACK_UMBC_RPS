import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Zap, ArrowUpDown, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import LiquidityPool from '../../entities/liquiditypool';
import Transaction from '../../entities/transaction';
import { formatNumber, formatCurrency } from '../../utils';

export default function SwapInterface({ pools, tokens, onSwapComplete }) {
  const [swapData, setSwapData] = useState({
    poolId: '',
    amountIn: '',
    tokenIn: 'SOL',
    tokenOut: 'TOKEN'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [swapResult, setSwapResult] = useState(null);
  const [selectedPool, setSelectedPool] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSwapData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePoolSelect = (poolId) => {
    const pool = pools.find(p => p.id === poolId);
    setSelectedPool(pool);
    setSwapData(prev => ({
      ...prev,
      poolId: poolId,
      tokenOut: pool.tokenSymbol
    }));
  };

  const calculateSwapOutput = (amountIn, pool) => {
    if (!pool || !amountIn || amountIn <= 0) return 0;

    const amountInFloat = parseFloat(amountIn);
    let tokenReserve, solReserve;

    if (swapData.tokenIn === 'SOL') {
      solReserve = pool.solReserve;
      tokenReserve = pool.tokenReserve;
    } else {
      solReserve = pool.tokenReserve; // Token becomes the "SOL" side
      tokenReserve = pool.solReserve;
    }

    // Constant product formula: (x + dx) * (y - dy) = x * y
    // dy = y - (x * y) / (x + dx)
    const fee = 0.003; // 0.3% fee
    const amountInWithFee = amountInFloat * (1 - fee);
    
    const amountOut = tokenReserve - (solReserve * tokenReserve) / (solReserve + amountInWithFee);
    return Math.max(0, amountOut);
  };

  const calculateSlippage = (amountIn, pool) => {
    if (!pool || !amountIn || amountIn <= 0) return 0;
    
    const amountOut = calculateSwapOutput(amountIn, pool);
    if (amountOut === 0) return 100;

    let expectedPrice;
    if (swapData.tokenIn === 'SOL') {
      expectedPrice = pool.tokenReserve / pool.solReserve;
    } else {
      expectedPrice = pool.solReserve / pool.tokenReserve;
    }

    const actualPrice = amountIn / amountOut;
    return Math.abs((actualPrice - expectedPrice) / expectedPrice) * 100;
  };

  const handleSwap = async () => {
    if (!selectedPool || !swapData.amountIn) return;

    setIsLoading(true);
    setSuccess(false);
    setSwapResult(null);

    try {
      const amountInFloat = parseFloat(swapData.amountIn);
      const amountOut = calculateSwapOutput(amountInFloat, selectedPool);
      const slippage = calculateSlippage(amountInFloat, selectedPool);

      // Update pool reserves
      let updatedPool = { ...selectedPool };
      if (swapData.tokenIn === 'SOL') {
        updatedPool.solReserve += amountInFloat;
        updatedPool.tokenReserve -= amountOut;
      } else {
        updatedPool.tokenReserve += amountInFloat;
        updatedPool.solReserve -= amountOut;
      }

      await updatedPool.save();

      // Create transaction record
      const transaction = new Transaction({
        type: 'swap',
        tokenId: selectedPool.tokenId,
        tokenSymbol: selectedPool.tokenSymbol,
        poolId: selectedPool.id,
        amountIn: amountInFloat,
        amountOut: amountOut,
        tokenIn: swapData.tokenIn,
        tokenOut: swapData.tokenOut,
        price: amountInFloat / amountOut,
        slippage: slippage,
        user: 'Simulator User'
      });

      await transaction.save();

      setSwapResult({
        amountIn: amountInFloat,
        amountOut: amountOut,
        slippage: slippage,
        tokenIn: swapData.tokenIn,
        tokenOut: swapData.tokenOut
      });

      setSuccess(true);

      if (onSwapComplete) {
        onSwapComplete();
      }

      // Reset form
      setSwapData(prev => ({
        ...prev,
        amountIn: ''
      }));

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
        setSwapResult(null);
      }, 5000);

    } catch (error) {
      console.error('Error executing swap:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReverseSwap = () => {
    setSwapData(prev => ({
      ...prev,
      tokenIn: prev.tokenIn === 'SOL' ? prev.tokenOut : 'SOL',
      tokenOut: prev.tokenIn === 'SOL' ? 'SOL' : prev.tokenOut,
      amountIn: ''
    }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Pool Selection */}
      <Card className="bg-white/10 backdrop-blur-md border border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Select Trading Pool</CardTitle>
          <p className="text-sm text-white/70">
            Choose a liquidity pool to trade against
          </p>
        </CardHeader>
        <CardContent>
          {pools.length > 0 ? (
            <div className="space-y-3">
              {pools.map((pool) => (
                <button
                  key={pool.id}
                  onClick={() => handlePoolSelect(pool.id)}
                  className={`w-full p-4 border rounded-lg text-left transition-all backdrop-blur-sm ${
                    selectedPool?.id === pool.id
                      ? 'bg-white/20 border-white/40 text-white shadow-lg'
                      : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">{pool.name}</p>
                      <p className="text-sm text-white/60">
                        {formatNumber(pool.tokenReserve)} {pool.tokenSymbol} • {formatNumber(pool.solReserve)} SOL
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge className={pool.isRugged ? "bg-red-500/20 text-red-200 border-red-400/30" : "bg-cyan-500/20 text-cyan-200 border-cyan-400/30"}>
                        {pool.isRugged ? 'Rugged' : 'Active'}
                      </Badge>
                      <p className="text-sm text-white/60 mt-1">
                        {formatCurrency(pool.getTokenPrice())} SOL/{pool.tokenSymbol}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-white/60">
              <AlertTriangle className="h-8 w-8 mx-auto mb-2 opacity-70" />
              <p>No liquidity pools available</p>
              <p className="text-sm">Create a pool first to enable trading</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Swap Interface */}
      {selectedPool && (
        <Card className="bg-white/10 backdrop-blur-md border border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Zap className="h-5 w-5" />
              Token Swap
            </CardTitle>
            <p className="text-sm text-white/70">
              Trade {swapData.tokenIn} for {swapData.tokenOut} in the {selectedPool.name}
            </p>
          </CardHeader>
          <CardContent>
            {success && swapResult && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-400/30 rounded-lg backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  <div>
                    <p className="font-medium text-green-200">Swap Successful!</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-green-300">You received:</span>
                    <span className="font-medium text-green-200">
                      {formatNumber(swapResult.amountOut)} {swapResult.tokenOut}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-300">Slippage:</span>
                    <span className="font-medium text-green-200">
                      {swapResult.slippage.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {/* Input Amount */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">
                  Amount to {swapData.tokenIn === 'SOL' ? 'Sell' : 'Spend'}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={swapData.amountIn}
                    onChange={(e) => handleInputChange(e)}
                    name="amountIn"
                    placeholder="0.0"
                    min="0"
                    step="0.001"
                    className="w-full px-3 py-3 pr-20 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-white/50 text-lg backdrop-blur-sm"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Badge className="bg-cyan-500/20 text-cyan-200 border-cyan-400/30">{swapData.tokenIn}</Badge>
                  </div>
                </div>
              </div>

              {/* Swap Direction Button */}
              <div className="flex justify-center">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleReverseSwap}
                  className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </div>

              {/* Output Amount */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  You will receive
                </label>
                <div className="relative">
                  <div className="w-full px-3 py-3 pr-20 border border-slate-200 bg-slate-50 rounded-lg text-lg">
                    {swapData.amountIn ? formatNumber(calculateSwapOutput(parseFloat(swapData.amountIn), selectedPool)) : '0.0'}
                  </div>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Badge variant="secondary">{swapData.tokenOut}</Badge>
                  </div>
                </div>
              </div>

              {/* Swap Details */}
              {swapData.amountIn && parseFloat(swapData.amountIn) > 0 && (
                <div className="p-4 bg-slate-50 rounded-lg space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="font-medium">
                      1 {swapData.tokenIn} = {formatNumber(calculateSwapOutput(1, selectedPool))} {swapData.tokenOut}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Slippage:</span>
                    <span className={`font-medium ${
                      calculateSlippage(parseFloat(swapData.amountIn), selectedPool) > 5 
                        ? 'text-red-600' 
                        : 'text-green-600'
                    }`}>
                      {calculateSlippage(parseFloat(swapData.amountIn), selectedPool).toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fee (0.3%):</span>
                    <span className="font-medium">
                      {formatNumber(parseFloat(swapData.amountIn) * 0.003)} {swapData.tokenIn}
                    </span>
                  </div>
                </div>
              )}

              {/* Educational Info */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-800">How Swaps Work</p>
                    <p className="text-sm text-blue-700 mt-1">
                      Swaps use the constant product formula. When you trade, you're changing the pool's reserves,
                      which affects the price. Larger trades cause more slippage due to price impact.
                    </p>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleSwap}
                className="w-full"
                disabled={isLoading || !swapData.amountIn || parseFloat(swapData.amountIn) <= 0 || selectedPool.isRugged}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Executing Swap...
                  </>
                ) : selectedPool.isRugged ? (
                  <>
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Pool Rugged - Cannot Trade
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Execute Swap
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
