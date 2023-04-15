<template>
  <div class="title text-center" :style="{ background: theme.background, color: theme.color, boxShadow: theme.boxShadow }">
    <div class="text-3xl">{{ surah.name }}</div>
    <div class="text-xl mt-4">
      <p>( {{ surah.name_latin }} - {{ surah.translations.id.name }} )</p>
      <p>{ {surah.number_of_ayah }} Ayat</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Headerquran',
  props: {
    surah: {
      type: Object,
      required: true
    },
    theme: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="postcss" scoped>
.title {
  @apply py-4 rounded-lg;
  margin: 0 11rem;
}

@screen mobile {
  .title {
    @apply mx-4;
  }
}
</style>
