<template>
  <div class="analitik">
    <div class="chart-title">Bar</div>
    <!-- <button @click="cek">cek</button> -->
    <button @click="showAll">All</button>
    <hr/>
    <button @click="showTen">showTen</button>
    <div class="myChart">
      <ClientOnly>
        <div id="chart">
          <!-- <apexchart type="area" height="350" :options="chartOptions" :series="series"></apexchart> -->
          <apexchart v-if="isLimit" type="bar" height="600" :options="limitChartOptions" :series="limitSeries"></apexchart>
          <apexchart v-else type="bar" height="1000" :options="chartOptions" :series="series"></apexchart>
        </div>
      </ClientOnly>

    </div>
  </div>
</template>

<script>
import { computed, ref, useAsync, useContext } from '@nuxtjs/composition-api'
import axios from 'axios'
import Loading from '@/components/Loading.vue'
import CovidStatistik from '@/components/covid/CovidStatistik.vue'
import CovidChart from '@/components/covid/CovidChart.vue'
import dataJson from '~/data/prov.json'

export default {
  name: 'Bar',
  components: {
    Loading,
    CovidStatistik,
    CovidChart
  },
  props: {
    daysDate: {
      type: Array,
      required: true,
    },
    daysPositif: {
      type: Array,
      required: true,
    },
    daysDeath: {
      type: Array,
      required: true,
    },
    daysRecovered: {
      type: Array,
      required: true,
    },
    
  },
  setup(props, {emit}){
    const { app, store } = useContext()
    const myProv = dataJson.list_data
    const prov = myProv.map((p) => {
      return p.key
    })
    const cases = myProv.map((p) => {
      return p.jumlah_kasus
    })
    const deaths = myProv.map((p) => {
      return p.jumlah_meninggal
    })
    const recovered = myProv.map((p) => {
      return p.jumlah_sembuh
    })
    const treated = myProv.map((p) => {
      return p.jumlah_dirawat
    })
    
    const limitProv= ref([])
    const limitCases = ref([])
    const limitDeaths = ref([])
    const limitRecovered = ref([])
    const limitTreated = ref([])

    const thisProv = ref(limitProv.value)
    const thisCases = ref(limitCases.value)
    const thisDeaths = ref(limitDeaths.value)
    const thisRecovered  = ref(limitRecovered.value)
    const thisTreated = ref(limitTreated.value)

    const isLimit = ref(true)
    
    const series= [
      {
        name: 'Positif',
        data: cases
      },
      {
        name: 'Sembuh',
        data: recovered
      },
      {
        name: 'Dirawat',
        data: treated
      },
      {
        name: 'Meninggal',
        data: deaths
      }
    ]
    const chartOptions= {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        zoom: {
          enabled: true
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      title: {
        text: 'Perbandingan Kasus di Provinsi'
      },
      xaxis: {
        categories: prov,
        labels: {
          formatter: function (val) {
            return val
          }
        }
      },
      yaxis: {
        title: {
          text: undefined
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " Kasus"
          }
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40
      }
    }

    const limitSeries= [
      {
        name: 'Positif',
        data: thisCases.value
      },
      {
        name: 'Sembuh',
        data: thisRecovered.value
      },
      {
        name: 'Dirawat',
        data: thisTreated.value
      },
      {
        name: 'Meninggal',
        data: thisDeaths.value
      }
    ]
    const limitChartOptions= {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        zoom: {
          enabled: true
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      title: {
        text: 'Perbandingan Kasus di Provinsi'
      },
      xaxis: {
        categories: thisProv.value,
        labels: {
          formatter: function (val) {
            return val
          }
        }
      },
      yaxis: {
        title: {
          text: undefined
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " Kasus"
          }
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40
      }
    }

    

    setLimitCases()
    return {
      isLimit,
      series,
      limitSeries,
      chartOptions,
      limitChartOptions,
      showAll,
      showTen,
      cek
    }

    async function showAll(){
      isLimit.value = false
      // thisProv.value = prov
      // thisCases.value = cases
      // thisDeaths.value = deaths
      // thisRecovered.value = recovered
      // thisTreated.value = treated
    }

    async function showTen(){
      isLimit.value = true
      // thisProv.value = limitProv.value
      // thisCases.value = limitCases.value
      // thisDeaths.value = limitDeaths.value
      // thisRecovered.value = limitRecovered.value
      // thisTreated.value = limitTreated.value
    }
    
    async function setLimitCases(){
      prov.map((p) => {
        if(limitProv.value.length < 10 ){
          limitProv.value.push(p)
          console.log('p', p)
        }
      })

      cases.map((p) => {
        if(limitCases.value.length < 10 ){
          limitCases.value.push(p)
          console.log('p', p)
        }
      })

      deaths.map((p) => {
        if(limitDeaths.value.length < 10 ){
          limitDeaths.value.push(p)
          console.log('p', p)
        }
      })

      recovered.map((p) => {
        if(limitRecovered.value.length < 10 ){
          limitRecovered.value.push(p)
          console.log('p', p)
        }
      })

      treated.map((p) => {
        if(limitTreated.value.length < 10 ){
          limitTreated.value.push(p)
          console.log('p', p)
        }
      })

    }
    async function cek(){
      console.log('dew.value', dew.value)
    }

  }
}
</script>

<style lang="postcss" scoped>
.analitik {
  .chart-title {
    @apply py-4;
  }
  .myChart {
    @apply p-4;
    height: 100%;
    background: #fff;
    box-shadow: 0.1px 2px 6px rgba(195, 199, 204, 0.5);
    border-radius: 6px;
  }
}
</style>
