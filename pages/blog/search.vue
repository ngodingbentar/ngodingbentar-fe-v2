<template>
  <span>
    <NavbarComp route="/blog" @tutorial="tutorial" @dosearch="dosearch" />
    <div v-if="!loadingTheme" class="main" :style="{ background: storeTheme.background, color: storeTheme.color, boxShadow: storeTheme.boxShadow }">
      <!-- <SearchComp @search="searchFilter" :fields='dataFields' :data='dataDoa'/> -->
      <div class="text-left m-4 px-2">
        <p v-if="searchKey">Menampilkan pencarian : <b>{{searchKey}}</b> </p>
        <p v-else>Menampilkan kategori : <b>{{ categoryKey || 'Semua' }}</b></p>
        <p>{{ blogs.length || 0 }} hasil</p>
      </div>
      <!-- <button @click="cek">cek</button> -->
      <div v-if="loading">
        <Loading :theme="storeTheme" />
      </div>
      <div v-else class="flex">
        <div class="container" :class="bgId">
          <div v-for="blog in blogs" :key="blog._id" class="item">
            <nuxt-link :to="'/blog/'+blog._id">
              <div class="box" :style="{ boxShadow: storeTheme.boxShadow }">
                <div class="content-img">
                  <img class="banner" :src="blog.banner">
                </div>
                <div class="content">
                  <p class="text-xl font-bold text-left mt-4">{{ blog.title }}</p>
                  <p class="my-4 text-left" v-html="blog.body.substring(0, 100)+'. . .'" />
                </div>
                <div class="text-left">
                  <!-- <p class="bg-gray-300 w-full">{{blog.category}}</p> -->
                  <button class="bg-green-500 text-white px-2 rounded-md">{{ blog.category }}</button>
                </div>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>

      <div v-if="isEmpty" class="text-center">
        <p class="font-bold text-2xl ">-- Tidak ada hasil --</p>
      </div>
    </div>
  </span>
</template>

<script>
import axios from 'axios'
import { ref, computed, useContext } from '@nuxtjs/composition-api'
import NavbarComp from '~/components/blog/NavbarComp.vue'

export default {
  name: 'Editor',
  components: {
    NavbarComp
  },
  setup () {
    const { store, route } = useContext()
    const myQuery = ref(route.value?.query?.category || '')
    const searchTitle = ref(route.value?.query?.q || '')
    const blogs = ref([])
    const userInfo = ref({})
    const loadingTheme = computed(() => store.state.loadingTheme)
    const storeTheme = computed(() => store.state.theme)
    const searchKey = ref('')
    const categoryKey = ref('')
    const loading = ref(true)
    const isEmpty = ref(false)
    const bgId = computed(() => {
      if (storeTheme.value?.darktheme) {
        return 'darkTheme'
      } else {
        return 'lightTheme'
      }
    })
    const searchvalue = computed(() => store.state.searchvalue || '')

    local()
    getData(myQuery.value, searchTitle.value)
    // searchFilter(search.value)

    return {
      blogs,
      userInfo,
      loadingTheme,
      storeTheme,
      loading,
      bgId,
      isEmpty,
      searchKey,
      categoryKey,
      cek,
      getData,
      tutorial,
      dosearch
    }

    function dosearch (e) {
      getData('', e)
    }

    function tutorial (c) {
      console.log('tutorial c', c)
      getData(c, '')
    }

    function cek () {
      console.log('searchvalue', searchvalue.value)
    }

    function local () {
      if (typeof window !== 'undefined') {
        const userInfoNB = localStorage.getItem('userInfoNB')
          ? JSON.parse(localStorage.getItem('userInfoNB'))
          : null
        userInfo.value = userInfoNB
      }
    }

    async function getData (c, e) {
      loading.value = true
      const mysearch = e || ''
      searchKey.value = mysearch
      categoryKey.value = c
      try {
        const url = `https://vercel-be-v2.vercel.app/api/v1/blog?category=${c}&q=${mysearch}`
        const result = await axios.get(`${url}`)
        blogs.value = result.data
        if (result.data.length === 0) {
          isEmpty.value = true
        } else {
          isEmpty.value = false
        }
        loading.value = false
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
img.banner{
  width: 100%;
  @apply rounded-xl ;
}

.content-img{
  justify-content: center;
  justify-items: center;
  display: flex;
  margin: auto;
  /* text-align: center; */
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
  max-width: 95%;
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
  /* place-items: center; */
  text-align: center;
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
