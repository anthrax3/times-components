const path = require("path");
const webpack = require("webpack");
const {dev} = require("./package.json");

const babelLoader = [{
  test: /.jsx?$/,
  loader: 'babel-loader',
  // dont exclude node_modules as react has untranspiled code
  // we will exlude packages by externalisation
  // exclude: /node_modules\/(?!@times-components)/,
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
    // react(native) and apollo have untranspiled code 
    const extern = !path.match(/^\./) && !path.match(/react|apollo/);
  //  console.log(path, extern);
    if (extern) {
      return cb(null, "commonjs "+path); //package will be imported at runtime
    }
  // console.log('intern', path)
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
    filename: "ssr.bundle.js"
  },
};
