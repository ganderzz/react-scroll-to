const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
    entry: "./src/index.jsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
        filename: "react-scroll-to.js",
        library: ["react-scroll-to"],
        libraryTarget: "umd",
    },
    context: path.resolve("./"),
    resolve: {
        modules: [
            path.resolve(__dirname, "src"),
            "node_modules"
        ],
        extensions: [".js", ".jsx"]
    },
    externals: [
        {
            react: {
              root: "React",
              commonjs2: "react",
              commonjs: "react",
              amd: "react"
            }
        }
    ],
    module: {
        rules: [
          {
            test: /.jsx?$/,
            loader: "babel-loader",
            exclude: /node_modules/,
          }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, "src", "definitions"),
            to: path.resolve(__dirname, "dist", "definitions")
        }])
    ]
};