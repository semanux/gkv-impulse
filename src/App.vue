<script setup lang="ts">

import { onMounted, ref } from "vue";
import { pi, round } from "mathjs";

import Face from "./Face.vue";
import Foot from "./Foot.vue";
import Device from "./Device.vue";
import GithubCorners from "@uivjs/vue-github-corners";

const faceRef = ref<InstanceType<typeof Face>>();

onMounted(() => {
  document.documentElement.setAttribute("data-theme", "dark");
});

// Mouth: {{ faceRef?.mouthOpen ? "Open" : "Closed" }}
// Yaw: {{ faceRef ? round(faceRef.yaw / pi * 180) : 0 }}°
// Pitch: {{ faceRef ?  round(faceRef.pitch / pi * 180) : 0 }}°

</script>

<template>
  <div :class="$style.app">
    <h1 style="grid-area: head">Semanux @ GKV im:pulse</h1>
    <span :class="$style.subhead">Controlling your health insurance's app with you head alone? 🙃</span>
    <div :class="$style.notes">
      <p>This demo is <b>Semanux' contribution</b> to the <b>GKV im:pulse</b> accelerator 2022! 🚀 We are proud to present you our vision 🔮 how we will enable you to take control over your health insurance app using your head alone - ✋ <i>touchless</i>, 😶 <i>speechless</i>, 🐥 <i>effortless</i>.</p>
      <span>A solution for following situations and more:</span>
      <ul>
        <li>Broke your hand? ✊</li>
        <li>Busy hands while cooking? 👩‍🍳</li>
        <li>Dirty surface like an ATM? 💳</li>
        <li>Clean environment like surgery? 👨‍⚕️</li>
        <li>Motor impairment in the upper limps? 🦾</li>
      </ul>
      <p>We are still working to bring our technology into any app. Thus, here you can experience our vision <u>by dragging or touching the smiley face</u> next to this description! </p>
      <p>Drag it with the left mouse button or touch it with one finger to rotate it for scrolling. 🙃 Drag it with the right mouse button or touch it with two fingers to let it open its mouth for a selection. 😮</p>
    </div>
    <div :class="$style.contents">
      <device
        :class="$style.device"
        :scroll-delta="(faceRef && !faceRef?.mouthOpen) ? round(faceRef.pitch / pi * 180) : 0"
      />
      <div :class="$style.face">
        <face ref="faceRef"/>
        <div :class="$style.faceMessage">
          👆 Touch me!
        </div>
      </div>
    </div>
    <foot :class="$style.foot"/>
  </div>
  <github-corners fixed target="__blank" href="https://github.com/semanux/gkv-impulse" />
</template>

<style>
@import "./assets/styles/corporate/style.css";

body {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    20deg,
    var(--color-fill-primary),
    #2a2810,
    #3e0e30,
    #11352c);
  background-attachment: fixed;
}

</style>

<style module>

.app {
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  column-gap: 1rem;
  grid-template-areas:
    "head head"
    "subhead subhead"
    "notes contents"
    "foot foot";
}

h1 {
  font-size: 250%;
}

.subhead {
  grid-area: subhead;
  font-size: 125%;
  margin-top: -1rem;
  margin-bottom: 2rem;
  color: var(--color-font-secondary);
}

.notes {
  grid-area: notes;
  justify-self: end;
  max-width: 500px;
}

.contents {
  grid-area: contents;
  position: relative;
  justify-self: start;
}

.device {
  width: 300px;
}

.face {
  position: absolute;
  right: 0;
  bottom: 0;
  transform: translate(25%, 25%);
}

.faceMessage {
  font-family: "Barlow", sans-serif;
  color: var(--color-highest-contrast);
  text-align: center;
}

.foot {
  grid-area: foot;
  margin-top: 2rem;
}


@media (max-width: 700px) {
  .app {
    grid-template-columns: 1fr;
    grid-template-areas:
    "head"
    "subhead"
    "contents"
    "notes"
    "foot";
  }

  .notes, .contents {
    justify-self: center;
  }

  .contents {
    margin-bottom: 60px;
  }
}

</style>