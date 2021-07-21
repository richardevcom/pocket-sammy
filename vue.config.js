const extraWatch = require("extra-watch-webpack-plugin")

module.exports = {
	devServer: {
		host: process.env.VUE_APP_HOST,
		port: process.env.VUE_APP_PORT,
	},
	configureWebpack: {
		devServer: {
			host: process.env.VUE_APP_HOST,
			port: process.env.VUE_APP_PORT,
		},
		plugins: [
			new extraWatch({
				files: [".env"],
			}),
		],
	},
}
