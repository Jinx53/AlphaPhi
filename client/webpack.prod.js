const path = require('path');
const common = require('./webpack.common');
const {merge} = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');


module.exports = merge(common, {
    mode: "production",
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[contenthash].js',
        clean: true,
        assetModuleFilename: 'images/[name][hash][ext]',
        publicPath: '/',
    },
    optimization: {
        minimizer: [ 
            `...`, 
            new CssMinimizerPlugin(),
            new HtmlWebpackPlugin({
                filename: "index.html", 
                template: './public/index.html',
                manifest: './public/manifest.json',
                favicon: './public/favicon.png',
                webclip: './public/webclip.png',
                minify: {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    removeComments: true
                }        
            })
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({filename: "[name].[contenthash].css"}),
       
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {loader: MiniCssExtractPlugin.loader},
                    {loader: 'css-loader'},
                ]
            },
        ]
    },
});