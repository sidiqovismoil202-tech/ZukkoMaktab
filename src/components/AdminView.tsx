import React, { useState } from 'react';
import {
  Shield,
  Lock,
  Users,
  BookOpen,
  ShoppingBag,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  XCircle,
  Coins,
  Key,
  BarChart3,
  LogOut,
  AlertTriangle,
  Eye,
  EyeOff
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GradeNumber, Lesson, ShopItem, ShopItemType, TestQuestion } from '../types';

type AdminTab = 'stats' | 'lessons' | 'users' | 'shop' | 'settings';

export const AdminView: React.FC = () => {
  const {
    adminLoggedIn,
    adminLogin,
    adminLogout,
    updateAdminPassword,
    users,
    lessons,
    shopItems,
    addLesson,
    updateLesson,
    deleteLesson,
    addShopItem,
    updateShopItem,
    deleteShopItem,
    toggleUserBlock,
    adjustUserCoins,
    deleteUser,
  } = useApp();

  // Admin login form states
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [showAdminPass, setShowAdminPass] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  // Active admin console tab
  const [activeTab, setActiveTab] = useState<AdminTab>('stats');

  // Lesson Modal State
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [lessonGrade, setLessonGrade] = useState<GradeNumber>(1);
  const [lessonSubject, setLessonSubject] = useState('Matematika');
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonDesc, setLessonDesc] = useState('');
  const [lessonContent, setLessonContent] = useState('');
  const [lessonCoins, setLessonCoins] = useState(20);
  const [lessonMins, setLessonMins] = useState(15);
  const [lessonImg, setLessonImg] = useState('');
  const [lessonVideo, setLessonVideo] = useState('');
  const [lessonQuestions, setLessonQuestions] = useState<TestQuestion[]>([
    {
      id: 'q1',
      question: '',
      options: ['', '', '', ''],
      correctIndex: 0,
      explanation: '',
    },
  ]);

  // Shop Item Modal State
  const [isShopModalOpen, setIsShopModalOpen] = useState(false);
  const [editingShopId, setEditingShopId] = useState<string | null>(null);
  const [shopName, setShopName] = useState('');
  const [shopType, setShopType] = useState<ShopItemType>('avatar');
  const [shopPrice, setShopPrice] = useState(30);
  const [shopDesc, setShopDesc] = useState('');
  const [shopValue, setShopValue] = useState('');
  const [shopPreview, setShopPreview] = useState('');

  // Password change state
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [confirmAdminPassword, setConfirmAdminPassword] = useState('');
  const [passChangeMsg, setPassChangeMsg] = useState('');

  // Handle Admin Login Submit
  const handleAdminLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);
    const res = await adminLogin(adminUser, adminPass);
    setLoading(false);
    if (!res.success) {
      setLoginError(res.message);
    }
  };

  // If not logged in as Admin, show dedicated admin login screen
  if (!adminLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl mx-auto flex items-center justify-center shadow-inner">
              <Shield className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Admin Boshqaruv Markazi
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Ushbu bo'lim faqat tizim ma'murlari va ustozlar uchun mo'ljallangan.
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-bold">
              {loginError}
            </div>
          )}

          <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Admin Login
              </label>
              <input
                type="text"
                required
                value={adminUser}
                onChange={e => setAdminUser(e.target.value)}
                placeholder="admin"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-rose-400 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Admin Maxfiy Parol
              </label>
              <div className="relative">
                <input
                  type={showAdminPass ? 'text' : 'password'}
                  required
                  value={adminPass}
                  onChange={e => setAdminPass(e.target.value)}
                  placeholder="Standart: admin123"
                  className="w-full pl-3.5 pr-10 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-rose-400 bg-slate-50/50"
                />
                <button
                  type="button"
                  onClick={() => setShowAdminPass(!showAdminPass)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showAdminPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm rounded-2xl shadow-md shadow-rose-600/20 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>{loading ? "Tekshirilmoqda..." : "Admin sifatida kirish"}</span>
            </button>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 font-medium">
              💡 <strong>Standart kirish:</strong> Login: <code className="bg-amber-100 px-1 py-0.5 rounded">admin</code>, Parol: <code className="bg-amber-100 px-1 py-0.5 rounded">admin123</code>. Kiring va sozlamalar bo'limida parolingizni xohlagan vaqt yangilang.
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Admin Dashboard Statistics
  const totalCoinsInCirculation = users.reduce((acc, u) => acc + u.coins, 0);
  const totalCompletedLessons = users.reduce((acc, u) => acc + u.completedLessonIds.length, 0);

  // Lesson Handlers
  const handleOpenAddLesson = () => {
    setEditingLessonId(null);
    setLessonGrade(1);
    setLessonSubject('Matematika');
    setLessonTitle('');
    setLessonDesc('');
    setLessonContent('');
    setLessonCoins(20);
    setLessonMins(15);
    setLessonImg('');
    setLessonVideo('');
    setLessonQuestions([
      {
        id: `q_${Date.now()}_1`,
        question: '',
        options: ['', '', '', ''],
        correctIndex: 0,
        explanation: '',
      },
    ]);
    setIsLessonModalOpen(true);
  };

  const handleOpenEditLesson = (lesson: Lesson) => {
    setEditingLessonId(lesson.id);
    setLessonGrade(lesson.grade);
    setLessonSubject(lesson.subject);
    setLessonTitle(lesson.title);
    setLessonDesc(lesson.description);
    setLessonContent(lesson.content);
    setLessonCoins(lesson.coinsReward);
    setLessonMins(lesson.estimatedMinutes || 15);
    setLessonImg(lesson.image || '');
    setLessonVideo(lesson.videoUrl || '');
    setLessonQuestions(lesson.test || []);
    setIsLessonModalOpen(true);
  };

  const handleSaveLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonTitle.trim() || !lessonContent.trim()) return;

    if (editingLessonId) {
      updateLesson({
        id: editingLessonId,
        grade: lessonGrade,
        subject: lessonSubject,
        title: lessonTitle.trim(),
        description: lessonDesc.trim(),
        content: lessonContent.trim(),
        coinsReward: Number(lessonCoins),
        estimatedMinutes: Number(lessonMins),
        image: lessonImg.trim() || undefined,
        videoUrl: lessonVideo.trim() || undefined,
        test: lessonQuestions,
      });
    } else {
      addLesson({
        grade: lessonGrade,
        subject: lessonSubject,
        title: lessonTitle.trim(),
        description: lessonDesc.trim(),
        content: lessonContent.trim(),
        coinsReward: Number(lessonCoins),
        estimatedMinutes: Number(lessonMins),
        image: lessonImg.trim() || undefined,
        videoUrl: lessonVideo.trim() || undefined,
        test: lessonQuestions,
      });
    }
    setIsLessonModalOpen(false);
  };

  // Add question to test builder
  const handleAddQuestion = () => {
    setLessonQuestions(prev => [
      ...prev,
      {
        id: `q_${Date.now()}_${prev.length + 1}`,
        question: '',
        options: ['', '', '', ''],
        correctIndex: 0,
        explanation: '',
      },
    ]);
  };

  const handleRemoveQuestion = (idx: number) => {
    setLessonQuestions(prev => prev.filter((_, i) => i !== idx));
  };

  // Shop Handlers
  const handleOpenAddShop = () => {
    setEditingShopId(null);
    setShopName('');
    setShopType('avatar');
    setShopPrice(35);
    setShopDesc('');
    setShopValue('🦁');
    setShopPreview('🦁');
    setIsShopModalOpen(true);
  };

  const handleOpenEditShop = (item: ShopItem) => {
    setEditingShopId(item.id);
    setShopName(item.name);
    setShopType(item.type);
    setShopPrice(item.price);
    setShopDesc(item.description);
    setShopValue(item.value);
    setShopPreview(item.previewUrl);
    setIsShopModalOpen(true);
  };

  const handleSaveShopItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shopName.trim()) return;

    if (editingShopId) {
      updateShopItem({
        id: editingShopId,
        name: shopName.trim(),
        type: shopType,
        price: Number(shopPrice),
        description: shopDesc.trim(),
        value: shopValue.trim(),
        previewUrl: shopPreview.trim() || shopValue.trim(),
      });
    } else {
      addShopItem({
        name: shopName.trim(),
        type: shopType,
        price: Number(shopPrice),
        description: shopDesc.trim(),
        value: shopValue.trim(),
        previewUrl: shopPreview.trim() || shopValue.trim(),
      });
    }
    setIsShopModalOpen(false);
  };

  // Password update
  const handleAdminPasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassChangeMsg('');
    if (newAdminPassword !== confirmAdminPassword) {
      setPassChangeMsg("Parollar bir-biriga mos kelmadi!");
      return;
    }
    const res = await updateAdminPassword(newAdminPassword);
    setPassChangeMsg(res.message);
    if (res.success) {
      setNewAdminPassword('');
      setConfirmAdminPassword('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Top Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-600 flex items-center justify-center text-white shadow-lg shadow-rose-600/30">
            <Shield className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black tracking-tight">Admin Boshqaruv Paneli</h1>
              <span className="bg-rose-500/30 text-rose-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Xavfsiz Hudud
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium mt-1">
              Darslar, o'quvchilar, do'kon mahsulotlari va tizim sozlamalarini to'liq boshqaring.
            </p>
          </div>
        </div>

        <button
          onClick={adminLogout}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center gap-2 border border-slate-700 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Admin rejimini yakunlash</span>
        </button>
      </div>

      {/* Admin Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('stats')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all ${
            activeTab === 'stats'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-amber-500" />
          <span>Umumiy Statistika</span>
        </button>

        <button
          onClick={() => setActiveTab('lessons')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all ${
            activeTab === 'lessons'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4 text-sky-500" />
          <span>Darslar ({lessons.length} ta)</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all ${
            activeTab === 'users'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4 text-emerald-500" />
          <span>O'quvchilar ({users.length} nafar)</span>
        </button>

        <button
          onClick={() => setActiveTab('shop')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all ${
            activeTab === 'shop'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <ShoppingBag className="w-4 h-4 text-purple-500" />
          <span>Do'kon Buyumlari ({shopItems.length} ta)</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all ${
            activeTab === 'settings'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Key className="w-4 h-4 text-rose-500" />
          <span>Parol & Sozlamalar</span>
        </button>
      </div>

      {/* 1. STATS TAB */}
      {activeTab === 'stats' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">Jami O'quvchilar</span>
                <Users className="w-5 h-5 text-sky-500" />
              </div>
              <p className="text-3xl font-black text-slate-900 tabular-nums">{users.length}</p>
              <p className="text-[11px] text-slate-400">Ro'yxatdan o'tgan o'quvchilar</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">Mavjud Darslar</span>
                <BookOpen className="w-5 h-5 text-emerald-500" />
              </div>
              <p className="text-3xl font-black text-slate-900 tabular-nums">{lessons.length}</p>
              <p className="text-[11px] text-slate-400">1–11 sinf fanlari bo'yicha</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">Aylanmadagi Tangalar</span>
                <Coins className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-3xl font-black text-amber-600 tabular-nums">{totalCoinsInCirculation} 🪙</p>
              <p className="text-[11px] text-slate-400">O'quvchilar yig'gan tangalar</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">Tugatilgan Darslar</span>
                <CheckCircle className="w-5 h-5 text-purple-500" />
              </div>
              <p className="text-3xl font-black text-purple-600 tabular-nums">{totalCompletedLessons}</p>
              <p className="text-[11px] text-slate-400">O'quvchilar tomonidan o'zlashtirilgan</p>
            </div>
          </div>

          {/* Top Students Table */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-extrabold text-base text-slate-900">
              Eng Faol O'quvchilar (Top Leaderboard)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase">
                    <th className="pb-3">O'quvchi</th>
                    <th className="pb-3">Sinfi</th>
                    <th className="pb-3">Login</th>
                    <th className="pb-3">O'zlashtirgan darslari</th>
                    <th className="pb-3 text-right">Oltin Tangalar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {[...users]
                    .sort((a, b) => b.coins - a.coins)
                    .map((u, i) => (
                      <tr key={u.id} className="hover:bg-slate-50">
                        <td className="py-3 font-bold text-slate-900 flex items-center gap-2">
                          <span className="text-sm">{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '•'}</span>
                          <span>{u.fullName}</span>
                        </td>
                        <td className="py-3">{u.grade}-sinf</td>
                        <td className="py-3 text-slate-500">@{u.username}</td>
                        <td className="py-3">{u.completedLessonIds.length} ta dars</td>
                        <td className="py-3 text-right font-black text-amber-600">{u.coins} 🪙</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. LESSONS MANAGEMENT TAB */}
      {activeTab === 'lessons' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200">
            <div>
              <h3 className="font-black text-lg text-slate-900">Darslar Ro'yxati va Nazorati</h3>
              <p className="text-xs text-slate-500">Yangi dars qo'shing, mavjud darslarni tahrirlang yoki o'chiring.</p>
            </div>
            <button
              onClick={handleOpenAddLesson}
              className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Yangi Dars Qo'shish</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase">
                  <tr>
                    <th className="py-3 px-4">Sinf</th>
                    <th className="py-3 px-4">Fan</th>
                    <th className="py-3 px-4">Dars Sarlavhasi</th>
                    <th className="py-3 px-4">Savollar</th>
                    <th className="py-3 px-4">Mukofot</th>
                    <th className="py-3 px-4 text-right">Amallar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {lessons.map(l => (
                    <tr key={l.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-amber-800">{l.grade}-sinf</td>
                      <td className="py-3 px-4 font-semibold">{l.subject}</td>
                      <td className="py-3 px-4 font-bold text-slate-900 max-w-xs truncate">{l.title}</td>
                      <td className="py-3 px-4">{l.test.length} ta savol</td>
                      <td className="py-3 px-4 font-black text-amber-600">+{l.coinsReward} 🪙</td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEditLesson(l)}
                          className="p-1.5 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors"
                          title="Tahrirlash"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Haqiqatan ham "${l.title}" darsini o'chirmoqchimisiz?`)) {
                              deleteLesson(l.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors"
                          title="O'chirish"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. USERS MANAGEMENT TAB */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-6">
          <div>
            <h3 className="font-black text-lg text-slate-900">Barcha Ro'yxatdan O'tgan O'quvchilar</h3>
            <p className="text-xs text-slate-500">O'quvchilar tangalarini boshqaring, kerak bo'lsa bloklang.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase">
                <tr>
                  <th className="py-3 px-3">Ism & Familiya</th>
                  <th className="py-3 px-3">Sinf</th>
                  <th className="py-3 px-3">Login</th>
                  <th className="py-3 px-3">Tangalar</th>
                  <th className="py-3 px-3">Tugatgan darslari</th>
                  <th className="py-3 px-3">Holati</th>
                  <th className="py-3 px-3 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-bold text-slate-900">{u.fullName}</td>
                    <td className="py-3 px-3">{u.grade}-sinf</td>
                    <td className="py-3 px-3 text-slate-500">@{u.username}</td>
                    <td className="py-3 px-3 font-black text-amber-600">{u.coins} 🪙</td>
                    <td className="py-3 px-3">{u.completedLessonIds.length} ta dars</td>
                    <td className="py-3 px-3">
                      {u.isBlocked ? (
                        <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full text-[10px] font-bold">
                          Bloklangan
                        </span>
                      ) : (
                        <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-[10px] font-bold">
                          Faol
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right space-x-1.5">
                      <button
                        onClick={() => adjustUserCoins(u.id, 50)}
                        className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold rounded-lg text-[10px] transition-colors"
                        title="+50 coin sovg'a qilish"
                      >
                        +50 🪙
                      </button>
                      <button
                        onClick={() => toggleUserBlock(u.id)}
                        className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                          u.isBlocked
                            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                            : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                        }`}
                      >
                        {u.isBlocked ? "Blokdan chiqarish" : "Bloklash"}
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Haqiqatan ham ${u.fullName} o'quvchisini o'chirmoqchimisiz?`)) {
                            deleteUser(u.id);
                          }
                        }}
                        className="p-1 rounded-lg bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-600 transition-colors"
                        title="O'chirish"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. SHOP MANAGEMENT TAB */}
      {activeTab === 'shop' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200">
            <div>
              <h3 className="font-black text-lg text-slate-900">Do'kon Mahsulotlari</h3>
              <p className="text-xs text-slate-500">Yangi avatar, ramka yoki nishon qo'shing, narxini sozlang.</p>
            </div>
            <button
              onClick={handleOpenAddShop}
              className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Yangi Mahsulot Qo'shish</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {shopItems.map(item => (
              <div key={item.id} className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded-md text-slate-600">
                    {item.type}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEditShop(item)}
                      className="p-1 rounded-md text-slate-400 hover:text-sky-600 hover:bg-slate-100"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Haqiqatan ham "${item.name}" mahsulotini o'chirmoqchimisiz?`)) {
                          deleteShopItem(item.id);
                        }
                      }}
                      className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-slate-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="h-20 bg-slate-50 rounded-xl flex items-center justify-center text-3xl">
                  {item.previewUrl.startsWith('/') ? (
                    <img src={item.previewUrl} alt={item.name} className="h-full object-contain" />
                  ) : (
                    <span>{item.previewUrl}</span>
                  )}
                </div>

                <div>
                  <h4 className="font-bold text-sm text-slate-900">{item.name}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{item.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-black text-amber-600">
                  <span>Narxi:</span>
                  <span>{item.price} 🪙</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. SETTINGS TAB */}
      {activeTab === 'settings' && (
        <div className="max-w-md bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div>
            <h3 className="font-black text-lg text-slate-900">Admin Parolini O'zgartirish</h3>
            <p className="text-xs text-slate-500">
              Admin paneliga kirish maxfiy parolini yangilang. Parol xavfsiz holda saqlanadi.
            </p>
          </div>

          {passChangeMsg && (
            <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs font-bold">
              {passChangeMsg}
            </div>
          )}

          <form onSubmit={handleAdminPasswordChange} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Yangi Maxfiy Parol
              </label>
              <input
                type="password"
                required
                value={newAdminPassword}
                onChange={e => setNewAdminPassword(e.target.value)}
                placeholder="Kamida 4 ta belgi"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-rose-400 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Yangi Parolni Qayta Kiriting
              </label>
              <input
                type="password"
                required
                value={confirmAdminPassword}
                onChange={e => setConfirmAdminPassword(e.target.value)}
                placeholder="Parolni tasdiqlang"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-rose-400 bg-slate-50/50"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors"
            >
              Parolni Saqlash
            </button>
          </form>
        </div>
      )}

      {/* LESSON ADD / EDIT MODAL */}
      {isLessonModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl p-6 shadow-2xl border border-slate-200 my-auto max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-lg text-slate-900">
                {editingLessonId ? "Darsni Tahrirlash" : "Yangi Dars Qo'shish"}
              </h3>
              <button
                onClick={() => setIsLessonModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveLesson} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Sinf (1-11)</label>
                  <select
                    value={lessonGrade}
                    onChange={e => setLessonGrade(Number(e.target.value) as GradeNumber)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-bold"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(n => (
                      <option key={n} value={n}>{n}-sinf</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Fan nomi</label>
                  <input
                    type="text"
                    required
                    value={lessonSubject}
                    onChange={e => setLessonSubject(e.target.value)}
                    placeholder="Matematika, Tarix, Fizika..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Dars Sarlavhasi</label>
                <input
                  type="text"
                  required
                  value={lessonTitle}
                  onChange={e => setLessonTitle(e.target.value)}
                  placeholder="Masalan: 1 dan 10 gacha sanash"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Qisqa tavsif</label>
                <input
                  type="text"
                  value={lessonDesc}
                  onChange={e => setLessonDesc(e.target.value)}
                  placeholder="Dars haqida 1 jumla"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mukofot tangasi</label>
                  <input
                    type="number"
                    value={lessonCoins}
                    onChange={e => setLessonCoins(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Taxminiy vaqt (daqiqa)</label>
                  <input
                    type="number"
                    value={lessonMins}
                    onChange={e => setLessonMins(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Darsning to'liq matni</label>
                <textarea
                  required
                  rows={6}
                  value={lessonContent}
                  onChange={e => setLessonContent(e.target.value)}
                  placeholder="Dars tushuntirishi, formulalar, misollar va qiziqarli faktlar..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-mono"
                />
              </div>

              {/* Test Questions Builder */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-xs text-slate-900">
                    Test Savollari ({lessonQuestions.length} ta)
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="px-3 py-1 bg-amber-100 text-amber-900 rounded-lg text-xs font-bold"
                  >
                    + Savol qo'shish
                  </button>
                </div>

                {lessonQuestions.map((q, qIndex) => (
                  <div key={q.id || qIndex} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-700">{qIndex + 1}-savol:</span>
                      {lessonQuestions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveQuestion(qIndex)}
                          className="text-rose-600 hover:text-rose-800 text-[11px]"
                        >
                          O'chirish
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Savol matni..."
                      value={q.question}
                      onChange={e => {
                        const val = e.target.value;
                        setLessonQuestions(prev =>
                          prev.map((item, idx) => idx === qIndex ? { ...item, question: val } : item)
                        );
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                    />

                    <div className="grid grid-cols-2 gap-2">
                      {q.options.map((opt, optIndex) => (
                        <div key={optIndex} className="flex items-center gap-1.5">
                          <input
                            type="radio"
                            name={`correct_${qIndex}`}
                            checked={q.correctIndex === optIndex}
                            onChange={() => {
                              setLessonQuestions(prev =>
                                prev.map((item, idx) => idx === qIndex ? { ...item, correctIndex: optIndex } : item)
                              );
                            }}
                            title="To'g'ri javob sifatida belgilash"
                          />
                          <input
                            type="text"
                            required
                            placeholder={`${String.fromCharCode(65 + optIndex)} varianti...`}
                            value={opt}
                            onChange={e => {
                              const val = e.target.value;
                              setLessonQuestions(prev =>
                                prev.map((item, idx) => {
                                  if (idx === qIndex) {
                                    const nextOpts = [...item.options];
                                    nextOpts[optIndex] = val;
                                    return { ...item, options: nextOpts };
                                  }
                                  return item;
                                })
                              );
                            }}
                            className="w-full px-2 py-1 rounded-lg border border-slate-200 bg-white text-xs"
                          />
                        </div>
                      ))}
                    </div>

                    <input
                      type="text"
                      placeholder="To'g'ri javob tushuntirishi (ixtiyoriy)..."
                      value={q.explanation}
                      onChange={e => {
                        const val = e.target.value;
                        setLessonQuestions(prev =>
                          prev.map((item, idx) => idx === qIndex ? { ...item, explanation: val } : item)
                        );
                      }}
                      className="w-full px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-[11px] text-slate-600"
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsLessonModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs rounded-xl shadow-xs"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SHOP ADD / EDIT MODAL */}
      {isShopModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-lg text-slate-900">
                {editingShopId ? "Mahsulotni Tahrirlash" : "Yangi Do'kon Mahsuloti"}
              </h3>
              <button
                onClick={() => setIsShopModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveShopItem} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nomi</label>
                <input
                  type="text"
                  required
                  value={shopName}
                  onChange={e => setShopName(e.target.value)}
                  placeholder="Masalan: Sehrgar Qahramon"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Turi</label>
                  <select
                    value={shopType}
                    onChange={e => setShopType(e.target.value as ShopItemType)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-semibold"
                  >
                    <option value="avatar">Avatar</option>
                    <option value="frame">Ramka</option>
                    <option value="theme">Fon</option>
                    <option value="badge">Nishon</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Narxi (Coin)</label>
                  <input
                    type="number"
                    required
                    value={shopPrice}
                    onChange={e => setShopPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tavsif</label>
                <input
                  type="text"
                  value={shopDesc}
                  onChange={e => setShopDesc(e.target.value)}
                  placeholder="Mahsulot haqida qisqacha ma'lumot"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Belgi / Emoji yoki Rasm URL</label>
                <input
                  type="text"
                  required
                  value={shopValue}
                  onChange={e => {
                    setShopValue(e.target.value);
                    if (!shopPreview) setShopPreview(e.target.value);
                  }}
                  placeholder="Emoji (🧙) yoki CSS sinfi / URL"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsShopModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-xl shadow-xs"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
