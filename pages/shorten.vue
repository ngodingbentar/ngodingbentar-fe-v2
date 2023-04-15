<template>
  <span>
    <Navbar :theme="myTheme" />
    <div class="section">
      <div class="main">
        <div class="head">Url Shortener</div>
        <div v-if="showToast" class="toast-wrapper">
          <div class="toast">
            Link Copied
          </div>
        </div>
        <!-- <transition name="toast">
          <Toast v-if="showToast" class="text-center m-auto w-full" />
        </transition> -->
        <div class="search">
          <input
            id="username"
            v-model="search"
            class="input-search focus:outline-none"
            type="search"
            placeholder="Paste long url and shorten it."
            @focus="clearSearch"
          >
          <button class="btn-search focus:outline-none" type="button" @click="searchFilter()">
            Shorten
          </button>
        </div>
        <div class="short-url">
          <input :value="myLink.shortUrl || '-'" class="copy-text text-center focus:outline-none">
          <button class="focus:outline-none mx-2 bg-gray-100 py-2 px-4 rounded-lg" @click="copy">
            Copy
          </button>
        </div>
      </div>
    </div>
  </span>
</template>

<script>
import { ref } from '@nuxtjs/composition-api'
import axios from 'axios'
// import Toast from '@/components/Toast'
import Navbar from '~/components/GlobalNavbar'

export default {
  name: 'Shorten',
  components: {
    Navbar
  },
  setup () {
    const search = ref('')
    const myLink = ref([])
    const myText = ref('wadudu')
    const isCopied = ref(false)
    const showToast = ref(false)
    const triggerToast = () => {
      showToast.value = true
      setTimeout(() => {
        showToast.value = false
      }, 3000)
    }
    const myTheme = {
      background: '#088b71',
      color: 'white',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    }

    return {
      search,
      myLink,
      myText,
      myTheme,
      isCopied,
      showToast,
      searchFilter,
      cek,
      copy,
      outFunc,
      triggerToast,
      clearSearch
    }

    function clearSearch () {
      console.log('clearSearch')
    }

    function outFunc () {
      const tooltip = document.getElementById('myTooltip')
      tooltip.innerHTML = 'Copy to clipboard'
    }

    function copy () {
      // eslint-disable-next-line no-useless-catch
      try {
        navigator.clipboard.writeText(myLink.value?.shortUrl)
        triggerToast()
      } catch (e) {
        throw e
      }
    }
    async function searchFilter () {
      const params = {
        longUrl: search.value
      }

      const url = 'https://www.nuxt.my.id/api/v1/shorten'
      const result = await axios.post(url, params)
      myLink.value = result?.data
      console.log('result', result)
    }

    function cek () {
      console.log('myLink', myLink.value)
    }
  }
}
</script>

<style lang="postcss" scoped>
.short-url {
  background: #05725c;
  @apply flex justify-center w-full py-2 mt-4 rounded-lg;
}
  /* enter transitions */
  .toast-enter-from {
    opacity: 0;
    transform: translateY(-60px);
  }
  /* .toast-enter-to {
    opacity: 1;
    transform: translateY(0);
  } */
  .toast-enter-active {
    transition: all 0.3s ease;
  }
  /* leave transitions */
  /* .toast-leave-from {
    opacity: 1;
    transform: translateY(0);
  } */
  .toast-leave-to {
    opacity: 0;
    transform: translateY(-60px);
  }
  .toast-leave-active {
    transition: all 0.3s ease;
  }

.section {
  @apply min-h-screen flex w-full;
  /* background: #00b894; */
}

.main {
  /* background: #0edfb5; */
  @apply text-center m-auto w-full;
  max-width: 60vw;
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
  background-color: #076e5a;
  @apply text-white font-bold py-2 px-4 rounded-r-lg;
  /* background-color: #4497eb; */
}
.btn-search:hover {
  /* background-color: #2187ec; */
  background-color: #0e836c;

}

.copy-text{
  /* @apply mx-2 py-2 px-4 text-white w-full; */
  background: transparent;
  color: white;
}

.toast-wrapper {
  position: fixed;
  width: 100%;
  top: 90px;
  right: 1px;
  z-index: 100;
}
.toast {
  padding: 8px;
  color: white;
  background: #139279;
  border-radius: 5px;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.2);
  max-width: 300px;
  margin: 0 auto;
}

@screen tablet {
}
@screen mobile {
  .main {
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
