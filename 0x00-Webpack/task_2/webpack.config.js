const path = require('path');

module.exports = {
  mode: 'production',
  entry: './js/dashboard_main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  performance: {
		maxAssetSize: 1000000,
    maxEntrypointSize: 1000000
	},
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        use: [
          'file-loader',
					{
						loader: 'image-webpack-loader',
						options: {
							bypassOnDebug: true,
							disable: true,
						},
					},
				],
      },
    ]
  }
};
