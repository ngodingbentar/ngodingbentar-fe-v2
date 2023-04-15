<template>
  <div class="card" :class="bgId" :style="{ background: theme.background, color: theme.color, boxShadow: theme.boxShadow }">
    <div v-if="product == 'reksadana'">
      <div class="flex justify-between">
        <p class="font-bold text-lg">
          {{ item.name }}
        </p>
        <button class="focus:outline-none" @click="show()">
          <font-awesome-icon v-if="isShow" class="icon-show" :icon="['fas', 'eye']" />
          <font-awesome-icon v-else class="icon-show" :icon="['fas', 'eye-slash']" />
        </button>
      </div>
      <div v-if="isShow" class="content">
        <table :style="{ borderColor: theme.color }">
          <tr>
            <th class="border-2">
              Management
            </th>
            <td class="border-2">
              {{ item.management }}
            </td>
          </tr>
          <tr>
            <th class="border-2">
              Bank Kustodian
            </th>
            <td class="border-2">
              {{ item.custodian }}
            </td>
          </tr>
          <tr>
            <th class="border-2">
              Tipe
            </th>
            <td class="border-2">
              {{ item.type }}
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div v-if="product == 'apps'">
      <div class="flex justify-between">
        <p class="font-bold text-lg">
          {{ item.name }}
        </p>
        <button class="focus:outline-none" @click="show()">
          <font-awesome-icon v-if="isShow" class="icon-show" :icon="['fas', 'eye']" />
          <font-awesome-icon v-else class="icon-show" :icon="['fas', 'eye-slash']" />
        </button>
      </div>
      <div v-if="isShow" class="content">
        <p><b>URL</b> : {{ item.url }}</p>
        <p><b>Owner</b> : {{ item.owner }}</p>
      </div>
    </div>
    <div v-if="product == 'ilegal'">
      <div class="flex justify-between">
        <p class="font-bold text-lg">
          {{ item.name }}
        </p>
        <button class="focus:outline-none" @click="show()">
          <font-awesome-icon v-if="isShow" class="icon-show" :icon="['fas', 'eye']" />
          <font-awesome-icon v-else class="icon-show" :icon="['fas', 'eye-slash']" />
        </button>
      </div>
      <div v-if="isShow" class="content">
        <table :style="{ borderColor: theme.color }">
          <tr>
            <th class="border-2">
              Alamat
            </th>
            <td class="border-2">
              {{ item.address }}
            </td>
          </tr>
          <tr>
            <th class="border-2">
              Tipe
            </th>
            <td class="border-2">
              {{ item.type }}
            </td>
          </tr>
          <tr>
            <th class="border-2">
              URL
            </th>
            <td class="border-2">
              <p v-for="(url, index) in item.urls" :key="index">
                {{ url }}
              </p>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, useContext, computed } from '@nuxtjs/composition-api'
export default {
  name: 'Cardcomp',
  props: {
    theme: {
      type: Object,
      required: true
    },
    item: {
      type: Object,
      required: true
    },
    product: {
      type: String,
      required: true
    }
  },
  setup (props) {
    // console.log(props.item)
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
      show,
      doRedirect
    }

    // redirect: function (link, target = '_blank') {
    //         window.open(link, target);
    //     }

    function doRedirect (link, target = '_blank') {
      window.open(link, target)
    }
    function show () {
      if (isShow.value === true) {
        isShow.value = false
      } else {
        isShow.value = true
      }
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
  .btn-show {
    @apply text-center w-full;
  }
  .content {
    @apply px-4 w-full pt-4 text-lg text-left;
  }
}
.card:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.20);
}

.icon-show{
  width: 20px;
  margin-left: 10px;
}

/* table */
table{
  width: 100%;
}
table, th, td {
  /* border: 0.2px; */
  border-collapse: collapse;
}
th, td {
  padding: 5px;
  text-align: left;
}

@screen mobile {
  .card {
    @apply my-2;
  }
}
</style>
