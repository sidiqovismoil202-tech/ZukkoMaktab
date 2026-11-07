import React from 'react';
import { User as UserIcon, Award, BookCheck, Sparkles, LogOut, GraduationCap, CheckCircle, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GradeNumber } from '../types';

export const ProfileView: React.FC = () => {
  const {
    currentUser,
    lessons,
    logout,
    setAuthModalOpen,
    setAuthMode,
    setSelectedGrade,
    equipItem,
    setActiveLesson,
  } = useApp();

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-amber-100 flex items-center justify-center text-4xl mx-auto shadow-inner">
          🦉
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900">
            Profilingizga xush kelibsiz!
          </h2>
          <p className="text-sm text-slate-500 mt-2 font-medium">
            Tarix, tangalar va sotib olingan chiroyli buyumlaringizni ko'rish uchun tizimga kiring.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => {
              setAuthMode('login');
              setAuthModalOpen(true);
            }}
            className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm shadow-md transition-all"
          >
            Tizimga kirish
          </button>
          <button
            onClick={() => {
              setAuthMode('register');
              setAuthModalOpen(true);
            }}
            className="px-6 py-3 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-extrabold text-sm shadow-xs transition-all"
          >
            Ro'yxatdan o'tish (+20 coin)
          </button>
        </div>
      </div>
    );
  }

  // Calculate stats
  const completedLessonsCount = currentUser.completedLessonIds.length;
  const totalLessonsInCurriculum = lessons.length;
  const progressPercent = Math.round((completedLessonsCount / Math.max(1, totalLessonsInCurriculum)) * 100);

  // Completed lesson items
  const completedLessonsList = lessons.filter(l => currentUser.completedLessonIds.includes(l.id));

  // Determine honorific title
  let rankTitle = "Bilim Izlovchi";
  if (currentUser.coins >= 400 || completedLessonsCount >= 10) {
    rankTitle = "Akademiya Chempioni 🏆";
  } else if (currentUser.coins >= 200 || completedLessonsCount >= 5) {
    rankTitle = "Zukko Olim ⭐";
  } else if (currentUser.coins >= 80) {
    rankTitle = "Faol O'quvchi 🚀";
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Student Passport Card */}
      <div
        className={`rounded-3xl p-6 sm:p-8 border shadow-xl relative overflow-hidden transition-all ${
          currentUser.activeTheme
            ? currentUser.activeTheme
            : 'bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 text-white'
        }`}
      >
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 relative z-10">
          
          {/* Avatar and Identity */}
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden bg-white/20 backdrop-blur-md flex items-center justify-center p-1.5 shadow-xl ${currentUser.activeFrame}`}>
              {currentUser.activeAvatar.startsWith('/') ? (
                <img
                  src={currentUser.activeAvatar}
                  alt={currentUser.fullName}
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <span className="text-6xl select-none">{currentUser.activeAvatar || '👦'}</span>
              )}
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>{rankTitle}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                {currentUser.fullName}
              </h1>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs opacity-90 font-medium">
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-4 h-4" />
                  <span>{currentUser.grade}-sinf o'quvchisi</span>
                </span>
                <span>·</span>
                <span>@{currentUser.username}</span>
                <span>·</span>
                <span>A'zo bo'lingan: {currentUser.createdAt}</span>
              </div>

              {currentUser.activeBadge && (
                <div className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-extrabold mt-1">
                  {currentUser.activeBadge}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions & Logout */}
          <div className="flex items-center gap-3">
            <button
              onClick={logout}
              className="px-4 py-2 bg-black/20 hover:bg-black/30 backdrop-blur-md text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Chiqish</span>
            </button>
          </div>
        </div>

        {/* Floating Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 relative z-10">
          <div className="bg-black/20 backdrop-blur-md p-4 rounded-2xl text-center">
            <p className="text-[11px] opacity-80 font-bold uppercase tracking-wide">Oltin Tangalar</p>
            <p className="text-2xl font-black text-yellow-300 mt-1 tabular-nums flex items-center justify-center gap-1">
              <span>🪙</span> {currentUser.coins}
            </p>
          </div>
          <div className="bg-black/20 backdrop-blur-md p-4 rounded-2xl text-center">
            <p className="text-[11px] opacity-80 font-bold uppercase tracking-wide">O'zlashtirilgan darslar</p>
            <p className="text-2xl font-black mt-1 tabular-nums">
              {completedLessonsCount} ta
            </p>
          </div>
          <div className="bg-black/20 backdrop-blur-md p-4 rounded-2xl text-center">
            <p className="text-[11px] opacity-80 font-bold uppercase tracking-wide">Umumiy Kurs Progressi</p>
            <p className="text-2xl font-black mt-1 tabular-nums">
              {progressPercent}%
            </p>
          </div>
          <div className="bg-black/20 backdrop-blur-md p-4 rounded-2xl text-center">
            <p className="text-[11px] opacity-80 font-bold uppercase tracking-wide">Xarid qilingan buyumlar</p>
            <p className="text-2xl font-black mt-1 tabular-nums">
              {(currentUser.inventory.avatars?.length || 0) +
                (currentUser.inventory.frames?.length || 0) +
                (currentUser.inventory.themes?.length || 0) +
                (currentUser.inventory.badges?.length || 0)} ta
            </p>
          </div>
        </div>
      </div>

      {/* Wardrobe & Customizer Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/70 shadow-xs space-y-6">
        <div>
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span>Mening Buyumlarim & Kiyimlarim</span>
            <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2.5 py-0.5 rounded-full">
              Do'kondan sotib olinganlar
            </span>
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Profilingiz ko'rinishini o'zgartirish uchun kerakli avatarni, ramkani yoki fonni tanlang va bosing.
          </p>
        </div>

        {/* Avatars Wardrobe */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Avatarlaringiz ({currentUser.inventory.avatars.length} ta)
          </h4>
          <div className="flex items-center gap-3 flex-wrap">
            {currentUser.inventory.avatars.map((av, idx) => {
              const isActive = currentUser.activeAvatar === av;
              return (
                <button
                  key={idx}
                  onClick={() => equipItem('avatar', av)}
                  className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center overflow-hidden transition-all relative ${
                    isActive
                      ? 'border-amber-500 ring-2 ring-amber-300 scale-105 shadow-md bg-amber-50'
                      : 'border-slate-200 hover:border-amber-300 bg-slate-50'
                  }`}
                >
                  {av.startsWith('/') ? (
                    <img src={av} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl select-none">{av}</span>
                  )}
                  {isActive && (
                    <span className="absolute top-1 right-1 w-3 h-3 bg-amber-500 rounded-full border border-white" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Frames Wardrobe */}
        {currentUser.inventory.frames.length > 0 && (
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Ramkalaringiz ({currentUser.inventory.frames.length} ta)
            </h4>
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => equipItem('frame', '')}
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${
                  !currentUser.activeFrame
                    ? 'bg-amber-100 border-amber-300 text-amber-900'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                Ramkasiz (Oddiy)
              </button>
              {currentUser.inventory.frames.map((fr, idx) => {
                const isActive = currentUser.activeFrame === fr;
                return (
                  <button
                    key={idx}
                    onClick={() => equipItem('frame', fr)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      isActive
                        ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    Ramka #{idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Themes Wardrobe */}
        {currentUser.inventory.themes.length > 0 && (
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Pasport Fonlari ({currentUser.inventory.themes.length} ta)
            </h4>
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => equipItem('theme', '')}
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${
                  !currentUser.activeTheme
                    ? 'bg-amber-100 border-amber-300 text-amber-900'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                Klassik to'q sariq fon
              </button>
              {currentUser.inventory.themes.map((th, idx) => {
                const isActive = currentUser.activeTheme === th;
                return (
                  <button
                    key={idx}
                    onClick={() => equipItem('theme', th)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      isActive
                        ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    Fon #{idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Badges Wardrobe */}
        {currentUser.inventory.badges.length > 0 && (
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Faxriy Nishonlaringiz ({currentUser.inventory.badges.length} ta)
            </h4>
            <div className="flex items-center gap-3 flex-wrap">
              {currentUser.inventory.badges.map((bd, idx) => {
                const isActive = currentUser.activeBadge === bd;
                return (
                  <button
                    key={idx}
                    onClick={() => equipItem('badge', bd)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold border transition-all ${
                      isActive
                        ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                        : 'bg-amber-50/60 hover:bg-amber-100 text-amber-900 border-amber-200'
                    }`}
                  >
                    {bd}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Completed Lessons Archive */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/70 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <BookCheck className="w-5 h-5 text-emerald-600" />
            <span>Muvaffaqiyatli Tugatilgan Darslar ({completedLessonsList.length} ta)</span>
          </h3>
        </div>

        {completedLessonsList.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs font-medium">
            Hali birorta dars tugatilmadi. Darslar bo'limiga o'ting va birinchi darsingizni boshlang!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {completedLessonsList.map(l => (
              <div
                key={l.id}
                onClick={() => setActiveLesson(l)}
                className="p-4 rounded-2xl border border-slate-200 hover:border-amber-300 bg-amber-50/20 hover:bg-amber-50/50 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-1.5">
                    <span className="text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                      {l.grade}-sinf · {l.subject}
                    </span>
                    <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{currentUser.lessonScores[l.id] || 100}%</span>
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 leading-snug">
                    {l.title}
                  </h4>
                </div>
                <div className="pt-3 mt-2 border-t border-slate-100 text-[11px] font-bold text-amber-600 flex items-center justify-between">
                  <span>Qayta o'qish / test</span>
                  <span>+{l.coinsReward} 🪙</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
