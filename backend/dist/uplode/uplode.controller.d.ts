import { CloudinaryService } from '../cloudinary/cloudinary.service';
export declare class UplodeController {
    private readonly cloudinaryService;
    constructor(cloudinaryService: CloudinaryService);
    uploadFile(file: Express.Multer.File): Promise<{
        url: string;
    }>;
}
