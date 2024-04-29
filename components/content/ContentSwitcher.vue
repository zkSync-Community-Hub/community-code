<script setup lang="ts">
defineProps<{
  items: ContentSwitcherItem[];
}>();
const selectedIndex = ref(0);

function onTabChange(index: number) {
  selectedIndex.value = index;
}
const route = useRoute();
const basePath = computed(() => {
  const path = route.path.split('/');
  path.pop();
  return path.join('/');
});
</script>

<template>
  <div>
    <UTabs
      :items="items"
      :ui="{ list: { width: 'w-auto' } }"
      @change="onTabChange"
    />
    <div
      v-for="(item, index) in items"
      v-show="selectedIndex === index"
      :key="item.partial"
    >
      <ContentQuery
        v-slot="dataQuery"
        :path="`${basePath}/${item.partial}`"
        find="one"
        :where="{ _partial: true }"
      >
        <ContentRenderer :value="dataQuery.data" />
      </ContentQuery>
    </div>
    <UDivider />
  </div>
</template>
