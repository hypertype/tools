const pkg = require('./package');
const path = require('path');
const webpack = require('webpack');

function root(file){
    return path.join(__dirname, file);
}

const main = pkg.module;
webpack({
    entry: {
        index: root(main)
    },
    mode: 'development',
    devtool: 'source-map',
    externals: Object.keys(pkg.peerDependencies),
    output: {
        path: root('./dist/bundle'),
    }
}, (err, stats) => {
    console.log(stats.toString())
});