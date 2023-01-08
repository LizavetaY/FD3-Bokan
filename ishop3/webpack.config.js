const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const extractCSS = new MiniCssExtractPlugin({
  filename: "bundle.css",
});

module.exports = {
  entry: path.resolve(__dirname, "./App.js"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [extractCSS],
};
