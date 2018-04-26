const path = require("path");
const merge = require("webpack-merge");
const base = require("./webpack.base.config");

module.exports = () => {
  return merge(base('development', 'development'), {
    entry: {
      main: "./src/main.js",
      renderer: "./src/renderers/renderer.js"
    },
    output: {
      filename: "[name]/[name].js",
      path: path.resolve(__dirname, "../dist")
    }
  });
};
