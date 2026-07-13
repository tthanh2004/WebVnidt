import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: any;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: any;
export declare const JsonNull: any;
export declare const AnyNull: any;
export declare const ModelName: {
    readonly User: "User";
    readonly Page: "Page";
    readonly News: "News";
    readonly Media: "Media";
    readonly ContactRequest: "ContactRequest";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: any;
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly passwordHash: "passwordHash";
    readonly role: "role";
    readonly mfaEnabled: "mfaEnabled";
    readonly lastLogin: "lastLogin";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const PageScalarFieldEnum: {
    readonly id: "id";
    readonly slug: "slug";
    readonly content: "content";
    readonly seoMetadata: "seoMetadata";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PageScalarFieldEnum = (typeof PageScalarFieldEnum)[keyof typeof PageScalarFieldEnum];
export declare const NewsScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly slug: "slug";
    readonly body: "body";
    readonly status: "status";
    readonly publishedAt: "publishedAt";
    readonly authorId: "authorId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type NewsScalarFieldEnum = (typeof NewsScalarFieldEnum)[keyof typeof NewsScalarFieldEnum];
export declare const MediaScalarFieldEnum: {
    readonly id: "id";
    readonly fileName: "fileName";
    readonly fileUrl: "fileUrl";
    readonly mimeType: "mimeType";
    readonly sizeBytes: "sizeBytes";
    readonly uploaderId: "uploaderId";
    readonly createdAt: "createdAt";
};
export type MediaScalarFieldEnum = (typeof MediaScalarFieldEnum)[keyof typeof MediaScalarFieldEnum];
export declare const ContactRequestScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly email: "email";
    readonly phone: "phone";
    readonly message: "message";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ContactRequestScalarFieldEnum = (typeof ContactRequestScalarFieldEnum)[keyof typeof ContactRequestScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
