import { generateId } from '../utils';

class LiquidityPool {
  constructor(data = {}) {
    this.id = data.id || generateId();
    this.name = data.name || '';
    this.tokenId = data.tokenId || '';
    this.tokenSymbol = data.tokenSymbol || '';
    this.tokenReserve = data.tokenReserve || 0;
    this.solReserve = data.solReserve || 0;
    this.totalLiquidity = data.totalLiquidity || 0;
    this.creator = data.creator || 'Anonymous';
    this.created_date = data.created_date || new Date().toISOString();
    this.isRugged = data.isRugged || false;
    this.rugDate = data.rugDate || null;
  }

  static list(sortBy = '-created_date') {
    // In a real app, this would fetch from an API
    const pools = JSON.parse(localStorage.getItem('liquidityPools') || '[]');
    return Promise.resolve(pools);
  }

  static get(id) {
    const pools = JSON.parse(localStorage.getItem('liquidityPools') || '[]');
    const pool = pools.find(p => p.id === id);
    return Promise.resolve(pool || null);
  }

  async save() {
    const pools = JSON.parse(localStorage.getItem('liquidityPools') || '[]');
    const existingIndex = pools.findIndex(p => p.id === this.id);
    
    if (existingIndex >= 0) {
      pools[existingIndex] = this;
    } else {
      pools.push(this);
    }
    
    localStorage.setItem('liquidityPools', JSON.stringify(pools));
    return Promise.resolve(this);
  }

  async delete() {
    const pools = JSON.parse(localStorage.getItem('liquidityPools') || '[]');
    const filteredPools = pools.filter(p => p.id !== this.id);
    localStorage.setItem('liquidityPools', JSON.stringify(filteredPools));
    return Promise.resolve(true);
  }

  // Calculate token price based on reserves
  getTokenPrice() {
    if (this.tokenReserve === 0 || this.solReserve === 0) return 0;
    return this.solReserve / this.tokenReserve;
  }

  // Calculate SOL price based on reserves
  getSolPrice() {
    if (this.tokenReserve === 0 || this.solReserve === 0) return 0;
    return this.tokenReserve / this.solReserve;
  }

  // Calculate total value locked
  getTVL() {
    return this.totalLiquidity;
  }
}

export default LiquidityPool;
