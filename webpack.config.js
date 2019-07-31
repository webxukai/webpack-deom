const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: "development",
    entry: { // 入口文件
        app: './src/index.js'
    },
    output: {
        filename: '[name].bundle.js', // 输出文件名
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    devtool: 'inline-source-map', // 报错时候显示所在文件
    devServer: { // 自动监听变化
        contentBase: './dist',
        hot: true // 模块热替换
    },
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
    plugins: [
        new CleanWebpackPlugin(), // 清理 dist 目录
        new HtmlWebpackPlugin({ // 管理输出文件名
            title: 'Output Management'
        }),
        new webpack.NamedModulesPlugin(), // 模块热替换 修补(patch)的依赖
        new webpack.HotModuleReplacementPlugin() // 模块热替换
    ],
};