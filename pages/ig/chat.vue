<template>
  <span>
    <div class="main">
      <div :style="{ background: storeTheme.background, color: storeTheme.color }" class="fixed">
        <div class="header-main">
          <div class="back">
            <nuxt-link to="/ig">
              <font-awesome-icon class="icon-back" :icon="['fas', 'arrow-left']" />
            </nuxt-link>
            <p class="text-xl font-bold ml-8">dewaqintoro</p>
          </div>
          <div class="flex">
            <button class="mr-3 ">
              <font-awesome-icon class="my-icon" :icon="['fas', 'bars']" />
            </button>
            <button class="mx-2 " @click="cek">
              <font-awesome-icon class="my-icon" :icon="['far', 'edit']" />
            </button>
          </div>
        </div>
      </div>

      <div class="search mt-16">
        <div class="search-wrap">
          <font-awesome-icon class="icon-back text-gray-400" :icon="['fas', 'search']" />
          <input id="username" class="input-search focus:outline-none pl-4" type="search" placeholder="Search">
          <font-awesome-icon class="icon-back text-gray-400" :icon="['fas', 'sliders-h']" />
        </div>
      </div>

      <div class="flex justify-between mt-2">
        <div class="tag">
          <button>
            <p>Primary</p>
          </button>
        </div>
        <div class="tag">
          <button>
            <p>General</p>
          </button>
        </div>
        <div class="tag">
          <button>
            <p>0 Requests</p>
          </button>
        </div>
      </div>

      <div class="chat">
        <div v-for="chat in dataMessages" :key="chat.id" class="flex my-2">
          <div>
            <div>
              <img :src="chat.img">
            </div>
          </div>
          <div class="chat-text">
            <div class="sender">
              <p>{{ chat.sender }}</p>
              <p> {{ chat.meesage }} . {{ chat.ago }}</p>
            </div>
            <div class="chat-icon">
              <font-awesome-icon :icon="['fas', 'camera']" />
            </div>
          </div>
        </div>
      </div>

    </div>
  </span>
</template>

<script>
import { computed, ref, useContext, watch } from '@nuxtjs/composition-api'
import dataJson from '~/data/ig.json'
export default {
  name: 'Shorten',
  setup () {
    const { store } = useContext()
    const dataMessages = dataJson.messages
    const loadingTheme = computed(() => store.state.loadingTheme)
    const storeTheme = computed(() => store.state.theme)
    const darkTheme = ref(false)

    watch(darkTheme, () => {
      console.log('darkTheme: ', darkTheme.value)
    })

    cek()
    return {
      storeTheme,
      loadingTheme,
      darkTheme,
      dataMessages,
      cek
    }

    function cek () {
      if (storeTheme.value.darktheme === true) {
        darkTheme.value = true
      } else {
        darkTheme.value = false
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.chat{
  @apply mx-4;
}
.chat-text{
  @apply flex justify-between w-full;
}
.sender{
  @apply my-auto pl-4 font-bold;
}
.chat img{
  width: 80px;
  @apply rounded-full;
}
.chat-icon{
  font-size: 30px;
  @apply my-2;
}

.tag{
  width: 50%;
  @apply text-center mx-auto border-b-2 py-2;
}

.search{
  @apply px-4;
}
.search-wrap{
  background: rgb(241, 241, 241);
  @apply flex w-full px-4 py-2 rounded-lg;
}
.input-search{
  background: rgb(241, 241, 241);
  @apply w-full;
}
.back{
  @apply flex ml-4;
}
.icon-back{
  font-size: 25px;
}

div.fixed {
  position: fixed;
  top: 0;
  /* background: white; */
  width: 100%;
}

.main{
  @apply min-h-full ;
}

.header-main{
  /* background: white; */
  @apply flex justify-between py-2;
}

.ig-logo{
  max-width: 120px;
  @apply ml-2;
}

.my-icon{
  font-size: 30px;
}

.post-icon{
  font-size: 24px;
}

.header-story{
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.header-story::-webkit-scrollbar {
  display: none;
}

.dew{
  @apply flex;
}

.item{
  min-width: 90px;
  @apply text-center p-2;
}

.itemS img{
@apply text-center p-1;
}
.item-img{
  border: 2px solid red;
  @apply rounded-full p-1;
}

.item-img img{
  @apply rounded-full;
}

.my-item-img{
  @apply rounded-full p-1;
}

.my-item-img img{
  min-width: 77px;
  @apply rounded-full pt-1;
}
.sikel {
   position: fixed;
   left: 0;
   bottom: 0;
   width: 100%;
   background-color: white;
   text-align: center;
}
.this-audio{
  @apply justify-items-center mx-auto items-center text-center justify-center flex;
}

.my-audio{
  @apply mb-4;
  width: 80vw;
  /* height: 35px; */
}

@media (max-width: 700px) {
}
@media (max-width: 500px) {
}

@media (max-width: 450px) {
  .my-audio{
    height: 35px;
  }
}
</style>
