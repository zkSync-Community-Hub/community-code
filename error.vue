<script setup lang="ts">
import { headerLinks } from './header-links';
import type { NuxtError } from '#app';

useSeoMeta({
  title: 'Page not found',
  description: 'We are sorry but this page could not be found.',
});

defineProps({
  error: {
    type: Object as PropType<NuxtError>,
    required: true,
  },
});

useHead({
  htmlAttrs: {
    lang: 'en',
  },
});

const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation());

provide('navigation', navigation);
</script>

<template>
  <div>
    <!-- FIXME: Hack, we want to pass computed property while `useHeaderNav` expects an array -->
    <HeaderComponent :links="computed(() => headerLinks()) as any" />

    <UMain>
      <UContainer>
        <UPage>
          <UPageError :error="error" />
        </UPage>
      </UContainer>
    </UMain>

    <FooterComponent />

    <UNotifications />
  </div>
</template>
