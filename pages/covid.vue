<template class="place-items-center">
  <div class="main">
    <div class="one">
      <div class="header font-bold px-8">
        <div class="text-center text-3xl">
          Covid
        </div>
        <p class="text-xl">
          Statistik
        </p>
        <p v-if="indoCases.penambahan" class="text-sm font-normal">
          <i>( Last Update : {{ indoCases.penambahan.tanggal }} )</i>
        </p>
      </div>
      <CovidStatistik
        :jumlahpositif="jumlahpositif"
        :jumlahdirawat="jumlahdirawat"
        :jumlahsembuh="jumlahsembuh"
        :jumlahmeninggal="jumlahmeninggal"
        :vaksinasitahap1="vaksinasitahap1"
        :vaksinasitahap2="vaksinasitahap2"
        :globalconfirmed="globalconfirmed"
        :globalactive="globalactive"
        :globalrecovered="globalrecovered"
        :globaldeaths="globaldeaths"
        :is-loading-indo="isLoadingIndo"
        :is-loading-global="isLoadingGlobal"
      />
    </div>
    <div class="two px-4 py-8">
      <CovidBar v-if="!loadingChart" :data-prov="dataProv" class="mt-4" />
      <CovidChart
        v-if="!loadingChart"
        :prov="prov"
        :days-date="daysDate"
        :days-positif="daysPositif"
        :days-death="daysDeath"
        :days-recovered="daysRecovered"
      />
    </div>
  </div>
</template>

<script>
import { ref } from '@nuxtjs/composition-api'
import axios from 'axios'
import CovidStatistik from '@/components/covid/CovidStatistik.vue'
import CovidChart from '@/components/covid/CovidChart.vue'
import CovidBar from '@/components/covid/CovidBar.vue'

