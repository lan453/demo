<template>
    <el-button class="addColleageBut" type="primary" @click="showNewDialog">
        新增学院<el-icon><Plus /></el-icon>
    </el-button>
    <el-table :data="datas" style="width: 100%" height="450" >
        <el-table-column label="学院编号" width="200">
            <template #default="scope">
                <div style="display: flex; align-items: center">
                    <span style="margin-left: 10px">{{ scope.row.code }}</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="学院名称" width="200" align: center>
            <template #default="scope">
                <div style="display: flex; align-items: center">
                    <span style="margin-left: 10px">{{ scope.row.name }}</span>
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
    <newColleageDilog ref="NewDialog" @relodData="queryAll"></newColleageDilog>
</template>

<script>
import newColleageDilog from './newColleageDilog.vue'
import ColleageRequst from '@/network/colleage/ColleageRequest'
import {
Message,
    Plus,
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
export default {
    components:{
    Plus,
    newColleageDilog
},
    data() {
        return {
            datas:[],
        }
    },
    mounted(){
        this.queryAll();
    },
    methods: {
        queryAll(){
            ColleageRequst.queryAll().then((reponse)=>{
                this.datas = reponse.data.rows;
            }).catch(error=>{
                console.log(error);
            })
        },
        handleEdit(index,row){
            this.$refs.NewDialog.colleage.id=row.id;
            this.$refs.NewDialog.dialogFromVisible=true;
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
                ColleageRequst.deleteData(row.id).then(response=>{
                    console.log("response.resultCode:"+response.data.resultCode)
                    if(response.data.resultCode==200){
                        // ElMessage.info(response,Message);
                        ElMessage.info(response.data.message);
                        this.queryAll();
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
        showNewDialog(){
            console.log("======================showNewDialog============================")
            // this.$refs.NewDialog.resetFileds();
            this.$refs.NewDialog.dialogFromVisible = true;
        },
        addColleage(){

        }
        
    }
}

</script>

<style>
.addColleageBut{
    float: left;
    color: black;
    background-color: bisque;
}
</style>