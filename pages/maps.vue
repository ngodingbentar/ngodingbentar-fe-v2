<template>
  <span>
    <div class="flex text-center">
      <div class="m-auto">
        <h4>Lokasimu</h4>
        <span v-if="otherPos">
          Latitude: {{ currPos.lat.toFixed(2) }}, Longitude:
          {{ currPos.lng.toFixed(2) }}
        </span>
      </div>
      <div class="m-auto">
        <h4>Jarak</h4>
        {{ distance.toFixed(2) }} km
      </div>
      <div class="m-auto">
        <h4>Tujuan</h4>
        <span v-if="otherPos">
          Latitude: {{ otherPos.lat.toFixed(2) }}, Longitude:
          {{ otherPos.lng.toFixed(2) }}
        </span>
        <span v-else>Klik pada peta</span>
      </div>
    </div>
    <div ref="mapDiv" style="width: 100%; height: 80vh" />
  </span>
</template>

<script>
/* eslint-disable no-undef */
import { computed, defineComponent, onMounted, onUnmounted, ref, watch } from '@vue/composition-api'
import { Loader } from '@googlemaps/js-api-loader'
import { useGeolocation } from '~/plugins/useGeolocation'

const GOOGLE_MAPS_API_KEY = 'AIzaSyDDqH9ry0W2-xZ33xXATr_zxPwDZf0q4ok'

export default defineComponent({
  setup () {
    const { coords } = useGeolocation()
    const currPos = computed(() => ({
      lat: coords.value.latitude,
      lng: coords.value.longitude
    }))
    const otherPos = ref(null)

    const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY })
    const mapDiv = ref(null)
    const map = ref(null)
    let clickListener = null
    onMounted(async () => {
      await loader.load()
      // eslint-disable-next-line no-new
      map.value = new google.maps.Map(mapDiv.value, {
        center: currPos.value,
        zoom: 7
      })
      clickListener = map.value.addListener(
        'click',
        ({ latLng: { lat, lng } }) =>
          (otherPos.value = { lat: lat(), lng: lng() })
      )
    })
    onUnmounted(() => {
      if (clickListener) {
        clickListener.remove()
      }
    })

    let line = null
    watch([map, currPos, otherPos], () => {
      if (line) {
        line.setMap(null)
      }
      if (map.value && otherPos.value != null) {
        line = new google.maps.Polyline({
          path: [currPos.value, otherPos.value],
          map: map.value
        })
      }
    })

    const haversineDistance = (pos1, pos2) => {
      const R = 3958.8
      const rlat1 = pos1.lat * (Math.PI / 180)
      const rlat2 = pos2.lat * (Math.PI / 180)
      const difflat = rlat2 - rlat1
      const difflon = (pos2.lng - pos1.lng) * (Math.PI / 180)

      const d =
        2 *
        R *
        Math.asin(
          Math.sqrt(
            Math.sin(difflat / 2) * Math.sin(difflat / 2) +
              Math.cos(rlat1) *
                Math.cos(rlat2) *
                Math.sin(difflon / 2) *
                Math.sin(difflon / 2)
          )
        )
      const km = d * 1.609344
      return km
    }
    const distance = computed(() =>
      otherPos.value === null
        ? 0
        : haversineDistance(currPos.value, otherPos.value)
    )
    return {
      currPos,
      mapDiv,
      otherPos,
      distance
    }
  }
})
</script>
