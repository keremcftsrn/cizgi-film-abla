'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function AnimationsSection() {
  const [animations, setAnimations] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/animations').then(r=>r.json()).then(data=>setAnimations(data));
  }, []);

  

  return (
    <section className="w-full bg-slate-900 py-20 relative overflow-hidden text-white">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div className="inline-block bg-white/10 px-6 py-2 rounded-full mb-4 text-yellow-300 font-bold border border-white/20">
            📺 Çizgi Filmlerim
          </motion.div>
          <h2 className="font-display text-4xl md:text-5xl font-black mb-4">Çizgi Filmler <span className="text-pink-400">ve Videolar</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {animations.map(a => (
            <div key={a.id} className="bg-white/5 rounded-[2rem] p-4 border border-white/10 shadow-2xl">
              <div className="aspect-video w-full rounded-xl overflow-hidden mb-4">
                <iframe src={a.videoUrl.replace("watch?v=", "embed/")} className="w-full h-full border-0" allowFullScreen />
              </div>
              <h3 className="font-bold text-xl px-2">{a.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
