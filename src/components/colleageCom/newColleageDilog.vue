<template>
  <el-dialog
    v-model="dialogFromVisible"
    title="新增学院"
    width="600"
    >
    <el-form
      ref="ruleFormRef"
      :model="colleage"
      :rules="myRules"
    >
      <el-form-item label="学院编号:" :label-width="fromLableWidth" prop="code">
          <el-input v-model="colleage.code"
          autocomplete="off" 
          required
          />
      </el-form-item>
      <el-form-item label="学院名称:" :label-width="fromLableWidth" prop="name">
          <el-input v-model="colleage.name"
          autocomplete="off" 
          required
          />
      </el-form-item>
    </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFromVisible = false">取消</el-button>
            <el-button type="primary" @click="submitData">
                  确定
            </el-button>
          </span>
        </template>
  
  </el-dialog>

</template>

<script>
import { ElMessage } from 'element-plus';
import ColleageRequest from '@/network/colleage/ColleageRequest'

export default {
  data(){
    return {
      dialogFromVisible:false,
      fromLableWidth:'100px',
      colleage:{
        id:-1,
        code:'',
        name:''
      },
      myRules:{
        code: [
              { required: true, message: '请输入学院编码', trigger: 'blur' },
              { min: 1, max: 2, message: '请输入2位数编码', trigger: 'blur' },
        ],
        name: [
              { required: true, message: '请输入学院名称', trigger: 'blur' },
              { min: 2, max: 50, message: '请输入2~50个字符', trigger: 'blur' },
        ],
        
      },
    }
  },
  updated(){
    console.log("==========================");
    console.log(this.colleage.id);
    if(this.colleage.id>0){
      this.queryDataByID();
    }
  },
  emits:['relodData'],
  methods:{
    resetFileds(){
      this.$refs.ruleFormRef.resetFields()
      this.colleage.id=-1;
    },
    // submitData(){
    //   console.log(this.colleage)
    //   ColleageRequest.addData(this.colleage).then(response=>{
    //     if(response.data.resultCode == 200){
    //       ElMessage.info(response.data.message);
    //       this.dialogFromVisible = false;
    //       this.$emit('relodData');
    //     }else{
    //       ElMessage.error(response.data.message);
    //     }
    //   }).catch(error=>{
    //     ElMessage.error(error);
    //   })
    // }
    submitData(){
      this.$refs.ruleFormRef.validate((valid,fields)=>{
        if(valid){
            console.log(this.colleage)
            ColleageRequest.addOrUpdataData(this.colleage).then(response=>{
              if(response.data.resultCode == 200){
                ElMessage.info(response.data.message);
                this.$emit('relodData');
                this.dialogFromVisible = false;
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
    queryDataByID(){
            console.log(this.colleage)
            ColleageRequest.queryDataById(this.colleage.id).then(response=>{
              console.log(response);
                if(response.data.resultCode == 200){
                    this.colleage=response.data.datas;
                }else{
                ElMessage.error(response.data.message);
                }
            }).catch(error=>{
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
