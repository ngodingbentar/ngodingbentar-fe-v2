<template>
  <span class="flex">
    <div v-if="showIndex" class="number">
      <p> {{ index+1 }} </p>
    </div>
    <div class="dew-img">
      <div class="img-top">
        <img :src="getImg(item)" alt="img">
      </div>
      <div>
        <button class="centerItem focus:outline-none" @click="play">
          <font-awesome-icon v-if="isPlay" :icon="['fas', 'pause']" />
          <font-awesome-icon v-else :icon="['fas', 'play']" />
        </button>
      </div>
    </div>
    <!-- </nuxt-link> -->
    <div class="item-title besar">
      <nuxt-link :to="baseRoute+item.key">
        <p v-if="item.title.length > 40" class="font-bold">
          {{ item.title.substring(0, 40) }}
        </p>
        <p v-else class="font-bold">{{ item.title }}</p>
      </nuxt-link>
      <nuxt-link v-if="artistId" :to="baseRouteArtist+item.artists[0].id">
        <p v-if="item.subtitle.length > 40">{{ item.subtitle.substring(0, 40) }} ...</p>
        <p v-else>{{ item.subtitle }}</p>
      </nuxt-link>
      <span v-else>
        <p v-if="item.subtitle.length > 40">{{ item.subtitle.substring(0, 40) }} ...</p>
        <p v-else>{{ item.subtitle }}</p>
      </span>
      <!-- <button class="btn-nav focus:outline-none" @click="play(item)" >
        <font-awesome-icon v-if="isPlay" :icon="['fas', 'pause']" />
        <font-awesome-icon v-else :icon="['fas', 'play']" />
      </button> -->
      <div>
        <a :href="item.hub.options[0].actions[0].uri" target="_blank">
          <div class="apple">
            <font-awesome-icon :icon="['fab', 'apple']" />
            <span>Music</span>
          </div>
        </a>
      </div>
    </div>
    <div class="item-title kecil">
      <nuxt-link :to="baseRoute+item.key">
        <p v-if="item.title.length > 15" class="font-bold">{{ item.title.substring(0, 15) }}</p>
        <p v-else class="font-bold"> {{ item.title }} </p>
        <p v-if="item.subtitle.length > 15">{{ item.subtitle.substring(0, 15) }} ...</p>
        <p v-else>{{ item.subtitle }}</p>
      </nuxt-link>
      <!-- <button class="btn-nav focus:outline-none" @click="play" >
        <font-awesome-icon v-if="isPlay" :icon="['fas', 'pause']" />
        <font-awesome-icon v-else :icon="['fas', 'play']" />
      </button> -->
    </div>
  </span>
</template>

<script>
import { ref, useContext } from '@nuxtjs/composition-api'

export default {
  name: 'GlobalComp',
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    routeLink: {
      type: String,
      required: true,
      default: '/'
    },
    showIndex: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  setup (props, { emit }) {
    const { route } = useContext()
    const baseRoute = ref('')
    const baseRouteArtist = ref('')
    const isPlay = ref(false)
    const artistId = ref(false)

    cekRoute()
    return {
      isPlay,
      baseRoute,
      baseRouteArtist,
      artistId,
      play,
      cek,
      getImg
    }

    function cek () {
      console.log('item', props.item)
    }

    function getImg (item) {
      const str = item?.images?.coverart || 'https://res.cloudinary.com/dewaqintoro/image/upload/v1625719164/Ngodingbentar/Music/nocoverart_xsc5u2.jpg'
      const stre = str.replace('{w}', '400')
      const dew = stre.replace('{h}', '400')
      return dew
    }

    function cekRoute () {
      if (route.value.name === 'music') {
        baseRoute.value = 'music/track/'
        baseRouteArtist.value = 'music/artist/'
      }
      if (route.value.name === 'music-artist-id') {
        baseRoute.value = '../../music/track/'
        baseRouteArtist.value = '../../music/artist/'
      }
      if (props.item?.artists[0]) {
        artistId.value = true
      }
    }

    function play () {
      if (isPlay.value === true) {
        isPlay.value = false
        emit('pauseAudio')
      } else {
        emit('play', props.item)
        // emit('playAudio')
        isPlay.value = true
      }
    }
  }
}
</script>
<style lang="postcss" scoped>
a:hover{
  @apply underline;
}
.apple{
  border: 1px solid black;
  width: 80px;
   @apply flex justify-items-center bg-black rounded-2xl text-white py-0 px-2 mr-1;
}
.apple svg{
  @apply my-auto mr-1;
}
.dew-img{
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 6px;
}
.centerItem {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%,-50%,0);
  background: rgb(0, 0, 0);
  @apply rounded-full;
}

.centerItem svg{
  width: 20px;
  height: 20px;
  color: white;
  @apply justify-items-center m-auto flex;
}

.kecil{
  display: none
}

.img-top{
  width: 80px;
  height: 80px;
}
.img-top img{
  border-radius: 10px;
}
.number{
  @apply justify-items-center my-auto mx-2;
  width: 20px;
}

.item-title{
  margin-left: 10px;
  @apply my-auto justify-items-center w-full;
}

@media (max-width: 700px) {
}
@media (max-width: 500px) {
}

@media (max-width: 450px) {

  .besar{
    display: none;
  }
  .kecil{
    display: block;
  }
}

@media (max-width: 380px) {
  .img-top{
    /* width: 100%; */
    width: 70px;
    height: 70px;
  }
}

</style>
