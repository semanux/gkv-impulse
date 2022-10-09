<script setup lang="ts">

import { computed } from "vue";
import QrcodeVue from "qrcode.vue";

const url = computed(() => window.location.href);

</script>

<template>
  <div :class="$style.foot">
    <div :class="$style.cell">
      <img src="/semanux.png" />
    </div>
    <div :class="$style.cell">
      <img src="/gkv-impulse.svg" />
    </div>
    <div :class="$style.cell">
      <qrcode-vue
        :value="url"
        :render-as="'svg'"
        :level="'L'"
        :class="[$style.cell, $style.qrcode]"
      />
    </div>
  </div>
</template>

<style module>

.foot {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-items: center;
}

.cell {
  margin: 10rem;
}

.cell img {
  max-width: 100%;
  max-height: 100%;
}

.qrcode {
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: var(--color-white);
}

</style>
