const path = require("path");

module.exports = {
  entry: ["./src/test.js"],

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "engine.js"
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /(node_modules)/,
        query: {
          presets: ["es2015", "stage-2"]
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader"
      },
      {
        test: /\.css$/,
        loader: "css-loader",
        query: {
          modules: true,
          localIdentName: "[name]__[local]___[hash:base64:5]"
        }
      }
    ]
  }
};