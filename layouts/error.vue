<template>
  <div v-if="!loadingTheme" :style="{ background: storeTheme.background, color: storeTheme.color}" class="error min-h-screen text-center justify-center center items-center">
    <div>
      <NuxtLink to="/">
        <button class="back focus:outline-none" :style="{ boxShadow: storeTheme.boxShadow }">
          Home Page
        </button>
      </NuxtLink>
    </div>
    <div class="gambar text-center justify-center center items-center">
      <img :src="background">
    </div>
  </div>
</template>

<script>
import { computed, useContext } from '@nuxtjs/composition-api'
export default {
  layout: 'error',
  // eslint-disable-next-line vue/require-prop-types
  props: ['error'],
  setup () {
    const { app, store } = useContext()
    const storeTheme = computed(() => store.state.theme)
    const loadingTheme = computed(() => store.state.loadingTheme)
    const thisTheme = app.$cookies.get('theme')
    // const background = ref('')

    const background = computed(() => {
      if (storeTheme.value?.darktheme) {
        return '/404dark2.svg'
      } else {
        return '/404light.svg'
      }
    })

    if (thisTheme) {
      store.dispatch('getTheme')
    } else {
      store.dispatch('setTheme')
    }

    return {
      loadingTheme,
      background,
      storeTheme,
      cek
    }

    function cek () {
      console.log(loadingTheme)
      console.log('background', background)
    }
  }
}
</script>

<style lang="postcss" scoped>
.back {
  @apply py-2 px-4 mt-8 mb-16 rounded-xl text-xl;
}

.gambar {
  display: flex;
}
.error {
  @apply pt-16 px-16;
}

.error img {
  /* @apply py-16 mx-40; */
  width: 60%;
  /* max-width: 700px; */
}
.darkTheme{
  /* color: rgb(61, 81, 94); */
  .box:hover{
    background: rgb(61, 81, 94);
  }
}
.lightTheme{
  .box:hover {
    background: #f1f1f1;
  }
}

@screen tablet {
  .main {
    @apply pt-28;
  }
}
@screen mobile {
  .error {
    @apply px-2;
  }
  .back {
    @apply mt-0 mb-8 rounded-xl text-sm;
  }

}
</style>
