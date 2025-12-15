const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/scripts/index.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Production",
      template: "./src/index.html",
    }),
  ],
  output: {
    filename: "common.bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};
