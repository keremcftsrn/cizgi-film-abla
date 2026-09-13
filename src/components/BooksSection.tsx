"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Book {
  id: number;
  title: string;
  ageGroup: string;
  price: number;
  stock: number;
}

export default function BooksSection() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/books')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setBooks(data);
        } else {
          setBooks([
            { id: 1, title: 'Gökyüzü Macerası', ageGroup: '3-6 Yaş', price: 150, stock: 50 },
            { id: 2, title: 'Ormanın Sırrı', ageGroup: '6-9 Yaş', price: 180, stock: 30 },
            { id: 3, title: 'Küçük Yıldız', ageGroup: '3-6 Yaş', price: 120, stock: 100 }
          ]);
        }
        setLoading(false);
      })
      .catch(() => {
        setBooks([
          { id: 1, title: 'Gökyüzü Macerası', ageGroup: '3-6 Yaş', price: 150, stock: 50 },
          { id: 2, title: 'Ormanın Sırrı', ageGroup: '6-9 Yaş', price: 180, stock: 30 },
          { id: 3, title: 'Küçük Yıldız', ageGroup: '3-6 Yaş', price: 120, stock: 100 }
        ]);
        setLoading(false);
      });
  }, []);

  return (
    <section className="w-full bg-white py-24 px-4 relative" id="kitaplar">
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <motion.div 
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-6 py-2 bg-pink-50 rounded-full shadow-sm text-pink-600 font-bold mb-4 border-2 border-pink-200 font-display text-lg"
        >
          <span className="text-2xl">📚</span> Kitap Dükkanı
        </motion.div>
        <h2 className="text-3xl md:text-5xl font-display font-black text-slate-800 mb-4">
          Hayal Dünyasına Açılan Kapı
        </h2>
        <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
          Kitapların tamamını incelemek ve detaylı alışveriş yapmak için tüm kitapları görüntüle!
        </p>
      </div>

      {loading ? (
        <div className="text-center font-display text-2xl text-pink-500 py-10">Kitaplar Yükleniyor... 📚</div>
      ) : (
        <div className="flex overflow-x-auto gap-8 pb-12 px-4 md:px-10 snap-x snap-mandatory hide-scrollbar">
          {books.map((book) => (
            <motion.div
              key={book.id}
              whileHover={{ y: -10 }}
              className="snap-center shrink-0 w-[280px] bg-white border-4 border-pink-100 rounded-[2.5rem] p-6 shadow-xl flex flex-col"
            >
              <div className="w-full h-64 bg-slate-100 rounded-2xl mb-6 shadow-inner flex items-center justify-center relative overflow-hidden">
                 <span className="text-6xl">📖</span>
                 <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-pink-600 font-bold text-sm shadow-sm border-2 border-pink-100">
                   {book.price} ₺
                 </div>
              </div>
              
              <h3 className="font-display font-black text-2xl text-slate-800 mb-1">{book.title}</h3>
              <p className="text-pink-500 font-bold text-sm mb-6">{book.ageGroup}</p>
              
              <div className="mt-auto">
                <Link href={`/kitaplar`} className="w-full py-4 rounded-2xl bg-pink-50 text-pink-600 border-2 border-pink-200 font-display font-bold text-lg flex items-center justify-center hover:bg-pink-100 transition-colors">
                  İncele & Satın Al
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      
      <div className="flex justify-center mt-8">
        <Link href="/kitaplar" className="px-10 py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full font-display font-bold text-xl shadow-lg shadow-pink-200 hover:scale-105 transition-transform flex items-center gap-3 border-4 border-white">
          <span className="text-2xl">🛍️</span> Tüm Kitapları Gör
        </Link>
      </div>
    </section>
  );
}

