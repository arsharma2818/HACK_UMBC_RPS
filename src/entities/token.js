import { generateId } from '../utils';

class Token {
  constructor(data = {}) {
    this.id = data.id || generateId();
    this.name = data.name || '';
    this.symbol = data.symbol || '';
    this.totalSupply = data.totalSupply || 1000000;
    this.decimals = data.decimals || 18;
    this.description = data.description || '';
    this.created_date = data.created_date || new Date().toISOString();
    this.creator = data.creator || 'Anonymous';
  }

  static list(sortBy = '-created_date') {
    // In a real app, this would fetch from an API
    // For now, return mock data from localStorage or default data
    const tokens = JSON.parse(localStorage.getItem('tokens') || '[]');
    return Promise.resolve(tokens);
  }

  static get(id) {
    const tokens = JSON.parse(localStorage.getItem('tokens') || '[]');
    const token = tokens.find(t => t.id === id);
    return Promise.resolve(token || null);
  }

  async save() {
    const tokens = JSON.parse(localStorage.getItem('tokens') || '[]');
    const existingIndex = tokens.findIndex(t => t.id === this.id);
    
    if (existingIndex >= 0) {
      tokens[existingIndex] = this;
    } else {
      tokens.push(this);
    }
    
    localStorage.setItem('tokens', JSON.stringify(tokens));
    return Promise.resolve(this);
  }

  async delete() {
    const tokens = JSON.parse(localStorage.getItem('tokens') || '[]');
    const filteredTokens = tokens.filter(t => t.id !== this.id);
    localStorage.setItem('tokens', JSON.stringify(filteredTokens));
    return Promise.resolve(true);
  }
}

export default Token;
