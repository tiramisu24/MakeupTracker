const path = require('path');

module.exports = {
  entry: './js/startVideo.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};