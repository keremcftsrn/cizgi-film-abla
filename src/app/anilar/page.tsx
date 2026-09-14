'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

function AnilarContent() {
  const searchParams = useSearchParams();
  const albumFilter = searchParams.get('album');
  const [photos, setPhotos] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/gallery').then(r=>r.json()).then(data=>setPhotos(data));
  }, []);

  const filteredPhotos = albumFilter ? photos.filter(p => p.title === albumFilter || (!p.title && albumFilter === 'Diğer Anılar')) : photos;

  return (
    <div className="min-h-screen bg-[#fefce8] pt-32 pb-24 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto mb-8 relative z-10 flex gap-4">
        <Link href="/" className="inline-flex items-center gap-2 text-yellow-600 font-bold hover:text-yellow-700 transition bg-white px-4 py-2 rounded-full shadow-sm border border-yellow-100">
          &larr; Ana Sayfaya Dön
        </Link>
        {albumFilter && (
          <Link href="/anilar" className="inline-flex items-center gap-2 text-pink-600 font-bold hover:text-pink-700 transition bg-white px-4 py-2 rounded-full shadow-sm border border-pink-100">
            Tüm Albümleri Gör
          </Link>
        )}
      </div>

      <div className="max-w-6xl mx-auto mb-16 text-center mt-4">
        <span className="text-6xl mb-4 block animate-bounce">📸</span>
        <h1 className="text-4xl md:text-6xl font-display font-black text-slate-800 mb-4">
          {albumFilter ? albumFilter : 'Çocuklarımızla Birlikte'}
        </h1>
        <p className="text-lg md:text-xl text-slate-600 font-medium">
          {albumFilter ? 'Bu anıya ait fotoğraflar' : 'Tüm anılarımız ve etkinliklerimiz'}
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {filteredPhotos.map((photo, idx) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="w-full bg-white rounded-3xl p-4 shadow-xl border-4 border-white"
          >
            <div className="aspect-square w-full rounded-2xl overflow-hidden shadow-inner">
               <img src={photo.imageUrl} className="w-full h-full object-cover" />
            </div>
            {!albumFilter && photo.title && (
              <div className="text-center font-bold text-slate-700 font-display text-xl mt-4">
                {photo.title}
              </div>
            )}
          </motion.div>
        ))}
        {filteredPhotos.length === 0 && <div className="col-span-full text-center text-slate-500">Bu albümde fotoğraf bulunamadı.</div>}
      </div>
    </div>
  );
}

export default function Anilar() {
  return (
    <Suspense fallback={<div className="p-20 text-center">Yükleniyor...</div>}>
      <AnilarContent />
    </Suspense>
  );
}