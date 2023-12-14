<template>
  <el-dialog v-model="isVisible" title="修改辅导员属性" width="600" draggable>
    <el-form ref="instructorFormRef" :model="instructor" :rules="myRules">
      <el-form-item label="工号:" :label-width="fromLableWidth" prop="num">
        <el-input v-model="instructor.num" autocomplete="off" required style="width:300px ;" />
      </el-form-item>
      <el-form-item label="姓名:" :label-width="fromLableWidth" prop="enteryear">
        <el-input v-model="instructor.name" autocomplete="off" required style="width:300px ;" />
      </el-form-item>
      <el-form-item label="所属学院:" :label-width="fromLableWidth" prop="colleageid">
        <el-select v-model="instructor.colleageid" placeholder="请选择所属学院" style="width:300px ;">
          <el-option v-for="item in colleages" :label="item.text" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="入职日期:" :label-width="fromLableWidth" prop="enterdate">
        <el-date-picker editable=ture v-model="instructor.enterdate" type="date" placeholder="请输入入职日期"
          value-format="YYYY/MM/DD" style="width:300px ;" />
      </el-form-item>
      <el-form-item label="离职日期:" :label-width="fromLableWidth" prop="leavedate">
        <el-date-picker editable=ture v-model="instructor.leavedate" type="date" placeholder="请输入离职日期"
          value-format="YYYY/MM/DD" style="width:300px ;" />
      </el-form-item>

    </el-form>
    <span class="dialog-footer" style="text-align:center">
      <el-button @click="isVisible = false">取消</el-button>
      <el-button type="primary" @click="submitData">
        确定
      </el-button>
    </span>

  </el-dialog>
</template>
  
<script>
import { ElMessage } from 'element-plus';
import colleageRequst from '@/network/colleage/ColleageRequest'
import InstructorRequest from '@/network/instructor/InstructorRequest'
export default {
  emits: ['queryUpdate'],
  data() {
    return {
      isVisible: false,
      fromLableWidth: '100px',
      instructor: {
        id: '',
        num: '',
        name: '',
        enterdate: '',
        leavedate: '',
        colleageid: '',
      },
      colleages: [],
      myRules: {
        num: [
          { required: true, message: '请输入辅导员工号', trigger: 'blur' },
          // { min: 1, max: 50, message: '请输入2~50个字符', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入辅导员名称', trigger: 'blur' },
          // { min: 4, max: 4, message: '请输入4个字符', trigger: 'blur' },
        ],
        colleageid: [
          { required: true, message: '请输入学院名称', trigger: 'blur' },
          // { min: 1, max: 50, message: '请输入2~50个字符', trigger: 'blur' },
        ],
        enterdate: [
          { required: true, message: '请输入入职日期', trigger: 'blur' },
          // { min: 1, max: 50, message: '请输入2~50个字符', trigger: 'blur' },
        ],

      },
    }
  },
  updated() {
    if (this.instructor.id > 0) {
      this.queryDataByID();
    }
  },
  mounted() {
    colleageRequst.queryColleages().then(response => {
      if (response.data.resultCode == 200) {
        this.colleages = response.data.datas;
        console.log(this.colleages);
      } else {
        ElMessage.error(response.data.message);
      }
    }).catch(error => {
      ElMessage.error(error);
    })
  },
  methods: {
    resetAllData() {
      for (let pro in this.instructor) {
        this.instructor[pro] = '';
      }
    },
    submitData() {
      this.$refs.instructorFormRef.validate((valid, fields) => {
        if (valid) {
          const dayjs = require('dayjs');
          this.instructor.enterdate = dayjs(this.instructor.enterdate).format('YYYY/MM/DD');
          console.log(this.instructor);
          if (this.instructor.leavedate != null && this.instructor.leavedate != '') {
            this.instructor.leavedate = dayjs(this.instructor.leavedate).format('YYYY/MM/DD');
            console.log(this.instructor.leavedate);
          }

          console.log(this.instructor.enterdate);
          InstructorRequest.updateInstructor(this.instructor).then(response => {
            if (response.data.resultCode == 200) {
              this.$emit('queryUpdate');
              this.isVisible = false;
              ElMessage.info(response.data.message);
            } else {
              ElMessage.error(response.data.message);
            }
          }).catch(error => {
            ElMessage.error(error);
          })
        } else {
          console.log('erro submit!', fields);
        }
      })
    },
    queryDataByID() {
      console.log(this.instructor.id)
      InstructorRequest.queryInstructorById(this.instructor.id).then(response => {
        console.log(response.data.resultCode);
        if (response.data.resultCode == 200) {
          this.instructor = response.data.datas;
          console.log('===num====' + this.instructor.num);
        } else {
          ElMessage.error(response.data.message);
        }
      }).catch(error => {
        ElMessage.error(error);
      })
    },
  }

}


</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
  