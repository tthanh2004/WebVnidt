const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('=== DATA VERIFICATION ===');
  
  console.log('\n--- USERS ---');
  const users = await prisma.user.findMany({
    select: { id: true, email: true, role: true }
  });
  console.log(users);

  console.log('\n--- PROJECTS ---');
  const projects = await prisma.project.findMany();
  console.log(projects);

  console.log('\n--- NEWS ---');
  const news = await prisma.news.findMany({
    include: {
      author: { select: { email: true } }
    }
  });
  console.log(news);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
