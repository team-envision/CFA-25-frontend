// src/app/context/ScrollContext.tsx
'use client';

import { createContext, useState, ReactNode, useContext } from 'react';

type AnimationDirection = "forward" | "backward";

interface ScrollContextState {
  navigateToPage: (targetId: string) => void;
  setNavigateToPage: (fn: (targetId: string) => void) => void;
  // --- ADD THESE ---
  animationDirection: AnimationDirection;
  setAnimationDirection: (direction: AnimationDirection) => void;
}

const ScrollContext = createContext<ScrollContextState | undefined>(undefined);

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
  const [navigateToPage, setNavigateToPage] = useState<(targetId: string) => void>(() => () => console.warn("Nav function not initialized."));
  // --- ADD THIS STATE ---
  const [animationDirection, setAnimationDirection] = useState<AnimationDirection>("forward");

  return (
    <ScrollContext.Provider value={{ 
      navigateToPage, 
      setNavigateToPage,
      // --- PROVIDE THE NEW STATE AND SETTER ---
      animationDirection,
      setAnimationDirection
    }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrollManager = () => {
  const context = useContext(ScrollContext);
  if (!context) throw new Error('useScrollManager must be used within a ScrollProvider');
  return context;
};
