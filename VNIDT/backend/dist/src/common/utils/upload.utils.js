"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUploadDir = getUploadDir;
const path_1 = require("path");
const fs_1 = require("fs");
function getUploadDir() {
    let current = __dirname;
    for (let i = 0; i < 5; i++) {
        const parent = (0, path_1.resolve)(current, '..');
        if (parent === current)
            break;
        const frontendPath = (0, path_1.join)(parent, 'frontend');
        if ((0, fs_1.existsSync)(frontendPath) && (0, fs_1.existsSync)((0, path_1.join)(frontendPath, 'assets'))) {
            const uploadPath = (0, path_1.join)(frontendPath, 'assets', 'uploads');
            if (!(0, fs_1.existsSync)(uploadPath)) {
                (0, fs_1.mkdirSync)(uploadPath, { recursive: true });
            }
            return uploadPath;
        }
        current = parent;
    }
    let backendRoot = __dirname;
    for (let i = 0; i < 5; i++) {
        if ((0, fs_1.existsSync)((0, path_1.join)(backendRoot, 'package.json'))) {
            break;
        }
        const parent = (0, path_1.resolve)(backendRoot, '..');
        if (parent === backendRoot)
            break;
        backendRoot = parent;
    }
    const prodPath = (0, path_1.join)(backendRoot, 'public', 'assets', 'uploads');
    if (!(0, fs_1.existsSync)(prodPath)) {
        (0, fs_1.mkdirSync)(prodPath, { recursive: true });
    }
    return prodPath;
}
//# sourceMappingURL=upload.utils.js.map