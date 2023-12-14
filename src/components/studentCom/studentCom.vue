<template>
  <el-container class="student-el" style="height: 480px;">
    <el-aside class="student-aside" width="180px">
      <studentAside ref="studentAsideRef" @StuQueryPage="StuQueryPage"></studentAside>
    </el-aside>
    <el-main class="student-main">
      <el-row>
        <ToolBar :btnVisible="btnVisible" @addData="addData" @importData="importData"></ToolBar>
      </el-row>
      <el-row>
        <stuQueryToolBar ref="stuQueryToolBarRef" @StuQueryPage="StuQueryPage"></stuQueryToolBar>
      </el-row>
      <el-row>
        <studentTable ref="studentTableRef" @StuQueryPage="StuQueryPage"></studentTable>
      </el-row>
    </el-main>
  </el-container>
  <importFileDialog ref="importFileRef"></importFileDialog>
</template>


<script>
import { ElMessage, ElMessageBox } from 'element-plus'
import studentTable from './StudentTable.vue';
import stuQueryToolBar from './stuQueryToolBar.vue';
import importFileDialog from './importFileDialog.vue'
import ToolBar from '../common/ToolBar.vue'
import studentAside from "./studentAside.vue"
import studentRequest from '@/network/student/studentRequest'
export default {
  components: {
    studentAside,
    ToolBar,
    importFileDialog,
    stuQueryToolBar,
    studentTable,
  },
  data() {
    return {
      btnVisible: {
        add: true,
        delete: false,
        update: false,
        export: true,
        import: true,
      }

    }
  },
  methods: {
    importData() {
      if(this.$refs.studentAsideRef.param.classId==''){
        this.$refs.importFileRef.dialogVisible = false;
        ElMessage.info("未选择班级！");
      }else{
        this.$refs.importFileRef.dialogVisible = true;
      }
    },
    StuQueryPage(newCurrentPage) {
      let param = this.$refs.studentAsideRef.param;
      let name = this.$refs.stuQueryToolBarRef.queryData.name;
      let enteryear = this.$refs.stuQueryToolBarRef.queryData.enteryear;
      this.$refs.importFileRef.selectClassId=param.classId;
      param.name=name;
      param.enteryear=enteryear;
      let pagedParam = this.$refs.studentTableRef.PageParam;
      if (newCurrentPage && newCurrentPage > 1) {
        param.page = pagedParam.currentPage;
      } else {
        param.page = 1;
        this.$refs.studentTableRef.PageParam.currentPage = 1;
      }
      param.rows = pagedParam.pageSize;
      studentRequest.queryPageData(param).then(response => {
        console.log(response);
        if (response.data && response.data.rows) {
          let total = response.data.total;
          let rows = response.data.rows;
          this.$refs.studentTableRef.tableData = rows;
          this.$refs.studentTableRef.PageParam.total = total;
        }
      }).catch(error => {
        console.log(error);
      })
    },
  }
}

</script>

<style>
.student-el {
  width: 100%;
}

.student-aside {
  line-height: 60px;
  border: 1px solid rgb(93, 210, 214);
}

.student-main {
  line-height: 60px;
  border: 1px solid rgb(93, 210, 214);
}
</style>