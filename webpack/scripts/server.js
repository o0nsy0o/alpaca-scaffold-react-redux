const WebpackDevServer = require("webpack-dev-server");
const _ = require('underscore-contrib');
const webpack = require('webpack');
// const paths = require('../config/paths');
const config = require('../config/webpack.dev.conf');
const path = require('path');

const executeNodeScript = require('../utils/executeNodeScript');
const getAvailableEntry = require('../utils/getAvailableEntry');
const clearConsole = require('../utils/clearConsole');
const {
  choosePort, createCompiler, prepareProxy, prepareUrls
} = require('../utils/WebpackDevServerUtils');

const processArgs = require('../utils/processArgs');

const isInteractive = process.stdout.isTTY;

let nodeServerHasLunched = false;

(async () => {

  const DEFAULT_PORT = processArgs.get('alpaca:devPort:dev') || 3000;

  const HOST = process.env.HOST || 'localhost';

  const port = await choosePort(HOST, DEFAULT_PORT);

  processArgs.set('alpaca:devPort:dev', port);

  if (nodeServerHasLunched) { return; };

  executeNodeScript(
    'node_modules/.bin/supervisor',
    '--watch', 'server/mockData',
    '--', 'server/index.js',
    '--ALPACA_WEBPACK_PORT', `${port}`
  );

  nodeServerHasLunched = true;

  const alpacaModules = processArgs.get('AlPACA_MODULES');

  config.entry = getAvailableEntry(alpacaModules);

  const portFontServer = await choosePort(HOST, 3001);

  _.map(config.entry, function (value, key) {
    config.entry[key] = [
      `webpack-dev-server/client?http://${HOST}:${portFontServer}/`,
      'webpack/hot/dev-server',
      value
    ];
  })

  config.output.publicPath = `http://${HOST}:${portFontServer}/dist/`;

  var compiler = webpack(config);

  var server = new WebpackDevServer(compiler, {
    contentBase: path.join(__dirname, "dist"),
    hot: true,
    noInfo: true,
    filename: config.output.filename,
    publicPath: config.output.publicPath,
    stats: { colors: true },
  })

  server.listen(portFontServer, HOST, () => {
    if (isInteractive) { clearConsole(); }
    console.log(`Listening at http://${HOST}:${portFontServer}`);
  })

})()
