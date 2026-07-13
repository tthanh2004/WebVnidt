import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
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

  @UseGuards(AuthGuard)
  @Post()
  async createProject(@Body() body: CreateProjectDto) {
    const project = await this.projectsService.create(body);
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
  async deleteProject(@Param('id') id: string) {
    await this.projectsService.remove(id);
    return { success: true, message: 'Đã xóa dự án thành công.' };
  }
}
