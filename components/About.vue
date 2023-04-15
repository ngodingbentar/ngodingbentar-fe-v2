<template>
  <AppModal title="" :theme="theme" :show-header="true" :size="size" @close="$emit('close')">
    <div class="containerCustom" :style="{ background: theme.background, color: theme.color }">
      <div class="wrapper">
        <p>Source : <a :href="source" target="_blank">{{ source }}</a></p>
      </div>
    </div>
  </AppModal>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useContext } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'About',
  props: {
    theme: {
      type: Object,
      required: true
    },
    source: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const { store } = useContext()
    const isLoading = ref(true)
    const size = ref('small')
    const subStore = computed(() => store.state.sub)
    const audioStore = computed(() => store.state.audio)
    const isChecked = computed(() => {
      if (props.theme.darktheme) {
        return true
      } else {
        return false
      }
    })
    const isSub = computed(() => {
      if (subStore.value === 'On') {
        return true
      } else {
        return false
      }
    })
    const isAudio = computed(() => {
      if (audioStore.value === 'On') {
        return true
      } else {
        return false
      }
    })
    return {
      size,
      isLoading,
      isChecked,
      isSub,
      isAudio,
      changesub,
      changeaudio
    }
    function changesub () {
      store.dispatch('changeSub')
    }
    function changeaudio () {
      store.dispatch('changeAudio')
    }
  }
})
</script>

<style lang="postcss" scoped>
.switch {
  @apply mx-2;
  position: relative;
  display: inline-block;
  width: 48px;
  height: 21.76px;
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
.slider::before {
  position: absolute;
  content: '';
  height: 16.64px;
  width: 16.64px;
  left: 3.20px;
  bottom: 3.20px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
.round {
  border-radius: 21.76px;
}
.round::before {
  border-radius: 50%;
}
input:checked + .slider {
  background-color: #1f2937;
}
input:focus + .slider {
  box-shadow: 0 0 1px #1f2937;
}
input:checked + .slider::before {
  -webkit-transform: translateX(24px);
  -ms-transform: translateX(24px);
  transform: translateX(24px);
}
.containerCustom {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  .wrapper {
    @apply w-full;
    /* max-width: 550px; */
    @apply px-4 py-4;
    .title {
      color: #111827;
      /* font-size: 32px; */
      /* font-family: Inter; */
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 120%;
      margin-bottom: 12px;
    }
    .text {
      /* font-family: Circular Std; */
      font-style: normal;
      font-weight: 450;
      font-size: 16px;
      line-height: 150%;
    }
    .cancel {
      background: white;
    }
    .save {
      background: #1f2937;
      box-shadow: 0.1px 2px 6px rgba(0, 0, 0, 0.16);
      border-radius: 6px;
    }
    .item {
      @apply py-2;
    }
  }
}
</style>
