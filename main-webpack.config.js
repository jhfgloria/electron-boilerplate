module.exports = {
  entry: './src/main/index.js',
  target: 'electron-main',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: { loader: 'babel-loader' }
    }]
  },
  output: {
    path: __dirname + '/dist',
    filename: 'index.js'
  }
};