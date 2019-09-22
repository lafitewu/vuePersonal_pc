<template lang="pug">
    .upload
      Bread
      el-form(ref="form" :model="form" label-width="80px")
        .coverModal
          el-upload(
            class="avatar-uploader"
            action=""
            :http-request="coverUploadFn"
            ref="upload"
            :show-file-list="false"
            )
            img(v-if="coverPic" :src="coverPic" class="avatar")
            i(v-else class="el-icon-plus avatar-uploader-icon")
          span(class="cover_span") 上传封面
          el-upload(
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :http-request="iconPicFn"
            ref="iconRef"
            )
            img(v-if="iconPic" :src="iconPic" class="avatar")
            i(v-else class="el-icon-plus avatar-uploader-icon")
          span(class="cover_span cover_span2") 上传说明头像
        .projectInfo
          el-input(v-model="form.active_name" placeholder="请输入项目名称")
          el-input(class="pro_info" v-model="form.project_info" placeholder="请输入项目的简单介绍")
          el-cascader(
            placeholder="请选择作品类型"
            v-model="form.types"
            :options="options"
            @change="handleChange")
        .project_child(v-for="(item,index) in projectNum" :key="index+'project_demo'")
          el-input(v-model="form.project[index].title" placeholder="请输入标题")
          el-input(class="pro_child_info" v-model="form.project[index].info" placeholder="请输入介绍")
          .pic_list
            el-upload(
              class="avatar-uploader"
              action=""
              :http-request="uploadCardFn(index)"
              :ref="uploadNameFn(index)"
              list-type="picture-card"
              )
              i(class="el-icon-plus")
            .clear
        .add_project(@click="addModelFn")
         | 点击添加模块
        .save_btn(@click="pushFn") 发布