export default {
  name: 'Chart',
  components: {
    CovidStatistik,
    CovidChart,
    CovidBar
  },
  setup () {
    const globalconfirmed = ref('')
    const globalrecovered = ref('')
    const globaldeaths = ref('')
    const globalactive = ref('')
    const globalCases = ref({})
    const indoCases = ref([])
    const daily = ref([])
    const indoVaksinasi = ref([])
    const vaksinasitahap1 = ref('')
    const vaksinasitahap2 = ref('')
    const jumlahpositif = ref('')
    const jumlahdirawat = ref({})
    const jumlahsembuh = ref({})
    const jumlahmeninggal = ref({})
    const isLoadingIndo = ref(true)
    const isLoadingGlobal = ref(true)
    const daysPositif = ref([])
    const daysDeath = ref([])
    const daysRecovered = ref([])
    const daysDate = ref([])
    const dataProv = ref([])
    const loadingChart = ref(true)
    const loadingBar = ref(true)
    const prov = ref([])
    const selected = ref('NASIONAL')
    getIndoCases()
    getVaksinasi()
    getGlobalCases()
    return {
      loadingChart,
      loadingBar,
      dataProv,
      prov,
      selected,
      daily,
      daysDate,
      daysPositif,
      daysDeath,
      daysRecovered,
      globalCases,
      indoCases,
      indoVaksinasi,
      vaksinasitahap1,
      vaksinasitahap2,
      jumlahpositif,
      jumlahdirawat,
      jumlahsembuh,
      jumlahmeninggal,
      globalconfirmed,
      globalrecovered,
      globaldeaths,
      globalactive,
      isLoadingIndo,
      isLoadingGlobal
    }

    async function getIndoCases () {
      try {
        const url = 'https://ngodingbentar-be.herokuapp.com/api/v1/covid'
        const result = await axios.get(url)
        const urlProv = 'https://ngodingbentar-be.herokuapp.com/api/v1/covid/prov'
        const resultProv = await axios.get(urlProv)
        if (result.data) {
          dataProv.value = resultProv.data
          prov.value = resultProv.data.list_data.map((p) => {
            return p.key
          })
        }
        indoCases.value = result.data
        daily.value = result.data?.harian
        setJumlahPositif()
        setJumlahDirawat()
        setJumlahSembuh()
        setJumlahMeninggal()
        setTahap1()
        setTahap2()
        if (result.data) {
          isLoadingIndo.value = false
        }
      } catch (err) {
        console.log('err', err)
      }
    }

    async function setJumlahPositif () {
      try {
        const bilangan = await indoCases.value?.total?.jumlah_positif
        if (typeof bilangan === 'number') {
          daysPositif.value = daily.value.map((p) => {
            return p.jumlah_positif.value
          })
          daysDate.value = daily.value.map((p) => {
            const date = new Date(p.key_as_string)
            return date.toISOString().substring(0, 10)
          })
          const numberString = bilangan.toString()
          const sisa = numberString.length % 3
          let rupiah = numberString.substr(0, sisa)
          const ribuan = numberString.substr(sisa).match(/\d{3}/g)
          if (ribuan) {
            const separator = sisa ? '.' : ''
            rupiah += separator + ribuan.join('.')
          }
          jumlahpositif.value = rupiah
          loadingChart.value = false
        }
      } catch (err) {
        console.log(err)
      }
    }

    async function setJumlahDirawat () {
      const bilangan = await indoCases.value?.total?.jumlah_dirawat
      if (typeof bilangan === 'number') {
        const numberString = bilangan.toString()
        const sisa = numberString.length % 3
        let rupiah = numberString.substr(0, sisa)
        const ribuan = numberString.substr(sisa).match(/\d{3}/g)
        if (ribuan) {
          const separator = sisa ? '.' : ''
          rupiah += separator + ribuan.join('.')
        }
        const persen = (indoCases.value?.total?.jumlah_dirawat / indoCases.value?.total?.jumlah_positif) * 100
        const data = {
          value: rupiah,
          persentase: persen.toString().substring(0, 4)
        }
        jumlahdirawat.value = data
      }
    }

    function setJumlahSembuh () {
      const bilangan = indoCases.value?.total?.jumlah_sembuh
      if (typeof bilangan === 'number') {
        daysRecovered.value = daily.value.map((p) => {
          return p.jumlah_sembuh.value
        })
        const numberString = bilangan.toString()
        const sisa = numberString.length % 3
        let rupiah = numberString.substr(0, sisa)
        const ribuan = numberString.substr(sisa).match(/\d{3}/g)
        if (ribuan) {
          const separator = sisa ? '.' : ''
          rupiah += separator + ribuan.join('.')
        }
        const persen = (indoCases.value?.total?.jumlah_sembuh / indoCases.value?.total?.jumlah_positif) * 100
        const data = {
          value: rupiah,
          persentase: persen.toString().substring(0, 4)
        }
        jumlahsembuh.value = data
      }
    }

    function setJumlahMeninggal () {
      const bilangan = indoCases.value?.total?.jumlah_meninggal

      if (typeof bilangan === 'number') {
        daysDeath.value = daily.value.map((p) => {
          return p.jumlah_meninggal.value
        })
        const numberString = bilangan.toString()
        const sisa = numberString.length % 3
        let rupiah = numberString.substr(0, sisa)
        const ribuan = numberString.substr(sisa).match(/\d{3}/g)
        if (ribuan) {
          const separator = sisa ? '.' : ''
          rupiah += separator + ribuan.join('.')
        }
        const persen = (indoCases.value?.total?.jumlah_meninggal / indoCases.value?.total?.jumlah_positif) * 100
        const data = {
          value: rupiah,
          persentase: persen.toString().substring(0, 4)
        }
        jumlahmeninggal.value = data
      }
    }

    async function setTahap1 () {
      try {
        const bilangan = await indoVaksinasi.value?.vaksinasi?.total?.jumlah_vaksinasi_1
        if (typeof bilangan === 'number') {
          const numberString = bilangan.toString()
          const sisa = numberString.length % 3
          let rupiah = numberString.substr(0, sisa)
          const ribuan = numberString.substr(sisa).match(/\d{3}/g)
          if (ribuan) {
            const separator = sisa ? '.' : ''
            rupiah += separator + ribuan.join('.')
          }
          vaksinasitahap1.value = rupiah
        }
      } catch (err) {
        console.log(err)
      }
    }

    async function setTahap2 () {
      try {
        const bilangan = await indoVaksinasi.value?.vaksinasi?.total?.jumlah_vaksinasi_2
        if (typeof bilangan === 'number') {
          const numberString = bilangan.toString()
          const sisa = numberString.length % 3
          let rupiah = numberString.substr(0, sisa)
          const ribuan = numberString.substr(sisa).match(/\d{3}/g)
          if (ribuan) {
            const separator = sisa ? '.' : ''
            rupiah += separator + ribuan.join('.')
          }
          vaksinasitahap2.value = rupiah
        }
      } catch (err) {
        console.log(err)
      }
    }

    async function getGlobalCases () {
      try {
        const url = 'https://covid19.mathdro.id/api'
        const result = await axios.get(url)
        globalCases.value = result.data
        setGlobalConfirm()
        setGlobalRecovered()
        setGlobalDeaths()
        setGlobalActive()
        if (result.data) {
          isLoadingGlobal.value = false
        }
      } catch (err) {
        console.log('err', err)
      }
    }

    function setGlobalConfirm () {
      try {
        const bilangan = globalCases.value?.confirmed?.value
        if (typeof bilangan === 'number') {
          const numberString = bilangan.toString()
          const sisa = numberString.length % 3
          let rupiah = numberString.substr(0, sisa)
          const ribuan = numberString.substr(sisa).match(/\d{3}/g)
          if (ribuan) {
            const separator = sisa ? '.' : ''
            rupiah += separator + ribuan.join('.')
          }
          globalconfirmed.value = rupiah
        }
      } catch (err) {
        console.log(err)
      }
    }

    function setGlobalRecovered () {
      const bilangan = globalCases.value?.recovered?.value
      if (typeof bilangan === 'number') {
        const numberString = bilangan.toString()
        const sisa = numberString.length % 3
        let rupiah = numberString.substr(0, sisa)
        const ribuan = numberString.substr(sisa).match(/\d{3}/g)
        if (ribuan) {
          const separator = sisa ? '.' : ''
          rupiah += separator + ribuan.join('.')
        }
        globalrecovered.value = rupiah
      }
    }

    function setGlobalDeaths () {
      const bilangan = globalCases.value?.deaths?.value
      if (typeof bilangan === 'number') {
        const numberString = bilangan.toString()
        const sisa = numberString.length % 3
        let rupiah = numberString.substr(0, sisa)
        const ribuan = numberString.substr(sisa).match(/\d{3}/g)
        if (ribuan) {
          const separator = sisa ? '.' : ''
          rupiah += separator + ribuan.join('.')
        }
        globaldeaths.value = rupiah
      }
    }

    function setGlobalActive () {
      const confirmed = globalCases.value?.confirmed?.value
      const recovered = globalCases.value?.recovered?.value
      const deaths = globalCases.value?.deaths?.value
      const active = confirmed - recovered - deaths

      if (typeof active === 'number') {
        const numberString = active.toString()
        const sisa = numberString.length % 3
        let rupiah = numberString.substr(0, sisa)
        const ribuan = numberString.substr(sisa).match(/\d{3}/g)
        if (ribuan) {
          const separator = sisa ? '.' : ''
          rupiah += separator + ribuan.join('.')
        }
        globalactive.value = rupiah
      }
    }

    async function getVaksinasi () {
      try {
        const url = 'https://ngodingbentar-be.herokuapp.com/api/v1/vaksinasi'
        const result = await axios.get(url)
        indoVaksinasi.value = result.data?.data
      } catch (err) {
        console.log('err', err)
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.main {
  @apply place-items-center px-36;
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
  top: 12%;
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
  border-bottom-right-radius: 40px;
  border-bottom-left-radius: 40px;
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
