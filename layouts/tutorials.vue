<script setup lang="ts">
const route = useRoute();

const { data: info } = await useAsyncData(`${route.path}-info`, () =>
  queryContent(`/tutorials/${route.params.slug[0]}/_info`).findOne()
);
const { data: navigation } = await useAsyncData(`${route.path}-sidenav`, () => {
  const query = queryContent().where({
    _path: { $contains: route.path },
    _extension: 'md',
    _partial: false,
  });

  return fetchContentNavigation(query);
});

const links = computed(() => {
  const links = navigation.value[0].children[0].children.map((item) => ({
    label: item.title,
    to: item._path,
  }));
  return [
    {
      label: 'Tutorials',
      icon: 'i-heroicons-arrow-left-circle',
      to: '/tutorials',
    },
    {
      label: info.value?.title || 'Guide',
      collapsible: false,
      children: links,
    },
  ];
});
</script>

<template>
  <UContainer>
    <UPage>
      <template #left>
        <UAside>
          <UDashboardSidebarLinks :links="links" />
        </UAside>
      </template>

      <slot />
    </UPage>
  </UContainer>
</template>
