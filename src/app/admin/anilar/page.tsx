import { PrismaClient } from '@prisma/client';
import GalleryClient from './GalleryClient';
export const dynamic = 'force-dynamic';
const prisma = new PrismaClient();

export default async function AdminAnilar() {
  const photos = await prisma.gallery.findMany({ orderBy: { createdAt: 'desc' } });
  return (
    <div className="pb-24">
      <h1 className="text-3xl font-display font-black text-slate-800 mb-8">Anılar & Fotoğraflar 📸</h1>
      <GalleryClient initialPhotos={photos} />
    </div>
  );
}