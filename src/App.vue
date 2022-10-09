<script setup lang="ts">
import QrcodeVue from "qrcode.vue";
import { computed } from "vue";
import Face from "./Face.vue"

const url = computed(() => window.location.href);

</script>

<template>
  <h1>Semanux @ GKV im:pulse</h1>
  <face />
  <br/>
  <qrcode-vue
    :value="url"
    :render-as="'svg'"
    :level="'L'"
  />
</template>

<style>
@import "./assets/styles/corporate/style.css";

</style>
