<template>
  <div class="main">
    <div class="content">
      <div class="container">
        <div class="my-item">
          <!-- <h1>Lokasi v2</h1> -->
          <div class="search">
            <SearchComp :fields="dataFields" :data="dataCity" @search="searchFilter" />
          </div>
          <p v-if="ifError">
            Data tidak tersedia
          </p>
          <div v-if="loadingweather" class="loading">
            <Loading :sum="2" :theme="initTheme" />
          </div>
          <div v-else>
            <div>
              <div>
                <div v-if="weather.weather" class="text-center items-center p-4">
                  <p v-if="weather" class="text-xl font-bold py-2"><font-awesome-icon :icon="['fas', 'map-marker-alt']" />
                    {{ weather.city_name }} - Indonesia
                  </p>
                  <p class="text-gray-400 text-sm"><font-awesome-icon :icon="['fas', 'calendar-alt']" />
                    {{ currentDate }}
                  </p>
                  <img :src="imgUrl" class="imgUrl">
                  <p v-if="weather.weather">
                    {{ weather.weather.description }}
                  </p>
                  <p class="font-bold py-2 text-4xl">
                    {{ weather.temp }}°C
                  </p>
                </div>
                <div v-else class="loadingFetch ml-4 h-64">
                  <p class="">
                    loading
                  </p>
                </div>
              </div>
              <div class="other text-lg">
                <div v-if="weather.weather">
                  <p>Relative humidity : {{ rh }}%</p>
                  <p>Wind speed : {{ windSpeed }} m/s</p>
                  <p>Latitude : {{ weather.lat }}</p>
                  <p>Longitude  : {{ weather.lon }}</p>
                </div>
                <div v-else class="loadingFetch h-16">
                  <p>loading</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, useContext } from '@nuxtjs/composition-api'
import axios from 'axios'
import Loading from '@/components/Loading.vue'
import dataJson from '~/data/csvjson.json'
import SearchComp from '~/components/SearchNewComp.vue'

export default {
  name: 'Quran',
  components: {
    SearchComp,
    Loading
  },
  setup () {
    const { store } = useContext()
    // const dataCity = dataJson.rajaongkir?.results
    const dataCity = dataJson
    const search = ref('')
    const allData = ref([])
    const dataFields = { value: 'name' }
    const weather = ref([])
    const minutely = ref([])
    const initialData = ({
      city: 'Sleman',
      country: 'Indonesia',
      admin_name: 'Yogyakarta'
    })
    const selectedCity = ref([initialData])
    const ifError = ref(false)
    const loading = ref(true)
    const imgUrl = ref('')
    const windSpeed = computed(() => {
      const spd = weather.value.wind_spd.toString()
      return spd.substring(0, 4)
    })
    const rh = computed(() => {
      const data = weather.value.rh.toString()
      return data.substring(0, 4)
    })
    // const currentDate = ref('')
    const currentDate = computed(() => {
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      const myDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const date = new Date()
      const day = date.getDate()
      const month = date.getMonth()
      const thisDay = date.getDay()
      const hariIni = myDays[thisDay]
      const yy = date.getYear()
      const year = (yy < 1000) ? yy + 1900 : yy
      return hariIni + ', ' + day + ' ' + months[month] + ' ' + year
    })
    const storeWeather = computed(() => store.state.weather)
    const loadingweather = computed(() => store.state.loadingweather)
    const initTheme = {
      darktheme: false,
      background: '#f7f7f7',
      color: 'black',
      boxShadow: '5px 5px 12px #dedede,-5px -5px 12px #ffffff'
    }
    cekCuaca()

    // getWeather()

    return {
      search,
      dataCity,
      weather,
      selectedCity,
      currentDate,
      storeWeather,
      imgUrl,
      minutely,
      allData,
      windSpeed,
      rh,
      initTheme,
      loading,
      dataFields,
      ifError,
      loadingweather,
      searchFilter,
      cek,
      cekCuaca,
      setWeather,
      getWeather
    }

    function getWeather () {
      store.dispatch('getWeather')
    }

    function setWeather () {
      store.dispatch('setWeather', weather.value)
    }

    async function cekCuaca () {
      loading.value = true
      const params = {
        lat: selectedCity.value[0]?.latitude || '-7.7156',
        long: selectedCity.value[0]?.longitude || '110.3556',
        lang: 'en'
        // city : selectedCity.value[0]?.city || 'Sleman',
      }
      const url = 'https://www.nuxt.my.id/api/v1/cuaca'

      if (selectedCity.value[0] !== 'undefined') {
        const result = await axios.get(url, { params })
        if (result?.data?.data) {
          weather.value = result?.data?.data[0]
          imgUrl.value = `https://www.weatherbit.io/static/img/icons/${result?.data?.data[0]?.weather?.icon}.png`
          minutely.value = result.data?.minutely
          store.dispatch('setWeather', result?.data?.data[0])
          loading.value = false
        }
      } else {
        console.log(selectedCity)
      }
    }

    function searchFilter (data) {
      if (data === null) {
        data = ''
      }

      const result = dataCity.filter(doa =>
        doa.name.toLowerCase().includes(data.toLowerCase())
      )
      allData.value = result
      if (result.length === 1) {
        selectedCity.value = result
        ifError.value = false
        cekCuaca()
      } else if (result.length > 20) {
        ifError.value = false
      } else {
        // eslint-disable-next-line no-lonely-if
        if (result.length <= 20) {
          result.forEach((hasil) => {
            if (hasil.name.length === data.length) {
              selectedCity.value = result
              cekCuaca()
            } else {
              ifError.value = true
            }
          })
        } else {
          ifError.value = true
        }
      }
    }

    function cek () {
      console.log('weather.value', weather.value)
    }
  }
}
</script>

<style lang="postcss" scoped>
.main {
  @apply min-h-screen bg-gray-100 items-center flex justify-center;
}

.loading {
  @apply w-full;
  width: 280px;
  height: 400px;
}

.loadingFetch{
  @apply w-full text-center;
  width: 280px;
}

.content {
  /* @apply bg-gray-300; */
  z-index: 10;
}
.search {
  @apply items-center flex justify-center m-auto pt-4;
  max-width: 250px;
}
.imgUrl {
  @apply px-16 w-full;
  max-width: 350px;
}
.other {
  @apply w-full h-full rounded-b-lg p-4;
  background: #00CCFF;
}
.container{
  @apply w-full h-full rounded-lg;
  position: relative;
  max-width: 400px;
  max-height: 600px;
  /* background: rgba(255, 255, 255, 0.1); */
  background: white;
  /* border-radius: 10px; */
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  /* border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2); */
}

.my-item {
  position: relative;
  width: 100%;
  height: 100%;
}
.my-item h2 {
  position: relative;
  color: #fff;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 40px;
}

.my-item h2::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: -10px;
  width: 80px;
  height: 4px;
  background: #fff;
}

.my-item .inputBox {
  width: 100%;
  margin-top: 20px;
}

.my-item .inputBox input {
  width: 100%;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  outline: none;
  padding: 10px 20px;
  border-radius: 35px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 16px;
  letter-spacing: 1px;
  color: #fff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.my-item .inputBox input::placeholder {
  color: #fff;
}

.my-item .inputBox input[type="submit"]{
  background: #fff;
  color: #666;
  max-width: 100px;
  cursor: pointer;
  margin-bottom: 20px;
  font-weight: 600;
}

</style>
