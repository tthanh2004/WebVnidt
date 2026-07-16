import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class SimpleRateLimiterGuard implements CanActivate {
  private ipRequests = new Map<string, number[]>();
  private readonly limit = 5; // max 5 requests
  private readonly windowMs = 60 * 1000; // per 1 minute

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const ip = request.ip || (request.headers['x-forwarded-for'] as string) || 'unknown';
    
    const now = Date.now();
    let timestamps = this.ipRequests.get(ip) || [];
    
    // Filter out timestamps outside the window
    timestamps = timestamps.filter(t => now - t < this.windowMs);
    
    if (timestamps.length >= this.limit) {
      throw new HttpException(
        'Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau 1 phút.',
        HttpStatus.TOO_MANY_REQUESTS
      );
    }
    
    timestamps.push(now);
    this.ipRequests.set(ip, timestamps);
    
    return true;
  }
}
