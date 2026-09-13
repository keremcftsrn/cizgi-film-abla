'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AdminBooks() {
  const [books, setBooks] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  
  // Form state
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('100');
  const [ageGroup, setAgeGroup] = useState('3-6 Yaş');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetch('/api/books').then(res => res.json()).then(data => setBooks(data));
  }, []);

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    try {
      let coverUrl = null;
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = ${Math.random()}.;
        const filePath = ${fileName};
        
        const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);
        if (uploadError) throw uploadError;
        
        const { data } = supabase.storage.from('images').getPublicUrl(filePath);
        coverUrl = data.publicUrl;
      }

      const res = await fetch('/api/admin/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, price: Number(price), stock: Number(stock), ageGroup, coverUrl })
      });
      
      if(res.ok) {
        setIsAdding(false);
        setTitle(''); setPrice(''); setFile(null);
        const updatedBooks = await fetch('/api/books').then(r => r.json());
        setBooks(updatedBooks);
        router.refresh();
      } else {
        alert("Eklerken bir sorun oluştu.");
      }
    } catch(err) {
      console.error(err);
      alert("Fotoğraf yüklenemedi. Lütfen Supabase Storage ayarlarını kontrol et.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="pb-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-black text-slate-800">Kitaplar 📚</h1>
        <button onClick={() => setIsAdding(!isAdding)} className="bg-pink-500 text-white px-5 py-2 rounded-xl font-bold shadow-sm hover:bg-pink-600 transition">
          {isAdding ? 'İptal' : '+ Yeni Kitap'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAddBook} className="bg-white p-6 rounded-2xl shadow-sm mb-8 border border-slate-200">
          <h2 className="font-bold text-xl mb-4">Yeni Kitap Ekle</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Kitap Adı</label>
              <input required value={title} onChange={e=>setTitle(e.target.value)} className="w-full border rounded-lg p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Fiyat (TL)</label>
              <input required type="number" value={price} onChange={e=>setPrice(e.target.value)} className="w-full border rounded-lg p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Yaş Grubu</label>
              <select value={ageGroup} onChange={e=>setAgeGroup(e.target.value)} className="w-full border rounded-lg p-2">
                <option>0-3 Yaş</option>
                <option>3-6 Yaş</option>
                <option>6-9 Yaş</option>
                <option>9-12 Yaş</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Stok (Adet)</label>
              <input required type="number" value={stock} onChange={e=>setStock(e.target.value)} className="w-full border rounded-lg p-2" />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Kapak Fotoğrafı (Telefondan seç)</label>
            <input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0] || null)} className="w-full border rounded-lg p-2" />
          </div>
          <button disabled={uploading} type="submit" className="w-full bg-slate-800 text-white font-bold py-3 rounded-xl hover:bg-slate-700 disabled:opacity-50">
            {uploading ? 'Yükleniyor...' : 'Kaydet ve Yayınla'}
          </button>
        </form>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-slate-600">Foto</th>
              <th className="p-4 font-semibold text-slate-600">Kitap Adı</th>
              <th className="p-4 font-semibold text-slate-600">Fiyat</th>
              <th className="p-4 font-semibold text-slate-600">Stok</th>
            </tr>
          </thead>
          <tbody>
            {books.map(b => (
              <tr key={b.id} className="border-b last:border-0 hover:bg-slate-50">
                <td className="p-4">
                  {b.coverUrl ? <img src={b.coverUrl} className="w-12 h-16 object-cover rounded shadow-sm" /> : <div className="w-12 h-16 bg-slate-100 rounded flex items-center justify-center text-xl">📖</div>}
                </td>
                <td className="p-4 font-medium text-slate-800">{b.title}</td>
                <td className="p-4 text-emerald-600 font-bold">{b.price} ₺</td>
                <td className="p-4">{b.stock} Adet</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
