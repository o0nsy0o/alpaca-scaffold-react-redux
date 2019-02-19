const WebpackDevServer = require("webpack-dev-server");
const _ = require('underscore-contrib');
const webpack = require('webpack');
const getPort = require('get-port');
const executeNodeScript = require('../utils/executeNodeScript');
const paths = require('../config/paths');
const config = require('../webpack.dev.conf');
const processArgs = require('../utils/processArgs');
const getAvailableEntry = require('../utils/getAvailableEntry');
const path = require('path');

const DEFAULT_PORT = processArgs.get('alpaca:devPort:dev');
const ALPACA_MODULES = processArgs.get('AlPACA_MODULES');

const host = process.env.HOST || '0.0.0.0';

// 先启动mock服务,再启动webpack-dev-server服务。

(async () => {
  let nodeServerHasLunched = false;
  if (nodeServerHasLunched) { return; }
  executeNodeScript('node_modules/.bin/supervisor', '--watch', paths.appServer, 'server/index.js');
  nodeServerHasLunched = true;

  const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
  const port = await getPort(DEFAULT_PORT);
  config.entry = getAvailableEntry(ALPACA_MODULES);

  _.map(config.entry, (value, key) => {
    config.entry[key] = [
      `webpack-dev-server/client?${protocol}://${host}:${port}/`,
      'webpack/hot/dev-server',
      value
    ];
  })

  config.output.publicPath = `${protocol}://${host}:${port}/public/`

  config.plugins = (config.plugins || []).concat([
    new webpack.HotModuleReplacementPlugin(),
  ])

  const compiler = webpack(config)

  const server = new WebpackDevServer(compiler,
    {
      contentBase: path.join(__dirname, '../'),
      quiet: true,
      publicPath: '/dist/',   //publicPath必填 否则就不好使
      hot: true,
      compress: true,
      historyApiFallback: true,
      setup(app, ctx) {
        app.use(hotMiddleware)
        ctx.middleware.waitUntilValid(() => {
          resolve()
        })
      }
    })

  server.listen(port, host, () => {
    // clearConsole();
    console.log(`Listening at ${protocol}://${host}:${port}`);
    console.log('start mock server here');
  })

})()
