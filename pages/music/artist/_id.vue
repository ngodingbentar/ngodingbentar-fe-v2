<template>
  <div>
    <Navbar :theme="myTheme" />
    <div class="main">
      <div v-if="!artistDone" class="pt-8 text-center">
        Loading !!!
      </div>
      <div v-else>
        <div class="section one">
          <div class="be container">
            <div v-if="artistDone">
              <img class="track-img" :src="getAvatar(artistDetail)" alt="img">
            </div>
            <div class="track-text">
              <div v-if="artistDone">
                <p class="text-2xl font-bold text-black">
                  {{ artistDetail.name }}
                </p>
                <p class="font-bold">
                  {{ artistDetail.genres.primary }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="section two container">
          <!-- <button @click="cek">cek</button> -->
          <div class="top-global">
            <div class="flex justify-between mx-2 mb-2">
              <p v-if="artistDone" class="text-xl font-bold ">
                TOP SONGS BY {{ artistDetail.name }}
              </p>
            </div>
            <hr/>
            <div v-if="topTracksDone" class="top-global-main">
              <TopGlobal :global-top20="artistTopTracks" @play="play" @pauseAudio="pauseAudio" @playAudio="playAudio" />
            </div>
          </div>

          <div v-if="artistDescDone" class="mt-8 px-2">
            <div class="flex justify-between mx-2 mb-2">
              <p class="text-xl font-bold ">
                ARTIST BIOGRAPHY
              </p>
            </div>
            <p v-if="isLess" v-html="artistBioData.attributes.artistBio.substring(0, 400)" />
            <p v-if="isMore" v-html="artistBioData.attributes.artistBio" />
            <button v-if="artistBioData.attributes.artistBio.length > 400" class="focus:outline-none text-blue-500 font-bold " @click="setMore">
              <p v-if="isLess">
                View More
              </p>
              <p v-if="isMore">
                View Less
              </p>
            </button>
          </div>

          <div v-if="artistBioDone" class="mt-8">
            <div class="flex justify-between mx-2 mb-2">
              <p class="text-xl font-bold ">
                Discover similar artists on Apple Music
              </p>
            </div>
            <hr/>
            <div class="artis-global">
              <div class="dew">
                <div v-for="(item, index) in similarAartists" :key="index" class="artis-item">
                  <!-- <nuxt-link :to="'music/artist/'+item.artists[0].id"> -->
                  <div class="flex m-2">
                    <a :href="item.attributes.url" target="_blank">
                      <div class="item-title">
                        <div class="image-container">
                          <img :src="getCoverart(item)" alt="img">
                        </div>
                        <p v-if="item.attributes.name.length > 20">
                          <b>{{ item.attributes.name.substring(0, 20) }}...</b>
                        </p>
                        <p v-else>
                          <b>{{ item.attributes.name }}</b>
                        </p>
                      </div>
                    </a>
                  </div>
                  <!-- </nuxt-link> -->
                </div>
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
import { ref, useContext } from '@nuxtjs/composition-api'
import axios from 'axios'
import Navbar from '~/components/music/NavbarComp'
import TopGlobal from '~/components/music/TopGlobal'

export default {
  name: 'MusicId',
  components: {
    Navbar,
    TopGlobal
  },
  setup () {
    const { route } = useContext()
    const artistId = ref(route.value.params.id)
    const artistDetail = ref([])
    const artistBioData = ref([])
    const artistTopTracks = ref([])
    const artistDescDone = ref(false)
    const similarAartists = ref([])
    const artistDone = ref(false)
    const artistBioDone = ref(false)
    const topTracksDone = ref(false)

    const isPlay = ref(false)
    const musicOn = ref(false)
    const myAudio = ref('')
    const myTitle = ref('')
    const mySubTitle = ref('')

    const isMore = ref(false)
    const isLess = ref(true)

    const myTheme = {
      background: '#088b71',
      color: 'white',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    }

    getArtist()

    return {
      myTheme,
      artistDetail,
      artistBioData,
      artistTopTracks,
      similarAartists,
      artistDone,
      artistBioDone,
      topTracksDone,
      artistDescDone,
      isMore,
      isLess,
      isPlay,
      myAudio,
      mySubTitle,
      myTitle,
      musicOn,
      cek,
      getArtist,
      playAudio,
      pauseAudio,
      play,
      getCoverart,
      setMore,
      getAvatar
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

    function getCoverart (item) {
      const str = item?.attributes?.artwork?.url || 'https://res.cloudinary.com/dewaqintoro/image/upload/v1625719164/Ngodingbentar/Music/nocoverart_xsc5u2.jpg'
      const stre = str.replace('{w}', '180')
      const dew = stre.replace('{h}', '180')
      return dew
    }

    function getAvatar (item) {
      const str = item?.avatar || 'https://res.cloudinary.com/dewaqintoro/image/upload/v1625719164/Ngodingbentar/Music/nocoverart_xsc5u2.jpg'
      return str
    }

    function playAudio () {
      // console.log('playAudio')
      const x = document.getElementById('myAudio')
      x.play()
    }

    function pauseAudio () {
      // console.log('pauseAudio')
      const x = document.getElementById('myAudio')
      x.pause()
    }

    function play (item) {
      isPlay.value = !isPlay.value
      musicOn.value = true
      mySubTitle.value = item.subtitle
      myTitle.value = item.title
      myAudio.value = item?.hub?.actions[1]?.uri
      setTimeout(() => {
        playAudio()
      }, 100)
    }

    function cek () {
      console.log('artistDetail.value', artistDetail.value)
    }

    async function getArtist () {
      try {
        const url = `https://vercel-be-v2.vercel.app/api/v1/music/artist/${artistId.value}`
        const result = await axios.get(url)
        // console.log('result', result.data)
        if (result?.status === 200) {
          artistDetail.value = result?.data
          setTimeout(() => {
            artistDone.value = true
          }, 100)
          getArtistBio(result?.data?.adamid)
          getArtistTopTracks()
        }
      } catch (e) {
        console.log(e)
      }
    }

    async function getArtistBio (adamid) {
      try {
        const url = `https://vercel-be-v2.vercel.app/api/v1/music/artist/bio/${adamid}`
        const result = await axios.get(url)
        // console.log('getArtistBio', result?.data?.data[0])
        if (result?.status === 200) {
          artistBioData.value = result?.data?.data[0]
          similarAartists.value = result?.data?.data[0]?.views?.['similar-artists']?.data
          if (result?.data?.data[0]?.attributes?.artistBio) {
            artistDescDone.value = true
          }
          setTimeout(() => {
            artistBioDone.value = true
          }, 100)
        }
      } catch (e) {
        console.log(e)
      }
    }

    async function getArtistTopTracks () {
      try {
        const url = `https://vercel-be-v2.vercel.app/api/v1/music/artisttoptracks/${artistId.value}`
        const result = await axios.get(url)
        // console.log('getArtistTopTracks', result)
        if (result?.status === 200) {
          artistTopTracks.value = result?.data?.tracks
          setTimeout(() => {
            topTracksDone.value = true
          }, 100)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.image-container img{
  width: 150px;
  height: 150px;
  transition: transform 0.8s;
  @apply rounded-full;
}

.image-container img:hover {
  -ms-transform: scale(1.02); /* IE 9 */
  -webkit-transform: scale(1.02); /* Safari 3-8 */
  transform: scale(1.02);
}

.artis-global{
  overflow-x: scroll;
}
.dew{
  @apply flex my-2;
}
.artis-item{
  margin: 0 5px;
  min-width: 180px;
  max-width: 220px;
  text-align: center;
}

.be{
  @apply pt-20;
}
.track-text{
  padding-left: 220px;
}
.ce{
  background: white;
}
.btn-full{
  background-color: #242424;
  cursor: pointer;
  color: white;
  border-radius: 25px;
  max-width: 200px;
  @apply flex p-1 mt-6;
}
.text-playfull{
  letter-spacing: .5px;
  margin-top: 3px;
  text-transform: uppercase;
  @apply flex justify-items-center mx-auto pr-4 ml-2;
}
.btn-full img{
  max-width: 30px !important;
  height: 30px !important;
}
.main{
  @apply pt-16;
  min-height: 100vh;
  background: white;
}

.section-title {
  @apply font-bold text-2xl;
}

.track-title{
  @apply ml-4;
}
.one{
  background: #f7f7f7;
}
.two{
  background: white;
  @apply mt-32;
}

.track-cover{
  @apply flex w-full;
}

.second{
  @apply flex;
}

.second-left {
  @apply w-4/6 pr-4;
}

.second-right {
  @apply w-2/6;
}

.btn-more{
  background: #08f;
  @apply px-4 py-2 rounded-2xl font-bold text-white focus:outline-none;
}

.top-global-main{
  overflow-x: scroll;
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

.track-img{
  min-width: 120px;
  max-width: 200px;
  /* border-radius: 10px; */
  box-shadow: 10px 10px;
  position: absolute;
  transition: transform 0.8s;
  @apply shadow-xl -mt-8 rounded-full;
}

.track-img:hover {
  -ms-transform: scale(1.02); /* IE 9 */
  -webkit-transform: scale(1.02); /* Safari 3-8 */
  transform: scale(1.02);
}

@media (max-width: 450px) {
  .artis-item{
    margin: 0 5px;
    min-width: 140px;
    max-width: 150px;
  }
  .image-container img{
    width: 120px;
    height: 120px;
  }
  .two{
    @apply mt-8;
  }
  .track-cover{
    /* margin-top: -90px; */
    @apply block;
  }
  .section-title {
    @apply text-xl;
  }
  .track-img{
    position: relative;
    @apply flex justify-items-center mx-auto text-center;
  }
  .track-title{
    @apply justify-items-center mx-auto text-center mt-4;
  }
  .btn-full{
    max-width: 55%;
    @apply justify-items-center mx-auto text-center;
  }
  .track-text{
    padding-left: 0px;
    @apply justify-items-center mx-auto text-center mt-8;
  }
  .second{
    @apply block px-2;
  }

  .second-left {
    @apply w-full;
  }

  .second-right {
    @apply w-full mt-8 border-t-2;
  }
}
</style>
