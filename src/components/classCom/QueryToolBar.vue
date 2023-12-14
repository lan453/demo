<template>
    <el-form class="ToolBarFrom" :inline="true" :model="classParam">
        <el-form-item label="班级名称">
            <el-input v-model="classParam.name" placeholder="请输入班级名称"/>
        </el-form-item>
        <el-form-item label="学生年级">
            <el-date-picker
            v-model="classParam.enteryear"
            type="year"
            placeholder="请输入学生年级"
            format="YYYY"
            value-format="YYYY"
            />
        </el-form-item>
        <el-form-item label="专业">
            <el-select v-model="classParam.majorid" placeholder="请选择学生专业">
                <el-option v-for="item in majors" 
                :key="item.id" 
                :label="item.text" 
                :value="item.id" />
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import majorRequest from '@/network/major/majorRequest'
export default {
    emits:['queryPaged'],
    data() {
        return {
            classParam: {
                name: '',
                enteryear: '',
                majorid: '',
                formFirst:true,
            },
            majors: [],
        }
    },
    methods: {
        onSubmit(){
            this.$emit('queryPaged');
        }
    },
    mounted(){
        majorRequest.listMajor().then(response=>{
            if(response.data.resultCode==200){
                this.majors=response.data.datas;
                console.log(this.majors);
            }else{
                ElMessage.error(response.data.message);
            }
        }).catch(error=>{
            ElMessage.error(error);
        })
        this.onSubmit();
    }
}

</script>

<style>
.ToolBarFrom{
    height: 40px;
    left: 10px;
}
</style>