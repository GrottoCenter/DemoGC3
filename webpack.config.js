var path = require('path');

module.exports = {
  entry: './src/react/AppRoutes.jsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query:
          {
            presets: ['es2015', 'react']
          }
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  }
};