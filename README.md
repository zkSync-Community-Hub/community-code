# Community Code

[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE-MIT)
[![License: Apache 2.0](https://img.shields.io/badge/license-Apache%202.0-orange)](LICENSE-APACHE)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](https://www.contributor-covenant.org/)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-orange)](CONTRIBUTING.md)
[![X (formerly Twitter) Follow](https://badgen.net/badge/twitter/@zksyncDevs/1DA1F2?icon&label)](https://x.com/zksyncDevs)

Welcome to the ZKsync Community Code repository. This project serves as the community hub for ZKsync, providing comprehensive
documentation for developers written by developers.
Whether you're a beginner looking to get started with ZKsync or an experienced developer
seeking advanced guides, you'll find the resources you need here.

## 🚀 Quick Start

1. **Install Bun:** Follow the [installation instructions](https://bun.sh/docs/installation).
2. **Install Dependencies:**

   ```sh
   bun install
   ```

3. **Run Locally:** Start the development server at `http://localhost:3000`.

   ```sh
   bun run dev
   ```

## 🛠️ Built With

- [Vue](https://vuejs.org/)
- [Nuxt](https://nuxt.com/)
- [Nuxt Content](https://content.nuxt.com/)
- [Nuxt UI & Nuxt UI Pro](https://ui.nuxt.com/)
- [Tailwind](https://tailwindcss.com/)
- [Bun](https://bun.sh/)

## Local Preview 👀

To locally preview the production build, first run `bun run build` to build the project, then run the following:

```shell
bun run preview
```

## Lint & Formatting ✨

This project provides lint commands to check the project.

### Run CI Checks ✔️

This command will run all of the lint commands together.

```shell
bun run ci:check
```

### Markdown Linting 📝

Markdown files are found in the `/content` directory. The following lint commands will run within that directory:

```shell
bun run lint:spelling
bun run lint:markdown
```

### Linting 🧹

The following commands are available to run code linting on the project:

```shell
bun run lint:prettier
bun run lint:eslint
```

## 📜 Conventional Commits

We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) specification.
Make sure your commit messages adhere to these guidelines.

For documentation changes, we recommend using the "docs:" tag. For example:

```sh
git commit -m "docs: fix spelling error"
```

## 🤝 Contributions

We welcome contributions from the community!
Check out our [Contributing guide](CONTRIBUTING.md) to learn how to add your own guides to Code Community.

## 👪 Join the community

If you haven't already, join our community!
We have [GitHub Discussions](https://github.com/ZKsync-Community-Hub/zksync-developers/discussions)
for developers to ask questions and share their work.
We also have a [Discord server](https://join.zksync.dev/) for real-time conversations with the team and community.

Be sure to [follow us on Twitter](https://x.com/ZKsyncDevs) to keep up to date with announcements from the ZKsync dev team.
