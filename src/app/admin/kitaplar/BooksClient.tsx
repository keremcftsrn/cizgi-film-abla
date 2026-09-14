'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function BooksClient({ initialBooks }: { initialBooks: any[] }) {
  const [books, setBooks] = useState(initialBooks);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('100');
  const [stock, setStock] = useState('10');
  const [ageGroup, setAgeGroup] = useState('3-6 Yaş');
  const [shopierUrl, setShopierUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setPrice('100');
    setStock('10');
    setAgeGroup('3-6 Yaş');
    setShopierUrl('');
    setFile(null);
    setCoverUrl(null);
  };

  const editBook = (book: any) => {
    setEditingId(book.id);
    setTitle(book.title);
    setPrice(book.price.toString());
    setStock(book.stock.toString());
    setAgeGroup(book.ageGroup);
    setShopierUrl(book.shopierUrl || '');
    setCoverUrl(book.coverUrl);
    setFile(null);
  };

  const deleteBook = async (id: number) => {
    if(!confirm('Bu kitabı silmek istediğinize emin misiniz?')) return;
    try {
      const res = await fetch('/api/admin/books?id='+id, { method: 'DELETE' });
      const data = await res.json();
      if(res.ok) {
        setBooks(books.filter(b => b.id !== id));
        router.refresh();
      } else {
        alert(data.error || 'Silinirken hata oluştu');
      }
    } catch(err) {
      alert('Bağlantı hatası');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      let finalCoverUrl = coverUrl;
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error } = await supabase.storage.from('images').upload(fileName, file);
        if (error) throw error;
        const { data } = supabase.storage.from('images').getPublicUrl(fileName);
        finalCoverUrl = data.publicUrl;
      }

      const payload = { id: editingId, title, price, stock, ageGroup, shopierUrl, coverUrl: finalCoverUrl };
      
      const res = await fetch('/api/admin/books', {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if(res.ok) {
        const savedBook = await res.json();
        if(editingId) {
          setBooks(books.map(b => b.id === savedBook.id ? savedBook : b));
        } else {
          setBooks([savedBook, ...books]);
        }
        resetForm();
        router.refresh();
        alert('Başarıyla kaydedildi!');
      } else {
        alert('Kaydedilirken hata oluştu.');
      }
    } catch(err) {
      console.error(err);
      alert('Fotoğraf yüklenemedi!');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      
      {/* Form Alanı */}
      <div className="w-full lg:w-1/3">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">{editingId ? 'Kitabı Düzenle' : 'Yeni Kitap Ekle'}</h2>
            {editingId && (
              <button type="button" onClick={resetForm} className="text-sm text-pink-500 underline">İptal</button>
            )}
          </div>
          
          <form onSubmit={handleSave}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Kitap Adı</label>
              <input required value={title} onChange={e=>setTitle(e.target.value)} className="w-full border rounded-lg p-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Fiyat (TL)</label>
                <input type="number" required value={price} onChange={e=>setPrice(e.target.value)} className="w-full border rounded-lg p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Stok</label>
                <input type="number" required value={stock} onChange={e=>setStock(e.target.value)} className="w-full border rounded-lg p-2" />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Yaş Grubu</label>
              <select value={ageGroup} onChange={e=>setAgeGroup(e.target.value)} className="w-full border rounded-lg p-2">
                <option>0-3 Yaş</option>
                <option>3-6 Yaş</option>
                <option>6-9 Yaş</option>
                <option>9-12 Yaş</option>
                <option>Her Yaş</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-purple-600">Shopier Satış Linki (İsteğe Bağlı)</label>
              <input value={shopierUrl} onChange={e=>setShopierUrl(e.target.value)} placeholder="https://www.shopier.com/..." className="w-full border border-purple-200 rounded-lg p-2" />
              <p className="text-[10px] text-slate-500 mt-1">Eğer eklerseniz, sepete gitmek yerine direkt Shopier'e yönlendirilir.</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">Kapak Fotoğrafı</label>
              {coverUrl && !file && <img src={coverUrl} className="w-20 h-24 object-cover rounded-md mb-2" />}
              <input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0] || null)} className="w-full border rounded-lg p-2 text-sm" />
            </div>

            <button disabled={saving} type="submit" className="w-full bg-pink-500 text-white font-bold py-3 rounded-xl hover:bg-pink-600 transition">
              {saving ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
          </form>
        </div>
      </div>

      {/* Liste Alanı */}
      <div className="w-full lg:w-2/3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {books.map(book => (
            <div key={book.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex gap-4">
              {book.coverUrl ? (
                <img src={book.coverUrl} className="w-20 h-28 object-cover rounded-lg shadow-sm" />
              ) : (
                <div className="w-20 h-28 bg-slate-100 rounded-lg flex items-center justify-center text-xs text-slate-400">Görsel Yok</div>
              )}
              
              <div className="flex-1 flex flex-col">
                <h3 className="font-bold text-slate-800 leading-tight mb-1">{book.title}</h3>
                <div className="flex gap-2 text-xs text-slate-500 mb-2">
                  <span className="bg-slate-100 px-2 py-1 rounded-md">{book.ageGroup}</span>
                  <span className="bg-pink-50 px-2 py-1 rounded-md text-pink-600 font-bold">{book.price} ₺</span>
                </div>
                {book.shopierUrl && (
                  <span className="text-[10px] text-purple-600 bg-purple-50 px-2 py-1 rounded mb-2 inline-block self-start">Shopier Aktif</span>
                )}
                
                <div className="mt-auto flex gap-2">
                  <button onClick={() => editBook(book)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg text-sm font-medium transition">
                    Düzenle
                  </button>
                  <button onClick={() => deleteBook(book.id)} className="bg-red-50 hover:bg-red-100 text-red-500 px-3 rounded-lg text-sm transition">
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
          {books.length === 0 && (
            <div className="col-span-full p-10 text-center text-slate-500">
              Henüz hiç kitap eklenmemiş.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
