<template>
  <SiteLink
    :rel="isExternalLink ? 'noopener noreferrer' : ''"
    :href="href"
    :target="isExternalLink ? '_blank' : target"
    class="relative"
    :class="{ 'mr-2': isExternalLink }"
  >
    <slot />
    <UIcon
      v-if="isExternalLink"
      name="i-heroicons-arrow-up-right-20-solid"
      class="absolute -right-2.5 top-0.5 h-3 w-3 text-xs font-light"
    />
  </SiteLink>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

const props = defineProps({
  href: {
    type: String,
    default: '',
  },
  target: {
    type: String as PropType<'_blank' | '_parent' | '_self' | '_top' | (string & {}) | null | undefined>,
    default: undefined,
    required: false,
  },
});

const isExternalLink = computed(() => {
  return (props.href.startsWith('http') || props.href.startsWith('//')) && !props.href.includes('.zksync.io');
});
</script>
