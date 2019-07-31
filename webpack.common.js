 const path = require('path');
 const webpack = require('webpack');
 const {
   CleanWebpackPlugin
 } = require("clean-webpack-plugin");
 const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
   entry: {
     app: './src/index.js'
   },
   plugins: [
     new CleanWebpackPlugin(),
     new HtmlWebpackPlugin({
       title: 'Production'
     }),
   ],
   optimization: {
     splitChunks: {
       cacheGroups: {
         commons: {
           name: "commons",
           chunks: "initial",
           minChunks: 2
         }
       }
     }
   },
   devtool: 'inline-source-map', // 报错时候显示所在文件
   module: {
     rules: [{
         test: /\.css$/,
         use: [
           'style-loader',
           'css-loader'
         ]
       }, {
         test: /\.(png|svg|jpg|gif|mp3)$/,
         use: [
           'file-loader'
         ]
       }, {
         test: /\.(woff|woff2|eot|ttf|otf)$/,
         use: [
           'file-loader'
         ]
       },
       {
         include: path.resolve("node_modules", "lodash"),
         sideEffects: false // tree shaking
       }
     ]

   },
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist')
   }
 };