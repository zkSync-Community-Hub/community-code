<template>
  <svg
    class="rounded-md shadow-xl ring-1 ring-blue-300 dark:ring-blue-700"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xmlns:svgjs="http://svgjs.dev/svgjs"
    viewBox="0 0 460 400"
    width="460"
    height="400"
    opacity="1"
  >
    <defs>
      <linearGradient
        id="ffflux-gradient"
        gradientTransform="rotate(327, 0.5, 0.5)"
        x1="50%"
        y1="0%"
        x2="50%"
        y2="100%"
      >
        <stop
          stop-color="hsl(39, 93%, 53%)"
          stop-opacity="1"
          offset="0%"
        ></stop>
        <stop
          stop-color="hsl(215, 100%, 46%)"
          stop-opacity="1"
          offset="100%"
        ></stop>
      </linearGradient>
      <filter
        id="ffflux-filter"
        x="-20%"
        y="-20%"
        width="140%"
        height="140%"
        filterUnits="objectBoundingBox"
        primitiveUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.005 0.003"
          numOctaves="2"
          seed="2"
          stitchTiles="stitch"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          result="turbulence"
        ></feTurbulence>
        <feGaussianBlur
          stdDeviation="17 8"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          in="turbulence"
          edgeMode="duplicate"
          result="blur"
        ></feGaussianBlur>
        <feBlend
          mode="color-dodge"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          in="SourceGraphic"
          in2="blur"
          result="blend"
        ></feBlend>
      </filter>
    </defs>
    <rect
      width="460"
      height="400"
      fill="url(#ffflux-gradient)"
      filter="url(#ffflux-filter)"
    ></rect>
  </svg>
</template>

<script setup lang="ts"></script>
