import { Instagram, Linkedin, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/src/assets/images/regenerated_image_1778775984943.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black py-12 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Brand */}
        <div className="flex items-center">
          <Image 
            src={logo} 
            alt="Step-Up Homes Logo" 
            width={150} 
            height={50} 
            className="h-10 w-auto object-contain brightness-90 hover:brightness-100 transition-all"
          />
        </div>

        {/* Links */}
        <div className="flex gap-8 text-sm uppercase tracking-widest text-zinc-500 font-medium">
           <a href="#about" className="hover:text-amber-500 transition-colors">About</a>
           <a href="#properties" className="hover:text-amber-500 transition-colors">Listings</a>
           <a href="#contact" className="hover:text-amber-500 transition-colors">Contact</a>
        </div>

        {/* Social */}
        <div className="flex gap-4">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 border border-zinc-800 text-zinc-400 hover:text-amber-500 hover:border-amber-500 transition-all rounded-full bg-zinc-950">
            <Instagram size={18} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 border border-zinc-800 text-zinc-400 hover:text-amber-500 hover:border-amber-500 transition-all rounded-full bg-zinc-950">
            <Linkedin size={18} />
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="p-2 border border-zinc-800 text-zinc-400 hover:text-amber-500 hover:border-amber-500 transition-all rounded-full bg-zinc-950">
            <Twitter size={18} />
          </a>
        </div>
        
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 pt-8 border-t border-zinc-900 text-center md:text-left flex flex-col md:flex-row justify-between text-xs text-zinc-600 font-light tracking-wide">
        <p>&copy; {currentYear} Tekle Yohannes Luxury Real Estate. All rights reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0 justify-center">
          <Link href="/privacy" className="hover:text-amber-500 transition-colors">Privacy Policy</Link>
          <span className="text-zinc-800">|</span>
          <Link href="/terms" className="hover:text-amber-500 transition-colors">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
