<template>
    <el-dialog
      v-model="isVisible"
      :title="title"
      width="600"
      draggable
      >
      <el-form
        ref="classFormRef"
        :model="cls"
        :rules="myRules"
      >
        <el-form-item label="班级名称:" :label-width="fromLableWidth" prop="name">
            <el-input v-model="cls.name"
            autocomplete="off" 
            required
            style="width:300px ;"
            />
        </el-form-item>
        <el-form-item label="入学年份:" :label-width="fromLableWidth" prop="enteryear">
            <el-date-picker
            editable=ture
            v-model="cls.enteryear"
            type="year"
            placeholder="请输入学生年级"
            value-format="YYYY"
            style="width:300px ;"
            />
        </el-form-item>
        <el-form-item label="所属学院:" :label-width="fromLableWidth" prop="colleageid">
            <el-select v-model="cls.colleageid" placeholder="请选择所属学院" 
            :disabled="this.cls.colleageid>0&&title=='新增班级'?true:false" 
            style="width:300px ;">
                <el-option v-for="item in colleages"
                :label="item.text" 
                :value="item.id"/>
            </el-select>
        </el-form-item>
        <el-form-item label="专业名称:" :label-width="fromLableWidth" prop="majorid">
            <el-select v-model="cls.majorid" placeholder="请选择学生专业" style="width:300px ;">
                <el-option v-for="item in majores" 
                :label="item.text" 
                :value="item.id"/>
            </el-select>
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
  import classRequest from '@/network/class/classRequest'
  import majorRequest from '@/network/major/majorRequest'
  import colleageRequst from '@/network/colleage/ColleageRequest'
  
  export default {
    emits:['queryPaged','updateData','queryUpdate'],
    data(){
      return {
        isVisible:false,
        fromLableWidth:'100px',
        cls:{
          id:'',
          name:'',
          enteryear:'',
          colleageid:'',
          majorid:'',
        },
        title:'新增班级',
        colleages:[],
        majores:[],
        myRules:{
          name: [
                { required: true, message: '请输入班级名称', trigger: 'blur' },
                { min: 2, max: 50, message: '请输入2~50个字符', trigger: 'blur' },
          ],
            enteryear: [
                { required: true, message: '请输入入学年份', trigger: 'blur' },
                { min: 4, max: 4, message: '请输入4个字符', trigger: 'blur' },
          ],
          colleageid: [
                { required: true, message: '请输入学院名称', trigger: 'blur' },
                // { min: 1, max: 50, message: '请输入2~50个字符', trigger: 'blur' },
          ],
          majorid: [
                { required: true, message: '请输入专业名称', trigger: 'blur' },
                // { min: 1, max: 50, message: '请输入2~50个字符', trigger: 'blur' },
          ],
          
        },
      }
    },
    updated(){
      console.log("==========================");
      console.log(this.cls.id);
      if(this.cls.id>0){
        this.title="修改班级";
        this.queryDataByID();
      }
    },
    mounted(){
        majorRequest.listMajor().then(response=>{
            if(response.data.resultCode==200){
                this.majores=response.data.datas;
                console.log(this.majors);
            }else{
                ElMessage.error(response.data.message);
            }
        }).catch(error=>{
            ElMessage.error(error);
        })
        colleageRequst.queryColleages().then(response=>{
            if(response.data.resultCode==200){
                this.colleages=response.data.datas;
                console.log(this.colleages);
            }else{
                ElMessage.error(response.data.message);
            }
        }).catch(error=>{
            ElMessage.error(error);
        })
    },
    methods:{
      resetAllData(){
        for(let pro in this.cls){
          this.cls[pro]='';
        }
      },
      submitData(){
        console.log("=========this.cls==============")
              console.log(this.cls)
        this.$refs.classFormRef.validate((valid,fields)=>{
          if(valid){
            console.log("==========this.cls===========")
              console.log(this.cls)
              classRequest.addOrUpdataData(this.cls).then(response=>{
                if(response.data.resultCode == 200){
                  this.$emit('queryUpdate');
                  this.resetAllData();
                  this.isVisible = false;
                  ElMessage.info(response.data.message);
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
              console.log(this.cls.id)
              classRequest.queryDataById(this.cls.id).then(response=>{
                console.log(response);
                  if(response.data.resultCode == 200){
                      this.cls=response.data.datas;
                      console.log(this.cls);
                      this.cls.enteryear=response.data.datas.enteryear+'';
                      // console.log("======queryDataByID():cls.enteryear=======");
                      // console.log(this.cls.enteryear);
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
  