---
title: Cross Chain Tutorial on Local Nodes Part 1
---


## Prerequisites

- You must have [Docker](https://www.docker.com/products/docker-desktop/) installed.
- A [Node.js](https://nodejs.org/en/download) installation running at minimum Node.js version `18`.

:display-partial{path="/tutorials/cross-chain-governance/_partials/_intro"}

### Starting a Local Node

Open Docker Desktop so the Docker daemon is running in the background,
and use `zksync-cli` to start a local node.

First, configure the CLI to use a dockerized node:

```bash
npx zksync-cli dev config 
```

Use the arrow key to select `Dockerized node` in the prompt.
To run a local block explorer, use the arrow keys and space bar to select the `Block Explorer` option in the prompt.
Finally, press the `Enter` key to confirm the configuration.

Once configured, start the local dockerized node.

```bash
npx zksync-cli dev start
```

### Deploy L1 Governance Contract

Create the file `L1-Governance/.env` and copy/paste the code below.

  ```txt [L1-Governance/.env]
  :code-import{filePath="cross-chain-governance/L1-governance/localenv.example"}
  ```

:display-partial{path="/tutorials/cross-chain-governance/_partials/_deploy"}
