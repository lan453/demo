<template>
    <el-form class="fe-header-form" :inline="true" :model="classData">
        <el-form-item label="登记节日:">
            <el-select v-model="classData.festival" placeholder="请选择节日" @change="selectByPrimaryKey" style="width: 150px;">
                <el-option v-for="item in festivals" :key="item.id" :label="item.text" :value="item.id" />
            </el-select>
        </el-form-item>
        <el-form-item label="放假时间:" :width="qwidth">
            {{ classData.begindate }}~{{ classData.enddate }}
        </el-form-item>
        <el-form-item label="登记时间:" :width="qwidth">
            <el-date-picker v-model="classData.regbegindate" type="datetime" placeholder="请选择登记开始时间"
                format="YYYY/MM/DD HH:mm:ss" value-format="YYYY/MM/DD HH:mm:ss" :width="qwidth" />
            ~
            <el-date-picker v-model="classData.regenddate" type="datetime" placeholder="请选择登记结束时间"
                format="YYYY/MM/DD HH:mm:ss" value-format="YYYY/MM/DD HH:mm:ss" :width="qwidth" />
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit">发布</el-button>
        </el-form-item>
    </el-form>
    <el-dialog v-model="centerDialogVisible" width="30%" center>
        <el-icon size="50"><SuccessFilled/></el-icon>
        <span style="text-align: center;position: absolute; bottom: 50px;font-size: large;">
            发布成功！
        </span>
    </el-dialog>
</template>

<script>
import {SuccessFilled} from "@element-plus/icons-vue"
import commonRequest from '@/network/common/commonRequest'
export default {
    emits: ['queryFestivalRegTable'],
    components:{
        SuccessFilled,
    },
    data() {
        return {
            qwidth: '260',
            classData: {
                id: '',
                festival: '',
                begindate: '',
                enddate: '',
                regbegindate: '',
                regenddate: '',
            },
            festivals: [],
            centerDialogVisible: false,
        }
    },
    mounted() {
        this.listFestival();
    },
    methods: {
        onSubmit() {
            if (this.classData.id !== '' && this.classData !== null) {
                const param = {
                    regbegindate: this.classData.regbegindate,
                    regenddate: this.classData.regenddate,
                    id: this.classData.id
                };
                commonRequest.updateRegDate(param)
                    .then(response => {
                        console.log(response);
                        this.centerDialogVisible = true;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        listFestival() {
            commonRequest.listFestival().then(response => {
                this.festivals = response.data;
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            })
        },
        selectByPrimaryKey(val) {
            commonRequest.selectByPrimaryKey(val).then(response => {
                const dayjs = require('dayjs');
                this.classData = response.data;
                this.classData.begindate = dayjs(this.classData.begindate).format('YYYY/MM/DD HH:mm:ss');
                this.classData.enddate = dayjs(this.classData.enddate).format('YYYY/MM/DD HH:mm:ss');
                this.classData.regbegindate = dayjs(this.classData.regbegindate).format('YYYY/MM/DD HH:mm:ss');
                this.classData.regenddate = dayjs(this.classData.regenddate).format('YYYY/MM/DD HH:mm:ss');
                console.log(this.classData);
                this.$emit('queryFestivalRegTable');
            }).catch(error => {
                console.log(error);
            })

        }
    }
}

</script>

<style></style>