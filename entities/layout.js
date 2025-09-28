import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { BookOpen, BarChart3, Coins, Shield, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigationItems = [
  {
    title: "Home",
    url: createPageUrl("Home"),
  },
  {
    title: "Simulator",
    url: createPageUrl("Simulator"),
    icon: BarChart3,
  },
  {
    title: "Learn",
    url: createPageUrl("Learn"),
    icon: BookOpen,
  },
  {
    title: "About",
    url: createPageUrl("About"),
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

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
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-semibold text-slate-900">RugGuard</span>
                <span className="text-sm text-slate-500 ml-2">Learn • Practice • Protect</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    location.pathname === item.url
                      ? 'text-sky-600 bg-sky-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
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
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col gap-6 pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-semibold">RugGuard</span>
                  </div>
                  <nav className="flex flex-col gap-2">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.title}
                        to={item.url}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                          location.pathname === item.url
                            ? 'text-sky-600 bg-sky-50'
                            : 'text-slate-700 hover:bg-slate-50'
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
      <footer className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-slate-900">RugGuard</span>
              </div>
              <p className="text-slate-600 mb-6 max-w-md">
                Educational platform helping you understand and recognize cryptocurrency scams through safe, controlled simulations.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-amber-800 text-sm font-medium">
                  ⚠️ This is an educational tool only. No real cryptocurrency transactions occur.
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Learn</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link to={createPageUrl("Learn")} className="hover:text-slate-900">What are Rug Pulls?</Link></li>
                <li><Link to={createPageUrl("Learn")} className="hover:text-slate-900">How AMMs Work</Link></li>
                <li><Link to={createPageUrl("Learn")} className="hover:text-slate-900">Safety Best Practices</Link></li>
                <li><Link to={createPageUrl("Learn")} className="hover:text-slate-900">Red Flags to Watch</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link to={createPageUrl("About")} className="hover:text-slate-900">About Us</Link></li>
                <li><a href="#" className="hover:text-slate-900">Documentation</a></li>
                <li><a href="#" className="hover:text-slate-900">Contact Support</a></li>
                <li><a href="#" className="hover:text-slate-900">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 mt-12 pt-8">
            <p className="text-center text-sm text-slate-500">
              © 2025 RugGuard. Made for educational purposes only. No real funds at risk.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}