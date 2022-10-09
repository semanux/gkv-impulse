<script setup lang="ts">
import * as THREE from "three";
import { onMounted, ref } from "vue";
import { pi, sin, cos } from "mathjs";

const CANVAS_WIDTH = 2 * 180;
const CANVAS_HEIGHT = 2 * 320;

const canvas = ref<HTMLCanvasElement>();

onMounted(() => {

  if(canvas.value) {

    // Scene setup.
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      canvas.value.width / canvas.value.height,
      0.1,
      1000);
    camera.position.z = 2.5;
    const renderer = new THREE.WebGLRenderer({ canvas: canvas.value, antialias: true, alpha: true });
    renderer.setSize(
      canvas.value.width,
      canvas.value.height);
    renderer.setClearColor(0x000000, 0);

    // Lighting.
    const pointLight = new THREE.PointLight(0xb51a88, 1, 20);
    pointLight.position.z = 3;
    scene.add(pointLight);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    // Setup smiley.
    const sphereTexture = new THREE.TextureLoader().load("smiley.png");
    sphereTexture.anisotropy = 2;
    const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 24);
    sphereGeometry.rotateY(-0.5 * pi);
    const sphereMaterial = new THREE.MeshPhongMaterial({ map: sphereTexture });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

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

    // Update mouse on mouse down on canvas.
    canvas.value.onmousedown = (e: MouseEvent) => {
      e.preventDefault();
      updatePointer(e.clientX, e.clientY);
      pointerActive = true;

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
      };
    };

    // Update mouse on touch down on canvas.
    canvas.value.ontouchstart = (e: TouchEvent) => {
      e.preventDefault();
      updatePointer(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
      pointerActive = true;

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
          sphere.lookAt(intersects[0].point);
        }
      } else {
        // TODO: Make rotation speed depending on delta?
        sphere.rotation.x /= 1.1;
        sphere.rotation.y /= 1.1;
        sphere.rotation.z /= 1.1;
      }

      // Update lighting.
      pointLight.position.x = 5 * sin(clock.getElapsedTime());
      pointLight.position.y = 9 * cos(clock.getElapsedTime());

      renderer.render(scene, camera);
      // const delta = clock.getDelta();
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
  border-radius: var(--high-roundness);
  background: linear-gradient(#a61f7d, #edd2e5);
  box-shadow: 0 0 2rem var(--color-transparent-contrast-25);
  border: 0.125rem solid var(--color-lowest-contrast);
  box-sizing: border-box;
}

</style>
