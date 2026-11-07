import React, { useState } from 'react';
import { Sparkles, Brain, Calculator, Type, HelpCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GradeNumber } from '../types';
import { MemoryGame } from './games/MemoryGame';
import { MathGame } from './games/MathGame';
import { WordGame } from './games/WordGame';
import { QuizGame } from './games/QuizGame';

type GameTab = 'memory' | 'math' | 'word' | 'quiz';

export const GamesView: React.FC = () => {
  const { selectedGrade, setSelectedGrade, currentUser } = useApp();
  const [activeGame, setActiveGame] = useState<GameTab>('memory');

  const gamesList: { id: GameTab; title: string; desc: string; icon: React.ReactNode; reward: string }[] = [
    {
      id: 'memory',
      title: "Xotira O'yini",
      desc: "Juft kartalarni topish orqali xotirani charxlash",
      icon: <Brain className="w-5 h-5 text-indigo-500" />,
      reward: "20-30 🪙",
    },
    {
      id: 'math',
      title: "Tezkor Matematika",
      desc: "Hisob-kitob jangi va chaqqon mantiqiy misollar",
      icon: <Calculator className="w-5 h-5 text-emerald-500" />,
      reward: "25-40 🪙",
    },
    {
      id: 'word',
      title: "So'z Topish",
      desc: "Anagramma va aralash harflardan so'z tuzish",
      icon: <Type className="w-5 h-5 text-amber-500" />,
      reward: "15-25 🪙",
    },
    {
      id: 'quiz',
      title: "Zukko Viktorina",
      desc: "Dunyoqarash va fanlar bo'yicha qiziqarli savollar",
      icon: <HelpCircle className="w-5 h-5 text-rose-500" />,
      reward: "30 🪙 gacha",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header and Grade Difficulty Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-amber-100 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl" role="img" aria-label="joystick">🎮</span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Bilimli O'yinlar Maydoni
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            O'ynang, zavqlaning, bilimingizni mustahkamlang va qimmatbaho tangalarni yig'ing!
          </p>
        </div>

        {/* Grade Difficulty Switcher */}
        <div className="flex items-center gap-2 bg-amber-50 p-2 rounded-2xl border border-amber-200 shrink-0">
          <span className="text-xs font-bold text-amber-900 ml-1">Sinf darajasi:</span>
          <select
            value={selectedGrade}
            onChange={e => setSelectedGrade(Number(e.target.value) as GradeNumber)}
            className="text-xs font-black bg-white text-slate-800 px-3 py-1.5 rounded-xl border border-amber-300 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(num => (
              <option key={num} value={num}>
                {num}-sinf (Qiyinlik: {num <= 4 ? "Oddiy" : num <= 8 ? "O'rta" : "Yuqori"})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 4 Games Selection Tabs / Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {gamesList.map(game => {
          const isActive = activeGame === game.id;
          return (
            <button
              key={game.id}
              onClick={() => setActiveGame(game.id)}
              className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border-2 text-left transition-all relative overflow-hidden group ${
                isActive
                  ? 'bg-amber-500 text-white border-amber-500 shadow-lg shadow-amber-500/20 scale-102'
                  : 'bg-white border-slate-100 hover:border-amber-300 hover:bg-amber-50/40 text-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100'
                }`}>
                  {game.icon}
                </div>
                <span className={`text-[11px] font-black px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'
                }`}>
                  {game.reward}
                </span>
              </div>
              <h3 className="font-extrabold text-sm sm:text-base leading-snug">
                {game.title}
              </h3>
              <p className={`text-[11px] mt-1 line-clamp-2 ${
                isActive ? 'text-white/80' : 'text-slate-500'
              }`}>
                {game.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* Render Active Game */}
      <div>
        {activeGame === 'memory' && <MemoryGame />}
        {activeGame === 'math' && <MathGame />}
        {activeGame === 'word' && <WordGame />}
        {activeGame === 'quiz' && <QuizGame />}
      </div>
    </div>
  );
};
