import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNewsDto } from './dto/create-news.dto';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.news.findMany({
      where: { deletedAt: null },
      orderBy: { publishedAt: 'desc' },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }

  async findOne(slugOrId: string) {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(slugOrId);
    return this.prisma.news.findFirst({
      where: isUuid ? { id: slugOrId, deletedAt: null } : { slug: slugOrId, deletedAt: null },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }

  async create(data: CreateNewsDto, authorId: string) {
    const publishedAtDate = data.publishedAt ? new Date(data.publishedAt) : new Date();
    return this.prisma.news.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        status: data.status || 'draft',
        publishedAt: publishedAtDate,
        attachmentUrl: data.attachmentUrl,
        attachmentName: data.attachmentName,
        authorId,
      },
    });
  }

  async update(id: string, data: CreateNewsDto) {
    const updateData: any = {
      name: data.name,
      slug: data.slug,
      description: data.description,
    };
    if (data.status) {
      updateData.status = data.status;
    }
    if (data.publishedAt) {
      updateData.publishedAt = new Date(data.publishedAt);
    }
    if (data.attachmentUrl !== undefined) {
      updateData.attachmentUrl = data.attachmentUrl;
    }
    if (data.attachmentName !== undefined) {
      updateData.attachmentName = data.attachmentName;
    }
    return this.prisma.news.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string) {
    return this.prisma.news.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
