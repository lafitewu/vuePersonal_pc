<template lang="pug">
    .upload
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
  .upload {
    position: relative;
  }
</style>
