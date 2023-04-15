<template>
  <span>
    <div class="main">

      <div v-if="!loadingTheme" :style="{ background: storeTheme.background, color: storeTheme.color }" class="example">
        <div class="content">

          <div>
            <div class="home">
              <div class="back">
                <nuxt-link to="/ig/profile">
                  <font-awesome-icon class="icon-back" :icon="['fas', 'arrow-left']" />
                </nuxt-link>
                <p class="text-xl font-bold ml-8">Posts</p>
              </div>
              <div v-for="post in dataPosts" :key="post.id" class="post">
                <div class="home-account">
                  <div class="home-account-left">
                    <img :src="post.profileImg">
                    <p class="my-auto ml-2 font-bold text-lg">{{ post.name }}</p>
                  </div>
                  <div class="my-auto">
                    <button class="mx-2">
                      <font-awesome-icon class="my-icon2" :icon="['fas', 'ellipsis-v']" />
                    </button>
                  </div>
                </div>
                <img :src="post.postImg">
                <div class="justify-between flex px-4 py-3">
                  <div class="flex">
                    <button>
                      <font-awesome-icon class="post-icon" :icon="['far', 'heart']" />
                    </button>
                    <button>
                      <font-awesome-icon class="post-icon mx-4 mirror" :icon="['far', 'comment']" />
                    </button>
                    <button>
                      <font-awesome-icon class="post-icon" :icon="['far', 'paper-plane']" />
                    </button>
                  </div>
                  <div>
                    <button>
                      <font-awesome-icon class="post-icon" :icon="['far', 'bookmark']" />
                    </button>
                  </div>
                </div>
                <div class="px-4">
                  <p><b>590 likes</b></p>
                  <div><b>dewaqintoro</b> What hghg ... <button>more</button></div>
                  <p class="text-gray-400 ">View all 103 comments</p>
                  <p class="text-gray-400 text-xs ">2 hours ago <b>. See translation</b></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!loadingTheme" class="sikel" :style="{ background: storeTheme.background, color: storeTheme.color }">
        <div class="sec-audio">
          <div class="this-audio">
            <div class="footer-icons">
              <button @click="setRoute('home')">
                <font-awesome-icon class="footer-icon" :icon="['fas', 'home']" />
              </button>
              <button @click="setRoute('search')">
                <font-awesome-icon class="footer-icon" :icon="['fas', 'search']" />
              </button>
              <button>
                <font-awesome-icon class="footer-icon" :icon="['fas', 'plus-square']" />
              </button>
              <button>
                <font-awesome-icon class="footer-icon" :icon="['fas', 'shopping-bag']" />
              </button>
              <button @click="setRoute('profile')">
                <font-awesome-icon class="footer-icon" :icon="['fas', 'user']" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </span>
</template>

<script>
import { computed, ref, useContext } from '@nuxtjs/composition-api'
import dataJson from '~/data/ig.json'
export default {
  name: 'Shorten',
  setup () {
    const { store } = useContext()
    const dataUser = dataJson.stories
    const dataPosts = dataJson.galery
    const thisRoute = ref('home')
    const loadingTheme = computed(() => store.state.loadingTheme)
    const storeTheme = computed(() => store.state.theme)
    return {
      dataUser,
      dataPosts,
      thisRoute,
      storeTheme,
      loadingTheme,
      setRoute
    }

    function setRoute (x) {
      thisRoute.value = x
    }
  }
}
</script>

<style lang="postcss" scoped>
.back{
  @apply flex ml-4 mt-4;
}
.icon-back{
  font-size: 25px;
}
.mirror{
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
.footer-icons{
  font-size: 25px;
  @apply flex justify-between w-full px-4 py-2;
}
.footer-img{
  width: 50px;
  @apply rounded-full;
}
.post{
  @apply my-4;
}
.example {
  /* background-color: white; */
  /* margin-top: 60px; */
  width: 100%;
  height: 100vh;
  border: 1px dotted black;
  overflow-y: scroll;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.example::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.example {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.home-account{
  @apply px-4 mb-2 flex justify-between;
}

.home-account img{
  width: 60px;
  @apply rounded-full;
}

.home-account-left{
  @apply flex justify-items-center my-auto;
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
