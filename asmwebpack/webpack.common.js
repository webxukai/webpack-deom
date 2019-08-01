const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
    entry: {
        main: './src/index.js',
        vendor: [
            'lodash'
        ]
    },
    // mode: 'development',
    output: {
        // filename: 'bundle.js',
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: './' // 中间件
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                'file-loader'
            ]
        }, {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [
                'file-loader'
            ]
        }]
    },
    // devtool: 'inline-source-map', // 错误追踪
    devServer: { // webpack-dev-server 监听
        contentBase: './dist',
        hot: true // 热替换
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            // title: 'Output Management'
            title: 'Caching'
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

};