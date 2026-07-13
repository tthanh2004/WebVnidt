const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  console.log('Users in DB:');
  console.dir(users, { depth: null });
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
