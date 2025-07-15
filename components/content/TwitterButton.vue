<template>
  <UButton
    icon="i-lucide-rocket"
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
