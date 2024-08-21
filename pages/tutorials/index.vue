<script setup lang="ts">
import type { NavItem } from '@nuxt/content/types';

const navigation = inject<Ref<NavItem[]>>('navigation');

const guides = computed(() => {
  const tutorialPath = navigation?.value.find((item) => item._path === '/tutorials') ?? { children: [] };

  return tutorialPath.children;
});
</script>

<template>
  <UContainer>
    <UPage>
      <UPageBody prose>
        <UPageHeader
          title="Community Guides"
          description="Explore all the community contributed guides for ZKsync"
          icon="i-zkicon-zksync"
        />

        <ULandingCard
          v-for="(guide, index) of guides"
          :key="index"
          :title="guide.title"
          :to="guide._path"
          class="mb-4"
        >
          <template #description>
            <p>{{ guide.description }}</p>
            <div class="flex justify-between gap-2">
              <AuthorsList
                class="mb-4"
                :authors="guide.authors"
                :with-links="true"
              />
              <div>
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
            </div>
          </template>
        </ULandingCard>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
