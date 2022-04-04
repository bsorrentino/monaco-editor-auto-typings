import * as path from 'path';
import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';

const config: webpack.Configuration = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    mainFields: ['main', 'module', 'browser'],
    fallback: {
      path: require.resolve('path-browserify'),
    },
  },
  entry: { 
    app: './src/index.ts',
  },
  target: 'web',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.ttf$/,
        use: ['file-loader'],
      },
    ],
  },
  devServer: {
    static: path.join(__dirname, 'app'),
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 4000,
  },
  output: {
    path: path.resolve(__dirname, 'app'),
    filename: 'js/[name].js',
    publicPath: './',
    libraryTarget: 'global',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './index.html',
    }),
    new MonacoWebpackPlugin(),
  ],
};

export default config;
