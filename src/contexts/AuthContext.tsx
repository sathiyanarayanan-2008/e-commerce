import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider?: 'email' | 'google' | 'github';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoginOpen: boolean;
  openLogin: (mode?: 'login' | 'register' | 'forgot') => void;
  closeLogin: () => void;
  authMode: 'login' | 'register' | 'forgot';
  setAuthMode: (mode: 'login' | 'register' | 'forgot') => void;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithSocial: (provider: 'google' | 'github') => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'nexstore_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');

  const openLogin = useCallback((mode: 'login' | 'register' | 'forgot' = 'login') => {
    setAuthMode(mode);
    setIsLoginOpen(true);
  }, []);

  const closeLogin = useCallback(() => {
    setIsLoginOpen(false);
    if (window.location.hash === '#login' || window.location.hash === '#register') {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  // Listen to hash changes (e.g. #login, #register)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#login') {
        openLogin('login');
      } else if (hash === '#register') {
        openLogin('register');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [openLogin]);

  const login = async (
    email: string,
    password: string,
    rememberMe = false
  ): Promise<{ success: boolean; error?: string }> => {
    // Simulated realistic authentication with validation
    await new Promise((resolve) => setTimeout(resolve, 850));

    if (!email || !email.includes('@')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    if (!password || password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    // Demo check: disallow test failure simulation if someone tests wrong credentials
    if (password === 'wrongpassword') {
      return { success: false, error: 'Invalid email or password. Please try again.' };
    }

    const name = email.split('@')[0].replace(/[._]/g, ' ');
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

    const authenticatedUser: User = {
      id: 'usr_' + Date.now(),
      name: formattedName || 'Shopper',
      email: email.toLowerCase(),
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80`,
      provider: 'email',
    };

    setUser(authenticatedUser);

    if (rememberMe) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(authenticatedUser));
    } else {
      sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(authenticatedUser));
    }

    return { success: true };
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 900));

    if (!name || name.trim().length < 2) {
      return { success: false, error: 'Please enter your full name.' };
    }

    if (!email || !email.includes('@')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    if (!password || password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }

    const newUser: User = {
      id: 'usr_' + Date.now(),
      name: name.trim(),
      email: email.toLowerCase(),
      provider: 'email',
    };

    setUser(newUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
    return { success: true };
  };

  const loginWithSocial = async (
    provider: 'google' | 'github'
  ): Promise<{ success: boolean; error?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 750));

    const socialUser: User = {
      id: 'usr_' + provider + '_' + Date.now(),
      name: provider === 'google' ? 'Alex Rivera' : 'GitHub Developer',
      email: provider === 'google' ? 'alex.rivera@gmail.com' : 'dev@github.com',
      avatar:
        provider === 'google'
          ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
      provider,
    };

    setUser(socialUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(socialUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
    sessionStorage.removeItem(USER_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoginOpen,
        openLogin,
        closeLogin,
        authMode,
        setAuthMode,
        login,
        register,
        loginWithSocial,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
