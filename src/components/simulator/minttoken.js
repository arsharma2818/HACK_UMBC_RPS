import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Coins, CheckCircle, AlertTriangle } from 'lucide-react';
import Token from '../../entities/token';

export default function MintToken({ onTokenCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    totalSupply: 1000000,
    decimals: 18,
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'totalSupply' || name === 'decimals' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccess(false);

    try {
      const token = new Token({
        ...formData,
        creator: 'Simulator User'
      });

      await token.save();
      
      setSuccess(true);
      setFormData({
        name: '',
        symbol: '',
        totalSupply: 1000000,
        decimals: 18,
        description: ''
      });

      if (onTokenCreated) {
        onTokenCreated();
      }

      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error creating token:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5" />
            Mint New Token
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Create a new token for your simulation. This is completely safe - no real cryptocurrency is involved.
          </p>
        </CardHeader>
        <CardContent>
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800">Token Created Successfully!</p>
                <p className="text-sm text-green-700">Your token has been minted and is ready for trading.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Token Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., SafeCoin"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="symbol" className="text-sm font-medium">
                  Token Symbol *
                </label>
                <input
                  id="symbol"
                  name="symbol"
                  type="text"
                  required
                  value={formData.symbol}
                  onChange={handleInputChange}
                  placeholder="e.g., SAFE"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent uppercase"
                  maxLength="10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="totalSupply" className="text-sm font-medium">
                  Total Supply *
                </label>
                <input
                  id="totalSupply"
                  name="totalSupply"
                  type="number"
                  required
                  min="1"
                  value={formData.totalSupply}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
                <p className="text-xs text-muted-foreground">
                  Total number of tokens to mint
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="decimals" className="text-sm font-medium">
                  Decimals *
                </label>
                <input
                  id="decimals"
                  name="decimals"
                  type="number"
                  required
                  min="0"
                  max="18"
                  value={formData.decimals}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
                <p className="text-xs text-muted-foreground">
                  Number of decimal places (0-18)
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your token..."
                rows={3}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Educational Info */}
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-800">Educational Simulation</p>
                  <p className="text-sm text-amber-700 mt-1">
                    This token minting is purely educational. No real cryptocurrency is created, 
                    and no blockchain transactions occur. This is a safe environment to learn 
                    about token creation and DeFi mechanics.
                  </p>
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || !formData.name || !formData.symbol}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Minting Token...
                </>
              ) : (
                <>
                  <Coins className="h-4 w-4 mr-2" />
                  Mint Token
                </>
              )}
            </Button>
          </form>

          {/* Token Preview */}
          {formData.name && formData.symbol && (
            <div className="mt-6 p-4 bg-slate-50 rounded-lg">
              <h4 className="font-medium mb-3">Token Preview</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Symbol:</span>
                  <Badge variant="outline">{formData.symbol.toUpperCase()}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Supply:</span>
                  <span className="font-medium">{formData.totalSupply.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Decimals:</span>
                  <span className="font-medium">{formData.decimals}</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}