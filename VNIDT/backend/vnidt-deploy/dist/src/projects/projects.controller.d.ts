import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    getProjects(): Promise<{
        success: boolean;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string;
            tag: string;
            imageUrl: string | null;
        }[];
    }>;
    createProject(body: CreateProjectDto): Promise<{
        success: boolean;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string;
            tag: string;
            imageUrl: string | null;
        };
        message: string;
    }>;
    updateProject(id: string, body: CreateProjectDto): Promise<{
        success: boolean;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string;
            tag: string;
            imageUrl: string | null;
        };
        message: string;
    }>;
    deleteProject(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
