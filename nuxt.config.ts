// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [['github:matter-labs/docs-nuxt-template#development', { install: true }]],
  modules: ['@nuxt/content', '@nuxt/ui', '@nuxt/eslint'],
});
