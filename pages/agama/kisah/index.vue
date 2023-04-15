<template>
  <span>
    <Navbar to="/agama" />
    <div v-if="!loadingTheme" class="main text-center" :style="{ background: storeTheme.background, color: storeTheme.color }">
      <div class="font-arabic">
        <div v-if="loading">
          <Loading :theme="storeTheme" />
        </div>
        <div v-else>
          <div v-for="(doa, index) in dataDoa" :key="index" class="item">
            <nuxt-link :to="'/agama/kisah/'+doa.key">
              <Cardcomp :theme="storeTheme" :doa="doa" />
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </span>
</template>

<script>
import { computed, ref, useContext } from '@nuxtjs/composition-api'
import Loading from '@/components/Loading.vue'
import Navbar from '~/components/Navbar.vue'
import dataJson from '~/data/nabi.json'
import Cardcomp from '~/components/kisah/kisahCardComp'

export default {
  name: 'Wirid',
  components: {
    Navbar,
    Loading,
    Cardcomp
  },
  setup () {
    const { store } = useContext()
    const dataDoa = dataJson.data
    const loadingTheme = computed(() => store.state.loadingTheme)
    const loading = ref(true)
    const storeTheme = computed(() => store.state.theme)

    setLoading()

    return {
      storeTheme,
      loadingTheme,
      loading,
      dataDoa
    }

    function setLoading () {
      setTimeout(function () {
        loading.value = false
      }, 200)
    }
  }
}
</script>

<style lang="postcss" scoped>
.darkTheme{
  /* color: rgb(61, 81, 94); */
  .card:hover{
    background: rgb(61, 81, 94);
  }
}
.lightTheme{
  .card:hover {
    background: #f1f1f1;
  }
}
.main {
  @apply pt-24 min-h-screen pb-8;
}
@font-face {
  font-family: "lpmq";
  src: url(/fonts/lpmq.otf) format("opentype");
  font-display: swap;
}
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
.font-arabic{
  font-family: "lpmq", Arial, sans-serif;
  line-height: 2;
}
.item {
  @apply px-8 mx-36 my-4;
}
.card {
  @apply text-3xl p-4 rounded-lg;
}
@screen tablet {
  .main {
    @apply pt-28;
  }
}
@screen mobile {
  .main {
    @apply pt-20;
  }
  .item {
    @apply mx-2 px-2;
  }
}
</style>
