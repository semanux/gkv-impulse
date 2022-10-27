<script setup lang="ts">
import { computed, onMounted, onUnmounted, onBeforeUnmount, ref, watch } from "vue";
import { abs, min, max } from "mathjs";
import screens from "./screen";

const SCROLL_SPEED_MODIFIER = 0.25;
const CURSOR_SPEED_MODIFIER = 0.1;
const DISPLAY_ASPECT_RATIO = 9/16;
const CURSOR_ANIMATE_MS = 400;

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

// Set active screen.
const screen = ref(screens["home-no-search"]);
const displayStyle = computed(() => {
  return {
    backgroundImage: `url(${screen.value.src})`,
  }
});

// Compute scale factor between display and screen.
const scaleFactor = computed(() => {
  return (960 / displayWidth.value);
})

// Compute scroll height.
const scrollHeight = computed(() => {
  return max(0, (screen.value.height / scaleFactor.value) - displayHeight.value);
});

// Intersect display coordinate with links. Returns empty string or link.
const doIntersect = (displayX: number, displayY: number): string => {

  // Convert display coordinate to screen.
  const x = displayX * scaleFactor.value;
  const y = (displayY + aggScroll.value) * scaleFactor.value;

  // Check all links for an intersection.
  for(const link of screen.value.links) {
    if(x >= link.x
      && x < link.x + link.width
      && y >= link.y
      && y < link.y + link.height) {
        return link.link;
      }
  }
  return "";
}

// Feedback of cursor after intersect.
const scale = ref(1);
let timeout: number;
watch(scale, (to: number) => {
  if(to !== 1) {
    if(timeout !== undefined) { clearTimeout(timeout); }
    timeout = setTimeout(() => {
      scale.value = 1;
    }, CURSOR_ANIMATE_MS);
  }
}); // Reset scale to 1 after timeout

// Observe size of the display.
let resizeObserver: ResizeObserver;
const display = ref<HTMLDivElement>();
const displayWidth = ref(0);
const displayHeight = ref(0);
onMounted(() => {
  // Throws potentially "loop limit exceeded". But this seems to be not a problem: https://stackoverflow.com/questions/49384120/resizeobserver-loop-limit-exceeded
  resizeObserver = new ResizeObserver((entries: Array<ResizeObserverEntry>) => {
    for (const entry of entries) {
      if (entry.target === display.value) {
        displayWidth.value = display.value.offsetWidth;
        displayHeight.value = display.value.offsetHeight;
      }
    }
  });
  if(display.value) {
    resizeObserver.observe(display.value);
  }
});
onBeforeUnmount(() => {
  resizeObserver.disconnect();
});

// Process interaction in an interval.
let selectionWasOngoing = false; // Prohibits from unintentional scrolling after selection.
const aggX = ref(0);
const aggY = ref(0);
const aggScroll = ref(0);
let interval = 0;
onMounted(() => {
  interval = setInterval(() => {
    if(abs(props.yDelta) < 0.01) { selectionWasOngoing = false; }
    if(props.selecting) { // Cursor.
      aggX.value += props.xDelta * CURSOR_SPEED_MODIFIER;
      aggY.value += props.yDelta * CURSOR_SPEED_MODIFIER;
      aggX.value = min(max(aggX.value, 0), displayWidth.value);
      aggY.value = min(max(aggY.value, 0), displayHeight.value);
      selectionWasOngoing = true;
    } else { // Scrolling.
      if(!selectionWasOngoing) {
        aggScroll.value += props.yDelta * SCROLL_SPEED_MODIFIER;
        aggScroll.value = min(max(aggScroll.value, 0), scrollHeight.value);
      }
    }
  }, 1000/60); // 60 times a second.
})
onUnmounted(() => {
  clearInterval(interval);
})

watch(() => props.selecting, to => {
  if(to) { // Start cursor in the center of the display.
    aggX.value = displayWidth.value / 2;
    aggY.value = displayHeight.value / 2;
  } else { // Try to select.
    const intersectLink = doIntersect(aggX.value, aggY.value);
    if(intersectLink !== "") {
      aggScroll.value = 0;
      screen.value = screens[intersectLink];
      scale.value = 0.5;
    } else {
      scale.value = 4;
    }
  }
});

// Provide values to css.
const scroll = computed(() => {
  return `-${aggScroll.value}px`;
});
const x = computed(() => `${aggX.value}px`);
const y = computed(() => `${aggY.value}px`);
const opacity = computed(() => `${props.selecting ? 1.0 : 0.0}`);

</script>

<template>

<div :class="$style.device" >
  <div :class="$style.display" ref="display" :style="displayStyle">
    <div :class="$style.cursor">
      <div>
        <div/>
      </div>
    </div>
  </div>
</div>

</template>

<style module>

:root {
  --cursor-outer-size: 40px;
  --cursor-inner-size: 15px;
}

.device {
  display: block;
  aspect-ratio: v-bind(DISPLAY_ASPECT_RATIO);
  border-radius: var(--high-roundness);
  background: linear-gradient(#1c1a1a, #131212);
  box-shadow: 0 0 2rem var(--color-transparent-contrast-10);
  box-sizing: border-box;
  padding: calc(0.75 * var(--high-roundness));
  border: 0.125rem solid var(--color-lower-contrast);
}

.display {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: calc(0.25 * var(--high-roundness));
  box-shadow: 0 0 2rem var(--color-transparent-contrast-25);
  background-repeat: no-repeat;
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
  transition: opacity v-bind(CURSOR_ANIMATE_MS + 'ms') ease;
  transform: translate(-50%, -50%);
  opacity: v-bind(opacity);
}

.cursor > div {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  transform: scale(v-bind(scale));
  background: rgb(166, 31, 125, 0.25);
  border-radius: 100%;
  transition: transform v-bind(CURSOR_ANIMATE_MS + 'ms') ease;
}

.cursor > div > div {
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