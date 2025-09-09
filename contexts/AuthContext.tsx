'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'wiggslaw'
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if user is already logged in (from localStorage)
    // Only run on client side
    if (typeof window !== 'undefined') {
      const authStatus = localStorage.getItem('admin_auth');
      if (authStatus === 'true') {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    }
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <AuthContext.Provider value={{ isAuthenticated: false, isLoading: true, login: () => false, logout: () => {} }}>
        {children}
      </AuthContext.Provider>
    );
  }

  const login = (username: string, password: string): boolean => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

