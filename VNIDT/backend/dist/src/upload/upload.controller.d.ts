export declare class UploadController {
    uploadImage(file: any): {
        success: boolean;
        imageUrl: string;
        message: string;
    };
    uploadFile(file: any): {
        success: boolean;
        fileUrl: string;
        originalName: any;
        message: string;
    };
}
