// Simple localStorage-backed achievements system

const STORAGE_KEY = 'achievements_state_v1';

export const ACHIEVEMENTS = [
  {
    id: 'first_buy',
    title: 'First Trade: Buy',
    hint: 'Buy any token once in Coin Arena.',
    icon: 'ShoppingCart'
  },
  {
    id: 'first_sell',
    title: 'First Trade: Sell',
    hint: 'Sell any token once in Coin Arena.',
    icon: 'Coins'
  },
  {
    id: 'portfolio_150',
    title: 'Up 50%',
    hint: 'Reach a portfolio value of $150 or more.',
    icon: 'TrendingUp'
  },
  {
    id: 'tp_hit',
    title: 'Profit Locked',
    hint: 'Trigger a take‑profit auto-sell rule.',
    icon: 'Flag'
  },
  {
    id: 'sl_hit',
    title: 'Damage Control',
    hint: 'Trigger a stop‑loss auto-sell rule.',
    icon: 'ShieldAlert'
  },
  {
    id: 'dca_started',
    title: 'Steady Hands',
    hint: 'Start a DCA plan for any token.',
    icon: 'Repeat'
  },
  {
    id: 'rugpull_seen',
    title: 'Rugpull Witness',
    hint: 'Experience a rug pull event during a game.',
    icon: 'Skull'
  },
  {
    id: 'portfolio_200',
    title: 'Doubled Up',
    hint: 'Reach a portfolio value of $200 or more.',
    icon: 'TrendingUp'
  },
  {
    id: 'portfolio_300',
    title: 'Tripled Up',
    hint: 'Reach a portfolio value of $300 or more.',
    icon: 'TrendingUp'
  },
  {
    id: 'diversified_3',
    title: 'Diversifier',
    hint: 'Hold positions in 3 or more tokens at once.',
    icon: 'Layers'
  },
  {
    id: 'all_in',
    title: 'All-In Moment',
    hint: 'Spend all cash on a single token.',
    icon: 'Target'
  }
];

function readState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function hasAchievement(id) {
  const state = readState();
  return !!state[id];
}

export function unlock(id) {
  const state = readState();
  if (state[id]) return false;
  state[id] = { unlockedAt: new Date().toISOString() };
  writeState(state);
  try {
    const def = ACHIEVEMENTS.find(a => a.id === id) || { id, title: id };
    window.dispatchEvent(new CustomEvent('achievement:unlocked', { detail: { id, def } }));
  } catch {}
  return true;
}

export function getAllAchievements() {
  const state = readState();
  return ACHIEVEMENTS.map(def => ({
    ...def,
    unlocked: !!state[def.id],
    unlockedAt: state[def.id]?.unlockedAt || null
  }));
}

export function resetAchievements() {
  writeState({});
}

export default {
  ACHIEVEMENTS,
  getAllAchievements,
  hasAchievement,
  unlock,
  resetAchievements
};


