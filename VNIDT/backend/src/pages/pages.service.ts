import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PagesService {
  constructor(private prisma: PrismaService) {}

  async findBySlug(slug: string) {
    return this.prisma.page.findUnique({ where: { slug } });
  }

  async upsertPage(slug: string, content: string, seoMetadata?: string) {
    return this.prisma.page.upsert({
      where: { slug },
      update: { content, seoMetadata },
      create: { slug, content, seoMetadata },
    });
  }
}
