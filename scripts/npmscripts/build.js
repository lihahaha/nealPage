const fs = require('fs-extra');
const webpack = require('webpack');
const chalk = require('chalk');
const webpackConfig = require('../webpack/webpack.config.prod');
const config = require('../config');
const { resolve, clearConsole, createProCompiler, createDevCompiler } = require('../util');

const MODE_DEBUG = process.argv.length > 2 && /debug/i.test(process.argv[2]);

if (MODE_DEBUG) {
    process.env.NODE_ENV = 'debug';
} else {
    !process.env.NODE_ENV && (process.env.NODE_ENV = 'production');
}

process.on('unhandledRejection', (err) => {
    throw err;
});

const targetPath = resolve(config.buildPath);

fs.ensureDirSync(targetPath);
fs.emptyDirSync(targetPath);

clearConsole();
console.log(chalk.cyan(`Creating ${MODE_DEBUG ? 'a debug mode' : 'an optimized production'} build...`));

const compilerConfig = webpackConfig(MODE_DEBUG);

if (MODE_DEBUG) {
    createDevCompiler(webpack, compilerConfig).watch({
        aggregateTimeout: 500,
        ignored: ['node_modules/**/*', 'scripts/**/*', 'mock/**/*']
    }, (err, stats) => {
        if (!err) {
            const messages = stats.toJson('normal');

            !messages.warnings.length && !messages.errors.length && console.log(`The ${chalk.cyan(config.buildPath)} folder is ready to debug (Note that the debug mode build is not optimized).\n`);
        }
    });
} else {
    createProCompiler(webpack, compilerConfig, (err) => {
        if (err) {
            console.error(err.message || err);

            return process.exit(1);
        }

        console.log(`The ${chalk.cyan(config.buildPath)} folder is ready to be deployed.\n`);
    });
}
