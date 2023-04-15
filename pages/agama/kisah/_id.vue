<template>
  <span>
    <Navbar to="/agama" />
    <div v-if="!loadingTheme" class="main font-arabic" :style="{ background: storeTheme.background, color: storeTheme.color }">
      <div class="back">
        <div class="btn-back" :style="{ boxShadow: storeTheme.boxShadow }">
          <nuxt-link to="/agama/kisah">
            <font-awesome-icon :icon="['fas', 'arrow-left']" />
          </nuxt-link>
        </div>
      </div>
      <div v-if="loading">
        <Loading :theme="storeTheme" />
      </div>
      <div v-else class="content" :style="{ boxShadow: storeTheme.boxShadow }">
        <p class="text-2xl font-bold">Nama : {{ nabi.nama }}</p>
        <!-- <p>Lahir : {{nabi.lahir}}</p> -->
        <p class="text-xl font-bold">Tempat diutus: {{ nabi.tempat }}</p>
        <br/>
        <hr/>
        <div class="kisah text-xl">
          {{ nabi.kisah }}
        </div>
      </div>
    </div>
  </span>
</template>
<script>
import { ref, useContext, computed } from '@nuxtjs/composition-api'
import Loading from '@/components/Loading.vue'
import axios from 'axios'
import Navbar from '~/components/Navbar.vue'

export default {
  name: 'Surah',
  components: {
    Navbar,
    Loading
  },
  setup () {
    const { route, store } = useContext()
    const params = route.value?.params?.id
    getKisah()
    const nabi = ref([])
    const loading = ref(true)
    const loadingTheme = computed(() => store.state.loadingTheme)
    const storeTheme = computed(() => store.state.theme)

    if (process.browser) {
      window.smoothscroll = () => {
        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop
        if (currentScroll > 0) {
          window.requestAnimationFrame(window.smoothscroll)
          window.scrollTo(0, Math.floor(currentScroll - (currentScroll / 5)))
        }
      }
    }

    return {
      nabi,
      storeTheme,
      loading,
      loadingTheme
    }

    async function getKisah () {
      console.log('params', params)
      try {
        const url = `https://kisahnabi-api-zhirrr.vercel.app/api/searchnabi?q=${params}`
        const result = await axios.get(url)
        nabi.value = result?.data?.nabi
        if (result?.data?.nabi) {
          loading.value = false
        }
        // console.log('result', result?.data?.nabi)
      } catch (err) {
        console.log('err', err)
      }
    }
  }
}
</script>
<style lang="postcss" scoped>
/* body{ white-space:pre-wrap; } */
.kisah{
  white-space: pre-line
}
.back {
  @apply ml-8 pb-8;
  font-size:22px;
}
.btn-back {
  @apply items-center text-center justify-center rounded-full;
  width: 40px;
  height: 40px;
}
.main {
  @apply min-h-screen pb-20 pt-28;
}
.content{
  /* background: red; */
  @apply mx-16 p-4;
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
  @apply px-8 mx-36;
}
@screen tablet {
  .content {
    @apply mx-8;
  }
}
@screen mobile {
  .main {
    @apply pt-8;
  }
  .item {
    @apply mx-2 px-2;
  }
  .back {
    @apply pt-16;
  }
  .content {
    @apply mx-4;
  }
  .back {
    @apply ml-4;
  }
}
</style>
