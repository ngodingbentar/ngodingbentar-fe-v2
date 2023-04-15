<template >
  <span>
    <Navbar to="/agama" />
    <div v-if="!loadingTheme" class="main" :style="{ background: storeTheme.background, color: storeTheme.color, boxShadow: storeTheme.boxShadow }">
      <SearchComp :fields="dataFields" :data="dataDoa" @search="searchFilter" />
      <div v-if="loading">
        <Loading :theme="storeTheme" />
      </div>
      <div v-else class="flex">
        <div class="container" :class="bgId">
          <div v-for="(doa, index) in allData" :key="index" class="item">
            <div class="box" :style="{ boxShadow: storeTheme.boxShadow }">
              <div class="content items-center">
                <p class="font-arabic text-3xl">{{doa.arabic}}</p>
                <p class="my-4">{{doa.latin}}</p>
                <hr class="garis" />
                <p class="arti text-lg"><i>{{ doa.translation_id }}</i></p>
              </div>
            </div>
          </div>
        </div>
        <div class="footer"></div>
      </div>
    </div>
  </span>
</template>

<script>
import { computed, ref, useContext } from '@nuxtjs/composition-api'
import Loading from '@/components/Loading.vue'
import Navbar from '~/components/Navbar.vue'
import dataJson from '~/data/asmaul-husna.json'
import SearchComp from '~/components/SearchNewComp.vue'

export default {
  name: 'AsmaulHusna',
  components: {
    Navbar,
    Loading,
    SearchComp
  },
  setup () {
    const { store } = useContext()
    const dataDoa = dataJson.data
    const allData = ref([])
    const loadingTheme = computed(() => store.state.loadingTheme)
    const loading = ref(true)
    const storeTheme = computed(() => store.state.theme)
    const search = ref('')
    const dataFields = { value: 'latin' }
    const bgId = computed(() => {
      if (storeTheme.value?.darktheme) {
        return 'darkTheme'
      } else {
        return 'lightTheme'
      }
    })

    // setLoading()
    searchFilter(search.value)

    return {
      storeTheme,
      allData,
      bgId,
      search,
      dataFields,
      loadingTheme,
      loading,
      dataDoa,
      searchFilter
    }

    function searchFilter (dataSearch) {
      if (dataSearch === null) {
        dataSearch = ''
      }
      setTimeout(function () {
        const result = dataDoa.filter(doa =>
          doa.latin.toLowerCase().includes(dataSearch.toLowerCase())
        )
        allData.value = result
        loading.value = false
      }, 200)
    }
  }
}
</script>

<style lang="postcss" scoped>
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

.main {
  @apply pt-16 min-h-screen pb-8 mt-8 px-16;
  justify-content: center;
  align-self: center;
}

.item {
  @apply px-2;
}

.garis {
  border-top-width: 2px;
  padding-bottom: 10px;
}
.arti {
  position: relative;
}
.content {
  max-width: 80%;
}

.container {
  position: relative;
  max-width: 100%;
  display: grid;
  /* grid-template-columns: repeat(auto-fill, minmax(40%, 1fr)); */
  grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  grid-template-rows: repeat(minmax(100px, auto));
  margin: 40px;
  grid-auto-flow: dense;
  grid-gap: 20px;
}

.container .box {
  @apply rounded-2xl;
  padding: 20px;
  display: grid;
  font-size: 20px;
  place-items: center;
  text-align: center;
}

.container .box img {
  position: relative;
  max-width: 50px;
  margin-bottom: 10px;
}

.container {
  margin: 20px;
}
.container .box:nth-child(1){
  grid-column: span 2;
  grid-row: span 1;
}
.container .box:nth-child(2){
  grid-column: span 1;
  grid-row: span 1;
}
.container .box:nth-child(3){
  grid-column: span 1;
  grid-row: span 2;
}
.container .box:nth-child(4){
  grid-column: span 1;
  grid-row: span 2;
}
.container .box:nth-child(5){
}

.footer {
  height: 70px;
}

@screen tablet {
.container {
    grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  }
}
@screen mobile {
  .main {
    @apply pt-10 px-2;
  }
  .container {
    grid-template-columns: repeat(auto-fill, minmax(40%, 1fr));
  }
}

@media only screen and (max-width: 420px) {
  .container {
    grid-template-columns: repeat(auto-fill, minmax(80%, 1fr));
  }
}
</style>
