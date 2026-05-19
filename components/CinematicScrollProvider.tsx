'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CinematicScrollContext } from '@/hooks/useCinematicScroll';

interface CinematicScrollProviderProps {
  children: React.ReactNode;
}

export default function CinematicScrollProvider({ children }: CinematicScrollProviderProps) {
  const [isScrolling, setIsScrolling] = useState(false);
  const [activeTarget, setActiveTarget] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);

  const contentRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Mouse position for custom cursor
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches || ('ontouchstart' in window));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const animateCursor = () => {
      if (cursorRef.current && ringRef.current) {
        cursorRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
        
        // Magentic ring effect with lag
        ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15;
        ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15;
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }
      requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', onMouseMove);
    const cursorAnim = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(cursorAnim);
    };
  }, [isMobile]);

  const easeInOutExpo = (t: number) => {
    return t === 0 ? 0 : t === 1 ? 1 :
      t < 0.5 
        ? Math.pow(2, 20 * t - 10) / 2
        : (2 - Math.pow(2, -20 * t + 10)) / 2;
  };

  const cinematicScrollTo = (targetY: number, duration: number = 800) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const startTime = performance.now();
    
    setIsScrolling(true);
    setShowProgress(true);
    document.documentElement.classList.add('cinematic-scrolling');

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeInOutExpo(progress);
      
      window.scrollTo(0, startY + distance * ease);
      setProgressWidth(progress * 100);

      // Parallax effect logic
      const sections = document.querySelectorAll('section');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const distFromCenter = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
        const speedFactor = distFromCenter > 500 ? 1.15 : 0.9;
        
        // Temporarily apply parallax if not too close to complete
        if (progress < 0.9) {
          (section as HTMLElement).style.transform = `translate3d(0, ${(distance * progress) * (speedFactor - 1)}px, 0)`;
        }
      });

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(step);
      } else {
        onScrollComplete();
      }
    };

    const onScrollComplete = () => {
      // Arrive Phase
      if (contentRef.current) {
        contentRef.current.classList.add('phase-arrival');
        setTimeout(() => {
          if (contentRef.current) {
            contentRef.current.classList.remove('phase-arrival', 'phase-blur');
          }
        }, 400);
      }

      // Reset parallax
      const sections = document.querySelectorAll('section');
      sections.forEach((section) => {
        (section as HTMLElement).style.transform = '';
      });

      setTimeout(() => {
        setIsScrolling(false);
        setShowProgress(false);
        setActiveTarget(null);
        document.documentElement.classList.remove('cinematic-scrolling');
      }, 500);
    };

    animationFrameRef.current = requestAnimationFrame(step);
  };

  const handleNavClick = useCallback((href: string) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const target = document.querySelector(href);
    if (!target) return;

    setActiveTarget(href);
    const targetY = target.getBoundingClientRect().top + window.scrollY;

    if (prefersReducedMotion) {
      window.scrollTo(0, targetY);
      return;
    }

    // Phase 1: Blur Out
    if (contentRef.current) {
      contentRef.current.classList.add('phase-blur');
    }

    // Wait for blur transition before starting scroll travel
    setTimeout(() => {
      cinematicScrollTo(targetY);
    }, 300);
  }, []);

  return (
    <CinematicScrollContext.Provider value={{ handleNavClick, isScrolling, activeTarget }}>
      {/* Progress Bar */}
      {showProgress && (
        <div 
          className="fixed top-0 left-0 h-1 bg-amber-500 z-[100] transition-all duration-75"
          style={{ width: `${progressWidth}%` }}
        />
      )}

      {/* Custom Cursor */}
      {!isMobile && (
        <>
          <div 
            ref={cursorRef}
            className="fixed top-0 left-0 w-3 h-3 bg-amber-500 rounded-full z-[1000] pointer-events-none mix-blend-difference -ml-1.5 -mt-1.5 opacity-0 cinematic-cursor"
          />
          <div 
            ref={ringRef}
            className="fixed top-0 left-0 w-8 h-8 border border-amber-500/40 rounded-full z-[1000] pointer-events-none -ml-4 -mt-4 opacity-0 cinematic-cursor"
          />
        </>
      )}

      <div 
        ref={contentRef} 
        className="transition-all duration-300 ease-out origin-center"
      >
        {children}
      </div>

      <style jsx global>{`
        .cinematic-scrolling .cinematic-cursor {
          opacity: 1;
        }
        
        .phase-blur {
          transform: perspective(1200px) rotateX(2deg) scale(0.97);
          filter: blur(2px);
          opacity: 0.85;
          pointer-events: none;
        }

        .phase-arrival {
          transform: perspective(1200px) translateZ(0px);
          opacity: 1;
          filter: blur(0px);
          transition: all 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .cinematic-scrolling {
          cursor: none !important;
        }

        .cinematic-scrolling * {
          cursor: none !important;
        }
      `}</style>
    </CinematicScrollContext.Provider>
  );
}
