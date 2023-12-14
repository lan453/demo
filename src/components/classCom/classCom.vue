<template>
    <el-container class="classEl">
        <el-aside class="class-aside" width="150px">
            <ColleageTree ref="ColleageTreeRef" @queryPaged="queryPaged"></ColleageTree>
        </el-aside>
        <el-main class="class-main">
            <el-row>
                <ToolBar :btnVisible="btnVisible" @addData="addData"></ToolBar>
            </el-row>
            <el-row>
                <QueryToolBar ref="QueryToolBarRef" @queryPaged="queryPaged"></QueryToolBar>
            </el-row>
            <el-row>
                <classTable ref="classTableRef" @queryPaged="queryPaged"></classTable>
            </el-row>
        </el-main>
    </el-container>
    <addOrUpdateDialog ref="addOrUpdateDialogRef" @queryPaged="queryPaged"></addOrUpdateDialog>
</template>

<script>
import ColleageTree from './ColleageTree.vue'
import ToolBar from '../common/ToolBar.vue'
import classTable from './classTable.vue'
import QueryToolBar from './QueryToolBar.vue'
import classRequest from '@/network/class/classRequest'
import addOrUpdateDialog from './addOrUpdateDialog.vue'
export default {
    components: {
        ColleageTree,
        ToolBar,
        classTable,
        QueryToolBar,
        addOrUpdateDialog
    },
    data() {
        return {
            // titleData:'新增班级',
            btnVisible: {
                add: true,
                delete: false,
                update: false,
                export: true,
            }
        }
    },
    methods: {
        queryPaged(newCurrentPage) {
            let param = this.$refs.QueryToolBarRef.classParam;
            let selectColleageId = this.$refs.ColleageTreeRef.selectColleage;
            param.colleageid= selectColleageId;
            console.log(param);
            console.log("===========param=============");
            let pagedParam = this.$refs.classTableRef.PageParam;
            if (newCurrentPage && newCurrentPage > 1) {
                param.page = pagedParam.currentPage;
            } else {
                param.page = 1;
                this.$refs.classTableRef.PageParam.currentPage = 1;
            }
            // delete param.formFirst;
            // delete param.id;
            param.rows = pagedParam.pageSize;
            console.log(param);
            console.log("===========param=============");
            classRequest.queryPageData(param).then(response => {
                console.log(response);
                if(response.data && response.data.rows){
                    let total = response.data.total;
                    let rows = response.data.rows;
                    this.$refs.classTableRef.tableData = rows;
                    this.$refs.classTableRef.PageParam.total = total;
                }
            }).catch(error => {
                console.log(error);
            })
        },
        addData(){
            console.log("addData")
            let selectColleage = parseInt(this.$refs.ColleageTreeRef.selectColleage);
            this.$refs.addOrUpdateDialogRef.cls.colleageid = selectColleage<=0 ? '': selectColleage;
            this.$refs.addOrUpdateDialogRef.isVisible=true;
        },
    }
}

</script>

<style>
.classEl {
    width: 100%;
    padding: 0px;
}

.class-aside {
    border: 1px solid rgb(93, 210, 214);
}

.class-main {
    line-height: 60px;
}

.el-row {
    margin-left: 10px;
}
</style>