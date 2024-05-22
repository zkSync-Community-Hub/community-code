<script setup lang="ts">
import type { NavItem } from '@nuxt/content/types';

const { data: page } = await useAsyncData('index', () => queryContent('/').findOne());

const navigation = inject<Ref<NavItem[]>>('navigation');

const guides = computed(() => {
  const tutorialPath = navigation?.value.find((item) => item._path === '/tutorials') ?? { children: [] };

  return tutorialPath.children;
});

useSeoMeta({
  titleTemplate: '',
  title: page.value?.title,
});
</script>

<template>
  <div>
    <IconOrbit class="absolute hidden md:block" />
    <ULandingSection
      class="relative"
      title=""
      description="Build Together: Discover Community-Driven Guides and Tutorials for zkSync"
      :links="[
        {
          label: 'Check out all the tutorials',
          icon: 'i-zksync-zksync-logo',
          trailingIcon: 'i-heroicons-arrow-right-20-solid',
          to: '/tutorials',
          size: 'xl',
        },
      ]"
    >
      <template #headline>
        <NuxtImg
          src="/logos/zksync-icon.svg"
          width="240"
          class="invert filter dark:filter-none"
        />
      </template>

      <UPageGrid>
        <ULandingCard
          v-for="(guide, index) of guides"
          :key="index"
          :to="guide._path"
          :title="guide.title"
          :description="guide.summary"
          :ui="{ body: { base: 'justify-between' } }"
        >
          <div class="mt-auto">
            <UBadge
              :label="guide.tags.join(', ')"
              color="blue"
              size="sm"
              variant="subtle"
              class="mb-2 mr-2"
            />
            <AuthorsList :authors="guide.authors" />
          </div>
        </ULandingCard>
      </UPageGrid>
    </ULandingSection>
  </div>
</template>
