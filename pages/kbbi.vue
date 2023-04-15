<template>
  <div class="min-h-screen">
    <Navbar :theme="myTheme" />
    <div class="section">
      <div class="main">
        <div class="head">
          KBBI - Unofficial
        </div>
        <div class="search">
          <input id="username" v-model="search" class="input-search focus:outline-none" type="search" placeholder="Paste long url and shorten it.">
          <button class="btn-search focus:outline-none" type="button" @click="searchFilter()">
            <font-awesome-icon :icon="['fas', 'search']" />
          </button>
        </div>
      </div>
    </div>
    <div class="means">
      <p v-if="means.length > 0" class="text-2xl font-bold">
        Arti
      </p>
      <div class="section-loader items-center justify-center">
        <div v-if="loading" class="loader" />
      </div>
      <div v-for="(mean, index) in means" :key="index" class="text-left">
        <p class="text-xl my-2">
          {{ index+1 }} - {{ mean }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@nuxtjs/composition-api'
import axios from 'axios'
import Navbar from '~/components/GlobalNavbar'

export default {
  name: 'Shorten',
  components: {
    Navbar
  },
  setup () {
    const means = ref([])
    const lema = ref('')
    const loading = ref(false)
    const search = ref('')
    const myTheme = {
      background: '#8854d0',
      color: 'white',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    }

    return {
      means,
      lema,
      search,
      loading,
      myTheme,
      searchFilter
    }

    async function searchFilter () {
      loading.value = true
      const url = `https://kbbi-api-zhirrr.vercel.app/api/kbbi?text=${search.value}`
      const result = await axios.get(url)
      if (result?.data) {
        loading.value = false
      }
      means.value = result?.data?.arti
      lema.value = result?.data?.lema
    }
  }
}
</script>

<style lang="postcss" scoped>
.section {
  @apply flex w-full;
  padding-top: 100px;
  /* background: #00b894; */
}

.main {
  /* background: #0edfb5; */
  @apply text-center mx-auto w-full;
  max-width: 60vw;
}

.means {
  max-width: 60vw;
  @apply pt-4 mx-auto text-center;
}

.head {
  @apply text-4xl font-bold;
}

.search {
  @apply mt-8 text-xl flex text-center;
}

.input-search {
  @apply appearance-none border py-2 px-4 w-full text-gray-700 leading-tight rounded-l-lg;
}
.btn-search {
  background-color: #8854d0;
  @apply text-white font-bold py-2 px-4 rounded-r-lg;
}
.btn-search:hover {
  background-color: #7b41cc;

}

.section-loader {
  height: 35px;
  /* background: blanchedalmond; */
}
.loader {
  margin: auto;
  border: 5px solid #f3f3f3;
  border-radius: 50%;
  border-top: 5px solid #3498db;
  width: 30px;
  height: 30px;
  -webkit-animation: spin 0.8s linear infinite; /* Safari */
  animation: spin 0.8s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@screen tablet {
}
@screen mobile {
  .main,.means {
    max-width: 80vw;
  }
  .input-search {
    @apply my-2 text-lg;
  }
  .btn-search {
    @apply my-2 text-lg font-semibold;
  }
  .input-search {
    @apply px-4;
  }
}
</style>
