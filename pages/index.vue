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
        <SiteLink
          v-for="(guide, index) of guides"
          :key="index"
          :to="guide._path"
          class="hover:border-zkPurple-300 rounded-lg border-2 border-transparent transition-colors duration-200 ease-in-out"
        >
          <UCard>
            <span class="mb-4 inline-block text-lg font-semibold">
              {{ guide.title }}
            </span>

            <p>{{ guide.summary }}</p>

            <AuthorsList
              class="my-4"
              :authors="guide.authors"
            />

            <div class="mt-4">
              <UBadge
                v-for="tag in guide.tags"
                :key="tag"
                :label="tag"
                color="blue"
                size="sm"
                variant="subtle"
                class="mb-2 mr-2"
              />
            </div>
          </UCard>
        </SiteLink>
      </UPageGrid>
    </ULandingSection>
  </div>
</template>
