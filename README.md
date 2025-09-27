# RugGuard - Educational DeFi Simulator

RugGuard is an educational platform designed to help users understand cryptocurrency scams through safe, hands-on simulations. Learn about rug pulls, liquidity pools, and DeFi mechanics without risking real funds.

## 🎯 What is RugGuard?

RugGuard is a **completely safe, educational simulation** that teaches users about:
- How rug pulls work in practice
- Automated Market Maker (AMM) mechanics
- Liquidity pool dynamics
- Token swapping and price impact
- Risk assessment and red flags

**⚠️ IMPORTANT: This is purely educational. No real cryptocurrency or funds are involved.**

## 🚀 Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   ```bash
   # If you have git
   git clone <repository-url>
   cd rug-guard
   
   # Or download and extract the ZIP file
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to see the application.

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── simulator/          # Simulator-specific components
│   └── layout.js          # Main layout component
├── entities/              # Data models and business logic
├── pages/                 # Page components
├── utils/                 # Utility functions
├── App.js                # Main app component
└── index.js              # Entry point
```

## 🎮 How to Use

### 1. **Home Page**
- Learn about the platform and its educational purpose
- Understand what rug pulls are and why they're dangerous

### 2. **Learn Section**
- Read educational content about DeFi mechanics
- Understand different types of scams
- Learn about red flags to watch for

### 3. **Simulator**
The main educational tool with these features:

#### **Dashboard**
- Overview of all your simulation activity
- Statistics and metrics
- Recent transaction history

#### **Mint Token**
- Create your own test tokens
- Set supply, decimals, and metadata
- Practice token creation mechanics

#### **Create Pool**
- Set up liquidity pools for your tokens
- Understand AMM (Automated Market Maker) mechanics
- Learn about liquidity provision

#### **Swap Interface**
- Trade tokens in your pools
- Experience price impact and slippage
- Understand how swaps affect pool reserves

#### **Rug Pull Simulation**
- **⚠️ Educational only** - Simulate rug pull attacks
- See how liquidity removal affects prices
- Understand the impact on investors
- Learn to recognize warning signs

#### **Analytics**
- View detailed metrics and charts
- Track transaction history
- Analyze token performance

## 🛠️ Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## 🔧 Technical Details

### Built With
- **React 18** - UI framework
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Local Storage** - Data persistence (simulation only)

### Data Storage
- All simulation data is stored in browser localStorage
- No external databases or APIs
- Data persists between sessions
- Can be cleared by clearing browser data

## 📚 Educational Value

### What You'll Learn
1. **Token Economics**: How tokens are created and distributed
2. **Liquidity Mechanics**: How AMMs work and maintain prices
3. **Price Discovery**: How supply/demand affects token prices
4. **Risk Assessment**: How to identify potentially dangerous projects
5. **DeFi Protocols**: Understanding automated market makers

### Safety Features
- No real cryptocurrency involved
- No blockchain connections
- No financial risk
- Educational warnings throughout
- Clear disclaimers about simulation nature

## 🚨 Important Disclaimers

- **This is purely educational software**
- **No real cryptocurrency or funds are at risk**
- **This is not financial advice**
- **Real DeFi protocols may work differently**
- **Always do your own research before investing**

## 🤝 Contributing

This is an educational project. Contributions are welcome for:
- Bug fixes
- Educational content improvements
- UI/UX enhancements
- Additional simulation features

## 📄 License

This project is for educational purposes. Use responsibly and remember that real cryptocurrency investments carry significant risk.

## 🆘 Support

If you encounter issues:
1. Check that all dependencies are installed correctly
2. Ensure you're using Node.js 16 or higher
3. Clear browser cache and localStorage if needed
4. Check the browser console for error messages

---

**Remember: This simulator is for education only. Always research thoroughly before making any real cryptocurrency investments.**
