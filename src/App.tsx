import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { LessonsView } from './components/LessonsView';
import { GamesView } from './components/GamesView';
import { ShopView } from './components/ShopView';
import { ProfileView } from './components/ProfileView';
import { AdminView } from './components/AdminView';
import { LessonViewerModal } from './components/LessonViewerModal';
import { AuthModal } from './components/AuthModal';
import { ToastContainer } from './components/ToastContainer';
import { Sparkles, Heart } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/30 selection:bg-amber-300 selection:text-amber-950 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'lessons' && <LessonsView />}
        {activeTab === 'games' && <GamesView />}
        {activeTab === 'shop' && <ShopView />}
        {activeTab === 'profile' && <ProfileView />}
        {activeTab === 'admin' && <AdminView />}
      </main>

      {/* Interactive Global Modals */}
      <LessonViewerModal />
      <AuthModal />
      <ToastContainer />

      {/* Kid-friendly Footer */}
      <footer className="bg-white border-t border-amber-200/60 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-400 flex items-center justify-center text-lg shadow-xs">
              🦉
            </div>
            <div>
              <p className="font-extrabold text-sm text-slate-800">ZukkoMaktab Ta'lim Portali</p>
              <p className="text-[11px] text-slate-500 font-medium">
                1–11 sinf o'quvchilari uchun interaktiv bilim va o'yinlar tizimi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
            <button onClick={() => setActiveTab('lessons')} className="hover:text-amber-600 transition-colors">
              Darslar
            </button>
            <button onClick={() => setActiveTab('games')} className="hover:text-amber-600 transition-colors">
              O'yinlar
            </button>
            <button onClick={() => setActiveTab('shop')} className="hover:text-amber-600 transition-colors">
              Do'kon
            </button>
            <button onClick={() => setActiveTab('admin')} className="text-rose-600 hover:text-rose-700 font-bold transition-colors">
              Admin
            </button>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center gap-1">
            <span>© 2026 ZukkoMaktab · Bolalar uchun mehr bilan yaratildi</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
