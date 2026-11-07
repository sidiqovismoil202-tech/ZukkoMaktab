export type GradeNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export interface TestQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  grade: GradeNumber;
  subject: string;
  title: string;
  description: string;
  content: string;
  image?: string;
  videoUrl?: string;
  coinsReward: number;
  test: TestQuestion[];
  estimatedMinutes?: number;
}

export type ShopItemType = 'avatar' | 'frame' | 'theme' | 'badge';

export interface ShopItem {
  id: string;
  name: string;
  type: ShopItemType;
  price: number;
  description: string;
  previewUrl: string;
  value: string; // CSS style or avatar asset key
  unlockedByDefault?: boolean;
}

export interface UserInventory {
  avatars: string[];
  frames: string[];
  themes: string[];
  badges: string[];
}

export interface User {
  id: string;
  fullName: string;
  grade: GradeNumber;
  username: string;
  passwordHash: string;
  coins: number;
  completedLessonIds: string[];
  lessonScores: Record<string, number>; // lessonId -> score percentage
  inventory: UserInventory;
  activeAvatar: string;
  activeFrame: string;
  activeTheme: string;
  activeBadge: string;
  isBlocked: boolean;
  createdAt: string;
}

export interface LeaderboardUser {
  id: string;
  fullName: string;
  grade: GradeNumber;
  coins: number;
  completedCount: number;
  avatar: string;
  badge: string;
}

export type ActiveNavTab = 'home' | 'lessons' | 'games' | 'shop' | 'profile' | 'admin';
