<template>
  <div class="card" :class="bgId" :style="{ background: theme.background, color: theme.color, boxShadow: theme.boxShadow }">
    <div class="content">
      <div>
        <p>{{ item.title }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, useContext, computed } from '@nuxtjs/composition-api'
export default {
  name: 'GlobalCardComp',
  props: {
    theme: {
      type: Object,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const { store } = useContext()
    const isShow = ref(false)
    const subStore = computed(() => store.state.sub)
    const bgId = computed(() => {
      if (props.theme?.darktheme) {
        return 'darkTheme'
      } else {
        return 'lightTheme'
      }
    })
    return {
      bgId,
      isShow,
      subStore,
      cek
    }

    function cek () {
      console.log('props', props.item)
    }
  }
}
</script>
<style lang="postcss" scoped>
.darkTheme:hover{
  background: rgb(61, 81, 94) !important;
}
.lightTheme:hover{
  background: #f1f1f1 !important;
}

.card {
  @apply px-4 pb-4 rounded-lg my-8;
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.15); */
  .btn-show {
    @apply text-center w-full;
  }
  .idSurah {
    @apply items-center justify-center flex rounded-full;
    width: 45px;
    height: 45px;
  }
  .content {
    @apply px-4 w-full;
  }
}

.arabic {
  @apply text-right text-3xl;
  line-height: 4rem !important;
}
.my-audio{
  max-width: 100%;
  height: 35px;
}
@screen mobile {
  .card {
    @apply my-2;
  }
  .arabic {
    @apply text-3xl;
  }
}
</style>
