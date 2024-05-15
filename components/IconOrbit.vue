<template>
  <div class="orbit">
    <ul class="orbit-wrap">
      <li class="orbit-center" />

      <li>
        <ul class="ring-0">
          <li class="black-hole bg-white dark:bg-black" />
          <li>
            <img
              src="/logos/alchemy.svg"
              class="orbit-icon"
            />
          </li>
          <li>
            <img
              src="/logos/atlas_zk_logo.svg"
              class="orbit-icon"
            />
          </li>
          <li>
            <img
              src="/logos/remix_logo.svg"
              class="orbit-icon"
            />
          </li>
          <li>
            <img
              src="/logos/web3js.svg"
              class="orbit-icon"
            />
          </li>
        </ul>
      </li>

      <li>
        <ul class="ring-1">
          <li class="black-hole bg-white dark:bg-black" />
          <li>
            <img
              src="/logos/hardhat.svg"
              class="orbit-icon"
            />
          </li>
          <li>
            <img
              src="/logos/Vyper.svg"
              class="orbit-icon"
            />
          </li>
          <li>
            <img
              src="/logos/ethereum.svg"
              class="orbit-icon"
            />
          </li>
        </ul>
      </li>
      <li>
        <ul class="ring-2">
          <li class="black-hole bg-white dark:bg-black" />
          <li>
            <img
              src="/logos/alchemy.svg"
              class="orbit-icon"
            />
          </li>
          <li>
            <img
              src="/logos/atlas_zk_logo.svg"
              class="orbit-icon"
            />
          </li>
          <li>
            <img
              src="/logos/ethereum.svg"
              class="orbit-icon"
            />
          </li>
          <li>
            <img
              src="/logos/web3js.svg"
              class="orbit-icon"
            />
          </li>
          <li>
            <img
              src="/logos/Solidity_logo.svg"
              class="orbit-icon"
            />
          </li>
          <li>
            <img
              src="/logos/atlas_zk_logo.svg"
              class="orbit-icon"
            />
          </li>
          <li>
            <img
              src="/logos/remix_logo.svg"
              class="orbit-icon"
            />
          </li>
          <li>
            <img
              src="/logos/web3js.svg"
              class="orbit-icon"
            />
          </li>
        </ul>
      </li>
      <li>
        <ul class="ring-3">
          <li class="black-hole bg-white dark:bg-black" />
          <li>
            <img
              src="/logos/remix_logo.svg"
              class="orbit-icon"
            />
          </li>
          <li>
            <img
              src="/logos/viem.png"
              class="orbit-icon"
            />
          </li>
          <li>
            <img
              src="/logos/ethereum.svg"
              class="orbit-icon"
            />
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
$orbitItemSize: 1.6em;
$map: (
  ring-0: 4,
  ring-1: 3,
  ring-2: 8,
  ring-3: 3,
);
$lastRing: 3;

* {
  box-sizing: border-box;
}

html {
  font-size: 100%;
}

.orbit {
  background: transparent;
  float: left;
  width: 100%;
  min-width: 90vw;
  min-height: 100vh;
}

.orbit-icon {
  width: $orbitItemSize;
  height: $orbitItemSize;
  line-height: $orbitItemSize;
  font-size: 1.2em;
  border-radius: 50%;
  background: #ccc;
  color: #fff;
  text-align: center;
  display: block;
}

$orbit-ring-left: 50%;
$orbit-ring-top: 18%;

.orbit-wrap {
  height: 40em;
  list-style: none;
  font-size: 1.3em;

  > li {
    position: absolute;
    left: $orbit-ring-left;
    top: $orbit-ring-top;
    transform: translate(-50%, -50%);
  }
}

ul[class^='ring'] {
  @extend %ring;
  transition: all 300ms ease-in-out;
  box-shadow: none !important;

  li:not(.black-hole) {
    @extend %orbiting-object;
    transition: all 300ms ease-in-out;
  }
}

@mixin orbit-item($numItems, $numRing) {
  @for $s from 1 through $numItems + 1 {
    // Spread items over the ring
    $deg: calc(380deg / $numItems);

    .ring-#{$numRing} > *:nth-of-type(#{$s}) {
      transform: rotate($s * $deg) translate(21em - ($numRing * 4)) rotate(-$s * $deg);
    }
  }
}

.light img {
  background: rgb(215, 241, 251) !important;
}

// Render rings
@for $i from 0 through $lastRing {
  .ring-#{$i} {
    $size: 42em - ($i * 8);
    $randomized: random(15);
    // decrease each ring in size
    width: $size;
    height: $size;
    animation: clockwiseRotate (75s - ($i * $randomized)) linear infinite;

    i,
    img {
      animation: counterClockwiseRotate (75s - ($i * $randomized)) linear infinite;
      width: 60px;
      height: 35px;
      background: rgba(148, 148, 148, 0.826);
    }

    .black-hole {
      transform: none !important;
      position: absolute;
      // background: black;
      width: $size - 0.2em;
      height: $size - 0.2em;
      position: absolute;
      top: 2px;
      left: 2px;
      border-radius: 50%;
      box-sizing: content-box;
    }
  }

  @include orbit-item(map-get($map, ring-#{$i}), $i);
}

%ring {
  // border: solid 1px rgb(125 116 153 / 60%);
  background: linear-gradient(
    to bottom right,
    rgba(184, 39, 252, 0.5) 0%,
    rgba(44, 144, 252, 0.5) 25%,
    rgba(184, 253, 51, 0.5) 50%,
    rgba(254, 200, 55, 0.5) 75%,
    rgba(253, 24, 146, 0.5) 100%
  );
  position: relative;
  padding: 0;
  border-radius: 50%;
  list-style: none;
  box-sizing: content-box;
}

%orbiting-object {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  width: $orbitItemSize;
  height: $orbitItemSize;
  margin: calc(-1 * $orbitItemSize / 2);
}

/*
  center;
*/
.orbit-center {
  z-index: 5;
  font-size: 2em;
  width: 1.8em;
  height: 1.8em;
  line-height: 1.8em;
  text-align: center;
  background: transparent;
  border-radius: 50%;
}
.orbit-center__icon {
  transform: rotateZ(-360deg);
  transition: all 300ms ease-in-out;
}

/*
animations
*/
@keyframes clockwiseRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes counterClockwiseRotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
</style>
