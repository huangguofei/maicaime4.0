'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
var build_url = "", index_url = "", init_url = "../dist/";
if(process.argv.slice(2)[0] && process.argv.slice(2)[0] == "admin") {
    index_url = init_url + 'admin/index.html'
    build_url = init_url + 'admin'
}else if(process.argv.slice(2)[0] && process.argv.slice(2)[0] == "filiale") {
    index_url = init_url + 'filiale/index.html'
    build_url = init_url + 'filiale'
}else if(process.argv.slice(2)[0] && process.argv.slice(2)[0] == "warehouse") {
    index_url = init_url + 'warehouse/index.html'
    build_url = init_url + 'warehouse'
}else {
    index_url = init_url + 'total/index.html'
    build_url = init_url + 'total'
}
module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        '/interior': {
//         target: "http://192.168.3.222:8085",
   		target: "https://t-f.maicaim.net",
          changeOrigin: true,
          pathRewrite: {}
        }
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, index_url),

    // Paths
    assetsRoot: path.resolve(__dirname, build_url),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
