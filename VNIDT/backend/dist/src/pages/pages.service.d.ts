import { PrismaService } from '../prisma/prisma.service';
export declare class PagesService {
    private prisma;
    constructor(prisma: PrismaService);
    findBySlug(slug: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        content: string;
        seoMetadata: string | null;
    } | null>;
    upsertPage(slug: string, content: string, seoMetadata?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        content: string;
        seoMetadata: string | null;
    }>;
}
