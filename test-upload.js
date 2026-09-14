const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(
  'https://olewlqddwoyuyjtkdisz.supabase.co',
  'sb_publishable_Y8-3Nfjs4G_PQX15GcuLEg_K4-RXpoE'
);

async function testUpload() {
  const fileData = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 1, 0, 0, 0, 1, 8, 6, 0, 0, 0, 31, 21, 196, 137, 0, 0, 0, 11, 73, 68, 65, 84, 8, 153, 99, 248, 15, 4, 0, 9, 251, 3, 253, 227, 85, 242, 156, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130]);

  const { data, error } = await supabase.storage.from('images').upload('test.png', fileData, {
    contentType: 'image/png',
    upsert: true
  });
  
  if (error) {
    console.error('UPLOAD ERROR:', error);
  } else {
    console.log('UPLOAD SUCCESS:', data);
  }
}
testUpload();
