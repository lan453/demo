<template>
    <el-container class="instructorEl" height="650px">
        <el-aside class="instructor-aside" width="150px">
            <ColleageTree ref="InColleageTreeRef" @InQueryPaged="InQueryPaged"></ColleageTree>
        </el-aside>
        <el-container class="mf-con" >
            <el-main class="instructor-main" height="60%">
                <el-row>
                    <ToolBar ref="InToolBarRef" :btnVisible="btnVisible" @addData="addData"></ToolBar>
                </el-row>
                <el-row>
                    <queryInstructorTool ref="queryInstructorToolRef" @InQueryPaged="InQueryPaged"></queryInstructorTool>
                </el-row>
                <el-row>
                    <instructorTable ref="instructorTableRef" @setInstructorClass="setInstructorClass" @InQueryPaged="InQueryPaged"></instructorTable>
                </el-row>
            </el-main>
            <el-footer class="instructor-footer" height="40%">
                <instructorclaTable ref="instructorclaTableRef" ></instructorclaTable>
            </el-footer>
        </el-container>
    </el-container>
    <AddInstructorDialog ref="AddInstructorDialogRef" @InQueryPaged="InQueryPaged"></AddInstructorDialog>
    
</template>

<script>
import instructorclaTable from './instructorclaTable.vue';
import ColleageTree from '../classCom/ColleageTree.vue';
import ToolBar from '../common/ToolBar.vue';
import instructorTable from './instructorTable.vue';
import queryInstructorTool from './queryInstructorTool.vue';
import InstructorRequest from '@/network/instructor/InstructorRequest'
import AddInstructorDialog from './AddInstructorDialog.vue';

export default {
    components:{
        ColleageTree,
        ToolBar,
        instructorTable,
        queryInstructorTool,
        AddInstructorDialog,
        instructorclaTable,
        
    },
    data() {
        return {
            btnVisible: {
                add: true,
                delete: false,
                update: false,
                export: true,
            },
            instructorcla:[],
        }
    },
    watch:{
        instructorcla(newValue,oldValue){
            console.log("==========newValue=========");
            console.log(newValue);
            console.log(oldValue);
        }
    },
    methods: {
        InQueryPaged(newCurrentPage) {
            let param = this.$refs.queryInstructorToolRef.InstructorParam;
            let selectColleageId= this.$refs.InColleageTreeRef.selectColleage;
            console.log(selectColleageId);
            param.colleageId= selectColleageId;
            console.log(param);
            console.log("===========param=============");
            let pagedParam = this.$refs.instructorTableRef.PageParam;
            if (newCurrentPage && newCurrentPage > 1) {
                param.page = pagedParam.currentPage;
            } else {
                param.page = 1;
                this.$refs.instructorTableRef.PageParam.currentPage = 1;
            }
            // delete param.formFirst;
            // delete param.id;
            param.rows = pagedParam.pageSize;
            console.log(param);
            console.log("===========param=============");
            InstructorRequest.queryPageData(param).then(response => {
                console.log(response);
                if(response.data && response.data.rows){
                    let total = response.data.total;
                    let rows = response.data.rows;
                    this.$refs.instructorTableRef.tableData = rows;
                    this.$refs.instructorTableRef.PageParam.total = total;
                }
            }).catch(error => {
                console.log(error);
            })
        },
        addData(){
            this.$refs.AddInstructorDialogRef.isVisible=true;
        },
        setInstructorClass(){
            console.log(this.$refs.instructorTableRef.instructorcla);
            this.$refs.instructorclaTableRef.instructorcla=this.$refs.instructorTableRef.instructorcla;
            // this.$refs.instructorclaTableRef.tableData=this.$refs.instructorTableRef.instructorcla;
        }
    }
}

</script>

<style>
.instructorEl {
    width: 100%;
}

.instructor-aside {
    border: 1px solid rgb(93, 210, 214);
}

.instructor-main {
    line-height: 60px;
}

.el-row {
    margin-left: 10px;
}
.instructor-footer{
    border: 1px solid rgb(93, 210, 214);
}
.mf-con{
    width: 100%;
    padding: 0px;
    height: 480px;
}

</style>