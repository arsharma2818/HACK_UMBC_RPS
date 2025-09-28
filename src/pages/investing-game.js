import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    AlertTriangle,
    Zap,
    Shield,
    Play,
    Pause,
    RotateCcw,
    PieChart as PieChartIcon,
    BarChart3
} from "lucide-react";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const INITIAL_BALANCE = 100;
const TOTAL_ROUNDS = 8;

// Token configurations
const TOKENS = {
    SCAM: {
        id: 'SCAM',
        name: 'ScamCoin',
        symbol: 'SCAM',
        color: '#ef4444',
        icon: AlertTriangle,
        description: 'High risk token - looks promising but will rugpull!',
        initialPrice: 0.50,
        riskLevel: 'High'
    },
    MEME: {
        id: 'MEME',
        name: 'MemeCoin',
        symbol: 'MEME',
        color: '#f59e0b',
        icon: Zap,
        description: 'Volatile meme token - influenced by social media',
        initialPrice: 2.00,
        riskLevel: 'Medium'
    },
    STABLE: {
        id: 'STABLE',
        name: 'StableCoin',
        symbol: 'USDT',
        color: '#22c55e',
        icon: Shield,
        description: 'Safe stable token - boring but reliable',
        initialPrice: 1.00,
        riskLevel: 'Low'
    }
};

// Game events for each round
const GAME_EVENTS = [
    {
        round: 1,
        title: "Market Opens! 📈",
        description: "Welcome to the crypto market! All tokens are available for trading.",
        effects: { SCAM: 1.2, MEME: 1.1, STABLE: 1.0 },
        news: "New tokens hit the market with promising whitepapers!"
    },
    {
        round: 2,
        title: "Elon Tweets 🚀",
        description: "A famous billionaire tweets about meme coins!",
        effects: { SCAM: 1.3, MEME: 2.5, STABLE: 1.0 },
        news: "Social media buzz drives massive speculation!"
    },
    {
        round: 3,
        title: "Whale Activity 🐋",
        description: "Large investors are moving funds around.",
        effects: { SCAM: 1.8, MEME: 0.7, STABLE: 1.0 },
        news: "Smart money seems to be accumulating ScamCoin..."
    },
    {
        round: 4,
        title: "Market Correction 📉",
        description: "Reality sets in as prices begin to normalize.",
        effects: { SCAM: 1.5, MEME: 1.2, STABLE: 1.0 },
        news: "Analysts warn about overvalued assets."
    },
    {
        round: 5,
        title: "FOMO Peaks 🔥",
        description: "Fear of missing out drives retail investors crazy!",
        effects: { SCAM: 3.0, MEME: 1.8, STABLE: 1.0 },
        news: "ScamCoin hits all-time highs! Everyone's getting rich!"
    },
    {
        round: 6,
        title: "RUG PULL! 💀",
        description: "ScamCoin developers have drained the liquidity pool!",
        effects: { SCAM: 0.01, MEME: 0.4, STABLE: 1.0 },
        news: "BREAKING: ScamCoin founders vanish with $10M! Token crashes 99%!"
    },
    {
        round: 7,
        title: "Panic Selling 😱",
        description: "Markets crash as fear spreads across all crypto!",
        effects: { SCAM: 0.005, MEME: 0.2, STABLE: 0.99 },
        news: "Contagion spreads as investors flee to safety."
    },
    {
        round: 8,
        title: "Market Recovery 🌱",
        description: "Dust settles and quality projects begin to recover.",
        effects: { SCAM: 0.001, MEME: 0.8, STABLE: 1.0 },
        news: "Survivors start rebuilding as lessons are learned."
    }
];

