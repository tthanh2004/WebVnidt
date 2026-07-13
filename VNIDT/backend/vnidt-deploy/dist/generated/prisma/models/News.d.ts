import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type NewsModel = runtime.Types.Result.DefaultSelection<Prisma.$NewsPayload>;
export type AggregateNews = {
    _count: NewsCountAggregateOutputType | null;
    _min: NewsMinAggregateOutputType | null;
    _max: NewsMaxAggregateOutputType | null;
};
export type NewsMinAggregateOutputType = {
    id: string | null;
    title: string | null;
    slug: string | null;
    body: string | null;
    status: string | null;
    publishedAt: Date | null;
    authorId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type NewsMaxAggregateOutputType = {
    id: string | null;
    title: string | null;
    slug: string | null;
    body: string | null;
    status: string | null;
    publishedAt: Date | null;
    authorId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type NewsCountAggregateOutputType = {
    id: number;
    title: number;
    slug: number;
    body: number;
    status: number;
    publishedAt: number;
    authorId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type NewsMinAggregateInputType = {
    id?: true;
    title?: true;
    slug?: true;
    body?: true;
    status?: true;
    publishedAt?: true;
    authorId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type NewsMaxAggregateInputType = {
    id?: true;
    title?: true;
    slug?: true;
    body?: true;
    status?: true;
    publishedAt?: true;
    authorId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type NewsCountAggregateInputType = {
    id?: true;
    title?: true;
    slug?: true;
    body?: true;
    status?: true;
    publishedAt?: true;
    authorId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type NewsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NewsWhereInput;
    orderBy?: Prisma.NewsOrderByWithRelationInput | Prisma.NewsOrderByWithRelationInput[];
    cursor?: Prisma.NewsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | NewsCountAggregateInputType;
    _min?: NewsMinAggregateInputType;
    _max?: NewsMaxAggregateInputType;
};
export type GetNewsAggregateType<T extends NewsAggregateArgs> = {
    [P in keyof T & keyof AggregateNews]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateNews[P]> : Prisma.GetScalarType<T[P], AggregateNews[P]>;
};
export type NewsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NewsWhereInput;
    orderBy?: Prisma.NewsOrderByWithAggregationInput | Prisma.NewsOrderByWithAggregationInput[];
    by: Prisma.NewsScalarFieldEnum[] | Prisma.NewsScalarFieldEnum;
    having?: Prisma.NewsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: NewsCountAggregateInputType | true;
    _min?: NewsMinAggregateInputType;
    _max?: NewsMaxAggregateInputType;
};
export type NewsGroupByOutputType = {
    id: string;
    title: string;
    slug: string;
    body: string;
    status: string;
    publishedAt: Date | null;
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
    _count: NewsCountAggregateOutputType | null;
    _min: NewsMinAggregateOutputType | null;
    _max: NewsMaxAggregateOutputType | null;
};
export type GetNewsGroupByPayload<T extends NewsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<NewsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof NewsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], NewsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], NewsGroupByOutputType[P]>;
}>>;
export type NewsWhereInput = {
    AND?: Prisma.NewsWhereInput | Prisma.NewsWhereInput[];
    OR?: Prisma.NewsWhereInput[];
    NOT?: Prisma.NewsWhereInput | Prisma.NewsWhereInput[];
    id?: Prisma.StringFilter<"News"> | string;
    title?: Prisma.StringFilter<"News"> | string;
    slug?: Prisma.StringFilter<"News"> | string;
    body?: Prisma.StringFilter<"News"> | string;
    status?: Prisma.StringFilter<"News"> | string;
    publishedAt?: Prisma.DateTimeNullableFilter<"News"> | Date | string | null;
    authorId?: Prisma.StringFilter<"News"> | string;
    createdAt?: Prisma.DateTimeFilter<"News"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"News"> | Date | string;
    author?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type NewsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    author?: Prisma.UserOrderByWithRelationInput;
};
export type NewsWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    slug?: string;
    AND?: Prisma.NewsWhereInput | Prisma.NewsWhereInput[];
    OR?: Prisma.NewsWhereInput[];
    NOT?: Prisma.NewsWhereInput | Prisma.NewsWhereInput[];
    title?: Prisma.StringFilter<"News"> | string;
    body?: Prisma.StringFilter<"News"> | string;
    status?: Prisma.StringFilter<"News"> | string;
    publishedAt?: Prisma.DateTimeNullableFilter<"News"> | Date | string | null;
    authorId?: Prisma.StringFilter<"News"> | string;
    createdAt?: Prisma.DateTimeFilter<"News"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"News"> | Date | string;
    author?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "slug">;
export type NewsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.NewsCountOrderByAggregateInput;
    _max?: Prisma.NewsMaxOrderByAggregateInput;
    _min?: Prisma.NewsMinOrderByAggregateInput;
};
export type NewsScalarWhereWithAggregatesInput = {
    AND?: Prisma.NewsScalarWhereWithAggregatesInput | Prisma.NewsScalarWhereWithAggregatesInput[];
    OR?: Prisma.NewsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.NewsScalarWhereWithAggregatesInput | Prisma.NewsScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"News"> | string;
    title?: Prisma.StringWithAggregatesFilter<"News"> | string;
    slug?: Prisma.StringWithAggregatesFilter<"News"> | string;
    body?: Prisma.StringWithAggregatesFilter<"News"> | string;
    status?: Prisma.StringWithAggregatesFilter<"News"> | string;
    publishedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"News"> | Date | string | null;
    authorId?: Prisma.StringWithAggregatesFilter<"News"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"News"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"News"> | Date | string;
};
export type NewsCreateInput = {
    id?: string;
    title: string;
    slug: string;
    body: string;
    status?: string;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    author: Prisma.UserCreateNestedOneWithoutNewsInput;
};
export type NewsUncheckedCreateInput = {
    id?: string;
    title: string;
    slug: string;
    body: string;
    status?: string;
    publishedAt?: Date | string | null;
    authorId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type NewsUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    author?: Prisma.UserUpdateOneRequiredWithoutNewsNestedInput;
};
export type NewsUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NewsCreateManyInput = {
    id?: string;
    title: string;
    slug: string;
    body: string;
    status?: string;
    publishedAt?: Date | string | null;
    authorId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type NewsUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NewsUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NewsListRelationFilter = {
    every?: Prisma.NewsWhereInput;
    some?: Prisma.NewsWhereInput;
    none?: Prisma.NewsWhereInput;
};
export type NewsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type NewsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type NewsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type NewsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type NewsCreateNestedManyWithoutAuthorInput = {
    create?: Prisma.XOR<Prisma.NewsCreateWithoutAuthorInput, Prisma.NewsUncheckedCreateWithoutAuthorInput> | Prisma.NewsCreateWithoutAuthorInput[] | Prisma.NewsUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.NewsCreateOrConnectWithoutAuthorInput | Prisma.NewsCreateOrConnectWithoutAuthorInput[];
    createMany?: Prisma.NewsCreateManyAuthorInputEnvelope;
    connect?: Prisma.NewsWhereUniqueInput | Prisma.NewsWhereUniqueInput[];
};
export type NewsUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: Prisma.XOR<Prisma.NewsCreateWithoutAuthorInput, Prisma.NewsUncheckedCreateWithoutAuthorInput> | Prisma.NewsCreateWithoutAuthorInput[] | Prisma.NewsUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.NewsCreateOrConnectWithoutAuthorInput | Prisma.NewsCreateOrConnectWithoutAuthorInput[];
    createMany?: Prisma.NewsCreateManyAuthorInputEnvelope;
    connect?: Prisma.NewsWhereUniqueInput | Prisma.NewsWhereUniqueInput[];
};
export type NewsUpdateManyWithoutAuthorNestedInput = {
    create?: Prisma.XOR<Prisma.NewsCreateWithoutAuthorInput, Prisma.NewsUncheckedCreateWithoutAuthorInput> | Prisma.NewsCreateWithoutAuthorInput[] | Prisma.NewsUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.NewsCreateOrConnectWithoutAuthorInput | Prisma.NewsCreateOrConnectWithoutAuthorInput[];
    upsert?: Prisma.NewsUpsertWithWhereUniqueWithoutAuthorInput | Prisma.NewsUpsertWithWhereUniqueWithoutAuthorInput[];
    createMany?: Prisma.NewsCreateManyAuthorInputEnvelope;
    set?: Prisma.NewsWhereUniqueInput | Prisma.NewsWhereUniqueInput[];
    disconnect?: Prisma.NewsWhereUniqueInput | Prisma.NewsWhereUniqueInput[];
    delete?: Prisma.NewsWhereUniqueInput | Prisma.NewsWhereUniqueInput[];
    connect?: Prisma.NewsWhereUniqueInput | Prisma.NewsWhereUniqueInput[];
    update?: Prisma.NewsUpdateWithWhereUniqueWithoutAuthorInput | Prisma.NewsUpdateWithWhereUniqueWithoutAuthorInput[];
    updateMany?: Prisma.NewsUpdateManyWithWhereWithoutAuthorInput | Prisma.NewsUpdateManyWithWhereWithoutAuthorInput[];
    deleteMany?: Prisma.NewsScalarWhereInput | Prisma.NewsScalarWhereInput[];
};
export type NewsUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: Prisma.XOR<Prisma.NewsCreateWithoutAuthorInput, Prisma.NewsUncheckedCreateWithoutAuthorInput> | Prisma.NewsCreateWithoutAuthorInput[] | Prisma.NewsUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.NewsCreateOrConnectWithoutAuthorInput | Prisma.NewsCreateOrConnectWithoutAuthorInput[];
    upsert?: Prisma.NewsUpsertWithWhereUniqueWithoutAuthorInput | Prisma.NewsUpsertWithWhereUniqueWithoutAuthorInput[];
    createMany?: Prisma.NewsCreateManyAuthorInputEnvelope;
    set?: Prisma.NewsWhereUniqueInput | Prisma.NewsWhereUniqueInput[];
    disconnect?: Prisma.NewsWhereUniqueInput | Prisma.NewsWhereUniqueInput[];
    delete?: Prisma.NewsWhereUniqueInput | Prisma.NewsWhereUniqueInput[];
    connect?: Prisma.NewsWhereUniqueInput | Prisma.NewsWhereUniqueInput[];
    update?: Prisma.NewsUpdateWithWhereUniqueWithoutAuthorInput | Prisma.NewsUpdateWithWhereUniqueWithoutAuthorInput[];
    updateMany?: Prisma.NewsUpdateManyWithWhereWithoutAuthorInput | Prisma.NewsUpdateManyWithWhereWithoutAuthorInput[];
    deleteMany?: Prisma.NewsScalarWhereInput | Prisma.NewsScalarWhereInput[];
};
export type NewsCreateWithoutAuthorInput = {
    id?: string;
    title: string;
    slug: string;
    body: string;
    status?: string;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type NewsUncheckedCreateWithoutAuthorInput = {
    id?: string;
    title: string;
    slug: string;
    body: string;
    status?: string;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type NewsCreateOrConnectWithoutAuthorInput = {
    where: Prisma.NewsWhereUniqueInput;
    create: Prisma.XOR<Prisma.NewsCreateWithoutAuthorInput, Prisma.NewsUncheckedCreateWithoutAuthorInput>;
};
export type NewsCreateManyAuthorInputEnvelope = {
    data: Prisma.NewsCreateManyAuthorInput | Prisma.NewsCreateManyAuthorInput[];
};
export type NewsUpsertWithWhereUniqueWithoutAuthorInput = {
    where: Prisma.NewsWhereUniqueInput;
    update: Prisma.XOR<Prisma.NewsUpdateWithoutAuthorInput, Prisma.NewsUncheckedUpdateWithoutAuthorInput>;
    create: Prisma.XOR<Prisma.NewsCreateWithoutAuthorInput, Prisma.NewsUncheckedCreateWithoutAuthorInput>;
};
export type NewsUpdateWithWhereUniqueWithoutAuthorInput = {
    where: Prisma.NewsWhereUniqueInput;
    data: Prisma.XOR<Prisma.NewsUpdateWithoutAuthorInput, Prisma.NewsUncheckedUpdateWithoutAuthorInput>;
};
export type NewsUpdateManyWithWhereWithoutAuthorInput = {
    where: Prisma.NewsScalarWhereInput;
    data: Prisma.XOR<Prisma.NewsUpdateManyMutationInput, Prisma.NewsUncheckedUpdateManyWithoutAuthorInput>;
};
export type NewsScalarWhereInput = {
    AND?: Prisma.NewsScalarWhereInput | Prisma.NewsScalarWhereInput[];
    OR?: Prisma.NewsScalarWhereInput[];
    NOT?: Prisma.NewsScalarWhereInput | Prisma.NewsScalarWhereInput[];
    id?: Prisma.StringFilter<"News"> | string;
    title?: Prisma.StringFilter<"News"> | string;
    slug?: Prisma.StringFilter<"News"> | string;
    body?: Prisma.StringFilter<"News"> | string;
    status?: Prisma.StringFilter<"News"> | string;
    publishedAt?: Prisma.DateTimeNullableFilter<"News"> | Date | string | null;
    authorId?: Prisma.StringFilter<"News"> | string;
    createdAt?: Prisma.DateTimeFilter<"News"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"News"> | Date | string;
};
export type NewsCreateManyAuthorInput = {
    id?: string;
    title: string;
    slug: string;
    body: string;
    status?: string;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type NewsUpdateWithoutAuthorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NewsUncheckedUpdateWithoutAuthorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NewsUncheckedUpdateManyWithoutAuthorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NewsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    slug?: boolean;
    body?: boolean;
    status?: boolean;
    publishedAt?: boolean;
    authorId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["news"]>;
export type NewsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    slug?: boolean;
    body?: boolean;
    status?: boolean;
    publishedAt?: boolean;
    authorId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["news"]>;
export type NewsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    slug?: boolean;
    body?: boolean;
    status?: boolean;
    publishedAt?: boolean;
    authorId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["news"]>;
export type NewsSelectScalar = {
    id?: boolean;
    title?: boolean;
    slug?: boolean;
    body?: boolean;
    status?: boolean;
    publishedAt?: boolean;
    authorId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type NewsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "title" | "slug" | "body" | "status" | "publishedAt" | "authorId" | "createdAt" | "updatedAt", ExtArgs["result"]["news"]>;
export type NewsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type NewsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type NewsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $NewsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "News";
    objects: {
        author: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        title: string;
        slug: string;
        body: string;
        status: string;
        publishedAt: Date | null;
        authorId: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["news"]>;
    composites: {};
};
export type NewsGetPayload<S extends boolean | null | undefined | NewsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$NewsPayload, S>;
export type NewsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<NewsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: NewsCountAggregateInputType | true;
};
export interface NewsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['News'];
        meta: {
            name: 'News';
        };
    };
    findUnique<T extends NewsFindUniqueArgs>(args: Prisma.SelectSubset<T, NewsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__NewsClient<runtime.Types.Result.GetResult<Prisma.$NewsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends NewsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, NewsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__NewsClient<runtime.Types.Result.GetResult<Prisma.$NewsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends NewsFindFirstArgs>(args?: Prisma.SelectSubset<T, NewsFindFirstArgs<ExtArgs>>): Prisma.Prisma__NewsClient<runtime.Types.Result.GetResult<Prisma.$NewsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends NewsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, NewsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__NewsClient<runtime.Types.Result.GetResult<Prisma.$NewsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends NewsFindManyArgs>(args?: Prisma.SelectSubset<T, NewsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NewsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends NewsCreateArgs>(args: Prisma.SelectSubset<T, NewsCreateArgs<ExtArgs>>): Prisma.Prisma__NewsClient<runtime.Types.Result.GetResult<Prisma.$NewsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends NewsCreateManyArgs>(args?: Prisma.SelectSubset<T, NewsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends NewsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, NewsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NewsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends NewsDeleteArgs>(args: Prisma.SelectSubset<T, NewsDeleteArgs<ExtArgs>>): Prisma.Prisma__NewsClient<runtime.Types.Result.GetResult<Prisma.$NewsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends NewsUpdateArgs>(args: Prisma.SelectSubset<T, NewsUpdateArgs<ExtArgs>>): Prisma.Prisma__NewsClient<runtime.Types.Result.GetResult<Prisma.$NewsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends NewsDeleteManyArgs>(args?: Prisma.SelectSubset<T, NewsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends NewsUpdateManyArgs>(args: Prisma.SelectSubset<T, NewsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends NewsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, NewsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NewsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends NewsUpsertArgs>(args: Prisma.SelectSubset<T, NewsUpsertArgs<ExtArgs>>): Prisma.Prisma__NewsClient<runtime.Types.Result.GetResult<Prisma.$NewsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends NewsCountArgs>(args?: Prisma.Subset<T, NewsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], NewsCountAggregateOutputType> : number>;
    aggregate<T extends NewsAggregateArgs>(args: Prisma.Subset<T, NewsAggregateArgs>): Prisma.PrismaPromise<GetNewsAggregateType<T>>;
    groupBy<T extends NewsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: NewsGroupByArgs['orderBy'];
    } : {
        orderBy?: NewsGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, NewsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNewsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: NewsFieldRefs;
}
export interface Prisma__NewsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    author<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface NewsFieldRefs {
    readonly id: Prisma.FieldRef<"News", 'String'>;
    readonly title: Prisma.FieldRef<"News", 'String'>;
    readonly slug: Prisma.FieldRef<"News", 'String'>;
    readonly body: Prisma.FieldRef<"News", 'String'>;
    readonly status: Prisma.FieldRef<"News", 'String'>;
    readonly publishedAt: Prisma.FieldRef<"News", 'DateTime'>;
    readonly authorId: Prisma.FieldRef<"News", 'String'>;
    readonly createdAt: Prisma.FieldRef<"News", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"News", 'DateTime'>;
}
export type NewsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NewsSelect<ExtArgs> | null;
    omit?: Prisma.NewsOmit<ExtArgs> | null;
    include?: Prisma.NewsInclude<ExtArgs> | null;
    where: Prisma.NewsWhereUniqueInput;
};
export type NewsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NewsSelect<ExtArgs> | null;
    omit?: Prisma.NewsOmit<ExtArgs> | null;
    include?: Prisma.NewsInclude<ExtArgs> | null;
    where: Prisma.NewsWhereUniqueInput;
};
export type NewsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NewsSelect<ExtArgs> | null;
    omit?: Prisma.NewsOmit<ExtArgs> | null;
    include?: Prisma.NewsInclude<ExtArgs> | null;
    where?: Prisma.NewsWhereInput;
    orderBy?: Prisma.NewsOrderByWithRelationInput | Prisma.NewsOrderByWithRelationInput[];
    cursor?: Prisma.NewsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NewsScalarFieldEnum | Prisma.NewsScalarFieldEnum[];
};
export type NewsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NewsSelect<ExtArgs> | null;
    omit?: Prisma.NewsOmit<ExtArgs> | null;
    include?: Prisma.NewsInclude<ExtArgs> | null;
    where?: Prisma.NewsWhereInput;
    orderBy?: Prisma.NewsOrderByWithRelationInput | Prisma.NewsOrderByWithRelationInput[];
    cursor?: Prisma.NewsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NewsScalarFieldEnum | Prisma.NewsScalarFieldEnum[];
};
export type NewsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NewsSelect<ExtArgs> | null;
    omit?: Prisma.NewsOmit<ExtArgs> | null;
    include?: Prisma.NewsInclude<ExtArgs> | null;
    where?: Prisma.NewsWhereInput;
    orderBy?: Prisma.NewsOrderByWithRelationInput | Prisma.NewsOrderByWithRelationInput[];
    cursor?: Prisma.NewsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NewsScalarFieldEnum | Prisma.NewsScalarFieldEnum[];
};
export type NewsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NewsSelect<ExtArgs> | null;
    omit?: Prisma.NewsOmit<ExtArgs> | null;
    include?: Prisma.NewsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.NewsCreateInput, Prisma.NewsUncheckedCreateInput>;
};
export type NewsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.NewsCreateManyInput | Prisma.NewsCreateManyInput[];
};
export type NewsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NewsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.NewsOmit<ExtArgs> | null;
    data: Prisma.NewsCreateManyInput | Prisma.NewsCreateManyInput[];
    include?: Prisma.NewsIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type NewsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NewsSelect<ExtArgs> | null;
    omit?: Prisma.NewsOmit<ExtArgs> | null;
    include?: Prisma.NewsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.NewsUpdateInput, Prisma.NewsUncheckedUpdateInput>;
    where: Prisma.NewsWhereUniqueInput;
};
export type NewsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.NewsUpdateManyMutationInput, Prisma.NewsUncheckedUpdateManyInput>;
    where?: Prisma.NewsWhereInput;
    limit?: number;
};
export type NewsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NewsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.NewsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.NewsUpdateManyMutationInput, Prisma.NewsUncheckedUpdateManyInput>;
    where?: Prisma.NewsWhereInput;
    limit?: number;
    include?: Prisma.NewsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type NewsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NewsSelect<ExtArgs> | null;
    omit?: Prisma.NewsOmit<ExtArgs> | null;
    include?: Prisma.NewsInclude<ExtArgs> | null;
    where: Prisma.NewsWhereUniqueInput;
    create: Prisma.XOR<Prisma.NewsCreateInput, Prisma.NewsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.NewsUpdateInput, Prisma.NewsUncheckedUpdateInput>;
};
export type NewsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NewsSelect<ExtArgs> | null;
    omit?: Prisma.NewsOmit<ExtArgs> | null;
    include?: Prisma.NewsInclude<ExtArgs> | null;
    where: Prisma.NewsWhereUniqueInput;
};
export type NewsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NewsWhereInput;
    limit?: number;
};
export type NewsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NewsSelect<ExtArgs> | null;
    omit?: Prisma.NewsOmit<ExtArgs> | null;
    include?: Prisma.NewsInclude<ExtArgs> | null;
};
