<template>
  <div class="myChart">
    <ClientOnly>
      <div id="chart">
        <apexchart v-if="isLimit" type="bar" height="600" :options="limitChartOptions" :series="limitSeries" />
        <apexchart v-else type="bar" height="650" :options="chartOptions" :series="series" />
      </div>
      <div class="flex place-items-center">
        <button :class="{isAll: allActive, isTen: tenActive}" class="switch" @click="updateShowData">
          {{ btnShow }}
        </button>
      </div>
    </ClientOnly>
  </div>
</template>

<script>
import { ref } from '@nuxtjs/composition-api'
import dataJson from '~/data/prov.json'

export default {
  name: 'CovidBarTreated',
  setup () {
    const myProv = dataJson.list_data
    const prov = myProv.map((p) => {
      return p.key
    })
    const treated = myProv.map((p) => {
      return p.jumlah_dirawat
    })
    const limitProv = ref([])
    const limitTreated = ref([])
    const isLimit = ref(true)
    const series = [
      {
        name: 'Dirawat',
        data: treated
      }
    ]
    const chartOptions = {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: prov
      },
      fill: {
        colors: '#9C27B0'
      }
    }

    const limitSeries = [
      {
        name: 'Dirawat',
        data: limitTreated.value
      }
    ]
    const limitChartOptions = {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: limitProv.value
      },
      fill: {
        colors: '#9C27B0'
      }
    }

    const tenActive = ref(true)
    const allActive = ref(false)
    const btnShow = ref('Semua Data')
    setLimitCases()
    return {
      isLimit,
      series,
      limitSeries,
      chartOptions,
      limitChartOptions,
      allActive,
      tenActive,
      btnShow,
      updateShowData
    }

    function updateShowData () {
      isLimit.value = !isLimit.value
      if (btnShow.value === 'Semua Data') {
        btnShow.value = '15 Data'
        tenActive.value = true
        allActive.value = false
      } else {
        btnShow.value = 'Semua Data'
        allActive.value = true
        tenActive.value = false
      }
    }

    function setLimitCases () {
      prov.forEach((p) => {
        if (limitProv.value.length < 15) {
          limitProv.value.push(p)
        }
      })

      treated.forEach((p) => {
        if (limitTreated.value.length < 15) {
          limitTreated.value.push(p)
        }
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
.switch {
  @apply px-4 py-2 text-center m-auto focus:outline-none rounded-xl;
}
.isTen {
  background: rgb(168, 8, 142) ;
  color: white;
}
.isAll {
  background: rgb(90, 90, 255) ;
  color: white;
}
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
