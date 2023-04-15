<template>
  <div>
    <Navbar :theme="myTheme" @searchData="doSearch" />
    <button class="mt-36" @click="cek">
      cek
    </button>
    <div>
      <p>Tracks</p>
      <div v-if="resultDone">
        <div v-for="(track, index) in resultTracks" :key="index">
          <p> {{ track.alias }} </p>
        </div>
      </div>
    </div>

    <div>
      <p>Artist</p>
      <div v-if="resultDone">
        <div v-for="(track, index) in resultArtists" :key="index">
          <p> {{ track.alias }} </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, useContext } from '@nuxtjs/composition-api'
import axios from 'axios'
import Navbar from '~/components/music/NavbarComp'

export default {
  name: 'MusicId',
  components: {
    Navbar
  },
  setup () {
    const { route } = useContext()
    const resultTracks = ref([])
    const resultArtists = ref([])
    const resultDone = ref(false)
    const myTheme = {
      background: '#088b71',
      color: 'white',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    }

    doSearch()

    return {
      myTheme,
      resultTracks,
      resultArtists,
      resultDone,
      cek,
      doSearch,
      searchData
    }
    function cek () {
      console.log('route.1', route.value.query.q)
    }
    function doSearch () {
      resultDone.value = false
      setTimeout(() => {
        searchData()
      }, 100)
    }
    async function searchData () {
      try {
        const url = `https://vercel-be-v2.vercel.app/api/v1/music/search?q=${route.value.query.q}`
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
  }
}
</script>
<style lang="postcss" scoped>
</style>
