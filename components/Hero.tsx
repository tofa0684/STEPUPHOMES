'use client';

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useCinematicScroll } from '@/hooks/useCinematicScroll';

export default function Hero() {
  const shimmerCanvasRef = useRef<HTMLCanvasElement>(null);
  const particlesCanvasRef = useRef<HTMLCanvasElement>(null);
  const { handleNavClick } = useCinematicScroll();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // --- Particle Animation Logic ---
    const pCanvas = particlesCanvasRef.current;
    if (!pCanvas) return;
    const pCtx = pCanvas.getContext('2d');
    if (!pCtx) return;

    let pAnimationId: number;
    const particles: any[] = [];
    const particleCount = 60;

    const createParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * pCanvas.width,
          y: Math.random() * pCanvas.height,
          size: Math.random() * 2 + 1, // 1-3px
          speed: Math.random() * 0.4 + 0.2, // 0.2-0.6px
          offset: Math.random() * 1000,
          color: Math.random() > 0.5 ? 'rgba(245, 166, 35, 0.6)' : 'rgba(255, 255, 255, 0.3)',
        });
      }
    };

    const animateParticles = () => {
      pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
      const time = Date.now() / 1000;

      particles.forEach((p) => {
        p.y -= p.speed;
        p.x += Math.sin(time + p.offset) * 0.3;

        // respawn at bottom
        if (p.y < -10) {
          p.y = pCanvas.height + 10;
          p.x = Math.random() * pCanvas.width;
        }

        // Fade calculation
        let alpha = 1;
        if (p.y < 100) alpha = p.y / 100; // fade at top
        if (p.y > pCanvas.height - 100) alpha = (pCanvas.height - p.y) / 100; // fade at bottom

        pCtx.globalAlpha = Math.max(0, alpha);
        pCtx.beginPath();
        pCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        pCtx.fillStyle = p.color;
        pCtx.fill();
        pCtx.globalAlpha = 1;
      });

      pAnimationId = requestAnimationFrame(animateParticles);
    };

    // --- Shimmer Animation Logic ---
    const sCanvas = shimmerCanvasRef.current;
    if (!sCanvas) return;
    const sCtx = sCanvas.getContext('2d');
    if (!sCtx) return;

    let sAnimationId: number;
    const waves: any[] = [];
    const waveCount = 10; // 8-12

    for (let i = 0; i < waveCount; i++) {
      waves.push({
        y: 0.7 + Math.random() * 0.25, // Bottom 30% area
        frequency: 0.005 + Math.random() * 0.015,
        amplitude: 3 + Math.random() * 5,
        phase: Math.random() * Math.PI * 2,
        speed: 0.005 + Math.random() * 0.01,
        opacity: 0.04 + Math.random() * 0.04,
      });
    }

    const animateShimmer = () => {
      sCtx.clearRect(0, 0, sCanvas.width, sCanvas.height);
      const width = sCanvas.width;
      const height = sCanvas.height;

      waves.forEach((w) => {
        sCtx.beginPath();
        sCtx.strokeStyle = `rgba(255, 255, 255, ${w.opacity})`;
        sCtx.lineWidth = 1;

        const centerY = height * w.y;
        for (let x = 0; x <= width; x += 5) {
          const y = centerY + Math.sin(x * w.frequency + w.phase) * w.amplitude;
          if (x === 0) sCtx.moveTo(x, y);
          else sCtx.lineTo(x, y);
        }
        sCtx.stroke();
        w.phase += w.speed;
      });

      sAnimationId = requestAnimationFrame(animateShimmer);
    };

    const handleResize = () => {
      pCanvas.width = window.innerWidth;
      pCanvas.height = window.innerHeight;
      sCanvas.width = window.innerWidth;
      sCanvas.height = window.innerHeight;
      createParticles();
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    animateParticles();
    animateShimmer();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(pAnimationId);
      cancelAnimationFrame(sAnimationId);
    };
  }, []);

  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <style jsx global>{`
        @keyframes kenburns {
          0%   { transform: scale(1)    translateX(0px); }
          50%  { transform: scale(1.08) translateX(-20px); }
          100% { transform: scale(1)    translateX(0px); }
        }
        @keyframes vignette-pulse {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 0.55; }
        }
        .hero-bg-anim {
          animation: kenburns 20s ease-in-out infinite;
        }
        .hero-vignette {
          background: radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%);
          animation: vignette-pulse 8s ease-in-out infinite;
        }
      `}</style>
      
      {/* Background Layer (Z-0) */}
      <div className="absolute inset-0 z-0 hero-bg-anim">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2675&auto=format&fit=crop"
          alt="Luxury Mansion"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          suppressHydrationWarning
        />
      </div>

      {/* Water Shimmer Canvas (Z-1) */}
      <canvas 
        ref={shimmerCanvasRef}
        className="absolute inset-0 z-[1] pointer-events-none"
      />

      {/* Particle Canvas (Z-2) */}
      <canvas 
        ref={particlesCanvasRef}
        className="absolute inset-0 z-[2] pointer-events-none"
      />

      {/* Gradient Overlays (Z-10) */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-zinc-950/40 to-zinc-950 xl:to-zinc-950/90 z-10" />
      
      {/* Vignette Pulse (Z-11) */}
      <div className="absolute inset-0 hero-vignette z-11 pointer-events-none" />

      {/* Content (Z-20) */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full text-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="inline-block mb-6 px-4 py-1.5 border border-amber-500/30 bg-black/30 backdrop-blur-sm rounded-full"
        >
          <span className="text-amber-500 text-xs md:text-sm font-medium tracking-[0.2em] uppercase">Premium Ethiopian Real Estate</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-heading font-medium text-white mb-6 leading-tight drop-shadow-2xl"
        >
          Elevating Your <br className="hidden md:block" /> Standard of <span className="text-amber-500 italic">Living</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto mb-10 font-light"
        >
          Exclusive access to the most coveted luxury properties, off-plan investments, and high-yield real estate in Addis Ababa and beyond.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            onClick={() => handleNavClick('#contact')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-8 py-4 bg-amber-500 text-black font-semibold tracking-wide uppercase text-sm flex items-center justify-center gap-2 hover:bg-amber-400 transition-colors cursor-pointer"
          >
            Book Consultation
            <ArrowRight size={18} />
          </motion.button>
          <motion.button
            onClick={() => handleNavClick('#properties')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-8 py-4 bg-zinc-900/80 backdrop-blur-md border border-zinc-700 text-white font-semibold tracking-wide uppercase text-sm hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            View Listings
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator (Z-20) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-zinc-500 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-amber-500 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}

