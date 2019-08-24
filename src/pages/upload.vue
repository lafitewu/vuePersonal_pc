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
        .project_child
          el-input(v-model="form.project.title" placeholder="请输入标题")
          el-input(class="pro_child_info" v-model="form.project.info" placeholder="请输入介绍")
          .pic_list
            el-upload(
              class="avatar-uploader"
              action=""
              :http-request="coverUploadFn"
              ref="upload"
              list-type="picture-card"
              )
              i(class="el-icon-plus")
              //- img(v-if="coverPic" :src="coverPic" class="avatar")
              //- i(v-else class="el-icon-plus avatar-uploader-icon")
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
      form: {
        active_name: '',
        project_info: '',
        types: '',
        project: {
          title: '',
          info: ''
        }
      },
      options: [{
        value: 'project',
        label: '项目',
        children: [
          {
            value: 'app',
            label: 'APP'
          },
          {
            value: 'web',
            label: 'Web'
          },
          {
            value: 'wxmini',
            label: '小程序'
          },
          {
            value: 'project_other',
            label: '其他'
          }
        ]
      },
      {value: 'other', label: '其他'},
      {value: 'file', label: '文档'}
      ]
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
    coverUploadFn() {
      this.uploadInit("coverPic","upload")
    },
    iconPicFn() {
      this.uploadInit("iconPic","iconRef")
    },
    // 上传函数封装
    uploadInit(dom,name) {
      const formData = new FormData()
      const Len = this.$refs[name].uploadFiles.length
      const file = this.$refs[name].uploadFiles[Len-1]
      const headerConfig = { headers: { 'Content-Type': 'multipart/form-data' }}
      formData.append('file', file.raw)
      this.axios.post(this.testName+'/uploader', formData).then(res => {
        this[dom] = this.testName + "/uploads/" + res.data.filename
      })
    },
    // 下拉菜单
    handleChange(value) {
      console.log(value);
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
      height: 650px;
      background: white;
      margin: 40px auto;
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
        // position: relative;
        width:1014px;
        height:442px;
        background:rgba(243,244,246,1);
        border-radius:8px;
        margin-left: 42px;
        margin-top: 55px;
       .avatar-uploader {
        float: left;
        position: relative;
        top: 12px;
        width: 90%;
        height:442px;
        border-radius: 8px;
        margin-left: 9%;
        // background: white;
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
  }
</style>
<style>
  .el-input__inner {
    height: 100%;
    outline: none;
    border: none;
    border-radius:8px;
    background:rgba(243,244,246,1);
  }
  .el-upload--picture-card {
    /* float: left; */
    width: 160px;
    height: 160px;
    border: none;
    background: white;
    margin-top: 30px;
  }
  /* .el-upload-list--picture-card {
    float: left;
    width: 160px;
    height: 160px;
    border: none;
    background: white;
  } */
  .el-upload-list--picture-card .el-upload-list__item {
    width: 160px;
    height: 160px;
    border: none;
    margin-right: 65px;
    margin-top: 30px;
  }
</style>
