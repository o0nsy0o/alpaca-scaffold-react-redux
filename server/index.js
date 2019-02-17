// index.js
const processArgs = require('../webpack/utils/processArgs');
const DEFAULT_PORT = processArgs.get(`alpaca:devPort:dev`);
const getPort = require('get-port');
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(require('./mockData/mock.json'));
const middlewares = jsonServer.defaults()

getPort(DEFAULT_PORT).then((port) => {
  if (port == null) {
    return console.log('no available port');
  }
  server.use(middlewares)
  server.use(router)
  server.listen(port, () => { console.log(`JSON Server is running at ${port}`); })
});

