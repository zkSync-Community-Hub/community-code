<script lang="ts" setup>
defineOptions({
  inheritAttrs: false,
});

defineProps<{
  title: string;
  description: string;
}>();
</script>

<template>
  <div class="align-center flex h-full w-full flex-col justify-center bg-slate-900 p-8 text-center">
    <div class="absolute">
      <svg
        viewBox="0 0 1200 600"
        xmlns="http://www.w3.org/2000/svg"
        xml:space="preserve"
        style="
          fill-rule: evenodd;
          clip-rule: evenodd;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-miterlimit: 1.5;
        "
      >
        <path
          d="M104.406 159.557 214.154 0"
          style="fill: none; stroke: url(#a); stroke-width: 1.5px"
        />
        <path
          d="M1095.59 159.557 985.846 0"
          style="fill: none; stroke: url(#b); stroke-width: 1.5px"
        />
        <path
          d="M104.406 159.557 475.986 0"
          style="fill: url(#c); stroke: url(#_Linear4); stroke-width: 1.5px"
        />
        <path
          d="M1095.59 159.557 724.014 0"
          style="fill: none; stroke: url(#d); stroke-width: 1.5px"
        />
        <path
          d="m104.406 159.557 411.483 81.3"
          style="fill: none; stroke: url(#e); stroke-width: 1.5px"
        />
        <path
          d="m1095.59 159.557-411.479 81.3"
          style="fill: none; stroke: url(#f); stroke-width: 1.5px"
        />
        <path
          d="M104.406 159.557 0 53.636"
          style="fill: none; stroke: url(#g); stroke-width: 1.5px"
        />
        <path
          d="M1095.59 159.557 1200 53.636"
          style="fill: none; stroke: url(#h); stroke-width: 1.5px"
        />
        <path
          d="M104.406 159.557 0 212.885"
          style="fill: none; stroke: url(#i); stroke-width: 1.5px"
        />
        <path
          d="M1095.59 159.557 1200 212.885"
          style="fill: none; stroke: url(#j); stroke-width: 1.5px"
        />
        <path
          d="m104.406 159.557 92.539 322.394"
          style="fill: none; stroke: url(#k); stroke-width: 1.5px"
        />
        <path
          d="m1095.59 159.557-92.53 322.394"
          style="fill: none; stroke: url(#l); stroke-width: 1.5px"
        />
        <path
          d="M196.945 481.951 0 590.638"
          style="fill: none; stroke: url(#m); stroke-width: 1.5px"
        />
        <path
          d="M1003.06 481.951 1200 590.638"
          style="fill: none; stroke: url(#n); stroke-width: 1.5px"
        />
        <path
          d="M196.945 481.951 0 407.65"
          style="fill: none; stroke: url(#o); stroke-width: 1.5px"
        />
        <path
          d="M1003.06 481.951 1200 407.65"
          style="fill: none; stroke: url(#p); stroke-width: 1.5px"
        />
        <path
          d="m196.945 481.951 341.769-74.301"
          style="fill: none; stroke: url(#q); stroke-width: 1.5px"
        />
        <path
          d="M1003.06 481.951 661.286 407.65"
          style="fill: none; stroke: url(#r); stroke-width: 1.5px"
        />
        <path
          d="M196.945 481.951 573.594 630"
          style="fill: none; stroke: url(#s); stroke-width: 1.5px"
        />
        <path
          d="M1003.06 481.951 626.406 630"
          style="fill: none; stroke: url(#t); stroke-width: 1.5px"
        />
        <path
          d="M196.945 481.951 295.383 630"
          style="fill: none; stroke: url(#u); stroke-width: 1.5px"
        />
        <path
          d="M1003.06 481.951 904.617 630"
          style="fill: none; stroke: url(#v); stroke-width: 1.5px"
        />
        <path
          d="m475.986 0 36.857 146.457"
          style="fill: none; stroke: url(#w); stroke-width: 1.5px"
        />
        <path
          d="m724.014 0-36.857 146.457"
          style="fill: none; stroke: url(#x); stroke-width: 1.5px"
        />
        <g opacity=".53">
          <path
            d="M118.765 293.683 385.269 0"
            style="fill: none; stroke: url(#y); stroke-width: 1.5px"
          />
          <path
            d="M1081.24 293.683 814.731 0"
            style="fill: none; stroke: url(#z); stroke-width: 1.5px"
          />
          <path
            d="M118.765 293.683 72.229 122.426"
            style="fill: none; stroke: url(#A); stroke-width: 1.5px"
          />
          <path
            d="m1081.24 293.683 46.53-171.257"
            style="fill: none; stroke: url(#B); stroke-width: 1.5px"
          />
          <path
            d="M72.229 122.426 131.089 0"
            style="fill: none; stroke: url(#C); stroke-width: 1.5px"
          />
          <path
            d="M1127.77 122.426 1068.91 0"
            style="fill: none; stroke: url(#D); stroke-width: 1.5px"
          />
          <path
            d="M72.229 122.426 0 129.513"
            style="fill: none; stroke: url(#E); stroke-width: 1.5px"
          />
          <path
            d="m1127.77 122.426 72.23 7.087"
            style="fill: none; stroke: url(#F); stroke-width: 1.5px"
          />
          <path
            d="M118.765 293.683 0 281.928"
            style="fill: none; stroke: url(#G); stroke-width: 1.5px"
          />
          <path
            d="M1081.24 293.683 1200 281.928"
            style="fill: none; stroke: url(#H); stroke-width: 1.5px"
          />
          <path
            d="M118.765 293.683 0 350.963"
            style="fill: none; stroke: url(#I); stroke-width: 1.5px"
          />
          <path
            d="m1081.24 293.683 118.76 57.28"
            style="fill: none; stroke: url(#J); stroke-width: 1.5px"
          />
          <path
            d="m118.765 293.683 156.748 101.11"
            style="fill: none; stroke: url(#K); stroke-width: 1.5px"
          />
          <path
            d="m1081.24 293.683-156.753 101.11"
            style="fill: none; stroke: url(#L); stroke-width: 1.5px"
          />
          <path
            d="m275.513 394.793 215.815-91.854"
            style="fill: none; stroke: url(#M); stroke-width: 1.5px"
          />
          <path
            d="m924.487 394.793-215.815-91.854"
            style="fill: none; stroke: url(#N); stroke-width: 1.5px"
          />
          <path
            d="M275.513 394.793 220.144 630"
            style="fill: none; stroke: url(#O); stroke-width: 1.5px"
          />
          <path
            d="M924.487 394.793 979.856 630"
            style="fill: none; stroke: url(#P); stroke-width: 1.5px"
          />
          <path
            d="M275.513 394.793 337.679 630"
            style="fill: none; stroke: url(#Q); stroke-width: 1.5px"
          />
          <path
            d="M924.487 394.793 862.321 630"
            style="fill: none; stroke: url(#R); stroke-width: 1.5px"
          />
          <path
            d="M275.513 394.793 0 475.893"
            style="fill: none; stroke: url(#S); stroke-width: 1.5px"
          />
          <path
            d="m924.487 394.793 275.513 81.1"
            style="fill: none; stroke: url(#T); stroke-width: 1.5px"
          />
        </g>
        <circle
          cx="104.598"
          cy="159.338"
          r="1.897"
          style="fill: #b9d2ff"
        />
        <circle
          cx="72.229"
          cy="122.426"
          r="1.897"
          style="fill: #b9d2ff; fill-opacity: 0.8"
        />
        <circle
          cx="118.581"
          cy="293.405"
          r="1.897"
          style="fill: #b9d2ff; fill-opacity: 0.7"
        />
        <circle
          cx="197.005"
          cy="481.964"
          r="1.897"
          style="fill: #b9d2ff"
        />
        <circle
          cx="275.513"
          cy="394.793"
          r="1.897"
          style="fill: #b9d2ff"
        />
        <circle
          cx="1095.22"
          cy="159.561"
          r="1.897"
          style="fill: #b9d2ff"
        />
        <circle
          cx="1127.69"
          cy="122.399"
          r="1.897"
          style="fill: #b9d2ff; fill-opacity: 0.8"
        />
        <circle
          cx="1081.24"
          cy="293.683"
          r="1.897"
          style="fill: #b9d2ff; fill-opacity: 0.7"
        />
        <circle
          cx="1003.03"
          cy="481.964"
          r="1.897"
          style="fill: #b9d2ff"
        />
        <circle
          cx="924.637"
          cy="395.144"
          r="1.897"
          style="fill: #b9d2ff"
        />
        <ellipse
          cx="600"
          cy="303.45"
          rx="387.513"
          ry="326.55"
          style="fill: url(#U)"
        />
        <defs>
          <linearGradient
            id="a"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(109.748 0 0 159.557 104.406 79.778)"
          >
            <stop
              offset="0"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
            <stop
              offset=".22"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset=".48"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".72"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="b"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-109.748 0 0 159.557 1095.59 79.778)"
          >
            <stop
              offset="0"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
            <stop
              offset=".28"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset=".52"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".78"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="c"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(399.993 107.575 -125.998 468.493 105.12 159.731)"
          >
            <stop
              offset="0"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #96004c; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="d"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-371.579 0 0 159.557 1095.59 79.778)"
          >
            <stop
              offset="0"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
            <stop
              offset=".22"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset=".48"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".72"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="e"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(411.482 0 0 81.3009 104.406 200.207)"
          >
            <stop
              offset="0"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
            <stop
              offset=".22"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset=".48"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".72"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="f"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-411.482 0 0 81.3009 1095.59 200.207)"
          >
            <stop
              offset="0"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
            <stop
              offset=".22"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset=".48"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".72"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="g"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(104.406 0 0 105.921 0 106.596)"
          >
            <stop
              offset="0"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
            <stop
              offset=".28"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset=".52"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".78"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="h"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-104.406 0 0 105.921 1200 106.596)"
          >
            <stop
              offset="0"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
            <stop
              offset=".28"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset=".52"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".78"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="i"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(104.406 0 0 53.3287 0 186.221)"
          >
            <stop
              offset="0"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
            <stop
              offset=".28"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset=".52"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".78"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="j"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-104.406 0 0 53.3287 1200 186.221)"
          >
            <stop
              offset="0"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
            <stop
              offset=".28"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset=".52"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".78"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="k"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(46.2692 0 0 161.197 150.675 320.754)"
          >
            <stop
              offset="0"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
            <stop
              offset=".22"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset=".48"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".72"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="l"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-92.5383 0 0 322.394 1095.59 320.754)"
          >
            <stop
              offset="0"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
            <stop
              offset=".22"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset=".48"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".72"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="m"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(196.945 0 0 108.687 0 536.294)"
          >
            <stop
              offset="0"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
            <stop
              offset=".28"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset=".52"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".78"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="n"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-196.945 0 0 108.687 1200 536.294)"
          >
            <stop
              offset="0"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
            <stop
              offset=".28"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset=".52"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".78"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="o"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(196.945 0 0 74.3005 0 444.8)"
          >
            <stop
              offset="0"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
            <stop
              offset=".28"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset=".52"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".78"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="p"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-196.945 0 0 74.3005 1200 444.8)"
          >
            <stop
              offset="0"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
            <stop
              offset=".28"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset=".52"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".78"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="q"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(341.769 0 0 74.3005 196.945 444.8)"
          >
            <stop
              offset="0"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
            <stop
              offset=".28"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset=".52"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".78"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="r"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-341.769 0 0 74.3005 1003.06 444.8)"
          >
            <stop
              offset="0"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
            <stop
              offset=".28"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset=".52"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".78"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="s"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(376.65 0 0 148.049 196.945 555.975)"
          >
            <stop
              offset="0"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
            <stop
              offset=".28"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset=".52"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".78"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="t"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-376.65 0 0 148.049 1003.06 555.975)"
          >
            <stop
              offset="0"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
            <stop
              offset=".28"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset=".52"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".78"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="u"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(98.4388 0 0 148.049 196.945 555.975)"
          >
            <stop
              offset="0"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
            <stop
              offset=".28"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset=".52"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".78"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="v"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-98.4388 0 0 148.049 1003.06 555.975)"
          >
            <stop
              offset="0"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
            <stop
              offset=".28"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset=".52"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".78"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="w"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(36.8575 0 0 146.457 475.986 73.228)"
          >
            <stop
              offset="0"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
            <stop
              offset=".28"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset=".52"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".78"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="x"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-36.8575 0 0 146.457 724.014 73.228)"
          >
            <stop
              offset="0"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
            <stop
              offset=".28"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset=".52"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".78"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="y"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(266.505 0 0 293.683 118.765 146.841)"
          >
            <stop
              offset="0"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
            <stop
              offset=".22"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset=".48"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".72"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="z"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-266.505 0 0 293.683 1081.24 146.841)"
          >
            <stop
              offset="0"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
            <stop
              offset=".22"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset=".48"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".72"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="A"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(46.5353 0 0 171.256 72.23 208.054)"
          >
            <stop
              offset="0"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
            <stop
              offset=".22"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset=".48"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".72"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="B"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-46.5353 0 0 171.256 1127.77 208.054)"
          >
            <stop
              offset="0"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
            <stop
              offset=".22"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset=".48"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".72"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="C"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(58.8596 0 0 122.426 72.23 61.213)"
          >
            <stop
              offset="0"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
            <stop
              offset=".28"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset=".52"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".78"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="D"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-58.8596 0 0 122.426 1127.77 61.213)"
          >
            <stop
              offset="0"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
            <stop
              offset=".22"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset=".48"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".72"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="E"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(72.2295 0 0 7.08664 0 125.97)"
          >
            <stop
              offset="0"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
            <stop
              offset=".22"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset=".48"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".72"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="F"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-72.2295 0 0 7.08664 1200 125.97)"
          >
            <stop
              offset="0"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
            <stop
              offset=".22"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset=".48"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".72"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="G"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(118.765 0 0 11.7543 0 287.805)"
          >
            <stop
              offset="0"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
            <stop
              offset=".22"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset=".48"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".72"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="H"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-118.765 0 0 11.7543 1200 287.805)"
          >
            <stop
              offset="0"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
            <stop
              offset=".22"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset=".48"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".72"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="I"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(118.765 0 0 57.2801 0 322.323)"
          >
            <stop
              offset="0"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
            <stop
              offset=".22"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset=".48"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".72"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="J"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-118.765 0 0 57.2801 1200 322.323)"
          >
            <stop
              offset="0"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
            <stop
              offset=".22"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset=".48"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".72"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="K"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(156.748 0 0 101.11 118.765 344.238)"
          >
            <stop
              offset="0"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
            <stop
              offset=".22"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset=".48"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".72"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="L"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-156.748 0 0 101.11 1081.24 344.238)"
          >
            <stop
              offset="0"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
            <stop
              offset=".22"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset=".48"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".72"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="M"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(215.815 0 0 91.854 275.513 348.866)"
          >
            <stop
              offset="0"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
            <stop
              offset=".22"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset=".48"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".72"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="N"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-215.815 0 0 91.854 924.487 348.866)"
          >
            <stop
              offset="0"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
            <stop
              offset=".22"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset=".48"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".72"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="O"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(55.3688 0 0 235.207 220.144 512.396)"
          >
            <stop
              offset="0"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
            <stop
              offset=".22"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset=".48"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".72"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="P"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-55.3688 0 0 235.207 979.856 512.396)"
          >
            <stop
              offset="0"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
            <stop
              offset=".22"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset=".48"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".72"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="Q"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(62.1662 0 0 235.207 275.513 512.396)"
          >
            <stop
              offset="0"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
            <stop
              offset=".22"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset=".48"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".72"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="R"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-62.1662 0 0 235.207 924.487 512.396)"
          >
            <stop
              offset="0"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
            <stop
              offset=".22"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset=".48"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".72"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="S"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(275.513 0 0 81.1007 0 435.343)"
          >
            <stop
              offset="0"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
            <stop
              offset=".22"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset=".48"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".72"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
          </linearGradient>
          <linearGradient
            id="T"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-275.513 0 0 81.1007 1200 435.343)"
          >
            <stop
              offset="0"
              style="stop-color: #fc7913; stop-opacity: 1"
            />
            <stop
              offset=".22"
              style="stop-color: #bc2e37; stop-opacity: 1"
            />
            <stop
              offset=".48"
              style="stop-color: #8250b7; stop-opacity: 1"
            />
            <stop
              offset=".72"
              style="stop-color: #5b8ecb; stop-opacity: 1"
            />
            <stop
              offset="1"
              style="stop-color: #001d8c; stop-opacity: 1"
            />
          </linearGradient>
          <radialGradient
            id="U"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(387.561 0 0 440.867 599.952 303.45)"
          >
            <stop
              offset="0"
              style="stop-color: #000; stop-opacity: 1"
            />
            <stop
              offset=".51"
              style="stop-color: #000; stop-opacity: 0.76"
            />
            <stop
              offset="1"
              style="stop-color: #000; stop-opacity: 0"
            />
          </radialGradient>
        </defs>
      </svg>
    </div>
    <div class="flex flex-col items-center text-center">
      <svg
        width="12%"
        height="20%"
        viewBox="0 0 1112 656"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xml:space="preserve"
        xmlns:serif="http://www.serif.com/"
        style="fill-rule: evenodd; clip-rule: evenodd; stroke-linejoin: round; stroke-miterlimit: 2"
      >
        <g>
          <path
            fill="white"
            d="M1043.02,323.053l-277.916,-276.666l-0,202.5l-275.834,202.916l275.834,0l-0,147.917l277.916,-276.667Z"
          />
          <path
            fill="white"
            d="M63.85,323.053l277.916,276.667l0,-201.25l275.834,-204.583l-275.834,-0l0,-147.917l-277.916,277.083Z"
          />
        </g>
      </svg>
      <h1 class="gap-4 text-7xl font-bold text-white">
        {{ title }}
      </h1>
      <p class="max-w-3xl text-balance text-3xl text-white">
        {{ description }}
      </p>
    </div>
  </div>
</template>
