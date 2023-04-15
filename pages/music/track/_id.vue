<template>
  <div>
    <Navbar :theme="myTheme" />
    <div class="main">
      <div v-if="!isDOne" class="mt-8 text-center">
        Loading !!!
      </div>
      <div v-else>
        <div class="section one">
          <div class="be container">
            <div v-if="isDOne" class="img-cover">
              <img class="track-img" :src="getCoverart()" alt="img">
            </div>
            <div class="track-text">
              <div v-if="isDOne">
                <p class="text-2xl font-bold text-black">
                  {{ myTrack.title }}
                </p>
                <nuxt-link v-if="artistId" :to="'../../music/artist/'+myTrack.artists[0].id">
                  <p class="font-bold">
                    {{ myTrack.subtitle }}
                  </p>
                </nuxt-link>
                <p v-else class="font-bold">
                  {{ myTrack.subtitle }}
                </p>
                <p>{{ genres }} . {{ trackCount }} Shazams</p>
              </div>
            </div>
          </div>

          <div v-if="isDOne" class="ce">
            <div class="container">
              <div class="track-text">
                <div class="section-btn-full">
                  <a :href="myTrack.hub.options[0].actions[0].uri" target="_blank">
                    <div class="btn-full">
                      <font-awesome-icon class="m-auto" :icon="['fas', 'music']" />
                      <div class="text-playfull">
                        <p>Play Full Song</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="section two container">
          <div class="second">
            <div class="second-left">
              <div v-if="albumDone">
                <p class="section-title">
                  Featured In
                </p>
                <hr class="my-4"/>
                <div class="artis-global">
                  <div class="dew">
                    <div v-for="(item, index) in albumfeaturedin" :key="index" class="artis-item">
                      <a :href="item.attributes.url" target="_blank">
                        <img :src="getImg(item)" alt="img">
                        <p class="uppercase ">
                          {{ item.type }}
                        </p>
                        <p class="text-lg "><b>{{ item.attributes.name }}</b></p>
                        <p class="text-sm">{{ item.attributes.curatorName }}</p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="topTracksDone">
                <p class="section-title mt-8">
                  Top Songs By {{ myTrack.subtitle }}
                </p>
                <hr class="my-4"/>
                <div v-for="(song, index) in artistTopTracks" :key="index" class="my-4">
                  <GlobalComp
                    v-if="index < 5 && isLess"
                    :item="song"
                    :index="index"
                    :route-link="song.key"
                    :show-index="false"
                    @play="play"
                    @pauseAudio="pauseAudio"
                    @playAudio="playAudio"
                  />
                  <GlobalComp
                    v-if="isMore"
                    :item="song"
                    :index="index"
                    :route-link="song.key"
                    :show-index="false"
                    @play="play"
                    @pauseAudio="pauseAudio"
                    @playAudio="playAudio"
                  />
                </div>
                <div v-if="artistTopTracks.length > 5" class="text-center mt-4">
                  <button class="btn-more" @click="setMore()">
                    <p v-if="isMore">
                      Show Less
                    </p>
                    <p v-else>
                      Show More
                    </p>
                  </button>
                </div>
              </div>

              <div v-if="similaritiesDone">
                <p class="section-title mt-8">
                  Similar Songs
                </p>
                <hr class="my-4"/>
                <div v-for="(song, index) in similaritiesTrack" :key="index" class="my-4">
                  <GlobalComp
                    v-if="index < 5 && isLessSimilar"
                    :item="song"
                    :index="index"
                    :route-link="song.key"
                    :show-index="false"
                    @play="play"
                    @pauseAudio="pauseAudio"
                    @playAudio="playAudio"
                  />
                  <GlobalComp
                    v-if="isMoreSimilar"
                    :item="song"
                    :index="index"
                    :route-link="song.key"
                    :show-index="false"
                    @play="play"
                    @pauseAudio="pauseAudio"
                    @playAudio="playAudio"
                  />
                </div>
                <div class="text-center mt-4">
                  <button v-if="similaritiesTrack" class="btn-more" @click="setMoreSimilar()">
                    <p v-if="isMoreSimilar">
                      Show Less
                    </p>
                    <p v-else>
                      Show More
                    </p>
                  </button>
                </div>
              </div>
            </div>
            <div class="second-right">
              <div v-if="isLyric">
                <p class="section-title">
                  Lyrics
                </p>
                <p v-for="(lyric, index) in myLyrics" :key="index">
                  {{ lyric }}
                </p>
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
import GlobalComp from '~/components/music/GlobalComp'

