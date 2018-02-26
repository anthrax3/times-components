const path = require("path");

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
  target: "node",

  entry: path.resolve(__dirname, "./server.js"),

  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "dist")
  },

  module: {
    rules: [babelLoaderConfiguration]
  },

  resolve: {
    extensions: [".web.js", ".js"]
  }
};
