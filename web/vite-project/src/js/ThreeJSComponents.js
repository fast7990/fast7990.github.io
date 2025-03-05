import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Water } from "three/examples/jsm/objects/Water.js";
import { Sky } from "three/examples/jsm/objects/Sky.js";

// 初始化场景、相机、渲染器等
export function initThree(container, width, height) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  container.appendChild(renderer.domElement);

  return { scene, camera, renderer };
}

// 创建轨道控制器
export function createOrbitControls(camera, rendererDomElement) {
  return new OrbitControls(camera, rendererDomElement);
}

// 创建水面
export function createWater(scene) {
  const shape = new THREE.Shape();
  shape.moveTo(100, 0);
  shape.quadraticCurveTo(100, 100, 0, 100);
  shape.quadraticCurveTo(-100, 100, -100, 0);
  shape.quadraticCurveTo(-100, -100, 0, -100);
  shape.quadraticCurveTo(100, -100, 100, 0);

  const waterGeometry = new THREE.ShapeGeometry(shape);

  const waterNormals = new THREE.TextureLoader().load(
    "https://threejs.org/examples/textures/waternormals.jpg",
    (texture) => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(8, 8); // 重复纹理
    },
    undefined,
    (error) => {
      console.error("Error loading texture:", error);
    }
  );

  const water = new Water(waterGeometry, {
    textureWidth: 512, // 纹理宽度
    textureHeight: 512, // 纹理高度
    waterNormals: waterNormals, // 波纹纹理
    alpha: 1, // 透明度
    sunDirection: new THREE.Vector3(), // 太阳方向
    sunColor: 0xffffff, // 太阳颜色
    waterColor: 0x001e0f, // 水的颜色
    distortionScale: 3.7, // 波纹大小
    fog: scene.fog !== undefined, // 是否开启雾
  });
  water.rotation.x = -Math.PI / 2;
  scene.add(water);

  return water;
}

// 创建天空
export function createSky(scene) {
  const sky = new Sky();
  sky.scale.setScalar(10000); // 使天空球与视口大小一致
  scene.add(sky);

  const effectController = {
    turbidity: 1, // 浑浊度
    rayleigh: 0.8, // 光线衰减
    mieCoefficient: 0.005, // 水滴系数
    mieDirectionalG: 0.7, // 水滴方向
    distance: 5000, // 距离
    inclination: 0.1, // 倾斜度
    elevation: 2, // 高度
    azimuth: 180, // 方位角
    exposure: 1.0, // 曝光度
    showSkybox: true, // 是否显示天空盒子
    showAtmosphere: true, // 是否显示大气
  };
  const uniforms = sky.material.uniforms;
  uniforms["turbidity"].value = effectController.turbidity;
  uniforms["rayleigh"].value = effectController.rayleigh;
  uniforms["mieCoefficient"].value = effectController.mieCoefficient;
  uniforms["mieDirectionalG"].value = effectController.mieDirectionalG;

  const phi = THREE.MathUtils.degToRad(90 - effectController.elevation);
  const theta = THREE.MathUtils.degToRad(effectController.azimuth);

  const sun = new THREE.Vector3();
  sun.setFromSphericalCoords(1, phi, theta);
  uniforms["sunPosition"].value.copy(sun);

  return { sky, effectController, uniforms, sun, phi, theta };
}

// 动画循环
export function animate(scene, camera, renderer, water, sky, effectController, sun, phi, theta) {
  function animateInternal() {
    requestAnimationFrame(animateInternal);

    if (water) {
      water.material.uniforms["time"].value += 1.0 / 60.0;
    }

    if (sky) {
      effectController.elevation = (effectController.elevation + 0.1) % 360;
      const phi = THREE.MathUtils.degToRad(90 - effectController.elevation);
      sun.setFromSphericalCoords(1, phi, theta);
      sky.material.uniforms["sunPosition"].value.copy(sun);
    }

    renderer.render(scene, camera);
  }

  return animateInternal;
}