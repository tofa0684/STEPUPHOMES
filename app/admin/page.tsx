import { getDashboardStats } from './actions';
import StatsCard from './components/StatsCard';
import { Building2, Inbox, Calendar, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const { propertiesCount, inquiriesCount, recentInquiries } = await getDashboardStats();

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-heading text-zinc-50">Overview</h1>
        <p className="text-zinc-500 text-sm mt-1 uppercase tracking-widest">Dashboard & Performance</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard 
          title="Total Properties" 
          value={propertiesCount} 
          icon={Building2} 
        />
        <StatsCard 
          title="New Inquiries" 
          value={inquiriesCount} 
          icon={Inbox} 
          trend={inquiriesCount > 0 ? `${inquiriesCount} Active` : 'Clean'}
          trendUp={inquiriesCount > 0}
        />
        <StatsCard 
          title="Today's Date" 
          value={new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} 
          icon={Calendar} 
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Inquiries List */}
        <div className="lg:col-span-2 bg-zinc-900/40 border border-zinc-800 rounded-xl p-6 flex flex-col h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-heading text-zinc-100">Recent Inquiries</h3>
            <Link 
              href="/admin/inquiries" 
              className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-zinc-400 hover:text-amber-500 transition-colors"
            >
              View Inbox <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            {recentInquiries.length === 0 ? (
              <div className="h-full flex items-center justify-center text-zinc-600 text-sm">
                No inquiries received yet.
              </div>
            ) : (
              recentInquiries.map((inquiry: any) => (
                <div 
                  key={inquiry.id} 
                  className="p-4 bg-zinc-900 border border-zinc-850 rounded-lg flex justify-between items-start hover:border-zinc-800 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-zinc-100 text-sm">{inquiry.name}</span>
                      <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full ${
                        inquiry.status === 'new' 
                          ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' 
                          : inquiry.status === 'read' 
                            ? 'bg-zinc-800 text-zinc-400 border border-zinc-700/50' 
                            : 'bg-zinc-950 text-zinc-600 border border-zinc-900'
                      }`}>
                        {inquiry.status}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500">{inquiry.email} • {inquiry.phone}</p>
                    <p className="text-xs text-zinc-400 line-clamp-1 mt-2">{inquiry.message}</p>
                  </div>
                  <span className="text-[10px] text-zinc-600 font-medium">
                    {new Date(inquiry.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-6 h-[400px] flex flex-col">
          <h3 className="text-lg font-heading text-zinc-100 mb-6">Quick Actions</h3>
          <div className="flex-1 flex flex-col gap-4">
            <Link 
              href="/admin/listings" 
              className="flex-1 flex flex-col justify-center p-5 bg-zinc-900 border border-zinc-850 hover:border-zinc-700 hover:bg-zinc-900/80 rounded-xl transition-all group"
            >
              <span className="text-amber-500 font-heading text-lg group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                Manage Portfolio &rarr;
              </span>
              <span className="text-xs text-zinc-500 mt-1 font-light">Add or edit luxury property listings, update descriptions, and manage image assets.</span>
            </Link>

            <Link 
              href="/admin/settings" 
              className="flex-1 flex flex-col justify-center p-5 bg-zinc-900 border border-zinc-850 hover:border-zinc-700 hover:bg-zinc-900/80 rounded-xl transition-all group"
            >
              <span className="text-amber-500 font-heading text-lg group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                Update Bio & Profile &rarr;
              </span>
              <span className="text-xs text-zinc-500 mt-1 font-light">Revise years of experience, customize biography paragraphs, or manage client testimonials.</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
