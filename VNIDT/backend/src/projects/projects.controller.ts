import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async getProjects() {
    const list = await this.projectsService.findAll();
    return { success: true, data: list };
  }

  @Get(':id')
  async getProject(@Param('id') id: string) {
    const project = await this.projectsService.findOne(id);
    if (!project) {
      return { success: false, message: 'Không tìm thấy dự án.' };
    }
    return { success: true, data: project };
  }

  @UseGuards(AuthGuard)
  @Post()
  async createProject(@Body() body: CreateProjectDto, @Req() req: any) {
    const authorId = req.user?.sub;
    if (!authorId) {
      throw new Error('Không tìm thấy thông tin đăng nhập tác giả.');
    }
    const project = await this.projectsService.create(body, authorId);
    return { success: true, data: project, message: 'Đã thêm dự án thành công.' };
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateProject(@Param('id') id: string, @Body() body: CreateProjectDto) {
    const project = await this.projectsService.update(id, body);
    return { success: true, data: project, message: 'Đã cập nhật dự án thành công.' };
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteProject(@Param('id') id: string, @Req() req: any) {
    await this.projectsService.remove(id, req.user);
    return { success: true, message: 'Đã xóa dự án thành công.' };
  }
}
