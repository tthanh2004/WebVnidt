import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors();

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
