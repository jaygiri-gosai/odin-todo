// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  entry: "./src/scripts/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    clean: true,
  },
  devtool: "inline-source-map",
  devServer: {
    // Serve your source (or public) directory — NOT dist
    static: {
      directory: path.join(__dirname, "src"),
      watch: true,
    },
    port: 8080,
    open: true, // optional: opens browser
    hot: true, // enable HMR
    client: {
      overlay: true,
      logging: "info",
    },
    devMiddleware: {
      publicPath: "/", // ensure in-memory assets are available at '/'
    },
    watchFiles: ["src/**/*"], // explicitly watch your source files
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      // webpack.config.js
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/resource", // Specifies the output path and filename for the images
        },
      },
    ],
  },
});
