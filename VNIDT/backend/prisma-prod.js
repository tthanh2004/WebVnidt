/* ============================================================
   VNiDT — prisma-prod.js
   Automatically patch Prisma schema provider for production build
   ============================================================ */

const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'prisma', 'schema.prisma');

function patchSchema() {
  try {
    if (!fs.existsSync(schemaPath)) {
      console.warn(`[Prisma Patch] Schema not found at: ${schemaPath}`);
      return;
    }

    const isRender = process.env.RENDER === 'true';
    const isPostgres = process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith('postgres');

    if (isRender || isPostgres) {
      console.log('[Prisma Patch] Production environment or PostgreSQL URL detected.');
      let schema = fs.readFileSync(schemaPath, 'utf8');

      // Replace provider = "sqlite" with provider = "postgresql"
      if (schema.includes('provider = "sqlite"')) {
        schema = schema.replace(/provider\s*=\s*"sqlite"/g, 'provider = "postgresql"');
        fs.writeFileSync(schemaPath, schema, 'utf8');
        console.log('[Prisma Patch] Successfully converted schema.prisma database provider to "postgresql".');
      } else {
        console.log('[Prisma Patch] schema.prisma is already configured for "postgresql" or other provider.');
      }
    } else {
      console.log('[Prisma Patch] Local environment or SQLite URL detected. Keeping SQLite provider.');
    }
  } catch (error) {
    console.error('[Prisma Patch] Failed to patch schema.prisma:', error);
  }
}

patchSchema();
