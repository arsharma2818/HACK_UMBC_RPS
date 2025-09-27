// Utility function to create page URLs
export function createPageUrl(pageName) {
  const routes = {
    'Home': '/',
    'Simulator': '/simulator',
    'Learn': '/learn',
    'About': '/about'
  };
  
  return routes[pageName] || '/';
}

// Utility function to format numbers
export function formatNumber(num, decimals = 2) {
  if (num >= 1e9) return (num / 1e9).toFixed(decimals) + 'B';
  if (num >= 1e6) return (num / 1e6).toFixed(decimals) + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(decimals) + 'K';
  return num.toFixed(decimals);
}

// Utility function to format currency
export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
}

// Utility function to generate random ID
export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

// Utility function to format date
export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
}

// Export cn utility function
export { cn } from './cn';
