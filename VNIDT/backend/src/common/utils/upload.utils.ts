import { join, resolve } from 'path';
import { existsSync, mkdirSync } from 'fs';

export function getUploadDir(): string {
  let current = __dirname;
  
  // Try to locate the sibling frontend directory up to 5 levels up
  for (let i = 0; i < 5; i++) {
    const parent = resolve(current, '..');
    if (parent === current) break;
    const frontendPath = join(parent, 'frontend');
    if (existsSync(frontendPath) && existsSync(join(frontendPath, 'assets'))) {
      const uploadPath = join(frontendPath, 'assets', 'uploads');
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath, { recursive: true });
      }
      return uploadPath;
    }
    current = parent;
  }
  
  // Fallback to backend's public directory for production (e.g. Render)
  let backendRoot = __dirname;
  for (let i = 0; i < 5; i++) {
    if (existsSync(join(backendRoot, 'package.json'))) {
      break;
    }
    const parent = resolve(backendRoot, '..');
    if (parent === backendRoot) break;
    backendRoot = parent;
  }
  
  const prodPath = join(backendRoot, 'public', 'assets', 'uploads');
  if (!existsSync(prodPath)) {
    mkdirSync(prodPath, { recursive: true });
  }
  return prodPath;
}
