<template>
  <div>
    <el-upload v-bind="$attrs" action="customize" list-type="picture-card" :http-request="uploadFile">
      <i class="el-icon-plus"></i>
      <div slot="file" slot-scope="{ file }" v-if="getExtname(file.name)">
        <img class="el-upload-list__item-thumbnail" :src="getExtname(file.name)" :alt="file.name" />
      </div>
    </el-upload>
  </div>
</template>
<script>
import { apiUpload } from '@/api'
export default {
  name: 'ZthUpload',
  model: {
    prop: 'value',
    event: 'update',
  },
  props: {
    value: { type: Object },
    url: { type: String },
  },
  data() {
    return {
      pdf: require('./img/pdf.png'),
      word: require('./img/word.png'),
      excel: require('./img/excel.png'),
      extname: {
        word: ['doc', 'docx'],
        pdf: ['pdf'],
        excel: ['xls', 'xlsx', 'xlsm'],
      },
      extList: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'xlsm'],
    }
  },
  methods: {
    uploadFile(params) {
      const { file } = params
      // 通过 FormData 对象上传文件
      const formData = new FormData()
      formData.append('file', file)
      apiUpload(this.url, formData).then((response) => {
        if (response.success) {
          this.$emit('update', { fileName: file.name, ...response.data })
        } else {
          this.$emit('update', '')
        }
      })
    },
    getExtname(fileName) {
      const extname = fileName.split('.').slice(-1)[0]
      let path = ''
      if (this.extList.includes(extname)) {
        for (const key in this.extname) {
          if (this.extname[key].includes(extname)) {
            path = key
            break
          }
        }
      }
      return this[path]
    },
  },
}
</script>
