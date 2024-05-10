<script setup lang="ts">
const route = useRoute();

if (!route.path) {
  throw new Error('Route path is not defined');
}
console.log('PATH', route);

const { data: info } = await useAsyncData(`${route.path}-info`, () => {
  console.log('ROUTE', route.fullPath);
  return queryContent(`${route.fullPath}/_info`).findOne();
});

const { data: navigation } = await useAsyncData(`${route.path}-sidenav`, () => {
  const query = queryContent().where({
    _path: { $contains: route.path },
    _extension: 'md',
    _partial: false,
  });

  return fetchContentNavigation(query);
});

// const links = computed(() => {
//   const pageLinks = navigation.value;
//   return [
//     {
//       label: 'Tutorials',
//       icon: 'i-heroicons-arrow-left-circle',
//       to: '/tutorials',
//     },
//     {
//       label: info.value?.title || 'Guide',
//       collapsible: false,
//       children: pageLinks[0].children[0].children.map((item) => ({
//         label: item.title,
//         to: item._path,
//       })),
//     },
//   ];
// });
console.log('WHY INFO', info.value);
const links = [
  {
    label: 'Tutorials',
    icon: 'i-heroicons-arrow-left-circle',
    to: '/tutorials',
  },
  {
    label: info.value?.title || 'Guide',
    collapsible: false,
    children: navigation.value[0].children[0].children.map((item) => ({
      label: item.title,
      to: item._path,
    })),
  },
];

const communityLinks = [
  {
    icon: 'i-heroicons-academic-cap-solid',
    label: 'Contribute to Community Code',
    to: 'https://github.com/zkSync-Community-Hub/community-code',
  },
  {
    icon: 'i-heroicons-chat-bubble-oval-left-ellipsis-16-solid',
    label: 'Chat on Discord',
    to: 'https://join.zksync.dev/',
    target: '_blank',
  },
  {
    icon: 'i-heroicons-user-group-20-solid',
    label: 'Developer Forum',
    to: 'https://github.com/zkSync-Community-Hub/zkync-developers/discussions',
    target: '_blank',
  },
];
</script>

<template>
  <UContainer>
    <UPage>
      <template #left>
        <UAside>
          <UDashboardSidebarLinks :links="links" />
          <UDivider class="my-4" />
          <UPageLinks :links="communityLinks" />
        </UAside>
      </template>

      <slot />
    </UPage>
  </UContainer>
</template>
