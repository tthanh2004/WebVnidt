import { ConfigService } from '@nestjs/config';
import { CreateContactDto } from './dto/create-contact.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class ContactService {
    private configService;
    private prisma;
    private readonly logger;
    private transporter;
    constructor(configService: ConfigService, prisma: PrismaService);
    sendEmail(data: CreateContactDto): Promise<any>;
    findAll(): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        name: string;
        phone: string | null;
        message: string;
        organization: string | null;
        sector: string;
    }[]>;
    delete(id: string): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        name: string;
        phone: string | null;
        message: string;
        organization: string | null;
        sector: string;
    }>;
    private escapeHtml;
}
