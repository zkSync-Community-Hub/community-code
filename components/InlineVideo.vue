<template>
  <video
    style="clip-path: inset(2px 2px)"
    width="100%"
    height="100%"
    controls
  >
    <source
      v-if="videoPath"
      :src="videoPath"
      type="video/mp4"
    />
  </video>
</template>

<script setup lang="ts">
defineProps<{
  videoPath: string;
}>();
</script>
