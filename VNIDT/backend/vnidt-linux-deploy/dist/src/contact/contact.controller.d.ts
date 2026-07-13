import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import type { Response } from 'express';
export declare class ContactController {
    private readonly contactService;
    private readonly logger;
    constructor(contactService: ContactService);
    sendContactEmail(body: CreateContactDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
