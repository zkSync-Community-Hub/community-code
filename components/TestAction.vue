<template>
  <span
    :id="actionId"
    data-test-action
  />
</template>

<script setup lang="ts">
defineProps<{
  actionId: string;
}>();
</script>