export default {
  name: 'MusicId',
  components: {
    Navbar,
    GlobalComp
  },
  setup () {
    const { route } = useContext()
    const idMusic = ref(route.value.params.id)
    const myTrack = ref([])
    const myLyrics = ref([])
    const artistTopTracks = ref([])
    const similaritiesTrack = ref([])
    const albumfeaturedin = ref([])
    const isDOne = ref(false)
    const topTracksDone = ref(false)
    const albumDone = ref(false)
    const similaritiesDone = ref(false)
    const isLyric = ref(false)
    const trackCount = ref(0)
    const isPlay = ref(false)
    const musicOn = ref(false)
    const myAudio = ref('')
    const myTitle = ref('')
    const mySubTitle = ref('')
    const genres = ref('')
    const isMore = ref(false)
    const isLess = ref(true)
    const isMoreSimilar = ref(false)
    const isLessSimilar = ref(true)
    const artistId = ref(false)
    const myTheme = {
      background: '#088b71',
      color: 'white',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    }

    getMusic()
    getTrackCount()
    getSimilar()

    return {
      myTheme,
      myTrack,
      isDOne,
      isLyric,
      myLyrics,
      trackCount,
      artistTopTracks,
      similaritiesTrack,
      albumfeaturedin,
      topTracksDone,
      similaritiesDone,
      albumDone,
      isPlay,
      myAudio,
      mySubTitle,
      myTitle,
      musicOn,
      isMore,
      isLess,
      isMoreSimilar,
      isLessSimilar,
      genres,
      artistId,
      cek,
      playAudio,
      pauseAudio,
      play,
      setMore,
      setMoreSimilar,
      getImg,
      getCoverart
    }

    function cek () {
      console.log('myTrack', myTrack.value.artists)
    }

    function getImg (item) {
      const str = item.attributes?.artwork?.url || 'https://res.cloudinary.com/dewaqintoro/image/upload/v1625719164/Ngodingbentar/Music/nocoverart_xsc5u2.jpg'
      const stre = str.replace('{w}', '400')
      const dew = stre.replace('{h}', '400')
      return dew
    }

    function getCoverart () {
      const str = myTrack.value?.images?.coverart || 'https://res.cloudinary.com/dewaqintoro/image/upload/v1625719164/Ngodingbentar/Music/nocoverart_xsc5u2.jpg'
      const stre = str.replace('{w}', '400')
      const dew = stre.replace('{h}', '400')
      return dew
    }

    async function getAlbumfeaturedin () {
      try {
        const url = `https://vercel-be-v2.vercel.app/api/v1/music/albumfeaturedin/${myTrack.value.albumadamid}`
        const result = await axios.get(url)
        if (result?.status === 200) {
          if (result?.data?.name === 'Error') {
            albumDone.value = false
          } else {
            albumfeaturedin.value = result?.data
            setTimeout(() => {
              albumDone.value = true
            }, 100)
          }
        }
      } catch (e) {
        console.log(e)
      }
    }

    async function getSimilar () {
      try {
        const url = `https://vercel-be-v2.vercel.app/api/v1/music/track/similarities/${idMusic.value}`
        const result = await axios.get(url)
        // console.log('result', result)
        if (result?.status === 200) {
          similaritiesTrack.value = result?.data?.tracks
          setTimeout(() => {
            similaritiesDone.value = true
          }, 100)
        }
      } catch (e) {
        console.log(e)
      }
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

    function setMoreSimilar () {
      if (isMoreSimilar.value === true) {
        isMoreSimilar.value = false
        isLessSimilar.value = true
      } else {
        isMoreSimilar.value = true
        isLessSimilar.value = false
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
      // console.log('item', item)
      isPlay.value = !isPlay.value
      musicOn.value = true
      mySubTitle.value = item.subtitle
      myTitle.value = item.title
      myAudio.value = item?.hub?.actions[1]?.uri
      setTimeout(() => {
        playAudio()
      }, 100)
    }

    async function getMusic () {
      try {
        const url = `https://vercel-be-v2.vercel.app/api/v1/music/track/${idMusic.value}`
        const result = await axios.get(url)
        // console.log('result', result.data)
        if (result?.status === 200) {
          myTrack.value = result?.data
          genres.value = result?.data?.genres?.primary || ''
          if (result?.data?.artists) {
            artistId.value = true
          }
          if (result?.data?.sections[1].text) {
            myLyrics.value = result?.data?.sections[1].text
            setTimeout(() => {
              isLyric.value = true
            }, 100)
          }
          setTimeout(() => {
            isDOne.value = true
            getArtistTopTracks()
            getAlbumfeaturedin()
          }, 100)
        }
      } catch (e) {
        console.log(e)
      }
    }

    async function getTrackCount () {
      try {
        const url = `https://vercel-be-v2.vercel.app/api/v1/music/count/${idMusic.value}`
        const result = await axios.get(url)
        // console.log('result', result)
        if (result?.status === 200) {
          trackCount.value = result?.data?.total
        }
      } catch (e) {
        console.log(e)
      }
    }

    async function getArtistTopTracks () {
      try {
        const idArtist = myTrack.value?.artists[0]?.id
        const url = `https://vercel-be-v2.vercel.app/api/v1/music/artisttoptracks/${idArtist}`
        const result = await axios.get(url)
        // console.log('result', result)
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
}

.artis-item img{
  border-radius: 10px;
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
  @apply mt-16;
}

.atas{
  @apply flex w-full;
}
.track-cover{
  @apply flex w-full;
}
.img-cover img{
  min-width: 120px;
  max-width: 200px;
  border-radius: 10px;
  box-shadow: 10px 10px;
  position: absolute;
  @apply shadow-xl -mt-8;
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
  transition: transform 0.8s;
}

.track-img:hover {
  -ms-transform: scale(1.02); /* IE 9 */
  -webkit-transform: scale(1.02); /* Safari 3-8 */
  transform: scale(1.02);
}

@media (max-width: 450px) {
  .track-cover{
    /* margin-top: -90px; */
    @apply block;
  }
  .section-title {
    @apply text-xl;
  }
  .img-cover img{
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
