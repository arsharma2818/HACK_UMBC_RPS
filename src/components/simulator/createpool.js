import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Droplets, CheckCircle, AlertTriangle, Coins } from 'lucide-react';
import LiquidityPool from '../../entities/liquiditypool';
import Transaction from '../../entities/transaction';
import { formatNumber, formatCurrency } from '../../utils';

export default function CreatePool({ tokens, onPoolCreated }) {
  const [formData, setFormData] = useState({
    tokenId: '',
    tokenReserve: 100000,
    solReserve: 10
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedToken, setSelectedToken] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'tokenReserve' || name === 'solReserve' ? parseFloat(value) || 0 : value
    }));
  };

  const handleTokenSelect = (tokenId) => {
    const token = tokens.find(t => t.id === tokenId);
    setSelectedToken(token);
    setFormData(prev => ({
      ...prev,
      tokenId: tokenId
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccess(false);

    try {
      if (!selectedToken) {
        throw new Error('Please select a token');
      }

      // Calculate total liquidity (geometric mean)
      const totalLiquidity = Math.sqrt(formData.tokenReserve * formData.solReserve);

      const pool = new LiquidityPool({
        name: `${selectedToken.symbol}/SOL Pool`,
        tokenId: selectedToken.id,
        tokenSymbol: selectedToken.symbol,
        tokenReserve: formData.tokenReserve,
        solReserve: formData.solReserve,
        totalLiquidity: totalLiquidity,
        creator: 'Simulator User'
      });

      await pool.save();

      // Create a transaction record
      const transaction = new Transaction({
        type: 'create_pool',
        tokenId: selectedToken.id,
        tokenSymbol: selectedToken.symbol,
        poolId: pool.id,
        amountIn: formData.tokenReserve,
        tokenIn: selectedToken.symbol,
        tokenOut: 'SOL',
        price: formData.solReserve / formData.tokenReserve,
        user: 'Simulator User'
      });

      await transaction.save();
      
      setSuccess(true);
      setFormData({
        tokenId: '',
        tokenReserve: 100000,
        solReserve: 10
      });
      setSelectedToken(null);

      if (onPoolCreated) {
        onPoolCreated();
      }

      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error creating pool:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateInitialPrice = () => {
    if (formData.tokenReserve > 0 && formData.solReserve > 0) {
      return formData.solReserve / formData.tokenReserve;
    }
    return 0;
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="h-5 w-5" />
            Create Liquidity Pool
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Create a liquidity pool for your token. This simulates how AMMs work in real DeFi.
          </p>
        </CardHeader>
        <CardContent>
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800">Pool Created Successfully!</p>
                <p className="text-sm text-green-700">Your liquidity pool is now active and ready for trading.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Token Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Token *</label>
              {tokens.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tokens.map((token) => (
                    <button
                      key={token.id}
                      type="button"
                      onClick={() => handleTokenSelect(token.id)}
                      className={`p-4 border rounded-lg text-left transition-colors ${
                        selectedToken?.id === token.id
                          ? 'border-sky-500 bg-sky-50'
                          : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{token.symbol}</p>
                          <p className="text-sm text-muted-foreground">{token.name}</p>
                        </div>
                        <Badge variant="outline">{token.totalSupply.toLocaleString()}</Badge>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center bg-slate-50 rounded-lg">
                  <Coins className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">No tokens available</p>
                  <p className="text-sm text-muted-foreground">Create a token first to create a pool</p>
                </div>
              )}
            </div>

            {selectedToken && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="tokenReserve" className="text-sm font-medium">
                      {selectedToken.symbol} Reserve *
                    </label>
                    <input
                      id="tokenReserve"
                      name="tokenReserve"
                      type="number"
                      required
                      min="1"
                      value={formData.tokenReserve}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                    <p className="text-xs text-muted-foreground">
                      Amount of {selectedToken.symbol} tokens to add
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="solReserve" className="text-sm font-medium">
                      SOL Reserve *
                    </label>
                    <input
                      id="solReserve"
                      name="solReserve"
                      type="number"
                      required
                      min="0.1"
                      step="0.1"
                      value={formData.solReserve}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                    <p className="text-xs text-muted-foreground">
                      Amount of SOL to add as liquidity
                    </p>
                  </div>
                </div>

                {/* Pool Preview */}
                <div className="p-4 bg-slate-50 rounded-lg space-y-3">
                  <h4 className="font-medium">Pool Preview</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Initial Price</p>
                      <p className="font-medium">
                        {calculateInitialPrice() > 0 ? `${calculateInitialPrice().toFixed(6)} SOL per ${selectedToken.symbol}` : 'N/A'}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Total Liquidity</p>
                      <p className="font-medium">
                        {Math.sqrt(formData.tokenReserve * formData.solReserve).toFixed(2)} LP
                      </p>
                    </div>
                  </div>
                </div>

                {/* Educational Info */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Droplets className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-800">How AMMs Work</p>
                      <p className="text-sm text-blue-700 mt-1">
                        Automated Market Makers use the constant product formula: x * y = k. 
                        When you create a pool, you're providing liquidity that others can trade against. 
                        The price is determined by the ratio of reserves.
                      </p>
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading || !formData.tokenReserve || !formData.solReserve}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating Pool...
                    </>
                  ) : (
                    <>
                      <Droplets className="h-4 w-4 mr-2" />
                      Create Pool
                    </>
                  )}
                </Button>
              </>
            )}

            {!selectedToken && tokens.length > 0 && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-800">Select a Token</p>
                    <p className="text-sm text-amber-700 mt-1">
                      Choose a token from above to create a liquidity pool.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}