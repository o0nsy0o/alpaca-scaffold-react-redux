const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('../config/paths');

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  entry: {
    framework: ['react', 'react-dom'],
  },
  output: {
    chunkFilename: '_chunks/[name].[chunkhash].js',
  },
  plugins: [
    new CleanWebpackPlugin(['../public'], { allowExternal: true }),
    new HtmlWebpackPlugin({
      template: path.join(paths.appTemplates, 'index.html'),
      filename: '[name]/index.html',
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
    })
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
