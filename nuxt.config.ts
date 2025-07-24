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
  icon: {
    clientBundle: {
      // scan all components in the project and include icons
      scan: true,
      // include all custom collections in the client bundle
      includeCustomCollections: true,
      // guard for uncompressed bundle size, will fail the build if exceeds
      sizeLimitKb: 256,
      icons: [
        'heroicons:clipboard-document',
        'heroicons:chevron-right-20-solid',
        'heroicons:chevron-left-20-solid',
        'heroicons:hashtag-20-solid',
        'heroicons:chevron-down-20-solid',
        'heroicons:moon-20-solid',
        'heroicons:x-mark-20-solid',
        'heroicons:rocket-launch',
        'heroicons:arrow-up-right-20-solid',
        'heroicons:check-circle-16-solid',
        'vscode-icons:file-type-bun',
        'vscode-icons:file-type-npm',
        'vscode-icons:file-type-pnpm',
        'vscode-icons:file-type-yarn',
      ],
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
