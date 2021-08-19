const { createProxyMiddleware } = require('http-proxy-middleware');

//配置跨域 基础路径
// module.exports = function (app) {
//   app.use('/api', createProxyMiddleware({
//     target: 'https://cnodejs.org/api/v1',
//     changeOrigin: true,
//   }))
// }