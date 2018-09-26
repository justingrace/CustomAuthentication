const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cleanPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
         test: /\.(sass|scss)$/,
         use: [
          "style-loader",
          "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]",
          "postcss-loader",
          "sass-loader"
         ]
       },
       {
        test: /\.(png|jp?g|gif|svg)$/,
        use:
            {
              loader: 'url-loader?limit=8000&name=img/[name].[ext]',
            }
        },
        {
			    test: /\.(ogg|mp3|wav|mpe?g)$/,
			    use: 'file-loader?name=audio/[name].[ext]'
	      }
    ]
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new cleanPlugin(['build']),
    new HtmlWebpackPlugin({
      inject: true,
      template: './src/index.html'
    }),

    new CopyWebpackPlugin([{ from: './public/*', to: './', flatten: true}, {from: './public/images', to: './images', ignore: ['*.sh', '*.svg']}])
  ]
}
