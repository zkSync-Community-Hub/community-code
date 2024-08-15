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

<style scoped>
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
  width: 1.6em;
  height: 1.6em;
  line-height: 1.6em;
  font-size: 1.2em;
  border-radius: 50%;
  background: #ccc;
  color: #fff;
  text-align: center;
  display: block;
}

.orbit-wrap {
  height: 40em;
  list-style: none;
  font-size: 1.3em;
}
.orbit-wrap > li {
  position: absolute;
  left: 50%;
  top: 18%;
  transform: translate(-50%, -50%);
}

ul[class^='ring'] {
  transition: all 300ms ease-in-out;
  box-shadow: none !important;
}
ul[class^='ring'] li:not(.black-hole) {
  transition: all 300ms ease-in-out;
}

.light img {
  background: rgb(215, 241, 251) !important;
}

.ring-0 {
  width: 42em;
  height: 42em;
  animation: clockwiseRotate 75s linear infinite;
}
.ring-0 i,
.ring-0 img {
  animation: counterClockwiseRotate 75s linear infinite;
  width: 60px;
  height: 35px;
  background: rgba(148, 148, 148, 0.826);
}
.ring-0 .black-hole {
  transform: none !important;
  position: absolute;
  width: 41.8em;
  height: 41.8em;
  position: absolute;
  top: 2px;
  left: 2px;
  border-radius: 50%;
  box-sizing: content-box;
}

.ring-0 > *:nth-of-type(1) {
  transform: rotate(95deg) translate(21em) rotate(-95deg);
}

.ring-0 > *:nth-of-type(2) {
  transform: rotate(190deg) translate(21em) rotate(-190deg);
}

.ring-0 > *:nth-of-type(3) {
  transform: rotate(285deg) translate(21em) rotate(-285deg);
}

.ring-0 > *:nth-of-type(4) {
  transform: rotate(380deg) translate(21em) rotate(-380deg);
}

.ring-0 > *:nth-of-type(5) {
  transform: rotate(475deg) translate(21em) rotate(-475deg);
}

.ring-1 {
  width: 34em;
  height: 34em;
  animation: clockwiseRotate 63s linear infinite;
}
.ring-1 i,
.ring-1 img {
  animation: counterClockwiseRotate 63s linear infinite;
  width: 60px;
  height: 35px;
  background: rgba(148, 148, 148, 0.826);
}
.ring-1 .black-hole {
  transform: none !important;
  position: absolute;
  width: 33.8em;
  height: 33.8em;
  position: absolute;
  top: 2px;
  left: 2px;
  border-radius: 50%;
  box-sizing: content-box;
}

.ring-1 > *:nth-of-type(1) {
  transform: rotate(126.6666666667deg) translate(17em) rotate(-126.6666666667deg);
}

.ring-1 > *:nth-of-type(2) {
  transform: rotate(253.3333333333deg) translate(17em) rotate(-253.3333333333deg);
}

.ring-1 > *:nth-of-type(3) {
  transform: rotate(380deg) translate(17em) rotate(-380deg);
}

.ring-1 > *:nth-of-type(4) {
  transform: rotate(506.6666666667deg) translate(17em) rotate(-506.6666666667deg);
}

.ring-2 {
  width: 26em;
  height: 26em;
  animation: clockwiseRotate 63s linear infinite;
}
.ring-2 i,
.ring-2 img {
  animation: counterClockwiseRotate 63s linear infinite;
  width: 60px;
  height: 35px;
  background: rgba(148, 148, 148, 0.826);
}
.ring-2 .black-hole {
  transform: none !important;
  position: absolute;
  width: 25.8em;
  height: 25.8em;
  position: absolute;
  top: 2px;
  left: 2px;
  border-radius: 50%;
  box-sizing: content-box;
}

.ring-2 > *:nth-of-type(1) {
  transform: rotate(47.5deg) translate(13em) rotate(-47.5deg);
}

.ring-2 > *:nth-of-type(2) {
  transform: rotate(95deg) translate(13em) rotate(-95deg);
}

.ring-2 > *:nth-of-type(3) {
  transform: rotate(142.5deg) translate(13em) rotate(-142.5deg);
}

.ring-2 > *:nth-of-type(4) {
  transform: rotate(190deg) translate(13em) rotate(-190deg);
}

.ring-2 > *:nth-of-type(5) {
  transform: rotate(237.5deg) translate(13em) rotate(-237.5deg);
}

.ring-2 > *:nth-of-type(6) {
  transform: rotate(285deg) translate(13em) rotate(-285deg);
}

.ring-2 > *:nth-of-type(7) {
  transform: rotate(332.5deg) translate(13em) rotate(-332.5deg);
}

.ring-2 > *:nth-of-type(8) {
  transform: rotate(380deg) translate(13em) rotate(-380deg);
}

.ring-2 > *:nth-of-type(9) {
  transform: rotate(427.5deg) translate(13em) rotate(-427.5deg);
}

.ring-3 {
  width: 18em;
  height: 18em;
  animation: clockwiseRotate 60s linear infinite;
}
.ring-3 i,
.ring-3 img {
  animation: counterClockwiseRotate 60s linear infinite;
  width: 60px;
  height: 35px;
  background: rgba(148, 148, 148, 0.826);
}
.ring-3 .black-hole {
  transform: none !important;
  position: absolute;
  width: 17.8em;
  height: 17.8em;
  position: absolute;
  top: 2px;
  left: 2px;
  border-radius: 50%;
  box-sizing: content-box;
}

.ring-3 > *:nth-of-type(1) {
  transform: rotate(126.6666666667deg) translate(9em) rotate(-126.6666666667deg);
}

.ring-3 > *:nth-of-type(2) {
  transform: rotate(253.3333333333deg) translate(9em) rotate(-253.3333333333deg);
}

.ring-3 > *:nth-of-type(3) {
  transform: rotate(380deg) translate(9em) rotate(-380deg);
}

.ring-3 > *:nth-of-type(4) {
  transform: rotate(506.6666666667deg) translate(9em) rotate(-506.6666666667deg);
}

ul[class^='ring'] {
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

ul[class^='ring'] li:not(.black-hole) {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1.6em;
  height: 1.6em;
  margin: -0.8em;
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
