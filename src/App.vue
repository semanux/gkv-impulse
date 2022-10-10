<script setup lang="ts">

import { onMounted, ref } from "vue";
import Face from "./Face.vue";
import Foot from "./Foot.vue";

const faceRef = ref<InstanceType<typeof Face>>();

onMounted(() => {
  document.documentElement.setAttribute("data-theme", "dark");
});

</script>

<template>
  <div :class="$style.app">
      <h1>Semanux @ GKV im:pulse</h1>
      <face ref="faceRef"/>
      <div>
        <div>
          Mouth: {{ faceRef?.mouthOpen ? "Open" : "Closed" }}
        </div>
        <div>
          Yaw: {{ faceRef?.yaw }}
        </div>
        <div>
          Pitch: {{ faceRef?.pitch }}
        </div>
      </div>
    <foot/>
  </div>
</template>

<style>
@import "./assets/styles/corporate/style.css";

body {
  background: var(--color-fill-primary);
}

</style>

<style module>

.app {
  display: grid;
  justify-items: center;
}

</style>