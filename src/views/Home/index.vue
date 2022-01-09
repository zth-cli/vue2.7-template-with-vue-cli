<!--
 * @Author: 阮志雄
 * @Date: 2021-07-08 14:29:08
 * @LastEditTime: 2021-11-16 23:59:38
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \vue-template-with-elementui\src\views\Home\index.vue
-->
<template>
  <div class="x-upload-mian" :class="collspe ? 'x-upload-mian-collspe' : 'x-upload-mian-nocollspe'">
    <p class="x-upload-title" @click="collspe = !collspe">
      <span>图片上传</span>
      <i :class="collspe ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
    </p>
    <el-select v-model="cameraId" placeholder="选择相机" style="width: 100%; margin-bottom: 12px">
      <el-option v-for="item in cameraList" :key="item.id" :label="item.imeival" :value="item.id"> </el-option>
    </el-select>
    <div class="x-upload-content">
      <el-upload
        action="customize"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :data="{ img_rul: 'wqewqe1.jpg' }"
        :http-request="uploadFile"
        :file-list="fileList"
        list-type="picture"
        drag
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
  </div>
</template>

<script>
import { apiPost } from '@/api'
import qs from 'qs'
export default {
  data() {
    return {
      cameraId: '',
      cameraList: [],
      collspe: false,
      fileList: [
        {
          name: 'food.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        },
        {
          name: 'food2.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ]
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    uploadFile(params) {
      const { file, data } = params
      // 通过 FormData 对象上传文件
      var formData = new FormData()
      formData.append('file', file)
      formData.append('name', file.name)
      formData.append('lastModifiedDate', this.$day(file.lastModified).format('YYYY-MM-DD HH:mm:ss'))
      // this.$day(params.lastModifiedDate).format('YYYY-MM-DD HH:mm:ss')
      // /admin/carousel/addFile
      apiPost('/admin/carousel/addFile', formData)
      console.log(params)
    }
  }
}
</script>
<style lang="scss">
.x-upload-mian-collspe {
  transition: all 0.5s ease-in-out;
  top: 95% !important;
}
.x-upload-mian-nocollspe {
  transition: all 0.5s ease-in-out;
  bottom: 12px !important;
}
.x-upload-mian {
  @include box-shadow();
  @include content-background();
  padding: 16px;
  border-radius: 12px;
  position: fixed;
  right: 12px;
  // top: 95%;
  transition: all 0.5s ease-in-out;
  z-index: 10;
  .x-upload-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    cursor: pointer;
    @include font_color(null);
    margin-bottom: 10px;
  }
  .x-upload-content {
    max-height: 76vh;
    overflow: auto;
  }
}
</style>
