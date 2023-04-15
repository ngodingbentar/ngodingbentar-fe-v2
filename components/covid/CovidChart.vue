<template>
  <div class="analitik">
    <div class="chart-title">
      Perkembangan Kasus Terkonfirmasi Positif Covid-19 Per-Hari
    </div>
    <p>{{ selected }}</p>
    <select
      v-if="prov"
      id="top"
      v-model="selected"
      class="focus:outline-none"
      name="top"
      @change="seleckProv()"
    >
      <option value="NASIONAL">
        NASIONAL
      </option>
      <option v-for="(item, index) in prov" :key="index" :value="item">
        {{ item }}
      </option>
    </select>

    <div class="myChart">
      <ClientOnly>
        <!-- <div v-if="!loadingChart" id="chart"> -->
        <div id="chart">
          <p v-if="ProvFull && (selected !== 'NASIONAL')" class="font-normal text-sm">
            Jumlah kasus : <b>{{ ProvFull.kasus_total }}</b>, Sembuh : <b>{{ ProvFull.sembuh_dengan_tgl }}</b>, Meninggal <b>{{ ProvFull.meninggal_dengan_tgl }}</b>
          </p>
          <!-- <apexchart v-if="isProv" type="area" height="350" :options="chartOptionsProv" :series="seriesProv"></apexchart> -->
          <apexchart type="area" height="350" :options="chartOptions" :series="series" />
        </div>
      </ClientOnly>
    </div>
    <CovidColumn :prov-data="ProvData" />
  </div>
</template>

<script>
import { computed, ref } from '@nuxtjs/composition-api'
import CovidColumn from '@/components/covid/CovidColumn.vue'

import axios from 'axios'
export default {
  name: 'Chart',
  components: {
    CovidColumn
  },
  props: {
    daysDate: {
      type: Array,
      required: true
    },
    daysPositif: {
      type: Array,
      required: true
    },
    daysDeath: {
      type: Array,
      required: true
    },
    daysRecovered: {
      type: Array,
      required: true
    },
    prov: {
      type: Array,
      required: true
    }
  },
  setup (props) {
    const loadingChart = ref(true)
    const thisPositif = ref([])
    const thisSembuh = ref([])
    const thisMeninggal = ref([])
    const provPositif = ref([])
    const provSembuh = ref([])
    const provMeninggal = ref([])
    const ProvFull = ref([])
    const ProvData = ref([])
    const isProv = ref(false)
    const series = computed(() =>
      [
        {
          name: 'Positif',
          data: thisPositif.value
        },
        {
          name: 'Sembuh',
          data: thisSembuh.value
        },
        {
          name: 'Meninggal',
          data: thisMeninggal.value
        }
      ]
    )
    const chartOptions = {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        }
      },
      xaxis: {
        type: 'datetime',
        categories: props.daysDate,
        tickAmount: 6
      }
    }

    const seriesProv = computed(() =>
      [
        {
          name: 'Positif',
          data: provPositif.value
        },
        {
          name: 'Sembuh',
          data: provSembuh.value
        },
        {
          name: 'Meninggal',
          data: provMeninggal.value
        }
      ]
    )
    const chartOptionsProv = {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        }
      },
      xaxis: {
        type: 'datetime',
        categories: props.daysDate,
        tickAmount: 6
      }
    }
    const selected = ref('NASIONAL')
    seleckProv()
    return {
      ProvFull,
      ProvData,
      isProv,
      series,
      seriesProv,
      chartOptions,
      chartOptionsProv,
      selected,
      loadingChart,
      seleckProv
    }

    async function seleckProv () {
      // loadingChart.value = true
      let str = selected.value
      str = str.replace(/\s+/g, '_')

      if (selected.value !== 'NASIONAL') {
        isProv.value = true
        try {
          const url = `https://ngodingbentar-be.herokuapp.com/api/v1/covid/prov/${str}`
          const result = await axios.get(url)
          // console.log('result', result);
          const listPerkembangan = result.data?.result?.list_perkembangan
          ProvFull.value = result.data.result
          ProvData.value = result.data.result?.data
          thisPositif.value = listPerkembangan.map((p) => {
            return p.KASUS
          })

          thisSembuh.value = listPerkembangan.map((p) => {
            return p.SEMBUH
          })

          thisMeninggal.value = listPerkembangan.map((p) => {
            return p.MENINGGAL
          })
        } catch (err) {
          console.log(err)
        }
      } else {
        thisPositif.value = props.daysPositif
        thisSembuh.value = props.daysRecovered
        thisMeninggal.value = props.daysDeath
        const url = 'https://ngodingbentar-be.herokuapp.com/api/v1/covid/data'
        const result = await axios.get(url)
        ProvData.value = result.data?.result
        isProv.value = false
      }
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
