import Image from 'next/image';
import { MapPin, Bed, Bath, Square, ArrowUpRight } from 'lucide-react';
import { MotionDiv, MotionA, MotionH2, MotionH3 } from '@/lib/utils';
import { createClient } from '@/lib/supabase/server';

export default async function Properties() {
  const supabase = (await createClient()) as any;
  const { data: properties } = await supabase.from('properties').select('*').order('created_at', { ascending: false });

  if (!properties) {
    return null;
  }

  return (
    <section id="properties" className="py-24 md:py-32 bg-zinc-900 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-amber-500 tracking-[0.2em] uppercase text-sm mb-4 font-semibold">Featured Portfolio</h2>
            <h3 className="text-4xl md:text-5xl font-heading text-zinc-50">Exclusive Listings</h3>
          </MotionDiv>
          <MotionA
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            href="#contact"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-zinc-400 hover:text-amber-500 transition-colors border-b border-amber-500/0 hover:border-amber-500 pb-1"
          >
            View All Properties <ArrowUpRight size={16} />
          </MotionA>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
          {properties.map((property: any, index: number) => (
            <MotionDiv
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden mb-6 bg-zinc-800">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-w-768px) 100vw, 50vw"
                />
                <div className="absolute top-4 left-4 bg-zinc-950/80 backdrop-blur border border-zinc-800 text-amber-500 text-xs px-3 py-1 uppercase tracking-wider">
                  {property.tag}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-between p-6">
                   <span className="text-white font-medium uppercase tracking-widest text-sm border-b border-amber-500 pb-1">Discover</span>
                   <ArrowUpRight className="text-amber-500" size={24} />
                </div>
              </div>
              
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-2xl font-heading text-zinc-100 group-hover:text-amber-500 transition-colors">
                  {property.title}
                </h4>
                <span className="text-xl text-zinc-300 font-light">{property.price}</span>
              </div>
              
              <div className="flex items-center text-zinc-500 mb-6 gap-2 text-sm">
                <MapPin size={14} className="text-amber-600" />
                {property.location}
              </div>
              
              <div className="grid grid-cols-3 gap-4 py-4 border-t border-zinc-800">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Bed size={18} className="text-zinc-600" />
                  <span className="text-sm font-light">{property.beds} <span className="hidden sm:inline">Beds</span></span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <Bath size={18} className="text-zinc-600" />
                  <span className="text-sm font-light">{property.baths} <span className="hidden sm:inline">Baths</span></span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <Square size={18} className="text-zinc-600" />
                  <span className="text-sm font-light">{property.sqft} <span className="hidden sm:inline">Sq Ft</span></span>
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
