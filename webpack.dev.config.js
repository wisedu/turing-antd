const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require('vue-loader')
const path = require('path');
const cleanWebpackPlugin = require("clean-webpack-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const SvgStore = require('webpack-svgstore-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = {
    entry: {
        // 多入口文件
        main: './src/index.js',
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    name: 'commons',
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0
                },
                vendor:{ // 抽离第三插件
                    test:/node_modules/,
                    chunks:'initial',
                    name:'vendor',
                    priority:10
                }
            }
        }
    },
    output: {
        path:path.resolve(__dirname, 'dist'),
        // 打包多出口文件
        // 生成 a.bundle.js  b.bundle.js  jquery.bundle.js
        filename: './js/[name].bundle.js'
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
                test: /\.(gif|jpg|png|woff|eot|ttf)\??.*$/,
                use: [{ loader: 'url-loader',options: { limit: 8192 } }] 
            },
            {
                test: /\.css$/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(svg)(\?.*)?$/,
                exclude: [
                    path.resolve(__dirname, './src/icons'),
                ],
				use: {
					loader: 'file-loader',
					options: {
						name: `src/icons/svg.[ext]`,
					},
				},
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
        ]
    },
    plugins:[
        new cleanWebpackPlugin(["dist"]),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'app.[name].css',
            // chunkFilename: 'app.[contenthash:12].css'  // use contenthash *
            chunkFilename: 'app.[name].css'
        }),
        new VueLoaderPlugin(),
        new htmlWebpackPlugin({
            filename: "index.html",
            title: "main",
            chunks: ["vendor","commons",'main'],  // 按需引入对应名字的js文件
            template: "./src/index.html"
        }),
        // new htmlWebpackPlugin({
        //     filename: "detail.html",
        //     title: "detail",
        //     chunks: ["vendor","commons",'detail'],  // 按需引入对应名字的js文件
        //     template: "./src/detail.html"
        // }),
        // svg icons
		// new SvgStore({
		// 	prefix: 'icon--',
		// 	svgoOptions: {
		// 		plugins: [
		// 			{ cleanupIDs: false },
		// 			{ collapseGroups: false },
		// 			{ removeTitle: true },
		// 		],
		// 	},
        // }),
        // new SpriteLoaderPlugin({
        //     plainSprite: true,
        //     spriteAttrs: {
        //       id: 'my-custom-sprite-id'
        //     }
        // })

    ],
    resolve: {  //导入的时候不用写拓展名
        extensions: [' ', '.js', '.json', '.vue', '.scss', '.css'],
        alias: {
            vue: 'vue/dist/vue.js',
        }
    },
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300,//防止重复保存频繁重新编译,300ms内重复保存不打包
        poll: 1000  //每秒询问的文件变更的次数
    },
    devServer:{
        inline: true,
        compress: true,
        host: '127.0.0.1',
        port: 2500,
        historyApiFallback: true,
        proxy: {
            "/sys": "http://localhost:8080/emap"
        }
    }
}