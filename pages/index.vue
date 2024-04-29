<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => queryContent('/').findOne());

const { data: guides } = await useAsyncData('tutorials', () =>
  queryContent('tutorials').where({ _extension: 'yml' }).find()
);

useSeoMeta({
  titleTemplate: '',
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description,
});
</script>

<template>
  <div>
    <ULandingSection
      title="Community Contributed Guides for zkSync"
      :links="page.features.links"
    >
      <UPageGrid>
        <SiteLink
          v-for="(guide, index) of guides"
          :key="index"
          :to="`/tutorials/${guide._dir}`"
          class="rounded-lg border-2 border-transparent transition-colors duration-200 ease-in-out hover:border-zkPurple-300"
        >
          <UCard>
            <span class="mb-4 inline-block text-lg font-semibold">
              {{ guide.title }}
            </span>

            <p>{{ guide.summary }}</p>

            <div class="my-4 flex w-auto items-center justify-normal">
              <UAvatar
                size="sm"
                :src="guide.author.avatar"
                :alt="guide.author.name"
              />
              <span class="ml-3">{{ guide.author.name }}</span>
            </div>

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
