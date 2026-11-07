import React, { useState, useEffect, useCallback } from 'react';
import { RotateCcw, Zap, Trophy, Timer, Check, X as XIcon } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { soundManager } from '../../utils/sound';

interface Question {
  problem: string;
  options: number[];
  answer: number;
}

export const MathGame: React.FC = () => {
  const { selectedGrade, awardGameCoins } = useApp();

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);

  const TOTAL_QUESTIONS = 8;

  // Generate question based on grade
  const generateProblem = useCallback((): Question => {
    let problem = '';
    let answer = 0;

    if (selectedGrade <= 3) {
      // Basic addition and subtraction up to 30
      const isAdd = Math.random() > 0.4;
      if (isAdd) {
        const a = Math.floor(Math.random() * 15) + 3;
        const b = Math.floor(Math.random() * 15) + 2;
        problem = `${a} + ${b}`;
        answer = a + b;
      } else {
        const a = Math.floor(Math.random() * 20) + 10;
        const b = Math.floor(Math.random() * 9) + 1;
        problem = `${a} - ${b}`;
        answer = a - b;
      }
    } else if (selectedGrade <= 6) {
      // Multiplication, division and two-step operations
      const type = Math.floor(Math.random() * 3);
      if (type === 0) {
        const a = Math.floor(Math.random() * 9) + 2;
        const b = Math.floor(Math.random() * 9) + 2;
        problem = `${a} × ${b}`;
        answer = a * b;
      } else if (type === 1) {
        const b = Math.floor(Math.random() * 8) + 2;
        const a = b * (Math.floor(Math.random() * 8) + 2);
        problem = `${a} ÷ ${b}`;
        answer = a / b;
      } else {
        const a = Math.floor(Math.random() * 20) + 10;
        const b = Math.floor(Math.random() * 15) + 5;
        const c = Math.floor(Math.random() * 10) + 2;
        problem = `${a} + ${b} - ${c}`;
        answer = a + b - c;
      }
    } else {
      // High school algebra, squares, roots
      const type = Math.floor(Math.random() * 3);
      if (type === 0) {
        // Square root + addition
        const roots = [4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144];
        const val = roots[Math.floor(Math.random() * roots.length)];
        const extra = Math.floor(Math.random() * 15) + 5;
        problem = `√${val} + ${extra}`;
        answer = Math.sqrt(val) + extra;
      } else if (type === 1) {
        // Linear equation: 2x + 4 = 16 => x = ?
        const x = Math.floor(Math.random() * 9) + 2;
        const m = Math.floor(Math.random() * 3) + 2;
        const c = Math.floor(Math.random() * 8) + 2;
        const rhs = m * x + c;
        problem = `${m}x + ${c} = ${rhs}  (x = ?)`;
        answer = x;
      } else {
        // Powers: 2^3 + 12
        const p = Math.floor(Math.random() * 3) + 2;
        const base = Math.floor(Math.random() * 3) + 2;
        const extra = Math.floor(Math.random() * 20) + 5;
        problem = `${base}³ + ${extra}`;
        answer = Math.pow(base, 3) + extra;
      }
    }

    // Generate 4 distinct options
    const optionsSet = new Set<number>();
    optionsSet.add(answer);
    while (optionsSet.size < 4) {
      const offset = (Math.floor(Math.random() * 5) + 1) * (Math.random() > 0.5 ? 1 : -1);
      const fake = answer + offset;
      if (fake >= 0) optionsSet.add(fake);
    }
    const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

    return { problem, options, answer };
  }, [selectedGrade]);

  const startNewGame = useCallback(() => {
    setScore(0);
    setStreak(0);
    setQuestionCount(0);
    setFeedback(null);
    setIsFinished(false);
    setTimeLeft(15);
    setCurrentQuestion(generateProblem());
  }, [generateProblem]);

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  // Question Timer
  useEffect(() => {
    if (isFinished || feedback !== null) return;
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          handleTimeout();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isFinished, feedback, questionCount]);

  const handleTimeout = () => {
    soundManager.playError();
    setFeedback('wrong');
    setStreak(0);
    advanceQuestion(false);
  };

  const handleSelectOption = (opt: number) => {
    if (feedback !== null || isFinished || !currentQuestion) return;

    if (opt === currentQuestion.answer) {
      soundManager.playCoin();
      setFeedback('correct');
      setScore(s => s + 10 + streak * 2);
      setStreak(st => st + 1);
      advanceQuestion(true);
    } else {
      soundManager.playError();
      setFeedback('wrong');
      setStreak(0);
      advanceQuestion(false);
    }
  };

  const advanceQuestion = (wasCorrect: boolean) => {
    setTimeout(() => {
      setFeedback(null);
      setTimeLeft(15);
      const nextCount = questionCount + 1;
      setQuestionCount(nextCount);

      if (nextCount >= TOTAL_QUESTIONS) {
        setIsFinished(true);
        const finalCoins = Math.max(15, Math.round((score + (wasCorrect ? 10 : 0)) / 3));
        awardGameCoins(finalCoins, 'Tezkor Matematika');
      } else {
        setCurrentQuestion(generateProblem());
      }
    }, 800);
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-8 border border-amber-100 shadow-sm space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span>Tezkor Matematika Jangi</span>
            <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
              {selectedGrade}-sinf darajasi
            </span>
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Misollarni tez va to'g'ri hisoblang, combo to'plang va tangalarni qo'lga kiriting!
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
          <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
            <Timer className="w-4 h-4 text-amber-600" />
            <span className={`tabular-nums font-mono ${timeLeft <= 4 ? 'text-rose-600 font-black animate-pulse' : ''}`}>
              {timeLeft} soniya
            </span>
          </div>
          <div className="flex items-center gap-1 bg-yellow-100/70 text-yellow-900 px-3 py-1.5 rounded-xl font-black">
            <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
            <span>Streak: {streak}</span>
          </div>
          <button
            onClick={startNewGame}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Qayta</span>
          </button>
        </div>
      </div>

      {!isFinished && currentQuestion ? (
        <div className="max-w-md mx-auto space-y-6 text-center py-4">
          
          <div className="flex justify-between items-center text-xs font-bold text-slate-400">
            <span>Savol: {questionCount + 1} / {TOTAL_QUESTIONS}</span>
            <span>Jami ball: {score}</span>
          </div>

          {/* Problem Display Board */}
          <div className={`p-8 rounded-3xl border-2 transition-all select-none shadow-inner ${
            feedback === 'correct'
              ? 'bg-emerald-50 border-emerald-400 text-emerald-950 scale-102'
              : feedback === 'wrong'
              ? 'bg-rose-50 border-rose-400 text-rose-950 scale-98'
              : 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 text-slate-900'
          }`}>
            <span className="text-4xl sm:text-5xl font-black tracking-wider">
              {currentQuestion.problem} = ?
            </span>
            {feedback === 'correct' && (
              <div className="flex items-center justify-center gap-1.5 text-emerald-600 font-black text-sm mt-3 animate-in zoom-in-50">
                <Check className="w-5 h-5" />
                <span>To'g'ri! Barakalla!</span>
              </div>
            )}
            {feedback === 'wrong' && (
              <div className="flex items-center justify-center gap-1.5 text-rose-600 font-black text-sm mt-3 animate-in zoom-in-50">
                <XIcon className="w-5 h-5" />
                <span>Noto'g'ri! Javob: {currentQuestion.answer}</span>
              </div>
            )}
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-2 gap-3.5">
            {currentQuestion.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(opt)}
                disabled={feedback !== null}
                className="py-4 text-xl sm:text-2xl font-black rounded-2xl bg-white border-2 border-slate-200 hover:border-amber-400 hover:bg-amber-50 text-slate-800 shadow-sm active:scale-95 transition-all"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 border border-amber-200 text-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 bg-amber-500 text-white rounded-3xl mx-auto flex items-center justify-center shadow-lg">
            <Trophy className="w-8 h-8" />
          </div>
          <h4 className="text-2xl font-black text-amber-950">Turnir yakunlandi! 🎊</h4>
          <p className="text-sm text-slate-600 font-medium">
            Siz {TOTAL_QUESTIONS} ta misoldan ajoyib javoblar bilan <strong>{score} ball</strong> to'pladingiz!
          </p>
          <button
            onClick={startNewGame}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm rounded-2xl shadow-md transition-all active:scale-95"
          >
            Yana kuch sinashish
          </button>
        </div>
      )}
    </div>
  );
};
