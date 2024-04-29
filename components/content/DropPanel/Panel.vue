<template>
  <ContentSlot :use="$slots.default" />
</template>

<script setup lang="ts">
/**
 * A panel component that can be slotted into a DropPanel.
 *
 * Use the `label` prop to set the tab label on the drop panel.
 *
 * ::panel{label="Tab Label"}
 * Panel Content
 * ::
 */
defineProps<{
  label: string;
}>();
</script>
