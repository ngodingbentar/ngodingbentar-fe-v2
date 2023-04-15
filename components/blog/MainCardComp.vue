<template>
  <div>
    <h1>{{ blog.title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'SearchNewComp',
  components: {
  },
  props: {
    blog: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    return {
      cek
    }

    function cek () {
      console.log('props', props)
    }
  }
}
</script>
<style lang="postcss" scoped>
</style>
