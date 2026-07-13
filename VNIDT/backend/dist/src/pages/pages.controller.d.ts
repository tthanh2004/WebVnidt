import { PagesService } from './pages.service';
import { SavePageDto } from './dto/save-page.dto';
export declare class PagesController {
    private readonly pagesService;
    constructor(pagesService: PagesService);
    getPage(slug: string): Promise<{
        success: boolean;
        data: any;
    }>;
    savePage(slug: string, body: SavePageDto): Promise<{
        success: boolean;
        message: string;
    }>;
}
