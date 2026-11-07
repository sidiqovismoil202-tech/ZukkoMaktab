import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, Award, BookOpen, Clock, HelpCircle, ArrowRight, RotateCcw, Video } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { soundManager } from '../utils/sound';

export const LessonViewerModal: React.FC = () => {
  const { activeLesson, setActiveLesson, currentUser, completeLesson, setAuthModalOpen } = useApp();

  const [activeStep, setActiveStep] = useState<'content' | 'test' | 'result'>('content');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [testSubmitted, setTestSubmitted] = useState<boolean>(false);
  const [earnedCoins, setEarnedCoins] = useState<number>(0);
  const [scorePercent, setScorePercent] = useState<number>(0);

  if (!activeLesson) return null;

  const isCompleted = currentUser?.completedLessonIds.includes(activeLesson.id);
  const currentScore = currentUser?.lessonScores[activeLesson.id];

  const handleSelectAnswer = (questionIndex: number, optionIndex: number) => {
    if (testSubmitted) return;
    soundManager.playClick();
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const handleStartTest = () => {
    soundManager.playClick();
    setActiveStep('test');
    setSelectedAnswers({});
    setTestSubmitted(false);
  };

  const handleSubmitTest = () => {
    const totalQuestions = activeLesson.test.length;
    let correctCount = 0;

    activeLesson.test.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    const percent = Math.round((correctCount / totalQuestions) * 100);
    setScorePercent(percent);
    setTestSubmitted(true);

    if (currentUser) {
      const res = completeLesson(activeLesson.id, percent);
      setEarnedCoins(res.earnedCoins);
      if (percent >= 60) {
        soundManager.playVictory();
      } else {
        soundManager.playError();
      }
    } else {
      if (percent >= 60) {
        soundManager.playSuccess();
      } else {
        soundManager.playError();
      }
    }

    setActiveStep('result');
  };

  const handleRetakeTest = () => {
    soundManager.playClick();
    setSelectedAnswers({});
    setTestSubmitted(false);
    setActiveStep('test');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh] my-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-100 bg-amber-50/50">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-amber-100 text-amber-900 font-extrabold text-xs rounded-xl">
              {activeLesson.grade}-sinf · {activeLesson.subject}
            </span>
            {isCompleted && (
              <span className="flex items-center gap-1 text-emerald-700 font-bold text-xs bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>O'zlashtirilgan {currentScore ? `(${currentScore}%)` : ''}</span>
              </span>
            )}
          </div>
          <button
            onClick={() => setActiveLesson(null)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Yopish"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs between Dars Matni and Test */}
        <div className="flex border-b border-slate-100 px-6 pt-2 bg-white gap-2">
          <button
            onClick={() => setActiveStep('content')}
            className={`flex items-center gap-2 py-3 px-4 font-bold text-sm border-b-2 transition-all ${
              activeStep === 'content'
                ? 'border-amber-500 text-amber-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Dars matni</span>
          </button>
          <button
            onClick={() => setActiveStep(testSubmitted ? 'result' : 'test')}
            className={`flex items-center gap-2 py-3 px-4 font-bold text-sm border-b-2 transition-all ${
              activeStep !== 'content'
                ? 'border-amber-500 text-amber-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Sinov testi ({activeLesson.test.length} ta savol)</span>
            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold ml-1">
              +{activeLesson.coinsReward} 🪙
            </span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-8 overflow-y-auto flex-1">
          {activeStep === 'content' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
                  {activeLesson.title}
                </h1>
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>~{activeLesson.estimatedMinutes || 15} daqiqa mutolaa</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-amber-600 font-bold">
                    <Award className="w-4 h-4" />
                    <span>Mukofot: {activeLesson.coinsReward} tanga</span>
                  </span>
                </div>
              </div>

              {/* Lesson Illustration / Diagram if available */}
              {activeLesson.image && (
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xs max-h-72">
                  <img
                    src={activeLesson.image}
                    alt={activeLesson.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Lesson Rich Content */}
              <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed font-normal whitespace-pre-line text-sm sm:text-base bg-amber-50/20 p-5 rounded-2xl border border-amber-100/60">
                {activeLesson.content.trim()}
              </div>

              {/* Optional Video / Interactive Link Section */}
              {activeLesson.videoUrl && (
                <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                      <Video className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-indigo-900">Qo'shimcha video darslik mavjud</p>
                      <p className="text-[11px] text-indigo-600 font-medium">Mavzuni yanada chuqurroq o'rganish uchun</p>
                    </div>
                  </div>
                  <a
                    href={activeLesson.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0"
                  >
                    Videoni ko'rish
                  </a>
                </div>
              )}

              {/* Bottom Action: Proceed to Quiz */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <p className="text-xs font-medium text-slate-500">
                  Mavzuni o'qib bo'ldingizmi? Bilimingizni sinab tanga yuting!
                </p>
                <button
                  onClick={handleStartTest}
                  className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-sm rounded-xl shadow-md shadow-orange-500/20 flex items-center gap-2 active:scale-95 transition-all"
                >
                  <span>Testni boshlash</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {activeStep === 'test' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg">
                    {activeLesson.title}: Sinov Testi
                  </h3>
                  <p className="text-xs text-slate-500">
                    Barcha savollarga javob bering va dars tangalariga ega bo'ling.
                  </p>
                </div>
                <div className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                  Mukofot: {activeLesson.coinsReward} 🪙
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-6">
                {activeLesson.test.map((question, qIdx) => (
                  <div
                    key={question.id || qIdx}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-amber-400 text-amber-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {qIdx + 1}
                      </span>
                      <p className="font-bold text-slate-800 text-sm sm:text-base">
                        {question.question}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 pl-8">
                      {question.options.map((option, optIdx) => {
                        const isSelected = selectedAnswers[qIdx] === optIdx;
                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectAnswer(qIdx, optIdx)}
                            className={`p-3 rounded-xl text-xs sm:text-sm font-semibold text-left border transition-all ${
                              isSelected
                                ? 'bg-amber-100/80 border-amber-400 text-amber-950 shadow-xs'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100/60'
                            }`}
                          >
                            <span className="font-bold text-amber-600 mr-2">
                              {String.fromCharCode(65 + optIdx)})
                            </span>
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setActiveStep('content')}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  Dars matniga qaytish
                </button>
                <button
                  onClick={handleSubmitTest}
                  disabled={Object.keys(selectedAnswers).length < activeLesson.test.length}
                  className={`px-6 py-2.5 rounded-xl font-extrabold text-sm shadow-md transition-all ${
                    Object.keys(selectedAnswers).length === activeLesson.test.length
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-emerald-500/20 active:scale-95'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Natijani tekshirish
                </button>
              </div>
            </div>
          )}

          {activeStep === 'result' && (
            <div className="space-y-6 text-center py-4">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 flex items-center justify-center text-4xl shadow-inner">
                {scorePercent >= 80 ? '🏆' : scorePercent >= 60 ? '⭐' : '💪'}
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900">
                  {scorePercent >= 80
                    ? "A'lo natija! Barakalla!"
                    : scorePercent >= 60
                    ? "Yaxshi natija! O'tdingiz!"
                    : "Yana bir bor o'qib ko'ring!"}
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Siz {activeLesson.test.length} ta savoldan {Math.round((scorePercent / 100) * activeLesson.test.length)} tasiga to'g'ri javob berdingiz ({scorePercent}%).
                </p>
              </div>

              {/* Coins Earned Banner */}
              {earnedCoins > 0 ? (
                <div className="p-4 bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-300 rounded-2xl max-w-sm mx-auto shadow-md shadow-amber-400/30 text-amber-950 font-black text-lg flex items-center justify-center gap-2 animate-bounce">
                  <span>🪙</span>
                  <span>+{earnedCoins} tanga hisobingizga qo'shildi!</span>
                </div>
              ) : !currentUser ? (
                <div className="p-4 bg-sky-50 rounded-2xl max-w-sm mx-auto border border-sky-200 text-xs font-semibold text-sky-800">
                  Tangalarni saqlash va do'konda sarflash uchun tizimga kiring:
                  <button
                    onClick={() => setAuthModalOpen(true)}
                    className="mt-2 block w-full py-2 bg-sky-600 text-white font-bold rounded-xl"
                  >
                    Kirish yoki Ro'yxatdan o'tish
                  </button>
                </div>
              ) : null}

              {/* Question-by-Question Detailed Breakdown */}
              <div className="space-y-4 text-left max-w-xl mx-auto pt-4 border-t border-slate-100">
                <h4 className="font-extrabold text-sm text-slate-800">Savollar tahlili va tushuntirishlar:</h4>
                {activeLesson.test.map((q, idx) => {
                  const isCorrect = selectedAnswers[idx] === q.correctIndex;
                  return (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border text-xs ${
                        isCorrect
                          ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                          : 'bg-rose-50/60 border-rose-200 text-rose-950'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold mb-1">
                        {isCorrect ? (
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        )}
                        <span>{idx + 1}. {q.question}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 ml-6">
                        To'g'ri javob: <strong className="text-slate-800">{q.options[q.correctIndex]}</strong>
                      </p>
                      {q.explanation && (
                        <p className="text-[11px] text-slate-500 italic ml-6 mt-0.5">
                          Tushuntirish: {q.explanation}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-center gap-3 pt-4">
                <button
                  onClick={handleRetakeTest}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-xs text-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Qayta yechish</span>
                </button>
                <button
                  onClick={() => setActiveLesson(null)}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 font-extrabold text-xs text-white shadow-md shadow-amber-500/20 transition-all"
                >
                  Darsni yakunlash
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
