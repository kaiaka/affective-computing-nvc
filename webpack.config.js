const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    // enter through index.ts
    entry: './src/index.ts',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    target: 'web',
    resolve: {
        extensions: [".ts"]
    },

    // style-loader, sass-loader -> to load scss via index.ts
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.(s*)css$/, use: [ {loader: "style-loader"}, {loader: "css-loader"}, {loader: "sass-loader"}]}
        ]
    },

    // HtmlWebpackPlugin: generate index.html in dist including <script> embedding
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        })
    ]

};
