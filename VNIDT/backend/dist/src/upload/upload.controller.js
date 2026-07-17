"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const auth_guard_1 = require("../auth/auth.guard");
const path_1 = require("path");
const upload_utils_1 = require("../common/utils/upload.utils");
let UploadController = class UploadController {
    uploadImage(file) {
        if (!file) {
            throw new common_1.BadRequestException('Không tìm thấy tệp ảnh.');
        }
        const imageUrl = `assets/uploads/${file.filename}`;
        return { success: true, imageUrl, message: 'Tải ảnh lên thành công.' };
    }
    uploadFile(file) {
        if (!file) {
            throw new common_1.BadRequestException('Không tìm thấy tệp đính kèm.');
        }
        const fileUrl = `assets/uploads/${file.filename}`;
        return { success: true, fileUrl, originalName: file.originalname, message: 'Tải tệp lên thành công.' };
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: {
            destination: (req, file, cb) => {
                cb(null, (0, upload_utils_1.getUploadDir)());
            },
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e6);
                const ext = (0, path_1.extname)(file.originalname);
                cb(null, `project-${uniqueSuffix}${ext}`);
            },
            _handleFile: function (req, file, cb) {
                this.destination(req, file, (err, destination) => {
                    if (err)
                        return cb(err);
                    this.filename(req, file, (err2, filename) => {
                        if (err2)
                            return cb(err2);
                        const finalPath = (0, path_1.join)(destination, filename);
                        const outStream = require('fs').createWriteStream(finalPath);
                        file.stream.pipe(outStream);
                        outStream.on('error', cb);
                        outStream.on('finish', () => {
                            cb(null, { destination, filename, path: finalPath, size: outStream.bytesWritten });
                        });
                    });
                });
            },
            _removeFile: function (_req, file, cb) {
                require('fs').unlink(file.path, cb);
            }
        },
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.match(/^image\/(jpeg|png|gif|webp|svg\+xml)$/)) {
                return cb(new common_1.BadRequestException('Chỉ hỗ trợ tệp ảnh (JPG, PNG, GIF, WebP, SVG)'), false);
            }
            cb(null, true);
        },
        limits: { fileSize: 5 * 1024 * 1024 }
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('file'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: {
            destination: (req, file, cb) => {
                cb(null, (0, upload_utils_1.getUploadDir)());
            },
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e6);
                const ext = (0, path_1.extname)(file.originalname).toLowerCase();
                cb(null, `attachment-${uniqueSuffix}${ext}`);
            },
            _handleFile: function (req, file, cb) {
                this.destination(req, file, (err, destination) => {
                    if (err)
                        return cb(err);
                    this.filename(req, file, (err2, filename) => {
                        if (err2)
                            return cb(err2);
                        const finalPath = (0, path_1.join)(destination, filename);
                        const outStream = require('fs').createWriteStream(finalPath);
                        file.stream.pipe(outStream);
                        outStream.on('error', cb);
                        outStream.on('finish', () => {
                            cb(null, { destination, filename, path: finalPath, size: outStream.bytesWritten });
                        });
                    });
                });
            },
            _removeFile: function (_req, file, cb) {
                require('fs').unlink(file.path, cb);
            }
        },
        fileFilter: (req, file, cb) => {
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
            const ext = (0, path_1.extname)(file.originalname).toLowerCase();
            const allowedExts = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.txt', '.zip', '.rar'];
            if (!allowedTypes.includes(file.mimetype) && !allowedExts.includes(ext)) {
                return cb(new common_1.BadRequestException('Định dạng tệp không được hỗ trợ (chỉ nhận PDF, Word, Excel, PowerPoint, TXT, ZIP, RAR)'), false);
            }
            cb(null, true);
        },
        limits: { fileSize: 20 * 1024 * 1024 }
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "uploadFile", null);
exports.UploadController = UploadController = __decorate([
    (0, common_1.Controller)('upload')
], UploadController);
//# sourceMappingURL=upload.controller.js.map