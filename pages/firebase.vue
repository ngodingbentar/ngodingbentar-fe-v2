<template>
  <div class="h-screen">
    <Navbar :theme="myTheme" />
    <div class="h-screen w-full items-center justify-center text-center ">
      <div class="flex items-center justify-center">
        <label class="upload-icon w-64 flex flex-col items-center px-4 py-6 bg-blue-400  text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-500 text-white">
          <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <span class="mt-2 text-base leading-normal">Select a file</span>
          <input type="file" class="hidden" @change="uploadFileHandler">
        </label>
      </div>
      <div class="mt-2 items-center justify-center">
        <p v-if="errorSize">
          Ukuran file terlalu besar !!! File harus dibawah 100kb.
        </p>
        <!-- <h1 v-if="loading">Loading</h1> -->
        <div class="section-loader items-center justify-center">
          <div v-if="loading" class="loader"/>
        </div>
        <h1 class="mt-2">
          My Images {{ myImg.length }}
        </h1>
        <div v-for="(item, index) in myImg" :key="index">
          <p class="link">
            {{ item }}
          </p>
        </div>
      </div>
    </div>
    <!-- <p>{{myImg}}</p> -->
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import axios from 'axios'
import Navbar from '~/components/GlobalNavbar'
export default defineComponent({
  components: {
    Navbar
  },
  setup () {
    const myImg = ref([])
    const loading = ref(false)
    const errorSize = ref(false)
    const myTheme = {
      background: '#f7f7f7',
      color: 'black',
      boxShadow: '5px 5px 12px #dedede,-5px -5px 12px #ffffff'
    }
    return {
      myImg,
      loading,
      errorSize,
      myTheme,
      uploadFileHandler
    }

    async function uploadFileHandler (event) {
      try {
        const file = event.target.files[0]
        if (file.size > 100000) {
          errorSize.value = true
          setTimeout(() => {
            errorSize.value = false
          }, 3000)
        } else {
          loading.value = true
          const bodyFormData = new FormData()
          bodyFormData.append('image', file)
          console.log('bodyFormData', bodyFormData)
          const url = 'https://aruspinggir-v1.herokuapp.com/api/uploads/s3'
          const result = await axios.post(url, bodyFormData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          myImg.value.push(result.data)
          if (result.data) {
            loading.value = false
          }
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
})
</script>

<style lang="postcss" scoped>
.upload-icon{
  margin-top: 30vh;
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

.link{
  background: rgb(248, 248, 248);
  max-width: 80%;
  /* border: 1px solid black; */
  @apply mx-auto my-4 py-2 rounded-lg shadow-md ;
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

</style>
