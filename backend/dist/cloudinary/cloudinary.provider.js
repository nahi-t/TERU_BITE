"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryProvider = exports.CLOUDINARY = void 0;
const config_1 = require("@nestjs/config");
const cloudinary_1 = require("cloudinary");
exports.CLOUDINARY = 'Cloudinary';
exports.CloudinaryProvider = {
    provide: exports.CLOUDINARY,
    inject: [config_1.ConfigService],
    useFactory: (configService) => {
        const cloudinaryUrl = configService.get('CLOUDINARY_URL');
        return cloudinary_1.v2.config({
            secure: true,
        });
    },
};
//# sourceMappingURL=cloudinary.provider.js.map