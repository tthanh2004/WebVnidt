import { PrismaService } from '../prisma/prisma.service';
import { CreateNewsDto } from './dto/create-news.dto';
export declare class NewsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
        author: {
            id: string;
            email: string;
            role: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        status: string;
        publishedAt: Date;
        authorId: string;
        name: string;
        description: string;
        attachmentUrl: string | null;
        attachmentName: string | null;
        deletedAt: Date | null;
    })[]>;
    findOne(slugOrId: string): Promise<({
        author: {
            id: string;
            email: string;
            role: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        status: string;
        publishedAt: Date;
        authorId: string;
        name: string;
        description: string;
        attachmentUrl: string | null;
        attachmentName: string | null;
        deletedAt: Date | null;
    }) | null>;
    create(data: CreateNewsDto, authorId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        status: string;
        publishedAt: Date;
        authorId: string;
        name: string;
        description: string;
        attachmentUrl: string | null;
        attachmentName: string | null;
        deletedAt: Date | null;
    }>;
    update(id: string, data: CreateNewsDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        status: string;
        publishedAt: Date;
        authorId: string;
        name: string;
        description: string;
        attachmentUrl: string | null;
        attachmentName: string | null;
        deletedAt: Date | null;
    }>;
    remove(id: string, currentUser: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        status: string;
        publishedAt: Date;
        authorId: string;
        name: string;
        description: string;
        attachmentUrl: string | null;
        attachmentName: string | null;
        deletedAt: Date | null;
    }>;
}
