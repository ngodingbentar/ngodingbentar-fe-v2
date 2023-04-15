<template>
  <div class="card" :class="bgId" :style="{ background: theme.background, color: theme.color, boxShadow: theme.boxShadow  }">
    <button @click="show()" class="btn-show focus:outline-none">
      <p class="font-bold text-lg">{{jadwal.tanggal}}</p>
      <div v-if="isShow" class="content">
        <div class="item flex justify-between">
          <div>
            <p class="title">Imsak</p>
            <p>{{jadwal.imsak}}</p>
          </div>
          <div>
            <p class="title">Subuh</p>
            <p>{{jadwal.subuh}}</p>
          </div>
          <div>
            <p class="title">Terbit</p>
            <p>{{jadwal.terbit}}</p>
          </div>
        </div>
        <div class="item flex justify-between py-6">
          <div>
            <p class="title">Dhuha</p>
            <p>{{jadwal.dhuha}}</p>
          </div>
          <div>
            <p class="title">Dzuhur</p>
            <p>{{jadwal.dzuhur}}</p>
          </div>
          <div>
            <p class="title">Ashar</p>
            <p>{{jadwal.ashar}}</p>
          </div>
        </div>
        <div class="item flex justify-evenly">
          <div>
            <p class="title">Maghrib</p>
            <p>{{jadwal.maghrib}}</p>
          </div>
          <div>
            <p class="title">Isya</p>
            <p>{{jadwal.isya}}</p>
          </div>
        </div>
        <!-- <div class="satu">
          <div class="item">
            <p class="title">Imsak</p>
            <p>{{jadwal.imsak}}</p>
          </div>
          <div class="item">
            <p class="title">Dhuha</p>
            <p>{{jadwal.dhuha}}</p>
          </div>
          <div class="item">
            <p class="title">Maghrib</p>
            <p>{{jadwal.maghrib}}</p>
          </div>
        </div>
        <div class="dua">
          <div class="item">
            <p class="title">Subuh</p>
            <p>{{jadwal.subuh}}</p>
          </div>
          <div class="item">
            <p class="title">Dzuhur</p>
            <p>{{jadwal.dzuhur}}</p>
          </div>
          <div class="item">
            <p class="title">Isya</p>
            <p>{{jadwal.isya}}</p>
          </div>
        </div>
        <div class="tiga">
          <div class="item">
            <p class="title">Terbit</p>
            <p>{{jadwal.terbit}}</p>
          </div>
          <div class="item">
            <p class="title">Ashar</p>
            <p>{{jadwal.ashar}}</p>
          </div>
        </div> -->
      </div>
    </button>
  </div>
</template>

<script>
import { ref, useContext, computed } from '@nuxtjs/composition-api'
export default {
  name: 'jadwalCardcomp',
  props: {
    theme: {
      type: Object,
      required: false,
    },
    jadwal: {
      type: Object,
      required: false,
    },
    index: {
      type: Number,
      required: false,
    }
  },
  setup(props){
    const { route, store, app } = useContext()
    const isShow = ref(false)
    const subStore = computed(() => store.state.sub)
    const bgId = computed(() => {
      if(props.theme?.darktheme){
        return 'darkTheme'
      } else {
        return 'lightTheme'
      }
    })

    return {
      bgId,
      isShow,
      subStore,
      cek,
      show
    }

    function show(){
      if(isShow.value === true){
        isShow.value = false
      } else {
        isShow.value = true
      }
    }
    function cek(){
      console.log('props', props.doa)
    }
  }
}
</script>
<style lang="postcss" scoped>
.item {
  /* @apply my-2 ; */
}
.title {
  @apply text-xl text-left;
}
.darkTheme:hover{
  background: rgb(61, 81, 94) !important;
}
.lightTheme:hover{
  background: #f1f1f1 !important;
}
.card {
  @apply px-4 pb-4 rounded-lg my-8;
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.15); */
  .btn-show {
    @apply text-center w-full;
  }
  .idSurah {
    @apply items-center justify-center flex font-bold rounded-full;
    width: 45px;
    height: 45px;
  }
  .content {
    @apply px-4 w-full pt-4;
  }
}
.card:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.20);
}
.arabic {
  @apply text-right text-3xl;
  line-height: 4rem !important;
}
.my-audio{
  max-width: 100%;
  height: 35px;
}
@screen mobile {
  .card {
    @apply my-2;
  }
  .arabic {
    @apply text-3xl;
  }
}
</style>