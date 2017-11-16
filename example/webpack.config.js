var webpack = require("webpack");
var path = require("path");

module.exports = {
    entry: "./index.jsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
        filename: "dist.js",
    },
    context: path.resolve("./"),
    resolve: {
        modules: [
            "./",
            "node_modules"
        ],
        extensions: [".js", ".jsx"]
    },
    module: {
        rules: [
          {
            test: /.jsx?$/,
            loader: "babel-loader",
            exclude: /node_modules/,
            query: {
                presets: ["env", "react"]
            }
          }
        ]
    }
};