import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const settings = await prisma.siteSettings.upsert({
      where: { id: 'global' },
      update: {
        heroTitle: data.heroTitle,
        heroSubtitle: data.heroSubtitle,
        aboutText: data.aboutText,
        longBio: data.longBio,
        heroImage: data.heroImage,
        socialInstagram: data.socialInstagram,
        socialYoutube: data.socialYoutube,
        socialTiktok: data.socialTiktok,
        socialLinkedin: data.socialLinkedin,
        socialTwitter: data.socialTwitter
      },
      create: {
        id: 'global',
        heroTitle: data.heroTitle,
        heroSubtitle: data.heroSubtitle,
        aboutText: data.aboutText,
        longBio: data.longBio,
        heroImage: data.heroImage,
        socialInstagram: data.socialInstagram,
        socialYoutube: data.socialYoutube,
        socialTiktok: data.socialTiktok,
        socialLinkedin: data.socialLinkedin,
        socialTwitter: data.socialTwitter
      }
    });
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}

export async function GET() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 'global' } });
  return NextResponse.json(settings || {});
}