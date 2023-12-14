<template>
    <h4 style="margin-top: -10px;margin-bottom: -10px;">假日登记表</h4>
    <el-table :data="classData" :span-method="objectSpanMethod" max-height="420">
        <el-table-column prop="name" label="姓名" width="150"/>
        <el-table-column prop="gender" label="性别" width="150"/>
        <el-table-column prop="leaveDate" label="离校日期" width="240"/>
        <el-table-column prop="backDate" label="返校日期" width="240"/>
        <el-table-column prop="destination" label="目的地" width="350"/>
    </el-table>
   
</template>

<script>
export default {
    data() {
        return {
            classData:[],
        }
    },
    watch: {
       
    },

    methods: {
        
    },
}

</script>

<style></style>