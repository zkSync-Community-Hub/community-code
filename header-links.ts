export const headerLinks = () => {
  const config = useRuntimeConfig();
  const route = useRoute();

  const activeApp = config.public.app;
  const isDocsApp = activeApp === 'docs';
  const isCodeApp = activeApp === 'code';

  return [
    {
      label: 'ZKsync Network',
      to: isDocsApp ? '/zksync-network' : `${config.public.urls.docs}/zksync-network`,
      active: route.path.startsWith('/zksync-network'),
    },
    {
      label: 'ZKsync Stack',
      to: isDocsApp ? '/zk-stack' : `${config.public.urls.docs}/zk-stack`,
      active: route.path.startsWith('/zk-stack'),
    },
    {
      label: 'ZKsync Protocol',
      to: isDocsApp ? '/zksync-protocol' : `${config.public.urls.docs}/zksync-protocol`,
      active: route.path.startsWith('/zksync-protocol'),
    },
    {
      label: 'Community Code',
      to: isCodeApp ? '/' : `${config.public.urls.code}`,
      active: isCodeApp,
    },
  ];
};
