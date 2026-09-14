'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function GallerySection() {
  const [photos, setPhotos] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/gallery').then(r=>r.json()).then(data=>setPhotos(data));
  }, []);

  // Group photos by title to create "Albums"
  const albums: Record<string, any[]> = {};
  photos.forEach(p => {
    const albumName = p.title || 'Diğer Anılar';
    if(!albums[albumName]) albums[albumName] = [];
    albums[albumName].push(p);
  });

  const albumNames = Object.keys(albums).slice(0, 3); // Show top 3 albums on homepage

  return (
    <section className="w-full bg-white py-20 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div className="inline-block bg-pink-100 text-pink-500 font-bold px-6 py-2 rounded-full mb-4">
            🪁 En Güzel Anılarımız
          </motion.div>
          <h2 className="font-display text-4xl md:text-5xl font-black text-slate-800">
            Çocuklarımızla Birlikte
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {albumNames.map(albumName => {
            const firstPhoto = albums[albumName][0];
            return (
              <a href={"/anilar?album=" + encodeURIComponent(albumName)} key={albumName} className="group block">
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="aspect-[4/3] w-full rounded-xl overflow-hidden mb-4 relative">
                    <img src={firstPhoto.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded-lg shadow">
                      {albums[albumName].length} Fotoğraf
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-800 text-center truncate px-2">{albumName}</h3>
                </div>
              </a>
            );
          })}
          
          <div className="bg-slate-50 rounded-2xl p-6 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center hover:bg-pink-50 hover:border-pink-300 transition-all cursor-pointer group min-h-[200px]">
            <a href="/anilar" className="flex flex-col items-center justify-center w-full h-full">
              <div className="w-16 h-16 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center text-3xl font-black mb-4 group-hover:scale-110 transition-transform group-hover:bg-pink-100 group-hover:text-pink-500">
                +
              </div>
              <h3 className="font-bold text-xl text-slate-800">Tüm Anılar</h3>
              <p className="text-sm text-slate-500 mt-2">Daha fazla albüm için tıklayın</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}