<template>
    <el-table highlight-current-row :data="tableData" style="width: 100%;padding: 0px;" height="380px">
        <el-table-column label="学号" width="120">
            <template #default="scope">
                <div style="display: flex; align-items: center">
                    <span>{{ scope.row.num }}</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="姓名" width="120">
            <template #default="scope">
                <div style="display: flex; align-items: center">
                    <span>{{ scope.row.name }}</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="性别" width="120" align: center>
            <template #default="scope">
                <div style="display: flex; align-items: center">
                    <span style="margin-left: 10px">{{ scope.row.gender }}</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="班级" width="120">
            <template #default="scope">
                <div style="display: flex; align-items: center">
                    <span>{{ scope.row.className }}</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="电话" width="120" align: center>
            <template #default="scope">
                <div style="display: flex; align-items: center">
                    <span style="margin-left: 10px">{{ scope.row.tel }}</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="年级" width="120" align: center>
            <template #default="scope">
                <div style="display: flex; align-items: center">
                    <span style="margin-left: 10px">{{ scope.row.enteryear }}</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="地址" width="120" align: center>
            <template #default="scope">
                <div style="display: flex; align-items: center">
                    <span style="margin-left: 10px">{{ scope.row.address }}</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template #default="scope">
                <el-button type="danger" :icon="Edit" size="small" 
                @click="handleEdit(scope.$index, scope.row)"
                >修改</el-button>
                <el-button size="small" 
                type="danger" 
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    
    <el-pagination
      style="line-height: 20px;"
      v-model:current-page="PageParam.currentPage"
      v-model:page-size="PageParam.pageSize"
      :page-sizes="[5, 10, 20,50,100, 200,1000]"
      small="true"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="PageParam.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
</template>

<script>


export default {
    emits:['StuQueryPage'],
    components:{
        
    },
    data() {
        return {
            tableData:[],
            PageParam:{
                currentPage:1,//当前页面
                pageSize:10,//该页面能够容纳多少条
                total:0
            },
        }
    },
    mounted(){
        this.queryUpdate();
    },
    watch:{
       
    },
    methods: {
        editClass(index,row){
           
        },
        handleEdit(index,row){
           
        },
        handleDelete(index,row){
            
        },
        handleSizeChange(newPageSize){
            this.PageParam.pageSize=newPageSize;
            this.$emit('StuQueryPage');

        },
        handleCurrentChange(newCurrentPage){
            this.$emit('StuQueryPage',newCurrentPage);
        },
        queryUpdate(){
            this.$emit('StuQueryPage',1);
        },
    }
}

</script>

<style></style>