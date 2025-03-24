<template>
  <div class="centered-container">
    <slot />
  </div>
</template>

<style>
.centered-container {
  display: grid;
  place-items: center;
}

.centered-container > p > img {
  background-color: transparent !important;
}
</style>
