<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { min, max } from "mathjs";

const CURSOR_SPEED_MODIFIER = 0.1;

// Properties.
interface Props {
  xDelta: number;
  yDelta: number;
  selecting: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  xDelta: 0,
  yDelta: 0,
  selecting: false,
});

// Process interaction in an interval.
const aggX = ref(0);
const aggY = ref(0);
const aggScroll = ref(0);
let interval = 0;
onMounted(() => {
  interval = setInterval(() => {
    console.log(props.xDelta);
    if(props.selecting) { // Cursor.
      aggX.value += props.xDelta * CURSOR_SPEED_MODIFIER;
      aggY.value += props.yDelta * CURSOR_SPEED_MODIFIER;
    } else { // Scrolling.
      aggScroll.value += props.yDelta;
      aggScroll.value = min(max(aggScroll.value, 0), 2000); // TODO: How to compute the max scroll value? Depends on the device size!
    }
  }, 1000/60); // 60 times a second.
})
onUnmounted(() => {
  clearInterval(interval);
})
const scroll = computed(() => {
  return `-${aggScroll.value}px`;
});
const x = computed(() => `${aggX.value}px`);
const y = computed(() => `${aggY.value}px`);
const opacity = computed(() => `${props.selecting ? 1.0 : 0.0}`);

</script>

<template>

<div :class="$style.device" >
  <div :class="$style.screen" >
    <div :class="$style.cursor">
      <div/>
    </div>
  </div>
</div>

</template>

<style module>

:root {
  --cursor-outer-size: 30px;
  --cursor-inner-size: 10px;
}

.device {
  display: block;
  aspect-ratio: 9/16;
  border-radius: var(--high-roundness);
  background: linear-gradient(#1c1a1a, #131212);
  box-shadow: 0 0 2rem var(--color-transparent-contrast-10);
  box-sizing: border-box;
  padding: calc(0.75 * var(--high-roundness));
  border: 0.125rem solid var(--color-lower-contrast);
}

.screen {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: calc(0.25 * var(--high-roundness));
  box-shadow: 0 0 2rem var(--color-transparent-contrast-25);
  background-repeat: no-repeat;
  background-image: url("/app-home-no-search.jpg");
  background-size: 100% auto;
  background-position: 0px v-bind(scroll);
  overflow: clip;
}

.cursor {
  display: block;
  position: absolute;
  width: var(--cursor-outer-size);
  height: var(--cursor-outer-size);
  left: v-bind(x);
  top: v-bind(y);
  background: rgb(166, 31, 125, 0.25);
  border-radius: 100%;
  transform: translate(-50%, -50%);
  transition: opacity 1s ease;
  opacity: v-bind(opacity);
}


.cursor div {
  display: block;
  position: absolute;
  width: var(--cursor-inner-size);
  height: var(--cursor-inner-size);
  left: calc(var(--cursor-outer-size) * 0.5);
  top: calc(var(--cursor-outer-size) * 0.5);
  background: #f3c702;
  border-radius: 100%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 5px var(--color-black-50);
}

</style>