import type {Metadata} from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: 'Tekle Yohannes | Luxury Real Estate',
  description: 'Exclusive luxury Ethiopian real estate properties and investment consulting.',
};

import CinematicScrollProvider from '@/components/CinematicScrollProvider';

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="bg-zinc-950 text-zinc-50 font-sans antialiased" suppressHydrationWarning>
        <CinematicScrollProvider>
          {children}
        </CinematicScrollProvider>
      </body>
    </html>
  );
}
