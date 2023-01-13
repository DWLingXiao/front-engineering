const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  mode: "development",
  devtool: false,
  entry: path.resolve(__dirname, "./src/main.js"),
  output: {
    path: path.resolve(__dirname, "./dist"),
  },
  plugins: [
    new ModuleFederationPlugin({
      remotes: {
        RemoteApp: "app1@http://localhost:8080/dist/remoteEntry.js",
      },
      shared: ['lodash']
    }),
    new HtmlWebpackPlugin(),
  ],
  devServer: {
    port: 8081,
    hot: true,
    open: true,
  },
}