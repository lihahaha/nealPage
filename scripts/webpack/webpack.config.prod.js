const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const config = require('../config');
const webpackBaseConfig = require('./webpack.config');
const { resolve, getBranch } = require('../util');

let branch = getBranch();

if (!branch) {
    branch = 'develop'; // 默认是develop
}
const { bundleName, publishPath } = config;

const pubPath = `${publishPath[branch]}/${bundleName}-${branch}/`;

module.exports = MODE_DEBUG => ({
    mode: MODE_DEBUG ? 'none' : 'production',
    bail: true,
    devtool: 'source-map',
    entry: webpackBaseConfig.entry,
    output: Object.assign(webpackBaseConfig.output, {
        publicPath: pubPath,
        filename: MODE_DEBUG ? `[name]_${config.debugBundleMark}.js` : '[name]_min_[chunkhash:7].js'
    }),
    performance: {
        maxEntrypointSize: 614400,
        maxAssetSize: 614400
    },
    resolve: webpackBaseConfig.resolve,
    module: (function (baseModule) {
        const rules = baseModule.rules[0].oneOf;
        const cssRule = rules.filter(r => /css/.test((r.test || '').toString()))[0];

        delete cssRule.use;
        cssRule.loader = ExtractTextPlugin.extract({
            fallback: require.resolve('style-loader'),
            use: [
                {
                    loader: require.resolve('css-loader'),
                    options: {
                        sourceMap: true,
                        importLoaders: 1,
                        minimize: !MODE_DEBUG
                    }
                },
                {
                    loader: require.resolve('postcss-loader'),
                    options: {
                        ident: 'postcss',
                        sourceMap: true,
                        plugins: () => [
                            require('postcss-import')(),
                            require('precss')(),
                            require('postcss-nested')(),
                            require('postcss-cssnext')({
                                browsers: ['> 0%'],
                                features: {
                                    nesting: false,
                                    colorRgba: false
                                }
                            }),
                            require('postcss-auto-imgmq')(),
                            // require('@douyu/postcss-sprites')({
                            //     spritePath: './',
                            //     filterBy({ originalUrl }) {
                            //         return /\?__sp/.test(originalUrl) ? Promise.resolve() : Promise.reject();
                            //     },
                            //     groupBy({ originalUrl }) {
                            //         const match = /\?__sp\=(\S+)$/.exec(originalUrl);


                            //         return match && match.length > 1 ? Promise.resolve(`${match[1]}.`) : Promise.resolve('default.');
                            //     }
                            // }),
                            // require('postcss-px-to-viewport')({
                            //     viewportWidth: 750,     // (Number) The width of the viewport.
                            //     viewportHeight: 1206,    // (Number) The height of the viewport.
                            //     unitPrecision: 3,       // (Number) The decimal numbers to allow the REM units to grow to.
                            //     viewportUnit: 'vw',     // (String) Expected units.
                            //     selectorBlackList: ['.ignore', '.hairlines'],  // (Array) The selectors to ignore and leave as px.
                            //     minPixelValue: 1,       // (Number) Set the minimum pixel value to replace.
                            //     mediaQuery: false,       // (Boolean) Allow px to be converted in media queries.
                            // })
                        ]
                    }
                }
            ]
        });

        return baseModule;
    })(webpackBaseConfig.module),
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: resolve(config.template),
            chunksSortMode: 'dependency',
            minify: {
                removeComments: !MODE_DEBUG,
                collapseWhitespace: !MODE_DEBUG,
                minifyJS: !MODE_DEBUG,
                minifyCSS: !MODE_DEBUG,
                minifyURLs: !MODE_DEBUG
            }
        }),
        new ExtractTextPlugin({
            filename: MODE_DEBUG ? `[name]_${config.debugBundleMark}.css` : '[name]_min_[chunkhash:7].css'
        }),
        new ManifestPlugin({
            fileName: 'manifest.json'
        }),
        ...MODE_DEBUG ? [new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('debug'),
            'process.env.CURRENT_BRANCH': JSON.stringify(branch)
        })] : [ new webpack.DefinePlugin({
            'process.env.CURRENT_BRANCH': JSON.stringify(branch)
        })]
    ].concat(webpackBaseConfig.plugins),
    ...MODE_DEBUG ? {} : {
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    parallel: true,
                    sourceMap: true,
                    uglifyOptions: {
                        warnings: false,
                        compress: {
                            comparisons: false,
                            negate_iife: false
                        },
                        output: {
                            comments: false,
                            ascii_only: true
                        }
                    }
                })
            ],
            splitChunks: {
                chunks: "all"
            }
        }
    },
    node: webpackBaseConfig.node
});
