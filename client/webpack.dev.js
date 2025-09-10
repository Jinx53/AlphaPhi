const path = require('path');
const common = require('./webpack.common');
const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');


module.exports = merge(common, {
    mode: "development",
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].js',
        //clean: true,
        publicPath: '/',
        assetModuleFilename: 'images/[name][hash][ext]',
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'public')
        }, 
        port: 3000,
        open: false,
        hot: true,
        compress: true,
        proxy: [{
            context: ['/alpha-tools', '/alpha-services', '/aboutus', '/contactus', '/resourceteam', '/testimonial', '/subscribers', '/users', '/admin', '/mail'],
            target: "http://localhost:5050",
            changeOrigin: true,
            logLevel: 'debug'
        }],
        historyApiFallback: true
        
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            manifest: './manifest.json',
            favicon: './public/favicon.png',
            inject: true
            
        }),
        new InterpolateHtmlPlugin({
            PUBLIC_URL: './public',
            'NODE_ENV': 'development'
        })  
    ]
});