<template lang="pug">
    .project
      Bread
      .project_main
        .project_list(v-if="app_list.length > 0") 
          .pro_list_head
            .pro_list_h_title
              img(class="con_icon" src="../../static/images/icon_web_common_icon_title_slit.png")
              .h_title App项目
              .h_info {{appInfo}}
          .pro_list_pic(@click="goDetailFn(item)" v-for="item in app_list" :key="item.id")
            .pro_list_child_head
              .pro_list_child_head_font
                .pro_list_child_title {{item.title}}
                .pro_list_child_font {{item.intro}}
              .pro_list_child_head_pic
                img(:src="item.icon")
              .pro_list_child_content
                img(:src="item.coverPic")
          .clear
        .project_list(v-if="web_list.length > 0") 
          .pro_list_head
            .pro_list_h_title
              img(class="con_icon" src="../../static/images/icon_web_common_icon_title_slit.png")
              .h_title Web项目
              .h_info {{webInfo}}
          .pro_list_pic(@click="goDetailFn(item)" v-for="item in web_list" :key="item.id")
            .pro_list_child_head
              .pro_list_child_head_font
                .pro_list_child_title {{item.title}}
                .pro_list_child_font {{item.intro}}
              .pro_list_child_head_pic
                img(:src="item.icon")
              .pro_list_child_content
                img(:src="item.coverPic")
          .clear
        .project_list(v-if="mini_list.length > 0") 
          .pro_list_head
            .pro_list_h_title
              img(class="con_icon" src="../../static/images/icon_web_common_icon_title_slit.png")
              .h_title 小程序项目
              .h_info {{miniInfo}}
          .pro_list_pic(@click="goDetailFn(item)" v-for="item in mini_list" :key="item.id")
            .pro_list_child_head
              .pro_list_child_head_font
                .pro_list_child_title {{item.title}}
                .pro_list_child_font {{item.intro}}
              .pro_list_child_head_pic
                img(:src="item.icon")
              .pro_list_child_content
                img(:src="item.coverPic")
          .clear
        .project_list(v-if="other_list.length > 0") 
          .pro_list_head
            .pro_list_h_title
              img(class="con_icon" src="../../static/images/icon_web_common_icon_title_slit.png")
              .h_title 其他项目
              .h_info {{otherInfo}}
          .pro_list_pic(@click="goDetailFn(item)" v-for="item in other_list" :key="item.id")
            .pro_list_child_head
              .pro_list_child_head_font
                .pro_list_child_title {{item.title}}
                .pro_list_child_font {{item.intro}}
              .pro_list_child_head_pic
                img(:src="item.icon")
              .pro_list_child_content
                img(:src="item.coverPic")
          .clear
</template>
<script>
import Bread from '../components/bread'
export default {
  name: 'project',
  components: { Bread },
  data () {
    return {
      appInfo: '这里的APP的项目比较多啦，小tips：可以比较详细看第一篇，其他的可以看看画面，这样就可以用最低的时间成本来了解我的项目经验了（包括国内项目和海外项目哦）',
      webInfo: '这里的Web的项目比较多啦，小tips：可以比较详细看第一篇，其他的可以看看画面，这样就可以用最低的时间成本来了解我的项目经验了（包括国内项目和海外项目哦）',
      miniInfo: '这里的小程序的项目比较多啦，小tips：可以比较详细看第一篇，其他的可以看看画面，这样就可以用最低的时间成本来了解我的项目经验了（包括国内项目和海外项目哦）',
      otherInfo: '这里的其他的项目比较多啦，小tips：可以比较详细看第一篇，其他的可以看看画面，这样就可以用最低的时间成本来了解我的项目经验了（包括国内项目和海外项目哦）',
      app_list: [],
      web_list: [],
      mini_list: [],
      other_list: []
    }
  },
  created() {
    this.Init()
  },
  methods: {
    Init() {
      this.axios.get(this.hostName+'/project/datas').then((res)=>{
        var Len = res.data.data.length
        for(var i = 0; i < Len; i++) {
          if(res.data.data[i].type == 0) {
            this.app_list.push(res.data.data[i])
          }else if(res.data.data[i].type == 1) {
            this.web_list.push(res.data.data[i])
          }else if(res.data.data[i].type == 2) {
            this.mini_list.push(res.data.data[i])
          }else {
            this.other_list.push(res.data.data[i])
          }
        }
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
  .project {
    position: relative;
    .project_main {
      position: relative;
      width: 1100px;
      // height: 1650px;
      margin: auto;
      margin-top: 40px;
      .project_list {
        position: relative;
        width: 100%;
        margin-bottom: 40px;
        .pro_list_head {
          height: 70px;
          width: 100%;
          .pro_list_h_title {
            width: 100%;
            height: 20px;
            font-size:14px;
            font-weight:600;
            color:rgba(36,40,55,1);
            img {
              float: left;
              margin-top: 3.5px;
              height: 13px;
              margin-right: 4px;
            }
          }
          .h_title {
            width: 80%;
          }
          .h_info {
            margin-left: 17px;
            margin-top: 12px;
            font-size: 12px;
            width: 586px;
            font-weight: 300;
            color:rgba(103,107,120,1);
          }
        }
        .pro_list_pic {
          float: left;
          width:538px;
          height:421px;
          margin-top: 24px;
          background:rgba(255,255,255,1);
          border-radius:12px;
          cursor: pointer;
          &:nth-child(2n) {
            margin-right: 24px;
          }
          .pro_list_child_head {
            height: 90px;
            width: 100%;
            border-bottom: 1px solid #EEEEEE;
            .pro_list_child_head_font {
              float: left;
              width: 60%;
              margin-left: 20px;
              height: 100%;
              .pro_list_child_title {
                font-size:18px;
                font-weight:600;
                margin-top: 20px;
                color:rgba(36,40,55,1);
              }
              .pro_list_child_font {
                font-size:12px;
                margin-top: 8px;
                color:rgba(36,40,55,1);
              }
            }
            .pro_list_child_head_pic {
              float: right;
              width: 92px;
              height: 100%;
              border-left: 1px solid #eee;
              img {
                width: 32px;
                height: 32px;
                margin: 29px 30px;
                border-radius: 90px;
              }
            }
            .pro_list_child_content {
              float: left;
              width: 498px;
              height: 280px;
              margin: 19px;
              margin-top: 24px;
              img {
                width: 100%;
                height: 100%;
                border-radius: 10px;
              }
            }
          }
        }
        .clear {
          clear: both;
        }
      }
    }
  }
</style>
