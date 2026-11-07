import React, { useState } from 'react';
import { X, Lock, User, GraduationCap, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GradeNumber } from '../types';

export const AuthModal: React.FC = () => {
  const { authModalOpen, setAuthModalOpen, authMode, setAuthMode, login, register, users } = useApp();

  // Registration state
  const [fullName, setFullName] = useState('');
  const [grade, setGrade] = useState<GradeNumber>(3);
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Login state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (!authModalOpen) return null;

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!fullName.trim() || !regUsername.trim() || !regPassword.trim()) {
      setErrorMsg("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }
    if (regPassword.length < 4) {
      setErrorMsg("Parol kamida 4 belgidan iborat bo'lishi kerak!");
      return;
    }

    setLoading(true);
    const res = await register(fullName, grade, regUsername, regPassword);
    setLoading(false);
    if (!res.success) {
      setErrorMsg(res.message);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!loginUsername.trim() || !loginPassword.trim()) {
      setErrorMsg("Login va parolni kiriting!");
      return;
    }

    setLoading(true);
    const res = await login(loginUsername, loginPassword);
    setLoading(false);
    if (!res.success) {
      setErrorMsg(res.message);
    }
  };

  const handleQuickDemoLogin = (user: typeof users[0]) => {
    // Demo accounts log in seamlessly
    login(user.username, '123456');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-amber-100 overflow-hidden relative">
        
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 p-6 text-white text-center relative">
          <button
            onClick={() => setAuthModalOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
            aria-label="Yopish"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl mx-auto flex items-center justify-center text-3xl mb-2 shadow-inner">
            🦉
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            {authMode === 'login' ? "Xush kelibsiz!" : "Zukko O'quvchi bo'ling!"}
          </h2>
          <p className="text-xs sm:text-sm text-white/90 font-medium mt-1">
            {authMode === 'login'
              ? "Darslar, o'yinlar va tangalaringiz sizni kutmoqda"
              : "Ro'yxatdan o'ting va bepul 20 tabrik tangasiga ega bo'ling!"}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-100 bg-slate-50/70 p-1.5 gap-1.5">
          <button
            type="button"
            onClick={() => {
              setAuthMode('login');
              setErrorMsg('');
            }}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
              authMode === 'login'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Tizimga Kirish
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('register');
              setErrorMsg('');
            }}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
              authMode === 'register'
                ? 'bg-white text-amber-700 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Yangi Ro'yxatdan O'tish
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
              {errorMsg}
            </div>
          )}

          {authMode === 'register' ? (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Ismingiz va familiyangiz
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="Masalan: Sardor Rustamov"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-400 bg-slate-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nechanchi sinfda o'qiysiz?
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <select
                    value={grade}
                    onChange={e => setGrade(Number(e.target.value) as GradeNumber)}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-400 bg-slate-50/50 font-semibold"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(num => (
                      <option key={num} value={num}>
                        {num}-sinf o'quvchisi
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Login (foydalanuvchi nomi)
                </label>
                <input
                  type="text"
                  required
                  value={regUsername}
                  onChange={e => setRegUsername(e.target.value)}
                  placeholder="masalan: sardor_2026"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-400 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Maxfiy parol
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    required
                    value={regPassword}
                    onChange={e => setRegPassword(e.target.value)}
                    placeholder="Kamida 4 ta belgi"
                    className="w-full pl-9 pr-10 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-400 bg-slate-50/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegPassword(!showRegPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold rounded-2xl shadow-md shadow-orange-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 mt-2"
              >
                <span>{loading ? "Ro'yxatdan o'tkazilmoqda..." : "Ro'yxatdan o'tish (+20 coin)"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Login
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={loginUsername}
                    onChange={e => setLoginUsername(e.target.value)}
                    placeholder="Loginingizni kiriting"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-400 bg-slate-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Parol
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    placeholder="Parolingiz"
                    className="w-full pl-9 pr-10 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-400 bg-slate-50/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold rounded-2xl shadow-md shadow-orange-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 mt-2"
              >
                <span>{loading ? "Kirilmoqda..." : "Tizimga kirish"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Demo Accounts Quick-Picker */}
              <div className="mt-5 pt-4 border-t border-slate-100">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide text-center mb-2.5">
                  Yoki sinov uchun tayyor namunaviy profillar:
                </p>
                <div className="space-y-1.5">
                  {users.slice(0, 3).map(u => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => handleQuickDemoLogin(u)}
                      className="w-full flex items-center justify-between p-2 rounded-xl bg-amber-50/60 hover:bg-amber-100/70 border border-amber-200/50 text-left transition-colors text-xs font-semibold"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base select-none">{u.activeAvatar.startsWith('/') ? '🌟' : u.activeAvatar}</span>
                        <div>
                          <p className="text-slate-800 font-bold">{u.fullName}</p>
                          <p className="text-[10px] text-slate-500">{u.grade}-sinf · @{u.username}</p>
                        </div>
                      </div>
                      <span className="text-amber-700 text-[11px] font-bold bg-amber-100 px-2 py-0.5 rounded-full">
                        {u.coins} 🪙
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
