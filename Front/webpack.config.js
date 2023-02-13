const path = require('path')
//const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    entry: path.resolve(__dirname, "./src/index.js"),

    stats: {
        colors: true,
        modules: true,
      
        reasons: true,
        errorDetails: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(js||jsx)$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            },
            {
                test: /\.(css)$/,
                use: ['style-loader', 'css-loader']
            }
            // {
            //     test: /\.(s(a|c)ss)$/,
            //     use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            // },

            // {
            //     test: /\.(woff|woff2|eot|ttf|svg)$/,
            //     use: {
            //         loader: 'url-loader',
            //     },
            // },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.css', '.scss']
    },

    output: {
        path: path.resolve(__dirname, "./public"),
        filename: "bundle.js",
        publicPath: '/'
    },
    devtool: "source-map",
    devServer: {
        historyApiFallback: true,
        //  contentBase: path.resolve(__dirname, './public')
        static: {
            directory: path.join(__dirname, 'public'),
        },
        hot: true,
        compress: true,
        port: 3000,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false,
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
          
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },

        })
    ],



}