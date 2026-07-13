import { ConfigService } from '@nestjs/config';
import { CreateContactDto } from './dto/create-contact.dto';
export declare class ContactService {
    private configService;
    private readonly logger;
    private transporter;
    constructor(configService: ConfigService);
    sendEmail(data: CreateContactDto): Promise<any>;
    private escapeHtml;
}
