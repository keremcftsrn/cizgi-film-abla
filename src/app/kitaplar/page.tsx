"use client";

import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";

interface Book {
  id: number;
  title: string;
  ageGroup: string;
  price: number;
  stock: number;
}

export default function Kitaplar() {
  const [books, setBooks] = useState<Book[]>([]);
  const [cart, setCart] = useState<{id: number, type: string, name?: string}[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<Record<number, string>>({});
  const [names, setNames] = useState<Record<number, string>>({});
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

  const handleAddToCart = (bookId: number) => {
    const type = selectedTypes[bookId] || "normal";
    const name = type === "imzali" ? names[bookId] : undefined;
    
    if (type === "imzali" && !name) {
      alert("Lütfen kime imzalanacağını yazın! ✍️");
      return;
    }
    
    setCart([...cart, { id: bookId, type, name }]);
    alert("Kitap sepete eklendi! 🛒 (Toplam: " + (cart.length + 1) + ")");
  };

  if (loading) {
    return <div className="min-h-screen bg-[#fff1f2] flex items-center justify-center font-display text-2xl text-pink-500">Kitaplar Yükleniyor... 📚</div>;
  }

  return (
    <div className="min-h-screen bg-[#fff1f2] pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <span className="text-6xl mb-4 block animate-bounce">📚</span>
        <h1 className="text-4xl md:text-5xl font-display font-black text-slate-800 mb-4">
          Kitap Dükkanı
        </h1>
        <p className="text-lg text-slate-600 font-medium">
          İstediğiniz kitabı seçin, "Normal" ya da "İmzalı" olarak sepete ekleyin!
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <motion.div
            key={book.id}
            whileHover={{ y: -10 }}
            className="bg-white border-4 border-pink-100 rounded-[2.5rem] p-6 shadow-xl flex flex-col"
          >
            <div className="w-full h-64 bg-slate-100 rounded-2xl mb-6 shadow-inner flex items-center justify-center relative overflow-hidden">
               <span className="text-slate-400 font-bold font-display text-lg">Kapak Görseli</span>
               <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-pink-600 font-bold text-sm shadow-sm border-2 border-pink-100 font-display">
                 {book.price} ₺
               </div>
               {book.stock < 10 && (
                 <div className="absolute bottom-3 left-3 bg-red-100 px-3 py-1 rounded-full text-red-600 font-bold text-xs shadow-sm border-2 border-red-200">
                   Son {book.stock} Adet!
                 </div>
               )}
            </div>
            
            <h3 className="font-display font-black text-2xl text-slate-800 mb-1">{book.title}</h3>
            <p className="text-pink-500 font-bold text-sm mb-6">{book.ageGroup}</p>
            
            {/* Seçenekler */}
            <div className="mt-auto space-y-4">
              
              <div className="flex gap-4">
                <label className={`flex-1 p-3 rounded-xl border-2 cursor-pointer transition-colors text-center font-bold ${selectedTypes[book.id] !== "imzali" ? 'bg-pink-50 border-pink-400 text-pink-600' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                  <input type="radio" name={`type-${book.id}`} className="hidden" 
                    onChange={() => setSelectedTypes({...selectedTypes, [book.id]: "normal"})}
                    checked={selectedTypes[book.id] !== "imzali"}
                  />
                  Normal
                </label>
                <label className={`flex-1 p-3 rounded-xl border-2 cursor-pointer transition-colors text-center font-bold ${selectedTypes[book.id] === "imzali" ? 'bg-purple-50 border-purple-400 text-purple-600' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                  <input type="radio" name={`type-${book.id}`} className="hidden" 
                    onChange={() => setSelectedTypes({...selectedTypes, [book.id]: "imzali"})}
                  />
                  İmzalı (+20 ₺)
                </label>
              </div>

              {selectedTypes[book.id] === "imzali" && (
                <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}}>
                  <input 
                    type="text" 
                    placeholder="✍️ Kime imzalanacak?" 
                    value={names[book.id] || ""}
                    onChange={(e) => setNames({...names, [book.id]: e.target.value})}
                    className="w-full p-3 bg-purple-50/50 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 font-medium"
                  />
                </motion.div>
              )}

              <button 
                onClick={() => handleAddToCart(book.id)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-400 to-purple-400 text-white font-display font-bold text-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg"
              >
                <ShoppingCart size={24} />
                Sepete Ekle
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

