process.on('unhandledRejection', err => { throw err; });

const webpack = require('webpack');
const shell = require('shelljs');
const config = require('../config/webpack.dev.conf');
const WebpackDevServer = require("webpack-dev-server");

const { confirmAvailableModules } = require('../utils/confirmAvailableModules');

let nodeServerHasLunched = false;

(async () => {
  const answer = await confirmAvailableModules();
  console.log(answer);
  if (!answer.availableModulesOk) { return; }
  const HOST = process.env.HOST || 'localhost';
  const serverPort =  await portfinder.getPortPromise({ port: 3000, stopPort: 4000 });
  if (nodeServerHasLunched) { return; };

  shell.exec('some_long_running_process', function (code, stdout, stderr) {
    console.log('Exit code:', code);
    console.log('Program output:', stdout);
    console.log('Program stderr:', stderr);
  });

  const webpackPort =  await portfinder.getPortPromise({ port: 3000, stopPort: 4000 });


})()


// const path = require('path');
// const _ = require('underscore-contrib');
// const choosePort = require("alpaca-dev-utils/lib/choosePort");
// const clearConsole = require('alpaca-dev-utils/lib/clearConsole');
// const executeNodeScript = require('alpaca-dev-utils/lib/executeNodeScript');

// const processArgs = require('../config/processArgs');
// const DEFAULT_PORT = processArgs.get('alpaca:devPort:dev') || 3000;

// const isInteractive = process.stdout.isTTY;

// let nodeServerHasLunched = false;

// const { confirmAvailableModules } = require('../utils/confirmAvailableModules');

// (async () => {

//   const answer = await confirmAvailableModules();

//   if (!answer.availableModulesOk) { return; }

//   const HOST = process.env.HOST || 'localhost';

//   const serverPort = await choosePort(DEFAULT_PORT, HOST);

//   const webpackPort = await choosePort(DEFAULT_PORT, HOST);

//   if (nodeServerHasLunched) { return; };

//   executeNodeScript(
//     'node_modules/.bin/supervisor',
//     '--watch', 'server/mockData',
//     '--ignore', 'server/mockData',
//     '-q',
//     '--',
//     'server/index.js',
//     '--ALPACA_WEBPACK_PORT', `${serverPort}`,
//     '--ALPACA_WEBPACK_URL',`http://${HOST}:${webpackPort}/public/`
//   );

//   nodeServerHasLunched = true;


//   config.entry = answer.availableModules

//   _.map(config.entry, function (value, key) {
//     config.entry[key] = [
//       `webpack-dev-server/client?http://${HOST}:${webpackPort}/`,
//       'webpack/hot/dev-server',
//       value
//     ];
//   })

//   config.output.publicPath = `http://${HOST}:${webpackPort}/public/`;
//   var compiler = webpack(config);

var server = new WebpackDevServer(compiler, {
  contentBase: path.join(__dirname, "dist"),
  hot: true,
  openPage: '/public/',
  noInfo: true,
  open: 'Google Chrome',
  filename: config.output.filename,
  publicPath: config.output.publicPath,
  stats: { colors: true }
})

//   server.listen(webpackPort, HOST, () => {
//     if (isInteractive) { clearConsole(); }
//     console.log(`Listening at http://${HOST}:${webpackPort}/public/`);
//   })

// })()