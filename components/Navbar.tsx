'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import logo from '@/src/assets/images/regenerated_image_1778775984943.png';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Properties', href: '#properties' },
  { name: 'Why Me', href: '#why-me' },
  { name: 'Contact', href: '#contact' },
];

import { useCinematicScroll } from '@/hooks/useCinematicScroll';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { handleNavClick, activeTarget, isScrolling } = useCinematicScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-zinc-950/80 backdrop-blur-md border-zinc-800/50 py-4 shadow-2xl shadow-black/50'
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <motion.button 
          onClick={() => handleNavClick('#home')}
          className="flex items-center group transition-transform duration-300 hover:scale-105 active:scale-95"
          whileHover={{ y: -2 }}
        >
          <Image 
            src={logo} 
            alt="Step-Up Homes Logo" 
            width={150} 
            height={100} 
            className="w-[150px] h-[100px] object-contain drop-shadow-[0_0_8px_rgba(245,158,11,0.3)] transition-all group-hover:drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]"
            priority
          />
        </motion.button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeTarget === link.href;
            return (
              <motion.button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                animate={isActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                transition={{ duration: 0.2 }}
                className={`text-sm transition-colors uppercase tracking-widest font-medium ${
                  isActive || (activeTarget === null && !isScrolling) ? 'hover:text-amber-500' : ''
                } ${isActive ? 'text-amber-500' : 'text-zinc-300'}`}
              >
                {link.name}
              </motion.button>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-zinc-50 hover:text-amber-500 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-900 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-8 gap-6">
              {navLinks.map((link) => {
                const isActive = activeTarget === link.href;
                return (
                  <button
                    key={link.name}
                    onClick={() => {
                      handleNavClick(link.href);
                      setMobileMenuOpen(false);
                    }}
                    className={`text-lg text-left transition-colors font-heading tracking-wider ${
                      isActive ? 'text-amber-500' : 'text-zinc-300'
                    }`}
                  >
                    {link.name}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
