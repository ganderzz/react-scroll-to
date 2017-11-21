var webpack = require("webpack");
var path = require("path");

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
            path.join(__dirname, "src"),
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
          }
        ]
    }
};