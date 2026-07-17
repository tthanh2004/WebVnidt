import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.project.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.project.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async create(data: CreateProjectDto, authorId: string) {
    return this.prisma.project.create({
      data: {
        tag: data.tag,
        name: data.name,
        description: data.description,
        imageUrl: data.imageUrl,
        attachmentUrl: data.attachmentUrl,
        attachmentName: data.attachmentName,
        authorId,
      },
    });
  }

  async update(id: string, data: CreateProjectDto) {
    return this.prisma.project.update({
      where: { id },
      data,
    });
  }

  async remove(id: string, currentUser: any) {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });
    if (!project) {
      throw new NotFoundException('Không tìm thấy dự án.');
    }

    // Phân quyền: chỉ admin, super_admin hoặc chính người tạo mới được xóa
    if (
      currentUser.role !== 'super_admin' &&
      currentUser.role !== 'admin' &&
      project.authorId !== currentUser.sub
    ) {
      throw new ForbiddenException('Bạn không có quyền xóa dự án của người khác.');
    }

    return this.prisma.project.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
