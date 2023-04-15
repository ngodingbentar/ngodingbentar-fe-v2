<template>
  <span>
    <div class="flex">
      <div class="item w-2/3">
        <video autoplay>
          <source src="@/assets/ig4.mp4" type="video/mp4">
          <source src="movie.ogg" type="video/ogg">
          Your browser does not support the video tag.
        </video>
      </div>
      <div class="item w-1/3">
        <div>
          <img src="@/assets/2.PNG">
        </div>
        <div>
          <img src="@/assets/200x200cc.jpg">
        </div>
      </div>
    </div>
    <div class="flex">
      <div class="item w-1/3">
        <div>
          <img src="@/assets/200x200cc(4).jpg">
        </div>
        <div>
          <img src="@/assets/1.PNG">
        </div>
      </div>
      <div class="item w-2/3">
        <video autoplay>
          <source src="@/assets/ig3.mp4" type="video/mp4">
          <source src="movie.ogg" type="video/ogg">
          Your browser does not support the video tag.
        </video>
      </div>
    </div>

    <div class="flex">
      <div class="item w-1/3">
        <div>
          <img src="@/assets/200x200cc.jpg">
        </div>
        <div>
          <img src="@/assets/200x200cc(1).jpg">
        </div>
      </div>
      <div class="item w-1/3">
        <div>
          <img src="@/assets/200x200cc(2).jpg">
        </div>
        <div>
          <img src="@/assets/200x200cc(3).jpg">
        </div>
      </div>
      <div class="item w-1/3">
        <video controls>
          <source src="@/data/ig1.mp4" type="video/mp4">
          <source src="movie.ogg" type="video/ogg">
          Your browser does not support the video tag.
        </video>
      </div>
    </div>

    <div v-if="!loadingTheme" class="sikel" :style="{ background: storeTheme.background, color: storeTheme.color }">
      <div class="sec-audio">
        <div class="this-audio">
          <div class="footer-icons">
            <button>
              <nuxt-link to="/ig">
                <font-awesome-icon class="footer-icon" :icon="['fas', 'home']" />
              </nuxt-link>
            </button>
            <button>
              <nuxt-link to="/ig/search">
                <font-awesome-icon class="footer-icon" :icon="['fas', 'search']" />
              </nuxt-link>
            </button>
            <button>
              <font-awesome-icon class="footer-icon" :icon="['fas', 'plus-square']" />
            </button>
            <button>
              <font-awesome-icon class="footer-icon" :icon="['fas', 'shopping-bag']" />
            </button>
            <button>
              <nuxt-link to="/ig/profile">
                <font-awesome-icon class="footer-icon" :icon="['fas', 'user']" />
              </nuxt-link>
            </button>
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
  setup () {
    const { store } = useContext()
    const thisRoute = ref('home')
    const loadingTheme = computed(() => store.state.loadingTheme)
    const storeTheme = computed(() => store.state.theme)
    return {
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
.item{
  height: 274px;
}
.item img{
  @apply w-full;
}
.item video{
  height: 274px;
}

.footer-icons{
  font-size: 25px;
  @apply flex justify-between w-full px-4 py-2;
}
.footer-img{
  width: 50px;
  @apply rounded-full;
}

.main{
  @apply min-h-full ;
}

.sikel {
   position: fixed;
   left: 0;
   bottom: 0;
   width: 100%;
   /* background-color: white; */
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
</style>
