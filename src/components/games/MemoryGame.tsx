import React, { useState, useEffect } from 'react';
import { RotateCcw, Trophy, Clock, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { soundManager } from '../../utils/sound';

interface CardItem {
  id: number;
  symbol: string;
  label: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export const MemoryGame: React.FC = () => {
  const { selectedGrade, awardGameCoins } = useApp();

  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Deck generation based on grade
  const generateDeck = () => {
    let pool: { symbol: string; label: string }[] = [];

    if (selectedGrade <= 4) {
      // 4 pairs (8 cards)
      pool = [
        { symbol: '🍎', label: 'Olma' },
        { symbol: '🦁', label: 'Arslon' },
        { symbol: '🚀', label: 'Raketa' },
        { symbol: '🦉', label: 'Boyqush' },
      ];
    } else if (selectedGrade <= 8) {
      // 6 pairs (12 cards)
      pool = [
        { symbol: '🌍', label: 'Yer' },
        { symbol: '⚛️', label: 'Atom' },
        { symbol: '🧬', label: 'DNK' },
        { symbol: '📐', label: 'Geometriya' },
        { symbol: '💻', label: 'Kompyuter' },
        { symbol: '☀️', label: 'Quyosh' },
      ];
    } else {
      // 8 pairs (16 cards)
      pool = [
        { symbol: '🔭', label: 'Teleskop' },
        { symbol: '🔬', label: 'Mikroskop' },
        { symbol: 'π', label: 'Pi soni' },
        { symbol: '⚡', label: 'Energiya' },
        { symbol: '💡', label: 'Ixtiro' },
        { symbol: '🏛️', label: 'Tarix' },
        { symbol: '📚', label: 'Akademiya' },
        { symbol: '🧠', label: 'Intellekt' },
      ];
    }

    const paired = [...pool, ...pool].map((item, idx) => ({
      id: idx,
      symbol: item.symbol,
      label: item.label,
      isFlipped: false,
      isMatched: false,
    }));

    // Shuffle
    for (let i = paired.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [paired[i], paired[j]] = [paired[j], paired[i]];
    }

    setCards(paired);
    setFlippedIndices([]);
    setMoves(0);
    setSeconds(0);
    setIsGameOver(false);
    setIsPlaying(true);
  };

  useEffect(() => {
    generateDeck();
  }, [selectedGrade]);

  // Timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && !isGameOver) {
      timer = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, isGameOver]);

  const handleCardClick = (index: number) => {
    if (!isPlaying || isGameOver) return;
    if (cards[index].isMatched || cards[index].isFlipped) return;
    if (flippedIndices.length >= 2) return;

    soundManager.playClick();
    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const nextFlipped = [...flippedIndices, index];
    setFlippedIndices(nextFlipped);

    if (nextFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = nextFlipped;

      if (cards[first].symbol === cards[second].symbol) {
        // Matched!
        setTimeout(() => {
          soundManager.playCoin();
          setCards(prev =>
            prev.map((c, i) =>
              i === first || i === second ? { ...c, isMatched: true } : c
            )
          );
          setFlippedIndices([]);

          // Check if all matched
          const remaining = cards.filter(
            (c, i) => !c.isMatched && i !== first && i !== second
          );
          if (remaining.length === 0) {
            setIsGameOver(true);
            setIsPlaying(false);
            const prize = selectedGrade <= 4 ? 20 : selectedGrade <= 8 ? 25 : 30;
            awardGameCoins(prize, 'Xotira O\'yini');
          }
        }, 400);
      } else {
        // Not matched
        setTimeout(() => {
          soundManager.playError();
          setCards(prev =>
            prev.map((c, i) =>
              i === first || i === second ? { ...c, isFlipped: false } : c
            )
          );
          setFlippedIndices([]);
        }, 900);
      }
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-8 border border-amber-100 shadow-sm space-y-6">
      
      {/* Game Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span>Xotira O'yini (Juft kartalar)</span>
            <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
              {selectedGrade}-sinf darajasi
            </span>
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Bir xil belgili kartalar juftini toping va xotirangizni charxlang!
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold text-slate-600">
          <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
            <Clock className="w-4 h-4 text-amber-600" />
            <span className="tabular-nums font-mono">{seconds} soniya</span>
          </div>
          <div className="bg-slate-100 px-3 py-1.5 rounded-xl">
            Urinishlar: <span className="text-slate-900">{moves}</span>
          </div>
          <button
            onClick={generateDeck}
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white px-3.5 py-1.5 rounded-xl shadow-xs transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Qayta boshlash</span>
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div
        className={`grid gap-3 sm:gap-4 max-w-2xl mx-auto ${
          cards.length <= 8
            ? 'grid-cols-4'
            : cards.length <= 12
            ? 'grid-cols-3 sm:grid-cols-4'
            : 'grid-cols-4 sm:grid-cols-4'
        }`}
      >
        {cards.map((card, idx) => {
          const showFace = card.isFlipped || card.isMatched;
          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(idx)}
              disabled={showFace}
              className={`h-24 sm:h-28 rounded-2xl flex flex-col items-center justify-center p-2 text-center transition-all transform duration-200 select-none ${
                card.isMatched
                  ? 'bg-emerald-100/70 border-2 border-emerald-400 text-emerald-950 scale-95 opacity-90'
                  : showFace
                  ? 'bg-amber-100 border-2 border-amber-400 text-amber-950 shadow-md scale-102'
                  : 'bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 text-white shadow-sm hover:scale-105 active:scale-95'
              }`}
            >
              {showFace ? (
                <>
                  <span className="text-2xl sm:text-3xl mb-1">{card.symbol}</span>
                  <span className="text-[10px] font-bold truncate max-w-full">
                    {card.label}
                  </span>
                </>
              ) : (
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Game Over Modal / Card */}
      {isGameOver && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 border border-amber-200 text-center space-y-3 animate-in zoom-in-95">
          <div className="w-12 h-12 bg-amber-500 text-white rounded-2xl mx-auto flex items-center justify-center shadow-md">
            <Trophy className="w-6 h-6" />
          </div>
          <h4 className="text-xl font-black text-amber-950">G'alaba! Barcha juftliklar topildi! 🎉</h4>
          <p className="text-xs text-amber-900 font-medium">
            Siz o'yinni {seconds} soniyada va {moves} ta urinishda yakunladingiz!
          </p>
          <button
            onClick={generateDeck}
            className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors"
          >
            Yana o'ynash
          </button>
        </div>
      )}
    </div>
  );
};
