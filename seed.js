const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.book.createMany({
    data: [
      { title: "Renkli Orman Macerası", ageGroup: "5-8 Yaş", price: 120, stock: 50 },
      { title: "Uzaylı Dostum", ageGroup: "6-9 Yaş", price: 135, stock: 100 },
      { title: "Gizemli Şato", ageGroup: "7-10 Yaş", price: 150, stock: 30 },
      { title: "Küçük Mucitler", ageGroup: "6-9 Yaş", price: 140, stock: 75 },
    ]
  });

  await prisma.animation.createMany({
    data: [
      { title: "Z Takımı", channel: "TRT Çocuk", schedule: "Hafta içi her gün 15:30", youtubeUrl: "https://youtube.com" },
      { title: "Pırıl", channel: "TRT Çocuk", schedule: "Hafta sonu 10:00", youtubeUrl: "https://youtube.com" },
    ]
  });

  await prisma.gallery.createMany({
    data: [
      { title: "Tüyap Kitap Fuarı", imageUrl: "/placeholder" },
      { title: "Okul Söyleşisi", imageUrl: "/placeholder" },
      { title: "İmza Günü", imageUrl: "/placeholder" },
    ]
  });

  console.log("Database seeded successfully!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
