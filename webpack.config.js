var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const CDN_URL = 'http://localhost:8000';

console.log('process.env.NODE_ENV in webpack config::::',process.env.NODE_ENV);

if(process.env.NODE_ENV === 'dev-HMR') CDN_URL = 'http://localhost:8000';
if(process.env.NODE_ENV === 'dev') CDN_URL = 'http://localhost:8000';
if(process.env.NODE_ENV === 'pre') CDN_URL = 'http://localhost:3000';
if(process.env.NODE_ENV === 'prd') CDN_URL = 'http://webresource.english.c-ctrip.com';


var config = {
  entry: {
    flight: [
      'webpack/hot/dev-server',
      './public/javascripts/home/index.js'
    ],
    router: ['react-router'] // CommonsChunkPlugin
  },
  output: {
    path: './dist',
    publicPath: CDN_URL + "/dist/", //静态资源文件内的请求路径指向静态资源服务器
    filename: 'IBU.H5.[name].js'
  },
  externals: {
    'zepto': 'window.$',
    'react':'window.React',
    'react-dom':'window.ReactDOM'
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
          presets: 'es2015'
        }
      }
    ]
  },
  plugins:  [
    new webpack.optimize.OccurenceOrderPlugin(),//比对id的使用频率和分布来得出最短的id分配给使用频率高的模块
    new webpack.HotModuleReplacementPlugin(), //同命令行中的 --hot
    //new webpack.ProvidePlugin({ Module (value) is loaded when the identifier (key) is used as free variable in a module
    //   $: 'jquery'
    //}),
    new ExtractTextPlugin("./css/IBU.H5.flight.css"),
    new webpack.optimize.CommonsChunkPlugin('router','[name].bundle.js'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false // remove all comments
      }
    }),
    new webpack.DefinePlugin({
      //The DefinePlugin allows you to create global constants which can be configured at compile time.
      "process.env": {
         NODE_ENV: JSON.stringify(process.env.NODE_ENV)
       }
    })
    // new webpack.DllReferencePlugin({
    //    context: __dirname,
    //    scope: "flight",
    //    manifest: require('./dist/router-manifest.json')
    // }),
  ],
  devServer:{
    hot:process.env.NODE_ENV === 'dev-HMR',
    inline:true
  }
}

module.exports = config;
