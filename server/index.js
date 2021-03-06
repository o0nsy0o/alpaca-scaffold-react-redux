const processArgs = require('../webpack/config/processArgs');
const choosePort = require('alpaca-dev-utils/lib/choosePort');
const openBrowser = require('alpaca-dev-utils/lib/openBrowser');
const jsonServer = require('json-server');

const DEFAULT_PORT = processArgs.get('ALPACA_WEBPACK_PORT');
const WEBPACK_URL = processArgs.get('ALPACA_WEBPACK_URL');
const server = jsonServer.create();
const router = jsonServer.router(require('./mockData/mock.json'));
const middlewares = jsonServer.defaults();

(async () => {
  const port = await choosePort(DEFAULT_PORT, 'localhost');

  server.use(middlewares)
  server.use(router)
  server.listen(port, () => {
    console.log(`JSON Server is running at ${port}`);
    openBrowser(WEBPACK_URL);
  })

})()
