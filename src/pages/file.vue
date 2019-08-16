<template lang="pug">
    .file
      Bread
</template>
<script>
import Bread from '../components/bread'
export default {
  name: 'file',
  components: { Bread },
  data () {
    return {
      title: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<style lang="less" scoped>
  .file {
    position: relative;
  }
</style>
