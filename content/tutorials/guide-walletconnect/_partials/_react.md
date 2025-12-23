---
title: Reown React
---

## Installation

:test-action{actionId="initialize-project"}
:test-action{actionId="wait-for-init"}
:test-action{actionId="install-deps"}

::code-group

```bash [npm]
npm install @reown/appkit @reown/appkit-adapter-wagmi wagmi viem @tanstack/react-query
```

```bash [yarn]
yarn add @reown/appkit @reown/appkit-adapter-wagmi wagmi viem @tanstack/react-query
```

```bash [pnpm]
pnpm add @reown/appkit @reown/appkit-adapter-wagmi wagmi viem @tanstack/react-query
```

```bash [bun]
bun add @reown/appkit @reown/appkit-adapter-wagmi wagmi viem @tanstack/react-query
```

::

You can find more details about the installation in the [Reown documentation](https://docs.reown.com/appkit/react/core/installation).

## Implementation

You can find an example implementation below for a React app:

:test-action{actionId="wait-for-install"}
:test-action{actionId="app-file"}

```ts [src/App.tsx]
:code-import{filePath="walletconnect/react/src/App.tsx"}
```
