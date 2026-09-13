import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const newBook = await prisma.book.create({
      data: {
        title: data.title,
        price: data.price,
        stock: data.stock,
        ageGroup: data.ageGroup,
        coverUrl: data.coverUrl,
      }
    });
    return NextResponse.json(newBook);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create book' }, { status: 500 });
  }
}
