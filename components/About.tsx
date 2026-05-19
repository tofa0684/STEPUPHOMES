import Image from 'next/image';
import { MotionDiv, MotionH2, MotionH3 } from '@/lib/utils';
import { createClient } from '@/lib/supabase/server';

export default async function About() {
  const supabase = (await createClient()) as any;
  const { data } = await supabase.from('agent_profile').select('*').single();
  const about = data as any;

  if (!about) {
    return null; // or standard loading skeleton
  }

  // Remote professional portrait of a luxury real estate agent, whitelisted in next.config.ts
  const agentImageUrl = "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop";

  return (
    <section id="about" className="py-24 md:py-32 bg-zinc-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Image Side */}
          <MotionDiv
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] md:aspect-square lg:aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none lg:mx-0">
              {/* Image Container with Overflow Hidden for Scale Effect */}
              <div className="about-photo-wrapper group relative w-full h-full overflow-hidden">
                <Image
                  src={agentImageUrl}
                  alt="Tekle Yohannes, Professional Agent"
                  fill
                  className="object-cover object-top"
                  sizes="(max-w-768px) 100vw, 50vw"
                  suppressHydrationWarning
                />
                {/* Luxury Golden Overlay (#F5A623) */}
                <div className="absolute inset-0 bg-[#F5A623] opacity-0 group-hover:opacity-15 transition-opacity duration-[600ms] ease-in-out pointer-events-none" />
              </div>

              {/* Decorative Frame (Outside overflow-hidden to prevent clipping) */}
              <div className="absolute -inset-4 border border-zinc-800 pointer-events-none hidden md:block" />
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-zinc-900 border border-zinc-800 p-6 hidden md:flex flex-col justify-center">
                <span className="text-amber-500 font-heading text-5xl mb-2">{about.experience_years}</span>
                <span className="text-zinc-400 text-sm uppercase tracking-widest">Years of Excellence</span>
              </div>
            </div>
          </MotionDiv>

          {/* Content Side */}
          <MotionDiv
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-amber-500 tracking-[0.2em] uppercase text-sm mb-4 font-semibold">{about.subtitle}</h2>
            <h3 className="text-4xl md:text-5xl font-heading text-zinc-50 mb-8 leading-tight">
              {about.name}, <br/>
              <span className="text-zinc-500 italic">{about.title}</span>
            </h3>
            
            <div className="space-y-6 text-zinc-400 font-light leading-relaxed mb-10">
              {about.paragraphs.map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-zinc-800">
              {about.stats.map((stat: any, i: number) => (
                <div key={i}>
                  <p className="text-3xl font-heading text-zinc-50 mb-1">{stat.value}</p>
                  <p className="text-xs text-amber-500 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
            
            {/* Signature */}
            <div className="mt-12 opacity-50">
               <span className="font-heading italic text-4xl text-zinc-500">{about.signature}</span>
            </div>
          </MotionDiv>

        </div>
      </div>
    </section>
  );
}
