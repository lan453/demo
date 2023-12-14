<template>
  <el-dialog v-model="dialogVisible" title="文件上传" :center="true" width="30%" draggable>
      <el-upload
      ref="uploadRef"
      :action="getAction"
      :limit="1"
      :on-exceed="handleExceed"
      :auto-upload="false"
      class="upload"
      :on-success="successUpload"
      :on-error="filedUpload"
      accept=".xlsx"
      >
      <template #trigger>
          <el-button type="primary" plain>选择文件</el-button>
      </template>
      <el-button class="ml-3" type="success" plain @click="submitUpload">
          上传文件
      </el-button>
      <template #tip>
          <div class="el-upload__tip text-red">
          请选择指定格式的文件上传.xlsx
          </div>
      </template>
      </el-upload>
      <div v-show="hrefvisable" class="resultData">
        <a :href="downloadFile">点击下载结果</a>
      </div>
  </el-dialog>
</template>
<script>
import { ElMessage, ElMessageBox } from 'element-plus'
export default {
data () {
  return {
    dialogVisible: false,
    selectClassId: '',
    action: 'http://localhost:8088/mgt/student/import/',
    hrefvisable: false,
    downloadFile: ''
  }
},
computed: {
  getAction () {
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties, no-return-assign
    return this.action = this.action + this.selectClassId
  }
},
mounted () {
},
methods: {
  submitUpload () {
    this.$refs.uploadRef.submit()
  },
  successUpload (response, uploadFile, uploadFiles) {
    if (response.resultCode === 200) {
      this.hrefvisable = true
      this.downloadFile = 'http://localhost:8088/' + response.datasz
      ElMessage.info(response.message)
    } else {
      ElMessage.error(response.message)
    }
  },
  filedUpload (response, uploadFile, uploadFiles) {
    if (response.resultCode !== 200) {
      this.hrefvisable = false
      ElMessage.error(response.message)
    }
  }
}
}
</script>
<style>
.ml-3{
margin-left: 10px;
}
.resultData{
text-align:center;
font-size: 18px;
}
.resultData a{
color: red;
text-decoration: none;
}
.upload{
text-align:center;
}
</style>
