<script setup lang="ts">

import { onMounted } from "vue";
import Face from "./Face.vue";
import Foot from "./Foot.vue";

onMounted(() => {
  document.documentElement.setAttribute("data-theme", "dark");
});

</script>

<template>
  <div  :class="$style.app">
    <div>
      <h1>Semanux @ GKV im:pulse</h1>
      <face />
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