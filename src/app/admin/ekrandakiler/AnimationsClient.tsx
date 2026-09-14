'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AnimationsClient({ initialAnimations }: { initialAnimations: any[] }) {
  const [animations, setAnimations] = useState(initialAnimations);
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch('/api/admin/animations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, videoUrl })
    });
    if(res.ok) {
      const saved = await res.json();
      setAnimations([saved, ...animations]);
      setTitle('');
      setVideoUrl('');
      router.refresh();
    }
    setSaving(false);
  };

  const deleteAnim = async (id: number) => {
    if(!confirm('Silmek istediğinize emin misiniz?')) return;
    const res = await fetch('/api/admin/animations?id='+id, { method: 'DELETE' });
    if(res.ok) {
      setAnimations(animations.filter(a => a.id !== id));
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-1/3">
        <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-6">
          <h2 className="text-xl font-bold mb-4">Yeni Çizgi Film / Video Ekle</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Başlık</label>
            <input required value={title} onChange={e=>setTitle(e.target.value)} className="w-full border rounded-lg p-2" />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">YouTube Linki (Embed)</label>
            <input required value={videoUrl} onChange={e=>setVideoUrl(e.target.value)} placeholder="https://www.youtube.com/embed/..." className="w-full border rounded-lg p-2" />
          </div>
          <button disabled={saving} type="submit" className="w-full bg-pink-500 text-white font-bold py-3 rounded-xl hover:bg-pink-600 transition">
            {saving ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </form>
      </div>

      <div className="w-full lg:w-2/3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {animations.map(a => (
            <div key={a.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
              <iframe src={a.videoUrl} className="w-full aspect-video rounded-xl mb-4" />
              <h3 className="font-bold text-slate-800 mb-2">{a.title}</h3>
              <button onClick={()=>deleteAnim(a.id)} className="bg-red-50 text-red-500 px-4 py-2 rounded-lg text-sm w-full">Sil</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}