var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var moduleCfg = require('./module.config');
var CDN_URL = '';

console.log('process.env.NODE_ENV in webpack config::::',process.env.NODE_ENV);

if(!process.env.NODE_ENV) process.env.NODE_ENV = 'dev-HMR';

if(process.env.NODE_ENV === 'dev-HMR') CDN_URL = 'http://localhost:8000';
if(process.env.NODE_ENV === 'dev') CDN_URL = 'http://localhost:8000';
if(process.env.NODE_ENV === 'pre') CDN_URL = 'http://localhost:3000';
if(process.env.NODE_ENV === 'prd') CDN_URL = 'http://webresource.english.c-ctrip.com';

var config = {
  entry: {
    flight: [
      'webpack/hot/dev-server',
      './public/javascripts/home/index.jsx'
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
      { test: /\.(png|jpg|gif)$/, 
        loader: "file-loader" 
      },
      {
        test: /\.(ttf|svg|woff)(\?[a-z0-9]+)?$/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
      },
      {
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react','es2015']
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
    new webpack.optimize.CommonsChunkPlugin('router','[name].bundle.js'), // CommonsChunk
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
  resolve: {
    root: path.resolve(__dirname, "./public"),
    fallback: [path.resolve(__dirname, './node_modules')],
    extensions: ['', '.js', '.jsx'],
    alias: moduleCfg
  },
  devServer:{
    hot:process.env.NODE_ENV === 'dev-HMR',
    inline:true
  }
}

module.exports = config;
