<template>
  <button
    class="tweet-btn"
    @click="openDraft"
  >
    <slot>Share on&nbsp;X</slot>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{ text: string }>();

function openDraft() {
  const url = `https://x.com/intent/tweet?text=${encodeURIComponent(props.text)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}
</script>

<style scoped>
.tweet-btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 600;
  background: #1d9bf0;
  color: #fff;
}
.tweet-btn:hover {
  background: #1a8cd8;
}
</style>
