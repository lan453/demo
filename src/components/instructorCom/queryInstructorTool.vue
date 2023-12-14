<template>
    <el-form class="InstructorToolBarFrom" :inline="true" :model="InstructorParam">
        <el-form-item label="工号" style="float: left;left: 10px;">
            <el-input v-model="InstructorParam.num" placeholder="请输入辅导员工号" style="width: 150px;"/>
        </el-form-item>
        <el-form-item label="姓名" style="float: left;">
            <el-input v-model="InstructorParam.name" placeholder="请输入辅导员姓名" style="width: 150px;"/>
        </el-form-item>
        <el-form-item label="学生年级" style="float: left;">
            <el-select v-model="InstructorParam.enteryears" multiple placeholder="请选择学生年级" style="width: 150px;">
                <el-option v-for="item in enteryearses" 
                :key="item.id" 
                :label="item.text" 
                :value="item.id" />
            </el-select>
        </el-form-item>
        <el-form-item label="专业" style="float: left;">
            <el-select v-model="InstructorParam.majorIds" multiple placeholder="请选择专业" style="width: 150px;">
                <el-option v-for="item in majors"
                :key="item.id" 
                :label="item.text" 
                :value="item.id"/>
            </el-select>
        </el-form-item>
        <el-form-item  style="float: left;">
            <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import InstructorRequest from '@/network/instructor/InstructorRequest'
import majorRequest from '@/network/major/majorRequest'
export default {
    emits:['InQueryPaged'],
    data() {
        return {
            InstructorParam: {
                num: '',
                name: '',
                enteryears:'',
                majorIds: '',
                formFirst:true,
            },
            majors: [],
            enteryearses:[],
        }
    },
    mounted(){
        console.log(this.InstructorParam);
        majorRequest.listMajor().then(response=>{
            if(response.data.resultCode==200){
                this.majors=response.data.datas;
            }else{
                ElMessage.error(response.data.message);
            }
        }).catch(error=>{
            ElMessage.error(error);
        })
        InstructorRequest.listEnteryears().then(response=>{
            if(response.data.resultCode==200){
                this.enteryearses=response.data.datas;
            }else{
                ElMessage.error(response.data.message);
            }
        }).catch(error=>{
            ElMessage.error(error);
        })
    },
    methods: {
        onSubmit(){
            this.$emit('InQueryPaged');
        }
    }
}

</script>

<style>
.InstructorToolBarFrom{
    height: 40px;
    float: left;
    margin-top: 10px;
}
</style>