import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNewsDto } from './dto/create-news.dto';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.news.findMany({
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

  async findOne(id: string) {
    return this.prisma.news.findUnique({
      where: { id },
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
    return this.prisma.news.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string) {
    return this.prisma.news.delete({
      where: { id },
    });
  }
}
