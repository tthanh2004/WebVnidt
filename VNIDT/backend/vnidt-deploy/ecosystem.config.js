module.exports = {
  apps: [
    {
      name: 'vnidt-cms',
      script: 'dist/src/main.js',
      cwd: __dirname,
      exec_mode: 'fork',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      // Log configuration
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      error_file: './logs/error.log',
      out_file: './logs/app.log',
      merge_logs: true,
      // Restart policy
      exp_backoff_restart_delay: 1000,
      max_restarts: 10,
      min_uptime: '10s',
    }
  ]
};
