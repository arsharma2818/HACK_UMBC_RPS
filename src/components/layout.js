import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "../utils/index";
import { BookOpen, BarChart3, Coins, Shield, Menu, X, Gamepad2, Trophy } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./ui/sheet";

const navigationItems = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Simulator",
    url: "/simulator",
    icon: BarChart3,
  },
  {
    title: "Investing Game",
    url: "/investing-game",
    icon: Gamepad2,
  },
  {
    title: "Achievements",
    url: "/achievements",
    icon: Trophy,
  },
  {
    title: "Learn",
    url: "/learn",
    icon: BookOpen,
  },
  {
    title: "About",
    url: "/about",
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <style>
        {`
          :root {
            --color-alabaster-0: #FCFCFD;
            --color-alabaster-1: #F7F7F8;
            --color-alabaster-2: #F1F2F3;
            --color-ink-900: #0F1214;
            --color-ink-700: #2F3439;
            --color-ink-500: #6A727A;
            --color-mist-300: #D9DDE1;
            --color-sky-600: #2A7FFF;
            --color-sky-700: #1E67D8;
            --color-sky-100: #E7F1FF;
          }
        `}
      </style>

      {/* Header */}
      <header className={`sticky top-0 z-50 transition-colors duration-300 ${isScrolled
          ? 'bg-transparent backdrop-blur-2xl border-b border-white/20'
          : 'bg-white border-b border-slate-200/60'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-cyan-500/25 transition-all duration-300">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className={`text-xl font-semibold tracking-tight ${isScrolled ? 'text-white' : 'text-slate-900'}`}>CryptoCanary</span>
                <span className={`text-xs ml-3 font-medium tracking-wide ${isScrolled ? 'text-white/70' : 'text-slate-500'}`}>Learn • Practice • Protect</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${isScrolled
                      ? (location.pathname === item.url
                        ? 'text-white bg-white/25 backdrop-blur-md border border-white/40 shadow-xl shadow-cyan-500/10'
                        : 'text-white/90 hover:text-white hover:bg-white/15 backdrop-blur-sm border border-white/20 hover:border-white/30 hover:shadow-lg hover:shadow-white/5')
                      : (location.pathname === item.url
                        ? 'text-slate-900 bg-slate-100 border border-slate-300 shadow-sm'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50 border border-slate-200')
                    }`}
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  {item.title}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={`md:hidden rounded-2xl border ${isScrolled
                    ? 'text-white/90 hover:text-white hover:bg-white/15 border-white/20 hover:border-white/30'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 border-slate-200'
                  }`}>
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className={`w-80 border-l ${isScrolled
                  ? 'bg-slate-900/95 backdrop-blur-2xl border-white/10'
                  : 'bg-white border-slate-200'
                }`}>
                <div className="flex flex-col gap-6 pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <span className={`text-xl font-semibold ${isScrolled ? 'text-white' : 'text-slate-900'}`}>CryptoCanary</span>
                  </div>
                  <nav className="flex flex-col gap-2">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.title}
                        to={item.url}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-5 py-4 rounded-2xl text-base font-semibold transition-all duration-300 ${isScrolled
                            ? (location.pathname === item.url
                              ? 'text-white bg-white/25 backdrop-blur-md border border-white/40 shadow-lg'
                              : 'text-white/90 hover:text-white hover:bg-white/15 backdrop-blur-sm border border-white/20 hover:border-white/30')
                            : (location.pathname === item.url
                              ? 'text-slate-900 bg-slate-100 border border-slate-300 shadow-sm'
                              : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50 border border-slate-200')
                          }`}
                      >
                        {item.icon && <item.icon className="w-5 h-5" />}
                        {item.title}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-slate-900 to-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-white">CryptoCanary</span>
              </div>
              <p className="text-white/70 mb-6 max-w-md leading-relaxed">
                Educational platform helping you understand and recognize cryptocurrency scams through safe, controlled simulations.
              </p>
              <div className="bg-amber-500/20 backdrop-blur-sm border border-amber-400/30 rounded-xl p-4">
                <p className="text-amber-200 text-sm font-medium">
                  ⚠️ This is an educational tool only. No real cryptocurrency transactions occur.
                </p>
              </div>
            </div>

          </div>
          <div className="border-t border-white/10 mt-12 pt-8">
            <p className="text-center text-sm text-white/60">
              © 2025 CryptoCanary. Made for educational purposes only. No real funds at risk.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
