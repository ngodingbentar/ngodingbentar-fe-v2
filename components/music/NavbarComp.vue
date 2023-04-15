<template>
  <header class="app-header font-bold">
    <div class="inner">
      <div class="start">
        <div class="box">
          <nuxt-link class="btn-nav" to="/music">
            <img class="img-nav" src="/iconNew.png">
          </nuxt-link>
        </div>
      </div>

      <div class="end">
        <div class="flex my-search">
          <input
            id="username"
            v-model="search"
            class="input-search focus:outline-none"
            type="search"
            placeholder="Cari Disini. . ."
            @keyup.enter="searchData"
          >
          <button class="focus:outline-none" @click="searchData">
            <font-awesome-icon :icon="['fas', 'search']" />
          </button>
        </div>
      </div>
    </div>
    <div v-if="search" class="hah z-100" @click.self="toHide">
      <div id="divDew" class="result-box">
        <div v-if="!resultDone" class="text-center my-2">
          Loading
        </div>
        <div v-else>
          <p class="text-xl font-bold pl-4 mt-2 text-blue-600 ">
            Songs
          </p>
          <div v-for="(track, index) in resultTracks" :key="index" class="result-item">
            <nuxt-link :to="baseRoute+track.key">
              {{ track.alias }}
            </nuxt-link>
          </div>
          <p class="text-xl font-bold pl-4 mt-2 text-blue-600 ">
            Artists
          </p>
          <div v-for="(artist, index) in resultArtists" :key="'a'+index" class="result-item">
            <nuxt-link :to="baseRouteArtist+artist.id">
              {{ artist.alias }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, useContext, watch } from '@nuxtjs/composition-api'
import axios from 'axios'

export default defineComponent({
  name: 'NavbarComp',
  props: {
    route: {
      type: String,
      required: false,
      default: '/music'
    },
    enable: {
      type: Boolean,
      required: false,
      default: true
    },
    isblogid: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup () {
    const { store, route } = useContext()
    const isSearch = ref(false)
    const routeId = '/blog?category=MERN'
    const search = ref('')
    const baseRoute = ref('')
    const baseRouteArtist = ref('')
    const resultTracks = ref([])
    const resultArtists = ref([])
    const resultDone = ref(false)
    watch(search, () => {
      if (search.value.length === 0) {
        resultDone.value = false
      }
    })

    cekRoute()

    return {
      isSearch,
      routeId,
      search,
      resultTracks,
      resultArtists,
      resultDone,
      baseRoute,
      baseRouteArtist,
      cekData,
      closeModal,
      doSearch,
      cek,
      changetheme,
      searchData,
      toHide
    }

    function toHide () {
      resultDone.value = false
    }

    function cekRoute () {
      // console.log('route', route.value)
      if (route.value.name === 'music') {
        baseRoute.value = 'music/track/'
        baseRouteArtist.value = 'music/artist/'
      }
      if (route.value.name === 'music-track-id') {
        baseRoute.value = '../../music/track/'
        baseRouteArtist.value = '../../music/artist/'
      }
    }

    async function searchData () {
      try {
        const url = `https://vercel-be-v2.vercel.app/api/v1/music/search?q=${search.value}`
        const result = await axios.get(`${url}`)
        if (result?.data) {
          resultTracks.value = result?.data?.tracks?.hits
          resultArtists.value = result?.data?.artists?.hits
          resultDone.value = true
        }
        // console.log('result', result)
      } catch (err) {
        console.log(err)
      }
    }

    function changetheme () {
      console.log('changetheme')
      store.dispatch('changeTheme')
    }

    function cek () {
      // console.log(props)
      console.log('storeTheme')
    }

    function closeModal () {
      isSearch.value = false
    }
    function doSearch () {
      isSearch.value = true
    }
    function cekData () {
    }
  }
})
</script>

<style lang="postcss" scoped>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  /* border: 1px solid green; */
  -webkit-text-fill-color: black;
  /* -webkit-box-shadow: 0 0 0px 1000px #000 inset; */
  transition: background-color 5000s ease-in-out 0s;
}
.hah{
  position: absolute;
  /* background: rgb(255, 228, 228); */
  width: 100%;
  @apply px-16 mt-4 h-screen shadow-lg;
}
.result-box{
  background: white;
  border: 1px solid rgb(197, 197, 197);
  min-width: 40%;
  float: right;
  @apply justify-end rounded-xl;
}
.result-item{
  @apply px-4 py-1;
}
.my-search{
  justify-content: center;
  justify-items: center;
  margin: auto;
  background: rgb(231, 231, 231);
  margin-right: 10px;
  @apply pr-4 pl-4 py-1 rounded-full;
  input{
    background: rgb(231, 231, 231);
  }
}

.my-btn{
  justify-content: center;
  justify-items: center;
  margin: auto;
}
.input-search{
  width: 100%;
  padding: 5px 7px;
  color: black;
}

.box {
  @apply rounded-full flex justify-center;
  padding: 10px;
  font-size: 20px;
  place-items: center;
  text-align: center;
}

.btn-nav {
  width: 25px;
  height: 25px;
}

.inner{
    @apply px-8;
  }

.app-header {
  background: white;
  @apply fixed w-full top-0 py-4;
  @apply z-30 select-none;
  height: var(--header-height);
  min-width: 320px;
  .inner {
    @apply flex flex-wrap justify-between h-full text-xl;
    /* @apply px-8; */
  }
  .start {
    @apply flex items-center;
  }
  .end {
    /* @apply grid grid-flow-col gap-4; */
    @apply flex items-center;
  }
  .line {
    @apply block w-px opacity-50 mr-3;
    height: 32px;
  }
}
@screen mobile {
  .app-header {
    .inner{
      @apply text-base ;
    }
  }
}
@screen sm {
}
@screen md {
  .app-header {
    @apply flex-shrink-0;
    /* @apply relative; */
    /* .inner{
      @apply text-sm;
    } */
  }
}

@media (max-width: 450px) {
  .hah{
    @apply px-2;
  }
  .result-box{
    min-width: 100%;
  }
  .inner{
    @apply px-2;
  }
}
</style>
