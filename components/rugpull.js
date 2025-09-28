
import React, { useState } from "react";
import { LiquidityPool, Transaction } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, TrendingDown, CheckCircle, ShieldOff } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";

export default function RugPull({ pools, tokens, onRugComplete }) {
  const [selectedPool, setSelectedPool] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const activePool = pools.find(p => p.id === selectedPool && p.is_active && !p.rug_pulled);
  const selectedToken = activePool ? tokens.find(t => t.id === activePool.token_id) : null;

  const handleRugPull = async () => {
    if (!activePool || !confirmed) return;

    setIsLoading(true);

    try {
      const removedTokenReserve = activePool.token_reserve;
      const removedBaseReserve = activePool.base_reserve;

      await LiquidityPool.update(activePool.id, {
        token_reserve: 0,
        base_reserve: 0,
        is_active: false,
        rug_pulled: true,
      });

      await Transaction.create({
        pool_id: activePool.id,
        type: "rug_pull",
        token_amount: -removedTokenReserve,
        base_amount: -removedBaseReserve,
        price_impact: -100,
        reserves_after: {
          token: 0,
          base: 0
        }
      });
      
      setSuccess(true);
      onRugComplete();

      setTimeout(() => {
        setSelectedPool("");
        setConfirmed(false);
        setSuccess(false);
      }, 3000);

    } catch (error) {
      console.error("Error executing rug pull:", error);
    }

    setIsLoading(false);
  };
  
  const activePools = pools.filter(p => p.is_active && !p.rug_pulled);

  if (activePools.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="text-center py-12">
            <ShieldOff className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No Active Pools to Rug</h3>
            <p className="text-slate-600 mb-4">
              Create a liquidity pool to simulate a rug pull.
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
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Rug Pull Simulation</h2>
        <p className="text-slate-600">
          Simulate the removal of liquidity to understand its devastating effects.
        </p>
      </div>

      {success && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Rug pull executed successfully. The pool liquidity has been drained.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-red-600" />
            Execute Rug Pull
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="pool" className="text-sm font-medium">
              Select Pool to Rug
            </Label>
            <Select value={selectedPool} onValueChange={setSelectedPool} disabled={isLoading}>
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
              <Alert variant="destructive" className="bg-red-50/50">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <h3 className="font-bold mb-2">WARNING: DESTRUCTIVE ACTION</h3>
                  <p>
                    A rug pull is when developers drain the liquidity pool, causing the token price to crash. 
                    This action will simulate that by removing all liquidity from the selected pool.
                  </p>
                </AlertDescription>
              </Alert>

              <div className="flex items-center space-x-2">
                <Checkbox id="confirm" checked={confirmed} onCheckedChange={setConfirmed} disabled={isLoading} />
                <label
                  htmlFor="confirm"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I understand this is a simulation of a destructive action.
                </label>
              </div>

              <Button
                onClick={handleRugPull}
                className="w-full bg-red-600 hover:bg-red-700"
                disabled={!confirmed || isLoading}
              >
                {isLoading ? "Executing Rug Pull..." : "Execute Rug Pull"}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
