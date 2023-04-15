<template>
  <div class="search text-center">
    <input
      id="username"
      v-model="search"
      class="input-search focus:outline-none"
      :style="{ boxShadow: storeTheme.boxShadow }"
      type="search"
      placeholder="Cari Disini. . ."
      @change="searchFilter"
    >

    <button class="btn-search focus:outline-none" :style="{ boxShadow: storeTheme.boxShadow }" type="button" @click="searchFilter()">
      Cari
    </button>
  </div>
</template>

<script>
import { computed, ref, useContext } from '@nuxtjs/composition-api'
export default {
  name: 'SearchComp',
  components: {
  },
  setup (_, { emit }) {
    const { store } = useContext()
    const storeTheme = computed(() => store.state.theme)
    const search = ref('')

    return {
      search,
      storeTheme,
      searchFilter
    }
    function searchFilter () {
      emit('search', search.value)
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

.input-search {
  @apply appearance-none border rounded-lg py-2 px-8 text-gray-700 leading-tight;
}
.btn-search {
  @apply text-white font-bold py-2 px-4 rounded-lg ml-4;
  /* background-color: #4497eb; */
  background-color: #115394;
}
.btn-search:hover {
  /* background-color: #2187ec; */
  background-color: #1b63ac;

}

@screen tablet {
}
@screen mobile {
  .input-search {
    @apply my-2;
  }
  .btn-search {
    @apply my-2;
  }
  .input-search {
    @apply px-4;
  }
}
</style>
