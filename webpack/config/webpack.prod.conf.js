const merge = require('webpack-merge');
const path = require('path');
const baseWebpackConfig = require('./webpack.base.conf.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  entry: {
    framework: ['react', 'react-dom'],
  },
  output: { filename: 'js/[name].[chunkhash:16].js', },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.appTemplates, 'index.html'),
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
    }),
    new CleanWebpackPlugin(['../public'], { allowExternal: true })
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
