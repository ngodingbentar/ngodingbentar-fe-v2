<template>
  <div v-if="!loadingTheme" :style="{ background: storeTheme.background, color: storeTheme.color}" class="error min-h-screen text-center justify-center center items-center">
    <div>
      <button class="back focus:outline-none" :style="{ boxShadow: storeTheme.boxShadow }">
        Website belum siap <br/>
        Masih <b>#NgodingBentar</b>
      </button>
    </div>
    <div class="gambar">
      <img :src="background">
    </div>
  </div>
</template>

<script>
import { computed, useContext } from '@nuxtjs/composition-api'
export default {
  layout: 'error', // you can set a custom layout for the error page,
  // eslint-disable-next-line vue/require-prop-types
  props: ['error'],
  setup () {
    const { app, store } = useContext()
    const storeTheme = computed(() => store.state.theme)
    const loadingTheme = computed(() => store.state.loadingTheme)
    const initTheme = computed(() => store.state.initTheme)
    const thisTheme = app.$cookies.get('theme')
    // const background = ref('')

    const background = computed(() => {
      if (storeTheme.value?.darktheme) {
        return '/under.svg'
      } else {
        return '/under.svg'
      }
    })

    if (thisTheme) {
      store.dispatch('getTheme')
    } else {
      store.dispatch('setTheme', initTheme.value)
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
  @apply py-2 px-4 mt-8 mb-16 rounded-xl text-3xl leading-10;
}

.gambar {
  @apply text-center justify-center items-center flex;
  /* min-height:60vh; */
  /* display: flex; */
}
.error {
  @apply pt-16 px-16;
}

.error img {
  /* @apply py-16 mx-40; */
  width: 40%;
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
