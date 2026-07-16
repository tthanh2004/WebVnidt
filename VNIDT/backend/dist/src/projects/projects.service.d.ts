import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
export declare class ProjectsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        attachmentUrl: string | null;
        attachmentName: string | null;
        deletedAt: Date | null;
        tag: string;
        imageUrl: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        attachmentUrl: string | null;
        attachmentName: string | null;
        deletedAt: Date | null;
        tag: string;
        imageUrl: string | null;
    } | null>;
    create(data: CreateProjectDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        attachmentUrl: string | null;
        attachmentName: string | null;
        deletedAt: Date | null;
        tag: string;
        imageUrl: string | null;
    }>;
    update(id: string, data: CreateProjectDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        attachmentUrl: string | null;
        attachmentName: string | null;
        deletedAt: Date | null;
        tag: string;
        imageUrl: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        attachmentUrl: string | null;
        attachmentName: string | null;
        deletedAt: Date | null;
        tag: string;
        imageUrl: string | null;
    }>;
}
