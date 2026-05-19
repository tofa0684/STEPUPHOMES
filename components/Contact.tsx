'use client';

import { motion } from 'motion/react';
import { Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      interest: formData.get('interest'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to submit inquiry');

      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section id="contact" className="py-24 md:py-32 bg-zinc-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-900 border border-zinc-800 p-12 max-w-2xl mx-auto"
          >
            <CheckCircle2 className="text-amber-500 mx-auto mb-6" size={64} />
            <h3 className="text-3xl font-heading text-zinc-50 mb-4">Inquiry Received</h3>
            <p className="text-zinc-400 font-light mb-8">
              Thank you for reaching out. Tekle Yohannes will review your inquiry and contact you for a confidential consultation shortly.
            </p>
            <button 
              onClick={() => setSubmitted(false)}
              className="text-amber-500 uppercase tracking-widest text-sm font-semibold border-b border-amber-500 pb-1"
            >
              Send Another Message
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-zinc-950 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-amber-500 tracking-[0.2em] uppercase text-sm mb-4 font-semibold">Initiate Contact</h2>
            <h3 className="text-4xl md:text-5xl font-heading text-zinc-50 mb-8 leading-tight">
              Begin Your <br/>
              <span className="italic text-zinc-500">Property Journey.</span>
            </h3>
            <p className="text-zinc-400 font-light leading-relaxed mb-12 max-w-md">
              Whether you are looking to acquire a statement home or seeking off-market investment opportunities, contact me for a confidential consultation.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-zinc-900 p-3 border border-zinc-800 text-amber-500">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-zinc-100 text-sm uppercase tracking-widest mb-1">Mobile</h4>
                  <a href="tel:+251913806919" className="text-zinc-400 font-light hover:text-amber-500 transition-colors">+251 913 806 919</a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-zinc-900 p-3 border border-zinc-800 text-amber-500">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-zinc-100 text-sm uppercase tracking-widest mb-1">Email</h4>
                  <a href="mailto:Tekleyohannes21@gmail.com" className="text-zinc-400 font-light hover:text-amber-500 transition-colors">Tekleyohannes21@gmail.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-zinc-900 p-3 border border-zinc-800 text-amber-500">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-zinc-100 text-sm uppercase tracking-widest mb-1">Office</h4>
                  <p className="text-zinc-400 font-light">SEMIT 72, Addis Ababa, Ethiopia</p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
               <a 
                 href="https://wa.me/251913806919" 
                 target="_blank" 
                 rel="noreferrer"
                 className="inline-flex items-center gap-3 px-6 py-3 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-colors text-sm uppercase tracking-widest font-semibold"
               >
                 Message on WhatsApp
               </a>
               <a 
                 href="https://t.me/+251913806919" 
                 target="_blank" 
                 rel="noreferrer"
                 className="inline-flex items-center gap-3 px-6 py-3 bg-[#0088cc]/10 text-[#0088cc] border border-[#0088cc]/30 hover:bg-[#0088cc]/20 transition-colors text-sm uppercase tracking-widest font-semibold"
               >
                 Message on Telegram
               </a>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-zinc-900/50 backdrop-blur border border-zinc-800 p-8 md:p-10"
          >
            <h4 className="text-2xl font-heading text-zinc-100 mb-8">Confidential Inquiry</h4>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    required 
                    className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors placeholder:text-zinc-700"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    required 
                    className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors placeholder:text-zinc-700"
                    placeholder="+251 913 XXXXXX"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  required 
                  className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors placeholder:text-zinc-700"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="interest" className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Property Interest</label>
                <select 
                  id="interest" 
                  name="interest"
                  className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors appearance-none"
                >
                  <option value="buy">Acquiring a Property</option>
                  <option value="sell">Selling a Property</option>
                  <option value="invest">Investment Portfolio</option>
                  <option value="other">Other Inquiry</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Message</label>
                <textarea 
                  id="message" 
                  name="message"
                  rows={4} 
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors placeholder:text-zinc-700 resize-none"
                  placeholder="Please share details about your requirements..."
                ></textarea>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-amber-500 text-black uppercase tracking-widest font-semibold py-4 hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
