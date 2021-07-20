const extraWatch = require("extra-watch-webpack-plugin")

module.exports = {
	devServer: {
		host: "0.0.0.0",
		hot: true,
		disableHostCheck: true,
		port: process.env.VUE_APP_PORT,
	},
	configureWebpack: {
		devServer: {
			host: "0.0.0.0",
			hot: true,
			disableHostCheck: true,
			historyApiFallback: true,
			port: process.env.VUE_APP_PORT,
		},
		plugins: [
			new extraWatch({
				files: [".env"],
			}),
		],
	},
}
