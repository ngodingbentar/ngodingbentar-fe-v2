<template>
  <div class="statistik">
    <div class="switch">
      <div class="bg-gray-100">
        <div class="box">
          <input type="checkbox" class="toggle-btn focus:outline-none " @change="update($event)">
          <div class="signup" />
          <div class="login" />
        </div>
      </div>
    </div>
    <!-- <Loading :theme="myTheme" class="px-8"/> -->
    <div v-if="isIndo" class="case px-10 pt-12 pb-8">
      <div v-if="isLoadingIndo">
        <Loading :theme="myTheme" />
      </div>
      <div v-else class="case-card text-xl grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 lg:gap-6 ">
        <div class="positif text-white text-center py-4 rounded-lg">
          <p v-if="jumlahpositif" class="text-2xl font-bold">
            {{ jumlahpositif }}
          </p>
          <p>TERKONFIRMASI</p>
        </div>
        <div class="aktif text-white text-center py-4 rounded-lg">
          <p v-if="jumlahdirawat" class="text-2xl font-bold">
            {{ jumlahdirawat.value }}
          </p>
          <p v-if="jumlahdirawat" class="text-xl">
            {{ jumlahdirawat.persentase }}%
          </p>
          <p>KASUS AKTIF</p>
        </div>
        <div class="sembuh text-white text-center py-4 rounded-lg">
          <p v-if="jumlahsembuh" class="text-2xl font-bold">
            {{ jumlahsembuh.value }}
          </p>
          <p v-if="jumlahsembuh" class="text-xl">
            {{ jumlahsembuh.persentase }}%
          </p>
          <p>SEMBUH</p>
        </div>
        <div class="meninggal text-white text-center py-4 rounded-lg">
          <p v-if="jumlahmeninggal" class="text-2xl font-bold">
            {{ jumlahmeninggal.value }}
          </p>
          <p v-if="jumlahmeninggal" class="text-xl">
            {{ jumlahmeninggal.persentase }}%
          </p>
          <p>MENINGGAL</p>
        </div>
        <div class="vaksinasi text-white text-center py-4 rounded-lg">
          <p v-if="vaksinasitahap1" class="text-2xl font-bold">
            {{ vaksinasitahap1 }}
          </p>
          <p>VAKSINASI KE-1</p>
        </div>
        <div class="vaksinasi text-white text-center py-4 rounded-lg">
          <p v-if="vaksinasitahap2" class="text-2xl font-bold">
            {{ vaksinasitahap2 }}
          </p>
          <p>VAKSINASI KE-2</p>
        </div>
      </div>
    </div>

    <div v-else class="case px-10 pt-12 pb-8">
      <div v-if="isLoadingGlobal">
        <Loading :theme="myTheme" />
      </div>
      <div v-else class="case-card text-xl grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 lg:gap-6 ">
        <div class="positif text-white text-center py-4 rounded-lg">
          <p v-if="globalconfirmed" class="text-2xl font-bold">
            {{ globalconfirmed }}
          </p>
          <p>TERKONFIRMASI</p>
        </div>
        <div class="aktif text-white text-center py-4 rounded-lg">
          <p v-if="globalconfirmed" class="text-2xl font-bold">
            {{ globalactive }}
          </p>
          <p>KASUS AKTIF</p>
        </div>
        <div class="sembuh text-white text-center py-4 rounded-lg">
          <p v-if="globalconfirmed" class="text-2xl font-bold">
            {{ globalrecovered }}
          </p>
          <p>SEMBUH</p>
        </div>
        <div class="meninggal text-white text-center py-4 rounded-lg sm:col-span-1 md:col-span-3 lg:col-span-3">
          <p v-if="globalconfirmed" class="text-2xl font-bold">
            {{ globaldeaths }}
          </p>
          <p>MENINGGAL</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, useContext } from '@nuxtjs/composition-api'
import Loading from '@/components/LoadingGlobal.vue'

export default {
  name: 'CovidStatistik',
  components: {
    Loading
  },
  props: {
    jumlahpositif: {
      type: String,
      required: true
    },
    jumlahdirawat: {
      type: Object,
      required: true
    },
    jumlahsembuh: {
      type: Object,
      required: true
    },
    jumlahmeninggal: {
      type: Object,
      required: true
    },
    vaksinasitahap1: {
      type: String,
      required: true
    },
    vaksinasitahap2: {
      type: String,
      required: true
    },
    globalconfirmed: {
      type: String,
      required: true
    },
    globalactive: {
      type: String,
      required: true
    },
    globalrecovered: {
      type: String,
      required: true
    },
    globaldeaths: {
      type: String,
      required: true
    },
    isLoadingIndo: {
      type: Boolean,
      required: true,
      default: true
    },
    isLoadingGlobal: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  setup () {
    const { store } = useContext()
    const isIndo = ref(true)
    const myTheme = computed(() => store.state.initTheme)

    return {
      isIndo,
      myTheme,
      update
    }
    function update () {
      isIndo.value = !isIndo.value
    }
  }
}
</script>

<style lang="postcss" scoped>
.statistik {
  @apply py-8;
}
.positif {
  background: rgb(253, 166, 4);
}

.aktif {
  background: #8e44ad;
}

.meninggal {
  /* background: rgb(223, 43, 43); */
  background: #c0392b;
}

.sembuh {
  background: #10ac84;
}

.vaksinasi {
  background: #74b9ff;
}
.toggle-btn {
  -webkit-appearance: none;
  width: 250px;
  height: 40px;
  border: 1px solid gray;
  position: absolute;
  top: 100px;
  left: calc(50% - 125px);
  border-radius: 100px;
  background: #4884b6;
}

.toggle-btn:before{
  @apply grid text-black font-bold place-items-center;
  content: 'Indonesia';
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: white;
  border-radius: 100px;
  transition: 0.5s;
}

.toggle-btn:checked:before{
  content: 'Global';
  left: 50%;
}
.one {
  @apply text-white ;
  border-bottom-right-radius: 50px;
  border-bottom-left-radius: 50px;
  min-height: 300px;
  /* background: #273c75; */
  background: #346791;
}
.case {
  @apply w-full;
}

@media (max-width: 900px) {
  .main {
    @apply px-16;
  }
  .tiga{
    @apply col-span-2;
  }
}

@media (max-width: 700px) {
  .main {
    @apply px-8;
  }
  .tiga{
    @apply col-span-2;
  }
}
@media (max-width: 500px) {
  .main {
    @apply px-0;
  }
  .case-card{
    @apply grid-cols-1;
  }
}
</style>
