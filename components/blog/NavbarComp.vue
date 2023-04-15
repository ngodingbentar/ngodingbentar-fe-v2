<template>
  <header v-if="!loadingTheme" class="app-header font-bold" :style="{ background: storeTheme.background, color: storeTheme.color }">
    <div class="inner container">
      <div class="start">
        <div class="box" :style="{ boxShadow: storeTheme.boxShadow }">
          <nuxt-link class="btn-nav" to="/">
            <img class="img-nav" src="/iconNew.png">
          </nuxt-link>
        </div>
        <div v-if="enable" class="mx-2">
          <nuxt-link :to="route">
            Home
          </nuxt-link>
        </div>
        <div class="dropdown">
          <button class="dropbtn font-bold mx-2 focus:outline-none">
            Tutorial
          </button>
          <div class="dropdown-content">
            <nuxt-link to="/blog/search" class="top">
              <p class="text-black dropdown-item" @click="$emit('tutorial', '')">
                Semua
              </p>
            </nuxt-link>
            <nuxt-link to="/blog/search?category=MERN">
              <p class="text-black dropdown-item" @click="$emit('tutorial', 'MERN')">
                MERN
              </p>
            </nuxt-link>
            <nuxt-link to="/blog/search?category=Mongodb">
              <p class="text-black dropdown-item" @click="$emit('tutorial', 'Mongodb')">
                Mongodb
              </p>
            </nuxt-link>
            <nuxt-link to="/blog/search?category=Expressjs">
              <p class="text-black dropdown-item" @click="$emit('tutorial', 'Expressjs')">
                Expressjs
              </p>
            </nuxt-link>
            <nuxt-link to="/blog/search?category=Reactjs">
              <p class="text-black dropdown-item" @click="$emit('tutorial', 'Reactjs')">
                Reactjs
              </p>
            </nuxt-link>
            <nuxt-link to="/blog/search?category=Nodejs" class="under">
              <p class="text-black dropdown-item" @click="$emit('tutorial', 'Nodejs')">
                Nodejs
              </p>
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="end">
        <button class="btn-nav focus:outline-none mr-3" @click="doSetting()">
          <font-awesome-icon :icon="['fas', 'search']" />
        </button>
        <button class="btn-nav focus:outline-none" @click="changetheme()">
          <font-awesome-icon v-if="isChecked" :icon="['fas', 'moon']" />
          <font-awesome-icon v-else :icon="['fas', 'sun']" />
        </button>
      </div>

      <Transition name="drawer">
        <SearchModalComp v-if="isSetting" :theme="storeTheme" @close="closeModal" @dosearch="dosearch" />
      </Transition>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'NavbarComp',
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
    },
    isblogid: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup (_, { emit }) {
    const { store } = useContext()
    const isSetting = ref(false)
    const loadingTheme = computed(() => store.state.loadingTheme)
    const storeTheme = computed(() => store.state.theme)
    const routeId = '/blog?category=MERN'

    const isChecked = computed(() => {
      if (storeTheme.value.darktheme) {
        return true
      } else {
        return false
      }
    })

    return {
      storeTheme,
      loadingTheme,
      isSetting,
      routeId,
      isChecked,
      cekData,
      closeModal,
      doSetting,
      cek,
      setTutorial,
      changetheme,
      dosearch
    }

    function changetheme () {
      console.log('changetheme')
      store.dispatch('changeTheme')
    }

    function setTutorial () {
      emit('tutorial')
    }
    function dosearch () {
      emit('dosearch')
    }

    function cek () {
      // console.log(props)
      console.log('storeTheme', storeTheme)
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
.item-mode {
  /* @apply py-2;  */
}

.dropbtn {
  /* background-color: #4CAF50; */
  /* color: white; */
  /* padding: 16px;
  font-size: 16px; */
  border: none;
  cursor: pointer;
}

.dropdown-item{
  cursor: pointer;
}

/* .dropdown-item:hover{
  background: gray;
  color: white;
} */

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 10px;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown-content a.top:hover {
  border-radius: 10px 10px 0 0;
}

.dropdown-content a.under:hover {
  border-radius: 0 0 10px 10px;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

/* .dropdown:hover .dropbtn {
  background-color: #3e8e41;
} */

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
    @apply flex items-center;
  }
  .line {
    @apply block w-px opacity-50 mr-3;
    height: 32px;
  }
}
@screen mobile {
  .app-header {
    .inner{
      @apply text-base ;
    }
  }
}
@screen sm {
}
@screen md {
  .app-header {
    @apply flex-shrink-0;
    /* @apply relative; */
    /* .inner{
      @apply text-sm;
    } */
  }
}
</style>
