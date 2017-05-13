var path = require('path');
var webpack = require('webpack');
var env = process.env.NODE_ENV;

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  devtool: 'source-map',
  entry: resolve('front/src/app.js'),
  output: {
    publicPath: 'front/dist',
    path: resolve('./front/dist/js'),
    filename: 'bundle.js'
  },  
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        include: resolve('front/src/common/js'),
        use: [{
          loader: 'eslint-loader',
          options: {
             formatter: require('eslint-friendly-formatter')
          }
        }]
      },
      {
        test: /\.js$/,
        include: resolve('front/src/common/js'),
        loader: 'babel-loader'
      }
    ]
  },
  externals:[{
    XMLHttpRequest: '{XMLHttpRequest:XMLHttpRequest}'
  }],
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
