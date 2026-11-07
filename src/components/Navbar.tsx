import React from 'react';
import { Volume2, VolumeX, Sparkles, BookOpen, Gamepad2, ShoppingBag, User as UserIcon, Shield, LogIn } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ActiveNavTab } from '../types';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    activeTab,
    setActiveTab,
    soundMuted,
    toggleSound,
    setAuthModalOpen,
    setAuthMode,
    adminLoggedIn,
  } = useApp();

  const navItems: { id: ActiveNavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Bosh sahifa', icon: <Sparkles className="w-4 h-4 text-amber-500" /> },
    { id: 'lessons', label: 'Darslar', icon: <BookOpen className="w-4 h-4 text-sky-500" /> },
    { id: 'games', label: "O'yinlar", icon: <Gamepad2 className="w-4 h-4 text-emerald-500" /> },
    { id: 'shop', label: "Do'kon", icon: <ShoppingBag className="w-4 h-4 text-purple-500" /> },
    { id: 'profile', label: 'Mening profilim', icon: <UserIcon className="w-4 h-4 text-rose-500" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/60 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 text-left group shrink-0 focus-visible:outline-hidden"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-400 to-yellow-300 flex items-center justify-center shadow-md shadow-amber-400/30 group-hover:scale-105 transition-transform">
              <span className="text-2xl select-none" role="img" aria-label="owl">🦉</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-2xl tracking-tight bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent">
                  ZukkoMaktab
                </span>
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wide">
                  1–11 sinf
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 hidden sm:block">
                O'quvchilar va bolalar ta'lim portali
              </p>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-amber-100/80 text-amber-900 shadow-xs ring-1 ring-amber-300/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Interactive Affordances & User Zone */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              title={soundMuted ? "Ovozni yoqish" : "Ovozni o'chirish"}
              className={`p-2 rounded-xl transition-colors ${
                soundMuted
                  ? 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                  : 'bg-amber-50 text-amber-600 hover:bg-amber-100'
              }`}
              aria-label={soundMuted ? "Ovozni yoqish" : "Ovozni o'chirish"}
            >
              {soundMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            {/* Coins indicator if logged in */}
            {currentUser ? (
              <button
                onClick={() => setActiveTab('shop')}
                title="Sizning tangalaringiz — do'konda sarflang!"
                className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-yellow-400 text-amber-950 font-extrabold px-3 py-1.5 rounded-full text-xs sm:text-sm shadow-sm shadow-amber-400/30 hover:scale-105 active:scale-95 transition-all"
              >
                <span className="text-base animate-bounce" role="img" aria-label="coin">🪙</span>
                <span className="tabular-nums font-black">{currentUser.coins}</span>
                <span className="text-[11px] font-bold text-amber-900 hidden xs:inline">coin</span>
              </button>
            ) : null}

            {/* Profile Avatar or Login */}
            {currentUser ? (
              <button
                onClick={() => setActiveTab('profile')}
                className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-amber-50/80 transition-colors"
              >
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden flex items-center justify-center bg-amber-100 ${currentUser.activeFrame || 'ring-2 ring-amber-300'}`}>
                  {currentUser.activeAvatar.startsWith('/') ? (
                    <img
                      src={currentUser.activeAvatar}
                      alt={currentUser.fullName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xl select-none">{currentUser.activeAvatar || '👦'}</span>
                  )}
                </div>
                <div className="text-left hidden lg:block">
                  <p className="text-xs font-bold text-slate-800 truncate max-w-[110px]">
                    {currentUser.fullName}
                  </p>
                  <p className="text-[10px] font-semibold text-amber-600">
                    {currentUser.grade}-sinf
                  </p>
                </div>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setAuthMode('login');
                    setAuthModalOpen(true);
                  }}
                  className="px-3.5 py-1.5 text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Kirish
                </button>
                <button
                  onClick={() => {
                    setAuthMode('register');
                    setAuthModalOpen(true);
                  }}
                  className="px-3.5 py-1.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-xl shadow-xs shadow-orange-500/20 active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Ro'yxatdan o'tish</span>
                </button>
              </div>
            )}

            {/* Admin button / Badge */}
            <button
              onClick={() => setActiveTab('admin')}
              className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors ${
                activeTab === 'admin' || adminLoggedIn
                  ? 'bg-rose-100 text-rose-700 ring-1 ring-rose-300'
                  : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
              }`}
              title="Admin boshqaruv paneli"
            >
              <Shield className="w-4 h-4" />
              <span className="hidden xl:inline">Admin</span>
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-100 overflow-x-auto gap-1">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center py-1 px-2.5 rounded-lg text-[11px] font-semibold transition-all ${
                  isActive
                    ? 'text-amber-800 font-bold bg-amber-50'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <div className="scale-90 mb-0.5">{item.icon}</div>
                <span className="whitespace-nowrap">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
