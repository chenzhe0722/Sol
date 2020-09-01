const common = require('./webpack.common');
const {merge} = require('webpack-merge');
const {HotModuleReplacementPlugin} = require('webpack');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
    proxy: {
      '/api/auth': {
        target: 'http://localhost:8080',
        pathRewrite: {'^/api/auth': ''},
        changeOrigin: true,
      },
      '/api/bing-image-meta': {
        target: 'https://www.bing.com/HPImageArchive.aspx',
        pathRewrite: {'^/api/bing-image-meta': ''},
        changeOrigin: true,
      },
    },
    writeToDisk: true,
    hot: true,
  },
  plugins: [
    new HotModuleReplacementPlugin(),
  ],
});
