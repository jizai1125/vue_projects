const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const VueLoaderPlugin=require('vue-loader/lib/plugin');
module.exports={
    mode: 'development',
    entry: {
        main: path.join(__dirname,'./src/main.js'),
    },
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname,'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname,'./src/index.html'),
            filename: 'index.html'
        }),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: ['style-loader','css-loader']
            },
            {
                test: /\.less$/,
                loader: ['style-loader','css-loader','less-loader']
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                loader: 'url-loader'
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg)$/,
                loader: 'url-loader'
            },
            {//babel 来转换es高级语法
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    }

}