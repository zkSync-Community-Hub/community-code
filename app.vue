<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/types';

provideHeadlessUseId(() => useId());
const { seo } = useAppConfig();

const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation());
provide('navigation', navigation);

useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: {
    lang: 'en',
  },
});

const seoDescription =
  'Build together with the ZKsync Community. Learn how to build amazing smart contracts and dApps on ZKsync Era.';

useSeoMeta({
  titleTemplate: `%s - ${seo?.siteName}`,
  ogSiteName: seo?.siteName,
  ogUrl: 'https://code.zksync.io',
  description: seoDescription,
  ogDescription: seoDescription,
  twitterTitle: `%s`,
  twitterDescription: seoDescription,
  twitterCard: 'summary_large_image',
  twitterSite: '@zksync',
  twitterCreator: '@ZKsyncDevs',
  twitterImageAlt: 'Hyperscaling Ethereum with ZK tech.',
});

defineOgImageComponent('OgImageZK');

const { data: files } = useLazyFetch<ParsedContent[]>('/api/search.json', {
  default: () => [],
  server: false,
});
</script>

<template>
  <div>
    <NuxtLoadingIndicator />

    <HeaderComponent :search="true" />

    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <FooterComponent />

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation || []"
      />
    </ClientOnly>

    <UNotifications />
  </div>
</template>
