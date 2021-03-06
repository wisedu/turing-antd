const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require('vue-loader')
const path = require('path');
const cleanWebpackPlugin = require("clean-webpack-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
let packageName = "tg-turing-antd";

module.exports = {
    entry: {
        // 多入口文件
        "tg-turing-antd": './entry.js',
    },
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             commons: {
    //                 chunks: 'initial',
    //                 name: 'commons',
    //                 minChunks: 2,
    //                 maxInitialRequests: 5,
    //                 minSize: 0
    //             },
    //             vendor:{ // 抽离第三插件
    //                 test:/node_modules/,
    //                 chunks:'initial',
    //                 name:'vendor',
    //                 priority:10
    //             }
    //         }
    //     }
    // },
    output: {
        path:path.resolve(__dirname, 'dist'),
        // 打包多出口文件
        // 生成 a.bundle.js  b.bundle.js  jquery.bundle.js
        filename: './[name].min.js',
        library: packageName,
        libraryTarget: 'umd',
        umdNamedDefine: true,
        sourceMapFilename:"[file].map"
    },
    module:{
        rules:[
            { 
                test: /\.vue$/, 
                loader: 'vue-loader',
                options: { 
                    loaders: [ 
                        MiniCssExtractPlugin.loader, 
                        "css-loader"
                    ]
                }
            },
            { 
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                exclude: [
                    path.resolve(__dirname, './src/icons'),
                ],
                use: [{ loader: 'url-loader',options: { limit: 8192 } }] 
            },
            {
                test: /\.svg$/,
                include: [
                    path.resolve(__dirname, './src/icons'),
                ],
                loader: 'svg-sprite-loader?' + JSON.stringify({
                    name: '[name]',
                    prefixize: true,
                }),
                options: {
                    symbolId: filePath => 'icon--'+path.basename(filePath,'.svg'),
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader']
            }
        ]
    },
    plugins:[
        new cleanWebpackPlugin(["dist"]),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].min.css',
            // chunkFilename: 'app.[contenthash:12].css'  // use contenthash *
            chunkFilename: '[name].min.css'
        }),
        new VueLoaderPlugin(),
    ],
    resolve: {  //导入的时候不用写拓展名
        extensions: [' ', '.js', '.json', '.vue', '.scss', '.css'],
        alias: {
            vue: 'vue/dist/vue.js',
        }
    },
    externals: ["tg-turing","vue","bh-iview"],
    devtool: 'source-map'
}