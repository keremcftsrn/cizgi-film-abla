const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.book.createMany({
    data: [
      { title: "Gökyüzü Macerası", ageGroup: "3-6 Yaş", price: 150, stock: 50 },
      { title: "Ormanın Sırrı", ageGroup: "6-9 Yaş", price: 180, stock: 30 },
      { title: "Küçük Yıldız", ageGroup: "3-6 Yaş", price: 120, stock: 100 }
    ]
  });

  await prisma.animation.createMany({
    data: [
      { title: "Z Takımı", videoUrl: "https://youtube.com" },
      { title: "Pırıl", videoUrl: "https://youtube.com" }
    ]
  });
  console.log("Database seeded successfully!");
}

main().catch(e => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
