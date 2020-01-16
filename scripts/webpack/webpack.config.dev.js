const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('../config');
const webpackBaseConfig = require('./webpack.config');
const { resolve, resolveEntry } = require('../util');

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: resolveEntry(webpackBaseConfig.entry, e => [require.resolve('./webpack.HotDevClient')].concat(e)),
    output: Object.assign(webpackBaseConfig.output, {
        publicPath: `http://localhost:${config.devPort}/`,
        pathinfo: true,
        devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
    }),
    resolve: webpackBaseConfig.resolve,
    module: webpackBaseConfig.module,
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: resolve(config.template),
            chunksSortMode: 'dependency'
        }),
        // new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ].concat(webpackBaseConfig.plugins),
    performance: {
        hints: false
    },
    node: webpackBaseConfig.node
};
