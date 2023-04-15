<template>
  <span>
    <Navbar :enable="false" />
    <div v-if="!loadingTheme" class="main text-center" :style="{ background: storeTheme.background, color: storeTheme.color }">
      <div class="">
        <div v-if="loading">
          <Loading :theme="storeTheme" />
        </div>
        <div v-else>
          <nuxt-link v-for="item in dataDoa" :key="item.id" :to="item.route">
            <Cardcomp class="content" :theme="storeTheme" :item="item" />
          </nuxt-link>
          <a v-for="item in extIndex" :key="item.id" :href="item.route" target="_blank">
            <Cardcomp class="content" :theme="storeTheme" :item="item" />
          </a>
        </div>
      </div>
    </div>
  </span>
</template>

<script>
import { computed, ref, useContext } from '@nuxtjs/composition-api'
import Loading from '@/components/Loading.vue'
import Cardcomp from '@/components/GlobalCardComp'
import Navbar from '~/components/Navbar.vue'
import dataJson from '~/data/myindex.json'
import dataExt from '~/data/extIndex.json'

export default {
  name: 'Ngodingbentar',
  components: {
    Navbar,
    Loading,
    Cardcomp
  },
  setup () {
    const { store } = useContext()
    const dataDoa = dataJson.data
    const extIndex = dataExt.data
    const loadingTheme = computed(() => store.state.loadingTheme)
    const loading = ref(true)
    const storeTheme = computed(() => store.state.theme)

    setLoading()

    return {
      storeTheme,
      loadingTheme,
      loading,
      dataDoa,
      extIndex
    }

    function setLoading () {
      setTimeout(function () {
        loading.value = false
      }, 200)
    }
  }
}
</script>

<style lang="postcss" scoped>
.darkTheme{
  /* color: rgb(61, 81, 94); */
  .card:hover{
    background: rgb(61, 81, 94);
  }
}
.lightTheme{
  .card:hover {
    background: #f1f1f1;
  }
}
.main {
  @apply pt-24 min-h-screen pb-8 px-40;
}

.content {
  @apply my-8;
}
.item {
  @apply px-8 mx-36 my-4;
}
.card {
  @apply text-2xl p-4 rounded-lg;
}
@screen tablet {
  .main {
    @apply pt-28;
  }
}
@screen mobile {
  .main {
    @apply pt-20 px-8;
  }
  .item {
    @apply mx-2 px-2;
  }
}
</style>
