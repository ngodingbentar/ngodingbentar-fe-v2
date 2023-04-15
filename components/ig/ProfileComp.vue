<template>
  <div v-if="!loadingTheme" :style="{ background: storeTheme.background, color: storeTheme.color }" class="main px-4">
    <div class="header pt-2">
      <div class="header-name">
        <p class="text-2xl font-bold">
          dewaqintoro
        </p>
        <span class="flex justify-center mt-3 ml-2">
          <font-awesome-icon :icon="['fas', 'chevron-down']" />
        </span>
      </div>
      <div>
        <font-awesome-icon class="header-icon mr-2" :icon="['fas', 'plus-square']" />
        <font-awesome-icon class="header-icon" :icon="['fas', 'bars']" @click="doSetting" />
      </div>
    </div>

    <div class="account">
      <div>
        <img src="https://res.cloudinary.com/dewaqintoro/image/upload/v1625883355/Ngodingbentar/Music/200x200cc_2_vwvpll.jpg">
      </div>
      <div class="left">
        <div class="item">
          <p class="text-xl">
            3
          </p>
          <p>Posts</p>
        </div>
        <div class="item">
          <p class="text-xl">
            768
          </p>
          <p>Followers</p>
        </div>
        <div class="item">
          <p class="text-xl">
            756
          </p>
          <p>Followings</p>
        </div>
      </div>
    </div>

    <div class="bio mt-4">
      <p class="font-bold ">
        Dew
      </p>
      <p class="text-gray-400">
        Personal Blog
      </p>
      <p class="font-bold ">
        Front-End Web Developer
      </p>
    </div>

    <div class="mt-4">
      <div class="flex justify-between">
        <button class="btn-two">
          Edit Profile
        </button>
        <button class="btn-two">
          Promotions
        </button>
      </div>
      <div class="flex justify-between mt-2">
        <button class="btn-three">
          Insights
        </button>
        <button class="btn-three">
          Add Shop
        </button>
        <button class="btn-three">
          Email
        </button>
      </div>
    </div>

    <div class="mt-4">
      <p><b>Story Highlights</b></p>
      <p>Keep your favorite stories on your profile</p>
    </div>

    <div class="flex justify-between mt-2">
      <div class="tag">
        <button>
          <font-awesome-icon :icon="['fas', 'th']" />
        </button>
      </div>
      <div class="tag">
        <button>
          <font-awesome-icon :icon="['fas', 'id-card-alt']" />
        </button>
      </div>
    </div>

    <div class="gallery">
      <div class="flex">
        <div v-for="post in dataPosts" :key="post.id" class="gallery-item">
          <nuxt-link :to="'../ig/'+post.id">
            <img :src="post.postImg">
          </nuxt-link>
        </div>
      </div>
    </div>

    <Transition name="drawer">
      <Settingcompig v-if="isSetting" :theme="storeTheme" @close="closeModal" />
    </Transition>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ProfileComp',
  props: {
    dataPosts: {
      type: Array,
      required: false,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: '/'
    }
  },
  setup () {
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
      doSetting
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
.gallery img{
  min-width: 100px;
}
.gallery-item{
  padding: 1px;
}
.header{
  @apply flex justify-between ;
}
.header-name{
  @apply flex justify-center my-auto;
}
.header-icon{
  font-size: 30px;
}
.account{
  @apply flex justify-between mt-4;
}
.account .left{
  width: 65%;
  /* background: gray; */
  @apply flex justify-between my-auto;
}
.account img{
  width: 100px;
  @apply rounded-full;
}
.account .item{
  @apply text-center font-bold;
}
.btn-two{
  border: 1px solid rgb(160, 160, 160);
  width: 48%;
  border-radius: 5px;
  padding: 5px 0px;
  @apply font-bold;
}
.btn-three{
  border: 1px solid rgb(160, 160, 160);
  width: 31%;
  border-radius: 5px;
  padding: 5px 0px;
  @apply font-bold;
}
.tag{
  width: 50%;
  @apply text-center mx-auto border-b-2 py-2;
}
.tag svg{
  font-size: 24px;
}
</style>
