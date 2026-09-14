import { PrismaClient } from '@prisma/client';
import AnimationsClient from './AnimationsClient';
export const dynamic = 'force-dynamic';
const prisma = new PrismaClient();

export default async function AdminEkrandakiler() {
  const animations = await prisma.animation.findMany({ orderBy: { createdAt: 'desc' } });
  return (
    <div className="pb-24">
      <h1 className="text-3xl font-display font-black text-slate-800 mb-8">Ekrandakiler 📺</h1>
      <AnimationsClient initialAnimations={animations} />
    </div>
  );
}