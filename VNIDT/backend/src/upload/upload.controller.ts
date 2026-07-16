import {
  Controller, Post, UseGuards, UseInterceptors,
  UploadedFile, BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/auth.guard';
import { join, extname } from 'path';
import { existsSync, mkdirSync } from 'fs';

// Determine the uploads destination (frontend/assets/uploads/)
function getUploadDir(): string {
  const devPath = join(__dirname, '..', '..', '..', 'frontend', 'assets', 'uploads');
  if (existsSync(join(__dirname, '..', '..', '..', 'frontend'))) {
    if (!existsSync(devPath)) mkdirSync(devPath, { recursive: true });
    return devPath;
  }
  const devPath2 = join(__dirname, '..', '..', 'frontend', 'assets', 'uploads');
  if (existsSync(join(__dirname, '..', '..', 'frontend'))) {
    if (!existsSync(devPath2)) mkdirSync(devPath2, { recursive: true });
    return devPath2;
  }
  const prodPath = join(__dirname, '..', 'public', 'assets', 'uploads');
  if (!existsSync(prodPath)) mkdirSync(prodPath, { recursive: true });
  return prodPath;
}

@Controller('upload')
export class UploadController {
  @UseGuards(AuthGuard)
  @Post('image')
  @UseInterceptors(FileInterceptor('file', {
    storage: {
      destination: (req: any, file: any, cb: any) => {
        cb(null, getUploadDir());
      },
      filename: (req: any, file: any, cb: any) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e6);
        const ext = extname(file.originalname);
        cb(null, `project-${uniqueSuffix}${ext}`);
      },
      _handleFile: function(req: any, file: any, cb: any) {
        (this as any).destination(req, file, (err: any, destination: string) => {
          if (err) return cb(err);
          (this as any).filename(req, file, (err2: any, filename: string) => {
            if (err2) return cb(err2);
            const finalPath = join(destination, filename);
            const outStream = require('fs').createWriteStream(finalPath);
            file.stream.pipe(outStream);
            outStream.on('error', cb);
            outStream.on('finish', () => {
              cb(null, { destination, filename, path: finalPath, size: outStream.bytesWritten });
            });
          });
        });
      },
      _removeFile: function(_req: any, file: any, cb: any) {
        require('fs').unlink(file.path, cb);
      }
    } as any,
    fileFilter: (req: any, file: any, cb: any) => {
      if (!file.mimetype.match(/^image\/(jpeg|png|gif|webp|svg\+xml)$/)) {
        return cb(new BadRequestException('Chỉ hỗ trợ tệp ảnh (JPG, PNG, GIF, WebP, SVG)'), false);
      }
      cb(null, true);
    },
    limits: { fileSize: 5 * 1024 * 1024 }
  }))
  uploadImage(@UploadedFile() file: any) {
    if (!file) {
      throw new BadRequestException('Không tìm thấy tệp ảnh.');
    }
    const imageUrl = `assets/uploads/${file.filename}`;
    return { success: true, imageUrl, message: 'Tải ảnh lên thành công.' };
  }

  @UseGuards(AuthGuard)
  @Post('file')
  @UseInterceptors(FileInterceptor('file', {
    storage: {
      destination: (req: any, file: any, cb: any) => {
        cb(null, getUploadDir());
      },
      filename: (req: any, file: any, cb: any) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e6);
        const ext = extname(file.originalname).toLowerCase();
        cb(null, `attachment-${uniqueSuffix}${ext}`);
      },
      _handleFile: function(req: any, file: any, cb: any) {
        (this as any).destination(req, file, (err: any, destination: string) => {
          if (err) return cb(err);
          (this as any).filename(req, file, (err2: any, filename: string) => {
            if (err2) return cb(err2);
            const finalPath = join(destination, filename);
            const outStream = require('fs').createWriteStream(finalPath);
            file.stream.pipe(outStream);
            outStream.on('error', cb);
            outStream.on('finish', () => {
              cb(null, { destination, filename, path: finalPath, size: outStream.bytesWritten });
            });
          });
        });
      },
      _removeFile: function(_req: any, file: any, cb: any) {
        require('fs').unlink(file.path, cb);
      }
    } as any,
    fileFilter: (req: any, file: any, cb: any) => {
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'text/plain',
        'application/zip',
        'application/x-zip-compressed',
        'application/x-rar-compressed'
      ];
      const ext = extname(file.originalname).toLowerCase();
      const allowedExts = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.txt', '.zip', '.rar'];
      if (!allowedTypes.includes(file.mimetype) && !allowedExts.includes(ext)) {
        return cb(new BadRequestException('Định dạng tệp không được hỗ trợ (chỉ nhận PDF, Word, Excel, PowerPoint, TXT, ZIP, RAR)'), false);
      }
      cb(null, true);
    },
    limits: { fileSize: 20 * 1024 * 1024 } // 20MB
  }))
  uploadFile(@UploadedFile() file: any) {
    if (!file) {
      throw new BadRequestException('Không tìm thấy tệp đính kèm.');
    }
    const fileUrl = `assets/uploads/${file.filename}`;
    return { success: true, fileUrl, originalName: file.originalname, message: 'Tải tệp lên thành công.' };
  }
}
