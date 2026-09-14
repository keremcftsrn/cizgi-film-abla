import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://olewlqddwoyuyjtkdisz.supabase.co';
const supabaseKey = 'sb_publishable_Y8-3Nfjs4G_PQX15GcuLEg_K4-RXpoE';

export const supabase = createClient(supabaseUrl, supabaseKey);