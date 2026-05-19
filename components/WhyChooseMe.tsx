'use client';

import { motion } from 'motion/react';
import { TrendingUp, Clock, Award, Briefcase } from 'lucide-react';

const features = [
  {
    icon: <TrendingUp size={32} strokeWidth={1} />,
    title: 'Market Expertise',
    description: 'Deep analytical understanding of Ethiopia\'s dynamic real estate micro-markets, ensuring optimal entry and exit points for your investments.',
  },
  {
    icon: <Clock size={32} strokeWidth={1} />,
    title: 'Rapid Execution',
    description: 'A streamlined process network of premium legal and financial partners ensures fast, discreet, and flawless closings.',
  },
  {
    icon: <Award size={32} strokeWidth={1} />,
    title: 'Luxury Specialization',
    description: 'Exclusive focus on the top 1% of the market. Access to off-market mansions, ultra-luxury penthouses, and branded residences.',
  },
  {
    icon: <Briefcase size={32} strokeWidth={1} />,
    title: 'Investment Consulting',
    description: 'Bespoke portfolio structuring for wealth preservation and aggressive capital appreciation in the Ethiopian real estate sector.',
  },
];

export default function WhyChooseMe() {
  return (
    <section id="why-me" className="py-24 md:py-32 bg-zinc-950 relative">
      {/* Subtle background noise/texture could go here, or simple gradient */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-amber-500 tracking-[0.2em] uppercase text-sm mb-4 font-semibold"
          >
            The Advantage
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-heading text-zinc-50 leading-tight"
          >
            Why Discerning Clients <br className="hidden md:block" /> Choose Tekle
          </motion.h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 bg-zinc-900/50 backdrop-blur border border-zinc-800/50 hover:bg-zinc-900 hover:border-zinc-700 transition-all group"
            >
              <div className="text-amber-500 mb-6 bg-zinc-950 inline-flex p-4 rounded-xl border border-zinc-800 group-hover:scale-110 group-hover:bg-amber-500/10 transition-all duration-300">
                {feature.icon}
              </div>
              <h4 className="text-xl font-heading text-zinc-100 mb-4">{feature.title}</h4>
              <p className="text-zinc-400 font-light text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
