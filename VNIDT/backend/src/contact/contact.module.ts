import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [ConfigModule, PrismaModule],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
