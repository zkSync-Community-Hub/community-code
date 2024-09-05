// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [['@matterlabs/docs-nuxt-template']],
  modules: ['@nuxt/content', '@nuxt/ui', '@nuxt/eslint', '@nuxtjs/seo', 'nuxt-gtag'],
  site: {
    name: 'Community Code',
    url: process.env.NUXT_SITE_ENV ? 'https://staging-code.zksync.io' : 'https://code.zksync.io',
  },
  nitro: {
    plugins: ['./plugins/content.ts'],
  },
  runtimeConfig: {
    public: {
      app: 'code',
    },
  },
  components: [
    {
      path: '~/components',
      global: true,
    },
  ],
  content: {
    navigation: {
      fields: [
        'authors',
        'tags',
        'summary',
        'updated',
        'tools',
        'featured',
        'description',
        'github_repo',
        'what_you_will_learn',
      ],
    },
  },
  routeRules: {
    '/api/search.json': { prerender: true },
    '*-surround': { robots: false },
    '/*/*-surround': { robots: false },
    '/tutorials/*/_dir': { robots: false },
    '/_nuxt': { robots: false },
    '/api/*': { robots: false },
  },
  experimental: {
    defaults: {
      nuxtLink: {
        trailingSlash: 'remove',
      },
    },
  },
  $production: process.env.NUXT_SITE_ENV
    ? {}
    : {
        gtag: {
          id: 'G-QHP3K0NN1M',
        },
      },
});
