const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/render/index.jsx',
  target: 'electron-renderer',
  module: {
    rules: [{
      test: /\.jsx|\.js$/,
      exclude: /node_modules/,
      use: { loader: 'babel-loader' }
    }]
  },
  output: {
    path: __dirname + '/dist',
    filename: 'render.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/render/index.html',
      filename: './index.html'
    })
  ]
};