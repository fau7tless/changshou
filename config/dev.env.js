'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    // 环境
    NODE_ENV: '"development"',
    // 编译模式
    MODE: 'development',
    // 应用类型，module(模块)，app(独立应用)
    APP_TYPE: 'app',
})
