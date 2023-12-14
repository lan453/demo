<template>
    <el-dialog v-model="isVisible" title="新增辅导员" width="800" draggable>
        <el-form ref="instructorFormRef" :model="instructor" :rules="myRules">
            <el-form-item label="工号:" :label-width="fromLableWidth" prop="num">
                <el-input v-model="instructor.num" placeholder="请输入工号" autocomplete="off" required style="width:300px ;" />
            </el-form-item>
            <el-form-item label="姓名:" :label-width="fromLableWidth" prop="name">
                <el-input v-model="instructor.name" placeholder="请输入姓名" autocomplete="off" required style="width:300px ;" />
            </el-form-item>
            <el-form-item label="所属学院:" :label-width="fromLableWidth" prop="colleageid">
                <el-select v-model="instructor.colleageid" placeholder="请选择所属学院" @change="showCheckbox"
                    style="width:300px ;">
                    <el-option v-for="item in colleages" :label="item.text" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="入职日期:" :label-width="fromLableWidth" prop="enterdate">
                <el-date-picker editable=ture v-model="instructor.enterdate" type="date" placeholder="请选择入职日期"
                    value-format="YYYY/MM/DD" style="width:300px ;" />
            </el-form-item>

        </el-form>
        <span class="dialog-footer" style="text-align:center">
            <el-button @click="isVisible = false">取消</el-button>
            <el-button type="primary" @click="submitData">确定
            </el-button>
        </span>
        
    </el-dialog>
</template>

<script>
import { ElMessage } from 'element-plus';
import colleageRequst from '@/network/colleage/ColleageRequest'
import InstructorRequest from '@/network/instructor/InstructorRequest'
export default {
    emits:['InQueryPaged'],
    data() {
        return {
            isVisible: false,
            fromLableWidth: '100px',
            colleages: [],
            instructor: {
                num: '',
                name: '',
                enterdate: '',
                leavedate: '',
                colleageid: '',
            },
            agencyClass: {
                instructorid: '',
                classid: '',
                academicyearid: '',
                term: '',
            },
            myRules:{
                num: [
                    { required: true, message: '请输入辅导员工号', trigger: 'blur' },
                    // { min: 1, max: 2, message: '请输入2位数编码', trigger: 'blur' },
                ],
                name: [
                    { required: true, message: '请输入辅导员名称', trigger: 'blur' },
                    // { min: 2, max: 50, message: '请输入2~50个字符', trigger: 'blur' },
                ],
                enterdate: [
                    { required: true, message: '请输入入职日期', trigger: 'blur' },
                    // { min: 2, max: 50, message: '请输入2~50个字符', trigger: 'blur' },
                ],
                leavedate: [
                    { required: true, message: '请输入离职日期', trigger: 'blur' },
                    // { min: 2, max: 50, message: '请输入2~50个字符', trigger: 'blur' },
                ],
                colleageid: [
                    { required: true, message: '请输入学院名称', trigger: 'blur' },
                    // { min: 2, max: 50, message: '请输入2~50个字符', trigger: 'blur' },
                ],
                
            },
            
        }
    },
    mounted() {
        colleageRequst.queryColleages().then(response => {
            if (response.data.resultCode == 200) {
                this.colleages = response.data.datas;
            } else {
                ElMessage.error(response.data.message);
            }
        }).catch(error => {
            ElMessage.error(error);
        })
        
    },
    watch:{
        
    },
    methods: {
        submitData(){
            this.$refs.instructorFormRef.validate((valid,fields)=>{
                if(valid){
                    console.log(this.instructor)
                    InstructorRequest.addInstructor(this.instructor).then(response=>{
                    if(response.data.resultCode == 200){
                        ElMessage.info(response.data.message);
                        this.isVisible = false;
                        this.$emit('InQueryPaged');
                        this.resetAllData();
                    }else{
                        ElMessage.error(response.data.message);
                    }
                    }).catch(error=>{
                    ElMessage.error(error);
                    })  
                }else{
                console.log('erro submit!',fields);
                }
            })
        },
        resetAllData(){
        for(let pro in this.instructor){
          this.instructor[pro]='';
        }
      },
    }
}

</script>


<style>

</style>