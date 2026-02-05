import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Buat User Admin (Password plain text dulu utk test simpel)
  await prisma.user.upsert({
    where: { email: 'admin@test.com' },
    update: {},
    create: { email: 'admin@test.com', password: 'admin' },
  });

  // Buat Kategori Dummy
  await prisma.category.createMany({
    data: [{ name: 'Elektronik' }, { name: 'Furniture' }],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());