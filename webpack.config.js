/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    popup: path.join(__dirname, './src/popup/index.tsx'),
    content: path.join(__dirname, './src/content/index.ts'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  output: {
    filename: '[name]/index.js',
    path: path.join(__dirname, 'dist'),
  },
  target: 'web',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'popup/index.html',
      template: 'src/popup/index.html',
      inject: false,
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'public', to: './' }],
    }),
  ],
};
