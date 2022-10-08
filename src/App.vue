<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import QrcodeVue from "qrcode.vue";

const url = computed(() => window.location.href);

</script>

<template>
  <h1>Semanux @ GKV im:pulse</h1>
  <span>Hello World</span>
  <qrcode-vue
    :value="url"
    :render-as="'svg'"
    :level="'L'"
  />
</template>

<style>
</style>
