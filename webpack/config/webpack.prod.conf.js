const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  entry: {
    app: './app/index.js',
    framework: ['react', 'react-dom'],
  },
  output: { filename: 'js/[name].[chunkhash:16].js', },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'webpack/templates/index.html',
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
    }),
    new CleanWebpackPlugin(['../webpack'], { allowExternal: true })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: 1,
      minSize: 0,
      cacheGroups: {
        framework: {
          test: 'framework',
          name: 'framework',
          enforce: true
        }
      }
    }
  }
});