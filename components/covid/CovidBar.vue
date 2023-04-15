<template>
  <div class="analitik">
    <div class="flex place-items-center">
      <div class="place-items-center m-auto">
        <button class="switch" :class="{positifActive: isPositif}" @click="showPositif">
          Positif
        </button>
        <button class="switch" :class="{recoveredActive: isRecoverd}" @click="showRecovered">
          Sembuh
        </button>
        <button class="switch" :class="{deathActive: isDeath}" @click="showDeath">
          Meninggal
        </button>
        <button class="switch" :class="{treatedActive: isTreated}" @click="showTreated">
          Dirawat
        </button>
      </div>
    </div>
    <div v-if="isPositif" class="myChart">
      <ClientOnly>
        <div id="chart">
          <!-- <apexchart type="area" height="350" :options="chartOptions" :series="series"></apexchart> -->
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

    <CovidBarRecovered v-if="isRecoverd" />
    <CovidBarDeath v-if="isDeath" />
    <CovidBarTreated v-if="isTreated" />
  </div>
</template>

<script>
import { computed, ref } from '@nuxtjs/composition-api'
import CovidBarDeath from '@/components/covid/CovidBarDeath.vue'
import CovidBarRecovered from '@/components/covid/CovidBarRecovered.vue'
import CovidBarTreated from '@/components/covid/CovidBarTreated.vue'

export default {
  name: 'Bar',
  components: {
    CovidBarDeath,
    CovidBarRecovered,
    CovidBarTreated
  },
  props: {
    dataProv: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const myProv = computed(() => props.dataProv.list_data)
    const prov = myProv.value.map((p) => {
      return p.key
    })
    const cases = myProv.value.map((p) => {
      return p.jumlah_kasus
    })
    const deaths = myProv.value.map((p) => {
      return p.jumlah_meninggal
    })
    const recovered = myProv.value.map((p) => {
      return p.jumlah_sembuh
    })
    const treated = myProv.value.map((p) => {
      return p.jumlah_dirawat
    })
    const limitProv = ref([])
    const limitCases = ref([])
    const limitDeaths = ref([])
    const limitRecovered = ref([])
    const limitTreated = ref([])
    const isLimit = ref(true)
    const limitSeries = [
      {
        name: 'Positif',
        data: limitCases.value
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
      }
    }

    const series = [
      {
        name: 'Positif',
        data: cases
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
      }
    }

    const tenActive = ref(true)
    const allActive = ref(false)
    const positifActive = ref(true)
    const recoveredActive = ref(false)
    const btnShow = ref('Semua Data')
    const classAktif = ref('positif')
    const isPositif = ref(true)
    const isRecoverd = ref(false)
    const isDeath = ref(false)
    const isTreated = ref(false)
    setLimitCases()
    return {
      isLimit,
      series,
      limitSeries,
      chartOptions,
      limitChartOptions,
      tenActive,
      allActive,
      positifActive,
      recoveredActive,
      btnShow,
      classAktif,
      isPositif,
      isRecoverd,
      isDeath,
      isTreated,
      updateShowData,
      showPositif,
      showRecovered,
      showDeath,
      showTreated
    }

    function showPositif () {
      isPositif.value = true
      isRecoverd.value = false
      isDeath.value = false
      isTreated.value = false
    }

    function showRecovered () {
      isPositif.value = false
      isRecoverd.value = true
      isDeath.value = false
      isTreated.value = false
    }

    function showDeath () {
      isPositif.value = false
      isRecoverd.value = false
      isDeath.value = true
      isTreated.value = false
    }
    function showTreated () {
      isPositif.value = false
      isRecoverd.value = false
      isDeath.value = false
      isTreated.value = true
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

      cases.forEach((p) => {
        if (limitCases.value.length < 15) {
          limitCases.value.push(p)
        }
      })

      deaths.forEach((p) => {
        if (limitDeaths.value.length < 15) {
          limitDeaths.value.push(p)
        }
      })

      recovered.forEach((p) => {
        if (limitRecovered.value.length < 15) {
          limitRecovered.value.push(p)
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
.recoveredActive, .positifActive, .deathActive, .treatedActive {
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
