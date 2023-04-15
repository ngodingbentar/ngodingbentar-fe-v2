<template>
  <div class="item">
    <div v-for="(x, index) in sum" :key="index" class="card my-8" :style="{ background: theme.background, color: theme.color, boxShadow: theme.boxShadow }">
      <div class="flex">
        <div class="nameSurahLoading">
          <div class="flex justify-between">
            <div class="satuA loading" />
            <div class="satuB loading" />
          </div>
          <div class="flex justify-between">
            <div class="duaA" />
            <div class="duaB loading" />
          </div>
          <div class="flex justify-between">
            <div class="tigaA" />
            <div class="tigaB loading" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Loading',
  props: {
    theme: {
      type: Object,
      required: true
    },
    sum: {
      type: Number,
      required: false,
      default: 4
    }
  },
  setup () {
  }
}
</script>

<style lang="postcss" scoped>
.item {
  @apply my-8 mx-4;
}
.card {
  @apply text-3xl p-4 rounded-lg;
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.15); */
  .idSurah {
    @apply text-center;
    width: 50px;
  }
  .nameSurah {
    @apply px-4 text-right w-full;
  }
}
.loading {
  @apply my-2;
  background: #c1c1c1;
  min-height: 25px;
  position: relative;
  overflow: hidden;
  border-radius: 30px;
}

.loading::before {
  content: '';
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, transparent, #d7d7d7, transparent);
  transform: translateX(-100%);
  animation: loading 1s infinite;
}

.nameSurahLoading {
  @apply px-4 justify-end items-end w-full;
}

.satuA {
  width: 8%;
}

.satuB {
  width: 90%;
}

.duaA {
  width: 10%;
}

.duaB {
  width: 65%;
}

.tigaA {
  width: 10%;
}

.tigaB {
  width: 50%;
}

@keyframes loading {
  100% {
    transform: translateX(100%);
  }
}

.img {
  min-height: 200px;
}
</style>
