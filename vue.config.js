const extraWatch = require("extra-watch-webpack-plugin")

module.exports = {
	devServer: {
		port: process.env.VUE_APP_PORT,
	},
	configureWebpack: {
		plugins: [
			new extraWatch({
				files: [".env"],
			}),
		],
	},
}
