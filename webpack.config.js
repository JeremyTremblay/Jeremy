const path = require("path");
const webpack = require("webpack");

module.exports = { 
 // entry: './index.js', //entry point 

  entry: {
    polyfill : 'babel-polyfill',
    index : './index.js'
  },
  mode: "development", //build method
  devtool: "cheap-module-eval-source-map", // source mapping to enhance the debugging process, build: 0 rebuild: ++, production: no, original-source
  output: {
    filename: "[name]-bundle.js", //output file
    path: path.resolve(__dirname, "build"),
    publicPath: "/" //loading external resources, specifies the public URL of the output directory in a browser
  },
  context: path.resolve(__dirname, "src"), //The base directory, an absolute path, for resolving entry points and loaders from configuration.
  devServer: {
    //to quickly develop an application
    hot: true, //hot module replacement
    contentBase: path.resolve(__dirname, "build"), //serving static files
    historyApiFallback: true, //in case of fallback
    publicPath: "/", //where the bundles should be served from
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"] // reverse order
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"] //to think
      },
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/], //not including
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/react", "@babel/preset-env"], //before react
              plugins: ["@babel/proposal-class-properties"] //plugin
            }
          }
        ]
      },
      {
        test: /\.html$/,
        exclude: [/node_modules/], //file -l loade
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]"
          }
        }
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"] // in  reverse order
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.HotModuleReplacementPlugin() //Hot Module Repalce
  ]
};
