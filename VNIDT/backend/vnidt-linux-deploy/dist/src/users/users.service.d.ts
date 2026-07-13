import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    createUser(data: Prisma.UserCreateInput): Promise<User>;
    countUsers(): Promise<number>;
    updateLastLogin(id: string): Promise<User>;
    findAll(): Promise<{
        id: string;
        email: string;
        role: string;
        lastLogin: Date | null;
        createdAt: Date;
    }[]>;
    updateUser(id: string, data: Prisma.UserUpdateInput): Promise<{
        id: string;
        email: string;
        role: string;
    }>;
    deleteUser(id: string): Promise<{
        id: string;
        email: string;
        passwordHash: string;
        role: string;
        mfaEnabled: boolean;
        lastLogin: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
