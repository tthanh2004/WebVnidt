/* ============================================================
   VNiDT — config.js
   Global Environment Configuration for Frontend
   ============================================================ */

(function () {
  'use strict';

  // Define backend API base URL
  // If running locally, check if the frontend is served from NestJS local server on port 3000
  // Otherwise, default to Render backend URL.
  const API_BASE = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? (window.location.port === '3000' ? 'http://localhost:3000' : 'https://webvnidt.onrender.com')
    : 'https://webvnidt.onrender.com';

  window.API_BASE = API_BASE;

  // Intercept window.fetch to automatically prepend API_BASE to relative API endpoints
  const originalFetch = window.fetch;
  window.fetch = function (resource, init) {
    if (typeof resource === 'string' && resource.startsWith('/api/')) {
      resource = API_BASE + resource;
    }
    return originalFetch(resource, init);
  };

  // Helper function to resolve asset URLs
  window.getAssetUrl = function (path) {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
      return path;
    }
    // Only uploaded files are stored on Render backend
    if (path.startsWith('assets/uploads/')) {
      return API_BASE + '/' + path;
    }
    // Other assets (logos, static icons, etc.) are packaged with the frontend on Vercel
    return path;
  };
})();
