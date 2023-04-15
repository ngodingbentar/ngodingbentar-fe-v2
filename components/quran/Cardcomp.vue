<template>
  <div class="card" :class="bgId" :style="{ background: theme.background, color: theme.color, boxShadow: theme.boxShadow  }">
    <div>
      <div class="nameSurah">
        <div class="idSurah" :class="bgId" :style="{ boxShadow: theme.boxShadow }">
          <p>{{ surat[0] }}</p>
        </div>
        <div class="surat">
          <p>{{ surat[1] }}</p>
        </div>
        <div v-if="subStore === 'On'" class="text-left mt-4 text-xl">
          <p class="font-bold">
            Terjemahan :
          </p>
          <p>{{ arti }}</p>
        </div>
        <audio v-if="audioStore === 'On'" :src="audio.value" controls class="my-audio" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, useContext, computed } from '@nuxtjs/composition-api'
export default {
  name: 'Cardcomp',
  props: {
    theme: {
      type: Object,
      required: true
    },
    surat: {
      type: Array,
      required: true
    },
    surah: {
      type: Object,
      required: true
    },
    arti: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    audio: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const { store } = useContext()
    const idAyat = ref('')
    const subStore = computed(() => store.state.sub)
    const audioStore = computed(() => store.state.audio)
    const loadingAudio = computed(() => store.state.loadingAudio)

    const bgId = computed(() => {
      if (props.theme?.darktheme) {
        return 'darkTheme'
      } else {
        return 'lightTheme'
      }
    })

    return {
      bgId,
      subStore,
      loadingAudio,
      idAyat,
      audioStore,
      cek
    }
    function cek () {
      console.log('audioStore', audioStore)
    }
  }
}
</script>
<style lang="postcss" scoped>
.darkTheme:hover{
  background: rgb(61, 81, 94) !important;
}
.lightTheme:hover{
  background: #f1f1f1 !important;
}

.card {
  @apply px-4 pb-4 pt-4 rounded-lg my-8;
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.15); */
  .idSurah {
    @apply items-center justify-center flex font-bold rounded-full;
    width: 40px;
    height: 40px;
  }
  .nameSurah {
    @apply px-4 w-full;
  }
}
.card:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.20);
}
.surat {
  @apply text-right text-3xl mt-2;
  line-height: 4rem !important;
}
.my-audio{
  @apply mt-4;
  max-width: 100%;
  height: 35px;
}
@screen mobile {
  .surat {
    @apply text-2xl;
  }
  .idSurah {
    @apply text-sm;
    width: 30px;
    height: 30px;
  }
  .my-audio{
    max-width: 80%;
    height: 35px;
  }
}
</style>
