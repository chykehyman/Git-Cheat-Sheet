import { resolve, join } from 'path';
import { HotModuleReplacementPlugin } from 'webpack';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin, { loader } from 'mini-css-extract-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

const prodEntryPoint = resolve(__dirname, './src/client/Index.jsx');
const devEntryPoint = ['react-dev-utils/webpackHotDevClient', prodEntryPoint];

const prodLoader = [loader, 'css-loader'];
const styleLoader =
  process.env.NODE_ENV !== 'production' ? ['css-hot-loader', ...prodLoader] : prodLoader;

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/client/index.html',
  filename: 'index.html',
  inject: 'body'
});

let hotFlag = true;
if (process.env.NODE_ENV === 'production') hotFlag = false;

export default (env, argv) => ({
  devtool: argv.mode === 'production' ? 'inline-source-map' : 'source-map',
  entry: argv.mode === 'production' ? prodEntryPoint : devEntryPoint,
  output: {
    path: resolve(__dirname, './build/client'),
    filename: '[name].[hash].js'
  },
  devServer: {
    contentBase: join(__dirname, 'build/client'),
    compress: true,
    overlay: true,
    hot: hotFlag,
    noInfo: true,
    historyApiFallback: true,
    port: 8000,
    proxy: {
      '/api': 'http://localhost:4000'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [resolve(__dirname, 'src')],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(css|scss)$/,
        use: styleLoader
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: 'file-loader?name=fonts/[name].[ext]'
          }
        ]
      }
    ]
  },
  resolve: {
    modules: ['node_modules', resolve(__dirname, 'src')],
    extensions: ['.js', '.json', '.jsx', '.css', '.scss']
  },
  plugins: [
    new CleanWebpackPlugin('build', {}),
    argv.mode !== 'production' ? new HotModuleReplacementPlugin() : () => {},
    htmlPlugin,
    new MiniCssExtractPlugin({
      filename: argv.mode === 'production' ? 'style.[hash].css' : '[name].css',
      chunkFilename: 'style.[id].css'
    })
  ]
});
