const path = require('path');
let webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.tsx',
    },
    devtool: 'inline-source-map',
    devServer: {
        client: {
            logging: 'info',
            overlay: {
                errors: true,
                warnings: false,
            },
        },
        // contentBase: path.resolve(__dirname, './dist'),
        host: 'localhost',      // 默认是localhost
        port: 3000,             // 端口
        open: true,             // 自动打开浏览器
        hot: true,               // 开启热更新
        proxy: {
            '/index': {
                target: 'https://www.bilibili.com',
                changeOrigin: true,
            },
        },
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'react空白模版', // 此处修改标题
            template: path.resolve(__dirname, './public/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
        new friendlyErrorsWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },

            // JavaScript
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            // Images
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            // Fonts and SVGs
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
            // less
            {
                test: /\.(less|css)$/i,
                use: [
                    // compiles Less to CSS
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                               javascriptEnabled: true
                            } 
                          }
                       
                    },
                    {
                        loader: 'postcss-loader',
                    },
                ],
            },
        ],
    },
}