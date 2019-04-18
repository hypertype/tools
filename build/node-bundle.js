const path = require('path');
const webpack = require('webpack');
const runCompiler = require('./run.compiler');
const getConfig = require('./webpack.config');

module.exports = ({index, output}) => {
    const baseDir = process.cwd();
    const config = getConfig(index);
    const compiler = webpack({
        ...config,
        target: 'node',
        node: {
            __dirname: false,
            dns: 'empty',
            net: 'empty',
            btoa: true
        },
        output: {
            ...config.output,
            devtoolModuleFilenameTemplate: '[absolute-resource-path]',
            path: path.join(baseDir, output || 'dist'),
            libraryTarget: 'global'
        }
    });
    runCompiler(compiler)
};
