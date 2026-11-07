import React from 'react';
import { Sparkles, BookOpen, Gamepad2, ShoppingBag, Award, ArrowRight, Star, Users, CheckCircle, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GradeNumber } from '../types';
import { INITIAL_HERO_IMAGE } from '../utils/seedData';

export const HomeView: React.FC = () => {
  const {
    currentUser,
    setActiveTab,
    setSelectedGrade,
    setAuthModalOpen,
    setAuthMode,
    users,
    lessons,
  } = useApp();

  // Top 4 leaderboard users sorted by coins
  const sortedLeaderboard = [...users]
    .sort((a, b) => b.coins - a.coins)
    .slice(0, 4);

  const handleSelectGrade = (grade: GradeNumber) => {
    setSelectedGrade(grade);
    setActiveTab('lessons');
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 shadow-xl border border-amber-200">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[420px]">
            {/* Left Content */}
            <div className="p-6 sm:p-10 lg:p-12 lg:col-span-7 text-white space-y-6 z-10">
              
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>O'zbekistonning eng quvnoq ta'lim maydoni</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black tracking-tight leading-tight">
                Bilim ol, tangalar yut va <span className="underline decoration-yellow-300 decoration-wavy">chempion bo'l!</span>
              </h1>

              <p className="text-sm sm:text-base text-white/95 font-medium max-w-xl leading-relaxed">
                1-sinfdan 11-sinfgacha barcha fanlardan qiziqarli darslar, aqlli o'yinlar, testlar va sovg'alar do'koni bitta qulay platformada!
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setActiveTab('lessons')}
                  className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm shadow-lg shadow-slate-900/25 flex items-center gap-2 transition-all active:scale-95"
                >
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span>Darslarni boshlash</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveTab('games')}
                  className="px-6 py-3.5 rounded-2xl bg-white/90 hover:bg-white text-slate-900 font-extrabold text-sm shadow-md flex items-center gap-2 transition-all active:scale-95"
                >
                  <Gamepad2 className="w-4 h-4 text-emerald-600" />
                  <span>O'yinlar o'ynash (+Coin)</span>
                </button>

                {!currentUser && (
                  <button
                    onClick={() => {
                      setAuthMode('register');
                      setAuthModalOpen(true);
                    }}
                    className="px-5 py-3.5 rounded-2xl bg-amber-200/40 hover:bg-white/30 backdrop-blur-md text-white font-black text-sm border border-white/40 transition-colors"
                  >
                    Ro'yxatdan o'tish (+20 coin sovg'a!)
                  </button>
                )}
              </div>

              {/* Quick stats badges */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/20 text-center">
                <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl">
                  <p className="text-xl sm:text-2xl font-black tabular-nums">{lessons.length}+</p>
                  <p className="text-[10px] sm:text-xs font-semibold opacity-90">Interaktiv darslar</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl">
                  <p className="text-xl sm:text-2xl font-black tabular-nums">1–11</p>
                  <p className="text-[10px] sm:text-xs font-semibold opacity-90">Sinf dasturi</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl">
                  <p className="text-xl sm:text-2xl font-black tabular-nums">4 ta</p>
                  <p className="text-[10px] sm:text-xs font-semibold opacity-90">Bilimli o'yinlar</p>
                </div>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="p-4 sm:p-8 lg:p-6 lg:col-span-5 h-full flex items-center justify-center">
              <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border-4 border-white/40 transform hover:scale-102 transition-transform">
                <img
                  src={INITIAL_HERO_IMAGE}
                  alt="Zukko o'quvchilar ta'lim olmoqda"
                  className="w-full h-auto object-cover aspect-16/10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grade Quick Jump Carousel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>Sinfingizni tanlang</span>
              <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2.5 py-0.5 rounded-full">
                1-dan 11-sinfgacha
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Har bir sinf uchun moslashtirilgan darsliklar va test savollari
            </p>
          </div>
          <button
            onClick={() => setActiveTab('lessons')}
            className="text-xs sm:text-sm font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
          >
            <span>Barcha darslar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 11 Grades Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2.5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(num => {
            const count = lessons.filter(l => l.grade === num).length;
            return (
              <button
                key={num}
                onClick={() => handleSelectGrade(num as GradeNumber)}
                className="bg-white p-3.5 rounded-2xl border-2 border-slate-100 hover:border-amber-400 hover:bg-amber-50/50 hover:shadow-md transition-all text-center group flex flex-col items-center justify-between h-24"
              >
                <span className="text-xl font-black text-slate-800 group-hover:text-amber-600 transition-colors">
                  {num}
                </span>
                <span className="text-[11px] font-bold text-slate-600">
                  {num}-sinf
                </span>
                <span className="text-[10px] text-amber-700 bg-amber-100/70 font-bold px-1.5 py-0.2 rounded-md">
                  {count} ta dars
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Feature Pillars (4 Pillars) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Pillar 1: Lessons */}
          <div
            onClick={() => setActiveTab('lessons')}
            className="bg-white p-6 rounded-3xl border-2 border-slate-100 hover:border-sky-300 hover:shadow-lg transition-all cursor-pointer space-y-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-sky-600 transition-colors">
                Interaktiv Darslar & Testlar
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                Matematika, Ona tili, Ingliz tili, Tarix, Fizika va Informatika darslarini qiziqarli shaklda o'rganing va testdan o'tib tanga yuting!
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 group-hover:translate-x-1 transition-transform">
              <span>Darslarni ko'rish</span>
              <span>→</span>
            </span>
          </div>

          {/* Pillar 2: Games */}
          <div
            onClick={() => setActiveTab('games')}
            className="bg-white p-6 rounded-3xl border-2 border-slate-100 hover:border-emerald-300 hover:shadow-lg transition-all cursor-pointer space-y-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-600 transition-colors">
                Zukko O'yinlar Arenasi
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                Xotira o'yini, tezkor hisob-kitob jangi, so'z topish anagrammasi va bilimdonlar viktorinasi bilan aql va xotirangizni charxlang.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform">
              <span>O'yinlarni o'ynash</span>
              <span>→</span>
            </span>
          </div>

          {/* Pillar 3: Shop */}
          <div
            onClick={() => setActiveTab('shop')}
            className="bg-white p-6 rounded-3xl border-2 border-slate-100 hover:border-purple-300 hover:shadow-lg transition-all cursor-pointer space-y-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-purple-600 transition-colors">
                Sehrli Do'kon & Mukofotlar
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                Yig'ilgan tangalaringizga Dono Boyqush, Koinot Sayyohi, Oltin Toj ramkalari va chempionlik nishonlarini xarid qilib profilingizni bezating!
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-purple-600 group-hover:translate-x-1 transition-transform">
              <span>Do'konga kirish</span>
              <span>→</span>
            </span>
          </div>
        </div>
      </section>

      {/* Leaderboard Section: Eng Zukko O'quvchilar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl" role="img" aria-label="trophy">🏆</span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Eng Zukko O'quvchilar Reytingi
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Ko'p dars tugatib eng ko'p tanga to'plagan faol bilimdonlar
              </p>
            </div>
            <button
              onClick={() => setActiveTab('lessons')}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors shrink-0"
            >
              Ular safiga qo'shilish
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sortedLeaderboard.map((student, rank) => {
              const medals = ['🥇', '🥈', '🥉', '⭐'];
              return (
                <div
                  key={student.id}
                  className="p-5 rounded-2xl border-2 border-slate-100 hover:border-amber-300 bg-amber-50/20 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl select-none">{medals[rank] || '⭐'}</span>
                    <span className="text-[11px] font-bold text-slate-500">
                      {student.grade}-sinf
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden bg-white border border-amber-200 flex items-center justify-center shrink-0">
                      {student.activeAvatar.startsWith('/') ? (
                        <img
                          src={student.activeAvatar}
                          alt={student.fullName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl select-none">{student.activeAvatar || '👦'}</span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900 truncate max-w-[140px]">
                        {student.fullName}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        {student.completedLessonIds.length} ta dars
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-amber-600">
                    <span>Oltin tangalar:</span>
                    <span className="flex items-center gap-1">
                      <span>🪙</span>
                      <span className="tabular-nums font-black">{student.coins}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Safety & Education Philosophy Footer Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-3xl bg-amber-100/60 border border-amber-200 text-center space-y-2">
          <p className="text-xs sm:text-sm font-extrabold text-amber-950">
            ZukkoMaktab — Maktab o'quvchilari uchun xavfsiz, erkin va qiziqarli ta'lim muhiti
          </p>
          <p className="text-[11px] sm:text-xs text-amber-800 font-medium max-w-2xl mx-auto">
            Barcha darslar davlat ta'lim standartlari asosida tuzilgan. O'quvchilar o'yin orqali rag'batlantirilib, ilm olishga qiziqtiriladi.
          </p>
        </div>
      </section>
    </div>
  );
};
