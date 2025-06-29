// src/app/context/ScrollContext.tsx
'use client';

import { createContext, useState, ReactNode, useContext } from 'react';

interface ScrollContextState {
  navigateToPage: (targetId: string) => void;
  setNavigateToPage: (fn: (targetId: string) => void) => void;
}

const ScrollContext = createContext<ScrollContextState | undefined>(undefined);

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
  const [navigateToPage, setNavigateToPage] = useState<(targetId: string) => void>(() => () => {
    console.warn("Navigation function not yet initialized.");
  });

  return (
    <ScrollContext.Provider value={{ navigateToPage, setNavigateToPage }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrollManager = () => {
  const context = useContext(ScrollContext);
  if (!context) throw new Error('useScrollManager must be used within a ScrollProvider');
  return context;
};
