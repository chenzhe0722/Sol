const common = require('./webpack.common');
const CompressionPlugin = require("compression-webpack-plugin");
const {merge} = require('webpack-merge');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
      deleteOriginalAssets: true,
    }),
  ],
});
