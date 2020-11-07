export default {
  /*
   ** Server settings
   */
  server: {
    host: 'localhost',
    port: 3000,
  },

  env: {},

  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Default page transition
   */
  pageTransition: {
    name: 'default',
    mode: '',
  },

  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/google-fonts'],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/style-resources'],

  /*
   ** Global style resources
   */
  styleResources: {
    scss: [
      '~assets/scss/_variables.scss',
      '~assets/scss/_reset.scss',
      '~assets/scss/_mixins.scss',
    ],
  },

  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},

  transpileDependencies: ['vuex-module-decorators'],

  googleFonts: {
    families: {
      Poppins: {
        wght: [100, 200, 300, 400, 500, 600, 700, 800],
      },
      'Playfair Display': {
        wght: [400, 500, 600, 700, 800],
      },
    },
  },
}
