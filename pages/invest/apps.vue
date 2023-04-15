<template>
  <span>
    <Navbar route="/invest" />
    <div
      v-if="!loadingTheme"
      class="main text-center"
      :style="{ background: storeTheme.background, color: storeTheme.color }"
    >
      <SearchComp :fields="dataFields" :data="dataDoa.apps" @search="searchFilter" />
      <div class="item text-center">
        <p class="sum" :style="{ boxShadow: storeTheme.boxShadow }">
          {{ allData.length }} data
        </p>
      </div>
      <div class="min-h-screen font-arabic">
        <div v-if="loading">
          <Loading :theme="storeTheme" />
        </div>
        <div v-else>
          <div v-for="(item, index) in pageOfItems" :key="index" class="item">
            <Cardcomp product="apps" :theme="storeTheme" :item="item" />
          </div>
        </div>
        <div v-if="pageOfItems.length === 0" class="text-center text-2xl font-bold mt-16">
          --- Data tidak ditemukan ---
        </div>
        <div class="text-center py-3">
          <jw-pagination :items="allData" @changePage="onChangePage" />
        </div>
      </div>
    </div>
  </span>
</template>

<script>
import { computed, ref, useContext } from '@nuxtjs/composition-api'
import Loading from '@/components/Loading.vue'
import Navbar from '~/components/Navbar.vue'
import dataJson from '~/data/apps.json'
import Cardcomp from '~/components/invest/reksadanaCardComp.vue'
import SearchComp from '~/components/SearchNewComp.vue'

export default {
  name: 'DoaHarian',
  components: {
    Navbar,
    Loading,
    Cardcomp,
    SearchComp
  },
  setup () {
    const { store } = useContext()
    const dataDoa = dataJson.data
    const search = ref('')
    const allData = ref([])
    const pageOfItems = ref([])
    const loadingTheme = computed(() => store.state.loadingTheme)
    const loading = ref(true)
    const storeTheme = computed(() => store.state.theme)
    const dataFields = { value: 'name' }
    const bgId = computed(() => {
      if (storeTheme.value?.darktheme) {
        return 'darkTheme'
      } else {
        return 'lightTheme'
      }
    })
    if (process.browser) {
      window.smoothscroll = () => {
        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop
        if (currentScroll > 0) {
          window.requestAnimationFrame(window.smoothscroll)
          window.scrollTo(0, Math.floor(currentScroll - (currentScroll / 5)))
        }
      }
    }

    setTimeout(function () {
      loading.value = false
    }, 500)

    searchFilter(search.value)
    // searchFilter()

    return {
      search,
      allData,
      dataFields,
      storeTheme,
      pageOfItems,
      loadingTheme,
      loading,
      dataDoa,
      onChangePage,
      searchFilter,
      bgId
    }

    function searchFilter (data) {
      if (data === null) {
        data = ''
      }
      const result = dataDoa.apps.filter(item =>
        item.name.toLowerCase().includes(data.toLowerCase())
      )
      allData.value = result
    }

    function onChangePage (data) {
      pageOfItems.value = data
      window.smoothscroll()
    }
  }
}
</script>

<style lang="postcss" scoped>
.sum {
  @apply py-2 px-4 rounded-lg;
  max-width: 120px;
}
.main {
  @apply pt-24 min-h-screen;
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
