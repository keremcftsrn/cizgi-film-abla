'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function GallerySection() {
  const [photos, setPhotos] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/gallery').then(r=>r.json()).then(data=>setPhotos(data));
  }, []);

  if(photos.length === 0) return null;

  return (
    <section className="w-full bg-white py-16 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ rotate: -5, scale: 0.8 }}
            whileInView={{ rotate: 0, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block bg-pink-100 px-6 py-2 rounded-full shadow-sm text-pink-600 font-bold mb-4"
          >
            📸 Albüm
          </motion.div>
          <h2 className="font-display text-4xl md:text-5xl font-black text-slate-800">
            En Güzel <span className="text-purple-500">Anılarımız</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.slice(0,8).map((p, i) => (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative aspect-square rounded-[2rem] overflow-hidden shadow-md border-4 border-slate-50 group cursor-pointer hover:shadow-xl hover:border-pink-200 transition-all duration-300"
            >
              <img src={p.imageUrl} alt={p.title || 'Anı'} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              {p.title && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white font-bold text-sm">{p.title}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}