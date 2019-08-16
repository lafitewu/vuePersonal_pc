<template lang="pug">
    .other
      Bread
</template>
<script>
import Bread from '../components/bread'
export default {
  name: 'upload',
  components: { Bread },
  data () {
    return {
      title: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<style lang="less" scoped>
  .other {
    position: relative;
  }
</style>
