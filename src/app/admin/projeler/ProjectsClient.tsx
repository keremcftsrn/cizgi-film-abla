'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function ProjectsClient({ initialProjects }: { initialProjects: any[] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateText, setDateText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      let imageUrl = null;
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const formData = new FormData(); formData.append('file', file); const uploadRes = await fetch('/api/admin/upload', { method: 'POST', body: formData }); const uploadData = await uploadRes.json(); if(!uploadRes.ok) throw new Error(uploadData.error);
        
        const data = { publicUrl: uploadData.url };
        imageUrl = data.publicUrl;
      }

      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, dateText, linkUrl, imageUrl })
      });
      if(res.ok) {
        const saved = await res.json();
        setProjects([saved, ...projects]);
        setTitle('');
        setDescription('');
        setDateText('');
        setLinkUrl('');
        setFile(null);
        router.refresh();
      }
    } catch(err) {
      alert('Yükleme hatası');
    } finally {
      setSaving(false);
    }
  };

  const deleteProject = async (id: number) => {
    if(!confirm('Silmek istediğinize emin misiniz?')) return;
    const res = await fetch('/api/admin/projects?id='+id, { method: 'DELETE' });
    if(res.ok) {
      setProjects(projects.filter(p => p.id !== id));
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-1/3">
        <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-6">
          <h2 className="text-xl font-bold mb-4">Yeni Proje Duyurusu</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Başlık</label>
            <input required value={title} onChange={e=>setTitle(e.target.value)} placeholder="Örn: Yeni Kitap Çıkıyor!" className="w-full border rounded-lg p-2" />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Açıklama</label>
            <textarea value={description} onChange={e=>setDescription(e.target.value)} rows={3} className="w-full border rounded-lg p-2" />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Tarih / Etiket (Örn: Çok Yakında)</label>
            <input value={dateText} onChange={e=>setDateText(e.target.value)} className="w-full border rounded-lg p-2" />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Link (Örn: Bilet linki)</label>
            <input value={linkUrl} onChange={e=>setLinkUrl(e.target.value)} className="w-full border rounded-lg p-2" />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Görsel (İsteğe bağlı)</label>
            <input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0]||null)} className="w-full border rounded-lg p-2" />
          </div>
          
          <button disabled={saving} type="submit" className="w-full bg-pink-500 text-white font-bold py-3 rounded-xl hover:bg-pink-600 transition">
            {saving ? 'Kaydediliyor...' : 'Duyuruyu Yayınla'}
          </button>
        </form>
      </div>

      <div className="w-full lg:w-2/3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map(p => (
            <div key={p.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
              {p.imageUrl && <img src={p.imageUrl} className="w-full h-40 object-cover rounded-xl mb-4" />}
              <div className="flex-1">
                {p.dateText && <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-1 rounded inline-block mb-2">{p.dateText}</span>}
                <h3 className="font-bold text-slate-800 mb-2">{p.title}</h3>
                <p className="text-sm text-slate-600 mb-4">{p.description}</p>
                {p.linkUrl && <a href={p.linkUrl} target="_blank" className="text-pink-500 text-sm font-bold underline block mb-4">Bağlantıya Git &rarr;</a>}
              </div>
              <button onClick={()=>deleteProject(p.id)} className="bg-red-50 text-red-500 px-4 py-2 rounded-lg text-sm w-full mt-auto">Sil</button>
            </div>
          ))}
          {projects.length === 0 && <div className="col-span-full p-10 text-center text-slate-500">Henüz proje eklenmemiş.</div>}
        </div>
      </div>
    </div>
  );
}
