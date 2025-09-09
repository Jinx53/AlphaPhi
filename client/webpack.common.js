const path = require('path');


module.exports = {
    entry: {
        index_bundle: path.resolve(__dirname, "./src/index.js"),
    },
    resolve:{
        extensions:['.js','.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }],
                            '@babel/preset-react'
                        ],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg)$/,
                type: 'asset/resource',
            },
            {
                test: /\.html$/,
                use: [
                    {loader: 'html-loader'}
                ]
            }
        ]
    },
}