import { GoogleGenerativeAI } from "@google/generative-ai";

class GeminiMarketService {
  constructor() {
    // Use environment variable or fallback (for demo purposes, we'll use a fallback system)
    this.apiKey = process.env.REACT_APP_GEMINI_API_KEY;
    this.genAI = null;
    this.model = null;
    this.isInitialized = false;
    
    this.initializeAI();
  }

  async initializeAI() {
    try {
      if (this.apiKey) {
        this.genAI = new GoogleGenerativeAI(this.apiKey);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        this.isInitialized = true;
        console.log("Gemini AI initialized successfully");
      } else {
        console.warn("Gemini API key not found. Using fallback random events.");
      }
    } catch (error) {
      console.warn("Failed to initialize Gemini AI:", error);
      this.isInitialized = false;
    }
  }

  // Fallback event templates when AI is not available
  getFallbackEvents() {
    const eventTemplates = [
      {
        type: 'pump',
        title: ['🚀 Crypto Rally!', '📈 Bull Market Alert!', '💎 Diamond Hands Unite!'],
        news: [
          'Major institutional investor announces crypto allocation',
          'Regulatory clarity brings market confidence',
          'Celebrity endorsement drives FOMO',
          'Technical breakthrough announced',
          'Major exchange listing confirmed'
        ]
      },
      {
        type: 'dump',
        title: ['📉 Market Correction', '😱 Panic Selling', '💥 Crypto Winter'],
        news: [
          'Regulatory concerns create uncertainty',
          'Whale dumps massive position',
          'Exchange hack rumors spread fear',
          'Economic downturn affects crypto',
          'Leveraged positions get liquidated'
        ]
      },
      {
        type: 'meme',
        title: ['🐕 Meme Coin Mania!', '🚀 Social Media Hype!', '💫 Viral Moment!'],
        news: [
          'Influencer tweets about meme coin',
          'Viral TikTok trend boosts token',
          'Reddit community rallies around coin',
          'Celebrity posts meme about crypto',
          'Social sentiment reaches peak FOMO'
        ]
      },
      {
        type: 'stable',
        title: ['🏦 Institutional News', '📊 Market Analysis', '💼 Financial Update'],
        news: [
          'Federal Reserve adjusts interest rates',
          'Stablecoin audit results released',
          'Banking partnership announced',
          'Treasury bond yields fluctuate',
          'Institutional demand for stability increases'
        ]
      },
      {
        type: 'rugpull',
        title: ['💀 RUG PULL ALERT!', '🚨 SCAM DETECTED!', '⚠️ LIQUIDITY DRAINED!'],
        news: [
          'Developers vanish with liquidity pool funds',
          'Smart contract reveals hidden backdoor',
          'Anonymous team drains treasury wallet',
          'Fake partnerships exposed as fraud',
          'Token contract ownership renounced after drain'
        ]
      }
    ];

    return eventTemplates;
  }

  // Generate random market multipliers for realistic volatility
  generateMarketMultipliers(round, eventType) {
    const baseVolatility = {
      SCAM: { min: 0.8, max: 1.5, rugpullRound: 6 },
      MEME: { min: 0.6, max: 2.2, volatility: 0.4 },
      TETHER: { min: 0.998, max: 1.002, stability: 0.001 }
    };

    const multipliers = {};

    // ScamCoin logic - pumps hard then rugpulls
    if (round < baseVolatility.SCAM.rugpullRound) {
      // Before rugpull - can pump significantly
      if (eventType === 'pump' || eventType === 'meme') {
        multipliers.SCAM = 1 + Math.random() * 2 + (round * 0.3); // Increasing pump potential
      } else if (eventType === 'dump') {
        multipliers.SCAM = 0.7 + Math.random() * 0.4; // Minor dumps before rugpull
      } else {
        multipliers.SCAM = 0.9 + Math.random() * 0.3;
      }
    } else if (round === baseVolatility.SCAM.rugpullRound) {
      // Rugpull round
      multipliers.SCAM = 0.005 + Math.random() * 0.01; // Catastrophic drop
    } else {
      // Post rugpull - dead coin
      multipliers.SCAM = 0.001 + Math.random() * 0.004;
    }

    // MemeCoin logic - very volatile, social media driven
    if (eventType === 'meme') {
      multipliers.MEME = 1.5 + Math.random() * 1.5; // Big social media pumps
    } else if (eventType === 'pump') {
      multipliers.MEME = 1.1 + Math.random() * 0.8;
    } else if (eventType === 'dump') {
      multipliers.MEME = 0.4 + Math.random() * 0.5;
    } else if (eventType === 'rugpull' && round >= 6) {
      // Contagion effect from rugpull
      multipliers.MEME = 0.3 + Math.random() * 0.3;
    } else {
      multipliers.MEME = 0.85 + Math.random() * 0.4;
    }

    // Tether logic - stable with tiny bond yield returns
    const bondYieldRate = 0.0005 + Math.random() * 0.0015; // 0.05% to 0.2% per round
    if (eventType === 'stable') {
      multipliers.TETHER = 1 + bondYieldRate * 1.5; // Slightly higher yield on stable events
    } else if (eventType === 'dump' || eventType === 'rugpull') {
      multipliers.TETHER = 1 + bondYieldRate * 0.5; // Lower yield during market stress
    } else {
      multipliers.TETHER = 1 + bondYieldRate; // Regular bond returns
    }

    return multipliers;
  }

