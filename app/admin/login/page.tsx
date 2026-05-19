'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '@/src/assets/images/regenerated_image_1778775984943.png';
import { Lock } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/admin');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Image 
            src={logo} 
            alt="StepUpHomes" 
            width={200} 
            height={100} 
            className="w-auto h-20 mx-auto object-contain mb-8 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]"
          />
          <h1 className="text-2xl font-heading text-zinc-100">Executive Access</h1>
          <p className="text-zinc-500 text-sm mt-2 uppercase tracking-widest">Secure Admin Portal</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors placeholder:text-zinc-700 rounded-md"
                placeholder="admin@stepuphomes.com"
              />
            </div>
            
            <div>
              <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors placeholder:text-zinc-700 rounded-md"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-md">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 text-black uppercase tracking-widest font-semibold py-4 rounded-md hover:bg-amber-400 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Lock size={18} />
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
