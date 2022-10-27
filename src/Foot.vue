<script setup lang="ts">

import { computed } from "vue";
import QrcodeVue from "qrcode.vue";

const url = computed(() => window.location.href);

</script>

<template>
  <div>
    <div :class="$style.foot">
      <div :class="$style.cell">
        <qrcode-vue
          :value="url"
          :render-as="'svg'"
          :level="'L'"
          :class="[$style.qrcode]"
        />
        <div :class="$style.qrcodeMessage">
          Scan&nbsp;to&nbsp;try.
        </div>
      </div>
      <div :class="[$style.cell, $style.semanux]">
        <a href="https://semanux.com">
          <img src="/semanux.png" />
        </a>
      </div>
      <div :class="[$style.cell, $style.gkvImpulse]">
        <a href="https://www.gkv-impulse.de">
          <img src="/gkv-impulse.svg" />
        </a>
      </div>
    </div>
    <div :class="$style.text">
      <a href="https://semanux.com/imprint">Imprint</a>
    </div>
  </div>
</template>

<style module>

.foot {
  display: grid;
  width: 100%;
  max-width: 850px;
  grid-template-columns: 1fr 1fr 1.25fr;
  grid-template-rows: auto;
  align-items: end;
  justify-items: center;
  row-gap: 2rem;
}

.cell {
  box-sizing: border-box;
  max-width: 80%;
}

.cell img {
  max-width: 100%;
  max-height: 100%;
}

.qrcode {
  box-sizing: border-box;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: var(--color-white);
}

.qrcodeMessage {
  font-family: "Barlow", sans-serif;
  color: var(--color-highest-contrast);
  font-size: 75%;
  text-align: center;
  margin-top: -0.25rem;
}

.gkvImpulse, .semanux {
  transition: transform 1s ease;
}

.gkvImpulse {
  transform: translate(0, 2rem);
}

.gkvImpulse:hover {
  transform: translate(0, 2rem) scale(1.1);
}

.semanux:hover {
  transform:  scale(1.1);
}

@media (max-width: 500px) {
  .foot {
    grid-template-columns: auto;
    grid-template-rows: repeat(3, 1fr);
  }
}

.text {
  margin-top: 2rem;
  text-align: center;
  font-size: 75%;
}

</style>