  // Generate a random event for the current round
  async generateRandomEvent(round, previousEvents = []) {
    const eventTypes = ['pump', 'dump', 'meme', 'stable'];
    
    // Special logic for rugpull
    if (round === 6) {
      return this.generateRugpullEvent(round);
    }

    // Weight event types based on round
    let weightedTypes = [...eventTypes];
    if (round <= 2) {
      // Early rounds favor pumps and meme activity
      weightedTypes = [...weightedTypes, 'pump', 'meme'];
    } else if (round >= 7) {
      // Later rounds after rugpull favor dumps and stability
      weightedTypes = [...weightedTypes, 'dump', 'stable'];
    }

    const eventType = weightedTypes[Math.floor(Math.random() * weightedTypes.length)];
    const multipliers = this.generateMarketMultipliers(round, eventType);

    if (this.isInitialized && this.model) {
      try {
        return await this.generateAIEvent(round, eventType, multipliers);
      } catch (error) {
        console.warn("AI generation failed, using fallback:", error);
        return this.generateFallbackEvent(round, eventType, multipliers);
      }
    } else {
      return this.generateFallbackEvent(round, eventType, multipliers);
    }
  }

  async generateAIEvent(round, eventType, multipliers) {
    const prompt = `Generate a realistic cryptocurrency market event for round ${round} of a trading simulation game. 

Event type: ${eventType}
Round: ${round}/8

The game has 3 tokens:
- ScamCoin (SCAM): High risk token that will rugpull in round 6
- MemeCoin (MEME): Volatile meme token influenced by social media  
- Tether (USDT): Stable token backed by bonds with small yields

Create a JSON response with:
{
  "title": "Short catchy title with emoji (max 25 chars)",
  "description": "Brief event description (max 60 chars)",
  "news": "Realistic market news headline (max 100 chars)",
  "effects": {
    "SCAM": ${multipliers.SCAM},
    "MEME": ${multipliers.MEME}, 
    "TETHER": ${multipliers.TETHER}
  }
}

Make it sound like real crypto market news with appropriate excitement/fear based on the event type. Keep it educational but engaging.`;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      const parsedEvent = JSON.parse(text.replace(/```json\n?|\n?```/g, ''));
      return {
        round,
        ...parsedEvent,
        timestamp: new Date().toISOString()
      };
    } catch (parseError) {
      console.warn("Failed to parse AI response, using fallback");
      return this.generateFallbackEvent(round, eventType, multipliers);
    }
  }

  generateFallbackEvent(round, eventType, multipliers) {
    const templates = this.getFallbackEvents();
    const template = templates.find(t => t.type === eventType) || templates[0];
    
    const title = template.title[Math.floor(Math.random() * template.title.length)];
    const news = template.news[Math.floor(Math.random() * template.news.length)];
    
    return {
      round,
      title,
      description: this.getEventDescription(eventType, round),
      news,
      effects: multipliers,
      timestamp: new Date().toISOString()
    };
  }

  generateRugpullEvent(round) {
    const rugpullMultipliers = {
      SCAM: 0.001 + Math.random() * 0.01,
      MEME: 0.3 + Math.random() * 0.2,
      TETHER: 1 + (0.0002 + Math.random() * 0.0008) // Flight to safety
    };

    return {
      round,
      title: "💀 RUGPULL DETECTED!",
      description: "ScamCoin developers drain liquidity and disappear!",
      news: "BREAKING: ScamCoin founders vanish with $10M+ in liquidity. Token crashes 99.9%!",
      effects: rugpullMultipliers,
      timestamp: new Date().toISOString()
    };
  }

  getEventDescription(eventType, round) {
    const descriptions = {
      pump: "Bullish sentiment drives crypto markets higher!",
      dump: "Market correction as sellers take profits.",
      meme: "Social media buzz creates trading frenzy!",
      stable: "Institutional flows stabilize the market.",
      rugpull: "Liquidity providers abandon the project!"
    };
    
    return descriptions[eventType] || descriptions.stable;
  }

  // Generate trading advice based on current market conditions
  async generateTradingTip(round, portfolioValue, holdings) {
    const tips = [
      "💡 Diversification reduces risk - don't put all funds in one token",
      "⚠️ High returns often come with high risk - be cautious of promises",
      "📊 Monitor liquidity levels - low liquidity can mean manipulation",
      "🔍 Research the team behind any project before investing",
      "💰 Never invest more than you can afford to lose",
      "📈 Dollar-cost averaging can reduce volatility impact",
      "🚨 Be extra careful of tokens promising guaranteed returns",
      "🏦 Stablecoins offer predictable returns but limited upside"
    ];

    return tips[Math.floor(Math.random() * tips.length)];
  }
}

// Export singleton instance
export const geminiMarketService = new GeminiMarketService();
export default GeminiMarketService;