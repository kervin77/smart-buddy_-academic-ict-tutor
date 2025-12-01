import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserSettings, Unit } from '../types';
import { CURRICULUM } from '../constants';

interface AppContextType {
  settings: UserSettings;
  units: Unit[];
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  unlockNextUnit: (currentUnitId: number) => void;
  resetProgress: () => void;
}

const defaultSettings: UserSettings = {
  name: '',
  voice: 'FEMALE',
  hasOnboarded: false,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem('sb_settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const [units, setUnits] = useState<Unit[]>(() => {
    const saved = localStorage.getItem('sb_units');
    return saved ? JSON.parse(saved) : CURRICULUM;
  });

  useEffect(() => {
    localStorage.setItem('sb_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('sb_units', JSON.stringify(units));
  }, [units]);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const unlockNextUnit = (currentUnitId: number) => {
    setUnits(prev => prev.map(u => {
      if (u.id === currentUnitId) return { ...u, mastered: true };
      return u;
    }));
  };

  const resetProgress = () => {
    setUnits(CURRICULUM);
    setSettings(defaultSettings);
    localStorage.clear();
  };

  return (
    <AppContext.Provider value={{ settings, units, updateSettings, unlockNextUnit, resetProgress }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
