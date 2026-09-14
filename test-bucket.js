fetch('https://olewlqddwoyuyjtkdisz.supabase.co/storage/v1/bucket', {
  headers: {
    'apikey': 'sb_publishable_Y8-3Nfjs4G_PQX15GcuLEg_K4-RXpoE',
    'Authorization': 'Bearer sb_publishable_Y8-3Nfjs4G_PQX15GcuLEg_K4-RXpoE'
  }
}).then(r=>r.json()).then(console.log).catch(console.error);
