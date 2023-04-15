<template>
  <div class="section">
    <div class="section-input">
      <div class="bg-white p-8 rounded-3xl">
        <!-- 0201102000450503 -->
        <label class="block  tracking-wide text-black text-xl font-semibold mt-4 mb-3" for="grid-first-name">
          Pilih Expedisi:
        </label>
        <div class="cek-resi">
          <select v-model="ekspedisiSelected" class="rounded-xl focus:outline-none py-2 px-4 shadow-md" :style="{background: storeTheme.background}">
            <option value="jne">
              JNE
            </option>
            <option value="jnt">
              JNT
            </option>
            <option value="pos">
              POS
            </option>
            <option value="sicepat">
              SiCepat
            </option>
            <option value="tiki">
              TIKI
            </option>
            <option value="anteraja">
              ANTERAJA
            </option>
            <option value="wahana">
              WAHANA
            </option>
            <option value="ninja">
              NINJA
            </option>
          </select>
          <input v-model="awb" type="search" placeholder="No Resi. . ." class="input-awb focus:outline-none rounded-xl py-2 px-4 shadow-md" :style="{background: storeTheme.background}">
        </div>
        <button class="cek-biaya mt-4 focus:outline-none justify-end text-white font-bold py-2 px-4 rounded-full shadow-md" @click="cekResi()">
          Cek Resi
        </button>
      </div>
      <div v-if="showDetail" class="bg-white p-8 rounded-3xl mt-8 justify-center mx-auto">
        <!-- 0201102000450503 -->
        <div class="text-center font-bold">
          <p class="text-lg">Ekspedisi {{dataResi.summary.courier}}</p>
          <p>Informasi Pengiriman</p>
        </div>
        <div class="justify-center mx-auto mt-4">
          <table class="mx-auto">
            <tr>
              <td>No Resi</td>
              <td class="pl-4 font-semibold ">
                : {{ dataResi.summary.awb }}
              </td>
            </tr>
            <tr>
              <td>Status</td>
              <td class="pl-4 font-semibold">
                : {{ dataResi.summary.status }}
              </td>
            </tr>
            <tr>
              <td>Service</td>
              <td class="pl-4 font-semibold">
                : {{ dataResi.summary.service }}
              </td>
            </tr>
            <tr>
              <td>Deskripsi</td>
              <td class="pl-4 font-semibold">
                : {{ dataResi.summary.desc }}
              </td>
            </tr>
            <tr>
              <td>Dikirim oleh</td>
              <td class="pl-4 font-semibold">
                : {{ dataResi.detail.shipper }} - {{ dataResi.detail.origin }}
              </td>
            </tr>
            <tr>
              <td>Dikirim ke</td>
              <td class="pl-4 font-semibold">
                : {{ dataResi.detail.receiver }} - {{ dataResi.detail.destination }}
              </td>
            </tr>
          </table>
        </div>
        <hr/>
        <p class="text-center mt-6 font-bold">
          Histori
        </p>
        <section class="timeline-area">
          <div v-for="(item, index) in dataResi.history" :key="index" class="time">
            <h2 class="font-bold">
              {{ item.date }}
            </h2>
            <h3>{{ item.desc }}</h3>
          </div>
        </section>
        <!-- <div v-if="dataResi">
          <p v-for="(item, index) in dataResi.history" :key="index">{{item.date}}</p>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { computed, ref, useContext } from '@nuxtjs/composition-api'
import axios from 'axios'

export default {
  name: 'CekResi',
  setup () {
    const { store } = useContext()
    const ekspedisiSelected = ref('jne')
    const storeTheme = computed(() => store.state.theme)
    const awb = ref('')
    const apiKey = '95d638ec7b8f7252f92151cc473304774bcb2a57a256bb2a90ff551f00a2421f'
    const dataResi = ref([])
    const showDetail = ref(false)
    return {
      dataResi,
      ekspedisiSelected,
      storeTheme,
      showDetail,
      awb,
      cekResi,
      cek
    }

    function cek () {
      console.log('dataResi', dataResi.value)
    }

    async function cekResi () {
      // console.log('awb',awb.value)
      try {
        const url = `https://api.binderbyte.com/v1/track?api_key=${apiKey}&courier=${ekspedisiSelected.value}&awb=${awb.value}`
        const result = await axios.get(`${url}`)
        dataResi.value = result?.data?.data
        showDetail.value = true
        // console.log('result', result?.data?.data)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.cek-resi {
  @apply flex;
  .input-awb {
    @apply ml-4;
  }
}
.timeline-area {
  /* background: violet; */
  margin: 10px auto;
  max-width: 360px;
  border-left: 3px solid rgb(0, 0, 0);
  padding: 0 20px 0 20px;
}
.time {
  background-color: #fff;
  padding: 10px 25px;
  font-size: 16px;
  border: 1px solid rgb(0, 0, 0);
  line-height: 1.7;
  position: relative;
  max-height: 210px;
  margin-bottom: 20px;
}
.time:before {
  content: '';
  display: block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #000;
  border: 3px solid #ddd;
  position: absolute;
  top: 10px;
  left: -30px;
}

.time:after {
  content: '';
  width: 0;
  height: 0;
  border-style: solid;
  border-color: transparent rgb(0, 0, 0) transparent transparent;
  border-width: 8px;
  position: absolute;
  left: -17px;
  top: 10px;
}
.section {
  @apply block mb-8 px-8 justify-between;
}
.section-input {
  @apply p-8;
}

.items{
  .item {
    @apply px-3 mb-4;
  }
}

.cek-biaya {
  background: #0fbcf9;
}

@media only screen and (max-width: 650px) {
  .section {
    @apply px-2 pt-4;
  }
  .section-input {
    @apply p-2;
  }
  .content {
    @apply border-r-0 border-l-0;
  }
  .items{
    @apply mb-0;
    .item {
      @apply mb-2;
      .tujuan {
        @apply mt-8;
      }
    }
  }
}

@media only screen and (max-width: 450px) {
  .cek-resi {
    @apply block;
    .input-awb {
      @apply ml-0 mt-4 w-full;
    }
  }
}

@media only screen and (max-width: 250px) {
  .input-awb {
    max-width: 100px;
  }
}
</style>
