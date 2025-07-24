<template>
  <UButton
    icon="i-heroicons-rocket-launch"
    size="md"
    variant="outline"
    :to="url"
    target="_blank"
  >
    Share on X
  </UButton>
</template>

<script setup lang="ts">
const props = defineProps<{ text: string }>();

const url = `https://x.com/intent/tweet?text=${encodeURIComponent(props.text)}`;
</script>
