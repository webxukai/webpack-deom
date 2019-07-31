# webpack学习

## 安装

mkdir webpack-demo && cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev

## 创建配置文件

webpack.config.js
    const path = require('path');

    module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
    };
    执行
    npx webpack --config webpack.config.js

    在 package.json 添加 "build": "webpack"

## 管理资源

### 加载 CSS

cnpm install --save-dev style-loader css-loader

### 加载图片

cnpm install --save-dev file-loader

### 加载字体

### 设定 HtmlWebpackPlugin

cnpm install --save-dev html-webpack-plugin

### 清理 /dist 文件夹

cnpm install clean-webpack-plugin --save-dev

```
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const webpackConfig = {
    plugins: [
        /**
         * All files inside webpack's output.path directory will be removed once, but the
         * directory itself will not be. If using webpack 4+'s default configuration,
         * everything under <PROJECT_DIR>/dist/ will be removed.
         * Use cleanOnceBeforeBuildPatterns to override this behavior.
         *
         * During rebuilds, all webpack assets that are not used anymore
         * will be removed automatically.
         *
         * See `Options and Defaults` for information
         */
        new CleanWebpackPlugin(),
    ],
};

module.exports = webpackConfig;

```

## 开发

### 使用 source map

devtool: 'inline-source-map',

### 使用 webpack-dev-server

1. package.json + "watch": "webpack --watch"
2. cnpm install --save-dev webpack-dev-server
3. devServer: {
     contentBase: './dist'
   },

### 使用 webpack-dev-middleware

1. cnpm install --save-dev express webpack-dev-middleware
2. webpack.config.js -> output -> publicPath: '/'
3. server.js ->

```

const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});

```

## 模块热替换

### HMR 修改样式表

https://www.webpackjs.com/guides/hot-module-replacement/

cnpm install --save-dev style-loader css-loader

### tree shaking

module.rules: [
  {
    include: path.resolve("node_modules", "lodash"),
    sideEffects: false
  }
]

## 生产环境构建

### 配置

cnpm install --save-dev webpack-merge

cnpm install uglifyjs-webpack-plugin --save-dev

## 代码分离

### 防止重复

CommonsChunkPlugin

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

### 动态导入(dynamic imports)

## 懒加载

button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
    var print = module.default;
    print();
 })