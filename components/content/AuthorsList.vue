<template>
  <div class="flex w-auto items-center justify-normal">
    <UAvatarGroup
      size="sm"
      :max="2"
    >
      <UAvatar
        v-for="(author, authIndex) in authorAvatars"
        :key="authIndex"
        :src="author.src"
        :alt="author.name"
      />
    </UAvatarGroup>
    <span
      v-if="!withLinks"
      class="ml-3"
    >
      {{ authorNames }}
    </span>
    <span
      v-else
      class="ml-3"
    >
      <a
        v-for="(author, authIndex) in props.authors"
        :key="authIndex"
        :href="author.url"
        target="_blank"
        class="hover:underline"
      >
        {{ author.name }}{{ authIndex < props.authors.length - 1 ? ', ' : '' }}
      </a>
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  authors: {
    type: Array<{ name: string; url: string; avatar: string }>,
    required: true,
    default: () => [],
  },
  withLinks: {
    type: Boolean,
    default: false,
  },
});

const authorNames = computed(() => {
  return props.authors.map((author) => author.name).join(', ');
});

const authorAvatars = computed(() => {
  return props.authors.map((author) => ({ src: author.avatar, name: author.name }));
});
</script>
