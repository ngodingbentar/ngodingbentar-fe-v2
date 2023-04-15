<template>
  <div class="cari" :class="bgId">
    <!-- <button @click="cek">cek</button> -->
    <div class="dew" :style="{ boxShadow: storeTheme.boxShadow }">
      <ejs-autocomplete
        v-model="search"
        :data-source="data"
        class="cari-input"
        :fields="fields"
        :placeholder="placeholder"
        :highlight="true"
        @change="searchFilter"
      />
    </div>
  </div>
</template>

<script>
import { computed, ref, useContext } from '@nuxtjs/composition-api'
export default {
  name: 'SearchNewComp',
  components: {
  },
  props: {
    data: {
      type: Array,
      required: false,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    },
    fields: {
      type: Object,
      required: false,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    },
    placeholder: {
      type: String,
      required: false,
      default: 'Search. . .'
    }
  },
  setup (props, { emit }) {
    const { store } = useContext()
    const storeTheme = computed(() => store.state.theme)
    const search = ref('')
    const bgId = computed(() => {
      if (storeTheme.value?.darktheme) {
        return 'darkTheme'
      } else {
        return 'lightTheme'
      }
    })

    return {
      search,
      bgId,
      storeTheme,
      searchFilter,
      cek
    }

    function cek () {
      console.log('props', props.data)
    }
    function searchFilter () {
      emit('search', search.value)
    }
  }
}
</script>
<style lang="postcss" scoped>
.cari {
  @apply my-4;
}
.dew {
  @apply m-auto px-6 rounded-lg;
  max-width: 400px;
}

.darkTheme{
  .card:hover{
    background: rgb(61, 81, 94);
  }
  .dew {
    .cari-input{
      @apply pl-4 py-2;
    }
    ::-webkit-input-placeholder {
          color: white !important;
      }
    .e-ddl.e-input-group.e-control-wrapper{
      .e-input {
        @apply text-lg;
        color: white !important;
      }
    }

    /* .e-ddl.e-input-group {
      input.e-input::selection {
            color: white !important;
            background: rgb(61, 81, 94) !important;
        }
    } */
  }

}
.lightTheme{
  .dew {
    .e-ddl.e-input-group.e-control-wrapper{
      .e-input {
        @apply text-lg;
      }
    }
  }
  .card:hover {
    background: #f1f1f1;
  }
}
@screen tablet {
}
@screen mobile {
  .cari {
    @apply px-4;
  }
}
</style>
