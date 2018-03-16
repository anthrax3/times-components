const path = require("path");
const webpack = require("webpack");
const {dev} = require("./package.json");

const babelLoader = [{
  test: /.jsx?$/,
  loader: 'babel-loader',
  //exclude: /node_modules\/(?!@times-components)/,
  query: {
    presets: ['react-native'],
//    plugins: ['react-native-web']
  }
}];


module.exports = {
  target: "node",
  mode: "development",
  module: {rules: babelLoader},
  externals: [(ctx, path, cb) => {
    const extern = !path.match(/^\./) && !path.match(/react|apollo/);
    console.log(path, extern);
    if (extern) {
      return cb(null, "commonjs "+path); //package will be imported
    }
//    console.log('intern', path)
    cb(); // package will be inlined, webpackified
  }],

  resolve: {
    alias: {"react-native": "react-native-web"},
    extensions: [".web.js", ".js"],
  },

  entry: ["./"+dev],
  output: {
    libraryTarget: "umd",
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js"
  },
};
