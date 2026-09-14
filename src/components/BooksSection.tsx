'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function BooksSection() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/books')
      .then(r => r.json())
      .then(data => {
        setBooks(data);
        setLoading(false);
      });
  }, []);

  return (
    <section className="w-full bg-[#fefce8] pt-16 pb-24 relative overflow-hidden">
      {/* Arkaplan Şekilleri */}
      <div className="absolute top-10 left-5 text-yellow-300 opacity-50 animate-bounce">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
      </div>
      <div className="absolute bottom-20 right-10 text-pink-300 opacity-40 animate-pulse">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-block bg-white px-6 py-2 rounded-full shadow-sm border-2 border-yellow-200 text-yellow-600 font-bold mb-4"
          >
            📚 Kitaplık
          </motion.div>
          <h2 className="font-display text-4xl md:text-5xl font-black text-slate-800">
            Masal Dünyasına <span className="text-pink-500">Yolculuk</span>
          </h2>
        </div>

        {loading ? (
          <div className="text-center text-slate-500 font-medium py-10">Kitaplar yükleniyor...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {books.slice(0, 3).map((book, index) => (
              <motion.div 
                key={book.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-[2rem] p-4 shadow-lg hover:shadow-xl transition-all border-2 border-white hover:border-pink-200 group"
              >
                <div className="relative w-full aspect-[3/4] rounded-[1.5rem] overflow-hidden mb-4 bg-slate-50">
                  {book.coverUrl ? (
                    <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300 font-display">Görsel Yok</div>
                  )}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-pink-500 shadow-sm">
                    {book.ageGroup}
                  </div>
                </div>

                <div className="px-2">
                  <h3 className="font-display font-bold text-xl text-slate-800 mb-1 line-clamp-2 leading-tight">
                    {book.title}
                  </h3>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-2xl font-black text-pink-500">{book.price} ₺</span>
                    
                    {book.shopierUrl ? (
                      <a 
                        href={book.shopierUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-2 rounded-xl font-bold transition shadow-sm hover:shadow-md"
                      >
                        Satın Al
                      </a>
                    ) : (
                      <button className="bg-pink-100 hover:bg-pink-200 text-pink-600 px-5 py-2 rounded-xl font-bold transition">
                        Sepete Ekle
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

