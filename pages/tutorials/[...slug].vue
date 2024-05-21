<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo';
import dayjs from 'dayjs';
import type { NavItem } from '@nuxt/content/types';

definePageMeta({
  layout: 'docs',
});

const route = useRoute();
const nav = inject<Ref<NavItem[]>>('navigation');

const metadata = computed(() => {
  return nav?.value
    .find((item) => item._path === '/tutorials')
    ?.children?.find((item) => item._path === `/tutorials/${route.params.slug[0]}`);
});

const isIndex = ref(route.params.slug.length < 2);

const { data: page } = await useAsyncData(route.path, () => queryContent(route.path).findOne());

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true });
}

const { data: surroundLinks } = await useAsyncData(`${route.path}-surround`, () =>
  queryContent()
    .where({
      _extension: 'md',
      navigation: { $ne: false },
      _path: { $contains: route.params.slug[0], $ne: '_info' },
    })
    .only(['title', '_path', '_type'])
    .findSurround(withoutTrailingSlash(route.path + '/'))
);

const surround = computed(() => {
  return surroundLinks.value ?? [];
});

const lastUpdated = computed(() => {
  const date = metadata.value?.updated || metadata.value?.created;
  return date ? dayjs(date, 'YYYY-MM-DD').format('MMM DD, YYYY') : '';
});

const { seo } = useAppConfig();
useSeoMeta({
  title: metadata.value?.title,
  ogTitle: `${metadata.value?.title} - ${seo?.siteName}`,
  description: metadata.value?.summary,
  ogDescription: metadata.value?.summary,
  twitterDescription: metadata.value?.summary,
  ogType: 'article',
  author: metadata.value?.authors
    .map((author: { name: string; url: string; avatar: string }) => author.name)
    .join(', '),
});

const links = [
  {
    label: 'Tutorials',
    icon: 'i-heroicons-arrow-left-circle',
    to: '/tutorials',
  },
  {
    label: metadata.value?.title || 'Guide',
    collapsible: false,
    children: metadata.value?.children?.map((item) => ({
      label: item.title,
      to: item._path,
    })),
  },
];

const communityLinks = [
  {
    icon: 'i-heroicons-academic-cap-solid',
    label: 'Contribute',
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

      <UPage v-if="isIndex && metadata">
        <UPageHeader
          :title="page?.title"
          :description="page?.description"
        />
        <div class="grid grid-cols-8 gap-4 py-5">
          <div class="col-span-5">
            <AuthorsList
              class="mb-4"
              :authors="metadata.authors"
              :with-links="true"
            />
            <p>
              {{ metadata.description }}
            </p>
            <h3 class="mt-4 text-xl font-semibold">What you'll learn:</h3>
            <ul
              role="list"
              class="list-inside list-disc"
            >
              <li
                v-for="item in metadata.what_you_will_learn"
                :key="item"
              >
                {{ item }}
              </li>
            </ul>
          </div>

          <div class="col-span-3">
            <UButton
              icon="i-simple-icons-github"
              size="sm"
              color="white"
              variant="solid"
              label="GitHub"
              target="_blank"
              :to="metadata.github_repo"
              :trailing="false"
            />
            <h3 class="my-2 text-xl font-semibold">Last Updated:</h3>
            <p>{{ lastUpdated }}</p>
            <h3 class="my-2 text-xl font-semibold">Tools:</h3>
            <ul
              role="list"
              class="list-inside list-disc"
            >
              <li
                v-for="item in metadata.tools"
                :key="item"
              >
                {{ item }}
              </li>
            </ul>
            <h3 class="my-2 text-xl font-semibold">Tags:</h3>
            <div class="flex flex-wrap">
              <UBadge
                v-for="tag in metadata.tags"
                :key="tag"
                :label="tag"
                color="blue"
                size="sm"
                variant="subtle"
                class="mb-2 mr-2"
              />
            </div>
          </div>
        </div>
        <UDivider icon="i-zksync-logo" />
      </UPage>

      <UPage>
        <UPageHeader
          v-if="!isIndex"
          :title="page?.title"
          :description="page?.description"
        />

        <UPageBody prose>
          <ContentRenderer
            v-if="page?.body"
            :value="page"
          />

          <hr
            v-if="surround.length > 0"
            class="mb-4"
          />

          <UContentSurround
            :surround
            :ui="{
              wrapper: 'grid gap-8 sm:grid-cols-2',
              icon: {
                prev: 'i-heroicons-arrow-left-20-solid',
                next: 'i-heroicons-arrow-right-20-solid',
              },
              link: {
                wrapper:
                  'block px-3 py-4 border not-prose rounded-lg border-gray-200 dark:border-gray-800 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 group flex gap-4 items-center even:flex-row-reverse',
                icon: {
                  wrapper:
                    'mb-0 inline-flex items-center rounded-full p-1.5 bg-gray-100 dark:bg-gray-800 group-hover:bg-primary/10 ring-1 ring-gray-300 dark:ring-gray-700 group-hover:ring-primary/50',
                },
                title: 'font-medium text-gray-900 dark:text-white text-[15px] mb-0',
                description: 'display-none',
              },
            }"
          />
        </UPageBody>

        <template
          v-if="page?.toc !== false"
          #right
        >
          <UContentToc
            title="Table of contents"
            :links="page?.body?.toc?.links"
          />
        </template>
      </UPage>
    </UPage>
  </UContainer>
</template>
