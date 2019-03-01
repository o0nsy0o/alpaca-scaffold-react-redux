const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf.js');

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  entry: {
    framework: ['react', 'react-dom'],
  },
  output: {
    chunkFilename: '_chunks/framework.js',
  },
  plugins: [

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
