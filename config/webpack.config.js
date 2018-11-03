const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "..", "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "..", "dist"),
    publicPath: path.resolve(__dirname, ".."),
    filename: "react-scroll-to.js",
    library: ["react-scroll-to"],
    libraryTarget: "umd"
  },
  context: path.resolve(__dirname, ".."),
  resolve: {
    modules: [path.resolve(__dirname, "..", "src"), "node_modules"],
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
        test: /.(jsx|js)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true
          }
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "..", "src", "definitions"),
        to: path.resolve(__dirname, "..", "dist", "definitions")
      }
    ])
  ]
};
