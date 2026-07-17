const { PrismaClient } = require('@prisma/client');
const argon2 = require('argon2');
const prisma = new PrismaClient();

async function main() {
  console.log('Checking database status...');
  const userCount = await prisma.user.count();
  if (userCount > 0) {
    console.log('Database already has data. Skipping seeding.');
    return;
  }

  console.log('Seeding database...');

  // 1. Create a Default Admin User
  const passwordHash = await argon2.hash('VNiDT@2026!');
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@vnidt.vn',
      passwordHash,
      role: 'super_admin',
    },
  });
  console.log(`Created default user: ${adminUser.email}`);

  // 2. Seed Projects
  await prisma.project.createMany({
    data: [
      {
        tag: 'CSDL · GIS',
        name: 'CSDL Tài Nguyên Môi Trường',
        description: 'Số hóa và xây dựng cơ sở dữ liệu tài nguyên môi trường theo chuẩn quốc gia, phục vụ quản lý đa ngành trên nền tảng WebGIS.',
        imageUrl: 'assets/xay-dung-co-so-du-lieu-tnmt.jpg',
        authorId: adminUser.id,
      },
      {
        tag: 'Thủy sản · Quảng Ninh',
        name: 'Quản Lý Thủy Sản Vịnh Bắc Bộ',
        description: 'Triển khai hệ thống giám sát 1,245 cơ sở giống, 4,820 ha mặt biển nuôi cấp phép với 158 vùng nuôi chuẩn VietGAP.',
        imageUrl: 'assets/he-thong-quan-ly-thong-minh.jpg',
        authorId: adminUser.id,
      },
      {
        tag: 'Môi trường · Web/App',
        name: 'Giám Sát Nguồn Thải Quốc Gia',
        description: 'Xây dựng nền tảng web/app quản lý nguồn thải với hệ thống cảnh báo ô nhiễm vượt giới hạn và báo cáo tự động.',
        imageUrl: 'assets/quan-ly-nguon-thai-web-app.jpg',
        authorId: adminUser.id,
      },
      {
        tag: 'AI · Biển Đông',
        name: 'Cảnh Báo Thiên Tai Biển Đông',
        description: 'Ứng dụng AI dự báo bão, theo dõi thời tiết thời gian thực và hỗ trợ thông tin ngư trường cho ngư dân trên Biển Đông.',
        imageUrl: 'assets/canh-bao-thien-tai-ngu-truong.jpg',
        authorId: adminUser.id,
      },
    ],
  });
  console.log('Seeded projects.');

  // 3. Seed News (with authorId and slug)
  await prisma.news.create({
    data: {
      name: 'VNiDT triển khai thành công hệ thống CSDL Tài nguyên Môi trường',
      slug: 'vndt-trien-khai-thanh-cong-he-thong-csdl',
      description: 'Hệ thống cơ sở dữ liệu tài nguyên môi trường trên nền GIS đã được triển khai thành công, đáp ứng tiêu chuẩn quốc tế về tích hợp dữ liệu đa ngành.',
      status: 'published',
      publishedAt: new Date('2026-05-15T00:00:00.000Z'),
      authorId: adminUser.id,
    },
  });

  await prisma.news.create({
    data: {
      name: 'Ra mắt ứng dụng cảnh báo thiên tai và hỗ trợ ngư trường AI',
      slug: 'ra-mat-ung-dung-canh-bao-thien-tai-ngu-truong-ai',
      description: 'Ứng dụng mobile tích hợp AI dự báo bão, theo dõi thời tiết thời gian thực đã chính thức ra mắt, hỗ trợ hàng nghìn ngư dân trên Biển Đông.',
      status: 'published',
      publishedAt: new Date('2026-04-02T00:00:00.000Z'),
      authorId: adminUser.id,
    },
  });

  await prisma.news.create({
    data: {
      name: 'Ký kết hợp tác chiến lược chuyển đổi số với các Sở ban ngành',
      slug: 'ky-ket-hop-tac-chien-luoc-chuyen-doi-so',
      description: 'VNiDT chính thức trở thành đối tác chiến lược cung cấp giải pháp chuyển đổi số toàn diện cho nhiều Sở ban ngành trên toàn quốc.',
      status: 'published',
      publishedAt: new Date('2026-03-18T00:00:00.000Z'),
      authorId: adminUser.id,
    },
  });
  console.log('Seeded news.');

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
