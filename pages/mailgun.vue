<template>
  <div class="main-menu">
    <div class="section">
      <div class="bg-white p-8 rounded-3xl">
        <div v-if="isSuccess" class="success">
          <p>Email Berhasil Dikirim</p>
        </div>
        <div class="item">
          <div class="content">
            <label class="my-label">
              From
            </label>
            <input v-model="fromV" class="my-input" type="text">
          </div>
        </div>
        <div class="item">
          <div class="content">
            <label class="my-label">
              To
            </label>
            <input v-model="toV" class="my-input" type="email">
          </div>
        </div>
        <div class="item">
          <div class="content">
            <label class="my-label">
              Subject
            </label>
            <input v-model="subject" class="my-input" type="text">
          </div>
        </div>
        <div class="item">
          <div class="content">
            <label class="my-label">
              Brand
            </label>
            <input v-model="brand" class="my-input" type="text">
          </div>
        </div>
        <div class="item">
          <div class="content">
            <label class="my-label">
              customer
            </label>
            <input v-model="customer" class="my-input" type="text">
          </div>
        </div>
        <div class="item">
          <div class="content">
            <label class="my-label">
              Product-1
            </label>
            <input v-model="productOne" class="my-input" type="text">
          </div>
        </div>
        <div class="item">
          <div class="content">
            <label class="my-label">
              Price-1
            </label>
            <input v-model="priceOne" class="my-input" type="number">
          </div>
        </div>
        <div class="item">
          <div class="content">
            <label class="my-label">
              Product-2
            </label>
            <input v-model="productTwo" class="my-input" type="text">
          </div>
        </div>
        <div class="item">
          <div class="content">
            <label class="my-label">
              Price-2
            </label>
            <input v-model="priceTwo" class="my-input" type="number">
          </div>
        </div>
        <div class="item">
          <div class="content">
            <label class="my-label">
              Product-3
            </label>
            <input v-model="productThree" class="my-input" type="text">
          </div>
        </div>
        <div class="item">
          <div class="content">
            <label class="my-label">
              Price-3
            </label>
            <input v-model="priceThree" class="my-input" type="number">
          </div>
        </div>
        <button class="cek-biaya focus:outline-none justify-end text-white font-bold py-2 px-4 rounded-full" @click="sendEmail()">
          Kirim Email
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@nuxtjs/composition-api'
import axios from 'axios'
export default {
  setup () {
    const fromV = ref('Admin')
    const toV = ref('ngodingbentar.official@gmail.com')
    const subject = ref('Billing')
    const brand = ref('MyBrand')
    const customer = ref('Ani')
    const productOne = ref('Buku')
    const priceOne = ref(300000)
    const productTwo = ref('Tas')
    const priceTwo = ref(300000)
    const productThree = ref('Sepatu')
    const priceThree = ref(300000)
    const isSuccess = ref(false)

    if (process.browser) {
      window.smoothscroll = () => {
        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop
        if (currentScroll > 0) {
          window.requestAnimationFrame(window.smoothscroll)
          window.scrollTo(0, Math.floor(currentScroll - (currentScroll / 5)))
        }
      }
    }

    return {
      fromV,
      toV,
      subject,
      brand,
      customer,
      productOne,
      priceOne,
      productTwo,
      priceTwo,
      productThree,
      priceThree,
      isSuccess,
      sendEmail
    }

    async function sendEmail () {
      try {
        const url = 'https://ngodingbentar-be.herokuapp.com/api/v1/mailgun'
        const data = {
          from: fromV.value,
          to: toV.value,
          subject: subject.value,
          brand: brand.value,
          customer: customer.value,
          productOne: productOne.value,
          priceOne: priceOne.value,
          productTwo: productTwo.value,
          priceTwo: priceTwo.value,
          productThree: productThree.value,
          priceThree: priceThree.value
        }
        const result = await axios.post(url, data)
        if (result.data) {
          isSuccess.value = true
          window.smoothscroll()
          setTimeout(function () {
            isSuccess.value = false
          }, 5000)
        }
        // console.log(result)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.main-menu{
  background: rgb(241, 241, 241);
  @apply min-h-screen pb-16 pt-16 flex justify-center ;
}
.section {
  @apply mb-8 px-8 w-full;
  max-width: 700px;
}
.success {
  @apply bg-blue-400 p-2 rounded-3xl text-center text-white mx-8 mb-4;
}
.item {
  @apply flex flex-wrap mb-4;
  .content{
    @apply w-full px-3;
    .my-label {
      @apply block tracking-wide text-black text-xs font-bold mb-2;
    }
    .my-input {
      @apply appearance-none block w-full text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500;
    }
  }
}
.section-input {
  @apply w-full p-8;
}
.main {
  @apply flex;
}

.cek-biaya {
  background: #0fbcf9;
}

@media only screen and (max-width: 650px) {
  .main {
    @apply block;
  }
  .section {
    @apply px-2 pt-4;
  }
  .section-input {
    @apply w-full p-2;
  }
}

</style>
