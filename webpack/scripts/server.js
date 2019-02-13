const WebpackDevServer = require("webpack-dev-server")
const _ = require('underscore-contrib')
const config = require('../webpack.base.conf')
const webpack = require('webpack')

_.map(config.entry, (value, key) => {
  config.entry[key] = [
    'webpack-dev-server/client?http://127.0.0.1:8080/',
    'webpack/hot/dev-server',
    value
  ];
})

config.output.publicPath = 'http://127.0.0.1:8080/static/'

config.plugins = (config.plugins || []).concat([
  new webpack.HotModuleReplacementPlugin(),
])

const compiler = webpack(config)

const server = new WebpackDevServer(compiler, {
  hot: true,
  noInfo: true,
  filename: config.output.filename,
  publicPath: config.output.publicPath,
  stats: { colors: true },
})

server.listen(8080, "127.0.0.1", function () {
  console.log('Listening at http://127.0.0.1:8080')
})