import { GoogleGenerativeAI } from "@google/generative-ai";

class GeminiMarketService {
  constructor() {
    // Use environment variable or fallback (for demo purposes, we'll use a fallback system)
    this.apiKey = process.env.REACT_APP_GEMINI_API_KEY;
    this.genAI = null;
    this.model = null;
    this.isInitialized = false;

    // Rug pull tracking
    this.rugPullHappened = false;
    this.rugPullRound = null;

    this.initializeAI();
  }

  async initializeAI() {
    try {
      if (this.apiKey) {
        this.genAI = new GoogleGenerativeAI(this.apiKey);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
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

  // Fallback event templates when AI is not available - EXTRA SPICY EDITION
  getFallbackEvents() {
    const eventTemplates = [
      {
        type: 'pump',
        title: ['🚀 To The Moon!', '💎 Diamond Hands Win!', '📈 Number Go Up!', '🦍 Apes Together Strong!'],
        news: [
          'Billionaire with anime pfp YOLOs $100M into crypto after watching The Matrix',
          'Fortune 500 CEO announces "Bitcoin is the way" during earnings call meltdown',
          'Celebrity chef Gordon Ramsay calls traditional finance "bloody awful" and buys crypto',
          'NASA confirms crypto is "literally rocket science" and invests pension fund',
          'Warren Buffett spotted with "HODL" tattoo, Berkshire Hathaway pivots to DeFi'
        ]
      },
      {
        type: 'dump',
        title: ['📉 Rekt City', '😱 Panic at the Disco!', '💥 Red Wedding', '🔥 This Is Fine'],
        news: [
          'Whale accidentally sells entire bag while trying to buy coffee on mobile app',
          'FUD spreads faster than gossip at a high school reunion',
          'Paper hands activate after seeing one red candle like they\'re in a horror movie',
          'Market crashes harder than Windows Vista after "experts" predict doom',
          'Leveraged longs get liquidated faster than Thanos snapping his fingers'
        ]
      },
      {
        type: 'meme',
        title: ['🐕 Much Wow!', '🚀 Viral AF!', '💫 Main Character Energy!', '🔥 Absolutely Sending It!'],
        news: [
          'TikTok trend makes MemeCoin more famous than that dress (you know the one)',
          'Influencer with 12 followers creates viral meme, token goes parabolic',
          'Reddit WSB discovers crypto, chaos ensues like Avengers: Endgame portal scene',
          'Cat video featuring crypto wallet gets 50M views, internet loses collective mind',
          'Twitter spaces conversation about "gm" philosophy pumps meme coins to Mars'
        ]
      },
      {
        type: 'stable',
        title: ['🏦 Boring But Rich', '📊 Adult Supervision', '💼 Big Brain Time', '⚖️ Balance Restored'],
        news: [
          'Fed Chair Jerome Powell admits "maybe stability is actually pretty cool"',
          'Tether audit reveals they actually have more money than claimed (plot twist!)',
          'BlackRock CEO spotted reading "Stablecoins for Dummies" on vacation',
          'Banking giants realize boring 4% yields beat casino gambling, shocking nobody',
          'Institutional money flows into bonds like kids running to ice cream truck'
        ]
      },
      {
        type: 'rugpull',
        title: ['💀 Exit Scammed!', '🚨 Rug Pulled!', '⚠️ Bamboozled!', '🏃‍♂️ Dev Team Vanished!'],
        news: [
          'ScamCoin devs disappear faster than my dad going to get milk 15 years ago',
          'Anonymous team reveals they were three kids in a trench coat all along',
          'Smart contract backdoor wider than the plot holes in Game of Thrones S8',
          'Founders caught on Ring doorbell cam fleeing with liquidity pool bags',
          'Project roadmap updated to show single destination: "Cayman Islands"'
        ]
      }
    ];

    return eventTemplates;
  }

  // AI-driven rugpull and market prediction
  async generateMarketPrediction(round, previousEvents = [], tokenPrices = {}) {
    if (!this.isInitialized || !this.model) {
      return this.getFallbackMarketPrediction(round);
    }

    const prompt = `Crypto market analysis for round ${round}/8:

Current state:
- Round: ${round}
- ScamCoin price: $${tokenPrices.SCAM?.toFixed(4) || '0.50'}
- MemeCoin price: $${tokenPrices.MEME?.toFixed(4) || '2.00'} 
- Tether price: $${tokenPrices.TETHER?.toFixed(4) || '1.00'}
- Rugpull happened: ${this.rugPullHappened}
- Previous events: ${previousEvents.slice(-2).map(e => e.title).join(', ')}

Predict this round's market behavior. Consider:
- Rugpull risk (ScamCoin is suspicious, could happen any round 3+)
- MemeCoin EXTREME volatility (social media chaos, can moon or crash violently)
- Tether stability (bond-like returns)
- Market psychology and contagion effects

IMPORTANT: MemeCoin should be WILDLY volatile - it can surge 300%+ or crash 80%+ based on viral trends, influencer tweets, or market sentiment. Make it truly chaotic!

Return JSON:
{
  "shouldRugpull": boolean,
  "eventType": "pump|dump|meme|stable|rugpull",
  "marketMultipliers": {
    "SCAM": number (0.001-3.0),
    "MEME": number (0.1-4.0), 
    "TETHER": number (0.999-1.003)
  },
  "reasoning": "Brief explanation (50 chars max)"
}`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      const parsed = JSON.parse(text.replace(/```json\n?|\n?```/g, ''));
      return parsed;
    } catch (error) {
      console.warn('AI market prediction failed:', error);
      return this.getFallbackMarketPrediction(round);
    }
  }

  // Fallback market prediction when AI fails
  getFallbackMarketPrediction(round) {
    const eventTypes = ['pump', 'dump', 'meme', 'stable'];
    let shouldRugpull = false;

    // Simple rugpull logic for fallback
    if (!this.rugPullHappened && round >= 4) {
      shouldRugpull = Math.random() < (round - 3) * 0.2;
    }

    const eventType = shouldRugpull ? 'rugpull' : eventTypes[Math.floor(Math.random() * eventTypes.length)];

    // Basic multipliers for fallback with extreme MemeCoin volatility
    const multipliers = {
      SCAM: shouldRugpull ? 0.005 : (0.8 + Math.random() * 1.2),
      MEME: 0.1 + Math.random() * 3.9, // Extreme volatility: 0.1x to 4.0x
      TETHER: 0.999 + Math.random() * 0.003
    };

    return {
      shouldRugpull,
      eventType,
      marketMultipliers: multipliers,
      reasoning: 'Fallback random prediction'
    };
  }

  // Generate AI-driven market event for the current round
  async generateRandomEvent(round, previousEvents = [], tokenPrices = {}) {
    // Get AI market prediction
    const prediction = await this.generateMarketPrediction(round, previousEvents, tokenPrices);

    // Handle rugpull if AI determines it should happen
    if (prediction.shouldRugpull && !this.rugPullHappened) {
      this.rugPullHappened = true;
      this.rugPullRound = round;
      const expandedRug = this.expandMultipliers(tokenPrices, prediction.marketMultipliers, 'rugpull', true);
      return await this.generateRugpullEvent(round, expandedRug);
    }

    // Generate regular event based on AI prediction
    const eventType = prediction.eventType === 'rugpull' ? 'dump' : prediction.eventType;
    const multipliers = this.expandMultipliers(tokenPrices, prediction.marketMultipliers, eventType, false);

    if (this.isInitialized && this.model) {
      try {
        return await this.generateAIEvent(round, eventType, multipliers, tokenPrices, prediction.reasoning);
      } catch (error) {
        console.warn("AI generation failed, using fallback:", error);
        return this.generateFallbackEvent(round, eventType, multipliers);
      }
    } else {
      return this.generateFallbackEvent(round, eventType, multipliers);
    }
  }

  async generateAIEvent(round, eventType, multipliers, tokenPrices = {}, reasoning = '') {
    const mostAffectedToken = this.getMostAffectedToken(multipliers);

    const prompt = `Create crypto event for round ${round}. Type: ${eventType}. Focus token: ${mostAffectedToken}. Context: ${reasoning}

Make it fun with pop culture refs and crypto slang. Educational but entertaining.

Return JSON:
{
  "title": "Fun title with emoji (30 chars max)",
  "description": "Brief description (70 chars max)", 
  "news": "Entertaining headline with pop culture ref (140 chars max)",
  "primaryToken": "${mostAffectedToken}"
}`;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    try {
      const parsedEvent = JSON.parse(text.replace(/```json\n?|\n?```/g, ''));
      return {
        round,
        ...parsedEvent,
        effects: multipliers,
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

  async generateRugpullEvent(round, aiMultipliers = null) {
    const rugpullMultipliers = aiMultipliers || {
      SCAM: 0.001 + Math.random() * 0.01,
      MEME: 0.3 + Math.random() * 0.2,
      TETHER: 1 + (0.0002 + Math.random() * 0.0008) // Flight to safety
    };

    if (this.isInitialized && this.model) {
      try {
        return await this.generateAIRugpullEvent(round, rugpullMultipliers);
      } catch (error) {
        console.warn("AI rugpull generation failed, using fallback:", error);
        return this.generateFallbackRugpullEvent(round, rugpullMultipliers);
      }
    } else {
      return this.generateFallbackRugpullEvent(round, rugpullMultipliers);
    }
  }

  async generateAIRugpullEvent(round, multipliers) {
    const prompt = `ScamCoin just rugpulled in round ${round}! Create a darkly funny headline about crypto devs vanishing with liquidity. Use pop culture references and crypto slang. Make it educational about rugpull risks.

Return JSON:
{
  "title": "💀 RUGPULL EXECUTED!",
  "description": "ScamCoin developers drain liquidity and vanish into the void!",
  "news": "Savage rugpull headline with pop culture ref (140 chars max)",
  "primaryToken": "SCAM"
}`;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    try {
      const parsedEvent = JSON.parse(text.replace(/```json\n?|\n?```/g, ''));
      return {
        round,
        ...parsedEvent,
        effects: multipliers,
        timestamp: new Date().toISOString()
      };
    } catch (parseError) {
      console.warn("Failed to parse AI rugpull response, using fallback");
      return this.generateFallbackRugpullEvent(round, multipliers);
    }
  }

  generateFallbackRugpullEvent(round, multipliers) {
    const rugpullNews = [
      'ScamCoin devs disappear faster than my dad going to get milk 15 years ago',
      'Anonymous team reveals they were three kids in a trench coat all along',
      'Smart contract backdoor wider than the plot holes in Game of Thrones S8',
      'Founders caught on Ring doorbell cam fleeing with liquidity pool bags',
      'Project roadmap updated to show single destination: "Cayman Islands"'
    ];

    return {
      round,
      title: "💀 RUGPULL EXECUTED!",
      description: "ScamCoin developers drain liquidity and vanish into the void!",
      news: rugpullNews[Math.floor(Math.random() * rugpullNews.length)],
      effects: multipliers,
      timestamp: new Date().toISOString()
    };
  }

  getMostAffectedToken(multipliers) {
    const tokens = Object.keys(multipliers || {});
    if (!tokens.length) return 'SCAM';
    let mostAffected = tokens[0];
    let largestChange = Math.abs((multipliers[mostAffected] || 1) - 1);
    tokens.forEach(token => {
      const change = Math.abs((multipliers[token] || 1) - 1);
      if (change > largestChange) {
        largestChange = change;
        mostAffected = token;
      }
    });
    return mostAffected;
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

  // Reset rug pull state for new game
  resetGameState() {
    this.rugPullHappened = false;
    this.rugPullRound = null;
    console.log("Game state reset - rug pull timing randomized");
  }

  // Generate trading advice based on current market conditions - CHAD EDITION
  async generateTradingTip(round, portfolioValue, holdings) {
    const rugPullTips = this.rugPullHappened
      ? [
        "💀 Post-rugpull life hits different - diversification isn't just a fancy word, it's survival",
        "📉 Market contagion spreads faster than drama on Twitter - one token's death affects the whole squad",
        "🏦 Safe havens like Tether suddenly looking like that reliable friend who always brings snacks",
        "🤡 The real treasure was the lessons we learned along the way (and the money we lost)",
        "⚰️ F in the chat for ScamCoin - should've seen those red flags from orbit"
      ]
      : [
        "⚠️ Rug pull season starts round 4 - like horror movie rules, but for your wallet",
        "🚨 If it sounds too good to be true, it's probably run by someone named 'CryptoPrince2005'",
        "🔍 DYOR isn't just letters - it's the difference between lambo and ramen",
        "🎭 Anonymous teams are like dating profiles without photos - proceed with caution",
        "🚩 More red flags than a communist parade? Time to exit stage left"
      ];

    const generalTips = [
      "💡 Diversification is like a balanced breakfast - boring but keeps you alive",
      "📊 Low liquidity = easier to manipulate than a reality TV show",
      "💰 Never invest your rent money unless your backup plan is living in a cardboard lambo",
      "📈 DCA (Dollar Cost Average) - it's like going to the gym but for your portfolio",
      "🏦 Stablecoins: the vanilla ice cream of crypto - boring but reliable",
      "🦍 Diamond hands are cool, but paper hands pay the bills sometimes",
      "📱 Don't FOMO into trades like you're buying concert tickets for your favorite band",
      "🎰 This isn't a casino, but somehow everyone's acting like they're in Vegas"
    ];

    const allTips = [...rugPullTips, ...generalTips];
    return allTips[Math.floor(Math.random() * allTips.length)];
  }

  // Public helper used by UI fallback
  generateBasicEvent(round, tokenPrices = {}) {
    const eventTypes = ['pump', 'dump', 'meme', 'stable'];
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const baseMultipliers = {
      SCAM: eventType === 'dump' ? 0.8 + Math.random() * 0.2 : 0.9 + Math.random() * 0.2,
      MEME: eventType === 'meme' ? 0.1 + Math.random() * 3.9 : 0.85 + Math.random() * 0.4,
      TETHER: 0.999 + Math.random() * 0.003
    };
    const effects = this.expandMultipliers(tokenPrices, baseMultipliers, eventType, false);
    const templates = this.getFallbackEvents();
    const template = templates.find(t => t.type === eventType) || templates[0];
    const title = template.title[Math.floor(Math.random() * template.title.length)];
    const news = template.news[Math.floor(Math.random() * template.news.length)];
    return {
      round,
      title,
      description: this.getEventDescription(eventType, round),
      news,
      effects,
      timestamp: new Date().toISOString()
    };
  }

  // Expand base multipliers to all provided token symbols
  expandMultipliers(tokenPrices = {}, baseMultipliers = {}, eventType = 'stable', isRugpull = false) {
    const keys = Object.keys(tokenPrices || {});
    const effects = {};
    keys.forEach(key => {
      if (baseMultipliers[key] != null) {
        effects[key] = baseMultipliers[key];
        return;
      }
      const sym = key.toUpperCase();
      if (isRugpull) {
        if (sym === 'SCAM') {
          effects[key] = 0.001 + Math.random() * 0.01;
        } else if (sym === 'TETHER' || sym === 'USDT') {
          effects[key] = 1.0002 + Math.random() * 0.0008;
        } else {
          effects[key] = 0.85 + Math.random() * 0.2; // contagion
        }
        return;
      }
      switch (eventType) {
        case 'pump':
          if (sym === 'BTC' || sym === 'ETH' || sym === 'DEFI') effects[key] = 1.02 + Math.random() * 0.18;
          else if (sym === 'SOL' || sym === 'AI' || sym === 'MEME') effects[key] = 1.05 + Math.random() * 0.35;
          else if (sym === 'TETHER' || sym === 'USDT') effects[key] = 0.999 + Math.random() * 0.003;
          else effects[key] = 0.95 + Math.random() * 0.3;
          break;
        case 'dump':
          if (sym === 'BTC' || sym === 'ETH' || sym === 'DEFI') effects[key] = 0.85 + Math.random() * 0.13;
          else if (sym === 'SOL' || sym === 'AI' || sym === 'MEME') effects[key] = 0.6 + Math.random() * 0.35;
          else if (sym === 'TETHER' || sym === 'USDT') effects[key] = 0.999 + Math.random() * 0.003;
          else effects[key] = 0.7 + Math.random() * 0.25;
          break;
        case 'meme':
          if (sym === 'MEME' || sym === 'AI') effects[key] = 0.1 + Math.random() * 3.9;
          else if (sym === 'BTC' || sym === 'ETH' || sym === 'DEFI') effects[key] = 0.95 + Math.random() * 0.2;
          else if (sym === 'TETHER' || sym === 'USDT') effects[key] = 0.999 + Math.random() * 0.003;
          else effects[key] = 0.9 + Math.random() * 0.3;
          break;
        default: // stable
          if (sym === 'TETHER' || sym === 'USDT') effects[key] = 1.0002 + Math.random() * 0.0028;
          else effects[key] = 0.98 + Math.random() * 0.04;
      }
    });
    return effects;
  }

  // Probability helper for UI banner
  calculateRugPullProbability(round) {
    if (this.rugPullHappened) return 1;
    if (round < 4) return 0.05 * round; // gentle ramp
    const p = Math.min(0.85, 0.2 * (round - 3));
    return p;
  }
}

// Export singleton instance
export const geminiMarketService = new GeminiMarketService();
export default GeminiMarketService;