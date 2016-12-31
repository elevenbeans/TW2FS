var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var CDN_NAME = 'http://localhost:8000';

if(process.env.FE_ENV === 'production') CDN_NAME = 'https://c-ctrip.com'

module.exports = {
  entry: {
    flight: './public/javascripts/home/index.js',
    vendor: ['react','react-dom','react-router'] // CommonsChunkPlugin
  },
  output: {
    path: './dist',
    publicPath: CDN_NAME + "/dist/", //静态资源文件内的请求路径指向静态资源服务器
    filename: 'IBU.H5.[name].js'
  },
  externals: {
    zepto: 'window.$'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader","css-loader")
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style-loader","css-loader!less-loader")
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: 'es2015',
        },
      }
    ]
  },
  plugins:  [
    new webpack.optimize.OccurenceOrderPlugin(),
    // Webpack 2.0 fixed this mispelling
    //new webpack.HotModuleReplacementPlugin(), //webpack-dev-server 的 HMR 无法 hold 后端 server
    // new webpack.ProvidePlugin({
    //        $: 'jquery'
    // }),
    new ExtractTextPlugin("./css/IBU.H5.flight.css"),
    new webpack.optimize.CommonsChunkPlugin('vendor','[name].bundle.js'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false,  // remove all comments
      }
    }),
    new webpack.DefinePlugin({
      "process.env": {
         NODE_ENV: JSON.stringify(process.env.FE_ENV)
       }
    })
  ]
}
