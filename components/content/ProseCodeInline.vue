<template>
  <code class="inline-code border-0 text-base font-normal"><slot /></code>
</template>

<style>
.prose :where(a code):not(:where([class~='not-prose'], [class~='not-prose'] *)) {
  color: var(--tw-prose-links);
}

.prose :where(a:hover code):not(:where([class~='not-prose'], [class~='not-prose'] *)) {
  text-decoration: underline;
}

.prose :where(h2 code, h3 code, h4 code, h5 code, h6 code) {
  font-size: inherit;
  line-height: inherit;
}
</style>
