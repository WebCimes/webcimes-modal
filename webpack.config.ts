// Generated using webpack-cli https://github.com/webpack/webpack-cli

import path from 'path';
import webpack from "webpack";
import TerserPlugin from "terser-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import RemovePlugin from "remove-files-webpack-plugin";

const isProduction = process.env.NODE_ENV == 'production';

// Config UDM
const configUDM: webpack.Configuration = {
    mode: (isProduction ? "production" : "development"),
    devtool: (isProduction ? false : "source-map"),
    entry: {
        "webcimes-modal.udm": "./src/ts/webcimes-modal.ts",
        "webcimes-modal.udm.min": "./src/ts/webcimes-modal.ts",
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                test: /\.min\.js$/i,
                extractComments: false,
            }),
        ],
    },
    output: {
        filename: "js/udm/[name].js",
        path: path.resolve(__dirname, "dist"),
        // publicPath: "/dist/",
        libraryTarget: "umd",
        clean: false, // Clean the output directory before emit.
    },
    module: {
        rules: [
            {
                test: /\.(ts)$/i,
                use: "ts-loader",
            },
        ],
    },
};

// Config ESM
const configESM: webpack.Configuration = {
    mode: (isProduction ? "production" : "development"),
    devtool: (isProduction ? false : "source-map"),
    entry: {
        "webcimes-modal.esm": "./src/ts/webcimes-modal.ts",
        "webcimes-modal.esm.min": "./src/ts/webcimes-modal.ts",
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                test: /\.min\.js$/i,
                extractComments: false,
            }),
        ],
    },
    experiments: {
        outputModule: true,
    },
    output: {
        filename: "js/esm/[name].js",
        path: path.resolve(__dirname, "dist"),
        // publicPath: "/dist/",
        libraryTarget: "module",
        clean: false, // Clean the output directory before emit.
    },
    module: {
        rules: [
            {
                test: /\.(ts)$/i,
                use: "ts-loader",
            },
        ],
    },
};

// Config CSS + Remove plugin
const configCSS: webpack.Configuration = {
    mode: (isProduction ? "production" : "development"),
    devtool: (isProduction ? false : "source-map"),
    entry: {
        "webcimes-modal": "./src/css/webcimes-modal.css",
        "webcimes-modal.min": "./src/css/webcimes-modal.css",
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin({
                test: /\.min\.css$/i,
            }),
        ],
    },
    output: {
        filename: "css/[name].js",
        path: path.resolve(__dirname, "dist"),
        // publicPath: "/dist/",
        clean: false, // Clean the output directory before emit.
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                // use: ['style-loader', 'css-loader'],
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(svg|png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext][query]', // Correct bug asset/ressource url wrong path with css files subfolder https://github.com/webpack-contrib/mini-css-extract-plugin/issues/1005
                },
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({filename: "css/[name].css"}),
        new RemovePlugin({
            before: {
                include: [
                    './dist' // Delete dist folder before running webpack build
                ]
            },
            after: {
                test: [
                    {
                        folder: './dist/css',
                        method: (absoluteItemPath) => {
                            return new RegExp(/(\.js|\.js\.map)$/, 'm').test(absoluteItemPath); // Delete extra empty js file (can't ouput directly css)
                        },
                    }
                ],
            }
        }),
    ],
};

// Export
export default [configUDM, configESM, configCSS];