export default function InvestingGame() {
    // Game state
    const [gameStarted, setGameStarted] = useState(false);
    const [currentRound, setCurrentRound] = useState(0);
    const [cashBalance, setCashBalance] = useState(INITIAL_BALANCE);
    const [holdings, setHoldings] = useState({ SCAM: 0, MEME: 0, STABLE: 0 });
    const [tokenPrices, setTokenPrices] = useState({
        SCAM: TOKENS.SCAM.initialPrice,
        MEME: TOKENS.MEME.initialPrice,
        STABLE: TOKENS.STABLE.initialPrice
    });
    const [portfolioHistory, setPortfolioHistory] = useState([]);
    const [eventFeed, setEventFeed] = useState([]);
    const [buyAmounts, setBuyAmounts] = useState({ SCAM: '', MEME: '', STABLE: '' });

    // Calculate portfolio value
    const portfolioValue = cashBalance +
        Object.keys(holdings).reduce((total, tokenId) =>
            total + (holdings[tokenId] * tokenPrices[tokenId]), 0
        );

    // Start game
    const startGame = useCallback(() => {
        setGameStarted(true);
        setCurrentRound(1);
        setEventFeed([{
            id: Date.now(),
            round: 1,
            message: "🎮 Game Started! You have $100 to invest wisely.",
            timestamp: new Date().toLocaleTimeString(),
            type: 'info'
        }]);
        setPortfolioHistory([{ round: 0, value: INITIAL_BALANCE }]);
    }, []);

    // Reset game
    const resetGame = () => {
        setGameStarted(false);
        setCurrentRound(0);
        setCashBalance(INITIAL_BALANCE);
        setHoldings({ SCAM: 0, MEME: 0, STABLE: 0 });
        setTokenPrices({
            SCAM: TOKENS.SCAM.initialPrice,
            MEME: TOKENS.MEME.initialPrice,
            STABLE: TOKENS.STABLE.initialPrice
        });
        setPortfolioHistory([]);
        setEventFeed([]);
        setBuyAmounts({ SCAM: '', MEME: '', STABLE: '' });
    };

    // Process round
    const nextRound = () => {
        if (currentRound >= TOTAL_ROUNDS) return;

        const event = GAME_EVENTS[currentRound];

        // Update prices based on event effects
        const newPrices = { ...tokenPrices };
        Object.keys(event.effects).forEach(tokenId => {
            newPrices[tokenId] = tokenPrices[tokenId] * event.effects[tokenId];
        });
        setTokenPrices(newPrices);

        // Add event to feed
        const newEvent = {
            id: Date.now(),
            round: currentRound + 1,
            message: `📰 ${event.title} ${event.news}`,
            timestamp: new Date().toLocaleTimeString(),
            type: event.round === 6 ? 'danger' : event.round === 8 ? 'success' : 'info'
        };
        setEventFeed(prev => [newEvent, ...prev]);

        // Update portfolio history
        const newPortfolioValue = cashBalance +
            Object.keys(holdings).reduce((total, tokenId) =>
                total + (holdings[tokenId] * newPrices[tokenId]), 0
            );
        setPortfolioHistory(prev => [...prev, { round: currentRound + 1, value: newPortfolioValue }]);

        setCurrentRound(prev => prev + 1);
    };

    // Buy token function
    const buyToken = (tokenId) => {
        const amount = parseFloat(buyAmounts[tokenId]);
        if (!amount || amount <= 0 || amount > cashBalance) return;

        const tokenAmount = amount / tokenPrices[tokenId];
        setHoldings(prev => ({ ...prev, [tokenId]: prev[tokenId] + tokenAmount }));
        setCashBalance(prev => prev - amount);
        setBuyAmounts(prev => ({ ...prev, [tokenId]: '' }));

        // Add to event feed
        setEventFeed(prev => [{
            id: Date.now(),
            round: currentRound,
            message: `💰 Bought ${tokenAmount.toFixed(4)} ${TOKENS[tokenId].symbol} for $${amount.toFixed(2)}`,
            timestamp: new Date().toLocaleTimeString(),
            type: 'trade'
        }, ...prev]);
    };

    // Sell token function
    const sellToken = (tokenId) => {
        if (holdings[tokenId] <= 0) return;

        const value = holdings[tokenId] * tokenPrices[tokenId];
        setCashBalance(prev => prev + value);
        const soldAmount = holdings[tokenId];
        setHoldings(prev => ({ ...prev, [tokenId]: 0 }));

        // Add to event feed
        setEventFeed(prev => [{
            id: Date.now(),
            round: currentRound,
            message: `💸 Sold ${soldAmount.toFixed(4)} ${TOKENS[tokenId].symbol} for $${value.toFixed(2)}`,
            timestamp: new Date().toLocaleTimeString(),
            type: 'trade'
        }, ...prev]);
    };

    // Prepare pie chart data
    const pieData = Object.keys(holdings).map(tokenId => ({
        name: TOKENS[tokenId].name,
        value: holdings[tokenId] * tokenPrices[tokenId],
        color: TOKENS[tokenId].color
    })).filter(item => item.value > 0);

    // Add cash to pie chart
    if (cashBalance > 0) {
        pieData.push({ name: 'Cash', value: cashBalance, color: '#64748b' });
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        🎮 Rugpull Simulator: The Investing Game
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                        Learn investing fundamentals in a safe environment. Experience the thrill of crypto trading
                        and the harsh reality of rug pulls without risking real money!
                    </p>

                    <div className="flex gap-4 justify-center">
                        {!gameStarted ? (
                            <Button onClick={startGame} size="lg" className="bg-green-600 hover:bg-green-700">
                                <Play className="w-5 h-5 mr-2" />
                                Start Game
                            </Button>
                        ) : (
                            <>
                                <Button
                                    onClick={nextRound}
                                    disabled={currentRound >= TOTAL_ROUNDS}
                                    size="lg"
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    {currentRound >= TOTAL_ROUNDS ? 'Game Over' : `Next Round (${currentRound + 1}/${TOTAL_ROUNDS})`}
                                </Button>
                                <Button onClick={resetGame} variant="outline" size="lg">
                                    <RotateCcw className="w-5 h-5 mr-2" />
                                    Reset
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                {gameStarted && (
                    <>
                        {/* Portfolio Overview */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                            <Card className="lg:col-span-2">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <BarChart3 className="w-5 h-5" />
                                        Portfolio Performance
                                    </CardTitle>
                                    <CardDescription>
                                        Track your investment journey over {TOTAL_ROUNDS} rounds
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {portfolioHistory.length > 1 && (
                                        <ResponsiveContainer width="100%" height={250}>
                                            <LineChart data={portfolioHistory}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="round" />
                                                <YAxis />
                                                <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Portfolio Value']} />
                                                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    )}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <PieChartIcon className="w-5 h-5" />
                                        Holdings Distribution
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {pieData.length > 0 ? (
                                        <ResponsiveContainer width="100%" height={250}>
                                            <PieChart>
                                                <Pie
                                                    data={pieData}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={40}
                                                    outerRadius={80}
                                                    dataKey="value"
                                                >
                                                    {pieData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <div className="h-[250px] flex items-center justify-center text-gray-500">
                                            No investments yet
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Portfolio Summary */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-600">Portfolio Value</p>
                                            <p className="text-2xl font-bold">${portfolioValue.toFixed(2)}</p>
                                        </div>
                                        <DollarSign className="w-8 h-8 text-green-600" />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-600">Cash Balance</p>
                                            <p className="text-2xl font-bold">${cashBalance.toFixed(2)}</p>
                                        </div>
                                        <DollarSign className="w-8 h-8 text-blue-600" />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-600">Total Return</p>
                                            <p className={`text-2xl font-bold ${portfolioValue >= 100 ? 'text-green-600' : 'text-red-600'}`}>
                                                {portfolioValue >= 100 ? '+' : ''}${(portfolioValue - 100).toFixed(2)}
                                            </p>
                                        </div>
                                        {portfolioValue >= 100 ?
                                            <TrendingUp className="w-8 h-8 text-green-600" /> :
                                            <TrendingDown className="w-8 h-8 text-red-600" />
                                        }
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-600">Round</p>
                                            <p className="text-2xl font-bold">{currentRound}/{TOTAL_ROUNDS}</p>
                                        </div>
                                        <Badge variant="outline" className="text-lg px-3 py-1">
                                            {currentRound >= TOTAL_ROUNDS ? 'Finished' : 'Active'}
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Token Trading Interface */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Trading Panel */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Token Trading</CardTitle>
                                    <CardDescription>
                                        Buy and sell tokens. Choose wisely - some may not end well!
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {Object.values(TOKENS).map(token => {
                                        const Icon = token.icon;
                                        const holdingValue = holdings[token.id] * tokenPrices[token.id];

                                        return (
                                            <div key={token.id} className="border rounded-lg p-4">
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-center gap-3">
                                                        <Icon className="w-6 h-6" style={{ color: token.color }} />
                                                        <div>
                                                            <h4 className="font-semibold">{token.name}</h4>
                                                            <p className="text-sm text-gray-600">{token.description}</p>
                                                        </div>
                                                    </div>
                                                    <Badge
                                                        variant="outline"
                                                        className={
                                                            token.riskLevel === 'High' ? 'border-red-500 text-red-700' :
                                                                token.riskLevel === 'Medium' ? 'border-yellow-500 text-yellow-700' :
                                                                    'border-green-500 text-green-700'
                                                        }
                                                    >
                                                        {token.riskLevel} Risk
                                                    </Badge>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                                                    <div>Price: <span className="font-mono">${tokenPrices[token.id].toFixed(4)}</span></div>
                                                    <div>Owned: <span className="font-mono">{holdings[token.id].toFixed(4)}</span></div>
                                                    <div>Value: <span className="font-mono">${holdingValue.toFixed(2)}</span></div>
                                                </div>

                                                <div className="flex gap-2">
                                                    <input
                                                        type="number"
                                                        placeholder="$ Amount"
                                                        value={buyAmounts[token.id]}
                                                        onChange={(e) => setBuyAmounts(prev => ({ ...prev, [token.id]: e.target.value }))}
                                                        className="flex-1 px-3 py-2 border rounded-md text-sm"
                                                        min="0"
                                                        max={cashBalance}
                                                        step="0.01"
                                                    />
                                                    <Button
                                                        onClick={() => buyToken(token.id)}
                                                        disabled={!buyAmounts[token.id] || parseFloat(buyAmounts[token.id]) <= 0 || parseFloat(buyAmounts[token.id]) > cashBalance}
                                                        size="sm"
                                                        className="bg-green-600 hover:bg-green-700"
                                                    >
                                                        Buy
                                                    </Button>
                                                    <Button
                                                        onClick={() => sellToken(token.id)}
                                                        disabled={holdings[token.id] <= 0}
                                                        size="sm"
                                                        variant="outline"
                                                    >
                                                        Sell All
                                                    </Button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </CardContent>
                            </Card>

                            {/* Event Feed */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Market News & Events</CardTitle>
                                    <CardDescription>
                                        Stay updated with the latest market developments
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3 max-h-96 overflow-y-auto">
                                        {eventFeed.map(event => (
                                            <div
                                                key={event.id}
                                                className={`p-3 rounded-lg border-l-4 ${event.type === 'danger' ? 'border-red-500 bg-red-50' :
                                                        event.type === 'success' ? 'border-green-500 bg-green-50' :
                                                            event.type === 'trade' ? 'border-blue-500 bg-blue-50' :
                                                                'border-gray-500 bg-gray-50'
                                                    }`}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <p className="text-sm font-medium">{event.message}</p>
                                                    <span className="text-xs text-gray-500">{event.timestamp}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Educational Note */}
                        {currentRound >= TOTAL_ROUNDS && (
                            <Card className="mt-6 border-yellow-200 bg-yellow-50">
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-semibold mb-2">🎓 Game Complete - What Did You Learn?</h3>
                                    <div className="text-sm text-gray-700 space-y-2">
                                        <p><strong>Risk vs Return:</strong> Higher risk tokens like ScamCoin offered huge gains but devastating losses.</p>
                                        <p><strong>Diversification:</strong> Spreading investments across different assets can reduce risk.</p>
                                        <p><strong>Due Diligence:</strong> Research projects thoroughly - if it seems too good to be true, it probably is!</p>
                                        <p><strong>Market Volatility:</strong> Crypto markets are highly unpredictable and influenced by social sentiment.</p>
                                        <p><strong>Final Portfolio Value:</strong> ${portfolioValue.toFixed(2)} (Started with $100.00)</p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}