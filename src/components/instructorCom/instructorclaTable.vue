<template>
    <el-table :data="instructorcla" :span-method="objectSpanMethod" border style="width: 100%;" height="190">
        <el-table-column prop="enteryear" label="入学年份" width="180" />
        <el-table-column prop="className" label="代理班级" />
        <el-table-column prop="majorName" label="专业名称" />
        <el-table-column prop="des" label="代理学年" />
        <el-table-column prop="term" label="代理学期" />
        <el-table-column label="操作" align="center">
            <template #default="scope">
                <el-button type="danger" :icon="Edit" size="small"
                    @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="5" small="true" hide-on-single-page="true"
        style="line-height: 0px;" />
</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus'
import InstructorRequest from '@/network/instructor/InstructorRequest'
export default {
    data() {
        return {
            tableWith: "200px",
            instructorcla: [],
            pageSize: 5,
            common: new Map(),
            keys: new Map(),
        }
    },
    watch: {
        instructorcla(newValue, oldValue) {
            this.processingData();
            console.log("==========newValue=========");
            console.log(newValue);
            console.log(oldValue);
        }
    },

    methods: {
        handleEdit(index, row) {
            // 
            this.processingData();

        },
        handleDelete(index, row) {
            ElMessageBox.confirm(
                '确认删除此数据吗？',
                '警告',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }
            ).then(() => {
                InstructorRequest.deletInstructorClass(row.id).then(response => {
                    console.log("response.resultCode:" + response.data.resultCode)
                    if (response.data.resultCode == 200) {
                        // ElMessage.info(response,Message);
                        ElMessage.info(response.data.message);
                    } else {
                        // ElMessage.info(response,Message);
                        ElMessage.info(response.data.message);
                    }
                }).catch(error => {
                    ElMessage.info(error, Message);
                })
            })
        },
        processingData() {
            for (let j = 0; j < 3; j++) {
                let key = 0;
                let same = false;
                let n = 1;
                var spanArr = new Map();
                var keyIndex = [0];
                for (let i = 1; i < this.instructorcla.length; i++) {
                    if (j == 0) {
                        if (this.instructorcla[i].enteryear == this.instructorcla[i - 1].enteryear) {
                            spanArr.set(key, ++n);
                            same = true;
                        } else {
                            same = false;
                            spanArr.set(key, n);
                            n = 1;
                        }
                    } else if (j == 1) {
                        if (this.instructorcla[i].className == this.instructorcla[i - 1].className) {
                            spanArr.set(key, ++n);
                            same = true;
                        } else {
                            same = false;
                            spanArr.set(key, n);
                            n = 1;
                        }
                    }else if (j == 2) {
                        if (this.instructorcla[i].majorName == this.instructorcla[i - 1].majorName) {
                            spanArr.set(key, ++n);
                            same = true;
                        } else {
                            same = false;
                            spanArr.set(key, n);
                            n = 1;
                        }
                    }
                    if (same == false) {
                        key = i;
                        keyIndex.push(key);
                    }
                }
                this.common.set(j, spanArr);
                this.keys.set(j, keyIndex);
            }

        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
                var map = this.common.get(columnIndex);
                var key = this.keys.get(columnIndex);
                var obj = {};
                var flag = false;
                key.forEach(element => {
                    if (rowIndex == element) {//从第几行下标开始合并
                        obj.rowspan = map.get(element);//合并行数
                        obj.colspan = 1;//合并列数
                        flag = true;
                    }
                });
                if (flag == true) {
                    return obj;
                } else {
                    return {
                        rowspan: 0,
                        colspan: 0,
                    };
                }
            }

        },

    },
}

</script>

<style></style>