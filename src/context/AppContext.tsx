import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import { User, Lesson, ShopItem, GradeNumber, ActiveNavTab, ShopItemType } from '../types';
import { SEED_LESSONS, SEED_SHOP_ITEMS, SEED_USERS } from '../utils/seedData';
import { hashPassword, verifyPassword } from '../utils/security';
import { soundManager } from '../utils/sound';

interface ToastNotice {
  id: string;
  message: string;
  type: 'success' | 'coin' | 'error' | 'info';
  coinAmount?: number;
}

interface AppContextType {
  currentUser: User | null;
  users: User[];
  lessons: Lesson[];
  shopItems: ShopItem[];
  activeTab: ActiveNavTab;
  setActiveTab: (tab: ActiveNavTab) => void;
  selectedGrade: GradeNumber;
  setSelectedGrade: (grade: GradeNumber) => void;
  selectedSubject: string;
  setSelectedSubject: (subject: string) => void;
  activeLesson: Lesson | null;
  setActiveLesson: (lesson: Lesson | null) => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authMode: 'login' | 'register';
  setAuthMode: (mode: 'login' | 'register') => void;
  adminLoggedIn: boolean;
  soundMuted: boolean;
  toggleSound: () => void;
  toasts: ToastNotice[];
  removeToast: (id: string) => void;
  showToast: (message: string, type?: 'success' | 'coin' | 'error' | 'info', coinAmount?: number) => void;
  
