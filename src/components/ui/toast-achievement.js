import React from 'react';

export default function AchievementToaster() {
  const [toasts, setToasts] = React.useState([]);

  React.useEffect(() => {
    const onUnlock = (e) => {
      const { def } = e.detail || {};
      const id = Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev, { id, title: def?.title || 'Achievement Unlocked', subtitle: def?.hint }]);
      setTimeout(() => setToasts((prev) => prev.filter(t => t.id !== id)), 4000);
    };
    window.addEventListener('achievement:unlocked', onUnlock);
    return () => window.removeEventListener('achievement:unlocked', onUnlock);
  }, []);

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] space-y-3">
      {toasts.map((t) => (
        <div key={t.id} className="min-w-[260px] max-w-sm p-4 rounded-xl border bg-emerald-600/20 border-emerald-400/30 text-white backdrop-blur-md shadow-xl">
          <div className="text-sm font-semibold">🏆 {t.title}</div>
          {t.subtitle && <div className="text-xs text-white/80 mt-1">{t.subtitle}</div>}
        </div>
      ))}
    </div>
  );
}


