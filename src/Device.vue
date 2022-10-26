<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { min, max } from "mathjs";

// Properties.
interface Props {
  scrollDelta: number;
}
const props = withDefaults(defineProps<Props>(), {
  scrollDelta: 0,
});

// Scrolling.
const aggScroll = ref(0);
let interval = 0;
onMounted(() => {
  interval = setInterval(() => {
    aggScroll.value += props.scrollDelta;
    aggScroll.value = min(max(aggScroll.value, 0), 2000); // TODO: How to compute the max scroll value? Depends on the device size!
  }, 1000/60);
})
onUnmounted(() => {
  clearInterval(interval);
})
const scroll = computed(() => {
  return `-${aggScroll.value}px`;
});

// Cursor position.
const x = ref(`12px`);
const y = ref(`10px`);

</script>

<template>

<div :class="$style.device" >
  <div :class="$style.screen" >
    <div :class="$style.cursor" />
  </div>
</div>

</template>

<style module>

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
  width: 10px;
  height: 10px;
  left: v-bind(x);
  top: v-bind(y);
  background: #f3c702;
  border-radius: 100%;
  border: 10px solid #a61f7d;
  transform: translate(-50%, -50%);
}

</style>