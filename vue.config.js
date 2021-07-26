module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'PAGE'
                return args
            })
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '/page/'
        : '/', outputDir: 'dist'
}
