'use client';

import { useState, useEffect } from 'react';
import { getInquiries, updateInquiryStatus, deleteInquiry } from '../actions';
import { Mail, Phone, Calendar, User, Trash2, Check, Archive, ArrowRight, Inbox } from 'lucide-react';

export default function InquiriesInbox() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'archived'>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const data = await getInquiries();
      setInquiries(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await updateInquiryStatus(id, status);
      setInquiries(inquiries.map(inq => inq.id === id ? { ...inq, status } : inq));
      if (selectedInquiry?.id === id) {
        setSelectedInquiry({ ...selectedInquiry, status });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this inquiry?')) return;

    try {
      await deleteInquiry(id);
      setInquiries(inquiries.filter(inq => inq.id !== id));
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredInquiries = inquiries.filter(inq => {
    if (filter === 'all') return true;
    return inq.status === filter;
  });

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-heading text-zinc-50">Inquiries Inbox</h1>
        <p className="text-zinc-500 text-sm mt-1 uppercase tracking-widest">Client Messages & Leads</p>
      </div>

      {/* Tabs */}
      <div className="bg-zinc-900/40 border border-zinc-800 p-2 rounded-xl flex flex-wrap gap-2 max-w-md">
        {(['all', 'new', 'read', 'archived'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setFilter(tab);
              setSelectedInquiry(null);
            }}
            className={`flex-1 py-2.5 px-4 rounded-lg uppercase tracking-wider text-xs font-semibold transition-colors ${
              filter === tab
                ? 'bg-amber-500 text-black'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Inbox Sidebar List */}
        <div className="lg:col-span-1 bg-zinc-900/20 border border-zinc-800 rounded-xl overflow-hidden flex flex-col h-[600px]">
          <div className="p-4 border-b border-zinc-800 bg-zinc-950/40 flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">Messages</span>
            <span className="bg-zinc-800 text-zinc-400 text-[10px] px-2 py-0.5 rounded-full border border-zinc-700/50 font-bold">
              {filteredInquiries.length}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-zinc-800/80">
            {loading ? (
              <div className="text-center py-20 text-zinc-600 text-sm">
                Loading messages...
              </div>
            ) : filteredInquiries.length === 0 ? (
              <div className="text-center py-20 text-zinc-650 text-sm">
                Inbox is empty.
              </div>
            ) : (
              filteredInquiries.map((inq) => (
                <button
                  key={inq.id}
                  onClick={() => setSelectedInquiry(inq)}
                  className={`w-full text-left p-5 transition-all flex flex-col gap-2 ${
                    selectedInquiry?.id === inq.id
                      ? 'bg-zinc-900/60 border-l-4 border-l-amber-500'
                      : 'hover:bg-zinc-900/20 border-l-4 border-l-transparent'
                  }`}
                >
                  <div className="flex justify-between items-start w-full">
                    <span className="font-semibold text-zinc-100 text-sm truncate max-w-[130px]">
                      {inq.name}
                    </span>
                    <span className="text-[9px] text-zinc-500 font-medium">
                      {new Date(inq.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs text-zinc-400 font-light truncate max-w-[150px]">
                      {inq.message}
                    </span>
                    <span className={`text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full ${
                      inq.status === 'new'
                        ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20 font-bold'
                        : inq.status === 'read'
                          ? 'bg-zinc-800 text-zinc-450 border border-zinc-700/50'
                          : 'bg-zinc-950 text-zinc-600 border border-zinc-850'
                    }`}>
                      {inq.status}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Message Viewer Details */}
        <div className="lg:col-span-2 bg-zinc-900/40 border border-zinc-800 rounded-xl p-6 md:p-8 flex flex-col justify-between h-[600px] overflow-hidden">
          {selectedInquiry ? (
            <div className="flex flex-col h-full justify-between">
              {/* Header Details */}
              <div className="space-y-6 overflow-y-auto pr-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 border-b border-zinc-800/80 pb-6">
                  <div>
                    <h3 className="text-2xl font-heading text-zinc-150 flex items-center gap-2">
                      <User size={20} className="text-amber-500" /> {selectedInquiry.name}
                    </h3>
                    <p className="text-xs text-amber-500 mt-2 uppercase tracking-widest font-semibold bg-amber-500/5 border border-amber-500/10 px-3 py-1 rounded-md inline-block">
                      Interest: {selectedInquiry.interest === 'buy' ? 'Acquiring Property' : selectedInquiry.interest === 'sell' ? 'Selling Property' : selectedInquiry.interest === 'invest' ? 'Portfolio Investment' : 'General Inquiry'}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    {selectedInquiry.status === 'new' && (
                      <button
                        onClick={() => handleStatusUpdate(selectedInquiry.id, 'read')}
                        className="p-2.5 bg-zinc-900 border border-zinc-800 hover:border-amber-500/30 hover:text-amber-500 text-zinc-450 rounded-lg transition-colors"
                        title="Mark as Read"
                      >
                        <Check size={16} />
                      </button>
                    )}
                    {selectedInquiry.status !== 'archived' && (
                      <button
                        onClick={() => handleStatusUpdate(selectedInquiry.id, 'archived')}
                        className="p-2.5 bg-zinc-900 border border-zinc-800 hover:border-amber-500/30 hover:text-amber-500 text-zinc-450 rounded-lg transition-colors"
                        title="Archive Inquiry"
                      >
                        <Archive size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(selectedInquiry.id)}
                      className="p-2.5 bg-zinc-900 border border-zinc-800 hover:border-red-500/30 hover:text-red-500 text-zinc-450 rounded-lg transition-colors"
                      title="Permanently Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Metadata Row */}
                <div className="grid sm:grid-cols-3 gap-4 text-xs font-light text-zinc-400">
                  <a href={`mailto:${selectedInquiry.email}`} className="flex items-center gap-2 p-3 bg-zinc-950 border border-zinc-900 rounded-lg hover:border-zinc-850 hover:text-zinc-100 transition-colors">
                    <Mail size={14} className="text-zinc-600" />
                    <span className="truncate">{selectedInquiry.email}</span>
                  </a>
                  <a href={`tel:${selectedInquiry.phone}`} className="flex items-center gap-2 p-3 bg-zinc-950 border border-zinc-900 rounded-lg hover:border-zinc-850 hover:text-zinc-100 transition-colors">
                    <Phone size={14} className="text-zinc-600" />
                    <span>{selectedInquiry.phone}</span>
                  </a>
                  <div className="flex items-center gap-2 p-3 bg-zinc-950 border border-zinc-900 rounded-lg">
                    <Calendar size={14} className="text-zinc-600" />
                    <span>{new Date(selectedInquiry.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>

                {/* Message Body */}
                <div className="space-y-3 pt-4">
                  <h5 className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold">Message Detail</h5>
                  <div className="p-6 bg-zinc-950/80 border border-zinc-900 rounded-xl text-sm text-zinc-300 font-light leading-relaxed whitespace-pre-wrap">
                    {selectedInquiry.message}
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-6 border-t border-zinc-800/80 flex justify-end">
                <a
                  href={`mailto:${selectedInquiry.email}?subject=Tekle%20Yohannes%20-%20Re:%20Step-Up%20Homes%20Inquiry`}
                  className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-black uppercase tracking-widest font-semibold text-xs rounded-md transition-colors flex items-center gap-2"
                >
                  Compose Email Reply <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-zinc-550 gap-4">
              <Inbox size={48} className="text-zinc-800 stroke-[1.5]" />
              <div className="text-center">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-1">No Message Selected</h4>
                <p className="text-xs text-zinc-600 font-light max-w-xs">Select an inquiry listing from the sidebar feed to view full client communication details.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
