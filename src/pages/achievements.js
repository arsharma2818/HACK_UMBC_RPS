import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ShoppingCart, Coins, TrendingUp, Flag, ShieldAlert, Repeat, Skull, Trophy } from 'lucide-react';
import { getAllAchievements, resetAchievements } from '../services/achievements';

export default function AchievementsPage() {
  const [items, setItems] = React.useState(getAllAchievements());

  const refresh = () => setItems(getAllAchievements());

  const onReset = () => {
    if (window.confirm('Reset all achievements?')) {
      resetAchievements();
      refresh();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-white">Achievements</h1>
            <div className="flex gap-2">
              <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20" onClick={refresh}>Refresh</Button>
              <Button variant="destructive" className="bg-red-500/20 text-red-200 border-red-400/30 hover:bg-red-500/30" onClick={onReset}>Reset</Button>
            </div>
          </div>

          <Card className="bg-white/10 border border-white/20 text-white backdrop-blur-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-300" />
                <CardTitle>Your progress</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {items.map((ach) => (
                  <li key={ach.id}>
                    <div
                      className={`group relative p-4 rounded-2xl border shadow-lg transition-all overflow-hidden ${
                        ach.unlocked
                          ? 'bg-gradient-to-br from-emerald-500/15 to-teal-500/10 border-emerald-400/30 opacity-100 hover:from-emerald-500/20 hover:to-teal-500/15'
                          : 'bg-gradient-to-br from-white/10 to-white/5 border-white/15 opacity-50 hover:opacity-70'
                      }`}
                      title={ach.hint}
                    >
                      <div className="relative z-10 flex items-start gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border backdrop-blur-sm ${ach.unlocked ? 'bg-emerald-500/20 border-emerald-400/30' : 'bg-white/10 border-white/20'}`}>
                          {getIcon(ach.icon, ach.unlocked)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold leading-tight">{ach.title}</h3>
                          {ach.unlocked && (
                            <p className="text-[10px] uppercase tracking-wider mt-1 text-emerald-300">Unlocked</p>
                          )}
                        </div>
                      </div>
                      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
                      {/* Hover hint overlay */}
                      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-center p-4">
                        <p className="text-sm text-white/90 max-w-xs">{ach.hint}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

function getIcon(name, unlocked) {
  const cls = unlocked ? 'text-emerald-300' : 'text-white/70';
  const common = { className: `w-6 h-6 ${cls}` };
  switch (name) {
    case 'ShoppingCart':
      return <ShoppingCart {...common} />;
    case 'Coins':
      return <Coins {...common} />;
    case 'TrendingUp':
      return <TrendingUp {...common} />;
    case 'Flag':
      return <Flag {...common} />;
    case 'ShieldAlert':
      return <ShieldAlert {...common} />;
    case 'Repeat':
      return <Repeat {...common} />;
    case 'Skull':
      return <Skull {...common} />;
    default:
      return <Trophy {...common} />;
  }
}


