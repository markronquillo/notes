const resolve = require('path').resolve;

// plugin for extracting text to a file
// we use this plugin in this example to extract
// the converted css, from sass, into a file
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// this plugin copies a file to a given destination
// the only thing to watch here is that the `to` parameter
// is relative to the `from` (don't know why)
const CopyWebpackPlugin = require('copy-webpack-plugin');

// this deletes a specific folder given
const CleanWebpackPlugin = require('clean-webpack-plugin');

const DEBUG = process.env.NODE_ENV !== 'production'
const SRC = './src';
const DEST = './public';

module.exports = { 

    context: __dirname,

    entry: ['./src/js/index', './src/css/index'],

    output: {
        path: resolve(__dirname, './src/public'),
        filename: '[name].js',
    } ,

    module: {
        rules: [
            {
                test: /\.sass$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },


    plugins: [
        new CleanWebpackPlugin([ './public' ]),

        // Copying files directly
        new CopyWebpackPlugin([
           { from: `./src/public`, to: '../../build' }
        ], {
            debug: true
        }),


        new ExtractTextPlugin({
            filename: '[name].css',
        }),
    ],

    devtool: 'source-map'
}
