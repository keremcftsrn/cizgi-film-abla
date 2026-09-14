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
            🎪 Çizgi Filmlerim
          </motion.div>
          <h2 className="font-display text-4xl md:text-5xl font-black mb-4 text-white">Çizgi Filmlerim</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {animations.slice(0, 3).map(a => (
            <div key={a.id} className="bg-white/5 rounded-[2rem] p-4 border border-white/10 shadow-2xl">
              <div className="aspect-video w-full rounded-xl overflow-hidden mb-4">
                <iframe src={a.videoUrl.replace("watch?v=", "embed/")} className="w-full h-full border-0" allowFullScreen />
              </div>
              <h3 className="font-bold text-xl px-2">{a.title}</h3>
            </div>
          ))}
                  <div className="bg-white/5 rounded-[2rem] p-4 border-2 border-dashed border-white/20 flex flex-col items-center justify-center text-center hover:bg-white/10 hover:border-white/50 transition-all cursor-pointer group min-h-[200px]">
            <a href="/ekrandakiler" className="flex flex-col items-center justify-center w-full h-full">
              <div className="w-16 h-16 bg-white/10 text-white rounded-full flex items-center justify-center text-3xl font-black mb-4 group-hover:scale-110 transition-transform">
                +
              </div>
              <h3 className="font-bold text-xl text-white">Tüm Videoları İzle</h3>
              <p className="text-sm text-white/50 mt-2">Daha fazla çizgi film için tıklayın</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


