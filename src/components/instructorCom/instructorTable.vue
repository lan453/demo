<template>
    <el-table highlight-current-row :data="tableData" style="width: 100%;padding: 0px;" height="180"  @row-click="selectInstructcla">
        <el-table-column label="工号" width="180">
            <template #default="scope">
                <div style="display: flex; align-items: center">
                    <span>{{ scope.row.num }}</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="姓名" width="180">
            <template #default="scope">
                <div style="display: flex; align-items: center">
                    <span>{{ scope.row.name }}</span>
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
        <el-table-column label="入职日期" width="180" align: center>
            <template #default="scope">
                <div style="display: flex; align-items: center">
                    <span style="margin-left: 10px">{{ scope.row.enterdate }}</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="离职日期" width="180" align: center>
            <template #default="scope">
                <div style="display: flex; align-items: center">
                    <span style="margin-left: 10px">{{ scope.row.leavedate }}</span>
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
                <el-button size="small" 
                type="warning"
                @click="editClass(scope.$index, scope.row)"
                >分配班级</el-button>
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
    <updateInstructorDialog ref="updateInstructorDialogRef" @queryUpdate="queryUpdate"></updateInstructorDialog>
    <AssignClasses ref="AssignClassesRef"></AssignClasses>
    
</template>

<script>

import { ElMessage, ElMessageBox } from 'element-plus'
import updateInstructorDialog from './updateInstructorDialog.vue';
import InstructorRequest from '@/network/instructor/InstructorRequest'
import AssignClasses from './AssignClasses.vue'
import classRequest from '@/network/class/classRequest'
export default {
    emits:['InQueryPaged','setInstructorClass'],
    components:{
        updateInstructorDialog,
        AssignClasses,
    },
    data() {
        return {
            tableData:[],
            instructorcla:[],
            PageParam:{
                currentPage:1,//当前页面
                pageSize:10,//该页面能够容纳多少条
                total:0
            },
            title:"修改班级"
        }
    },
    mounted(){
        this.queryUpdate();
    },
    watch:{
        instructorcla(newValue,oldValue){
            console.log("==========newValue=========");
            console.log(newValue);
            console.log(oldValue);
        }
    },
    methods: {
        editClass(index,row){
            // console.log("===============================");
            // console.log(row);
            // console.log(index);
            this.$refs.AssignClassesRef.isVisible=true;
            this.$refs.AssignClassesRef.label=row.colleageName;
            this.$refs.AssignClassesRef.instructorId=row.id;
        },
        selectInstructcla(row, column, event){
            console.log(row);
            classRequest.listClassByInstructorId(row.id).then(response=>{
            if(response.data.resultCode==200){
                this.instructorcla=response.data.datas;
                console.log("===========instructorcla===============");
                console.log(this.instructorcla);
                this.queryInstructorClass();
            }else{
                ElMessage.error(response.data.message);
            }
            }).catch(error=>{
                ElMessage.error(error);
            });
            
            
        },
        handleEdit(index,row){
            this.$refs.updateInstructorDialogRef.instructor.id=row.id;
            this.$refs.updateInstructorDialogRef.isVisible=true;
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
                InstructorRequest.deletInstructor(row.id).then(response=>{
                    console.log("response.resultCode:"+response.data.resultCode)
                    if(response.data.resultCode==200){
                        // ElMessage.info(response,Message);
                        ElMessage.info(response.data.message);
                        this.$emit('InQueryPaged');
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
            this.$emit('InQueryPaged');

        },
        handleCurrentChange(newCurrentPage){
            console.log("newCurrentPage="+newCurrentPage)
            this.$emit('InQueryPaged',newCurrentPage);
        },
        queryUpdate(){
            this.$emit('InQueryPaged',1);
        },
        queryInstructorClass(){
            this.$emit('setInstructorClass');
        }
    }
}

</script>

<style></style>