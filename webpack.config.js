'use strict';

const env = process.env.NODE_ENV;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const path = require('path');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const useContentHash = false;

module.exports = {
    mode: env,
    entry: './src/index.ts',
    devtool: env === 'production' ? undefined : 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ],
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/inline'
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserJSPlugin({}),
            new CssMinimizerPlugin(),
            new ImageMinimizerPlugin({
                generator: [{
                    preset: "webp",
                    implementation: ImageMinimizerPlugin.sharpGenerate,
                    filename: () => "[name]_[width]x[height]_[contenthash][ext]",
                    options: {
                        resize: {
                            fit: 'contain',
                            enabled: true,
                            background: {r: 0, g: 0, b: 0, alpha: 0},
                            width: '[width]',
                            height: '[height]'
                        },
                        encodeOptions: {
                            webp: {
                                lossless: true,
                            },
                        }
                    }
                }],
                minimizer: {
                    implementation: ImageMinimizerPlugin.sharpMinify,
                    filename: () => "[name]_[width]x[height]_[contenthash][ext]",
                    options: {
                        encodeOptions: {
                            jpeg: {
                                quality: 100,
                            },
                            webp: {
                                lossless: true,
                            },
                            avif: {
                                lossless: true,
                            },
                            png: {},
                            gif: {},
                        },
                    },
                },
            }),
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins:
        [new MiniCssExtractPlugin({
            filename: env === 'production' && useContentHash ? '[name].[contenthash].css' : '[name].css'
        }), new HtmlWebpackPlugin({template: './public/index.html'})],
    output: {
        filename: env === 'production' && useContentHash ? '[name].[contenthash].js' : '[name].js',
        path: path.resolve(__dirname, 'dist'),
        library: 'Clubdesk',
        clean: true,
    },
};
