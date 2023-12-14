<template>
  <el-button type="primary" v-show="btnVisible.add" @click="addData">新增</el-button>
  <el-button type="info" v-show="btnVisible.update" @click="updateData">修改</el-button>
  <el-button type="danger" v-show="btnVisible.delete" @click="deleteData">删除</el-button>
  <el-button type="success" v-show="btnVisible.import" @click="importData">导入</el-button>
  <el-button type="warning" v-show="btnVisible.export" @click="deleteData">导出</el-button>
</template>

<script>
export default {
  props:['btnVisible'],
  emits:['addData','updateData','deleteData','importData'],
  data() {
    return {

    }
  },
  methods: {
    addData(){
      this.$emit('addData');
    },
    updateData(){
      this.$emit('updateData');
    },
    deleteData(){
      this.$emit('deleteData');
    },
    importData(){
      this.$emit('importData')
    }
  }
}

</script>

<style></style>