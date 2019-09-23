<template lang="pug">
    .home
      Bread
      .home_main
        .home_left
          .h_left_title
            img(:src="headPic")
            .h_left_name {{userName}}
            .h_left_info {{info}}
          .h_pic_list(@click="goDetailFn(item)" v-for="item in otherArr" :key="item.id")
            img(class="left_cover" :src="item.coverPic")
            .h_pic_list_font
              .h_pic_font_title {{item.name}}
              .h_pic_font_icon
                img(:src="item.coverPic")
          .h_l_info {{uiInfo}}
          .look_more(@click="goOtherFn")
            .look_font 查看更多
            .look_img
              img(src="../../static/images/look_more.png")
          .file_list(@click="goDetailFn(item)" v-for="item in fileArr" :key="item.id")
            img(class="file_icon" :src="item.coverPic")
            .file_font {{item.name}}
          .h_l_info {{fileInfo}}
          .look_more(@click="goFileFn")
            .look_font 查看更多
            .look_img
              img(src="../../static/images/look_more.png")
          .l_footer
            .l_footer_font 更多设计
            .l_footer_pic
              img(src="../../static/images/icon_common_icon_home_dribbble.png")
              img(src="../../static/images/icon_common_icon_home_behance.png")
              img(src="../../static/images/icon_common_icon_home_zcool.png")
        .home_right
          .r_pic_list
            .r_pic_head
              .r_pic_h_font
                .r_h_title 30秒简介
                .r_h_info 这是一个短视频，视频全长30s，希望你可以通过这个视频了解我的日常生活
              .r_pic_icon
                img(src="../../static/images/home_default_header_1.png")
            .r_pic_content
              .r_pic_con_main
                video(src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" controls="controls" poster="../../static/images/home_bg_img_show_1.png")
          .r_pic_list(@click="goDetailFn(item)" v-for="item in projectArr" :key="item.id")
            .r_pic_head
              .r_pic_h_font
                .r_h_title {{item.title}}
                .r_h_info {{item.intro}}
              .r_pic_icon
                img(:src="item.icon")
            .r_pic_content
              .r_pic_con_main
                img(:src="item.coverPic")
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
      fileArr: [],
      projectArr: [],
      info: '',
      uiInfo: '平时除了工作以外，会自己做一些UI/插画/动效等， 如果感兴趣，可以点击查看更多',
      fileInfo: '一些工作或者设计上的经验，希望可以多提意见，一 起交流进步',
      title: 'Welcome to Your Vue.js App'
    }
  },
  created() {
    this.Init()
  },
  methods: {
    Init() {
      this.axios.get(this.hostName+'/home/datas').then((res)=>{
      this.userName = res.data.data.users[0].nickName
      this.info = res.data.data.users[0].motto
      this.footerFont = res.data.data.users[0].thanking
      this.headPic = res.data.data.users[0].headPic
      this.projectArr = res.data.data.project
      this.otherArr = res.data.data.other
      this.fileArr = res.data.data.file
      // this.fileArr[0].webIcon = "@/assets/images/icon_common_icon_folder_yellow.png"
      // this.fileArr[1].webIcon = "@/assets/images/icon_common_icon_folder_green.png"
      // this.fileArr[2].webIcon = "@/assets/images/icon_common_icon_folder_blue.png"
      }).catch((err)=>{
        console.error("请联系管理员，开斌刘")
      })
    },
    goDetailFn(val) {
      this.$router.push({path: '/project_details',query: {id: val.id}})
    },
    goOtherFn() {
      this.$router.push('/other')
    },
    goProjectrFn() {
      this.$router.push('/project')
    },
    goFileFn() {
      this.$router.push('/file')
    }
  }
}
</script>
<style lang="less" scoped>
  .home {
    position: relative;
    .home_main {
      position: relative;
      width: 1100px;
      // height: 1650px;
      margin: auto;
      margin-top: 40px;
      .home_left {
        float: left;
        width: 320px;
        height: 100%;
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
            font-weight: 600;
            color: rgba(36,40,55,1);
            line-height: 40px;
            letter-spacing: 2px;
            margin-top: 20px;
          }
          .h_left_info {
            height: 17px;
            font-size: 12px;
            font-weight: 400;
            color: #717480;
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
          cursor: pointer;
          border-radius: 0 0 10px 10px;
          .left_cover {
            width: 100%;
            height: 180px;
            border-radius: 10px 10px 0 0;
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
          width: 100%;
          height: 65px;
          cursor: pointer;
          border-bottom: 1px solid #D4D5DE;
          .look_font {
            float: left;
            width: 50%;
            margin-top: 24px;
            font-size: 12px;
            font-weight: 600;
            color:rgba(36,40,55,1);
          }
          .look_img {
            float: left;
            width: 50%;
            line-height: 65px;
            text-align: right;
            img {
              // width: 24px;
              // height: 24px;
            }
          }
        }
        .file_list {
          float: left;
          width: 100%;
          height: 40px;
          cursor: pointer;
          margin-top: 30px;
          .file_icon {
            float: left;
            width: 40px;
            height: 40px;
          }
          .file_font {
            float: left;
            font-size:12px;
            font-family:PingFang-SC;
            font-weight:400;
            line-height: 40px;
            color:rgba(36,40,55,1);
            text-indent: 24px;
          }
        }
        .l_footer {
          float: left;
          width: 100%;
          height: 80px;
          margin-top: 20px;
          .l_footer_font {
            font-size:12px;
            color:rgba(36,40,55,1);
          }
          .l_footer_pic {
            float: left;
            height: 32px;
            width: 100%;
            margin-top: 20px;
            img {
              float: left;
              width: 32px;
              height: 32px;
              margin-right: 30px;
            }
          }
        }
      }
      .home_right {
        float: right;
        width: 750px;
        height: 100%;
        .r_pic_list {
          width: 100%;
          height: 537px;
          background: white;
          border-radius: 16px;
          margin-bottom: 30px;
          cursor: pointer;
          .r_pic_head {
            height: 94px;
            width: 100%;
            border-bottom: 1px solid #EEEEEE;
            .r_pic_h_font {
              float: left;
              width: 60%;
              height: 100%;
              margin-left: 30px;
              .r_h_title {
                width: 100%;
                font-size:18px;
                font-weight:600;
                margin-top: 20px;
                color:rgba(36,40,55,1);
              }
              .r_h_info {
                font-size:12px;
                width: 100%;
                margin-top: 12px;
                color:rgba(36,40,55,1);
              }
            }
            .r_pic_icon {
              float: right;
              width: 144px;
              height: 100%;
              border-left: 1px solid #eee;
              img {
                width: 60px;
                height: 60px;
                margin-top: 17px;
                margin-left: 42px;
              }
            }
          }
          .r_pic_content {
            width: 100%;
            height: 442px;
            .r_pic_con_main {
              width: 92%;
              height: 90%;
              margin: 2.7% auto;
              video,img {
                width: 100%;
                height: 100%;
                border-radius: 16px;
              }
            }
          }
        }
      }
    }
  }
</style>
