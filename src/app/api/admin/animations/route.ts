import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data = await request.json();
  const anim = await prisma.animation.create({ data: { title: data.title, videoUrl: data.videoUrl } });
  return NextResponse.json(anim);
}
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if(!id) return NextResponse.json({ error: 'ID req' }, { status: 400 });
  await prisma.animation.delete({ where: { id: parseInt(id) } });
  return NextResponse.json({ success: true });
}