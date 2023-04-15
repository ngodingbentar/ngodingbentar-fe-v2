<template>
  <header v-if="!loadingTheme" class="app-header font-arabic font-bold" :style="{ background: storeTheme.background, color: storeTheme.color }">
    <div class="inner container">
      <div class="start">
        <div class="box" :style="{ boxShadow: storeTheme.boxShadow }">
          <nuxt-link class="btn-nav" to="/">
            <img class="img-nav" src="/iconNew.png">
          </nuxt-link>
        </div>

        <div v-if="enable" class="box ml-4" :style="{ boxShadow: storeTheme.boxShadow }">
          <nuxt-link class="btn-nav" :to="route">
            <font-awesome-icon :icon="['fas', 'home']" />
          </nuxt-link>
        </div>
      </div>
      <div class="end box" :style="{ boxShadow: storeTheme.boxShadow }">
        <button class="btn-nav focus:outline-none" @click="doSetting()">
          <font-awesome-icon :icon="['fas', 'cog']" />
        </button>
      </div>
      <Transition name="drawer">
        <Setting v-if="isSetting" :theme="storeTheme" @close="closeModal" />
      </Transition>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useContext } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'Navbar',
  props: {
    route: {
      type: String,
      required: false,
      default: '/'
    },
    enable: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  setup (props) {
    const { store } = useContext()
    const isSetting = ref(false)
    const loadingTheme = computed(() => store.state.loadingTheme)
    const storeTheme = computed(() => store.state.theme)

    return {
      storeTheme,
      loadingTheme,
      isSetting,
      cekData,
      closeModal,
      doSetting,
      cek
    }

    function cek () {
      console.log(props)
    }
    function closeModal () {
      isSetting.value = false
    }
    function doSetting () {
      isSetting.value = true
    }
    function cekData () {
    }
  }
})
</script>

<style lang="postcss" scoped>
.box {
  @apply rounded-full flex justify-center;
  padding: 10px;
  font-size: 20px;
  place-items: center;
  text-align: center;
}

.btn-nav {
  width: 25px;
  height: 25px;
}
/* img.img-nav{
  width: 22px;
} */

@font-face {
  font-family: "lpmq";
  src: url(/fonts/lpmq.otf) format("opentype");
  font-display: swap;
}
.font-arabic{
  font-family: "lpmq", Arial, sans-serif;
  line-height: 2;
}
.app-header {
  @apply fixed w-full top-0 py-4;
  @apply z-30 select-none;
  height: var(--header-height);
  min-width: 320px;
  .inner {
    @apply flex flex-wrap justify-between h-full text-xl;
    @apply px-8;
  }
  .start {
    @apply flex items-center;
  }
  .end {
    /* @apply grid grid-flow-col gap-4; */
  }
  .line {
    @apply block w-px opacity-50 mr-3;
    height: 32px;
  }
}
@screen mobile {
}
@screen sm {
}
@screen md {
  .app-header {
    @apply flex-shrink-0;
    /* @apply relative; */
  }
}
</style>
