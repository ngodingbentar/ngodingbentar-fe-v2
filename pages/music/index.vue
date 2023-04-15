<template>
  <span>
    <Navbar :theme="myTheme" />
    <div class="main container">
      <div v-if="!globalTop20Done">Loading !!!</div>
      <div v-else>
        <div class="top-global pt-4">
          <div class="flex justify-between mx-2 mb-2">
            <p class="text-xl font-bold ">Global Top 200 Chart</p>
            <nuxt-link to="music/charts/top-200/world" class="text-xl font-bold text-blue-600 ">View All</nuxt-link>
          </div>
          <hr/>
          <div class="top-global-main">
            <TopGlobal :global-top20="globalTop20" @play="play" @pauseAudio="pauseAudio" @playAudio="playAudio" />
          </div>
        </div>

        <div v-if="artisGlobalDone" class="artis-global mt-16">
          <div class="dew">
            <div v-for="(item, index) in artisGlobal" :key="index" class="artis-item">
              <nuxt-link :to="'music/artist/'+item.artists[0].id">
                <div class="flex m-2">
                  <div class="item-title">
                    <div class="image-container">
                      <img :src="item.images.background" alt="img">
                    </div>
                    <p v-if="item.subtitle.length > 20">
                      {{ item.subtitle.substring(0, 20) }}...
                    </p>
                    <p v-else>{{ item.subtitle }}</p>
                  </div>
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>

        <div v-if="discoveryIDDone" class="top-global mt-16">
          <div class="flex justify-between mx-2 mb-2">
            <p class="text-xl font-bold ">Discovery Indonesia Tracks</p>
            <!-- <nuxt-link to="music/charts/top-200/world" class="text-xl font-bold text-blue-600 ">View All</nuxt-link> -->
          </div>
          <hr/>
          <div class="top-global-main">
            <TopGlobal :global-top20="discoveryID" @play="play" @pauseAudio="pauseAudio" @playAudio="playAudio" />
          </div>
        </div>
      </div>
    </div>
    <div class="sikel">
      <div v-if="musicOn" class="sec-audio">
        <div class="this-audio">
          <div>
            <div>
              <p><b>{{ myTitle }}</b></p>
              <p>{{ mySubTitle }}</p>
            </div>
            <audio id="myAudio" :src="myAudio" controls autoplay class="my-audio" />
          </div>
        </div>
      </div>
    </div>
  </span>
</template>

<script>
import { computed, ref, useContext } from '@nuxtjs/composition-api'
import axios from 'axios'
import Navbar from '~/components/music/NavbarComp'
import TopGlobal from '~/components/music/TopGlobal'
export default {
  name: 'Shorten',
  components: {
    Navbar,
    TopGlobal
  },
  setup () {
    const { store } = useContext()
    const search = ref('')
    const discoveryID = ref([])
    const globalTop20 = ref([])
    const artisGlobal = ref([])
    const myText = ref('wadudu')
    const myTrack = ref([])
    const myAudio = ref('')
    const myTitle = ref('')
    const mySubTitle = ref('')
    const musicOn = ref(false)
    const isPlay = ref(false)
    const artisGlobalDone = ref(false)
    const globalTop20Done = ref(false)
    const discoveryIDDone = ref(false)
    const storeTheme = computed(() => store.state.theme)
    const myTheme = {
      background: '#088b71',
      color: 'white',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    }

    getDiscoveryID()
    getGlobalTop20()

    return {
      search,
      discoveryID,
      globalTop20,
      artisGlobal,
      myText,
      myTheme,
      myTrack,
      myAudio,
      mySubTitle,
      myTitle,
      musicOn,
      isPlay,
      storeTheme,
      globalTop20Done,
      artisGlobalDone,
      discoveryIDDone,
      getDiscoveryID,
      getGlobalTop20,
      play,
      playAudio,
      pauseAudio
    }

    function playAudio () {
      const x = document.getElementById('myAudio')
      x.play()
    }

    function pauseAudio () {
      const x = document.getElementById('myAudio')
      x.pause()
    }

    function getUnique (array) {
      const uniqueArray = []
      const dataDew = []
      let i = 0
      for (i; i < array.length; i++) {
        // if (uniqueArray.indexOf(array[i].subtitle) === -1) {
        //   uniqueArray.push(array[i].subtitle)
        //   dataDew.push(array[i])
        // }

        // alternatif dari di atas
        if (!uniqueArray.includes(array[i].subtitle)) {
          uniqueArray.push(array[i].subtitle)
          dataDew.push(array[i])
        }
      }
      return dataDew
    }

    function getArtis () {
      const uniqueNames = getUnique(globalTop20.value)
      artisGlobal.value = uniqueNames
      artisGlobalDone.value = true
    }

    function play (item) {
      isPlay.value = !isPlay.value
      musicOn.value = true
      // myTrack.value = item
      mySubTitle.value = item.subtitle
      myTitle.value = item.title
      myAudio.value = item?.hub?.actions[1]?.uri
      setTimeout(() => {
        playAudio()
      }, 100)
    }

    async function getGlobalTop20 () {
      try {
        const url = 'https://www.nuxt.my.id/api/v1/music/top20/global'
        const result = await axios.get(url)
        console.log('result getGlobalTop20', result)
        if (result?.status === 200) {
          globalTop20.value = result?.data?.tracks
          globalTop20Done.value = true
          getArtis()
        }
      } catch (e) {
        console.log(e)
      }
    }

    async function getDiscoveryID () {
      try {
        const url = 'https://www.nuxt.my.id/api/v1/music/discovery/ID'
        const result = await axios.get(url)
        console.log('getDiscoveryID', result)
        if (result?.status === 200) {
          discoveryID.value = result?.data?.tracks
          discoveryIDDone.value = true
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.sikel {
   position: fixed;
   left: 0;
   bottom: 0;
   width: 100%;
   background-color: #e5e7eb;
   text-align: center;
}
.this-audio{
  @apply justify-items-center mx-auto items-center text-center justify-center flex;
}

.my-audio{
  @apply mb-4;
  width: 80vw;
  /* height: 35px; */
}

.main{
  @apply mt-20 min-h-full ;
}
.top-global-main{
  overflow-x: scroll;
}
.artis-global{
  overflow-x: scroll;
}
.dew{
  @apply flex my-2;
}

.artis-item{
  /* margin: 10px; */
  min-width: 150px;
  max-width: 200px;
}

.image-container{
  width: 100%;
  height: 200px;
  border-radius: 8px;
  border: solid 1px rgba(12,12,12,.1);
  overflow: hidden;
}
.image-container img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}

img.img-top{
  /* width: 100%; */
  max-width: 80px;
  max-height: 80px;
  border-radius: 10px;
}
.number{
  @apply justify-items-center my-auto mx-2;
  max-width: 10px;
}

.item-title{
  @apply my-auto justify-items-center w-full;
}

@media (max-width: 700px) {
}
@media (max-width: 500px) {
}

@media (max-width: 450px) {
  .my-audio{
    height: 35px;
  }
}
</style>
