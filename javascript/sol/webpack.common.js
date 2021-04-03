const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const root = 'sol/page';
const rootEntry = 'main';
const subEntries = [];

const htmlTemplate = root + '/template.html';

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: subEntries.reduce(addSubEntry, getRootEntry()),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'ts-loader',
      },
    ],
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.ts', '.tsx', '.js'],
  },
  output: {
    filename: getOutputName,
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['ts', 'tsx'],
    }),
    new HtmlWebpackPlugin({
      title: 'Sol',
      filename: 'index.html',
      template: htmlTemplate,
      chunks: [rootEntry],
    }),
    ...subEntries.map(getSubEntryHtml),
  ],
};

function getRootEntry() {
  let target = {};
  target[rootEntry] = path.join('.', root, 'index.tsx');
  return target;
}

function addSubEntry(target, entry) {
  target[entry] = path.join('.', root, entry, 'index.tsx');
  return target;
}

function getOutputName(pathData) {
  return pathData.chunk.name === rootEntry ? 'bundle.js' : '[name]/bundle.js';
}

function getSubEntryHtml(entry) {
  return new HtmlWebpackPlugin({
    title: ['sol', ...entry.split('/')].map(capitalize).join(' '),
    filename: entry + '/index.html',
    template: htmlTemplate,
    chunks: [entry],
  });
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
