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

const getRootPath = () => {
  const prodPath = join(__dirname, '..', 'public');
  if (existsSync(prodPath)) {
    return prodPath;
  }
  const devPath = join(__dirname, '..', '..', 'frontend');
  if (existsSync(devPath)) {
    return devPath;
  }
  return join(__dirname, '..', 'public');
};

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: getRootPath(),
      exclude: ['/api/(.*)'],
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
    NewsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
