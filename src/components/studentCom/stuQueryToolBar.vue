<template>
    <el-form class="StuToolBarFrom" :inline="true" :model="queryData">
        <el-form-item label="学生姓名">
            <el-input v-model="queryData.name" placeholder="请输入班级名称" style="width: 150px;"/>
        </el-form-item>
        <el-form-item label="学生年级">
            <el-select v-model="queryData.enteryear" clearable placeholder="请选择学生年级" style="width: 150px;">
                <el-option v-for="item in enteryears" 
                :key="item" 
                :label="item" 
                :value="item" />
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    emits: ['StuQueryPage'],
    data() {
        return {
            queryData: {
                name: '',
                enteryear: ''
            },
            enteryears:[],
        }
    },
    mounted() {
        this.getEnteryears();
    },
    methods: {
        onSubmit() {
            this.$emit('StuQueryPage');
        },
        getEnteryears() {
            this.enteryears.splice(0,this.enteryears.length);
            let nowDate = new Date();
            let nowyear = nowDate.getFullYear();
            let month = nowDate.getMonth() + 1;
            if (month > 7) {
                for(let i=nowyear-3;i<=nowyear;i++){
                    this.enteryears.push(i);
                }
            } else {
                for(let i=nowyear-4;i<nowyear;i++){
                    this.enteryears.push(i);
                }
            }
        }
    },
}

</script>

<style>
.StuToolBarFrom {
    height: 40px;
    left: 10px;
}
</style>