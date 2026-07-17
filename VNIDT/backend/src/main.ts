import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { getUploadDir } from './common/utils/upload.utils';
import { join } from 'path';
import { existsSync } from 'fs';

function getFrontendRoot(): string {
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
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors();

  // Serve static assets from uploads directory
  app.use('/assets/uploads', express.static(getUploadDir()));

  // Custom redirects for admin URLs
  app.use((req: any, res: any, next: any) => {
    const urlPath = req.path;
    if (urlPath === '/admin.login') {
      return res.sendFile(join(getFrontendRoot(), 'login.html'));
    }
    if (urlPath === '/crudadmin') {
      return res.sendFile(join(getFrontendRoot(), 'admin.html'));
    }
    if (urlPath === '/login.html' || urlPath === '/login') {
      return res.redirect(302, '/admin.login');
    }
    if (urlPath === '/admin.html' || urlPath === '/admin') {
      return res.redirect(302, '/crudadmin');
    }
    next();
  });

  // Global Validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('VNiDT CMS API')
    .setDescription('The API documentation for VNiDT Enterprise CMS')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Prefix all routes with /api
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
}
bootstrap();
