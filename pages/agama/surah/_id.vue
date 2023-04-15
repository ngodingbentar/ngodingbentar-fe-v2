<template>
  <span>
    <Navbar to="/agama" />
    <div v-if="!loadingTheme" class="main font-arabic" :style="{ background: storeTheme.background, color: storeTheme.color }">
      <div v-if="loading">
        <Loading :theme="storeTheme" />
      </div>
      <div v-else class="content">
        <BackComp :theme="storeTheme" route="/agama/surah" class="mb-4" />
        <Headerquran :surah="surah" :theme="storeTheme" />
        <div v-for="(surat, index) in pageOfItems" :key="index" class="item">
          <Cardcomp
            :theme="storeTheme"
            :index="index"
            :surat="surat"
            :surah="surah"
            :arti="surah.translations.id.text[surat[0]]"
            :audio="setAudio(surat[0])"
          />
        </div>
      </div>
      <div class="text-center py-3">
        <jw-pagination :items="newSurah" @changePage="onChangePage" />
      </div>
    </div>
  </span>
</template>
<script>
import { ref, useContext, computed } from '@nuxtjs/composition-api'
import Loading from '@/components/Loading.vue'
import BackComp from '@/components/BackComp'
import Headerquran from '~/components/quran/Headerquran.vue'
import Cardcomp from '~/components/quran/Cardcomp.vue'
import Navbar from '~/components/Navbar.vue'
export default {
  name: 'Surah',
  components: {
    Headerquran,
    Navbar,
    Cardcomp,
    Loading,
    BackComp
  },
  setup () {
    const { route, store } = useContext()
    const idParams = route.value?.params?.id
    getSurah()
    const surah = ref({})
    const loading = ref(true)
    const loadingTheme = computed(() => store.state.loadingTheme)
    const storeTheme = computed(() => store.state.theme)
    const newSurah = ref([])
    const pageOfItems = ref([])

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
      surah,
      newSurah,
      pageOfItems,
      storeTheme,
      loading,
      loadingTheme,
      cek,
      onChangePage,
      setAudio
    }

    function setAudio (id) {
      let data = ref('')
      let idSuray = ref('')
      if (id.length === 1) {
        data = `00${id}`
      } else if (id.length === 2) {
        data = `0${id}`
      } else {
        data = id
      }

      if (idParams.length === 1) {
        idSuray = `00${idParams}`
      } else if (idParams.length === 2) {
        idSuray = `0${idParams}`
      } else {
        idSuray = idParams
      }
      const result = ref(`https://quran.kemenag.go.id/cmsq/source/s01/${idSuray}${data}.mp3`)
      return result
    }

    function cek () {
      console.log('newSurah', newSurah.value)
      console.log('pageOfItems', pageOfItems.value)
      console.log('surah.translations.id.text', surah.value.translations.id.text)
    }

    function onChangePage (data) {
      pageOfItems.value = data
      window.smoothscroll()
    }
    function getNewSurah () {
      const obj2 = surah.value?.text
      const result2 = Object.entries(obj2)
      newSurah.value = result2
      setTimeout(() => {
        loading.value = false
      }, 500)
    }

    async function getSurah () {
      const resp = await import(`~/data/surah/${idParams}.json`)
      surah.value = resp[idParams]
      getNewSurah()
    }
  }
}
</script>
<style lang="postcss" scoped>
.main {
  @apply min-h-screen pb-20 pt-20;
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
    @apply pt-4;
  }
}
@screen mobile {
  .main {
    @apply pt-8;
  }
  .item {
    @apply mx-2 px-2;
  }
  .content {
    @apply pt-12;
  }
}
</style>
