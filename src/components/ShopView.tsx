import React, { useState } from 'react';
import { ShoppingBag, Sparkles, Check, AlertCircle, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ShopItemType } from '../types';

export const ShopView: React.FC = () => {
  const { shopItems, currentUser, buyShopItem, equipItem, setAuthModalOpen, setActiveTab } = useApp();
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedPreviewItem, setSelectedPreviewItem] = useState<string | null>(null);

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'Barchasi' },
    { id: 'avatar', label: 'Avatarlar' },
    { id: 'frame', label: 'Ramkalar' },
    { id: 'theme', label: 'Fon ranglari' },
    { id: 'badge', label: 'Nishonlar' },
  ];

  const filteredItems = filterType === 'all'
    ? shopItems
    : shopItems.filter(item => item.type === filterType);

  const handleBuy = (itemId: string) => {
    if (!currentUser) {
      setAuthModalOpen(true);
      return;
    }
    buyShopItem(itemId);
  };

  const isItemOwned = (type: ShopItemType, value: string): boolean => {
    if (!currentUser) return false;
    const invKey = `${type}s` as keyof typeof currentUser.inventory;
    const list = currentUser.inventory[invKey] || [];
    return list.includes(value);
  };

  const isItemActive = (type: ShopItemType, value: string): boolean => {
    if (!currentUser) return false;
    if (type === 'avatar') return currentUser.activeAvatar === value;
    if (type === 'frame') return currentUser.activeFrame === value;
    if (type === 'theme') return currentUser.activeTheme === value;
    if (type === 'badge') return currentUser.activeBadge === value;
    return false;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Shop Header Banner */}
      <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-orange-500/15 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 text-center md:text-left z-10">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Zukko Bozorcha</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Sehrli Do'kon & Sovg'alar
          </h1>
          <p className="text-xs sm:text-sm text-white/90 max-w-xl font-medium">
            Dars va o'yinlarda to'plagan oltin tangalaringiz evaziga profilingiz uchun chiroyli avatarlar, yaltiroq ramkalar va faxriy nishonlarni xarid qiling!
          </p>
        </div>

        {/* Coin Balance Wallet Card */}
        <div className="bg-white/20 backdrop-blur-md p-5 rounded-2xl border border-white/30 text-center min-w-[200px] z-10">
          <p className="text-xs font-bold text-white/80">Sizning balansingiz</p>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="text-3xl animate-bounce" role="img" aria-label="coin">🪙</span>
            <span className="text-3xl font-black text-yellow-200 tabular-nums">
              {currentUser ? currentUser.coins : 0}
            </span>
          </div>
          <p className="text-[11px] text-white/80 mt-1 font-semibold">
            {currentUser ? "oltin tanga mavjud" : "Tizimga kiring"}
          </p>
        </div>

        {/* Ambient Decorative Shapes */}
        <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => {
          const isActive = filterType === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setFilterType(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-amber-500 text-white shadow-xs ring-2 ring-amber-300'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredItems.map(item => {
          const owned = isItemOwned(item.type, item.value);
          const active = isItemActive(item.type, item.value);
          const canAfford = currentUser ? currentUser.coins >= item.price : false;

          return (
            <div
              key={item.id}
              className={`bg-white rounded-3xl p-5 border-2 transition-all flex flex-col justify-between group hover:shadow-lg ${
                active
                  ? 'border-amber-400 ring-2 ring-amber-300/60 shadow-md'
                  : owned
                  ? 'border-emerald-200 bg-emerald-50/10'
                  : 'border-slate-100 hover:border-amber-200'
              }`}
            >
              {/* Product Visual Box */}
              <div>
                <div className="h-36 rounded-2xl bg-amber-50/50 border border-amber-100/60 flex items-center justify-center p-3 relative overflow-hidden mb-4 group-hover:scale-102 transition-transform">
                  
                  {item.type === 'avatar' && (
                    <div className="w-24 h-24 rounded-full overflow-hidden shadow-md flex items-center justify-center bg-white border-2 border-amber-200">
                      {item.value.startsWith('/') ? (
                        <img
                          src={item.value}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-5xl select-none">{item.value}</span>
                      )}
                    </div>
                  )}

                  {item.type === 'frame' && (
                    <div className={`w-20 h-20 rounded-full bg-white flex items-center justify-center text-3xl ${item.value}`}>
                      👑
                    </div>
                  )}

                  {item.type === 'theme' && (
                    <div className={`w-full h-full rounded-xl flex items-center justify-center p-3 text-xs font-bold shadow-inner ${item.value}`}>
                      <span>Fon namoyishi</span>
                    </div>
                  )}

                  {item.type === 'badge' && (
                    <div className="flex flex-col items-center justify-center">
                      {item.previewUrl.startsWith('/') ? (
                        <img
                          src={item.previewUrl}
                          alt={item.name}
                          className="w-20 h-20 object-contain drop-shadow-md"
                        />
                      ) : (
                        <span className="text-4xl drop-shadow-sm select-none">{item.previewUrl}</span>
                      )}
                    </div>
                  )}

                  {/* Active / Owned Badges */}
                  {active && (
                    <span className="absolute top-2 right-2 bg-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs">
                      Faol kiyilgan
                    </span>
                  )}
                  {owned && !active && (
                    <span className="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs">
                      Sotib olingan
                    </span>
                  )}
                </div>

                {/* Name & Details */}
                <h3 className="font-extrabold text-base text-slate-900 leading-snug">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Price & Action Button */}
              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 font-black text-amber-600 text-sm">
                  <span>🪙</span>
                  <span className="tabular-nums font-black">{item.price}</span>
                  <span className="text-[11px] text-slate-400 font-semibold">coin</span>
                </div>

                <div>
                  {active ? (
                    <button
                      disabled
                      className="px-3.5 py-1.5 rounded-xl bg-amber-100 text-amber-800 text-xs font-bold cursor-default flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Kiyilgan</span>
                    </button>
                  ) : owned ? (
                    <button
                      onClick={() => equipItem(item.type, item.value)}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors"
                    >
                      Kiyish (Faollashtirish)
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBuy(item.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all shadow-xs flex items-center gap-1.5 ${
                        canAfford
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white active:scale-95'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                      }`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Sotib olish</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Helpful bottom callout */}
      <div className="p-6 rounded-3xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center text-2xl shrink-0">
            💡
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-amber-950">
              Qanday qilib ko'proq tanga to'plash mumkin?
            </h4>
            <p className="text-xs text-amber-900 font-medium">
              Sinf darslarini to'liq o'qib testlarni yeching (har bir darsga 15–70 coin) va 4 ta o'yinda rekordlar o'rnating!
            </p>
          </div>
        </div>
        <button
          onClick={() => setActiveTab('lessons')}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-md transition-all shrink-0"
        >
          Darslarga o'tish →
        </button>
      </div>
    </div>
  );
};
