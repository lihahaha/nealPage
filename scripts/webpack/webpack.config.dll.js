const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: {
        vendor: [
            'react',
            'react-dom',
            'react-redux',
            'redux',
            'redux-thunk',
            'rxjs',
            'typescript',
            'babel-polyfill'
        ]
    },
    output: {
        path: path.join(__dirname, '..'),
        filename: '[name].dll.js',
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '..', '[name]-manifest.json'),
            name: '[name]_library'
        })
    ]
};
