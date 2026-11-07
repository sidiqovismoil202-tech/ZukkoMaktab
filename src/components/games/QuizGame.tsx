import React, { useState, useEffect } from 'react';
import { RotateCcw, Trophy, CheckCircle, AlertCircle, HelpCircle, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { soundManager } from '../../utils/sound';

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const QuizGame: React.FC = () => {
  const { selectedGrade, awardGameCoins } = useApp();

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  // Generate grade-adaptive trivia questions
  useEffect(() => {
    let pool: QuizQuestion[] = [];

    if (selectedGrade <= 4) {
      pool = [
        {
          question: "O'zbekiston Respublikasining poytaxti qaysi shahar?",
          options: ["Samarqand", "Toshkent", "Buxoro", "Andijon"],
          correctIndex: 1,
          explanation: "Toshkent — O'zbekistonning poytaxti va eng yirik shahri."
        },
        {
          question: "Qaysi qush kechalari yaxshi ko'radi va donolik ramzi hisoblanadi?",
          options: ["Qaldirg'och", "Boyqush", "Burgut", "Chumchuq"],
          correctIndex: 1,
          explanation: "Boyqush kechasi yaxshi ko'radi va donolik ramzidir."
        },
        {
          question: "Dunyodagi eng katta quruqlik jonivori nima?",
          options: ["Arslon", "Fil", "Jirafa", "Begemot"],
          correctIndex: 1,
          explanation: "Afrika fili quruqlikdagi eng og'ir va ulkan jonzotdir."
        },
        {
          question: "O'zbekiston bayrog'ida nechta yulduz tasvirlangan?",
          options: ["10 ta", "11 ta", "12 ta", "15 ta"],
          correctIndex: 2,
          explanation: "Bayrog'imizda 12 ta yulduz va yarim oy tasvirlangan."
        },
        {
          question: "Quyoshga eng yaqin turgan sayyora qaysi?",
          options: ["Yer", "Venera", "Merkuriy", "Mars"],
          correctIndex: 2,
          explanation: "Merkuriy — Quyoshga eng yaqin sayyora."
        }
      ];
    } else if (selectedGrade <= 8) {
      pool = [
        {
          question: "Amir Temur qaysi yilda tavallud topgan?",
          options: ["1336-yil", "1370-yil", "1405-yil", "1236-yil"],
          correctIndex: 0,
          explanation: "Sohibqiron Amir Temur 1336-yil 9-aprelda Xo'ja Ilg'or qishlog'ida tug'ilgan."
        },
        {
          question: "Suvning kimyoviy formulasi qaysi?",
          options: ["CO2", "H2O", "O2", "NaCl"],
          correctIndex: 1,
          explanation: "Suv 2 ta vodorod va 1 ta kislorod atomidan (H2O) iborat."
        },
        {
          question: "Dunyodagi eng uzun daryo qaysi?",
          options: ["Amazonka", "Nil", "Amudaryo", "Missisipi"],
          correctIndex: 1,
          explanation: "Nil daryosi dunyodagi eng uzun daryo hisoblanadi (6650 km)."
        },
        {
          question: "Yorug'lik tezligi vakuumda taxminan qanchaga teng?",
          options: ["300 km/s", "300 000 km/s", "100 000 km/s", "1 000 km/s"],
          correctIndex: 1,
          explanation: "Yorug'lik bir soniyada 300 000 kilometr masofani bosib o'tadi!"
        },
        {
          question: "O'zbek adabiy tilining asoschisi kim?",
          options: ["Alisher Navoiy", "Bobur", "Lutfiy", "Muqimiy"],
          correctIndex: 0,
          explanation: "Hazrat Alisher Navoiy o'zbek adabiy tiliga tamal toshini qo'ygan."
        }
      ];
    } else {
      pool = [
        {
          question: "Dunyodagi birinchi dasturchi ayol kim bo'lgan?",
          options: ["Ada Lavleys", "Mariya Kyuri", "Margaret Xemilton", "Greys Xopper"],
          correctIndex: 0,
          explanation: "Ada Lavleys Ch. Bebbijning hisoblash mashinasi uchun birinchi dastur algoritmini yaratgan."
        },
        {
          question: "O'zbekiston qachon Birlashgan Millatlar Tashkilotiga (BMT) a'zo bo'lgan?",
          options: ["1991-yil", "1992-yil 2-mart", "1993-yil", "1995-yil"],
          correctIndex: 1,
          explanation: "1992-yil 2-martda O'zbekiston BMTning to'laqonli a'zosiga aylandi."
        },
        {
          question: "Hujayrada oqsil sintezini qaysi organoid amalga oshiradi?",
          options: ["Lizosoma", "Ribosoma", "Vakuola", "Golji majmuasi"],
          correctIndex: 1,
          explanation: "Ribosomalar genetik kod asosida oqsillarni yig'ib beradi."
        },
        {
          question: "Tarixda birinchi marta Yer radiusini yuqori aniqlikda o'lchagan alloma kim?",
          options: ["Beruniy", "Al-Xorazmiy", "Farg'oniy", "Pifagor"],
          correctIndex: 0,
          explanation: "Abu Rayhon Beruniy o'zi yaratgan trigonometrik usul orqali Yer radiusini o'lchagan."
        },
        {
          question: "Kvant fizikasida yorug'lik zarrachasi nima deb ataladi?",
          options: ["Foton", "Proton", "Pozitron", "Neytrino"],
          correctIndex: 0,
          explanation: "Foton — yorug'lik va elektromagnit nurlanishning elementar kvantidir."
        }
      ];
    }

    setQuestions(pool);
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setIsGameOver(false);
  }, [selectedGrade]);

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);

    const q = questions[currentIdx];
    if (idx === q.correctIndex) {
      soundManager.playCoin();
      setScore(s => s + 1);
    } else {
      soundManager.playError();
    }
  };

  const handleNext = () => {
    soundManager.playClick();
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setIsGameOver(true);
      const earned = (score + (selectedOpt === questions[currentIdx].correctIndex ? 1 : 0)) * 6;
      if (earned > 0) {
        awardGameCoins(earned, 'Zukko Viktorina');
      }
    }
  };

  const handleRestart = () => {
    soundManager.playClick();
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setIsGameOver(false);
  };

  const curQ = questions[currentIdx];
  if (!curQ) return null;

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-8 border border-amber-100 shadow-sm space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span>Zukko Viktorina (Savol-Javob)</span>
            <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
              {selectedGrade}-sinf darajasi
            </span>
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Tarix, fan, adabiyot va koinot bo'yicha qiziqarli savollarga to'g'ri javob bering!
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
          <div className="bg-amber-50 text-amber-900 px-3 py-1.5 rounded-xl border border-amber-200">
            Natija: <span className="font-black">{score} / {questions.length}</span>
          </div>
          <button
            onClick={handleRestart}
            className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Qayta</span>
          </button>
        </div>
      </div>

      {!isGameOver ? (
        <div className="max-w-xl mx-auto space-y-6 py-2">
          
          <div className="flex justify-between items-center text-xs font-bold text-slate-400">
            <span>Savol {currentIdx + 1} / {questions.length}</span>
            <span>Har to'g'ri javob uchun: +6 coin</span>
          </div>

          {/* Question Box */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 border border-amber-200 text-slate-900">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-white font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                ?
              </div>
              <h4 className="font-extrabold text-base sm:text-lg leading-snug">
                {curQ.question}
              </h4>
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {curQ.options.map((opt, idx) => {
              const isChosen = selectedOpt === idx;
              const isCorrect = idx === curQ.correctIndex;

              let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:bg-amber-50 hover:border-amber-300';
              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold';
                } else if (isChosen) {
                  btnStyle = 'bg-rose-100 border-rose-400 text-rose-950 font-bold';
                } else {
                  btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isAnswered}
                  className={`p-4 rounded-2xl border-2 text-xs sm:text-sm text-left transition-all font-semibold flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isAnswered && isCorrect && <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />}
                  {isAnswered && isChosen && !isCorrect && <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Callout if Answered */}
          {isAnswered && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1 animate-in fade-in">
              <p className="font-bold">
                {selectedOpt === curQ.correctIndex ? "To'g'ri javob!" : "Tushuntirish:"}
              </p>
              <p className="text-slate-600">{curQ.explanation}</p>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="text-right pt-2">
              <button
                onClick={handleNext}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md shadow-amber-500/20 inline-flex items-center gap-2 active:scale-95 transition-all"
              >
                <span>{currentIdx < questions.length - 1 ? "Keyingi savol" : "Natijani ko'rish"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 border border-amber-200 text-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 bg-amber-500 text-white rounded-3xl mx-auto flex items-center justify-center shadow-lg">
            <Trophy className="w-8 h-8" />
          </div>
          <h4 className="text-2xl font-black text-amber-950">Viktorina yakunlandi! 🌟</h4>
          <p className="text-sm text-slate-600 font-medium">
            Siz {questions.length} ta savoldan {score} tasiga to'g'ri javob berdingiz!
          </p>
          <div className="text-base font-black text-amber-800 bg-amber-100/80 py-2 px-4 rounded-full inline-block">
            +{score * 6} tanga mukofotlandi! 🪙
          </div>
          <div>
            <button
              onClick={handleRestart}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs rounded-xl shadow-md transition-all active:scale-95"
            >
              Qayta viktorina o'ynash
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
