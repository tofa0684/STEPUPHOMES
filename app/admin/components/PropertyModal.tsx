'use client';

import { useState, useEffect } from 'react';
import { X, Upload, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface PropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (propertyData: any) => Promise<void>;
  property?: any;
}

export default function PropertyModal({ isOpen, onClose, onSave, property }: PropertyModalProps) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [beds, setBeds] = useState(0);
  const [baths, setBaths] = useState(0);
  const [sqft, setSqft] = useState('');
  const [tag, setTag] = useState('Luxury Villa');
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (property) {
      setTitle(property.title || '');
      setLocation(property.location || '');
      setPrice(property.price || '');
      setBeds(property.beds || 0);
      setBaths(property.baths || 0);
      setSqft(property.sqft || '');
      setTag(property.tag || 'Luxury Villa');
      setImage(property.image || '');
    } else {
      setTitle('');
      setLocation('');
      setPrice('');
      setBeds(0);
      setBaths(0);
      setSqft('');
      setTag('Luxury Villa');
      setImage('');
    }
  }, [property, isOpen]);

  if (!isOpen) return null;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      setImage(data.url);
    } catch (err) {
      console.error(err);
      alert('Failed to upload image. Make sure your API key / server session is active.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await onSave({
        id: property?.id,
        title,
        location,
        price,
        beds: Number(beds),
        baths: Number(baths),
        sqft,
        tag,
        image,
      });
      onClose();
    } catch (err) {
      console.error(err);
      alert('Failed to save property.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-950/50">
          <h3 className="text-xl font-heading text-zinc-100">
            {property ? 'Edit Property Listing' : 'Add New Property'}
          </h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-100 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto flex-1">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Property Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors rounded-md"
                placeholder="e.g. Bole Sky Villa"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Location/Address</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors rounded-md"
                placeholder="e.g. Bole, Addis Ababa"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Price ($ or ETB)</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors rounded-md"
                placeholder="e.g. $1,200,000"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Property Tag</label>
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors rounded-md appearance-none"
              >
                <option value="Luxury Villa">Luxury Villa</option>
                <option value="Exclusive">Exclusive</option>
                <option value="Lakefront">Lakefront</option>
                <option value="New Listing">New Listing</option>
                <option value="Penthouse">Penthouse</option>
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Square Footage</label>
              <input
                type="text"
                value={sqft}
                onChange={(e) => setSqft(e.target.value)}
                required
                className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors rounded-md"
                placeholder="e.g. 4,500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Beds</label>
              <input
                type="number"
                value={beds}
                onChange={(e) => setBeds(Number(e.target.value))}
                min={0}
                required
                className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors rounded-md"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Baths</label>
              <input
                type="number"
                value={baths}
                onChange={(e) => setBaths(Number(e.target.value))}
                min={0}
                required
                className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Listing Cover Image</label>
            <div className="flex items-center gap-6">
              {image && (
                <div className="relative w-32 h-24 border border-zinc-850 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-950">
                  <Image src={image} alt="Cover Preview" fill className="object-cover" />
                </div>
              )}
              <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 hover:border-zinc-700 bg-zinc-950 p-6 rounded-lg cursor-pointer transition-colors text-zinc-400 hover:text-zinc-200">
                <Upload size={24} className="mb-2" />
                <span className="text-sm font-medium">Click to upload photo</span>
                <span className="text-xs text-zinc-600 mt-1">PNG, JPG up to 10MB</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
            {uploading && (
              <div className="flex items-center gap-2 mt-2 text-xs text-amber-500">
                <Loader2 size={12} className="animate-spin" /> Uploading image to Supabase...
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-zinc-800 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 uppercase tracking-widest font-semibold text-xs rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || uploading}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black uppercase tracking-widest font-semibold text-xs rounded-md transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {saving && <Loader2 size={14} className="animate-spin" />}
              {property ? 'Save Changes' : 'Publish Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
