import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { existsSync } from 'fs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PagesModule } from './pages/pages.module';
import { ContactModule } from './contact/contact.module';
import { ProjectsModule } from './projects/projects.module';
import { NewsModule } from './news/news.module';
import { UploadModule } from './upload/upload.module';

const getRootPath = () => {
  const prodPath = join(__dirname, '..', 'public');
  if (existsSync(prodPath)) {
    return prodPath;
  }
  const path1 = join(__dirname, '..', '..', '..', 'frontend');
  if (existsSync(path1)) {
    return path1;
  }
  const path2 = join(__dirname, '..', '..', 'frontend');
  if (existsSync(path2)) {
    return path2;
  }
  return prodPath;
};

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: getRootPath(),
      exclude: ['/api*'],
      serveStaticOptions: {
        extensions: ['html'],
      },
    }),
    PrismaModule, 
    AuthModule, 
    UsersModule, 
    PagesModule, 
    ContactModule,
    ProjectsModule,
    NewsModule,
    UploadModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
