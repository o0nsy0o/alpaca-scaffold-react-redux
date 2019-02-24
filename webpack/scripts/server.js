process.on('unhandledRejection', err => {
  throw err;
});

const WebpackDevServer = require("webpack-dev-server");
const _ = require('underscore-contrib');
const webpack = require('webpack');
const config = require('../config/webpack.dev.conf');
const path = require('path');
const fp = require('find-free-port');

const executeNodeScript = require('../utils/executeNodeScript');
const getAvailableEntry = require('../utils/getAvailableEntry');
const clearConsole = require('../utils/clearConsole');

const processArgs = require('../utils/processArgs');

const isInteractive = process.stdout.isTTY;

let nodeServerHasLunched = false;

(async () => {

  const DEFAULT_PORT = processArgs.get('alpaca:devPort:dev') || 3000;

  const HOST = process.env.HOST || 'localhost';

  const ports = await fp(DEFAULT_PORT, 3100, '127.0.0.1', 2);

  processArgs.set('alpaca:devPort:dev', ports[0]);

  if (nodeServerHasLunched) { return; };

  executeNodeScript(
    'node_modules/.bin/supervisor',
    '--watch', 'server/mockData',
    '--', 'server/index.js',
    '--ALPACA_WEBPACK_PORT', `${ports[0]}`
  );

  nodeServerHasLunched = true;

  let alpacaModules = processArgs.get('AlPACA_MODULES');

  alpacaModules = JSON.parse(alpacaModules);

  if (!alpacaModules.length) {
    console.log('you have to assgin the module to start');
    process.exit(1);
  }

  config.entry = getAvailableEntry(alpacaModules);

  _.map(config.entry, function (value, key) {
    config.entry[key] = [
      `webpack-dev-server/client?http://${HOST}:${ports[1]}/`,
      'webpack/hot/dev-server',
      value
    ];
  })

  config.output.publicPath = `http://${HOST}:${ports[1]}/public/`;

  var compiler = webpack(config);

  var server = new WebpackDevServer(compiler, {
    contentBase: path.join(__dirname, "dist"),
    hot: true,
    noInfo: true,
    filename: config.output.filename,
    publicPath: config.output.publicPath,
    stats: { colors: true },
  })

  server.listen(ports[1], HOST, () => {
    if (isInteractive) { clearConsole(); }
    console.log(`Listening at http://${HOST}:${ports[1]}/public/`);
  })

})()