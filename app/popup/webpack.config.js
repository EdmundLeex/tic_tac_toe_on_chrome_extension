const path = require('path');

module.exports = {

  entry: [
    './app/popup/src/scripts/index.jsx'
  ],

  output: {
    filename: 'popup.js',
    path: path.join(__dirname, '../../', 'build'),
    publicPath: path.build
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.json'],
    modulesDirectories: ['node_modules']
  },

  module: {
    loaders: [
      {
        test: /\.(jsx|js)?$/,
        loader: 'babel',
        exclude: /(node_modules)/,
        include: path.join(__dirname, 'src'),
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.gif$|\.png$/i,
        loader: "file-loader?name=/img/[name].[ext]"
      }
    ]
  }
};