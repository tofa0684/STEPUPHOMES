import { Star } from 'lucide-react';
import Image from 'next/image';
import { MotionDiv, MotionH2, MotionH3 } from '@/lib/utils';
import { createClient } from '@/lib/supabase/server';

export default async function Testimonials() {
  const supabase = (await createClient()) as any;
  const { data: testimonials } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });

  if (!testimonials) {
    return null;
  }

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-zinc-900 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <MotionH2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-amber-500 tracking-[0.2em] uppercase text-sm mb-4 font-semibold"
          >
            Client Success
          </MotionH2>
          <MotionH3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-heading text-zinc-50 leading-tight"
          >
            Proof of Performance
          </MotionH3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t: any, index: number) => (
            <MotionDiv
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-zinc-950 p-8 border border-zinc-800 relative flex flex-col"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-amber-500 fill-amber-500" />
                ))}
              </div>
              
              <blockquote className="text-zinc-300 font-light italic mb-8 flex-grow leading-relaxed">
                &quot;{t.content}&quot;
              </blockquote>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-zinc-700">
                  <Image 
                    src={t.image} 
                    alt={t.name}
                    fill
                    className="object-cover grayscale"
                  />
                </div>
                <div>
                  <h5 className="text-zinc-100 text-sm font-semibold uppercase tracking-wider">{t.name}</h5>
                  <p className="text-amber-500/80 text-xs tracking-widest">{t.role}</p>
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
