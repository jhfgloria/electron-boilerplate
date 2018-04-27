const path = require("path");
const merge = require("webpack-merge");
const base = require("./webpack.base.config");

module.exports = () => {
  return merge(base('development', 'development'), {
    entry: {
      main: "./src/main.js",
      skystore: "./src/renderers/skystore.js"
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "../dist/main/")
    }
  });
};
