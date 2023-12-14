<template>
    <el-dialog v-model="isVisible" title="分配班级" style="width: 1000px; height: 580px;" draggable>
        <el-container class="InstructorAC">
            <el-aside class="AC-aside" width="150px">
                <el-tree :data="data" :props="defaultProps" @check="check" show-checkbox default-expand-all="ture" />
            </el-aside>
            <el-container class="InstructorMF">
                <el-main class="AC-main">
                    <el-table :data="classData" @selection-change="handleSelectionChange" 
                        style="width: 100%;display: flex; align-items: center;" ref="multipleTableRef">
                        <el-table-column type="selection" width="55" :selectable="selectable" />
                        <el-table-column label="班级名称" :width="tableWidth">
                            <template #default="scope">
                                <div style="display: flex; align-items: center">
                                    <span>{{ scope.row.className }}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="入学年份" :width="tableWidth">
                            <template #default="scope">
                                <div style="display: flex; align-items: center">
                                    <span>{{ scope.row.enteryear }}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="所属学院" :width="tableWidth">
                            <template #default="scope">
                                <div style="display: flex; align-items: center">
                                    <span>{{ scope.row.colleageName }}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="专业名称" :width="tableWidth" align: center>
                            <template #default="scope">
                                <div style="display: flex; align-items: center">
                                    <span style="margin-left: 10px">{{ scope.row.majorName }}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="所属辅导员" :width="tableWidth" align: center>
                            <template #default="scope">
                                <div style="display: flex; align-items: center">
                                    <span style="margin-left: 10px">{{ scope.row.instructorName }}</span>
                                </div>
                            </template>
                        </el-table-column>
                        
                    </el-table>
                </el-main>
                <el-footer class="AC-footer" height="25%">
                    <classForm ref="classFormRef"></classForm>
                </el-footer>
            </el-container>
        </el-container>
        <span class="dialog-footer" style="text-align:center">
            <el-button @click="isVisible = false">取消</el-button>
            <el-button type="primary" :disabled="instructorclasses.length == 0" @click="submitData">
                确定
            </el-button>
        </span>
    </el-dialog>
</template>

<script>
import classForm from './classForm'
import classRequest from '@/network/class/classRequest'
import InstructorRequest from '@/network/instructor/InstructorRequest'
import { ElMessage } from 'element-plus'
export default {
    components: {
        classForm
    },
    data() {
        return {
            isVisible: false,
            data: [],
            tableWidth: '150',
            defaultProps: {
                label: 'label',
                children: 'children',
            },
            enteryears: [],
            label: '',
            selectYears: [],
            classData: [],
            instructorId: '',
            submitButton: false,
            instructorclasses: [],
            classIds:[],
        }
    },
    updated() {
        this.classData.splice(0, this.classData.length);
        console.log(this.label);
        console.log(this.instructorId);
        this.setEnteryearTree();
        this.clearSelectData();
        this.classIds.splice(0,this.classIds.length);
    },
    mounted() {

    },
    methods: {
    //     selectable(row,index){
    //     if(row.instructorName != null){
    //       return false
    //     }else{
    //       return true
    //     }
	        
    //   },
        clearSelectData() {
            let data = this.$refs.classFormRef.selectData;
            data.startenterYear = '';
            data.startTerm = '';
            data.termNumber = 1;
        },
        check(data, node) {
            this.classData.splice(0, this.classData.length);
            node.checkedNodes.forEach(element => {
                if (element.label != this.label) {
                    this.selectYears.push(element.label);
                }
            });
            // console.log("===============check===============");
            // console.log(this.label);
            // console.log("selectYears=" + this.selectYears);
            if (this.selectYears.length > 0) {
                classRequest.listClassByEnterYearAndColleage(this.label, this.selectYears).then(response => {
                    console.log("response.resultCode:" + response.data.resultCode)
                    if (response.data.resultCode == 200) {
                        this.classData = response.data.datas;
                        console.log("===================classData==============");
                        console.log(this.classData);
                    } else {
                        ElMessage.info(response.data.message);
                    }
                }).catch(error => {
                    ElMessage.info(error, data.message);
                })

            } else {
                this.classData.splice(0, this.classData.length);
            }

            this.selectYears.splice(0, this.selectYears.length);
        },
        setEnteryearTree() {
            let timeOne = new Date();
            let year = timeOne.getFullYear();
            let month = timeOne.getMonth() + 1;
            console.log(year + "/" + month);
            if (month > 7) {
                year = year - 3;
            } else {
                year = year - 4;
            }
            for (let i = 0; i < 4; i++) {
                this.enteryears.push(year++);
            }
            this.data = [
                {
                    label: this.label,
                    children: [
                        {
                            label: this.enteryears[0],
                        },
                        {
                            label: this.enteryears[1],
                        },
                        {
                            label: this.enteryears[2],
                        },
                        {
                            label: this.enteryears[3],
                        },
                    ],
                },
            ]
            console.log(this.data);
        },
        handleSelectionChange(selection) {
            this.classIds.splice(0,this.classIds.length);
            console.log("=========selection=========");
            console.log(selection);
            this.instructorclasses = selection;
            let maxEnterYear=0;
            selection.forEach(element => {
               this.classIds.push(element.id);
               if(element.enteryear>maxEnterYear){
                maxEnterYear=element.enteryear;
               }
            });
            let as=[];
            this.$refs.classFormRef.academicYear.forEach(element => {
               if(Number(element.text.slice(0, 4))>=maxEnterYear){
                as.push(element);
               }
            });
            this.$refs.classFormRef.academicYears=as;

            console.log(this.classIds);
        },
        submitData() {
            console.log("=========submitData===========");

            this.$refs.classFormRef.$refs.FormRef.validate((valid, fields) => {
                if (valid) {
                    InstructorRequest.addInstructorClass(this.instructorId,
                    this.classIds,this.$refs.classFormRef.selectData.startenterYear,
                    this.$refs.classFormRef.selectData.startTerm,
                    this.$refs.classFormRef.selectData.termNumber
                    ).then(response => {
                        if (response.data.resultCode == 200) {
                            ElMessage.info(response.data.message);
                            this.isVisible = false;
                            this.clearSelectData();
                            this.classIds.splice(0,this.classIds.length);
                        } else {
                            ElMessage.error(response.data.message);
                        }
                    }).catch(error => {
                        ElMessage.error(error);
                    })
                } else {
                    console.log('erro submit!', fields);
                }
            })
        },
    }
}

</script>

<style>
.InstructorAC {
    border: 1px solid rgb(13, 13, 13);
    height: 400px;
    width: 960px;
    border: 10px;
}

.AC-aside {
    border: 1px solid rgb(13, 13, 13);
}

.AC-main {
    border: 1px solid rgb(13, 13, 13);
}

.AC-footer {
    border: 1px solid rgb(13, 13, 13);
}
</style>