const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin").TsconfigPathsPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = ({html, index, publicPath})=>{
    const prod = process.argv.filter(a => /--prod/.test(a)).length;
    const baseDir = process.cwd();
    const compiler = webpack({
        entry: {
            index: index,
        },
        output: {
            path: path.join(baseDir, 'dist'),
            publicPath
        },
        target: 'web',
        devtool: prod ? false : 'source-map',
        mode: prod ? 'production' : 'development',
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
            new HtmlWebpackPlugin({
                template: html,
                base: {
                    href: publicPath
                }
            }),
        ],
        devServer:  {
            contentBase: path.join(baseDir, 'dist'),
            historyApiFallback: {
                rewrites: [
                    {from: /.*/, to: `/${publicPath}/index.html`},
                ]
            }
        },
    });
    if (process.argv.filter(t => /watch/.test(t))){
        compiler.watch({}, (err, stats) => {
            if (err || stats.hasErrors()) {
                const info = stats.toJson();
                console.error(info.errors);
                // Handle errors here
            }
            console.info(stats.toString())
            // Done processing
        })
    }else{
        compiler.run((err, stats) => {
            if (err || stats.hasErrors()) {
                // Handle errors here
            }
            // Done processing
        })
    }
};