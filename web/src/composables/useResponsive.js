import { ref, computed, onMounted, onUnmounted } from 'vue'

export function useResponsive() {
  const windowWidth = ref(window.innerWidth)
  const deviceType = ref('desktop')

  const updateDeviceType = () => {
    windowWidth.value = window.innerWidth
    if (windowWidth.value < 768) {
      deviceType.value = 'mobile'
    } else if (windowWidth.value < 1024) {
      deviceType.value = 'tablet'
    } else {
      deviceType.value = 'desktop'
    }
  }

  onMounted(() => {
    window.addEventListener('resize', updateDeviceType)
    updateDeviceType()
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateDeviceType)
  })

  return {
    windowWidth,
    deviceType,
    isMobile: computed(() => deviceType.value === 'mobile'),
    isTablet: computed(() => deviceType.value === 'tablet'),
    isDesktop: computed(() => deviceType.value === 'desktop')
  }
}
