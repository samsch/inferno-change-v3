/* eslint-env node */
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// For production build, set this env var to the server public path.
const publicPath = process.env.APP_PUBLIC_PATH || '/';

module.exports = {
  entry: ['./src/main.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath,
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    https: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?/,
        include: path.resolve(__dirname, 'src/'),
        use: ['babel-loader'],
      },
      process.env.NODE_ENV === 'production'
        ? {
            // For production, we output a separately cachable stylesheet.
            test: /\.s?css$/,
            use: ExtractTextPlugin.extract({
              use: ['css-loader'],
            }),
          }
        : {
            // For development, style-loader can hot reload styles.
            test: /\.s?css$/,
            use: ['style-loader', 'css-loader'],
          },
      {
        exclude: [
          /\.html$/,
          /\.m?jsx?$/,
          /\.scss$/,
          /\.css$/,
          /\.json$/,
          /\.bmp$/,
          /\.gif$/,
          /\.jpe?g$/,
          /\.png$/,
        ],
        loader: 'file-loader',
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      // "url" loader works just like "file" loader but it also embeds
      // assets smaller than specified size as data URLs to avoid requests.
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true,
    }),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: 'public/index.html',
    }),
  ].concat(
    process.env.NODE_ENV === 'production'
      ? [
          new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
          }),
          new UglifyJsPlugin(),
        ]
      : []
  ),
};
