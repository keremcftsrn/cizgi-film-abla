'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminGenel() {
  const [heroTitle, setHeroTitle] = useState('');
  const [heroSubtitle, setHeroSubtitle] = useState('');
  const [aboutText, setAboutText] = useState('');
  const [socialInstagram, setSocialInstagram] = useState('');
  const [socialYoutube, setSocialYoutube] = useState('');
  const [socialTiktok, setSocialTiktok] = useState('');
  const [socialLinkedin, setSocialLinkedin] = useState('');
  const [socialTwitter, setSocialTwitter] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/admin/settings').then(r => r.json()).then(data => {
      if(data) {
        setHeroTitle(data.heroTitle || '');
        setHeroSubtitle(data.heroSubtitle || '');
        setAboutText(data.aboutText || '');
        setSocialInstagram(data.socialInstagram || '');
        setSocialYoutube(data.socialYoutube || '');
        setSocialTiktok(data.socialTiktok || '');
        setSocialLinkedin(data.socialLinkedin || '');
        setSocialTwitter(data.socialTwitter || '');
        setHeroImage(data.heroImage || null);
      }
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      let finalImageUrl = heroImage;
      
      // Resim varsa önce kendi sunucumuza gönderiyoruz (Engelleri aşmak için)
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        
        const uploadRes = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData
        });
        
        const uploadData = await uploadRes.json();
        if(!uploadRes.ok) throw new Error(uploadData.error || 'Resim yüklenemedi');
        finalImageUrl = uploadData.url;
      }

      // Metinleri ve resim linkini veritabanına kaydet
      const payload = {
        heroTitle,
        heroSubtitle,
        aboutText,
        heroImage: finalImageUrl,
        socialInstagram,
        socialYoutube,
        socialTiktok,
        socialLinkedin,
        socialTwitter
      };

      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if(res.ok) {
        alert('Başarıyla güncellendi!');
        router.refresh();
      } else {
        alert('Kaydederken bir sorun oluştu.');
      }
    } catch(err: any) {
      console.error(err);
      alert('Hata: ' + (err.message || 'Bilinmeyen bir hata oluştu.'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-display font-black text-slate-800 mb-8">Ana Sayfa Ayarları 🏠</h1>
      
      <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 text-slate-700">Ana Sayfa Fotoğrafı</label>
          {heroImage && !file && (
            <img src={heroImage} alt="Current" className="w-24 h-24 object-cover rounded-xl mb-3 shadow-sm" />
          )}
          <input 
            type="file" 
            accept="image/*"
            onChange={e => setFile(e.target.files?.[0] || null)}
            className="w-full border border-slate-300 rounded-lg p-2 text-sm"
          />
          <p className="text-xs text-slate-500 mt-1">Yeni fotoğraf seçerseniz eskisi değişir.</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-slate-700">Ana Başlık</label>
          <input 
            value={heroTitle}
            onChange={e => setHeroTitle(e.target.value)}
            className="w-full border border-slate-300 rounded-lg p-3"
            placeholder="Örn: Merhaba, Ben Elif Çiftçi"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-slate-700">Alt Başlık (Kısa Özgeçmiş 1)</label>
          <textarea 
            value={heroSubtitle}
            onChange={e => setHeroSubtitle(e.target.value)}
            className="w-full border border-slate-300 rounded-lg p-3"
            rows={3}
          />
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium mb-1 text-slate-700">Alt Başlık (Kısa Özgeçmiş 2)</label>
          <textarea 
            value={aboutText}
            onChange={e => setAboutText(e.target.value)}
            className="w-full border border-slate-300 rounded-lg p-3"
            rows={3}
          />
        </div>

        

              <div className="mt-12 pt-8 border-t border-slate-200">
          <h2 className="text-xl font-bold mb-6 text-slate-800">Sosyal Medya Linkleri</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-slate-700">Instagram URL</label>
            <input 
              value={socialInstagram}
              onChange={e => setSocialInstagram(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-3"
              placeholder="https://instagram.com/cizgifilmabla"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-slate-700">YouTube URL</label>
            <input 
              value={socialYoutube}
              onChange={e => setSocialYoutube(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-3"
              placeholder="https://youtube.com/@cizgifilmabla"
            />
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium mb-1 text-slate-700">TikTok URL</label>
            <input 
              value={socialTiktok}
              onChange={e => setSocialTiktok(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-3"
              placeholder="https://tiktok.com/@cizgifilmabla"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-slate-700">LinkedIn URL</label>
            <input 
              value={socialLinkedin}
              onChange={e => setSocialLinkedin(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-3"
              placeholder="https://linkedin.com/in/elifciftci"
            />
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium mb-1 text-slate-700">Twitter (X) URL</label>
            <input 
              value={socialTwitter}
              onChange={e => setSocialTwitter(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-3"
              placeholder="https://twitter.com/cizgifilmabla"
            />
          </div>
        </div>

        
              <button 
          type="submit" 
          disabled={saving}
          className="w-full bg-pink-500 text-white font-bold py-4 rounded-xl hover:bg-pink-600 transition shadow-md disabled:opacity-50"
        >
          {saving ? 'Kaydediliyor...' : 'Tüm Ayarları Kaydet'}
        </button>
      </form>
    </div>
  );
}