<template lang="pug">
    .home
      Bread
      .home_main
        .home_left
          .h_left_title
            img(:src="headPic")
            .h_left_name {{userName}}
            .h_left_info {{info}}
          .h_pic_list(v-for="item in otherArr" :key="item.id")
            img(class="left_cover" :src="item.coverPic")
            .h_pic_list_font
              .h_pic_font_title {{item.name}}
              .h_pic_font_icon
                img(:src="item.coverPic")
          .h_l_info {{uiInfo}}
          .look_more
            .look_font 查看更多
        .home_right
</template>
<script>
import Bread from '../components/bread'
export default {
  name: 'home',
  components: { Bread },
  data () {
    return {
      headPic: '',
      userName: '',
      otherArr: [],
      info: '',
      uiInfo: '平时除了工作以外，会自己做一些UI/插画/动效等， 如果感兴趣，可以点击查看更多',
      title: 'Welcome to Your Vue.js App'
    }
  },
  created() {
    this.axios.get(this.hostName+'/home/datas').then((res)=>{
      this.userName = res.data.data.users[0].nickName
      this.info = res.data.data.users[0].motto
      this.footerFont = res.data.data.users[0].thanking
      this.headPic = res.data.data.users[0].headPic
      this.projectArr = res.data.data.project
      this.otherArr = res.data.data.other
      this.fileArr = res.data.data.file
      this.fileArr[0].webIcon = "@/assets/images/icon_common_icon_folder_yellow.png"
      this.fileArr[1].webIcon = "@/assets/images/icon_common_icon_folder_green.png"
      this.fileArr[2].webIcon = "@/assets/images/icon_common_icon_folder_blue.png"
    }).catch((err)=>{
      console.error("请联系管理员，开斌刘")
    })
  },
}
</script>
<style lang="less" scoped>
  .home {
    position: relative;
    .home_main {
      position: relative;
      width: 1100px;
      height: 1650px;
      margin: auto;
      margin-top: 40px;
      background: red;
      .home_left {
        float: left;
        width: 320px;
        height: 100%;
        background: blue;
        .h_left_title {
          width: 100%;
          height: 191px;
          border-bottom: 1px solid #D4D5DE;
          img {
            width: 72px;
            height: 72px;
            border-radius: 90px;
          }
          .h_left_name {
            height: 40px;
            font-size: 28px;
            font-family: PingFang-SC;
            font-weight: 600;
            color: rgba(36,40,55,1);
            line-height: 40px;
            letter-spacing: 2px;
            margin-top: 20px;
          }
          .h_left_info {
            height: 17px;
            font-size: 12px;
            font-family: PingFang-SC;
            font-weight: 400;
            color: rgba(36,40,55,1);
            line-height: 17px;
            letter-spacing: 1px;
            margin-top: 17px;
          }
        }
        .h_pic_list {
          width: 100%;
          height: 230px;
          margin-top: 24px;
          background: white;
          border-radius: 0 0 10px 10px;
          .left_cover {
            width: 100%;
            height: 180px;
          }
          .h_pic_list_font {
            height: 50px;
            line-height: 50px;
            width: 100%;
            .h_pic_font_title {
              float: left;
              width: 70%;
              text-indent: 17px;
              font-size:12px;
              font-family:PingFang-SC;
              font-weight:600;
              color:rgba(36,40,55,1);
            }
            .h_pic_font_icon {
              float: right;
              width: 72px;
              height: 90%;
              border-left: 1px solid #EEEEEE;
              img {
                width: 34px;
                height: 34px;
                margin-left: 18px;
                margin-top: 5px;
                border-radius: 90px;
              }
            }
          }
        }
        .h_l_info {
          float: left;
          height:34px;
          font-size:12px;
          width: 300px;
          font-family:PingFang-SC;
          font-weight:400;
          color:rgba(36,40,55,1);
          line-height: 17px;
          margin-top: 20px;
        }
        .look_more {
          float: left;
          height: 65px;
          height: 100%;
          border-bottom: 1px solid #D4D5DE;
        }
      }
      .home_right {
        float: right;
        width: 750px;
        height: 100%;
        background: black;
      }
    }
  }
</style>
