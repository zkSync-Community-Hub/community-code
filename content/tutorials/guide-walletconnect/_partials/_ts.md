---
title: Reown TypeScript
---

## Installation

::code-group

```bash [npm]
npm install @reown/appkit @reown/appkit-adapter-wagmi wagmi viem
```

```bash [yarn]
yarn add @reown/appkit @reown/appkit-adapter-wagmi wagmi viem
```

```bash [pnpm]
pnpm add @reown/appkit @reown/appkit-adapter-wagmi wagmi viem
```

```bash [bun]
bun add @reown/appkit @reown/appkit-adapter-wagmi wagmi viem
```

::

You can find more details about the installation in the [Reown documentation](https://docs.reown.com/appkit/javascript/core/installation).

## Implementation

You can find an example implementation below for a vanilla TypeScript app:

```ts [src/reown.ts]
:code-import{filePath="walletconnect/ts/src/reown.ts"}
```

```ts [src/main.ts]
:code-import{filePath="walletconnect/ts/src/main.ts"}
```
