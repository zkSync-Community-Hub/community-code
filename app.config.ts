export default defineAppConfig({
  ui: {
    variables: {
      light: {
        background: '255 252 255',
        // foreground: '147 68 68',
      },
      dark: {
        background: '17 20 43',
        // foreground: 'var(--color-gray-200)',
      },
      // header: {
      //   height: '1rem',
      // },
    },
    primary: 'zkPurple',
    gray: 'zkSlate',
    footer: {
      bottom: {
        left: 'text-sm text-gray-500 dark:text-gray-400',
        wrapper: 'border-t border-gray-200 dark:border-gray-800',
      },
    },
    content: {
      prose: {
        code: {
          icon: {
            go: 'vscode-icons:file-type-go',
            vyper: 'devicon:vyper',
            sol: 'vscode-icons:file-type-solidity',
          },
        },
      },
    },
  },
  seo: {
    siteName: 'zkSync Community Cookbook',
  },
  header: {
    logo: {
      alt: '',
      light: '/logos/zksync_logo_black.svg',
      dark: '/logos/zksync_logo.svg',
    },
    search: false,
    colorMode: true,
    links: [
      {
        icon: 'i-simple-icons-github',
        to: 'https://github.com/matter-labs/zksync-docs',
        target: '_blank',
        'aria-label': 'zkSync Docs on GitHub',
        title: 'zkSync Docs on GitHub',
      },
    ],
  },
  footer: {
    credits: 'Made with ❤️ by Matter Labs & Community',
    colorMode: false,
    links: [
      {
        icon: 'i-zksync-matterlabs-logo',
        to: 'https://matter-labs.io',
        target: '_blank',
        'aria-label': 'MatterLabs Website',
      },
      {
        icon: 'i-simple-icons-x',
        to: 'https://x.com/zksync',
        target: '_blank',
        'aria-label': 'zkSync on X',
      },
      {
        icon: 'i-simple-icons-github',
        to: 'https://github.com/matter-labs',
        target: '_blank',
        'aria-label': 'zkSync on GitHub',
      },
      {
        icon: 'i-simple-icons-discord',
        to: 'https://join.zksync.dev/',
        target: '_blank',
        'aria-label': 'zkSync on Discord',
      },
    ],
  },
  toc: {
    title: 'Table of Contents',
    bottom: {
      title: '',
      edit: 'https://github.com/matter-labs/zksync-docs/edit/staging/content',
      feedback: 'https://github.com/matter-labs/zksync-docs/issues/new?labels=documentation',
      links: [],
    },
  },
});
