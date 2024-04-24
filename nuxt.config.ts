// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],
  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxthq/studio',
    'nuxt-og-image',
    '@nuxt/image',
  ],
  hooks: {
    // Define `@nuxt/ui` components as global to use them in `.md` (feel free to add those you need)
    'components:extend': (components) => {
      const globals = components.filter((c) => ['UButton', 'UIcon'].includes(c.pascalName))

      globals.forEach((c) => c.global = true)
    }
  },
  ui: {
    icons: ['heroicons', 'simple-icons']
  },
  image: {
    quality: 90,
    format: ['avif', 'webp'],
  },
  fonts: {
    families: [
      { name: 'Raleway', provider: 'google' },
      { name: 'Montserrat', provider: 'google' },
      { name: 'Fira Mono', provider: 'google' },
    ],
  },
  routeRules: {
    '/api/search.json': { prerender: true },
  },
  devtools: {
    enabled: true
  },
  typescript: {
    strict: false
  },
  content: {
    highlight: {
      langs: [
        'asm',
        'c++',
        'go',
        'graphql',
        'groovy',
        'java',
        'jsx',
        'python',
        'rust',
        'solidity',
        'swift',
        'toml',
        'xml',
      ],
      theme: {
        default: 'github-light',
        light: 'github-light',
        dark: 'github-dark',
        sepia: 'monokai',
      },
    },
  },
  runtimeConfig: {
    public: {
      mdc: {
        useNuxtImage: true,
      },
    },
  },
})
