export default {
  env: {
    algoliaAppId: process.env.ALGOLIA_APP_ID || 'http://localhost:3000',
    algoliaPublicKey: process.env.ALGOLIA_PUBLIC_KEY || 'http://localhost:3000'
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  configureWebpack: (config) => {
    config.output.globalObject = 'this'
  },
  head: {
    title: 'Ngoding Bentar',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      // { "http-equiv": 'Content-Security-Policy', content: 'upgrade-insecure-requests'},
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  // render: {
  //   csp: true
  // },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/material.css'
  ],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/axios' },
    { src: '@/plugins/global.ts', ssr: false },
    { src: '@/plugins/editor.ts', ssr: false },
    { src: '@/plugins/pagination.ts', ssr: false },
    { src: '@/plugins/chart.ts', ssr: false },
    { src: '@/plugins/instanSearch', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  // components: true,
  components: [{ path: '~/components' }],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/composition-api',
    '@nuxtjs/fontawesome',
    '@nuxt/typescript-build'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['cookie-universal-nuxt', '@nuxtjs/axios', '@nuxtjs/pwa'],

  axios: { browserBaseURL: '/api', proxy: true },

  http: {
    proxy: true
  },
  // pwa: {
  //   manifest: {
  //     name: 'Ngodingbentar',
  //     short_name: 'Ngodingbentar',
  //     description: 'Masih #NgodingBentar',
  //     lang: 'en',
  //     dir: 'ltr',
  //     background_color: '#f7f7f7',
  //     theme_color: '#f7f7f7',
  //     display: 'standalone',
  //     orientation: 'portrait-primary',
  //     icons: [{
  //       "src": "/static/maskable_icon_x72.png",
  //         "sizes": "72x72",
  //         "type": "image/png"
  //       }, {
  //         "src": "/static/maskable_icon_x96.png",
  //         "sizes": "96x96",
  //         "type": "image/png"
  //       }, {
  //         "src": "/static/maskable_icon_x128.png",
  //         "sizes": "128x128",
  //         "type": "image/png"
  //       }, {
  //         "src": "/static/maskable_icon_x192.png",
  //         "sizes": "192x192",
  //         "type": "image/png"
  //       }, {
  //         "src": "/static/maskable_icon_x384.png",
  //         "sizes": "384x384",
  //         "type": "image/png"
  //       }, {
  //         "src": "/static/maskable_icon_x512.png",
  //         "sizes": "512x512",
  //         "type": "image/png"
  //       }],
  //   },
  // },
  proxy: {
    '/api': { target: process.env.API_URL, pathRewrite: { '^/api': '/' } }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vue-instantsearch', 'instantsearch.js/es'],
    loaders: {
      vue: {
        transformAssetUrls: {
          audio: 'src'
        }
      }
    },

    extend (config) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })
    }
  },
  fontawesome: {
    icons: {
      solid: true,
      regular: true,
      brands: true
    }
  },
  generate: {
    fallback: true
  }
}
