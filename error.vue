<script setup lang="ts">
import type { NuxtError } from '#app';
import { headerLinks } from './header-links';

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

const cards = [
  {
    title: 'Quickstart',
    description: 'Get started building applications on ZKsync with our quickstart guide.',
    to: '/zksync-era/guides/quick-start',
    icon: 'i-heroicons-code-bracket-16-solid',
  },
  {
    title: 'ZKsync Stack',
    description: 'Learn how to run your own ZKsync chain with our chain operator quickstart guide.',
    to: '/zk-stack/running/quickstart',
    icon: 'i-heroicons-square-3-stack-3d-16-solid',
  },
  {
    title: 'ZKsync Airbender',
    description: 'Explore the fastest RISC-V prover powering the next-generation of ZKsync chains.',
    to: '/zksync-protocol/zksync-airbender/overview',
    icon: 'i-heroicons-rocket-launch-solid',
  },
  {
    title: 'Step-by-step Tutorials',
    description: 'Follow along with step-by-step tutorials made by the ZKsync community.',
    to: 'https://code.zksync.io/',
    icon: 'i-heroicons-beaker-solid',
  },
];
</script>

<template>
  <div>
    <HeaderComponent :links="unref(computed(() => headerLinks()))" />

    <UMain>
      <UContainer>
        <UPage>
          <div
            v-if="error.statusCode == 404"
            class="flex min-h-screen items-center"
          >
            <UContainer>
              <div class="space-y-3 text-center">
                <UBadge
                  color="gray"
                  variant="subtle"
                  >{{ error.statusCode }} • Page not found</UBadge
                >
                <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">Lost in the docs?</h1>
                <p class="text-gray-500">
                  We couldn’t find the page you were looking for. Try one of these helpful links.
                </p>
              </div>

              <UPageGrid class="my-8 lg:!grid-cols-2 xl:!grid-cols-2 2xl:!grid-cols-2">
                <ULandingCard
                  v-for="(c, i) in cards"
                  :key="i"
                  v-bind="c"
                >
                  <template #icon>
                    <UIcon
                      :name="c.icon"
                      class="text-primary h-6 w-6"
                    />
                  </template>
                </ULandingCard>
              </UPageGrid>
              <div class="text-center">
                <UButton
                  label="Return to Home"
                  variant="outline"
                  size="lg"
                  to="/"
                />
              </div>
            </UContainer>
          </div>
          <UPageError
            v-else
            :error="error"
          />
        </UPage>
      </UContainer>
    </UMain>

    <FooterComponent />

    <UNotifications />
  </div>
</template>
