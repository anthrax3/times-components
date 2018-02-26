const path = require("path");
const webpack = require("webpack");

const babelLoaderConfiguration = {
  test: /\.js$/,
  exclude: /node_modules\/(?!@times-components)/,
  use: {
    loader: "babel-loader",
    options: {
      cacheDirectory: true,
      plugins: ["react-native-web", "transform-object-rest-spread"],
      presets: ["react-native"]
    }
  }
};

module.exports = {
  target: "web",

  entry: path.resolve(__dirname, "./client.js"),

  output: {
    filename: "client.js",
    path: path.resolve(__dirname, "dist")
  },

  module: {
    rules: [babelLoaderConfiguration]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ],

  resolve: {
    extensions: [".web.js", ".js"]
  }
};
