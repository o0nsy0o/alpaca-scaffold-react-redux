const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const paths = require('./paths');
const chalk = require('chalk');
const env = require('./env');
const PUBLIC_PATH = paths.appPublic;
const devMode = !env.isProdEnv();

module.exports = {
  output: {
    path: PUBLIC_PATH,
    filename: '[name]/bundle[hash:8].js',
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.less'],
  },
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: { loader: "babel-loader" } }
    ]
  },
  plugins: [
    new ProgressBarPlugin({
      format: chalk.cyan('build') + ' [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
      clear: false
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    })
  ]
}