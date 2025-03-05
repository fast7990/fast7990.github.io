<template>
  <div>
    <div ref="containerRef" class="ocean-container"></div>
  </div>
</template>

<script setup>
import {
  initThree,
  createOrbitControls,
  createWater,
  createSky,
  animate,
} from "@/js/ThreeJSComponents.js";
import { onUnmounted, onMounted, ref } from "vue";

const containerRef = ref(null);
let renderer = null;
let controls = null;
let water = null;
let scene = null;
let camera = null;
let sky = null;
let effectController = null;
let sun = null;
let phi = null;
let theta = null;
let uniforms = null;

function init() {
  // 初始化 Three.js
  const {
    scene: initScene,
    camera: initCamera,
    renderer: initRenderer,
  } = initThree(containerRef.value, window.innerWidth, window.innerHeight);
  scene = initScene;
  camera = initCamera;
  renderer = initRenderer;

  // 创建轨道控制器
  controls = createOrbitControls(camera, renderer.domElement);

  // 创建水面
  water = createWater(scene);

  // 创建天空
  const skyData = createSky(scene);
  sky = skyData.sky;
  effectController = skyData.effectController;
  uniforms = skyData.uniforms;
  sun = skyData.sun;
  phi = skyData.phi;
  theta = skyData.theta;

  // 动画循环
  const animateFunction = animate(
    scene,
    camera,
    renderer,
    water,
    sky,
    effectController,
    sun,
    phi,
    theta
  );
  animateFunction();

  // 窗口大小调整
  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

onMounted(() => {
  init();
});

onUnmounted(() => {
  if (renderer) {
    renderer.dispose();
  }
  window.removeEventListener("resize", onWindowResize);
});
</script>

<style scoped>
.ocean-container {
  width: 100%;
  height: 100vh;
}
</style>
