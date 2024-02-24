const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: "./web-app/client/index.js",

  output: {
    path: path.join(__dirname, 'build'),
    fileName: 'bundle.js',
    publicPath: '/'

  },
  devServer: {
    port: 8080,
    historyApiFallback: true,
    proxy: {
      '/': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
    static: './build', 
    hot: true,
  },
  resolve: {
    extensions:[".js", ".jsx", ".json", ".scss"],
  },

  module: {
        rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }],
              ['@babel/preset-react', { targets: 'defaults' }],
            ],
          },
        },
      },
      {
        test: /(\.css|\.scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      inject: false,
      template: './index.html',
    })
  ],
};