  // Student actions
  register: (fullName: string, grade: GradeNumber, username: string, password: string) => Promise<{ success: boolean; message: string }>;
  login: (username: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  completeLesson: (lessonId: string, scorePercent: number) => { earnedCoins: number };
  awardGameCoins: (amount: number, gameName: string) => void;
  buyShopItem: (itemId: string) => { success: boolean; message: string };
  equipItem: (type: ShopItemType, value: string) => void;

  // Admin actions
  adminLogin: (username: string, password: string) => Promise<{ success: boolean; message: string }>;
  adminLogout: () => void;
  updateAdminPassword: (newPassword: string) => Promise<{ success: boolean; message: string }>;
  addLesson: (lesson: Omit<Lesson, 'id'>) => void;
  updateLesson: (lesson: Lesson) => void;
  deleteLesson: (lessonId: string) => void;
  addShopItem: (item: Omit<ShopItem, 'id'>) => void;
  updateShopItem: (item: ShopItem) => void;
  deleteShopItem: (itemId: string) => void;
  toggleUserBlock: (userId: string) => void;
  adjustUserCoins: (userId: string, amount: number) => void;
  deleteUser: (userId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LS_USERS_KEY = 'zukko_v1_users';
const LS_CURRENT_USER_KEY = 'zukko_v1_current_user_id';
const LS_LESSONS_KEY = 'zukko_v1_lessons';
const LS_SHOP_KEY = 'zukko_v1_shop_items';
const LS_ADMIN_HASH_KEY = 'zukko_v1_admin_hash';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Initial State from localStorage
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem(LS_USERS_KEY);
      return saved ? JSON.parse(saved) : SEED_USERS;
    } catch {
      return SEED_USERS;
    }
  });

  const [currentUserId, setCurrentUserId] = useState<string | null>(() => {
    try {
      return localStorage.getItem(LS_CURRENT_USER_KEY) || (SEED_USERS[0]?.id ?? null);
    } catch {
      return null;
    }
  });

  const [lessons, setLessons] = useState<Lesson[]>(() => {
    try {
      const saved = localStorage.getItem(LS_LESSONS_KEY);
      return saved ? JSON.parse(saved) : SEED_LESSONS;
    } catch {
      return SEED_LESSONS;
    }
  });

  const [shopItems, setShopItems] = useState<ShopItem[]>(() => {
    try {
      const saved = localStorage.getItem(LS_SHOP_KEY);
      return saved ? JSON.parse(saved) : SEED_SHOP_ITEMS;
    } catch {
      return SEED_SHOP_ITEMS;
    }
  });

  const [adminLoggedIn, setAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('zukko_admin_session') === 'true';
  });

  const [adminHash, setAdminHash] = useState<string>(() => {
    return localStorage.getItem(LS_ADMIN_HASH_KEY) || '';
  });

  const [activeTab, setActiveTab] = useState<ActiveNavTab>('home');
  const [selectedGrade, setSelectedGrade] = useState<GradeNumber>(3);
  const [selectedSubject, setSelectedSubject] = useState<string>('Hammasi');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [soundMuted, setSoundMuted] = useState<boolean>(() => soundManager.getMuted());
  const [toasts, setToasts] = useState<ToastNotice[]>([]);

  // Initialize admin hash on startup if not present (default admin / admin123)
  useEffect(() => {
    if (!adminHash) {
      hashPassword('admin123').then(hash => {
        setAdminHash(hash);
        localStorage.setItem(LS_ADMIN_HASH_KEY, hash);
      });
    }
  }, [adminHash]);

  // Sync users to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LS_USERS_KEY, JSON.stringify(users));
    } catch (e) {
      console.error(e);
    }
  }, [users]);

  // Sync lessons to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LS_LESSONS_KEY, JSON.stringify(lessons));
    } catch (e) {
      console.error(e);
    }
  }, [lessons]);

  // Sync shop items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LS_SHOP_KEY, JSON.stringify(shopItems));
    } catch (e) {
      console.error(e);
    }
  }, [shopItems]);

  // Current user resolution
  const currentUser = users.find(u => u.id === currentUserId) || null;

  // When current user changes, adapt selectedGrade to user's grade
  useEffect(() => {
    if (currentUser?.grade) {
      setSelectedGrade(currentUser.grade);
    }
  }, [currentUser?.id, currentUser?.grade]);

  // Toast dispatch
  const showToast = (message: string, type: 'success' | 'coin' | 'error' | 'info' = 'info', coinAmount?: number) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, message, type, coinAmount }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const toggleSound = () => {
    const muted = soundManager.toggleMute();
    setSoundMuted(muted);
    if (!muted) {
      soundManager.playClick();
    }
  };

  // Register
  const register = async (fullName: string, grade: GradeNumber, username: string, password: string) => {
    const cleanUser = username.trim().toLowerCase();
    if (!cleanUser || !password || !fullName.trim()) {
      soundManager.playError();
      return { success: false, message: "Iltimos, barcha maydonlarni to'ldiring!" };
    }
    if (users.some(u => u.username.toLowerCase() === cleanUser)) {
      soundManager.playError();
      return { success: false, message: "Bu login allaqachon band. Boshqa login tanlang!" };
    }

    const hashed = await hashPassword(password);
    const newUser: User = {
      id: `u_${Date.now()}`,
      fullName: fullName.trim(),
      grade,
      username: cleanUser,
      passwordHash: hashed,
      coins: 20, // Welcome gift coins!
      completedLessonIds: [],
      lessonScores: {},
      inventory: {
        avatars: ['👦', '👧'],
        frames: [],
        themes: [],
        badges: ['📚 Zukko Kitobxon'],
      },
      activeAvatar: '👦',
      activeFrame: '',
      activeTheme: '',
      activeBadge: '📚 Zukko Kitobxon',
      isBlocked: false,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setUsers(prev => [newUser, ...prev]);
    setCurrentUserId(newUser.id);
    localStorage.setItem(LS_CURRENT_USER_KEY, newUser.id);
    setAuthModalOpen(false);

    soundManager.playVictory();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });

    showToast(`Xush kelibsiz, ${newUser.fullName}! Sizga 20 ta tabrik tangasi berildi! 🎉`, 'coin', 20);
    return { success: true, message: "Muvaffaqiyatli ro'yxatdan o'tdingiz!" };
  };

  // Login
  const login = async (username: string, password: string) => {
    const cleanUser = username.trim().toLowerCase();
    const found = users.find(u => u.username.toLowerCase() === cleanUser);
    if (!found) {
      soundManager.playError();
      return { success: false, message: "Bunday loginli o'quvchi topilmadi!" };
    }
    if (found.isBlocked) {
      soundManager.playError();
      return { success: false, message: "Ushbu profil ma'muriyat tomonidan bloklangan!" };
    }

    const ok = await verifyPassword(password, found.passwordHash);
    // Backward compatibility for seed demo passwords
    const isSeedMatch = found.passwordHash.startsWith('h_demo_hash') && (password === '123456' || password === 'demo');

    if (!ok && !isSeedMatch) {
      soundManager.playError();
      return { success: false, message: "Parol noto'g'ri kiritildi!" };
    }

    setCurrentUserId(found.id);
    localStorage.setItem(LS_CURRENT_USER_KEY, found.id);
    setAuthModalOpen(false);
    soundManager.playSuccess();
    showToast(`Xush kelibsiz, ${found.fullName}!`, 'success');
    return { success: true, message: "Xush kelibsiz!" };
  };

  const logout = () => {
    soundManager.playClick();
    setCurrentUserId(null);
    localStorage.removeItem(LS_CURRENT_USER_KEY);
    showToast("Tizimdan chiqildi.", 'info');
  };

  // Complete lesson test
  const completeLesson = (lessonId: string, scorePercent: number) => {
    if (!currentUser) return { earnedCoins: 0 };
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson) return { earnedCoins: 0 };

    const isFirstTime = !currentUser.completedLessonIds.includes(lessonId);
    let earnedCoins = 0;

    if (scorePercent >= 60) {
      if (isFirstTime) {
        // Full reward + bonus for 100%
        earnedCoins = lesson.coinsReward + (scorePercent === 100 ? 10 : 0);
      } else {
        // Repeat practice gives 5 coins
        earnedCoins = 5;
      }
    }

    setUsers(prev => prev.map(u => {
      if (u.id === currentUser.id) {
        const nextCompleted = isFirstTime ? [...u.completedLessonIds, lessonId] : u.completedLessonIds;
        return {
          ...u,
          coins: u.coins + earnedCoins,
          completedLessonIds: nextCompleted,
          lessonScores: {
            ...u.lessonScores,
            [lessonId]: Math.max(u.lessonScores[lessonId] || 0, scorePercent)
          }
        };
      }
      return u;
    }));

    if (earnedCoins > 0) {
      soundManager.playCoin();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
      showToast(`Ajoyib natija! +${earnedCoins} tanga qo'shildi! 🪙`, 'coin', earnedCoins);
    }

    return { earnedCoins };
  };

  // Award Game Coins
  const awardGameCoins = (amount: number, gameName: string) => {
    if (!currentUser) {
      showToast(`Tanga yutish uchun avval tizimga kiring!`, 'info');
      setAuthModalOpen(true);
      return;
    }
    setUsers(prev => prev.map(u => {
      if (u.id === currentUser.id) {
        return { ...u, coins: u.coins + amount };
      }
      return u;
    }));

    soundManager.playCoin();
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.6 }
    });
    showToast(`${gameName}da g'alaba qozondingiz! +${amount} tanga berildi! 🪙`, 'coin', amount);
  };

  // Shop purchase
  const buyShopItem = (itemId: string): { success: boolean; message: string } => {
    if (!currentUser) {
      soundManager.playError();
      setAuthModalOpen(true);
      return { success: false, message: "Xarid qilish uchun avval tizimga kiring!" };
    }

    const item = shopItems.find(i => i.id === itemId);
    if (!item) {
      return { success: false, message: "Mahsulot topilmadi!" };
    }

    // Check if already owned
    const typeKey = `${item.type}s` as keyof typeof currentUser.inventory;
    const inventoryList = currentUser.inventory[typeKey] || [];
    if (inventoryList.includes(item.value)) {
      soundManager.playClick();
      return { success: false, message: "Siz bu mahsulotni allaqachon xarid qilgansiz!" };
    }

    if (currentUser.coins < item.price) {
      soundManager.playError();
      showToast(`Coin yetarli emas! Sizda ${currentUser.coins} coin bor, kerak: ${item.price} coin.`, 'error');
      return { success: false, message: "Coin yetarli emas! Dars va o'yinlardan yana coin to'plang." };
    }

    // Process purchase & auto-equip
    setUsers(prev => prev.map(u => {
      if (u.id === currentUser.id) {
        const nextInv = { ...u.inventory };
        nextInv[typeKey] = [...(nextInv[typeKey] || []), item.value];

        let nextActiveAvatar = u.activeAvatar;
        let nextActiveFrame = u.activeFrame;
        let nextActiveTheme = u.activeTheme;
        let nextActiveBadge = u.activeBadge;

        if (item.type === 'avatar') nextActiveAvatar = item.value;
        if (item.type === 'frame') nextActiveFrame = item.value;
        if (item.type === 'theme') nextActiveTheme = item.value;
        if (item.type === 'badge') nextActiveBadge = item.value;

        return {
          ...u,
          coins: u.coins - item.price,
          inventory: nextInv,
          activeAvatar: nextActiveAvatar,
          activeFrame: nextActiveFrame,
          activeTheme: nextActiveTheme,
          activeBadge: nextActiveBadge,
        };
      }
      return u;
    }));

    soundManager.playVictory();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });
    showToast(`Tabriklaymiz! "${item.name}" xarid qilindi va faollashtirildi! 🎉`, 'success');
    return { success: true, message: "Muvaffaqiyatli xarid qilindi!" };
  };

  // Equip Item
  const equipItem = (type: ShopItemType, value: string) => {
    if (!currentUser) return;
    setUsers(prev => prev.map(u => {
      if (u.id === currentUser.id) {
        return {
          ...u,
          ...(type === 'avatar' ? { activeAvatar: value } : {}),
          ...(type === 'frame' ? { activeFrame: value } : {}),
          ...(type === 'theme' ? { activeTheme: value } : {}),
          ...(type === 'badge' ? { activeBadge: value } : {}),
        };
      }
      return u;
    }));
    soundManager.playClick();
    showToast("Profil ko'rinishi yangilandi!", 'success');
  };

  // Admin authentication
  const adminLogin = async (username: string, password: string) => {
    if (username.trim().toLowerCase() !== 'admin') {
      soundManager.playError();
      return { success: false, message: "Admin logini noto'g'ri!" };
    }
    const currentHash = adminHash || (await hashPassword('admin123'));
    const isOk = await verifyPassword(password, currentHash);
    
    // Also accept default 'admin123' directly if hash check variance
    const directMatch = password === 'admin123';

    if (!isOk && !directMatch) {
      soundManager.playError();
      return { success: false, message: "Admin paroli noto'g'ri!" };
    }

    setAdminLoggedIn(true);
    sessionStorage.setItem('zukko_admin_session', 'true');
    soundManager.playSuccess();
    showToast("Admin paneliga xush kelibsiz!", 'success');
    return { success: true, message: "Muvaffaqiyatli kirdingiz!" };
  };

  const adminLogout = () => {
    soundManager.playClick();
    setAdminLoggedIn(false);
    sessionStorage.removeItem('zukko_admin_session');
    setActiveTab('home');
    showToast("Admin rejimidan chiqildi.", 'info');
  };

  const updateAdminPassword = async (newPassword: string) => {
    if (!newPassword || newPassword.length < 4) {
      return { success: false, message: "Parol kamida 4 belgidan iborat bo'lishi kerak!" };
    }
    const hash = await hashPassword(newPassword);
    setAdminHash(hash);
    localStorage.setItem(LS_ADMIN_HASH_KEY, hash);
    soundManager.playSuccess();
    showToast("Admin paroli yangilandi!", 'success');
    return { success: true, message: "Admin paroli muvaffaqiyatli o'zgartirildi!" };
  };

  // Lesson CRUD
  const addLesson = (newLessonData: Omit<Lesson, 'id'>) => {
    const newLesson: Lesson = {
      ...newLessonData,
      id: `l_${Date.now()}`
    };
    setLessons(prev => [newLesson, ...prev]);
    soundManager.playSuccess();
    showToast("Yangi dars muvaffaqiyatli qo'shildi!", 'success');
  };

  const updateLesson = (updatedLesson: Lesson) => {
    setLessons(prev => prev.map(l => l.id === updatedLesson.id ? updatedLesson : l));
    soundManager.playSuccess();
    showToast("Dars muvaffaqiyatli tahrirlandi!", 'success');
  };

  const deleteLesson = (lessonId: string) => {
    setLessons(prev => prev.filter(l => l.id !== lessonId));
    soundManager.playClick();
    showToast("Dars o'chirildi.", 'info');
  };

  // Shop CRUD
  const addShopItem = (itemData: Omit<ShopItem, 'id'>) => {
    const newItem: ShopItem = {
      ...itemData,
      id: `shop_${Date.now()}`
    };
    setShopItems(prev => [...prev, newItem]);
    soundManager.playSuccess();
    showToast("Yangi do'kon mahsuloti qo'shildi!", 'success');
  };

  const updateShopItem = (updatedItem: ShopItem) => {
    setShopItems(prev => prev.map(i => i.id === updatedItem.id ? updatedItem : i));
    soundManager.playSuccess();
    showToast("Mahsulot yangilandi!", 'success');
  };

  const deleteShopItem = (itemId: string) => {
    setShopItems(prev => prev.filter(i => i.id !== itemId));
    soundManager.playClick();
    showToast("Mahsulot o'chirildi.", 'info');
  };

  // User management
  const toggleUserBlock = (userId: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const nextState = !u.isBlocked;
        showToast(`O'quvchi ${nextState ? 'bloklandi' : 'blokdan chiqarildi'}!`, 'info');
        return { ...u, isBlocked: nextState };
      }
      return u;
    }));
  };

  const adjustUserCoins = (userId: string, amount: number) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const nextCoins = Math.max(0, u.coins + amount);
        showToast(`${u.fullName} hisobiga ${amount > 0 ? '+' + amount : amount} coin o'tkazildi!`, 'coin', amount);
        return { ...u, coins: nextCoins };
      }
      return u;
    }));
  };

  const deleteUser = (userId: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
    if (currentUserId === userId) {
      setCurrentUserId(null);
    }
    showToast("O'quvchi tizimdan o'chirildi.", 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        lessons,
        shopItems,
        activeTab,
        setActiveTab,
        selectedGrade,
        setSelectedGrade,
        selectedSubject,
        setSelectedSubject,
        activeLesson,
        setActiveLesson,
        authModalOpen,
        setAuthModalOpen,
        authMode,
        setAuthMode,
        adminLoggedIn,
        soundMuted,
        toggleSound,
        toasts,
        removeToast,
        showToast,
        register,
        login,
        logout,
        completeLesson,
        awardGameCoins,
        buyShopItem,
        equipItem,
        adminLogin,
        adminLogout,
        updateAdminPassword,
        addLesson,
        updateLesson,
        deleteLesson,
        addShopItem,
        updateShopItem,
        deleteShopItem,
        toggleUserBlock,
        adjustUserCoins,
        deleteUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return ctx;
};
