<script setup lang="ts">
import * as THREE from "three";
import { onMounted, ref } from "vue";
import { pi } from "mathjs";

const CANVAS_WIDTH = 2 * 180;
const CANVAS_HEIGHT = 2 * 320;

const canvas = ref<HTMLCanvasElement>();

onMounted(() => {

  if(canvas.value) {

    let accDeltaX = 0;
    let accDeltaY = 0;

    canvas.value.onmousedown = (e: MouseEvent) => {
      e.preventDefault();
      let mouseX = e.clientX;
      let mouseY = e.clientY;

      // Register mouse up and mouse move globally on document.
      document.onmouseup = () => {
        // Stop moving when mouse button is released.
        document.onmouseup = null;
        document.onmousemove = null;
      };

      // Update position of keyboard at mouse move.
      document.onmousemove = (e: MouseEvent) => {
        e.preventDefault();

        // Compute movement of mouse.
        accDeltaX += mouseX - e.clientX;
        accDeltaY += mouseY - e.clientY;

        // Update mouse position.
        mouseX = e.clientX;
        mouseY = e.clientY;
      };
    };

    // Scene setup.
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      canvas.value.width / canvas.value.height,
      0.1,
      1000);
    camera.position.z = 2.5;
    const renderer = new THREE.WebGLRenderer({ canvas: canvas.value, antialias: true });
    renderer.setSize(
      canvas.value.width,
      canvas.value.height);

    // Lighting.
    const pointLight = new THREE.PointLight(0xffffff, 1, 20);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Setup geometry.
    const texture = new THREE.TextureLoader().load("smiley.png");
    const geometry = new THREE.SphereGeometry(0.5, 20, 16);
    geometry.rotateY(-0.5 * pi);
    const material = new THREE.MeshPhongMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotateY(-0.005 * accDeltaX);
      sphere.rotateX(-0.005 * accDeltaY);

      accDeltaX = accDeltaY = 0;
      renderer.render(scene, camera);
    }
    animate();
  }
});

</script>

<template>
  <canvas
    ref="canvas"
    :width="CANVAS_WIDTH"
    :height="CANVAS_HEIGHT"
  />
</template>

<style>
</style>
