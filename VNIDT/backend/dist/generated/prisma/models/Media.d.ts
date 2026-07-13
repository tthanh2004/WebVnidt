import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type MediaModel = runtime.Types.Result.DefaultSelection<Prisma.$MediaPayload>;
export type AggregateMedia = {
    _count: MediaCountAggregateOutputType | null;
    _avg: MediaAvgAggregateOutputType | null;
    _sum: MediaSumAggregateOutputType | null;
    _min: MediaMinAggregateOutputType | null;
    _max: MediaMaxAggregateOutputType | null;
};
export type MediaAvgAggregateOutputType = {
    sizeBytes: number | null;
};
export type MediaSumAggregateOutputType = {
    sizeBytes: number | null;
};
export type MediaMinAggregateOutputType = {
    id: string | null;
    fileName: string | null;
    fileUrl: string | null;
    mimeType: string | null;
    sizeBytes: number | null;
    uploaderId: string | null;
    createdAt: Date | null;
};
export type MediaMaxAggregateOutputType = {
    id: string | null;
    fileName: string | null;
    fileUrl: string | null;
    mimeType: string | null;
    sizeBytes: number | null;
    uploaderId: string | null;
    createdAt: Date | null;
};
export type MediaCountAggregateOutputType = {
    id: number;
    fileName: number;
    fileUrl: number;
    mimeType: number;
    sizeBytes: number;
    uploaderId: number;
    createdAt: number;
    _all: number;
};
export type MediaAvgAggregateInputType = {
    sizeBytes?: true;
};
export type MediaSumAggregateInputType = {
    sizeBytes?: true;
};
export type MediaMinAggregateInputType = {
    id?: true;
    fileName?: true;
    fileUrl?: true;
    mimeType?: true;
    sizeBytes?: true;
    uploaderId?: true;
    createdAt?: true;
};
export type MediaMaxAggregateInputType = {
    id?: true;
    fileName?: true;
    fileUrl?: true;
    mimeType?: true;
    sizeBytes?: true;
    uploaderId?: true;
    createdAt?: true;
};
export type MediaCountAggregateInputType = {
    id?: true;
    fileName?: true;
    fileUrl?: true;
    mimeType?: true;
    sizeBytes?: true;
    uploaderId?: true;
    createdAt?: true;
    _all?: true;
};
export type MediaAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MediaWhereInput;
    orderBy?: Prisma.MediaOrderByWithRelationInput | Prisma.MediaOrderByWithRelationInput[];
    cursor?: Prisma.MediaWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | MediaCountAggregateInputType;
    _avg?: MediaAvgAggregateInputType;
    _sum?: MediaSumAggregateInputType;
    _min?: MediaMinAggregateInputType;
    _max?: MediaMaxAggregateInputType;
};
export type GetMediaAggregateType<T extends MediaAggregateArgs> = {
    [P in keyof T & keyof AggregateMedia]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMedia[P]> : Prisma.GetScalarType<T[P], AggregateMedia[P]>;
};
export type MediaGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MediaWhereInput;
    orderBy?: Prisma.MediaOrderByWithAggregationInput | Prisma.MediaOrderByWithAggregationInput[];
    by: Prisma.MediaScalarFieldEnum[] | Prisma.MediaScalarFieldEnum;
    having?: Prisma.MediaScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MediaCountAggregateInputType | true;
    _avg?: MediaAvgAggregateInputType;
    _sum?: MediaSumAggregateInputType;
    _min?: MediaMinAggregateInputType;
    _max?: MediaMaxAggregateInputType;
};
export type MediaGroupByOutputType = {
    id: string;
    fileName: string;
    fileUrl: string;
    mimeType: string;
    sizeBytes: number;
    uploaderId: string;
    createdAt: Date;
    _count: MediaCountAggregateOutputType | null;
    _avg: MediaAvgAggregateOutputType | null;
    _sum: MediaSumAggregateOutputType | null;
    _min: MediaMinAggregateOutputType | null;
    _max: MediaMaxAggregateOutputType | null;
};
export type GetMediaGroupByPayload<T extends MediaGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MediaGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MediaGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MediaGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MediaGroupByOutputType[P]>;
}>>;
export type MediaWhereInput = {
    AND?: Prisma.MediaWhereInput | Prisma.MediaWhereInput[];
    OR?: Prisma.MediaWhereInput[];
    NOT?: Prisma.MediaWhereInput | Prisma.MediaWhereInput[];
    id?: Prisma.StringFilter<"Media"> | string;
    fileName?: Prisma.StringFilter<"Media"> | string;
    fileUrl?: Prisma.StringFilter<"Media"> | string;
    mimeType?: Prisma.StringFilter<"Media"> | string;
    sizeBytes?: Prisma.IntFilter<"Media"> | number;
    uploaderId?: Prisma.StringFilter<"Media"> | string;
    createdAt?: Prisma.DateTimeFilter<"Media"> | Date | string;
    uploader?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type MediaOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    fileName?: Prisma.SortOrder;
    fileUrl?: Prisma.SortOrder;
    mimeType?: Prisma.SortOrder;
    sizeBytes?: Prisma.SortOrder;
    uploaderId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    uploader?: Prisma.UserOrderByWithRelationInput;
};
export type MediaWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.MediaWhereInput | Prisma.MediaWhereInput[];
    OR?: Prisma.MediaWhereInput[];
    NOT?: Prisma.MediaWhereInput | Prisma.MediaWhereInput[];
    fileName?: Prisma.StringFilter<"Media"> | string;
    fileUrl?: Prisma.StringFilter<"Media"> | string;
    mimeType?: Prisma.StringFilter<"Media"> | string;
    sizeBytes?: Prisma.IntFilter<"Media"> | number;
    uploaderId?: Prisma.StringFilter<"Media"> | string;
    createdAt?: Prisma.DateTimeFilter<"Media"> | Date | string;
    uploader?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type MediaOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    fileName?: Prisma.SortOrder;
    fileUrl?: Prisma.SortOrder;
    mimeType?: Prisma.SortOrder;
    sizeBytes?: Prisma.SortOrder;
    uploaderId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.MediaCountOrderByAggregateInput;
    _avg?: Prisma.MediaAvgOrderByAggregateInput;
    _max?: Prisma.MediaMaxOrderByAggregateInput;
    _min?: Prisma.MediaMinOrderByAggregateInput;
    _sum?: Prisma.MediaSumOrderByAggregateInput;
};
export type MediaScalarWhereWithAggregatesInput = {
    AND?: Prisma.MediaScalarWhereWithAggregatesInput | Prisma.MediaScalarWhereWithAggregatesInput[];
    OR?: Prisma.MediaScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MediaScalarWhereWithAggregatesInput | Prisma.MediaScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Media"> | string;
    fileName?: Prisma.StringWithAggregatesFilter<"Media"> | string;
    fileUrl?: Prisma.StringWithAggregatesFilter<"Media"> | string;
    mimeType?: Prisma.StringWithAggregatesFilter<"Media"> | string;
    sizeBytes?: Prisma.IntWithAggregatesFilter<"Media"> | number;
    uploaderId?: Prisma.StringWithAggregatesFilter<"Media"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Media"> | Date | string;
};
export type MediaCreateInput = {
    id?: string;
    fileName: string;
    fileUrl: string;
    mimeType: string;
    sizeBytes: number;
    createdAt?: Date | string;
    uploader: Prisma.UserCreateNestedOneWithoutMediaInput;
};
export type MediaUncheckedCreateInput = {
    id?: string;
    fileName: string;
    fileUrl: string;
    mimeType: string;
    sizeBytes: number;
    uploaderId: string;
    createdAt?: Date | string;
};
export type MediaUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fileName?: Prisma.StringFieldUpdateOperationsInput | string;
    fileUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    sizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    uploader?: Prisma.UserUpdateOneRequiredWithoutMediaNestedInput;
};
export type MediaUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fileName?: Prisma.StringFieldUpdateOperationsInput | string;
    fileUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    sizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    uploaderId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MediaCreateManyInput = {
    id?: string;
    fileName: string;
    fileUrl: string;
    mimeType: string;
    sizeBytes: number;
    uploaderId: string;
    createdAt?: Date | string;
};
export type MediaUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fileName?: Prisma.StringFieldUpdateOperationsInput | string;
    fileUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    sizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MediaUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fileName?: Prisma.StringFieldUpdateOperationsInput | string;
    fileUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    sizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    uploaderId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MediaListRelationFilter = {
    every?: Prisma.MediaWhereInput;
    some?: Prisma.MediaWhereInput;
    none?: Prisma.MediaWhereInput;
};
export type MediaOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MediaCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fileName?: Prisma.SortOrder;
    fileUrl?: Prisma.SortOrder;
    mimeType?: Prisma.SortOrder;
    sizeBytes?: Prisma.SortOrder;
    uploaderId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MediaAvgOrderByAggregateInput = {
    sizeBytes?: Prisma.SortOrder;
};
export type MediaMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fileName?: Prisma.SortOrder;
    fileUrl?: Prisma.SortOrder;
    mimeType?: Prisma.SortOrder;
    sizeBytes?: Prisma.SortOrder;
    uploaderId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MediaMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fileName?: Prisma.SortOrder;
    fileUrl?: Prisma.SortOrder;
    mimeType?: Prisma.SortOrder;
    sizeBytes?: Prisma.SortOrder;
    uploaderId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MediaSumOrderByAggregateInput = {
    sizeBytes?: Prisma.SortOrder;
};
export type MediaCreateNestedManyWithoutUploaderInput = {
    create?: Prisma.XOR<Prisma.MediaCreateWithoutUploaderInput, Prisma.MediaUncheckedCreateWithoutUploaderInput> | Prisma.MediaCreateWithoutUploaderInput[] | Prisma.MediaUncheckedCreateWithoutUploaderInput[];
    connectOrCreate?: Prisma.MediaCreateOrConnectWithoutUploaderInput | Prisma.MediaCreateOrConnectWithoutUploaderInput[];
    createMany?: Prisma.MediaCreateManyUploaderInputEnvelope;
    connect?: Prisma.MediaWhereUniqueInput | Prisma.MediaWhereUniqueInput[];
};
export type MediaUncheckedCreateNestedManyWithoutUploaderInput = {
    create?: Prisma.XOR<Prisma.MediaCreateWithoutUploaderInput, Prisma.MediaUncheckedCreateWithoutUploaderInput> | Prisma.MediaCreateWithoutUploaderInput[] | Prisma.MediaUncheckedCreateWithoutUploaderInput[];
    connectOrCreate?: Prisma.MediaCreateOrConnectWithoutUploaderInput | Prisma.MediaCreateOrConnectWithoutUploaderInput[];
    createMany?: Prisma.MediaCreateManyUploaderInputEnvelope;
    connect?: Prisma.MediaWhereUniqueInput | Prisma.MediaWhereUniqueInput[];
};
export type MediaUpdateManyWithoutUploaderNestedInput = {
    create?: Prisma.XOR<Prisma.MediaCreateWithoutUploaderInput, Prisma.MediaUncheckedCreateWithoutUploaderInput> | Prisma.MediaCreateWithoutUploaderInput[] | Prisma.MediaUncheckedCreateWithoutUploaderInput[];
    connectOrCreate?: Prisma.MediaCreateOrConnectWithoutUploaderInput | Prisma.MediaCreateOrConnectWithoutUploaderInput[];
    upsert?: Prisma.MediaUpsertWithWhereUniqueWithoutUploaderInput | Prisma.MediaUpsertWithWhereUniqueWithoutUploaderInput[];
    createMany?: Prisma.MediaCreateManyUploaderInputEnvelope;
    set?: Prisma.MediaWhereUniqueInput | Prisma.MediaWhereUniqueInput[];
    disconnect?: Prisma.MediaWhereUniqueInput | Prisma.MediaWhereUniqueInput[];
    delete?: Prisma.MediaWhereUniqueInput | Prisma.MediaWhereUniqueInput[];
    connect?: Prisma.MediaWhereUniqueInput | Prisma.MediaWhereUniqueInput[];
    update?: Prisma.MediaUpdateWithWhereUniqueWithoutUploaderInput | Prisma.MediaUpdateWithWhereUniqueWithoutUploaderInput[];
    updateMany?: Prisma.MediaUpdateManyWithWhereWithoutUploaderInput | Prisma.MediaUpdateManyWithWhereWithoutUploaderInput[];
    deleteMany?: Prisma.MediaScalarWhereInput | Prisma.MediaScalarWhereInput[];
};
export type MediaUncheckedUpdateManyWithoutUploaderNestedInput = {
    create?: Prisma.XOR<Prisma.MediaCreateWithoutUploaderInput, Prisma.MediaUncheckedCreateWithoutUploaderInput> | Prisma.MediaCreateWithoutUploaderInput[] | Prisma.MediaUncheckedCreateWithoutUploaderInput[];
    connectOrCreate?: Prisma.MediaCreateOrConnectWithoutUploaderInput | Prisma.MediaCreateOrConnectWithoutUploaderInput[];
    upsert?: Prisma.MediaUpsertWithWhereUniqueWithoutUploaderInput | Prisma.MediaUpsertWithWhereUniqueWithoutUploaderInput[];
    createMany?: Prisma.MediaCreateManyUploaderInputEnvelope;
    set?: Prisma.MediaWhereUniqueInput | Prisma.MediaWhereUniqueInput[];
    disconnect?: Prisma.MediaWhereUniqueInput | Prisma.MediaWhereUniqueInput[];
    delete?: Prisma.MediaWhereUniqueInput | Prisma.MediaWhereUniqueInput[];
    connect?: Prisma.MediaWhereUniqueInput | Prisma.MediaWhereUniqueInput[];
    update?: Prisma.MediaUpdateWithWhereUniqueWithoutUploaderInput | Prisma.MediaUpdateWithWhereUniqueWithoutUploaderInput[];
    updateMany?: Prisma.MediaUpdateManyWithWhereWithoutUploaderInput | Prisma.MediaUpdateManyWithWhereWithoutUploaderInput[];
    deleteMany?: Prisma.MediaScalarWhereInput | Prisma.MediaScalarWhereInput[];
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type MediaCreateWithoutUploaderInput = {
    id?: string;
    fileName: string;
    fileUrl: string;
    mimeType: string;
    sizeBytes: number;
    createdAt?: Date | string;
};
export type MediaUncheckedCreateWithoutUploaderInput = {
    id?: string;
    fileName: string;
    fileUrl: string;
    mimeType: string;
    sizeBytes: number;
    createdAt?: Date | string;
};
export type MediaCreateOrConnectWithoutUploaderInput = {
    where: Prisma.MediaWhereUniqueInput;
    create: Prisma.XOR<Prisma.MediaCreateWithoutUploaderInput, Prisma.MediaUncheckedCreateWithoutUploaderInput>;
};
export type MediaCreateManyUploaderInputEnvelope = {
    data: Prisma.MediaCreateManyUploaderInput | Prisma.MediaCreateManyUploaderInput[];
};
export type MediaUpsertWithWhereUniqueWithoutUploaderInput = {
    where: Prisma.MediaWhereUniqueInput;
    update: Prisma.XOR<Prisma.MediaUpdateWithoutUploaderInput, Prisma.MediaUncheckedUpdateWithoutUploaderInput>;
    create: Prisma.XOR<Prisma.MediaCreateWithoutUploaderInput, Prisma.MediaUncheckedCreateWithoutUploaderInput>;
};
export type MediaUpdateWithWhereUniqueWithoutUploaderInput = {
    where: Prisma.MediaWhereUniqueInput;
    data: Prisma.XOR<Prisma.MediaUpdateWithoutUploaderInput, Prisma.MediaUncheckedUpdateWithoutUploaderInput>;
};
export type MediaUpdateManyWithWhereWithoutUploaderInput = {
    where: Prisma.MediaScalarWhereInput;
    data: Prisma.XOR<Prisma.MediaUpdateManyMutationInput, Prisma.MediaUncheckedUpdateManyWithoutUploaderInput>;
};
export type MediaScalarWhereInput = {
    AND?: Prisma.MediaScalarWhereInput | Prisma.MediaScalarWhereInput[];
    OR?: Prisma.MediaScalarWhereInput[];
    NOT?: Prisma.MediaScalarWhereInput | Prisma.MediaScalarWhereInput[];
    id?: Prisma.StringFilter<"Media"> | string;
    fileName?: Prisma.StringFilter<"Media"> | string;
    fileUrl?: Prisma.StringFilter<"Media"> | string;
    mimeType?: Prisma.StringFilter<"Media"> | string;
    sizeBytes?: Prisma.IntFilter<"Media"> | number;
    uploaderId?: Prisma.StringFilter<"Media"> | string;
    createdAt?: Prisma.DateTimeFilter<"Media"> | Date | string;
};
export type MediaCreateManyUploaderInput = {
    id?: string;
    fileName: string;
    fileUrl: string;
    mimeType: string;
    sizeBytes: number;
    createdAt?: Date | string;
};
export type MediaUpdateWithoutUploaderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fileName?: Prisma.StringFieldUpdateOperationsInput | string;
    fileUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    sizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MediaUncheckedUpdateWithoutUploaderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fileName?: Prisma.StringFieldUpdateOperationsInput | string;
    fileUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    sizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MediaUncheckedUpdateManyWithoutUploaderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fileName?: Prisma.StringFieldUpdateOperationsInput | string;
    fileUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    sizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MediaSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fileName?: boolean;
    fileUrl?: boolean;
    mimeType?: boolean;
    sizeBytes?: boolean;
    uploaderId?: boolean;
    createdAt?: boolean;
    uploader?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["media"]>;
export type MediaSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fileName?: boolean;
    fileUrl?: boolean;
    mimeType?: boolean;
    sizeBytes?: boolean;
    uploaderId?: boolean;
    createdAt?: boolean;
    uploader?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["media"]>;
export type MediaSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fileName?: boolean;
    fileUrl?: boolean;
    mimeType?: boolean;
    sizeBytes?: boolean;
    uploaderId?: boolean;
    createdAt?: boolean;
    uploader?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["media"]>;
export type MediaSelectScalar = {
    id?: boolean;
    fileName?: boolean;
    fileUrl?: boolean;
    mimeType?: boolean;
    sizeBytes?: boolean;
    uploaderId?: boolean;
    createdAt?: boolean;
};
export type MediaOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "fileName" | "fileUrl" | "mimeType" | "sizeBytes" | "uploaderId" | "createdAt", ExtArgs["result"]["media"]>;
export type MediaInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    uploader?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type MediaIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    uploader?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type MediaIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    uploader?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $MediaPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Media";
    objects: {
        uploader: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        fileName: string;
        fileUrl: string;
        mimeType: string;
        sizeBytes: number;
        uploaderId: string;
        createdAt: Date;
    }, ExtArgs["result"]["media"]>;
    composites: {};
};
export type MediaGetPayload<S extends boolean | null | undefined | MediaDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MediaPayload, S>;
export type MediaCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MediaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MediaCountAggregateInputType | true;
};
export interface MediaDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Media'];
        meta: {
            name: 'Media';
        };
    };
    findUnique<T extends MediaFindUniqueArgs>(args: Prisma.SelectSubset<T, MediaFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MediaClient<runtime.Types.Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends MediaFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MediaFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MediaClient<runtime.Types.Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends MediaFindFirstArgs>(args?: Prisma.SelectSubset<T, MediaFindFirstArgs<ExtArgs>>): Prisma.Prisma__MediaClient<runtime.Types.Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends MediaFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MediaFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MediaClient<runtime.Types.Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends MediaFindManyArgs>(args?: Prisma.SelectSubset<T, MediaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends MediaCreateArgs>(args: Prisma.SelectSubset<T, MediaCreateArgs<ExtArgs>>): Prisma.Prisma__MediaClient<runtime.Types.Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends MediaCreateManyArgs>(args?: Prisma.SelectSubset<T, MediaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends MediaCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MediaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends MediaDeleteArgs>(args: Prisma.SelectSubset<T, MediaDeleteArgs<ExtArgs>>): Prisma.Prisma__MediaClient<runtime.Types.Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends MediaUpdateArgs>(args: Prisma.SelectSubset<T, MediaUpdateArgs<ExtArgs>>): Prisma.Prisma__MediaClient<runtime.Types.Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends MediaDeleteManyArgs>(args?: Prisma.SelectSubset<T, MediaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends MediaUpdateManyArgs>(args: Prisma.SelectSubset<T, MediaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends MediaUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MediaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends MediaUpsertArgs>(args: Prisma.SelectSubset<T, MediaUpsertArgs<ExtArgs>>): Prisma.Prisma__MediaClient<runtime.Types.Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends MediaCountArgs>(args?: Prisma.Subset<T, MediaCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MediaCountAggregateOutputType> : number>;
    aggregate<T extends MediaAggregateArgs>(args: Prisma.Subset<T, MediaAggregateArgs>): Prisma.PrismaPromise<GetMediaAggregateType<T>>;
    groupBy<T extends MediaGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MediaGroupByArgs['orderBy'];
    } : {
        orderBy?: MediaGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MediaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMediaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: MediaFieldRefs;
}
export interface Prisma__MediaClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    uploader<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface MediaFieldRefs {
    readonly id: Prisma.FieldRef<"Media", 'String'>;
    readonly fileName: Prisma.FieldRef<"Media", 'String'>;
    readonly fileUrl: Prisma.FieldRef<"Media", 'String'>;
    readonly mimeType: Prisma.FieldRef<"Media", 'String'>;
    readonly sizeBytes: Prisma.FieldRef<"Media", 'Int'>;
    readonly uploaderId: Prisma.FieldRef<"Media", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Media", 'DateTime'>;
}
export type MediaFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MediaSelect<ExtArgs> | null;
    omit?: Prisma.MediaOmit<ExtArgs> | null;
    include?: Prisma.MediaInclude<ExtArgs> | null;
    where: Prisma.MediaWhereUniqueInput;
};
export type MediaFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MediaSelect<ExtArgs> | null;
    omit?: Prisma.MediaOmit<ExtArgs> | null;
    include?: Prisma.MediaInclude<ExtArgs> | null;
    where: Prisma.MediaWhereUniqueInput;
};
export type MediaFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MediaSelect<ExtArgs> | null;
    omit?: Prisma.MediaOmit<ExtArgs> | null;
    include?: Prisma.MediaInclude<ExtArgs> | null;
    where?: Prisma.MediaWhereInput;
    orderBy?: Prisma.MediaOrderByWithRelationInput | Prisma.MediaOrderByWithRelationInput[];
    cursor?: Prisma.MediaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MediaScalarFieldEnum | Prisma.MediaScalarFieldEnum[];
};
export type MediaFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MediaSelect<ExtArgs> | null;
    omit?: Prisma.MediaOmit<ExtArgs> | null;
    include?: Prisma.MediaInclude<ExtArgs> | null;
    where?: Prisma.MediaWhereInput;
    orderBy?: Prisma.MediaOrderByWithRelationInput | Prisma.MediaOrderByWithRelationInput[];
    cursor?: Prisma.MediaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MediaScalarFieldEnum | Prisma.MediaScalarFieldEnum[];
};
export type MediaFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MediaSelect<ExtArgs> | null;
    omit?: Prisma.MediaOmit<ExtArgs> | null;
    include?: Prisma.MediaInclude<ExtArgs> | null;
    where?: Prisma.MediaWhereInput;
    orderBy?: Prisma.MediaOrderByWithRelationInput | Prisma.MediaOrderByWithRelationInput[];
    cursor?: Prisma.MediaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MediaScalarFieldEnum | Prisma.MediaScalarFieldEnum[];
};
export type MediaCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MediaSelect<ExtArgs> | null;
    omit?: Prisma.MediaOmit<ExtArgs> | null;
    include?: Prisma.MediaInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MediaCreateInput, Prisma.MediaUncheckedCreateInput>;
};
export type MediaCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.MediaCreateManyInput | Prisma.MediaCreateManyInput[];
};
export type MediaCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MediaSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MediaOmit<ExtArgs> | null;
    data: Prisma.MediaCreateManyInput | Prisma.MediaCreateManyInput[];
    include?: Prisma.MediaIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type MediaUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MediaSelect<ExtArgs> | null;
    omit?: Prisma.MediaOmit<ExtArgs> | null;
    include?: Prisma.MediaInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MediaUpdateInput, Prisma.MediaUncheckedUpdateInput>;
    where: Prisma.MediaWhereUniqueInput;
};
export type MediaUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.MediaUpdateManyMutationInput, Prisma.MediaUncheckedUpdateManyInput>;
    where?: Prisma.MediaWhereInput;
    limit?: number;
};
export type MediaUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MediaSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MediaOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MediaUpdateManyMutationInput, Prisma.MediaUncheckedUpdateManyInput>;
    where?: Prisma.MediaWhereInput;
    limit?: number;
    include?: Prisma.MediaIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type MediaUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MediaSelect<ExtArgs> | null;
    omit?: Prisma.MediaOmit<ExtArgs> | null;
    include?: Prisma.MediaInclude<ExtArgs> | null;
    where: Prisma.MediaWhereUniqueInput;
    create: Prisma.XOR<Prisma.MediaCreateInput, Prisma.MediaUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.MediaUpdateInput, Prisma.MediaUncheckedUpdateInput>;
};
export type MediaDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MediaSelect<ExtArgs> | null;
    omit?: Prisma.MediaOmit<ExtArgs> | null;
    include?: Prisma.MediaInclude<ExtArgs> | null;
    where: Prisma.MediaWhereUniqueInput;
};
export type MediaDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MediaWhereInput;
    limit?: number;
};
export type MediaDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MediaSelect<ExtArgs> | null;
    omit?: Prisma.MediaOmit<ExtArgs> | null;
    include?: Prisma.MediaInclude<ExtArgs> | null;
};
