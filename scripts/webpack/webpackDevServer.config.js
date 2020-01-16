const path = require('path');
const apiMocker = require('webpack-api-mocker');
const config = require('../config');
const { resolve, translateHostForWebpackDevServer } = require('../util');

// const mocker = path.resolve(__dirname, '../../mock/index.js');
// const proxy = require('../../mock/proxy');

module.exports = {
    compress: false,
    disableHostCheck: true,
    clientLogLevel: 'none',
    contentBase: config.publicPath.map(resolve),
    watchContentBase: true,
    // open: true,
    hot: true,
    progress: true,
    quiet: true,
    watchOptions: {
        // ignored:
    },
    host: translateHostForWebpackDevServer(config.devHost),
    overlay: true,
    historyApiFallback: {
        // when using dots in your path (common with Angular) , may need to use the option
        disableDotRule: true
    },
    proxy: {
        '/api/*': {
            target: 'http://95.169.17.252:3000/',
            // pathRewrite: {'^/api' : ''},
            // changeOrigin: true,     // target是域名的话，需要这个参数，
            secure: false          // 设置支持https协议的代理
        }
    }
    // before(app) {
    //     apiMocker(app, mocker);
    // }
};
