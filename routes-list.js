// routes-list.js
module.exports = [
{ method: 'GET', path: '/api/routes' },
  { method: 'GET', path: '/api/home/profile' },
  { method: 'POST', path: '/api/home/calculation' },
  { method: 'GET', path: '/api/home/history' },
  { method: 'POST', path: '/api/auth/signup' },
  { method: 'POST', path: '/api/auth/signin' },
  { method: 'POST', path: '/api/auth/verify-code' },
];
