const withImages = require('next-images');

module.exports = withImages({
  TrailingSlash: true,
  exportPathMap: function () {
    return {
      '/': { page: '/' },
      '/detail-movie': { page: '/detail-movie' },
      '/login': { page: '/login' },
      '/register': { page: '/register' },
      '/blank-page': { page: '/blank-page' },
    };
  },
  publicRuntimeConfig: {
    localeSubpaths: typeof process.env.LOCALE_SUBPATHS === 'string'
      ? process.env.LOCALE_SUBPATHS
      : 'none',
    apiUrl: process.env.NODE_ENV === 'development'
      ? 'https://www.treasurelandtechhomes.com/api' // development api
      : 'https://www.treasurelandtechhomes.com/api' // production api
  },
  webpack: (config, options) => {
    cssModules: true,
      //      config.module.rules.push({
      //          enforce: 'pre',
      //          test: /\.js?$/,
      //          exclude: [/node_modules/],
      //          loader: 'eslint-loader',
      //          options: {
      //            quiet: true,
      //          }
      //      });
      config.node = {
        fs: 'empty'
      }
    return config;
  },
});
