import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";

export default {
  input: "lib/card.js",
  output: {
    file: "dist/card.bundle.js",
    format: "cjs"
  },
  plugins: [
    commonjs({
      extensions: [".js", ".web"]
    }),
    babel({
      exclude: "node_modules/**"
    })
  ]
};
