<template>
    <el-table :data="tableData" style="width: 100%" height="350px">
        <el-table-column label="班级名称" width="180">
            <template #default="scope">
                <div style="display: flex; align-items: center">
                    <span>{{ scope.row.className }}</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="入学年份" width="180">
            <template #default="scope">
                <div style="display: flex; align-items: center">
                    <span>{{ scope.row.enteryear }}</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="所属学院" width="180">
            <template #default="scope">
                <div style="display: flex; align-items: center">
                    <span>{{ scope.row.colleageName }}</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="专业名称" width="180" align: center>
            <template #default="scope">
                <div style="display: flex; align-items: center">
                    <span style="margin-left: 10px">{{ scope.row.majorName }}</span>
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
    <addOrUpdateDialog ref="addOrUpdateDialogRef" @queryUpdate="queryUpdate"></addOrUpdateDialog>
    
    <el-pagination
      v-model:current-page="PageParam.currentPage"
      v-model:page-size="PageParam.pageSize"
      :page-sizes="[5, 10, 20,50,100, 200,1000]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="PageParam.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
</template>

<script>
import classRequest from '@/network/class/classRequest'
import { ElMessage, ElMessageBox } from 'element-plus'
import addOrUpdateDialog from './addOrUpdateDialog.vue'
export default {
    emits:['queryPaged'],
    components:{
        addOrUpdateDialog,
    },
    data() {
        return {
            tableData:[],
            PageParam:{
                currentPage:1,//当前页面
                pageSize:10,//该页面能够容纳多少条
                total:0
            },
            title:"修改班级"
        }
    },
    methods: {
        handleEdit(index,row){
            this.$refs.addOrUpdateDialogRef.cls.id=row.id;
            console.log("=========row=========")
            console.log(row);
            this.$refs.addOrUpdateDialogRef.isVisible=true;
        },
        handleDelete(index,row){
            ElMessageBox.confirm(
                '确认删除此数据吗？',
                '警告',
                {
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }
            ).then(()=>{
                classRequest.deleteData(row.id).then(response=>{
                    console.log("response.resultCode:"+response.data.resultCode)
                    if(response.data.resultCode==200){
                        // ElMessage.info(response,Message);
                        ElMessage.info(response.data.message);
                        this.$emit('queryPaged');
                        console.log("操作成功！")
                    }else{
                        // ElMessage.info(response,Message);
                        ElMessage.info(response.data.message);
                    }
                }).catch(error=>{
                    ElMessage.info(error,Message);
                })
            })
        },
        handleSizeChange(newPageSize){
            this.PageParam.pageSize=newPageSize;
            this.$emit('queryPaged');

        },
        handleCurrentChange(newCurrentPage){
            console.log("newCurrentPage="+newCurrentPage)
            this.$emit('queryPaged',newCurrentPage);
        },
        queryUpdate(){
            this.$emit('queryPaged',1);
        }
    }
}

</script>

<style></style>