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
var ContactController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
const common_1 = require("@nestjs/common");
const contact_service_1 = require("./contact.service");
const create_contact_dto_1 = require("./dto/create-contact.dto");
const auth_guard_1 = require("../auth/auth.guard");
let ContactController = ContactController_1 = class ContactController {
    contactService;
    logger = new common_1.Logger(ContactController_1.name);
    constructor(contactService) {
        this.contactService = contactService;
    }
    async sendContactEmail(body, res) {
        try {
            await this.contactService.sendEmail(body);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Gửi yêu cầu tư vấn thành công! Chúng tôi sẽ liên hệ lại sớm nhất.',
            });
        }
        catch (error) {
            this.logger.error('Lỗi khi gửi email:', error.message);
            const message = error.message?.includes('SMTP_PASS')
                ? 'Hệ thống email chưa được cấu hình. Vui lòng liên hệ admin.'
                : 'Không thể gửi email lúc này. Vui lòng thử lại sau hoặc liên hệ trực tiếp qua hotline.';
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message,
            });
        }
    }
    async getContacts() {
        const data = await this.contactService.findAll();
        return {
            success: true,
            data,
        };
    }
    async deleteContact(id) {
        await this.contactService.delete(id);
        return {
            success: true,
            message: 'Đã xóa yêu cầu tư vấn thành công.',
        };
    }
};
exports.ContactController = ContactController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contact_dto_1.CreateContactDto, Object]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "sendContactEmail", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "getContacts", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "deleteContact", null);
exports.ContactController = ContactController = ContactController_1 = __decorate([
    (0, common_1.Controller)('contact'),
    __metadata("design:paramtypes", [contact_service_1.ContactService])
], ContactController);
//# sourceMappingURL=contact.controller.js.map