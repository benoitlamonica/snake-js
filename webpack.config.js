const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require('path');

module.exports = {
    mode: "development",
    watch: true,
    entry: ['./src/index.js', './src/style/main.scss'],
    output: {
        path: path.resolve('./dist'),
        filename: 'main.js',
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '/style/[name].css',
                        }
                    },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),

        new BrowserSyncPlugin({
            host: 'localhost',
            port: 5000,
            server: { baseDir: ['dist'] }
        })
    ]
}