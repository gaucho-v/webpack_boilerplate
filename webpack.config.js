const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_BUILD === 'development'
const isProd = !isDev

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }

    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetPlugin(),
            new TerserWebpackPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
        ]
    }

    return config
}

const cssLoaders = extra => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev,
                reloadAll: true
            },
        },
        'css-loader'
    ]

    if (extra) {
        loaders.push(extra)
    }

    return loaders
}

const babelOptions = preset => {
    const opts = {
        presets: [
            '@babel/preset-env'
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties'
        ]
    }

    if (preset) {
        opts.presets.push(preset)
    }

    return opts
}

const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions()
    }]

    if (isDev) {
        loaders.push('eslint-loader')
    }

    return loaders
}

module.exports = (env) => {
    return {
        mode: isDev ? 'development' : 'production',
        entry: {
            main: ['@babel/polyfill','./src/index.js']
        },
        output: {
            path: path.join(__dirname, 'build'),
            filename: '[name].[contenthash].js',
        },
        optimization: optimization(),
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    include: path.join(__dirname, 'src'),
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: babelOptions('@babel/preset-react')
                    }
                },
                {
                    test: /\.s?css$/,
                    use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],
                },
                {
                    test: /\.(jpe?g$|png|gif|svg)$/,
                    use: ['file-loader']
                },
                {
                    test: /\.(ttf|woff)$/,
                    use: ['file-loader']
                },
                {
                    test: /\.(jpe?g$|png|gif|svg)$/,
                    loader: require.resolve('url-loader'),
                    options: {
                        limit: 8192,
                        name: 'static/media/[name].[hash:8].[ext]',
                    },
                },
            ]
        },
        devServer: {
            contentBase: path.join(__dirname, 'static'),
            compress: true,
            port: 4444,
            hot: isDev,
            historyApiFallback: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                minify: {
                    collapseWhitespace: isProd
                }
            }),
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css'
            })
        ]
    }
}
