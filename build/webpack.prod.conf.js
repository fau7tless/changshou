'use strict'

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const config = require('../config')
const utils = require('./utils')

const env = require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
    mode: env.MODE,
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.prod.productionSourceMap,
            extract: true,
            usePostCSS: true,
        }),
    },
    devtool: config.prod.productionSourceMap ? config.prod.devtool : false,
    entry: {
        config: './config/prod.config.js',
        mock: './mock/index.js',
        app: './src/main.js',
    },
    output: {
        path: config.prod.assetsRoot,
        publicPath: env.MODE === 'production'
            ? config.prod.assetsPublicPath
            : config.dev.assetsPublicPath,
        filename: utils.assetsPath('js/[name].js'),
        chunkFilename: utils.assetsPath('js/[name].js'),
    },
    optimization: {
        usedExports: true, // treeShaking
        splitChunks: {
            chunks: 'all', // 当存在多个入口时，可以防止同一模块被引入多次, 例如同一个库被多次引入，则库文件会被单独打包出一份vendor
            // 将第三方库(library)（例如 lodash 或 react）提取到单独的 vendor chunk 文件中，是比较推荐的做法
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
        runtimeChunk: 'single', // 将其设置为 single 来为所有 chunk 创建一个 runtime bundle (缓存方式)
    },
    plugins: [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': env,
            'process.env.VUE_ENV': JSON.stringify(env),
        }),

        // generate dist index.html with correct asset hash for caching.
        new HtmlWebpackPlugin({
            filename: config.prod.index,
            template: 'index.html',
            inject: true,
            minify: {
                // removeComments: true, // 移除HTML中的注释
                // collapseWhitespace: true, // 删除空白符与换行符
                // minifyCSS: true// 压缩内联css
            },
        }),
        // keep module.id stable when vendor modules does not change
        new webpack.HashedModuleIdsPlugin(),

        // copy custom static assets
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../static'),
                    to: config.prod.assetsSubDirectory,
                },
            ], 
        }),
    ],
})

if (config.prod.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.('
                + config.prod.productionGzipExtensions.join('|')
                + ')$',
            ),
            threshold: 10240,
            minRatio: 0.8,
        }),
    )
}

if (config.prod.bundleAnalyzerReport) {
    const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
