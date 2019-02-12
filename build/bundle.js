#!/usr/bin/env node

const relative = process.argv[2] || './';
const path = require('path');
function root(file){
    return path.join(__dirname, '../../../..',relative, file);
}

const pkg = require(root('./package'));
const webpack = require('webpack');


const main = pkg.module;
webpack({
    entry: {
        index: root(main),

    },
    target: 'node',
    mode: 'development',
    devtool: 'source-map',
    externals: Object.keys(pkg.peerDependencies),
    output: {
        path: root('./dist/bundle'),
        libraryTarget: 'umd'
    }
}, (err, stats) => {
    console.log(stats.toString())
});