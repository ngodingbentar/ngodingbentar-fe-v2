<template>
  <span>
    <div class="main">

      <div v-if="!loadingTheme" :style="{ background: storeTheme.background, color: storeTheme.color }" class="fixed">
        <div class="header-main">
          <div class="ig-logo">
            <img v-if="!darkTheme" src="https://res.cloudinary.com/dewaqintoro/image/upload/v1625883226/Ngodingbentar/pngegg_nb2ijc.png">
            <img v-else src="https://res.cloudinary.com/dewaqintoro/image/upload/v1625916132/Ngodingbentar/pngkey.com-instagram-png-13459_vjtwjq.png">
          </div>
          <div class="flex">
            <button class="mr-3 " @click="cek">
              <font-awesome-icon class="my-icon" :icon="['far', 'heart']" />
            </button>
            <button class="mx-2">
              <nuxt-link to="/ig/chat">
                <font-awesome-icon class="my-icon" :icon="['far', 'comment']" />
                <span class="toltip">12</span>
              </nuxt-link>
            </button>
          </div>
        </div>
      </div>

      <div v-if="!loadingTheme" :style="{ background: storeTheme.background, color: storeTheme.color }" class="example">
        <div class="content">

          <div>
            <div class="header-story">
              <div class="dew">
                <div class="itemS">
                  <div class="my-item-img flex">
                    <img src="https://res.cloudinary.com/dewaqintoro/image/upload/v1625883355/Ngodingbentar/Music/200x200cc_2_vwvpll.jpg">
                    <span class="btn-add">+</span>
                  </div>
                  <p class="-mt-1 pl-1">Your story</p>
                </div>

                <div v-for="(user, index) in dataUser" :key="index" class="item">
                  <div class="item-img">
                    <img :src="user.img">
                  </div>
                  <p v-if="user.name.length > 6">{{ user.name.substring(0, 6) }}...</p>
                  <p v-else>{{ user.name }}</p>
                </div>
              </div>
            </div>
            <hr/>
            <div class="home">
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
    </div>
  </span>
</template>

<script>
import { computed, ref, useContext } from '@nuxtjs/composition-api'
export default {
  name: 'Shorten',
  props: {
    dataUser: {
      type: Array,
      required: true
    },
    dataPosts: {
      type: Array,
      required: true
    }
  },
  setup () {
    const { store } = useContext()
    const loadingTheme = computed(() => store.state.loadingTheme)
    const storeTheme = computed(() => store.state.theme)
    const darkTheme = ref(false)

    cek()
    return {
      storeTheme,
      loadingTheme,
      darkTheme,
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
.btn-add{
  background: rgb(10, 145, 235);
  height: 30px;
  color: white;
  padding: 0px 7px;
  border: 2px solid white;
  margin-top: 42px;
  margin-left: -30px;
  @apply rounded-full font-bold;
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
  margin-top: 60px;
  width: 100%;
  /* height: 85vh; */
  height: 90vh;
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

.toltip{
  background: rgb(190, 4, 4);
  color: white;
  position: absolute;
  margin-top: -10px;
  margin-left: -20px;
  padding: 3px 5px ;
  @apply rounded-full text-xs;
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
  max-width: 450px;
}

.main{
  max-width: 450px;
  @apply min-h-full ;
}

.header-main{
  /* background: white; */
  @apply flex justify-between pt-2 pb-4;
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
