import { PrismaClient } from '@prisma/client';
import BooksClient from './BooksClient';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export default async function AdminKitaplar() {
  const books = await prisma.book.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="pb-24">
      <h1 className="text-3xl font-display font-black text-slate-800 mb-8">Kitaplar 📚</h1>
      <BooksClient initialBooks={books} />
    </div>
  );
}