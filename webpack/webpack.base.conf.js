
const path = require('path');

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: ('./src/index.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash:8].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: "babel-loader",
        include: APP_PATH
      }
    ]
  }
}