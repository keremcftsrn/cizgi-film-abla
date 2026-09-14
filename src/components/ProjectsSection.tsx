'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ProjectsSection() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/projects').then(r=>r.json()).then(data=>setProjects(data));
  }, []);

  if(projects.length === 0) return null;

  return (
    <section className="w-full bg-pink-50 py-20 relative overflow-hidden">
      <div className="max-w-[1000px] mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-black text-slate-800">Yakındaki <span className="text-pink-500">Projeler</span></h2>
        </div>
        <div className="flex flex-col gap-8">
          {projects.map((p, i) => (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[2rem] p-6 shadow-md border-2 border-white hover:border-pink-200 transition-all flex flex-col md:flex-row gap-6"
            >
              {p.imageUrl && (
                <div className="w-full md:w-1/3 aspect-[4/3] rounded-xl overflow-hidden shrink-0">
                  <img src={p.imageUrl} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex flex-col justify-center flex-1">
                {p.dateText && <span className="text-pink-500 font-black text-sm uppercase tracking-wider mb-2">{p.dateText}</span>}
                <h3 className="text-2xl font-black text-slate-800 mb-3">{p.title}</h3>
                <p className="text-slate-600 mb-6">{p.description}</p>
                {p.linkUrl && (
                  <a href={p.linkUrl} target="_blank" className="inline-block bg-slate-900 text-white px-6 py-3 rounded-full font-bold w-fit hover:bg-slate-800 transition">
                    Detaylı Bilgi &rarr;
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}