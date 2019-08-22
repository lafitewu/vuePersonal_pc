<template lang="pug">
    .upload
      Bread
      .coverModal
        el-upload(
          class="avatar-uploader"
          action=""
          :http-request="uploadFn"
          name="upfile"
          ref="upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          )
          img(v-if="coverPic" :src="coverPic" class="avatar")
          i(v-else class="el-icon-plus avatar-uploader-icon")
        </el-upload>
        span(class="cover_span") 上传封面
        el-upload(
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess2"
          )
          img(v-if="iconPic" :src="iconPic" class="avatar")
          i(v-else class="el-icon-plus avatar-uploader-icon")
        </el-upload>
        span(class="cover_span") 上传封面
</template>
<script>
import Bread from '../components/bread'
export default {
  name: 'upload',
  components: { Bread },
  data () {
    return {
      coverPic: '',
      iconPic: ''
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.coverPic = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess2(res, file) {
      this.iconPic = URL.createObjectURL(file.raw);
    },
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
    uploadFn() {
      const formData = new FormData()
      const file = this.$refs.upload.uploadFiles[0]
      const headerConfig = { headers: { 'Content-Type': 'multipart/form-data' }}
      if (!file) { // 若未选择文件
        alert('请选择文件')
        return
      }
      formData.append('file', file.raw)
      this.axios.post(this.testName+'/uploader', formData, headerConfig).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .upload {
    position: relative;
    .coverModal {
      width: 1200px;
      height: 208px;
      background: white;
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
      .avatar-uploader {
        float: left;
        position: relative;
        top: 24px;
        width: 160px;
        height: 160px;
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
        display: block;
      }
    }
  }
</style>
