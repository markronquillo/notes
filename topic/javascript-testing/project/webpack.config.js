const webpack = require('webpack');
const resolve = require('path').resolve;
const CopyWebpackPlugin = require('copy-webpack-plugin');

const SRC = "./src";
const DEST = "./public";

module.exports = {
    entry: `${SRC}/js/main.js`,

    output: {
        path: resolve(__dirname, DEST),
        filename: `[name].js`,
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: ['babel-loader']
            },
        ]
    },

    plugins: [
        new CopyWebpackPlugin([
            { 
                from: `${SRC}/public`,
                to: '.'
            }
        ])
    ]
}