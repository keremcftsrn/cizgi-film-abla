import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-white p-4 font-display font-bold text-xl border-b border-slate-200 flex justify-between items-center">
        <span>Admin Panel</span>
        <Link href="/" className="text-sm text-pink-500">Siteye Dön</Link>
      </div>
      
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white border-r border-slate-200 p-6 hidden md:flex flex-col gap-6">
        <h2 className="font-display font-black text-2xl text-slate-800">Admin</h2>
        <nav className="flex flex-col gap-2 font-medium">
          <Link href="/admin" className="p-3 rounded-xl hover:bg-slate-50 transition-colors">Ana Sayfa</Link>
          <Link href="/admin/kitaplar" className="p-3 rounded-xl hover:bg-slate-50 transition-colors">Kitaplar</Link>
          <Link href="/admin/siparisler" className="p-3 rounded-xl hover:bg-slate-50 transition-colors">Siparişler</Link>
          <Link href="/admin/anilar" className="p-3 rounded-xl hover:bg-slate-50 transition-colors">Anılar / Fotoğraflar</Link>
        </nav>
        <Link href="/" className="mt-auto text-pink-500 font-bold p-3">← Siteye Dön</Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-10 max-h-screen overflow-y-auto">
        {children}
      </div>
      
      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 w-full bg-white border-t border-slate-200 flex justify-around p-3 pb-safe z-50 text-xs font-bold text-slate-600">
        <Link href="/admin" className="flex flex-col items-center p-2"><span className="text-xl mb-1">🏠</span>Ana</Link>
        <Link href="/admin/kitaplar" className="flex flex-col items-center p-2"><span className="text-xl mb-1">📚</span>Kitap</Link>
        <Link href="/admin/siparisler" className="flex flex-col items-center p-2"><span className="text-xl mb-1">📦</span>Sipariş</Link>
        <Link href="/admin/anilar" className="flex flex-col items-center p-2"><span className="text-xl mb-1">📸</span>Anı</Link>
      </div>
    </div>
  );
}
