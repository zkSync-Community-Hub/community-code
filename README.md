# Community Code

Welcome to the zkSync Community Code repository. This project serves as the community hub for zkSync, providing comprehensive
documentation for developers written by developers.
Whether you're a beginner looking to get started with zkSync or an experienced developer
seeking advanced guides, you'll find the resources you need here.

Testing a forked project PR.

## Tools used

- [Vue](https://vuejs.org/)
- [Nuxt](https://nuxt.com/)
- [Nuxt Content](https://content.nuxt.com/)
- [Nuxt UI & Nuxt UI Pro](https://ui.nuxt.com/)
- [Tailwind](https://tailwindcss.com/)
- [Bun](https://bun.sh/)

## Local Setup

This project uses bun to run, follow the [bun installation instructions](https://bun.sh/docs/installation). Once bun is
installed, run the following command to install all project dependencies:

```shell
bun install
```

## Development

To run the project locally at `http://localhost:3000`

```shell
bun run dev -o
```

## Local Preview

To locally preview the production build, first run `bun run generate` to build the project, then run the following:

```shell
bun run preview
```

## Lint & Formatting

This project provides lint commands to check the project.

### Markdown Linting

Markdown files are found in the `/content` directory. The following lint commands will run within that directory:

```shell
bun run lint:spelling
bun run lint:markdown
```

### Linting

The following commands are available to run linting on the project:

```shell
bun run lint:prettier
bun run lint:eslint
```
