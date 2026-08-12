import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, UserPreferences } from '../types';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  login: (email: string, role: UserRole) => void;
  logout: () => void;
  toggleRole: () => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
}

const DEFAULT_USER: User = {
  id: 'u-demo-1',
  name: 'Rahul Sharma',
  email: 'user@dostai.demo',
  role: 'USER',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  preferences: {
    maxDistanceKm: 5,
    budgetLimit: 2000,
    preferredCrowd: 'Low',
    favoriteCategories: ['Cinemas', 'Restaurants', 'Parking'],
    notificationsEnabled: true,
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('dostai_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  const [role, setRole] = useState<UserRole>(() => {
    return user ? user.role : 'USER';
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('dostai_user', JSON.stringify(user));
      setRole(user.role);
    } else {
      localStorage.removeItem('dostai_user');
    }
  }, [user]);

  const login = (email: string, userRole: UserRole) => {
    const newUser: User = {
      id: userRole === 'BUSINESS' ? 'b-owner-1' : 'u-demo-1',
      name: userRole === 'BUSINESS' ? 'City Mall Manager' : 'Rahul Sharma',
      email: email,
      role: userRole,
      avatar: userRole === 'BUSINESS' 
        ? 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      preferences: DEFAULT_USER.preferences,
    };
    setUser(newUser);
    setRole(userRole);
  };

  const logout = () => {
    setUser(null);
  };

  const toggleRole = () => {
    const newRole: UserRole = role === 'USER' ? 'BUSINESS' : 'USER';
    if (user) {
      const updated = {
        ...user,
        role: newRole,
        name: newRole === 'BUSINESS' ? 'City Mall Manager' : 'Rahul Sharma',
        email: newRole === 'BUSINESS' ? 'business@dostai.demo' : 'user@dostai.demo',
      };
      setUser(updated);
      setRole(newRole);
    } else {
      login(newRole === 'BUSINESS' ? 'business@dostai.demo' : 'user@dostai.demo', newRole);
    }
  };

  const updatePreferences = (prefs: Partial<UserPreferences>) => {
    if (user) {
      setUser({
        ...user,
        preferences: {
          ...user.preferences,
          ...prefs,
        },
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: !!user,
        login,
        logout,
        toggleRole,
        updatePreferences,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
