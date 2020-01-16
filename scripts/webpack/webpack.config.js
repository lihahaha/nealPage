const webpack = require('webpack');
const config = require('../config');
const { resolve, getBranch } = require('../util');

const currentBuildBranch = getBranch();

module.exports = {
    entry: {
        [config.bundleName]: resolve(config.index)
    },
    output: {
        path: resolve(config.buildPath),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
        alias: {
        }
    },
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.jsx?$/,
                        include: [
                            resolve(config.srcPath),
                            resolve(config.scriptPath),
                            resolve('env')
                        ],
                        loader: require.resolve('babel-loader'),
                        options: {
                            cacheDirectory: true
                        }
                    },
                    {
                        test: /\.css$/,
                        use: [
                            require.resolve('style-loader'),
                            {
                                loader: require.resolve('css-loader'),
                                options: {
                                    sourceMap: true,
                                    importLoaders: 1
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
                                        // require('postcss-px-to-viewport')({
                                        //     viewportWidth: 750,     // (Number) The width of the viewport.
                                        //     viewportHeight: 1206,    // (Number) The height of the viewport.
                                        //     unitPrecision: 3,       // (Number) The decimal numbers to allow the REM units to grow to.
                                        //     viewportUnit: 'vw',     // (String) Expected units.
                                        //     selectorBlackList: ['.ignore', '.hairlines'],  // (Array) The selectors to ignore and leave as px.
                                        //     minPixelValue: 1,       // (Number) Set the minimum pixel value to replace.
                                        //     mediaQuery: false,       // (Boolean) Allow px to be converted in media queries.
                                        // }),
                                        require('postcss-auto-imgmq')()
                                    ]
                                }
                            }
                        ]
                    },
                    {
                        test: /\.(png|jpe?g|bmp|gif|svg|ico|webp)$/,
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: 2048,
                            outputPath: 'images',
                            name: '[name].[hash:8].[ext]'
                        }
                    },
                    {
                        test: /\.(woff2?|eot|ttf|otf)$/,
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: 2048,
                            outputPath: 'fonts',
                            name: '[name].[hash:8].[ext]',
                        }
                    },
                    {
                        test: /\.tsx?$/,
                        use: [
                            {
                                loader: "babel-loader"
                            },
                            {
                                loader: "awesome-typescript-loader"
                            }
                        ]
                    },
                    {
                        test: /\.wasm$/,
                        type: 'javascript/auto',
                        loader: require.resolve('file-loader'),
                        options: {
                            name: 'assets/[name].[hash:8].[ext]'
                        }
                    },
                    {
                        exclude: [
                            /\.jsx?$/,
                            /\.css$/,
                            /\.(png|jpe?g|bmp|gif|svg|ico|webp)$/,
                            /\.(woff2?|eot|ttf|otf)$/,
                            /\.html$/,
                            /\.json$/,
                            /\.md$/
                        ],
                        loader: require.resolve('file-loader'),
                        options: {
                            name: '[name].[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.CURRENT_BRANCH': JSON.stringify(currentBuildBranch),
        })
    ],
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
};
