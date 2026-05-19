'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Building2, Inbox, UserCog, LogOut, Menu, X } from 'lucide-react';
import Image from 'next/image';
import logo from '@/src/assets/images/regenerated_image_1778775984943.png';
import { useState } from 'react';
import { signOut } from '../actions';
import { motion, AnimatePresence } from 'motion/react';

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Listings', href: '/admin/listings', icon: Building2 },
  { name: 'Inquiries', href: '/admin/inquiries', icon: Inbox },
  { name: 'Profile & Settings', href: '/admin/settings', icon: UserCog },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Don't show sidebar on login page
  if (pathname === '/admin/login') return null;

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-zinc-900 border-r border-zinc-800 w-64">
      <div className="p-6 border-b border-zinc-800 flex justify-center">
        <Link href="/">
          <Image 
            src={logo} 
            alt="StepUpHomes" 
            width={120} 
            height={60} 
            className="w-auto h-12 object-contain"
            priority
          />
        </Link>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium text-sm tracking-wide">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-zinc-800">
        <form action={signOut}>
          <button
            type="submit"
            className="flex items-center gap-3 w-full px-4 py-3 text-zinc-400 hover:text-red-400 hover:bg-zinc-800/50 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium text-sm tracking-wide">Sign Out</span>
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden md:block h-full">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-40 md:hidden flex"
          >
            <SidebarContent />
            <div 
              className="flex-1 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
