'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AdminGenel() {
  const [heroTitle, setHeroTitle] = useState('Merhaba, Ben Elif Çiftçi');
  const [heroSubtitle, setHeroSubtitle] = useState('Yıllardır çocukların dünyasına hikayelerle, renklerle ve neşeyle dokunan bir yazar ve senaristim.');
  const [aboutText, setAboutText] = useState('Sadece sayfalarda değil, ekranlarda da varım! Kahramanlarımı evlerinize misafir ediyor, hayal gücünüze eşlik ediyorum.');
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/admin/settings').then(res => res.json()).then(data => {
      if (data.heroTitle) setHeroTitle(data.heroTitle);
      if (data.heroSubtitle) setHeroSubtitle(data.heroSubtitle);
      if (data.aboutText) setAboutText(data.aboutText);
      if (data.heroImage) setHeroImage(data.heroImage);
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      let coverUrl = heroImage;
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = ${Math.random()}.;
        const filePath = ${fileName};
        
        const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);
        if (uploadError) throw uploadError;
        
        const { data } = supabase.storage.from('images').getPublicUrl(filePath);
        coverUrl = data.publicUrl;
        setHeroImage(coverUrl);
      }

      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ heroTitle, heroSubtitle, aboutText, heroImage: coverUrl })
      });
      
      if(res.ok) {
        alert("Başarıyla güncellendi!");
        router.refresh();
      } else {
        alert("Kaydederken bir sorun oluştu.");
      }
    } catch(err) {
      console.error(err);
      alert("Fotoğraf yüklenemedi. Supabase ayarlarını kontrol et.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="pb-24">
      <h1 className="text-3xl font-display font-black text-slate-800 mb-8">Ana Sayfa Ayarları 🏠</h1>

      <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Ana Sayfa Fotoğrafı</label>
          {heroImage && <img src={heroImage} className="w-32 h-32 object-cover rounded-2xl mb-3 border-2 border-pink-200" />}
          <input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0] || null)} className="w-full border rounded-lg p-2" />
          <p className="text-xs text-slate-500 mt-1">Yeni fotoğraf seçerseniz eskisi değişir.</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Ana Başlık</label>
          <input required value={heroTitle} onChange={e=>setHeroTitle(e.target.value)} className="w-full border rounded-lg p-2" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Alt Başlık (Kısa Özgeçmiş 1)</label>
          <textarea required rows={3} value={heroSubtitle} onChange={e=>setHeroSubtitle(e.target.value)} className="w-full border rounded-lg p-2" />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Alt Başlık (Kısa Özgeçmiş 2)</label>
          <textarea rows={3} value={aboutText} onChange={e=>setAboutText(e.target.value)} className="w-full border rounded-lg p-2" />
        </div>

        <button disabled={saving} type="submit" className="w-full bg-pink-500 text-white font-bold py-3 rounded-xl hover:bg-pink-600 disabled:opacity-50 transition">
          {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
        </button>
      </form>
    </div>
  );
}
