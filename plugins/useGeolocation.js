import { onMounted, onUnmounted, ref } from '@vue/composition-api'

export function useGeolocation () {
  const coords = ref({ latitude: 0, longitude: 0 })
  const isSuported = ref()
  let watcher = null
  onMounted(() => {
    isSuported.value = 'navigator' in window && 'geolocation' in navigator
    console.log('support', isSuported.value)
    if (isSuported) {
      watcher = navigator.geolocation.watchPosition(
        position => (coords.value = position.coords)
      )
    }
  })
  onUnmounted(() => {
    if (watcher) {
      navigator.geolocation.clearWatch(watcher)
    }
  })
  return {
    coords,
    isSuported
  }
}
