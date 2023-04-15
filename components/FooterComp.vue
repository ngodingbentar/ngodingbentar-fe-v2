<template>
  <div v-if="!loadingTheme" class="py-4" :style="{ background: storeTheme.background, color: storeTheme.color }">
    <div class="text-center">
      <a href="https://www.instagram.com/ngodingbentar/" target="_blank">@ngodingbentar</a>
      /
      <a href="https://www.instagram.com/dewaqintoro/" target="_blank">@dewaqintoro</a>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useContext } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'Footer',
  props: {
    // theme: {
    //   type: Object,
    //   required: true,
    // },
  },
  setup () {
    const { store } = useContext()
    const isSetting = ref(false)
    const loadingTheme = computed(() => store.state.loadingTheme)
    const storeTheme = computed(() => store.state.theme)

    return {
      storeTheme,
      loadingTheme,
      isSetting
    }
  }
})
</script>

<style lang="postcss" scoped>

</style>
