<template>
  <div>
    <Navbar :theme="myTheme" />
    <div v-if="!isDOne" class="pt-24 text-center">
      Loading !!!
    </div>
    <div v-else>
      <div class="header">
        <div class="container p-4">
          <p><b>GLOBAL</b></p>
          <p class="text-2xl font-bold">
            Top 200
          </p>
          <p>The most Shazamed tracks in the world this week</p>
        </div>
      </div>
      <div class="main container">
        <div class="content">
          <div class="section one">
            <div v-if="isDOne" class="two-top">
              <img :src="getMyImg()">
              <div class="px-8 py-4">
                <p><b>#1</b> Top 200</p>
                <p class="text-xl font-bold">
                  {{ imgTop.title }}
                </p>
                <p>{{ imgTop.subtitle }}</p>
              </div>
            </div>
          </div>
          <div class="section">
            <div class="dew">
              <div class="item">
                <div v-for="(item, index) in globalTop200" :key="index">
                  <Top200Global
                    v-if="index < 20 && isLess"
                    :item="item"
                    :index="index"
                    @play="play"
                    @pauseAudio="pauseAudio"
                    @playAudio="playAudio"
                  />
                  <Top200Global
                    v-if="isMore"
                    :item="item"
                    :index="index"
                    @play="play"
                    @pauseAudio="pauseAudio"
                    @playAudio="playAudio"
                  />
                </div>
              </div>
            </div>
            <div class="text-center mt-4">
              <button v-if="isDOne" class="btn-more" @click="setMore()">
                <p v-if="isMore">
                  Show Less
                </p>
                <p v-else>
                  Show More
                </p>
              </button>
            </div>
          </div>
          <div class="section two">
            <div v-if="isDOne" class="two-top">
              <img :src="getMyImg()">
              <div class="px-8 py-4">
                <p><b>#1</b> Top 200</p>
                <p class="text-xl font-bold">
                  {{ imgTop.title }}
                </p>
                <p>{{ imgTop.subtitle }}</p>
              </div>
            </div>
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
  </div>
</template>

<script>
import { ref } from '@nuxtjs/composition-api'
import axios from 'axios'
import Navbar from '~/components/music/NavbarComp'
import Top200Global from '~/components/music/Top200Global'

export default {
  name: 'MusicId',
  components: {
    Navbar,
    Top200Global
  },
  setup () {
    const imgTop = ref([])
    const isDOne = ref(false)
    const isPlay = ref(false)
    const musicOn = ref(false)
    const myAudio = ref('')
    const myTitle = ref('')
    const mySubTitle = ref('')
    const myTrack = ref([])
    const globalTop20 = ref([])
    const globalTop200 = ref([])
    const isMore = ref(false)
    const isLess = ref(true)

    const myTheme = {
      background: '#088b71',
      color: 'white',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    }

    // getGlobalTop20()
    getGlobalTop200()

    return {
      myTheme,
      globalTop20,
      globalTop200,
      isDOne,
      isPlay,
      myTrack,
      myAudio,
      mySubTitle,
      myTitle,
      musicOn,
      imgTop,
      isMore,
      isLess,
      cek,
      playAudio,
      pauseAudio,
      play,
      getMyImg,
      setMore
    }

    function setMore () {
      if (isMore.value === true) {
        isMore.value = false
        isLess.value = true
      } else {
        isMore.value = true
        isLess.value = false
      }
    }

    function cek () {
      console.log('imgTop.value ', imgTop.value)
      // console.log('globalTop200.value ',globalTop200.value[0] )
    }

    function getMyImg () {
      const myImg = globalTop200.value[0].images.coverart || 'https://is3-ssl.mzstatic.com/image/thumb/Music125/v4/aa/02/57/aa025710-a0c6-90e9-4a18-2881efad4855/190296614316.jpg/400x400cc.jpg'

      console.log('myImg', myImg)
      return myImg
    }

    async function getGlobalTop200 () {
      try {
        const url = 'https://www.nuxt.my.id/api/v1/music/top200/global'
        const result = await axios.get(url)
        // console.log('result', result)
        if (result?.status === 200) {
          globalTop200.value = result?.data?.tracks
          imgTop.value = result?.data?.tracks[0]
          setTimeout(() => {
            isDOne.value = true
          }, 300)
          // console.log(result?.data?.tracks[0].images.coverart)
        }
      } catch (e) {
        console.log(e)
        // discoveryID_error.value = "Gagal memuat data"
      }
    }

    function playAudio () {
      const x = document.getElementById('myAudio')
      x.play()
    }

    function pauseAudio () {
      const x = document.getElementById('myAudio')
      x.pause()
    }

    function play (item) {
      isPlay.value = !isPlay.value
      musicOn.value = true
      myTrack.value = item
      mySubTitle.value = item.subtitle
      myTitle.value = item.title
      myAudio.value = item?.hub?.actions[1]?.uri
      setTimeout(() => {
        playAudio()
      }, 100)
    }
  }
}
</script>
<style lang="postcss" scoped>
.main{
  @apply p-2 min-h-screen;
}
.content{
  @apply flex;
}
.header{
  background: #f7f7f7;
  @apply pt-20;
}
.section{
  @apply w-1/2;
}

.one{
  display: none;
}
.two {
  padding-left: 1rem;
}

.two-top{
  background-color: #616e73;
  color: white;
  min-height: 300px;
  width: 90%;
  border-radius: 20px;
  @apply pt-8;
}

.two-top img{
  max-width: 200px;
  border-radius: 10px;
  @apply justify-items-center flex mx-auto;
}

.btn-more{
  background: #08f;
  @apply px-4 py-2 rounded-2xl font-bold text-white focus:outline-none;
}

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

@media (max-width: 450px) {
  .content{
    @apply block;
  }
  .section{
    @apply w-full;
  }
  .two{
    display: none;
  }
  .one{
    display: block;
    @apply mb-4;
  }
  .two-top{
    width: 100%;
  }
}
</style>
