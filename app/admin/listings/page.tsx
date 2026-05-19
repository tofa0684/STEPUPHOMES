'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, MapPin, Bed, Bath, Square } from 'lucide-react';
import Image from 'next/image';
import PropertyModal from '../components/PropertyModal';
import { getProperties, saveProperty, deleteProperty } from '../actions';

export default function ListingsManager() {
  const [properties, setProperties] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const data = await getProperties();
      setProperties(data);
    } catch (err) {
      console.error('Failed to fetch properties:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleAdd = () => {
    setSelectedProperty(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (property: any) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you absolutely sure you want to delete this listing? This action is permanent.')) return;

    try {
      await deleteProperty(id);
      setProperties(properties.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete property.');
    }
  };

  const handleSave = async (propertyData: any) => {
    await saveProperty(propertyData);
    await fetchProperties();
  };

  const filteredProperties = properties.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-heading text-zinc-50">Listings</h1>
          <p className="text-zinc-500 text-sm mt-1 uppercase tracking-widest">Real Estate Portfolio</p>
        </div>
        <button
          onClick={handleAdd}
          className="bg-amber-500 hover:bg-amber-400 text-black px-6 py-3 uppercase tracking-widest font-semibold text-xs flex items-center justify-center gap-2 rounded-md transition-colors w-full sm:w-auto"
        >
          <Plus size={16} /> Add Property
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-zinc-900/50 backdrop-blur border border-zinc-800 p-4 rounded-xl flex items-center gap-3">
        <Search size={20} className="text-zinc-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or location..."
          className="bg-transparent border-none text-zinc-100 placeholder:text-zinc-600 focus:outline-none w-full text-sm font-light"
        />
      </div>

      {/* Grid of Listings */}
      {loading ? (
        <div className="text-center py-20 text-zinc-500 text-sm">
          Loading listings from Supabase...
        </div>
      ) : filteredProperties.length === 0 ? (
        <div className="text-center py-20 text-zinc-500 text-sm border border-dashed border-zinc-800 rounded-xl">
          No listings found matching your search.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProperties.map((property) => (
            <div 
              key={property.id}
              className="group bg-zinc-900/30 border border-zinc-800/80 rounded-xl overflow-hidden flex flex-col hover:border-zinc-700 transition-colors"
            >
              <div className="relative aspect-[16/10] bg-zinc-800 overflow-hidden">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover"
                  sizes="(max-w-768px) 100vw, 50vw"
                />
                <div className="absolute top-4 left-4 bg-zinc-950/90 backdrop-blur border border-zinc-800 text-amber-500 text-[10px] px-2.5 py-1 uppercase tracking-wider font-semibold">
                  {property.tag}
                </div>
                
                {/* Admin Quick Action Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <button
                    onClick={() => handleEdit(property)}
                    className="p-3 bg-zinc-900 border border-zinc-800 rounded-full text-amber-500 hover:bg-amber-500 hover:text-black transition-colors"
                    title="Edit Listing"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(property.id)}
                    className="p-3 bg-zinc-900 border border-zinc-800 rounded-full text-red-500 hover:bg-red-500 hover:text-black transition-colors"
                    title="Delete Listing"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h4 className="text-xl font-heading text-zinc-100 group-hover:text-amber-500 transition-colors">
                      {property.title}
                    </h4>
                    <span className="text-lg text-amber-500 font-medium whitespace-nowrap">{property.price}</span>
                  </div>
                  <div className="flex items-center text-zinc-500 gap-1.5 text-xs mb-6">
                    <MapPin size={12} className="text-amber-600" />
                    {property.location}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-800/80 text-zinc-400 text-xs">
                  <div className="flex items-center gap-2">
                    <Bed size={14} className="text-zinc-650" />
                    <span>{property.beds} Bed{property.beds !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath size={14} className="text-zinc-650" />
                    <span>{property.baths} Bath{property.baths !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono">
                    <Square size={14} className="text-zinc-650" />
                    <span>{property.sqft} SQFT</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Property Form Modal */}
      <PropertyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        property={selectedProperty}
      />
    </div>
  );
}
