<template>
  <div class="dew">
    <div class="flex">
      <div class="number">
        <p>{{ index+1 }}</p>
      </div>
      <div class="btn-play">
        <button class="focus:outline-none" @click="play(item)">
          <font-awesome-icon v-if="isPlay" :icon="['fas', 'pause']" />
          <font-awesome-icon v-else :icon="['fas', 'play']" />
        </button>
      </div>
      <nuxt-link :to="`../../track/`+item.key">
        <div class="item-title besar">
          <p v-if="item.title.length > 40" class="font-bold">
            {{ item.title.substring(0, 40) }}
          </p>
          <p v-else class="font-bold">
            {{ item.title }}
          </p>
          <p v-if="item.subtitle.length > 40">
            {{ item.subtitle.substring(0, 40) }}...
          </p>
          <p v-else>
            {{ item.subtitle }}
          </p>
        </div>
        <div class="item-title kecil">
          <p v-if="item.title.length > 25" class="font-bold">
            {{ item.title.substring(0, 25) }}...
          </p>
          <p v-else class="font-bold">
            {{ item.title }}
          </p>
          <p v-if="item.subtitle.length > 30">
            {{ item.subtitle.substring(0, 30) }}..
          </p>
          <p v-else>
            {{ item.subtitle }}
          </p>
        </div>
      </nuxt-link>
    </div>
    <div>
      <a :href="item.hub.options[0].actions[0].uri" target="_blank">
        <div class="apple">
          <font-awesome-icon :icon="['fab', 'apple']" />
          <span>Music</span>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import { ref } from '@nuxtjs/composition-api'

export default {
  name: 'TopGlobal',
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  setup (props, { emit }) {
    const isPlay = ref(false)

    return {
      isPlay,
      play,
      playAudio,
      pauseAudio
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

    function playAudio () {
      emit('playAudio')
    }

    function pauseAudio () {
      emit('pauseAudio')
    }
  }
}
</script>
<style lang="postcss" scoped>
.apple{
  @apply flex justify-items-center bg-black rounded-md text-white py-1 px-2 mr-1;
}
.apple svg{
  @apply my-auto mr-1;
}
.dew{
  @apply mt-2 flex justify-between;
}

img.img-top{
  /* width: 100%; */
  max-width: 80px;
  max-height: 80px;
  border-radius: 10px;
}
.number{
  @apply justify-items-center my-auto mx-2 font-bold text-center;
  width: 20px;
}

.btn-play{
  @apply justify-items-center my-auto mx-2;
}

.item-title{
  margin-left: 10px;
  @apply my-auto justify-items-center w-full;
}

@media (max-width: 700px) {
}
@media (max-width: 500px) {
  .item{
    min-width: 400px;
    max-width: 480px;
  }
}

@media (min-width: 501px) {
  .item{
    min-width: 400px;
    max-width: 480px;
  }
  .besar{
    display: block;
  }
  .kecil{
    display: none;
  }
}

@media (max-width: 450px) {
  .item{
    min-width: 320px;
    max-width: 400px;
  }
  .besar{
    display: none;
  }
  .kecil{
    display: block;
  }
}
</style>