</template>
<script>
import Bread from '../components/bread'
export default {
  name: 'upload',
  components: { Bread },
  data () {
    return {
      coverPic: '',
      iconPic: '',
      fileList0: [],
      fileList1: [],
      fileList2: [],
      fileList3: [],
      fileList4: [],
      fileList5: [],
      fileList6: [],
      form: {
        active_name: '',
        project_info: '',
        types: '',
        project: [
          {title: '',info: ''},
          {title: '',info: ''},
          {title: '',info: ''},
          {title: '',info: ''},
          {title: '',info: ''},
          {title: '',info: ''},
          {title: '',info: ''}
        ]
      },
      options: [{
        value: 'project',
        label: '项目',
        children: [
          {
            value: '0',
            label: 'APP'
          },
          {
            value: '1',
            label: 'Web'
          },
          {
            value: '2',
            label: '小程序'
          },
          {
            value: '3',
            label: '其他'
          }
        ]
      },
      {value: 'other', label: '其他'},
      {value: 'file', label: '思考'}
      ],
      projectNum: 1
    }
  },
  created() {
    
  },
  methods: {
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    uploadCardFn(index) {
      switch(index) {
      case 0:
        return this.coverUploadFn0
        break;
      case 1:
        return this.coverUploadFn1
        break;
      case 2:
        return this.coverUploadFn2
        break;
      case 3:
        return this.coverUploadFn3
        break;
      case 4:
        return this.coverUploadFn4
        break;
      case 5:
        return this.coverUploadFn5
        break;
      case 6:
        return this.coverUploadFn6
        break;
      default:
        console.error("最多上传6个模块,如需添加，请联系管理员（开开）")
    } 
    },
    uploadNameFn(index) {
      return "upload" + index
    },
    coverUploadFn() {
      this.uploadInit("coverPic","upload")
    },
    coverUploadFn0() {
      this.uploadCardInit("fileList0","upload0")
    },
    coverUploadFn1() {
      this.uploadCardInit("fileList1","upload1")
    },
    coverUploadFn2() {
      this.uploadCardInit("fileList2","upload2")
    },
    coverUploadFn3() {
      this.uploadCardInit("fileList3","upload3")
    },
    coverUploadFn4() {
      this.uploadCardInit("fileList4","upload4")
    },
    coverUploadFn5() {
      this.uploadCardInit("fileList5","upload5")
    },
    coverUploadFn6() {
      this.uploadCardInit("fileList6","upload6")
    },
    iconPicFn() {
      this.uploadInit("iconPic","iconRef")
    },
    // 上传函数封装
    uploadInit(dom,name) {
      const formData = new FormData()
      console.log(this.$refs[name].uploadFiles)
      const Len = this.$refs[name].uploadFiles.length
      const file = this.$refs[name].uploadFiles[Len-1]
      const headerConfig = { headers: { 'Content-Type': 'multipart/form-data' }}
      formData.append('file', file.raw)
      this.axios.post(this.hostName+'/uploader', formData).then(res => {
        this[dom] = this.hostName + "/uploads/" + res.data.filename
      })
    },
    uploadCardInit(dom,name) {
      const formData = new FormData()
      console.log(this.$refs[name][0].uploadFiles)
      const Len = this.$refs[name][0].uploadFiles.length
      const file = this.$refs[name][0].uploadFiles[Len-1]
      const headerConfig = { headers: { 'Content-Type': 'multipart/form-data' }}
      formData.append('file', file.raw)
      this.axios.post(this.hostName+'/uploader', formData).then(res => {
        this[dom].push(this.hostName + "/uploads/" + res.data.filename)
      })
    },
    // 下拉菜单
    handleChange(value) {
      console.log(value);
    },
    addModelFn() {
      this.projectNum ++
    },
    // 发布
    pushFn() {
      console.log(this.form)
      var projectName = "",
          projectInfo = "",
          projectPic = "";
      for(var i = 0; i < this.form.project.length; i++) {
        if(this.form.project[i].title != "") {
          projectName += this.form.project[i].title + "&&"
          projectInfo += this.form.project[i].info + "&&"
          projectPic += this["fileList"+i].join(',') + "&&"
        }
      }
      this.axios.get(this.hostName + '/pc/upload',
      {
        params: {
          id: new Date().getTime(),
          type: this.form.types[0],
          typeChild: this.form.types[1],
          name: this.form.active_name,
          info: this.form.project_info,
          iconPic: this.iconPic,
          coverPic: this.coverPic,
          projectName: projectName,
          projectInfo: projectInfo,
          projectPic: projectPic
        }
      }).then(res => {
        var that = this;
        if(res.data.code == 200) {
          this.$message({
            message: '恭喜老板，发布成功！',
            type: 'success'
          });
          this.$nextTick(function() {
            that.form.project_info = "";
            that.form.active_name = "";
            that.iconPic = "";
            that.coverPic = "";
            // that.form.types = [];
            that.form = {}
          })
        }else {
          this.$message({
            message: res.data.msg,
            type: 'error'
          });
        }
      }).catch(err => {
        this.$message({
          message: '类型选择出错，请联系管理员（开开）',
          type: 'error'
        });
      }) 
    }
  }
}
</script>
<style lang="less" scoped>
  .upload {
    position: relative;
    .coverModal {
      width: 1100px;
      height: 208px;
      background: white;
      border-radius: 8px;
      margin: 40px auto;
      .cover_span {
        float: left;
        display: block;
        color: #242837;
        font-size: 12px;
        width: 50px;
        font-weight: 400;
        line-height: 208px;
        margin-left: 24px;
        margin-right: 51px;
      }
      .cover_span2 {
        width: 80px;
      }
      .avatar-uploader {
        float: left;
        position: relative;
        top: 24px;
        width: 160px;
        height: 160px;
        border-radius: 8px;
        margin-left: 42px;
        background: #F4F5F6;
      }
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 160px;
        height: 160px;
        line-height: 160px;
        text-align: center;
      }
      .avatar {
        width: 160px;
        height: 160px;
        border-radius: 8px;
        display: block;
      }
    }
    .projectInfo {
      width: 1100px;
      height: 257px;
      margin-top: 40px;
      margin: auto;
      background: white;
      border-radius: 8px;
      .el-input {
        position: relative;
        width:1014px;
        height: 52px;
        outline: none;
        border: none;
        background:rgba(243,244,246,1);
        border-radius:8px;
        top: 36px;
        margin-left: 42px;
        color: #242837;
      }
      .pro_info {
        margin-top: 16px;
      }
      .el-cascader {
        width: 155px;
        height: 41px;
        margin-left: 42px;
        margin-top: 55px;
        background:rgba(243,244,246,1);
        border-radius:8px;
      }
    }
    .project_child {
      width: 1100px;
      // height: 650px;
      background: white;
      margin: 40px auto;
      padding-bottom: 40px;
      border-radius: 8px;
      .el-input {
        position: relative;
        width:1014px;
        height: 52px;
        outline: none;
        border: none;
        background:rgba(243,244,246,1);
        border-radius:8px;
        top: 36px;
        margin-left: 42px;
        color: #242837;
      }
      .pro_child_info {
        margin-top: 16px;
      }
      .pic_list {
        width:1014px;
        background:rgba(243,244,246,1);
        border-radius:8px;
        margin-left: 42px;
        margin-top: 55px;
        padding-bottom: 40px;
        .avatar-uploader {
          float: left;
          position: relative;
          top: 12px;
          width: 90%;
          // height:442px;
          border-radius: 8px;
          margin-left: 9%;
        }
        .clear {
          clear: both;
        }
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 160px;
        height: 160px;
        line-height: 160px;
        text-align: center;
      }
      .avatar {
        width: 160px;
        height: 160px;
        border-radius: 8px;
        display: block;
      }
      }
    }
    .add_project {
      width: 1100px;
      height: 148px;
      line-height: 148px;
      background: white;
      margin: auto;
      border-radius: 8px;
      font-size: 14px;
      color: #242837;
      text-indent: 45px;
      cursor: pointer;
    }
    .save_btn {
      width: 400px;
      height: 60px;
      background:rgba(92,193,103,1);
      border-radius:6px;
      margin: 30px auto;
      text-align: center;
      line-height: 60px;
      color: white;
      font-size: 20px;
      cursor: pointer;
    }
  }
</style>
<style>
  .el-input__inner {
    height: 100% !important;
    outline: none !important;
    border: none !important;
    border-radius: 8px !important;
    background:rgba(243,244,246,1) !important;
  }
  .el-upload--picture-card {
    /* float: left; */
    width: 160px !important;
    height: 160px !important;
    border: none !important;
    background: white !important;
    margin-top: 30px !important;
  }
  /* .el-upload-list--picture-card {
    float: left;
    width: 160px;
    height: 160px;
    border: none;
    background: white;
  } */
  .el-upload-list--picture-card .el-upload-list__item {
    width: 160px !important;
    height: 160px !important;
    border: none !important;
    margin-right: 65px !important;
    margin-top: 30px !important;
  }
  .el-upload--picture-card i {
    line-height: 160px !important;
  }
</style>
