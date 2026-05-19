'use client';

import { createContext, useContext } from 'react';

interface CinematicScrollContextType {
  handleNavClick: (href: string) => void;
  isScrolling: boolean;
  activeTarget: string | null;
}

export const CinematicScrollContext = createContext<CinematicScrollContextType | null>(null);

export function useCinematicScroll() {
  const context = useContext(CinematicScrollContext);
  if (!context) {
    throw new Error('useCinematicScroll must be used within a CinematicScrollProvider');
  }
  return context;
}
