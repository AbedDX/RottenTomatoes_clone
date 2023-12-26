// setup proxy for localhost and docker 

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
    })
  );

  app.use(
    '/backend',
    createProxyMiddleware({
      target: 'http://backend:3001',
      changeOrigin: true,
    })
  );
};
