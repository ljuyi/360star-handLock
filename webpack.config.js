var path = require('path');
var webpack = require('webpack');
var env = process.env.NODE_ENV;

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  devtool: 'source-map',
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, './dist'),
    publicPath: env === 'production' ? '/360star-handLock/' : '/dist/',
    filename: 'bundle.js'
  },  

  devServer: {
    contentBase: __dirname,
    port: 4000
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap',
          'postcss-loader',
          'sass-loader?sourceMap'
        ]
      }
    ]
  }
};

if (env === 'production') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    })
  ]);
}