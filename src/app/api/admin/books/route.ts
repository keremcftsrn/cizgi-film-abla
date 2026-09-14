import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const book = await prisma.book.create({
      data: {
        title: data.title,
        price: parseFloat(data.price),
        stock: parseInt(data.stock),
        ageGroup: data.ageGroup,
        coverUrl: data.coverUrl,
        shopierUrl: data.shopierUrl
      }
    });
    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create book' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const book = await prisma.book.update({
      where: { id: parseInt(data.id) },
      data: {
        title: data.title,
        price: parseFloat(data.price),
        stock: parseInt(data.stock),
        ageGroup: data.ageGroup,
        coverUrl: data.coverUrl,
        shopierUrl: data.shopierUrl
      }
    });
    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update book' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    
    // Check if order items exist
    const orderItems = await prisma.orderItem.count({ where: { bookId: parseInt(id) }});
    if (orderItems > 0) {
      return NextResponse.json({ error: 'Kitap siparişlerde kullanıldığı için silinemez.' }, { status: 400 });
    }

    await prisma.book.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete book' }, { status: 500 });
  }
}