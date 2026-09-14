import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://olewlqddwoyuyjtkdisz.supabase.co';
const supabaseKey = 'sb_publishable_Y8-3Nfjs4G_PQX15GcuLEg_K4-RXpoE';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;

    const { error } = await supabase.storage.from('images').upload(fileName, buffer, {
      contentType: file.type
    });

    if (error) {
      console.error('Supabase upload error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data } = supabase.storage.from('images').getPublicUrl(fileName);
    return NextResponse.json({ url: data.publicUrl });
  } catch (err: any) {
    console.error('Upload handler error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
