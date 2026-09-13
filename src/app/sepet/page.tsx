"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, CreditCard } from "lucide-react";

export default function Sepet() {
  return (
    <div className="min-h-screen bg-[#fff1f2] pt-32 pb-24 px-4 relative overflow-hidden">
      
      <div className="max-w-4xl mx-auto mb-8 relative z-10">
        <Link href="/kitaplar" className="inline-flex items-center gap-2 text-pink-600 font-bold hover:text-pink-700 transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-pink-100">
          <ArrowLeft size={20} />
          Kitap Dükkanına Dön
        </Link>
      </div>

      <div className="max-w-4xl mx-auto text-center mt-4">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md border-4 border-pink-200">
          <ShoppingCart size={40} className="text-pink-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-black text-slate-800 mb-4">
          Sepetiniz
        </h1>
        <p className="text-lg text-slate-600 font-medium mb-12">
          Seçtiğiniz masal kitapları burada sizi bekliyor!
        </p>
        
        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border-4 border-white">
          <div className="flex flex-col items-center justify-center py-10 text-slate-400">
            <span className="text-6xl mb-4">🛒</span>
            <h3 className="font-display font-bold text-2xl text-slate-600 mb-2">Sepetiniz şu an boş</h3>
            <p className="mb-8">Hemen kitap dükkanına gidip kendinize veya sevdiklerinize imzalı bir kitap hediye edebilirsiniz.</p>
            
            <Link href="/kitaplar" className="px-8 py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full font-display font-bold text-xl shadow-lg hover:scale-105 transition-transform">
              Kitapları Keşfet
            </Link>
          </div>
          
          {/* Gelecekte eklenecek Shopier Butonu için yer tutucu */}
          <div className="mt-8 pt-8 border-t-2 border-dashed border-slate-200 opacity-50">
            <button disabled className="w-full py-4 rounded-2xl bg-slate-200 text-slate-500 font-display font-bold text-xl flex items-center justify-center gap-2">
              <CreditCard size={24} />
              Shopier ile Güvenle Öde
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
