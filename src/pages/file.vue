<template lang="pug">
    .file
      Bread
      .file_main
        .file_pic_list(@click="goDetailFn(item)" v-for="item in list" :key="item.id")
          .file_pic_main
            img(class="file_icon" :src="item.coverPic")
            .file_pic_title {{item.name}}
</template>
<script>
import Bread from '../components/bread'
export default {
  name: 'file',
  components: { Bread },
  data () {
    return {
      list: ""
    }
  },
  created() {
    this.Init()
  },
  methods: {
    Init() {
      this.axios.get(this.hostName+'/file/datas').then((res)=>{
        this.list = res.data.data
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
  .file {
    position: relative;
    .file_main {
      position: relative;
      width: 1125px;
      // height: 1650px;
      margin: auto;
      margin-top: 40px;
      .file_pic_list {
        float: left;
        width: 350px;
        height: 200px;
        margin-top: 25px;
        margin-right: 25px;
        border-radius: 8px; 
        background: white;
        cursor: pointer; 
        .file_pic_main {
          width: 320px;
          height: 173px;
          border: 1px solid #eee;
          margin: auto;
          margin-top: 11.5px;
          border-radius: 6px; 
          text-align: center;
          .file_icon {
            width: 68px;
            height: 58px;
            margin-top: 40px;
          }
          .file_pic_title {
            font-size:12px;
            margin-top: 15px;
            color:rgba(103,107,120,1);
          }
        }
      }
    }
  }
</style>
