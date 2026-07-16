import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
export declare class NewsController {
    private readonly newsService;
    constructor(newsService: NewsService);
    getNews(): Promise<{
        success: boolean;
        data: ({
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
        })[];
    }>;
    getSingleNews(slugOrId: string): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        data: {
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
        };
        message?: undefined;
    }>;
    createNews(body: CreateNewsDto, req: any): Promise<{
        success: boolean;
        data: {
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
        };
        message: string;
    }>;
    updateNews(id: string, body: CreateNewsDto): Promise<{
        success: boolean;
        data: {
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
        };
        message: string;
    }>;
    deleteNews(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
