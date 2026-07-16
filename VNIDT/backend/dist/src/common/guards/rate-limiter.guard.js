"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleRateLimiterGuard = void 0;
const common_1 = require("@nestjs/common");
let SimpleRateLimiterGuard = class SimpleRateLimiterGuard {
    ipRequests = new Map();
    limit = 5;
    windowMs = 60 * 1000;
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const ip = request.ip || request.headers['x-forwarded-for'] || 'unknown';
        const now = Date.now();
        let timestamps = this.ipRequests.get(ip) || [];
        timestamps = timestamps.filter(t => now - t < this.windowMs);
        if (timestamps.length >= this.limit) {
            throw new common_1.HttpException('Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau 1 phút.', common_1.HttpStatus.TOO_MANY_REQUESTS);
        }
        timestamps.push(now);
        this.ipRequests.set(ip, timestamps);
        return true;
    }
};
exports.SimpleRateLimiterGuard = SimpleRateLimiterGuard;
exports.SimpleRateLimiterGuard = SimpleRateLimiterGuard = __decorate([
    (0, common_1.Injectable)()
], SimpleRateLimiterGuard);
//# sourceMappingURL=rate-limiter.guard.js.map