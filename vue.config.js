module.exports = {
	configureWebpack: {
		resolve: {
			alias: {
				'assets': '@/assets',
				'common': '@/common',
				'components': '@/components',
				'network': '@/network',
				'views': '@/views'
			}
		}

    // dev: {
    //   // assetsPublicPath: './'
    //   baseURL: './'
    // },
    //   build: {
    //     // assetsPublicPath: './'
    //     baseURL: './'
    //   }
	},
  publicPath: './'
}
