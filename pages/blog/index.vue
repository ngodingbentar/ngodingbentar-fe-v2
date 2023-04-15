<template>
  <span>
    <NavbarComp route="/blog" @tutorial="tutorial" @dosearch="dosearch" />
    <div v-if="!loadingTheme" class="main" :style="{ background: storeTheme.background, color: storeTheme.color, boxShadow: storeTheme.boxShadow }">
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
                  <p class="text-xl font-bold text-left mt-4">
                    {{ blog.title }}
                  </p>
                  <!-- <p class="my-4 text-left" v-html="blog.body.substring(0, 100)+'. . .'"></p> -->
                </div>
                <div class="text-left">
                  <!-- <p class="bg-gray-300 w-full">{{blog.category}}</p> -->
                  <button class="bg-green-500 text-white px-2 rounded-md">{{blog.category}}</button>
                </div>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="text-center">
        <span v-for="i in pages" :key="i">
          <button class="btn-page" :class="{ active: i === page}" @click="changePage(i)">
            {{ i }}
          </button>
        </span>
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
    const { app, store, route } = useContext()
    const searchTitle = ref(route.value?.query?.q || '')
    const pageNumber = ref(route.value?.query?.pageNumber || 1)
    const blogs = ref([])
    const loadingTheme = computed(() => store.state.loadingTheme)
    const storeTheme = computed(() => store.state.theme)
    const pages = ref(0)
    const page = ref(0)
    const loading = ref(true)
    const isEmpty = ref(false)
    const bgId = computed(() => {
      if (storeTheme.value?.darktheme) {
        return 'darkTheme'
      } else {
        return 'lightTheme'
      }
    })
    getData(pageNumber.value)
    // searchFilter(search.value)

    return {
      blogs,
      loadingTheme,
      storeTheme,
      loading,
      bgId,
      isEmpty,
      pages,
      page,
      cek,
      getData,
      tutorial,
      dosearch,
      changePage
    }

    function changePage (e) {
      app.router?.push(`/blog?pageNumber=${e}`)
      getData(e)
    }

    function dosearch (e) {
      console.log('tutorial', e)
      searchTitle.value = e
      getData('')
    }

    function tutorial (e) {
      console.log('tutorial', e)
      // getData(e)
    }

    function cek () {
      console.log('blogs.value', blogs.value)
    }

    async function getData (e) {
      console.log('e', e)
      try {
        const url = `https://vercel-be-v2.vercel.app/api/v1/blog?pageNumber=${e}`
        const result = await axios.get(`${url}`)
        blogs.value = result.data.blogs
        pages.value = result.data.pages
        page.value = result.data.page
        // console.log('result.data', result.data)
        if (result.data.blogs.length === 0) {
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

.active{
  background: blueviolet;
}

.btn-page{
  @apply focus:outline-none px-3 py-2 rounded-md;
}

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
/* .container .box img {
  position: relative;
  max-width: 50px;
  margin-bottom: 10px;
} */

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
