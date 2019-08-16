<template lang="pug">
  .top_bread
    .bread_main
      .logo koobinliu
      .tab
        router-link(v-for="item in tabArr" :key="item.name" :to="item.path")
          | {{item.name}}
          .tab_line(v-if="item.path == actived")
</template>

<script>
export default {
  name: 'top_bread',
  data () {
    return {
      tabArr: [
        {path: '/home', name: '首页'},
        {path: '/project', name: '项目'},
        {path: '/other', name: '其他'},
        {path: '/file', name: '文档'}
      ],
      actived: ''
    }
  },
  created() {
    this.actived = this.$route.path
  }
}
</script>

<style lang="less" scoped>
  .top_bread {
    width: 100%;
    height: 60px;
    line-height: 60px;
    color: #242837;
    background: green;
    .bread_main {
      width: 610px;
      height: 100%;
      background: red;
      .logo {
        float: left;
        width: 100px;
        font-size: 18px;
        margin-left: 50px;
      }
      .tab {
        float: left;
        width: 360px;
        height: 100%;
        margin-left: 100px; 
        background: yellow;
        a {
          position: relative;
          display: inline-block;
          width: 85px;
          height: 100%;
          text-align: center;
          font-size: 14px;
          text-decoration: none;
          color: #242837;
          .tab_line {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 4px;
            background: #242837;
          }
        }
      }
    }
  }
</style>
