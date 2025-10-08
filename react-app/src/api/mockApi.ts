// Моковые API функции для демонстрации асинхронных действий

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export interface Settings {
  theme: string;
  language: string;
  notifications: boolean;
}

// Симуляция задержки сети
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Моковые пользователи
const mockUsers: User[] = [
  { id: 1, name: 'Ілля Петренко', email: 'wandershlepa@gmail.com', role: 'Розробник', avatar: '👨‍💻' },
  { id: 2, name: 'Анна Іваненко', email: 'anna@example.com', role: 'Дизайнер', avatar: '👩‍🎨' },
  { id: 3, name: 'Олексій Шевченко', email: 'oleksiy@example.com', role: 'Менеджер', avatar: '👨‍💼' },
  { id: 4, name: 'Марія Коваленко', email: 'maria@example.com', role: 'Тестер', avatar: '👩‍💻' }
];

// API для пользователей
export const userApi = {
  // Получить всех пользователей
  getUsers: async (): Promise<User[]> => {
    await delay(1000); // Симуляция загрузки
    return [...mockUsers];
  },

  // Получить пользователя по ID
  getUserById: async (id: number): Promise<User | null> => {
    await delay(500);
    return mockUsers.find(user => user.id === id) || null;
  },

  // Создать нового пользователя
  createUser: async (userData: Omit<User, 'id'>): Promise<User> => {
    await delay(800);
    const newUser: User = {
      ...userData,
      id: Math.max(...mockUsers.map(u => u.id)) + 1
    };
    mockUsers.push(newUser);
    return newUser;
  },

  // Обновить пользователя
  updateUser: async (id: number, updates: Partial<User>): Promise<User> => {
    await delay(600);
    const userIndex = mockUsers.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates };
    return mockUsers[userIndex];
  },

  // Удалить пользователя
  deleteUser: async (id: number): Promise<boolean> => {
    await delay(400);
    const userIndex = mockUsers.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    mockUsers.splice(userIndex, 1);
    return true;
  }
};

// API для настроек
export const settingsApi = {
  // Получить настройки
  getSettings: async (): Promise<Settings> => {
    await delay(300);
    return {
      theme: 'dark',
      language: 'uk',
      notifications: true
    };
  },

  // Сохранить настройки
  saveSettings: async (settings: Settings): Promise<Settings> => {
    await delay(500);
    // В реальном приложении здесь был бы запрос к серверу
    console.log('Settings saved:', settings);
    return settings;
  },

  // Синхронизировать настройки с сервером
  syncSettings: async (): Promise<Settings> => {
    await delay(1000);
    // Симуляция получения настроек с сервера
    return {
      theme: 'light',
      language: 'en',
      notifications: false
    };
  }
};

// API для статистики
export const statsApi = {
  // Получить статистику
  getStats: async () => {
    await delay(1200);
    return {
      totalUsers: mockUsers.length,
      activeUsers: mockUsers.length - 1,
      newUsersToday: Math.floor(Math.random() * 5),
      lastActivity: new Date().toISOString()
    };
  }
};
