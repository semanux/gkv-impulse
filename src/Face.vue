<script setup lang="ts">
import * as THREE from "three";
import { onMounted, ref, watchEffect } from "vue";
import { pi, sin, cos } from "mathjs";

const CANVAS_WIDTH = 1.5 * 180;
const CANVAS_HEIGHT = 1.5 * 320;
const BLINK_DURATION = 0.25; // In seconds.
const BLINK_PAUSE = 5; // In seconds.

const canvas = ref<HTMLCanvasElement>();

// Exposed references.
const yaw = ref(0);
const pitch = ref(0);
const mouthOpen = ref(false);
defineExpose({ yaw, pitch, mouthOpen });

onMounted(() => {

  if(canvas.value) {

    // Animation variables.
    let blinkTime = BLINK_PAUSE;
    const blinking = ref(false);

    // Scene setup.
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      30,
      canvas.value.width / canvas.value.height,
      0.1,
      1000);
    camera.position.z = 4;
    const renderer = new THREE.WebGLRenderer({ canvas: canvas.value, antialias: true, alpha: true });
    renderer.setSize(
      canvas.value.width,
      canvas.value.height);
    renderer.setClearColor(0x000000, 0);

    // Lighting.
    const pointLight1 = new THREE.PointLight(0xa53a98, 0.5, 15);
    pointLight1.position.z = 3;
    const pointLight2 = new THREE.PointLight(0xb51aa8, 0.5, 15);
    pointLight2.position.z = 2;
    const pointLight3 = new THREE.PointLight(0xc52a88, 0.5, 15);
    pointLight3.position.z = 3.5;
    scene.add(pointLight1);
    scene.add(pointLight2);
    scene.add(pointLight3);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    // Load smiley textures.
    const smileyIdleTexture = new THREE.TextureLoader().load("smiley-idle.png");
    const smileyIdleBlinkTexture = new THREE.TextureLoader().load("smiley-idle-blink.png");
    const smileyOpenTexture = new THREE.TextureLoader().load("smiley-open.png");
    const smileyOpenBlinkTexture = new THREE.TextureLoader().load("smiley-open-blink.png");
    smileyIdleTexture.anisotropy = 2;
    smileyIdleBlinkTexture.anisotropy = 2;
    smileyOpenTexture.anisotropy = 2;
    smileyOpenBlinkTexture.anisotropy = 2;

    // Setup smiley.
    const smileyGeometry = new THREE.SphereGeometry(0.5, 48, 32);
    smileyGeometry.rotateY(-0.5 * pi);
    const smileyMaterial = new THREE.MeshPhongMaterial({ map: smileyIdleTexture });
    watchEffect(() => {
      if(blinking.value) {
        smileyMaterial.map = mouthOpen.value ? smileyOpenBlinkTexture : smileyIdleBlinkTexture;
      } else {
        smileyMaterial.map = mouthOpen.value ? smileyOpenTexture : smileyIdleTexture;
      }
    });
    const smiley = new THREE.Mesh(smileyGeometry, smileyMaterial);
    scene.add(smiley);

    // Setup outline.
    const outlineGeometry = new THREE.SphereGeometry(0.5125, 48, 32);
    const outlineMaterial = new THREE.MeshStandardMaterial({color: 0x000000, side: THREE.BackSide})
    const outline = new THREE.Mesh(outlineGeometry, outlineMaterial);
    scene.add(outline);

    // Setup plane to intersecting ray to rotation smiley.
    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    const plane = new THREE.Mesh(planeGeometry);
    plane.position.z = 1;
    plane.visible = false;
    scene.add(plane);
    const ray = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let pointerActive = false;

    const updatePointer = (x: number, y: number) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = THREE.MathUtils.clamp((x - rect.left) / renderer.domElement.clientWidth, 0, 1) * 2 - 1;
      pointer.y =  - THREE.MathUtils.clamp((y - rect.top) / renderer.domElement.clientHeight, 0, 1) * 2 + 1;
    };

    // Disable context menu on right click.
    document.oncontextmenu = () => { return false; };

    // Update mouse on mouse down on canvas.
    canvas.value.onmousedown = (e: MouseEvent) => {
      e.preventDefault();
      updatePointer(e.clientX, e.clientY);
      pointerActive = true;
      mouthOpen.value = e.button !== 0; // Open mouth when right mouse button is clicked.

      // Allow mouse move on whole document.
      document.onmousemove = (e: MouseEvent) => {
        e.preventDefault();
        updatePointer(e.clientX, e.clientY);
        pointerActive = true;
      }

      // Remove callbacks at mouse up.
      document.onmouseup = () => {
        document.onmouseup = null;
        document.onmousemove = null;
        pointerActive = false;
        mouthOpen.value = false;
      };
    };

    // Update mouse on touch down on canvas.
    canvas.value.ontouchstart = (e: TouchEvent) => {
      e.preventDefault();
      updatePointer(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
      pointerActive = true;
      mouthOpen.value = e.touches.length > 1; // Open mouth when more than one finger touches.

      // Allow mouse move on whole document.
      document.ontouchmove = (e: TouchEvent) => {
        updatePointer(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        pointerActive = true;
      }

      // Remove callbacks at mouse up.
      document.ontouchend = () => {
        document.ontouchend = null;
        document.ontouchmove = null;
        pointerActive = false;
        mouthOpen.value = false;
      };
    };

    // Rendering loop.
    const clock = new THREE.Clock();
    const animate = () => {

      // Rotate smiley.
      if(pointerActive) {
        ray.setFromCamera(pointer, camera );
        const intersects = ray.intersectObjects([plane], false);
        if(intersects.length > 0) {
          smiley.lookAt(intersects[0].point);
        }
      } else {
        // TODO: Make rotation speed depending on delta?
        smiley.rotation.x /= 1.1;
        smiley.rotation.y /= 1.1;
        smiley.rotation.z /= 1.1;
      }

      // Update blinking.
      blinkTime -= clock.getDelta();
      if(blinkTime <= 0) {
        blinking.value = !blinking.value;
        blinkTime = blinking.value ? BLINK_DURATION : BLINK_PAUSE;
      }

      // Update lighting.
      pointLight1.position.x = 5 * sin(clock.getElapsedTime());
      pointLight1.position.y = 9 * cos(clock.getElapsedTime());
      pointLight2.position.x = 3 * sin(clock.getElapsedTime());
      pointLight2.position.y = -6 * cos(clock.getElapsedTime());
      pointLight3.position.x = -3 * sin(clock.getElapsedTime());
      pointLight3.position.y = 6 * cos(clock.getElapsedTime());

      // Update exposed variables.
      pitch.value = smiley.rotation.x;
      yaw.value = smiley.rotation.y;

      // Render.
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();
  }
});

</script>

<template>
  <canvas
    :class="$style.face"
    ref="canvas"
    :width="CANVAS_WIDTH"
    :height="CANVAS_HEIGHT"
  />
</template>

<style module>

.face {
  display: block;
  border-radius: var(--high-roundness);
  background: linear-gradient(#a61f7d, #edd2e5);
  box-shadow: 0 0 2rem var(--color-transparent-contrast-25);
  border: 0.125rem solid var(--color-lowest-contrast);
  box-sizing: border-box;
}

</style>
