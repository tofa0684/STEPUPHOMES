import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

export default function StatsCard({ title, value, icon: Icon, trend, trendUp }: StatsCardProps) {
  return (
    <div className="bg-zinc-900/50 backdrop-blur border border-zinc-800 p-6 rounded-xl hover:border-zinc-700 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg text-amber-500">
          <Icon size={24} />
        </div>
        {trend && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${trendUp ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
            {trend}
          </span>
        )}
      </div>
      <div>
        <h4 className="text-zinc-400 text-sm uppercase tracking-widest mb-1">{title}</h4>
        <p className="text-3xl font-heading text-zinc-100">{value}</p>
      </div>
    </div>
  );
}
