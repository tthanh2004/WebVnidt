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
    })[]>;
    findOne(id: string): Promise<({
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
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        status: string;
        publishedAt: Date;
        authorId: string;
        name: string;
        description: string;
    }>;
}
