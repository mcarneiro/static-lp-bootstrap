const path = require('path')

module.exports = {
	entry: ['babel-polyfill', './src/js/main.js'],
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'www/assets/js'),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
		]
	}
}
