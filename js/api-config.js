// API Base URL - localhost uses Express; production uses same origin (Vercel API routes)
var API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000' 
  : window.location.origin;
