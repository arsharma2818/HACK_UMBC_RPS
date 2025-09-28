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
      <Card className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:border-white/30 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 group">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white group-hover:text-cyan-200 transition-colors duration-300">
            <Coins className="h-5 w-5 group-hover:text-cyan-300 transition-colors duration-300" />
            Mint New Token
          </CardTitle>
          <p className="text-sm text-white/70 group-hover:text-white/80 transition-colors duration-300">
            Create a new token for your simulation. This is completely safe - no real cryptocurrency is involved.
          </p>
        </CardHeader>
        <CardContent>
          {success && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-400/30 rounded-lg flex items-center gap-3 backdrop-blur-sm">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <div>
                <p className="font-medium text-green-200">Token Created Successfully!</p>
                <p className="text-sm text-green-300">Your token has been minted and is ready for trading.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-white">
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
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-white/50 backdrop-blur-sm"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="symbol" className="text-sm font-medium text-white">
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
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-white/50 backdrop-blur-sm uppercase"
                  maxLength="10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="totalSupply" className="text-sm font-medium text-white">
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
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-white/50 backdrop-blur-sm"
                />
                <p className="text-xs text-white/60">
                  Total number of tokens to mint
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="decimals" className="text-sm font-medium text-white">
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
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-white/50 backdrop-blur-sm"
                />
                <p className="text-xs text-white/60">
                  Number of decimal places (0-18)
                </p>
              </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium text-white">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your token..."
                rows={3}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-white/50 backdrop-blur-sm resize-none"
              />
            </div>

            {/* Educational Info */}
            <div className="p-4 bg-amber-500/20 border border-amber-400/30 rounded-lg backdrop-blur-sm hover:bg-amber-500/25 hover:border-amber-400/40 hover:shadow-md hover:shadow-amber-500/10 transition-all duration-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-300 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-200">Educational Simulation</p>
                  <p className="text-sm text-amber-200/90 mt-1">
                    This token minting is purely educational. No real cryptocurrency is created, 
                    and no blockchain transactions occur. This is a safe environment to learn 
                    about token creation and DeFi mechanics.
                  </p>
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-md hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300" 
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
            <div className="mt-6 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-md hover:shadow-cyan-500/10 transition-all duration-200">
              <h4 className="font-medium mb-3 text-white">Token Preview</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Name:</span>
                  <span className="font-medium text-white">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Symbol:</span>
                  <Badge className="bg-cyan-500/20 text-cyan-200 border-cyan-400/30">{formData.symbol.toUpperCase()}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Supply:</span>
                  <span className="font-medium text-white">{formData.totalSupply.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Decimals:</span>
                  <span className="font-medium text-white">{formData.decimals}</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}