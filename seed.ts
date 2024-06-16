import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      { name: "Admin", email: "admin@example.com", password: "admin", role: "ADMIN" },
      { name: "HQ Manager", email: "hqmanager@example.com", password: "hqmanager", role: "HQ_MANAGER" },
      { name: "Manager", email: "manager@example.com", password: "manager", role: "MANAGER" },
      { name: "Waiter", email: "waiter@example.com", password: "waiter", role: "WAITER" }
    ],
  });

  await prisma.branch.create({
    data: { name: "Main Branch" },
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
