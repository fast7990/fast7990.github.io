<template>
  <div class="particles-bg">
    <vue-particles
      id="tsparticles"
      :options="particlesOptions"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useResponsive } from '../composables/useResponsive'

const { deviceType } = useResponsive()

const particlesOptions = computed(() => {
  const isMobile = deviceType.value === 'mobile'
  const isTablet = deviceType.value === 'tablet'
  const isDesktop = deviceType.value === 'desktop'

  // 根据设备类型设置粒子数量
  const particleCount = isMobile ? 35 : isTablet ? 60 : 90

  // 根据设备类型设置连线距离
  const linkDistance = isMobile ? 0 : 150

  return {
    fullScreen: {
      enable: false
    },
    background: {
      color: {
        value: 'transparent'
      }
    },
    fpsLimit: 60,
    particles: {
      number: {
        value: particleCount,
        density: {
          enable: true,
          width: 1920,
          height: 1080
        }
      },
      color: {
        value: ['#7c3aed', '#8b5cf6', '#06b6d4', '#0891b2']
      },
      shape: {
        type: 'circle'
      },
      opacity: {
        value: {
          min: 0.3,
          max: 0.7
        },
        animation: {
          enable: true,
          speed: 0.5,
          minimumValue: 0.3
        }
      },
      size: {
        value: {
          min: 2,
          max: 5
        },
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 2
        }
      },
      links: {
        enable: !isMobile,
        distance: linkDistance,
        color: '#7c3aed',
        opacity: 0.3,
        width: 1
      },
      move: {
        enable: true,
        speed: 1,
        direction: 'none',
        random: true,
        straight: false,
        outModes: {
          default: 'out'
        }
      }
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'repulse'
        },
        onClick: {
          enable: true,
          mode: 'push'
        }
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4
        },
        push: {
          quantity: 4
        }
      }
    },
    detectRetina: true
  }
})
</script>

<style scoped>
.particles-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}

.particles-bg :deep(.tsparticles) {
  pointer-events: auto;
  width: 100%;
  height: 100%;
}
</style>
