import React, { useState, useEffect } from 'react';
import { RotateCcw, Lightbulb, Trophy, Delete } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { soundManager } from '../../utils/sound';

interface WordItem {
  word: string;
  hint: string;
}

export const WordGame: React.FC = () => {
  const { selectedGrade, awardGameCoins } = useApp();

  const [wordList, setWordList] = useState<WordItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrambled, setScrambled] = useState<string[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<{ char: string; originalIdx: number }[]>([]);
  const [usedTileIndices, setUsedTileIndices] = useState<number[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [score, setScore] = useState(0);

  // Vocabulary sets based on grade
  useEffect(() => {
    let words: WordItem[] = [];

    if (selectedGrade <= 4) {
      words = [
        { word: 'KITOB', hint: "Mutolaa qilinadigan eng yaqin bilim do'sti" },
        { word: 'VATAN', hint: "Biz tug'ilib o'sgan aziz muqaddas diyor" },
        { word: 'MAKTAB', hint: "Ustozlar bilim beradigan muhtasham maskan" },
        { word: 'QUYOSH', hint: "Kunduzi osmonda charaqlab yorug'lik va issiqlik beruvchi yulduz" },
        { word: 'OLMA', hint: "Bog'larimizda pishadigan mazali vitaminli meva" },
      ];
    } else if (selectedGrade <= 8) {
      words = [
        { word: 'BILIMDON', hint: "Har bir savolga chuqur va to'g'ri javob biluvchi zukko inson" },
        { word: 'SAYYORA', hint: "Quyosh atrofida aylanuvchi osmon jismi (masalan, Yer, Mars)" },
        { word: 'ALIFBO', hint: "Tilimizdagi barcha tovushlar va harflar qat'iy tartibi" },
        { word: 'TABIAT', hint: "Tog'lar, daryolar, o'simliklar va jonivorlar yashaydigan tirik muhit" },
        { word: 'TARIX', hint: "Insoniyatning o'tmishi va qadimiy voqealarni o'rganuvchi fan" },
      ];
    } else {
      words = [
        { word: 'ALGORITM', hint: "Al-Xorazmiy asos solgan, ketma-ket aniq buyruqlar tartibi" },
        { word: 'GEOMETRIYA', hint: "Shakllar, burchaklar va fazoviy jismlarni o'rganuvchi qadimiy fan" },
        { word: 'GRAVITATSIYA', hint: "Nyuton ochgan butunjahon tortishish kuchi" },
        { word: 'MOLEKULA', hint: "Moddaning kimyoviy xossalarini saqlovchi eng kichik zarrachasi" },
        { word: 'SIVILIZATSIYA', hint: "Jamiyat taraqqiyoti, ilg'or madaniyat va davlatchilik bosqichi" },
      ];
    }

    setWordList(words);
    setCurrentIndex(0);
    setScore(0);
  }, [selectedGrade]);

  const loadWord = (index: number) => {
    if (!wordList[index]) return;
    const current = wordList[index].word;
    const chars = current.split('');
    
    // Ensure scrambled is different from target
    let shuffled = [...chars];
    let attempts = 0;
    while (attempts < 10 && shuffled.join('') === current) {
      shuffled.sort(() => Math.random() - 0.5);
      attempts++;
    }

    setScrambled(shuffled);
    setSelectedLetters([]);
    setUsedTileIndices([]);
    setShowHint(false);
    setIsSuccess(false);
  };

  useEffect(() => {
    if (wordList.length > 0) {
      loadWord(currentIndex);
    }
  }, [wordList, currentIndex]);

  const handleTileClick = (char: string, tileIdx: number) => {
    if (isSuccess || usedTileIndices.includes(tileIdx)) return;
    soundManager.playClick();

    const nextSelected = [...selectedLetters, { char, originalIdx: tileIdx }];
    const nextUsed = [...usedTileIndices, tileIdx];

    setSelectedLetters(nextSelected);
    setUsedTileIndices(nextUsed);

    // Check if word complete
    const targetWord = wordList[currentIndex]?.word;
    if (nextSelected.length === targetWord.length) {
      const guessed = nextSelected.map(i => i.char).join('');
      if (guessed === targetWord) {
        soundManager.playVictory();
        setIsSuccess(true);
        setScore(s => s + 1);
        awardGameCoins(15, "So'z Topish O'yini");
      } else {
        soundManager.playError();
      }
    }
  };

  const handleRemoveLast = () => {
    if (selectedLetters.length === 0 || isSuccess) return;
    soundManager.playClick();
    const last = selectedLetters[selectedLetters.length - 1];
    setSelectedLetters(selectedLetters.slice(0, -1));
    setUsedTileIndices(usedTileIndices.filter(i => i !== last.originalIdx));
  };

  const handleResetCurrent = () => {
    soundManager.playClick();
    setSelectedLetters([]);
    setUsedTileIndices([]);
  };

  const handleNextWord = () => {
    soundManager.playClick();
    if (currentIndex < wordList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Loop or restart
      setCurrentIndex(0);
    }
  };

  const currentWordItem = wordList[currentIndex];
  if (!currentWordItem) return null;

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-8 border border-amber-100 shadow-sm space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span>So'z Topish O'yini (Anagramma)</span>
            <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
              {selectedGrade}-sinf darajasi
            </span>
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Aralashib ketgan harflardan ma'noli so'zni to'g'ri tartibda tering!
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
          <div className="bg-amber-50 text-amber-900 px-3 py-1.5 rounded-xl border border-amber-200">
            Topilgan so'zlar: <span className="font-black">{score} / {wordList.length}</span>
          </div>
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-1.5 bg-yellow-100/80 hover:bg-yellow-200 text-yellow-900 px-3 py-1.5 rounded-xl transition-colors font-bold"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
            <span>Maslahat (Yordam)</span>
          </button>
        </div>
      </div>

      {/* Main Board */}
      <div className="max-w-xl mx-auto space-y-6 text-center py-2">
        
        {/* Clue Hint Callout */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700">
          <span className="font-bold text-amber-700 mr-2">Ta'rif:</span>
          {showHint ? currentWordItem.hint : "Topishmoq: 'Maslahat' tugmasini bosing yoki harflarga qarab toping!"}
        </div>

        {/* Word Answer Slots */}
        <div className="flex items-center justify-center gap-2 flex-wrap min-h-16">
          {currentWordItem.word.split('').map((_, idx) => {
            const letter = selectedLetters[idx];
            return (
              <div
                key={idx}
                className={`w-12 h-14 sm:w-14 sm:h-16 rounded-2xl border-2 flex items-center justify-center text-xl sm:text-2xl font-black uppercase transition-all shadow-xs ${
                  isSuccess
                    ? 'bg-emerald-100 border-emerald-400 text-emerald-950 scale-105'
                    : letter
                    ? 'bg-amber-100/80 border-amber-400 text-amber-950'
                    : 'bg-white border-dashed border-slate-300 text-transparent'
                }`}
              >
                {letter ? letter.char : ''}
              </div>
            );
          })}
        </div>

        {/* Letter Tiles to Pick */}
        <div className="flex items-center justify-center gap-2.5 flex-wrap pt-2">
          {scrambled.map((char, idx) => {
            const isUsed = usedTileIndices.includes(idx);
            return (
              <button
                key={idx}
                onClick={() => handleTileClick(char, idx)}
                disabled={isUsed || isSuccess}
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl font-black text-lg sm:text-xl uppercase transition-all select-none ${
                  isUsed
                    ? 'bg-slate-100 text-slate-300 border border-slate-200 cursor-not-allowed scale-90'
                    : 'bg-gradient-to-b from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white shadow-md shadow-orange-400/20 active:scale-95'
                }`}
              >
                {char}
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-center gap-3 pt-4">
          <button
            onClick={handleRemoveLast}
            disabled={selectedLetters.length === 0 || isSuccess}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 font-bold text-xs rounded-xl transition-colors"
          >
            <Delete className="w-4 h-4" />
            <span>O'chirish</span>
          </button>
          <button
            onClick={handleResetCurrent}
            disabled={selectedLetters.length === 0 || isSuccess}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 font-bold text-xs rounded-xl transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Tozalash</span>
          </button>
        </div>

        {/* Success Card */}
        {isSuccess && (
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-2 animate-in zoom-in-95">
            <div className="flex items-center justify-center gap-2 font-black text-lg">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>To'g'ri topdingiz: {currentWordItem.word}! 🎉</span>
            </div>
            <p className="text-xs text-emerald-800 font-medium">
              Sizga 15 tanga mukofot berildi!
            </p>
            <button
              onClick={handleNextWord}
              className="mt-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors"
            >
              Keyingi so'zga o'tish →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
