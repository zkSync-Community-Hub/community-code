export default defineAppConfig({
  seo: {
    siteName: 'ZKsync Community Code',
  },
  header: {
    links: [
      {
        icon: 'i-simple-icons-github',
        to: 'https://github.com/zkSync-Community-Hub/community-code',
        target: '_blank',
        'aria-label': 'Community Code on GitHub',
        title: 'Community Code on GitHub',
      },
    ],
  },
  toc: {
    bottom: {
      edit: 'https://github.com/zkSync-Community-Hub/community-code/edit/staging/content',
      feedback: 'https://github.com/zkSync-Community-Hub/community-code/issues/new',
      links: [],
    },
  },
});
