const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        fallback: {
            "path": require.resolve("path-browserify"),
            "fs": false,
            "child_process": false
        }
    },
    module: {
        rules: [
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
        template: './src/index.html',
        }),
    ],
};