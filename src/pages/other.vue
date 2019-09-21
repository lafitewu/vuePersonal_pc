<template lang="pug">
    .other
      Bread
      .other_main
        .other_pic_list(@click="goDetailFn(item)" v-for="item in list" :key="item.id")
          img(:src="item.coverPic")
</template>
<script>
import Bread from '../components/bread'
export default {
  name: 'other',
  components: { Bread },
  data () {
    return {
      list: ''
    }
  },
  created() {
    this.Init()
  },
  methods: {
    Init() {
      this.axios.get(this.hostName+'/other/datas').then((res)=>{
        this.list = res.data.data
        console.log(this.list)
      }).catch((err)=>{
        console.error("请联系管理员，开斌刘")
      })
    },
    goDetailFn(val) {
      this.$router.push({path: '/project_details',query: {id: val.id}})
    },
  }
}
</script>
<style lang="less" scoped>
  .other {
    position: relative;
    .other_main {
      position: relative;
      width: 1125px;
      // height: 1650px;
      margin: auto;
      margin-top: 40px;
      .other_pic_list {
        float: left;
        width: 350px;
        height: 200px;
        margin-top: 25px;
        margin-right: 25px;
        cursor: pointer; 
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
