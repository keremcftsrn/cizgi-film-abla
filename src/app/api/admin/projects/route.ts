import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data = await request.json();
  const proj = await prisma.project.create({ 
    data: { 
      title: data.title, 
      description: data.description,
      imageUrl: data.imageUrl,
      linkUrl: data.linkUrl,
      dateText: data.dateText
    } 
  });
  return NextResponse.json(proj);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if(!id) return NextResponse.json({ error: 'ID req' }, { status: 400 });
  await prisma.project.delete({ where: { id: parseInt(id) } });
  return NextResponse.json({ success: true });
}