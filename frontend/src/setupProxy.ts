import { RequestHandler, createProxyMiddleware } from 'http-proxy-middleware'

const context = ['/api/v1']

module.exports = function (app: { use: (arg0: RequestHandler) => void }) {
  const proxy = createProxyMiddleware(context, {
    target: 'http://localhost:5286',
    changeOrigin: true,
  })
  app.use(proxy)
}
