export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-display font-black text-slate-800 mb-8">Panele Hoş Geldin! 👋</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="text-4xl mb-4">📚</div>
          <h3 className="text-slate-500 font-medium mb-1">Toplam Kitap</h3>
          <p className="text-3xl font-bold text-slate-800">3</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="text-4xl mb-4">📦</div>
          <h3 className="text-slate-500 font-medium mb-1">Bekleyen Sipariş</h3>
          <p className="text-3xl font-bold text-slate-800">0</p>
        </div>
      </div>
    </div>
  );
}
