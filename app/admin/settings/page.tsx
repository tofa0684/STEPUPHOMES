'use client';

import { useState, useEffect } from 'react';
import { 
  getAgentProfile, updateAgentProfile, 
  getSettings, updateSettings, 
  getTestimonials, saveTestimonial, deleteTestimonial 
} from '../actions';
import { 
  User, Settings, Star, Save, Trash2, Plus, 
  Phone, Mail, MapPin, MessageCircle, Send, PlusCircle 
} from 'lucide-react';
import Image from 'next/image';

export default function SettingsManager() {
  const [activeTab, setActiveTab] = useState<'profile' | 'testimonials' | 'settings'>('profile');
  const [loading, setLoading] = useState(true);

  // Profile Form State
  const [profile, setProfile] = useState<any>({
    id: '', name: '', title: '', subtitle: '', signature: '', experience_years: '', paragraphs: [], stats: []
  });
  const [bioText, setBioText] = useState('');

  // Contact Settings Form State
  const [contact, setContact] = useState<any>({
    id: '', phone: '', tel: '', email: '', office: '', whatsapp: '', telegram: ''
  });

  // Testimonials State
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [selectedTestimonial, setSelectedTestimonial] = useState<any | null>(null);
  const [testName, setTestName] = useState('');
  const [testRole, setTestRole] = useState('');
  const [testContent, setTestContent] = useState('');
  const [testImage, setTestImage] = useState('');

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [savingTestimonial, setSavingTestimonial] = useState(false);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const profileData = await getAgentProfile();
      if (profileData) {
        setProfile(profileData);
        setBioText(profileData.paragraphs?.join('\n\n') || '');
      }

      const settingsData = await getSettings();
      if (settingsData) {
        setContact(settingsData);
      }

      const testimonialsData = await getTestimonials();
      setTestimonials(testimonialsData);
    } catch (err) {
      console.error('Failed to load settings data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // Save Profile Handler
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);

    try {
      const paragraphs = bioText.split('\n\n').filter(p => p.trim() !== '');
      await updateAgentProfile({
        ...profile,
        paragraphs
      });
      alert('Agent profile updated successfully.');
    } catch (err) {
      console.error(err);
      alert('Failed to update agent profile.');
    } finally {
      setSavingProfile(false);
    }
  };

  // Save Settings Handler
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);

    try {
      await updateSettings(contact);
      alert('Global contact settings updated.');
    } catch (err) {
      console.error(err);
      alert('Failed to update contact settings.');
    } finally {
      setSavingSettings(false);
    }
  };

  // Save Testimonial Handler
  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingTestimonial(true);

    try {
      await saveTestimonial({
        id: selectedTestimonial?.id,
        name: testName,
        role: testRole,
        content: testContent,
        image: testImage || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=256'
      });
      
      // Reset form
      setSelectedTestimonial(null);
      setTestName('');
      setTestRole('');
      setTestContent('');
      setTestImage('');
      
      await loadAllData();
      alert('Testimonial saved.');
    } catch (err) {
      console.error(err);
      alert('Failed to save testimonial.');
    } finally {
      setSavingTestimonial(false);
    }
  };

  const handleEditTestimonial = (t: any) => {
    setSelectedTestimonial(t);
    setTestName(t.name);
    setTestRole(t.role);
    setTestContent(t.content);
    setTestImage(t.image);
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      await deleteTestimonial(id);
      setTestimonials(testimonials.filter(t => t.id !== id));
      if (selectedTestimonial?.id === id) {
        setSelectedTestimonial(null);
        setTestName('');
        setTestRole('');
        setTestContent('');
        setTestImage('');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to delete testimonial.');
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-zinc-500 text-sm">Loading config files from Supabase...</div>;
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-heading text-zinc-50">Profile & Settings</h1>
        <p className="text-zinc-500 text-sm mt-1 uppercase tracking-widest">Global configurations</p>
      </div>

      {/* Tabs */}
      <div className="bg-zinc-900/40 border border-zinc-800 p-2 rounded-xl flex flex-wrap gap-2 max-w-md">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex-1 py-2.5 px-4 rounded-lg uppercase tracking-wider text-xs font-semibold transition-colors flex items-center justify-center gap-2 ${
            activeTab === 'profile'
              ? 'bg-amber-500 text-black'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
          }`}
        >
          <User size={14} /> Profile
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex-1 py-2.5 px-4 rounded-lg uppercase tracking-wider text-xs font-semibold transition-colors flex items-center justify-center gap-2 ${
            activeTab === 'settings'
              ? 'bg-amber-500 text-black'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
          }`}
        >
          <Settings size={14} /> Contact
        </button>
        <button
          onClick={() => setActiveTab('testimonials')}
          className={`flex-1 py-2.5 px-4 rounded-lg uppercase tracking-wider text-xs font-semibold transition-colors flex items-center justify-center gap-2 ${
            activeTab === 'testimonials'
              ? 'bg-amber-500 text-black'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
          }`}
        >
          <Star size={14} /> Reviews
        </button>
      </div>

      <div className="bg-zinc-900/20 border border-zinc-800 rounded-xl p-6 md:p-8">
        
        {/* TAB 1: Profile Manager */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="space-y-6">
            <h3 className="text-xl font-heading text-zinc-100 border-b border-zinc-850 pb-4 mb-6">Agent Profile Details</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Display Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors rounded-md"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Title / Slogan</label>
                <input
                  type="text"
                  value={profile.title}
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors rounded-md"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Section Subtitle</label>
                <input
                  type="text"
                  value={profile.subtitle}
                  onChange={(e) => setProfile({ ...profile, subtitle: e.target.value })}
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors rounded-md"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Years of Experience</label>
                <input
                  type="text"
                  value={profile.experience_years}
                  onChange={(e) => setProfile({ ...profile, experience_years: e.target.value })}
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors rounded-md"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Signature Text</label>
                <input
                  type="text"
                  value={profile.signature}
                  onChange={(e) => setProfile({ ...profile, signature: e.target.value })}
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Biography Paragraphs (separated by double newlines)</label>
              <textarea
                value={bioText}
                onChange={(e) => setBioText(e.target.value)}
                rows={10}
                required
                className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 p-4 focus:outline-none focus:border-amber-500 transition-colors placeholder:text-zinc-700 resize-y rounded-md text-sm font-light leading-relaxed"
                placeholder="Separate each paragraph with an empty line..."
              />
            </div>

            <div className="flex justify-end pt-4 border-t border-zinc-855">
              <button
                type="submit"
                disabled={savingProfile}
                className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-black uppercase tracking-widest font-semibold text-xs rounded-md transition-colors flex items-center gap-2"
              >
                <Save size={14} /> {savingProfile ? 'Saving...' : 'Save Profile Details'}
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: Global Settings */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="space-y-6">
            <h3 className="text-xl font-heading text-zinc-100 border-b border-zinc-850 pb-4 mb-6">Contact & Social Links</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 flex items-center gap-1.5">
                  <Phone size={12} /> Mobile Phone (display)
                </label>
                <input
                  type="text"
                  value={contact.phone}
                  onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors rounded-md"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 flex items-center gap-1.5">
                  <Phone size={12} /> Telephone Link (raw dial)
                </label>
                <input
                  type="text"
                  value={contact.tel}
                  onChange={(e) => setContact({ ...contact, tel: e.target.value })}
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors rounded-md"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 flex items-center gap-1.5">
                  <Mail size={12} /> Email Address
                </label>
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors rounded-md"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 flex items-center gap-1.5">
                  <MapPin size={12} /> Office Location
                </label>
                <input
                  type="text"
                  value={contact.office}
                  onChange={(e) => setContact({ ...contact, office: e.target.value })}
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors rounded-md"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 flex items-center gap-1.5">
                  <MessageCircle size={12} /> WhatsApp URL
                </label>
                <input
                  type="text"
                  value={contact.whatsapp}
                  onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })}
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors rounded-md"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 flex items-center gap-1.5">
                  <Send size={12} /> Telegram URL
                </label>
                <input
                  type="text"
                  value={contact.telegram}
                  onChange={(e) => setContact({ ...contact, telegram: e.target.value })}
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors rounded-md"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-zinc-855">
              <button
                type="submit"
                disabled={savingSettings}
                className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-black uppercase tracking-widest font-semibold text-xs rounded-md transition-colors flex items-center gap-2"
              >
                <Save size={14} /> {savingSettings ? 'Saving...' : 'Save Contact Settings'}
              </button>
            </div>
          </form>
        )}

        {/* TAB 3: Testimonials */}
        {activeTab === 'testimonials' && (
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Form Column */}
            <div className="lg:col-span-1 bg-zinc-950 p-6 border border-zinc-850 rounded-xl space-y-6">
              <h4 className="text-lg font-heading text-zinc-100 flex items-center gap-2">
                {selectedTestimonial ? 'Edit Review' : 'Add Testimonial'}
              </h4>
              <form onSubmit={handleSaveTestimonial} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-zinc-550 mb-1.5">Client Name</label>
                  <input
                    type="text"
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                    required
                    className="w-full bg-zinc-900 border border-zinc-800 text-zinc-150 px-3 py-2 text-sm focus:outline-none focus:border-amber-500 transition-colors rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-zinc-550 mb-1.5">Role / Company</label>
                  <input
                    type="text"
                    value={testRole}
                    onChange={(e) => setTestRole(e.target.value)}
                    required
                    className="w-full bg-zinc-900 border border-zinc-800 text-zinc-150 px-3 py-2 text-sm focus:outline-none focus:border-amber-500 transition-colors rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-zinc-550 mb-1.5">Review Content</label>
                  <textarea
                    value={testContent}
                    onChange={(e) => setTestContent(e.target.value)}
                    required
                    rows={4}
                    className="w-full bg-zinc-900 border border-zinc-800 text-zinc-150 p-3 text-sm focus:outline-none focus:border-amber-500 transition-colors rounded-md resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-zinc-550 mb-1.5">Avatar Image URL (Optional)</label>
                  <input
                    type="text"
                    value={testImage}
                    onChange={(e) => setTestImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-zinc-900 border border-zinc-800 text-zinc-150 px-3 py-2 text-sm focus:outline-none focus:border-amber-500 transition-colors rounded-md"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  {selectedTestimonial && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedTestimonial(null);
                        setTestName('');
                        setTestRole('');
                        setTestContent('');
                        setTestImage('');
                      }}
                      className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 uppercase tracking-widest font-semibold text-[10px] rounded-md transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={savingTestimonial}
                    className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-black uppercase tracking-widest font-semibold text-[10px] rounded-md transition-colors flex items-center justify-center gap-1.5"
                  >
                    {selectedTestimonial ? <Save size={12} /> : <PlusCircle size={12} />}
                    {savingTestimonial ? 'Saving...' : selectedTestimonial ? 'Save Changes' : 'Create'}
                  </button>
                </div>
              </form>
            </div>

            {/* List Column */}
            <div className="lg:col-span-2 space-y-4 max-h-[500px] overflow-y-auto pr-1">
              <h4 className="text-lg font-heading text-zinc-100">Testimonials Feed</h4>
              
              {testimonials.length === 0 ? (
                <div className="text-center py-20 text-zinc-650 text-sm border border-dashed border-zinc-850 rounded-xl">
                  No testimonials saved yet.
                </div>
              ) : (
                testimonials.map((t) => (
                  <div 
                    key={t.id}
                    className="p-5 bg-zinc-950 border border-zinc-850 rounded-xl flex items-start gap-4 hover:border-zinc-800 transition-colors"
                  >
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-zinc-750 bg-zinc-900 flex-shrink-0">
                      <Image src={t.image} alt={t.name} fill className="object-cover" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <div>
                          <h5 className="font-semibold text-zinc-150 text-sm">{t.name}</h5>
                          <span className="text-[10px] text-zinc-550 uppercase tracking-widest">{t.role}</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditTestimonial(t)}
                            className="text-zinc-500 hover:text-amber-500 text-xs transition-colors"
                          >
                            Edit
                          </button>
                          <span className="text-zinc-800">|</span>
                          <button
                            onClick={() => handleDeleteTestimonial(t.id)}
                            className="text-zinc-500 hover:text-red-500 text-xs transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-xs text-zinc-400 font-light italic leading-relaxed whitespace-pre-wrap">
                        &quot;{t.content}&quot;
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
