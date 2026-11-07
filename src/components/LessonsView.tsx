import React, { useState, useMemo } from 'react';
import { BookOpen, Search, CheckCircle2, Clock, Sparkles, Filter, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GradeNumber, Lesson } from '../types';

export const LessonsView: React.FC = () => {
  const {
    lessons,
    selectedGrade,
    setSelectedGrade,
    selectedSubject,
    setSelectedSubject,
    setActiveLesson,
    currentUser,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');

  // Extract all subjects present in the current selected grade
  const availableSubjects = useMemo(() => {
    const subjectsInGrade = new Set<string>();
    lessons
      .filter(l => l.grade === selectedGrade)
      .forEach(l => subjectsInGrade.add(l.subject));
    return ['Hammasi', ...Array.from(subjectsInGrade)];
  }, [lessons, selectedGrade]);

  // Filter lessons
  const filteredLessons = useMemo(() => {
    return lessons.filter(l => {
      const matchGrade = l.grade === selectedGrade;
      const matchSubject = selectedSubject === 'Hammasi' || l.subject === selectedSubject;
      const matchQuery =
        searchQuery === '' ||
        l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.subject.toLowerCase().includes(searchQuery.toLowerCase());
      return matchGrade && matchSubject && matchQuery;
    });
  }, [lessons, selectedGrade, selectedSubject, searchQuery]);

  // Grade stats
  const lessonsInGrade = lessons.filter(l => l.grade === selectedGrade);
  const completedInGrade = lessonsInGrade.filter(l =>
    currentUser?.completedLessonIds.includes(l.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Grade Selector Header */}
      <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl" role="img" aria-label="school">🎒</span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {selectedGrade}-sinf Darslari
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              O'zingizga kerakli sinf va fanni tanlang, qiziqarli darslarni o'zlashtiring!
            </p>
          </div>

          {/* Progress in current grade */}
          {currentUser && (
            <div className="flex items-center gap-3 bg-amber-50 px-4 py-2 rounded-2xl border border-amber-200 text-xs font-bold shrink-0">
              <div className="text-right">
                <p className="text-amber-900">{selectedGrade}-sinf progressi:</p>
                <p className="text-[11px] text-amber-700">
                  {completedInGrade.length} / {lessonsInGrade.length} dars tugatildi
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center font-black">
                {Math.round((completedInGrade.length / Math.max(1, lessonsInGrade.length)) * 100)}%
              </div>
            </div>
          )}
        </div>

        {/* 1 to 11 Grades Selector Bar */}
        <div className="pt-2">
          <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
            Sinfni tanlang (1 dan 11 gacha):
          </p>
          <div className="grid grid-cols-6 sm:grid-cols-11 gap-1.5 sm:gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(num => {
              const isSelected = selectedGrade === num;
              return (
                <button
                  key={num}
                  onClick={() => {
                    setSelectedGrade(num as GradeNumber);
                    setSelectedSubject('Hammasi');
                  }}
                  className={`py-2 px-1 rounded-2xl font-black text-xs sm:text-sm transition-all ${
                    isSelected
                      ? 'bg-amber-500 text-white shadow-md shadow-amber-500/25 ring-2 ring-amber-300 scale-105'
                      : 'bg-slate-50 hover:bg-amber-100/60 text-slate-700 border border-slate-200/80'
                  }`}
                >
                  <span>{num}</span>
                  <span className="hidden sm:inline text-[10px] font-semibold block opacity-80">-sinf</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Subject Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {availableSubjects.map(subj => {
            const isActive = selectedSubject === subj;
            return (
              <button
                key={subj}
                onClick={() => setSelectedSubject(subj)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {subj}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Dars yoki mavzu izlash..."
            className="w-full pl-9 pr-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-400"
          />
        </div>
      </div>

      {/* Lessons Grid */}
      {filteredLessons.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200/70 space-y-3">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-700">Hech qanday dars topilmadi</h3>
          <p className="text-xs text-slate-500">
            Qidiruv so'zini o'zgartiring yoki boshqa fanni tanlab ko'ring.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredLessons.map(lesson => {
            const isCompleted = currentUser?.completedLessonIds.includes(lesson.id);
            const score = currentUser?.lessonScores[lesson.id];

            return (
              <div
                key={lesson.id}
                onClick={() => setActiveLesson(lesson)}
                className={`bg-white rounded-3xl p-6 border-2 transition-all cursor-pointer flex flex-col justify-between group hover:-translate-y-1 hover:shadow-lg ${
                  isCompleted
                    ? 'border-emerald-200 bg-emerald-50/15'
                    : 'border-slate-100 hover:border-amber-300'
                }`}
              >
                <div>
                  {/* Card Header Info */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-3 py-1 bg-amber-100 text-amber-900 font-extrabold text-[11px] rounded-xl">
                      {lesson.subject}
                    </span>
                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>O'zlashtirilgan {score ? `(${score}%)` : ''}</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] font-extrabold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-lg">
                        <span>+{lesson.coinsReward}</span>
                        <span>🪙</span>
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-black text-lg text-slate-900 group-hover:text-amber-600 transition-colors leading-snug">
                    {lesson.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 font-medium">
                    {lesson.description}
                  </p>
                </div>

                {/* Card Footer Details */}
                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>~{lesson.estimatedMinutes || 15} daqiqa</span>
                  </span>
                  <span className="flex items-center gap-1 text-amber-700 font-bold group-hover:underline">
                    <span>{isCompleted ? "Qayta ko'rish" : "Darsni boshlash"}</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
