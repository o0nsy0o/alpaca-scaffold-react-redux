modules.exports = {
  //模式:开发模式
  mode: "development",
  entry: path.join(__dirname, './src/index'), //入口
  output: { //出口
    filename: '[hash].bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  resolve: {
    alias: {
      Components: path.resolve(__dirname, 'src/components/'),
      Configs: path.resolve(__dirname, 'src/Config/'),
      extensions: [".ts", ".tsx", ".js"]
    }
  },
  devtool: 'source-map', //调试工具，不同模式构建速度不同，source-map适合生存环境，开发环境用eval-source-map
  //npm install --save-dev webpack-dev-server
  devServer: {
    //告诉服务器从哪个目录中提供内容。只有在你想要提供静态文件时才需要
    contentBase: path.resolve(__dirname, "dist"),
    compress: true, //是否压缩
    port: 8080, //端口号
    host: '0.0.0.0', //外部服务器可以访问
    open: true //是否运行时打开浏览器
  },
  plugins: [
    //该插件将为你生成一个HTML5文件，其中包括使用script标签的body中的所有webpack包
    //安装npm install --save-dev html-webpack-plugin
    new HtmlWebpackPlugin({
      title: '标题',//用于生成的HTML文档的标题
      template: './index.html', //默认index.html位置
    })
  ],
  module: {
    rules: [
      //ts-loader 用来解析ts文件
      //需要安装以下依赖
      //npm install ts-loader --save-dev
      //npm install typescript --save-dev
      //安装react相关依赖
      //npm install --save-dev react react-dom @types/react @types/react-dom
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,//不解析node_modules
        loader: 'ts-loader'
      },
      //加载json，png等文件
      //安装npm install --save-dev file-loader
      {
        test: /\.[(png)|(obj)|(json)]$/,
        loader: "file-loader"
      },
      //加载css
      //安装npm install --save-dev css-loader
      //npm install style-loader --save-dev
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
    ]
  }
}