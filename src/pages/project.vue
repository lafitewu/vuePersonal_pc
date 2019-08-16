<template lang="pug">
    .project
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
  .project {
    position: relative;
  }
</style>
