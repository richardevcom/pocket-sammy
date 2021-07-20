const extraWatch = require("extra-watch-webpack-plugin")

module.exports = {
	devServer: {
		port: process.env.VUE_APP_PORT,
	},
	configureWebpack: {
		devServer: {
			disableHostCheck: true,
			historyApiFallback: true,
			// public: process.env.VUE_APP_HOST + ":" + process.env.VUE_APP_PORT,
		},
		plugins: [
			new extraWatch({
				files: [".env"],
			}),
		],
	},
}
