<script setup lang="ts">
import type { NavItem } from '@nuxt/content/types';

const navigation = inject<Ref<NavItem[]>>('navigation', ref([]));

interface Guide {
  title: string;
  description: string;
  _path: string;
  tags: string[];
  authors: Array<{ name: string; url: string; avatar: string }>;
}

const guides = computed<Guide[]>(() => {
  const tutorialPath = navigation.value.find((item) => item._path === '/tutorials');
  return tutorialPath?.children || [];
});

const allTags = computed(() => {
  return guides.value.reduce<string[]>((acc, guide) => {
    return acc.concat(guide.tags || []);
  }, []);
});

const uniqueTags = computed(() => [...new Set(allTags.value)]);

const activeTag = ref(uniqueTags.value[0] || '');
const isExpanded = ref(false);
const defaultCount = 6;

const visibleTags = computed(() => {
  return isExpanded.value ? uniqueTags.value : uniqueTags.value.slice(0, defaultCount);
});

const showToggleButton = computed(() => uniqueTags.value.length > defaultCount);

const filteredGuides = computed(() => {
  if (!activeTag.value) return guides.value;
  return guides.value.filter((guide) => guide.tags?.includes(activeTag.value));
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

        <div class="mb-4 mt-4 flex flex-wrap gap-1">
          <UBadge
            v-for="tag in visibleTags"
            :key="tag"
            :label="tag"
            color="blue"
            size="sm"
            :variant="activeTag === tag ? 'solid' : 'subtle'"
            class="cursor-pointer p-2"
            @click="activeTag = tag === activeTag ? '' : tag"
          />

          <UButton
            v-if="showToggleButton"
            size="xs"
            variant="ghost"
            :ui="{ rounded: 'rounded' }"
            @click="isExpanded = !isExpanded"
          >
            {{ isExpanded ? 'Show Less' : 'Show More' }}
          </UButton>
        </div>

        <ULandingCard
          v-for="guide in filteredGuides"
          :key="guide._path"
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
