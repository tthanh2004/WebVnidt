/* ============================================================
   VNiDT — db-init.js
   Self-healing database initialization script for startup
   ============================================================ */

const { execSync } = require('child_process');

function runCommand(command) {
  try {
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    return false;
  }
}

function initDb() {
  console.log('[DB Init] Attempting standard database schema push...');
  const success = runCommand('npx prisma db push --accept-data-loss');

  if (!success) {
    console.warn('[DB Init] Standard push failed (likely due to schema conflicts). Attempting database reset...');
    const resetSuccess = runCommand('npx prisma db push --force-reset --accept-data-loss');
    if (!resetSuccess) {
      console.error('[DB Init] Database schema push failed critically.');
      process.exit(1);
    }
  }

  console.log('[DB Init] Database schema is up-to-date. Running seed script...');
  const seedSuccess = runCommand('node seed.js');
  if (!seedSuccess) {
    console.error('[DB Init] Database seeding failed.');
    process.exit(1);
  }

  console.log('[DB Init] Database initialization completed successfully!');
}

initDb();
