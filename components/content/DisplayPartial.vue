<script setup lang="ts">
defineProps<{
  path: string;
}>();
</script>

<template>
  <ContentQuery
    v-slot="{ data }"
    :path
    find="one"
    :where="{ _partial: true }"
  >
    <ContentRenderer :value="data" />
  </ContentQuery>
</template>
