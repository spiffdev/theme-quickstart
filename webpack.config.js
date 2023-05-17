const path = require("path");
const webpack = require("webpack");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const dotenv = require("dotenv");

module.exports = () => {
    // Parse .env file and inject params into environment of built project.
    const env = dotenv.config().parsed;
    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});

    return {
        mode: "development",
        entry: "./src/index.tsx",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "main.js",
            globalObject: "this",
            library: {
                name: "spiffCommerceClient",
                type: "umd",
            },
        },
        target: "web",
        devtool: "source-map",
        devServer: {
            port: "3000",
            static: ["./public"],
            open: true,
            hot: true,
            liveReload: true,
        },
        resolve: {
            extensions: [".js", ".jsx", ".json", ".ts", ".css", ".tsx"],
            fallback: {
                fs: false,
            },
        },
        plugins: [
            new NodePolyfillPlugin(),
            new webpack.DefinePlugin(envKeys),
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1, // disable creating additional chunks
            }),
        ],
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    extractComments: false,
                    terserOptions: {
                        compress: {
                            drop_console: true,
                        },
                        format: {
                            comments: false,
                        },
                    },
                }),
            ],
        },
        module: {
            rules: [
                {
                    test: /\.(sa|sc|c)ss$/i,
                    use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"],
                },
                {
                    test: /\.(ts|tsx|js|jsx)$/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-typescript", ["@babel/preset-react", { runtime: "automatic" }]],
                        },
                    },
                    exclude: /node_modules/,
                },
                {
                    test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
                    loader: "url-loader",
                    options: { limit: false },
                },
            ],
        },
    };
};
