<template lang="pug">
    .project_details
      Bread
      .details_header
        .details_head_title {{name}}
        .details_head_info {{info}}
      .details_pic_list(v-for="(item,index) in list" :key="item.info" :title="item")
        .details_pic_l_title {{item.title}}
        .details_pic_l_info {{item.info}}
        .details_main_pic(v-for="items in list[index].picList" :key="items")
          img(:src="items")
</template>
<script>
import Bread from '../components/bread'
export default {
  name: 'project_details',
  components: { Bread },
  data () {
    return {
      name: "",
      info: "项目简单的介绍",
      list: []
    }
  },
  created() {
    this.initFn()
  },
  methods: {
    // 详情页面初始化
    initFn() {
      this.axios.get(this.hostName+'/details/data',
      {
        params: {
          id: this.$route.query.id
        }
      }).then((res)=>{
        console.log(res.data.data[0])
        var Len = res.data.data[0].detailInfo.split('&&').length - 1
        this.name = res.data.data[0].projectName
        this.info = res.data.data[0].projectInfo
        for(var i = 0; i < Len; i++) {
          this.list[i] = {
            title: res.data.data[0].detailName.split('&&')[i],
            info: res.data.data[0].detailInfo.split('&&')[i],
            picList: res.data.data[0].detailPicList.split('&&')[i],
          }
          this.list[i].picList = this.list[i].picList.split(',')
        }
        console.log(this.list)
      }).catch((err)=>{
        console.error("请联系管理员，开斌刘")
      })
    },
  }
}
</script>
<style lang="less" scoped>
  .project_details {
    position: relative;
    .details_header {
      width:1100px;
      height: 140px;
      border-radius: 6px;
      margin: auto;
      margin-top: 24px;
      margin-bottom: 40px;
      background: white;
       .details_head_title {
          margin-left: 48px;
          font-size: 28px;
          font-weight:600;
          padding-top: 35px;
          color:rgba(36,40,55,1);
       }
       .details_head_info {
          font-size:12px;
          margin-left: 48px;
          margin-top: 6px;
          font-weight: 300;
          color:rgba(163,165,174,1);
       }
    }
    .details_pic_list {
      width: 1100px;
      margin: auto;
      margin-top: 20px; 
      .details_pic_l_title {
        font-size:18px;
        font-weight:600;
        margin-left: 48px;
        color:rgba(36,40,55,1);
      }
      .details_pic_l_info {
        margin-left: 48px;
        font-size:12px;
        margin-top: 12px;
        margin-bottom: 20px;
        font-weight: 300;
        color:rgba(163,165,174,1);
      }
      .details_main_pic {
        width: 100%;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
