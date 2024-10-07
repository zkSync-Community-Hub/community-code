// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [['@matterlabs/docs-nuxt-template']],
  modules: ['nuxt-gtag'],
  site: {
    name: 'Community Code',
    url: process.env.NUXT_SITE_ENV === 'production' ? 'https://code.zksync.io' : 'https://staging-code.zksync.io',
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
  $production:
    process.env.NUXT_SITE_ENV === 'production'
      ? {
          gtag: {
            id: 'G-QHP3K0NN1M',
          },
        }
      : { gtag: { enabled: false } },
});
