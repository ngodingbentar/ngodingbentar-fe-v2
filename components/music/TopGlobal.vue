<template>
  <div class="dew">
    <div class="item">
      <div v-for="(item, index) in globalTop20" :key="index">
        <div v-if="index < 3" class="m-2">
          <GlobalComp
            :item="item"
            :index="index"
            :route-link="'music/track/'+item.key"
            @play="play"
            @pauseAudio="pauseAudio"
            @playAudio="playAudio"
          />
        </div>
      </div>
    </div>

    <div class="item">
      <div v-for="(item, index) in globalTop20" :key="index">
        <div v-if="index > 2 && index < 6" class="flex m-2">
          <GlobalComp
            :item="item"
            :index="index"
            :route-link="'music/track/'+item.key"
            @play="play"
            @pauseAudio="pauseAudio"
            @playAudio="playAudio"
          />
        </div>
      </div>
    </div>

    <div class="item">
      <div v-for="(item, index) in globalTop20" :key="index">
        <div v-if="index > 5 && index < 9" class="flex m-2">
          <GlobalComp
            :item="item"
            :index="index"
            :route-link="'music/track/'+item.key"
            @play="play"
            @pauseAudio="pauseAudio"
            @playAudio="playAudio"
          />
        </div>
      </div>
    </div>
    <div v-if="globalTop20.length > 8" class="item">
      <div v-for="(item, index) in globalTop20" :key="index">
        <div v-if="index > 8 && index < 12" class="flex m-2">
          <GlobalComp
            :item="item"
            :index="index"
            :route-link="'music/track/'+item.key"
            @play="play"
            @pauseAudio="pauseAudio"
            @playAudio="playAudio"
          />
        </div>
      </div>
    </div>
    <div v-if="globalTop20.length > 11" class="item">
      <div v-for="(item, index) in globalTop20" :key="index">
        <div v-if="index > 11 && index < 15" class="flex m-2">
          <GlobalComp
            :item="item"
            :index="index"
            :route-link="'music/track/'+item.key"
            @play="play"
            @pauseAudio="pauseAudio"
            @playAudio="playAudio"
          />
        </div>
      </div>
    </div>
    <div v-if="globalTop20.length > 14" class="item">
      <div v-for="(item, index) in globalTop20" :key="index">
        <div v-if="index > 14 && index < 18" class="flex m-2">
          <GlobalComp
            :item="item"
            :index="index"
            :route-link="'music/track/'+item.key"
            @play="play"
            @pauseAudio="pauseAudio"
            @playAudio="playAudio"
          />
        </div>
      </div>
    </div>
    <div v-if="globalTop20.length > 17" class="item">
      <div v-for="(item, index) in globalTop20" :key="index">
        <div v-if="index > 17 && index < 21" class="flex m-2">
          <GlobalComp
            :item="item"
            :index="index"
            :route-link="'music/track/'+item.key"
            @play="play"
            @pauseAudio="pauseAudio"
            @playAudio="playAudio"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@nuxtjs/composition-api'
import GlobalComp from '~/components/music/GlobalComp'

export default {
  name: 'TopGlobal',
  components: {
    GlobalComp
  },
  props: {
    globalTop20: {
      type: Array,
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

    function play (item) {
      emit('play', item)
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

.dew{
  @apply flex;
}

.item{
  /* margin: 10px; */
  min-width: 500px;
  max-width: 800px;
  /* background: rgb(245, 186, 24); */
}

@media (max-width: 700px) {
}
@media (max-width: 500px) {
  .item{
    min-width: 400px;
    max-width: 480px;
  }
}

@media (max-width: 450px) {
  .item{
    min-width: 320px;
    max-width: 400px;
  }
}
@media (max-width: 380px) {
  .item{
    min-width: 280px;
    max-width: 340px;
  }
}
</style>
