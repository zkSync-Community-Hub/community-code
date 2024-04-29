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
        <SiteLink
          v-for="(guide, index) of guides"
          :key="index"
          :to="`/tutorials/${guide._dir}`"
          class="grid grid-cols-2 items-center gap-4 border-b border-gray-100 p-4 hover:bg-zkSlate-100 dark:border-gray-800 dark:hover:bg-zkSlate-900"
        >
          <div>
            {{ guide.title }}
          </div>
          <div class="text-right">
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
        </SiteLink>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
