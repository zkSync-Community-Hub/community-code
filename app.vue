<script setup lang="ts">
import { headerLinks } from './header-links';

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
</script>

<template>
  <div>
    <NuxtLoadingIndicator />

    <!-- FIXME: Hack, we want to pass computed property while `useHeaderNav` expects an array -->
    <HeaderComponent :links="computed(() => headerLinks()) as any" />

    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <FooterComponent />

    <UNotifications />
  </div>
</template>
