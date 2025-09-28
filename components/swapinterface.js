import React, { useState } from "react";
import { Transaction, LiquidityPool } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Zap, ArrowUpDown, AlertCircle, TrendingUp, TrendingDown } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function SwapInterface({ pools, tokens, onSwapComplete }) {
  const [selectedPool, setSelectedPool] = useState("");
  const [swapDirection, setSwapDirection] = useState("token_to_base"); // token_to_base or base_to_token
  const [inputAmount, setInputAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const activePool = pools.find(p => p.id === selectedPool && p.is_active && !p.rug_pulled);
  const selectedToken = activePool ? tokens.find(t => t.id === activePool.token_id) : null;

  const calculateSwapOutput = () => {
    if (!activePool || !inputAmount || inputAmount <= 0) return { output: 0, priceImpact: 0 };

    const input = parseFloat(inputAmount);
    let output, newTokenReserve, newBaseReserve, priceImpact;

    if (swapDirection === "token_to_base") {
      // Selling tokens for base currency
      const k = activePool.token_reserve * activePool.base_reserve;
      newTokenReserve = activePool.token_reserve + input;
      newBaseReserve = k / newTokenReserve;
      output = activePool.base_reserve - newBaseReserve;
      
      const oldPrice = activePool.base_reserve / activePool.token_reserve;
      const newPrice = newBaseReserve / newTokenReserve;
      priceImpact = ((oldPrice - newPrice) / oldPrice) * 100;
    } else {
      // Buying tokens with base currency
      const k = activePool.token_reserve * activePool.base_reserve;
      newBaseReserve = activePool.base_reserve + input;
      newTokenReserve = k / newBaseReserve;
      output = activePool.token_reserve - newTokenReserve;
      
      const oldPrice = activePool.base_reserve / activePool.token_reserve;
      const newPrice = newBaseReserve / newTokenReserve;
      priceImpact = ((newPrice - oldPrice) / oldPrice) * 100;
    }

    return { 
      output: Math.max(0, output), 
      priceImpact,
      newTokenReserve,
      newBaseReserve
    };
  };

  const { output, priceImpact, newTokenReserve, newBaseReserve } = calculateSwapOutput();

  const handleSwap = async () => {
    if (!activePool || !inputAmount || output <= 0) return;

    setIsLoading(true);
    
    try {
      // Update pool reserves
      await LiquidityPool.update(activePool.id, {
        token_reserve: newTokenReserve,
        base_reserve: newBaseReserve
      });

      // Record transaction
      await Transaction.create({
        pool_id: activePool.id,
        type: "swap",
        token_amount: swapDirection === "token_to_base" ? parseFloat(inputAmount) : -output,
        base_amount: swapDirection === "token_to_base" ? -output : parseFloat(inputAmount),
        price_impact: priceImpact,
        reserves_after: {
          token: newTokenReserve,
          base: newBaseReserve
        }
      });

      onSwapComplete();
      setInputAmount("");
    } catch (error) {
      console.error("Error executing swap:", error);
    }
    
    setIsLoading(false);
  };

  const flipSwapDirection = () => {
    setSwapDirection(prev => prev === "token_to_base" ? "base_to_token" : "token_to_base");
    setInputAmount("");
  };

  const activePools = pools.filter(p => p.is_active && !p.rug_pulled);

  if (activePools.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="text-center py-12">
            <Zap className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No Active Pools</h3>
            <p className="text-slate-600 mb-4">
              You need to create a liquidity pool first before you can start swapping tokens.
            </p>
            <Button>Create Liquidity Pool</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Token Swap</h2>
        <p className="text-slate-600">
          Trade tokens using automated market maker mechanics
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-600" />
            Swap Tokens
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="pool" className="text-sm font-medium">
              Select Pool
            </Label>
            <Select value={selectedPool} onValueChange={setSelectedPool}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Choose a liquidity pool" />
              </SelectTrigger>
              <SelectContent>
                {activePools.map((pool) => {
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

          {activePool && (
            <>
              {/* Pool Info */}
              <Card className="bg-slate-50 border-slate-200">
                <CardContent className="pt-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-500">{selectedToken?.symbol} Reserve</p>
                      <p className="font-semibold">{activePool.token_reserve.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">{activePool.base_currency} Reserve</p>
                      <p className="font-semibold">{activePool.base_reserve.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Swap Interface */}
              <div className="space-y-4">
                <div className="bg-white border-2 border-slate-200 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-sm font-medium text-slate-600">You Pay</Label>
                  </div>
                  <div className="flex gap-3">
                    <Input
                      value={inputAmount}
                      onChange={(e) => setInputAmount(e.target.value)}
                      placeholder="0.0"
                      type="number"
                      min="0"
                      step="0.001"
                      className="text-xl font-semibold border-0 p-0 h-auto"
                    />
                    <div className="bg-slate-100 px-4 py-2 rounded-lg font-semibold min-w-fit">
                      {swapDirection === "token_to_base" ? selectedToken?.symbol : activePool.base_currency}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={flipSwapDirection}
                    className="rounded-full border-2 border-slate-200 bg-white hover:bg-slate-50"
                  >
                    <ArrowUpDown className="w-4 h-4" />
                  </Button>
                </div>

                <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-sm font-medium text-slate-600">You Receive</Label>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-xl font-semibold text-slate-900 flex-1">
                      {output > 0 ? output.toFixed(6) : "0.0"}
                    </div>
                    <div className="bg-slate-200 px-4 py-2 rounded-lg font-semibold min-w-fit">
                      {swapDirection === "token_to_base" ? activePool.base_currency : selectedToken?.symbol}
                    </div>
                  </div>
                </div>

                {/* Price Impact Warning */}
                {inputAmount && output > 0 && (
                  <div className="space-y-3">
                    <Card className={`border-2 ${Math.abs(priceImpact) > 5 ? 'border-red-200 bg-red-50' : 'border-blue-200 bg-blue-50'}`}>
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {priceImpact > 0 ? (
                              <TrendingUp className="w-4 h-4 text-red-600" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-green-600" />
                            )}
                            <span className="text-sm font-medium">Price Impact</span>
                          </div>
                          <span className={`font-semibold ${Math.abs(priceImpact) > 5 ? 'text-red-700' : 'text-blue-700'}`}>
                            {priceImpact > 0 ? '+' : ''}{priceImpact.toFixed(2)}%
                          </span>
                        </div>
                        {Math.abs(priceImpact) > 5 && (
                          <p className="text-xs text-red-600 mt-2">
                            High price impact! Consider a smaller trade size.
                          </p>
                        )}
                      </CardContent>
                    </Card>

                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-sm">
                        <strong>Learning Note:</strong> Price impact occurs because your trade changes the ratio of tokens in the pool. 
                        Larger trades have bigger impacts on price.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}

                <Button 
                  onClick={handleSwap}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={!inputAmount || output <= 0 || isLoading}
                >
                  {isLoading ? "Executing Swap..." : "Execute Swap"}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}