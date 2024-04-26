<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo';
import dayjs from 'dayjs';

definePageMeta({
  layout: 'tutorials',
});

const route = useRoute();
const { seo } = useAppConfig();

const isIndex = ref(route.params.slug.length < 2);
const { data: info } = await useAsyncData(`${route.path}-info`, () =>
  queryContent(`/tutorials/${route.params.slug[0]}/_info`).findOne()
);

const { data: page } = await useAsyncData(route.path, () => queryContent(route.path).findOne());
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true });
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () =>
  queryContent()
    .where({
      _extension: 'md',
      navigation: { $ne: false },
      _path: { $contains: route.params.slug[0], $ne: '_info' },
    })
    .only(['title', '_path', '_type'])
    .findSurround(withoutTrailingSlash(route.path + '/'))
);

const surroundLinks = computed(() => {
  return surround.value.length > 0 ? surround.value.filter((item) => item?._type !== 'yaml') : [];
});

const lastUpdated = computed(() => {
  const date = info.value.updated || info.value.created;
  return date ? dayjs(date, 'YYYY-MM-DD').format('MMM DD, YYYY') : '';
});

useSeoMeta({
  title: info.value.title,
  ogTitle: `${info.value.title} - ${seo?.siteName}`,
  description: info.value.summary,
  ogDescription: info.value.summary,
  ogType: 'article',
  author: info.value.author.name,
});

// defineOgImage({
//   component: 'Docs',
//   title: page.value.title,
//   description: page.value.description
// })

// const headline = computed(() => findPageHeadline(page.value))
</script>

<template>
  <div>
    <UPage v-if="isIndex && info">
      <UPageHeader
        :title="page.title"
        :description="page.description"
      />
      <div class="grid grid-cols-8 gap-4 py-5">
        <div class="col-span-5">
          <p>
            {{ info.description }}
          </p>
          <h3 class="mt-4 text-xl font-semibold">What you'll learn:</h3>
          <ul
            role="list"
            class="list-inside list-disc"
          >
            <li
              v-for="item in info.what_you_will_learn"
              :key="item"
            >
              {{ item }}
            </li>
          </ul>
        </div>

        <div class="col-span-3">
          <div>
            <a
              :href="info.author.url"
              target="_blank"
              class="mb-4 flex w-auto items-center justify-normal hover:underline"
            >
              <UAvatar
                size="md"
                :src="info.author.avatar"
                :alt="info.author.name"
              />
              <span class="ml-3">{{ info.author.name }}</span>
            </a>
          </div>
          <UButton
            icon="i-simple-icons-github"
            size="sm"
            color="white"
            variant="solid"
            label="GitHub"
            target="_blank"
            :to="info.github_repo"
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
              v-for="item in info.tools"
              :key="item"
            >
              {{ item }}
            </li>
          </ul>
          <h3 class="my-2 text-xl font-semibold">Tags:</h3>
          <div class="flex flex-wrap">
            <UBadge
              v-for="tag in info.tags"
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
        :title="page.title"
        :description="page.description"
      />

      <UPageBody prose>
        <ContentRenderer
          v-if="page.body"
          :value="page"
        />

        <hr v-if="surroundLinks.length > 0" />

        <UContentSurround :surround="surroundLinks" />
      </UPageBody>

      <template
        v-if="page.toc !== false"
        #right
      >
        <UContentToc
          title="Table of contents"
          :links="page.body?.toc?.links"
        />
      </template>
    </UPage>
  </div>
</template>
