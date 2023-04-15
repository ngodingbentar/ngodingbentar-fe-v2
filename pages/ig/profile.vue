<template>
  <div class="main">
    <ProfileComp :data-posts="dataPosts" />
    <div v-if="!loadingTheme" class="sikel" :style="{ background: storeTheme.background, color: storeTheme.color }">
      <div class="sec-audio">
        <div class="this-audio">
          <div class="footer-icons">
            <nuxt-link to="/ig">
              <font-awesome-icon class="footer-icon" :icon="['fas', 'home']" />
            </nuxt-link>
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
  </div>
</template>

<script>
import { computed, ref, useContext } from '@nuxtjs/composition-api'
import dataJson from '~/data/ig.json'
import ProfileComp from '~/components/ig/ProfileComp'
export default {
  name: 'Shorten',
  components: {
    ProfileComp
  },
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

.footer-icons{
  font-size: 25px;
  @apply flex justify-between w-full px-4 py-2;
}
.footer-img{
  width: 50px;
  @apply rounded-full;
}

.main{
  min-height: 100vh;
  /* @apply min-h-full ; */
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
