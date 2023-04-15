<template>
  <span>
    <Navbar to="/agama" />
    <div v-if="!loadingTheme" class="main" :style="{ background: storeTheme.background, color: storeTheme.color, boxShadow: storeTheme.boxShadow }">
      <div class="p-4">
        <div class="box p-4" :style="{ boxShadow: storeTheme.boxShadow }">
          <div class="text-2xl font-bold">Credit</div>
          <p class="my-4">
            <a href="https://quran.kemenag.go.id" target="_blank">https://quran.kemenag.go.id</a>
          </p>
          <p class="my-4">
            <a href="https://github.com/rioastamal/quran-json" target="_blank">https://github.com/rioastamal/quran-json</a>
          </p>
          <p class="my-4">
            <a href="https://islam.nu.or.id/post/read/107344/susunan-bacaan-tahlil-doa-arwah-lengkap-dan-terjemahannya" target="_blank">https://islam.nu.or.id/post/read/107344/</a>
          </p>
          <p class="my-4">
            <a href="https://islam.nu.or.id/post/read/79315/susunan-bacaan-wirid-sesudah-shalat-lima-waktu" target="_blank">https://islam.nu.or.id/post/read/79315/</a>
          </p>
          <p class="my-4">
            <a href="https://fathimah.docs.apiary.io/#" target="_blank">https://fathimah.docs.apiary.io/#</a>
          </p>
          <p class="my-4">
            <a href="https://jagad.id/99-asmaul-husna-latin-arab-dan-terjemahan-indonesia-inggris/" target="_blank">https://jagad.id/</a>
          </p>
          <p class="my-4">
            <a href="https://www.doaharianislami.com/2017/06/kumpulan-doa-sehari-hari-lengkap-dalam-bahasa-arab-latin-dan-artinya.html" target="_blank">https://www.doaharianislami.com/</a>
          </p>
        </div>
      </div>
    </div>
  </span>
</template>

<script>
import { computed, useContext } from '@nuxtjs/composition-api'
import Navbar from '~/components/Navbar.vue'

export default {
  name: 'Source',
  components: {
    Navbar
  },
  setup () {
    const { store } = useContext()
    const loadingTheme = computed(() => store.state.loadingTheme)
    const storeTheme = computed(() => store.state.theme)

    return {
      storeTheme,
      loadingTheme
    }
  }
}
</script>

<style lang="postcss" scoped>

.darkTheme{
  /* color: rgb(61, 81, 94); */
  .box:hover{
    background: rgb(61, 81, 94);
  }
}
.lightTheme{
  .box:hover {
    background: #f1f1f1;
  }
}

.main {
  @apply pt-16 min-h-screen pb-8 mt-8 px-16;
  justify-content: center;
  align-self: center;
}

.item {
  @apply px-2;
}

.garis {
  border-top-width: 2px;
  padding-bottom: 10px;
}
.arti {
  position: relative;
}
.content {
  max-width: 80%;
}

.box {
  @apply rounded-2xl;
  place-items: center;
  text-align: center;
}

.footer {
  height: 70px;
}

@screen tablet {
.container {
    grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  }
}
@screen mobile {
  .main {
    @apply pt-10 px-2;
  }
  .container {
    grid-template-columns: repeat(auto-fill, minmax(40%, 1fr));
  }
}

@media only screen and (max-width: 420px) {
  .container {
    grid-template-columns: repeat(auto-fill, minmax(80%, 1fr));
  }
}
</style>
