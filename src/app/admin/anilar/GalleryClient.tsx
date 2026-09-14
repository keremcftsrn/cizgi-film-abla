'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function GalleryClient({ initialPhotos }: { initialPhotos: any[] }) {
  const [photos, setPhotos] = useState(initialPhotos);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert('Lütfen bir fotoğraf seçin!');
    setSaving(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { error } = await supabase.storage.from('images').upload(fileName, file);
      if (error) throw error;
      const { data } = supabase.storage.from('images').getPublicUrl(fileName);
      
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, imageUrl: data.publicUrl })
      });
      if(res.ok) {
        const saved = await res.json();
        setPhotos([saved, ...photos]);
        setTitle('');
        setFile(null);
        router.refresh();
      }
    } catch(err) {
      alert('Yükleme hatası!');
    } finally {
      setSaving(false);
    }
  };

  const deletePhoto = async (id: number) => {
    if(!confirm('Bu fotoğrafı silmek istediğinize emin misiniz?')) return;
    const res = await fetch('/api/admin/gallery?id='+id, { method: 'DELETE' });
    if(res.ok) {
      setPhotos(photos.filter(p => p.id !== id));
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-1/3">
        <form onSubmit={handleUpload} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-6">
          <h2 className="text-xl font-bold mb-4">Yeni Fotoğraf Yükle</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Fotoğraf Seç</label>
            <input required type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0]||null)} className="w-full border rounded-lg p-2" />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Açıklama (İsteğe bağlı)</label>
            <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Örn: 2025 Tüyap Fuarı" className="w-full border rounded-lg p-2" />
          </div>
          <button disabled={saving} type="submit" className="w-full bg-pink-500 text-white font-bold py-3 rounded-xl hover:bg-pink-600 transition">
            {saving ? 'Yükleniyor...' : 'Fotoğrafı Yükle'}
          </button>
        </form>
      </div>

      <div className="w-full lg:w-2/3">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map(p => (
            <div key={p.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative group">
              <div className="aspect-square w-full">
                <img src={p.imageUrl} className="w-full h-full object-cover" />
              </div>
              {p.title && <div className="p-2 text-xs font-bold text-center border-t border-slate-100 bg-slate-50">{p.title}</div>}
              <button onClick={()=>deletePhoto(p.id)} className="absolute top-2 right-2 bg-white/90 text-red-500 rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-red-500 hover:text-white transition">
                🗑️
              </button>
            </div>
          ))}
          {photos.length === 0 && <div className="col-span-full p-10 text-center text-slate-500">Henüz hiç fotoğraf yüklenmemiş.</div>}
        </div>
      </div>
    </div>
  );
}
