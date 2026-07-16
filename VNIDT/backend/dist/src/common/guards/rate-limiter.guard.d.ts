import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class SimpleRateLimiterGuard implements CanActivate {
    private ipRequests;
    private readonly limit;
    private readonly windowMs;
    canActivate(context: ExecutionContext): boolean;
}
