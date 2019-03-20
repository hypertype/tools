const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin").TsconfigPathsPlugin;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');

module.exports = (index,output) => {
    const prod = process.argv.filter(a => /--prod/.test(a)).length;
    const baseDir = process.cwd();
    const pkg = require(path.join(baseDir, 'package.json'));
    return {
        entry: {
            index: index,
        },
        output: {
            path: path.join(baseDir, output || 'dist'),
        },
        target: 'web',
        devtool: prod ? false : 'source-map',
        mode: prod ? 'production' : 'development',
        externals: Object.keys(pkg.peerDependencies || []),
        resolve: {
            extensions: ['.ts', '.js', '.html', '.json'],
            mainFields: ['main', 'module'],
            plugins: [
                new TsconfigPathsPlugin()
            ],
        },
        module: {
            rules: [
                {
                    test: /\.less/,
                    loader: ['css-loader', 'less-loader'],
                },
                {
                    test: /\.html$/,
                    loader: 'string-loader',
                },
                {
                    test: /\.ts/,
                    loader: 'awesome-typescript-loader'
                },
            ]
        },
        plugins: [
            ...(process.argv.filter(d => /stats/.test(d)).length ? [new BundleAnalyzerPlugin()] : [])
        ]
    };
}