import { generateId } from '../utils';

class Transaction {
  constructor(data = {}) {
    this.id = data.id || generateId();
    this.type = data.type || 'swap'; // 'swap', 'add_liquidity', 'remove_liquidity', 'rug_pull'
    this.tokenId = data.tokenId || '';
    this.tokenSymbol = data.tokenSymbol || '';
    this.poolId = data.poolId || '';
    this.amountIn = data.amountIn || 0;
    this.amountOut = data.amountOut || 0;
    this.tokenIn = data.tokenIn || '';
    this.tokenOut = data.tokenOut || '';
    this.price = data.price || 0;
    this.slippage = data.slippage || 0;
    this.user = data.user || 'Anonymous';
    this.timestamp = data.timestamp || new Date().toISOString();
    this.hash = data.hash || generateId();
    this.status = data.status || 'completed';
  }

  static list(sortBy = '-timestamp', limit = 100) {
    // In a real app, this would fetch from an API
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    return Promise.resolve(transactions.slice(0, limit));
  }

  static get(id) {
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    const transaction = transactions.find(t => t.id === id);
    return Promise.resolve(transaction || null);
  }

  async save() {
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    const existingIndex = transactions.findIndex(t => t.id === this.id);
    
    if (existingIndex >= 0) {
      transactions[existingIndex] = this;
    } else {
      transactions.unshift(this); // Add to beginning for newest first
    }
    
    // Keep only last 1000 transactions
    if (transactions.length > 1000) {
      transactions.splice(1000);
    }
    
    localStorage.setItem('transactions', JSON.stringify(transactions));
    return Promise.resolve(this);
  }

  async delete() {
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    const filteredTransactions = transactions.filter(t => t.id !== this.id);
    localStorage.setItem('transactions', JSON.stringify(filteredTransactions));
    return Promise.resolve(true);
  }

  // Get transaction type display name
  getTypeDisplay() {
    const types = {
      'swap': 'Token Swap',
      'add_liquidity': 'Add Liquidity',
      'remove_liquidity': 'Remove Liquidity',
      'rug_pull': 'Rug Pull',
      'mint_token': 'Mint Token',
      'create_pool': 'Create Pool'
    };
    return types[this.type] || this.type;
  }

  // Check if transaction is a rug pull
  isRugPull() {
    return this.type === 'rug_pull';
  }
}

export default Transaction;
