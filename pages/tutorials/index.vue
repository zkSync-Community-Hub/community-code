<script setup lang="ts">
const { data: guides } = await useAsyncData('tutorials', () =>
  queryContent('tutorials').where({ _extension: 'yml' }).find()
);
</script>

<template>
  <UContainer>
    <UPage>
      <UPageBody prose>
        <UPageHeader
          title="Community Guides"
          description="Explore all the community contributed guides for zkSync"
          icon="i-zksync-logo"
        />

        <ULandingCard
          v-for="(guide, index) of guides"
          :key="index"
          :title="guide.title"
          :to="`/tutorials/${guide._dir}`"
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
