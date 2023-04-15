<template>
  <span>
    <Navbar to="/agama" />
    <div v-if="!loadingTheme" class="main text-center" :style="{ background: storeTheme.background, color: storeTheme.color }">
      <div class="pb-2">
        <p>Jadwal Shalat</p>
        <p>{{ jadwalData.lokasi }} - {{ jadwalData.daerah }}</p>
      </div>
      <SearchComp :fields="dataFields" :data="provJson" :placeholder="placeholder" @search="searchFilter" />
      <div class="py-4 px-8 flex justify-center">
        <!-- <button @click="cek">cek</button> -->
        <select v-model="monthSelected" id="month" name="month" class="rounded-xl focus:outline-none py-2 px-4 mx-2" :style="{ background: storeTheme.background, boxShadow: storeTheme.boxShadow }">
          <option v-for="(item, index) in bulanAll" :key="index" :value="item.id">{{ item.title }}</option>
        </select>
        <select v-model="yearSelected" id="year" name="year" class="rounded-xl focus:outline-none py-2 px-4 mx-2" :style="{ background: storeTheme.background, boxShadow: storeTheme.boxShadow }">
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </select>
        <div class="text-center">
          <button :style="{ boxShadow: storeTheme.boxShadow }" class="sum focus:outline-none" @click="getJadwal">Cari</button>
        </div>
      </div>
      <hr/>
      <div class="min-h-screen font-arabic">
        <div v-if="loading">
          <Loading :theme="storeTheme" />
        </div>
        <div v-else>
          <div v-for="(jadwal, index) in jadwalAll" :key="index" class="item">
            <Cardcomp :theme="storeTheme" :jadwal="jadwal" :index="index+1" />
          </div>
        </div>
      </div>
    </div>
  </span>
</template>

<script>
import { computed, ref, useContext } from '@nuxtjs/composition-api'
import axios from 'axios'
import Loading from '@/components/Loading.vue'
import Navbar from '~/components/Navbar.vue'
import dataJson from '~/data/jadwal-shalat/semua_kota.json'
import bulanJson from '~/data/jadwal-shalat/bulan.json'
import Cardcomp from '~/components/jadwal/jadwalCardComp.vue'
// import SearchComp from '~/components/SearchComp.vue'
import SearchComp from '~/components/SearchNewComp.vue'

export default {
  name: 'JadwalShalat',
  components: {
    Navbar,
    Loading,
    Cardcomp,
    SearchComp
  },
  setup () {
    const { store } = useContext()
    const provJson = dataJson
    const bulanAll = bulanJson.data
    const search = ref('')
    const jadwalAll = ref([])
    const jadwalData = ref([])
    const placeholder = 'Cari Wilayah. . .'
    const provList = ref([])
    const provSelected = ref('1504')
    const monthSelected = ref('5')
    const yearSelected = ref('2021')
    const loadingTheme = computed(() => store.state.loadingTheme)
    const loading = ref(true)
    const storeTheme = computed(() => store.state.theme)
    const dataFields = { value: 'lokasi' }
    const bgId = computed(() => {
      if (storeTheme.value?.darktheme) {
        return 'darkTheme'
      } else {
        return 'lightTheme'
      }
    })

    if (process.browser) {
      window.smoothscroll = () => {
        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop
        if (currentScroll > 0) {
          window.requestAnimationFrame(window.smoothscroll)
          window.scrollTo(0, Math.floor(currentScroll - (currentScroll / 5)))
        }
      }
    }

    setTimeout(function () {
      loading.value = false
    }, 500)

    // searchFilter(search.value)
    getJadwal()

    return {
      placeholder,
      bulanAll,
      yearSelected,
      monthSelected,
      search,
      provJson,
      jadwalData,
      jadwalAll,
      provList,
      dataFields,
      storeTheme,
      loadingTheme,
      loading,
      bgId,
      cek,
      getJadwal,
      onChangePage,
      searchFilter
    }

    function cek () {
      console.log('jadwalData.value', jadwalData.value)
    }

    function searchFilter (dataSearch) {
      if ((dataSearch === null) || (dataSearch === '')) {
        dataSearch = 'all'
      } else if (dataSearch !== 'all') {
        const result = provJson.filter(doa =>
          doa.lokasi.toLowerCase().includes(dataSearch.toLowerCase())
        )
        // console.log('result', result[0].id)
        if (result.length === 1) {
          provSelected.value = result[0].id
          // getJadwal()
        } else {
          // eslint-disable-next-line array-callback-return
          result.map((hasil) => {
            if (hasil.lokasi.length === dataSearch.length) {
              provSelected.value = result[0].id
              // getJadwal()
            } else {
              console.log('Pilih data yang spesifik')
            }
          })
        }
      } else {
        console.log('All prov')
      }
    }

    async function getJadwal () {
      try {
        const url = `https://api.myquran.com/v1/sholat/jadwal/${provSelected.value}/${yearSelected.value}/${monthSelected.value}`
        const result = await axios.get(`${url}`)
        // console.log('result', result?.data?.data?.jadwal)
        jadwalData.value = result?.data?.data
        jadwalAll.value = result?.data?.data?.jadwal
      } catch (err) {
        console.log(err)
      }
    }

    function onChangePage () {
      window.smoothscroll()
    }
  }
}
</script>

<style lang="postcss" scoped>
.sum {
  @apply py-2 px-4 rounded-lg;
  max-width: 120px;
}
.main {
  @apply pt-24 min-h-screen pb-8;
}
@font-face {
  font-family: "lpmq";
  src: url(/fonts/lpmq.otf) format("opentype");
  font-display: swap;
}
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
.font-arabic{
  font-family: "lpmq", Arial, sans-serif;
  line-height: 2;
}
.item {
  @apply px-8 mx-36 my-4;
}
.card {
  @apply text-3xl p-4 rounded-lg;
}
@screen tablet {
  .main {
    @apply pt-28;
  }
}
@screen mobile {
  .main {
    @apply pt-20;
  }
  .item {
    @apply mx-2 px-2;
  }
}
</style>
