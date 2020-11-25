'use strict'

const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const utils = require('./utils')

const {HOST} = process.env
const PORT = process.env.PORT && Number(process.env.PORT)
const env = require('../config/dev.env')

const debugWebpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({ sourceMap: config.debug.cssSourceMap, usePostCSS: true }),
    },
    // cheap-module-eval-source-map is faster for development
    devtool: config.debug.devtool,
    entry: {
        config: './config/dev.config.js',
        mock: './mock/index.js',
        app: './src/main.js',
    },
    output: {
        path: config.debug.assetsRoot,
        publicPath: config.debug.assetsPublicPath,
        filename: utils.assetsPath('js/[name].js'),
        chunkFilename: utils.assetsPath('js/[name].js'),
    },
    // these devServer options should be customized in /config/index.js
    devServer: {
        clientLogLevel: 'warning',
        historyApiFallback: {
            rewrites: [
                { from: /.*/, to: path.posix.join(config.debug.assetsPublicPath, 'index.html') },
            ],
        },
        hot: true,
        contentBase: false, // since we use CopyWebpackPlugin.
        compress: true,
        host: HOST || config.debug.host,
        port: PORT || config.debug.port,
        open: config.debug.autoOpenBrowser,
        overlay: config.debug.errorOverlay
            ? { warnings: false, errors: true }
            : false,
        publicPath: config.debug.assetsPublicPath,
        proxy: config.debug.proxyTable,
        quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
            poll: config.debug.poll,
        },
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': env,
            'process.env.VUE_ENV': JSON.stringify(env),

        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
        // generate dist index.html with correct asset hash for caching.
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
        }),
        // copy custom static assets
        // copy custom static assets
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../static'),
                    to: config.debug.assetsSubDirectory,
                },
            ] 
}),

    ],
})

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.debug.port
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port
            // add port to devServer config
            debugWebpackConfig.devServer.port = port

            // Add FriendlyErrorsPlugin
            debugWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://${debugWebpackConfig.devServer.host}:${port}`],
                },
                onErrors: config.debug.notifyOnErrors
                    ? utils.createNotifierCallback()
                    : undefined,
            }))

            resolve(debugWebpackConfig)
        }
    })
})
