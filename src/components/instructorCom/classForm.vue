<template>
    <el-form ref="FormRef" inline="ture" :model="selectData" :rules="myRules" required=true
        style="margin-top: 10px;float: left;">
        <el-row>
            <el-col :span="12">
                <el-form-item label="开始学年:" :label-width="fromLableWidth" prop="startenterYear">
                    <el-select v-model="selectData.startenterYear" placeholder="请选择学年" style="width: 150px;">
                        <el-option v-for="item in academicYears" :label="item.text" :value="item.id" />
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="开始学期:" :label-width="fromLableWidth" prop="startTerm">
                    <el-select v-model="selectData.startTerm" placeholder="请选择学期" style="width: 150px;">
                        <el-option v-for="item in terms" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row style="bottom: 20px; float: left;">
            <el-col :span="24">
                <el-form-item label="学期总数:" :label-width="fromLableWidth" prop="termNumber">
                    <el-input-number size="small" v-model="selectData.termNumber" :min="1" :max="max" />
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>

<script>
import sysDicRequest from '@/network/sysDic/sysDicRequest'
export default {
    data() {
        return {
            terms: [{
                value: '1',
                label: '第一学期',
            },
            {
                value: '2',
                label: '第二学期',
            },],
            fromLableWidth: '100px',
            selectData: {
                startenterYear: '',
                startTerm: '',
                termNumber: '',
            },
            academicYear: [],
            academicYears:[],
            startYear: '',
            instructorclass: {
                instructorid: '',
                classid: '',
                academicyearid: '',
                term: ''
            },
            max: 8,
            dyear: '',
            myRules: {
                startenterYear: [
                    { required: true, trigger: 'blur' },
                    // { min: 1, max: 100, message: '此空不能为空', trigger: 'blur' },
                ],
                startTerm: [
                    { required: true, trigger: 'blur' },
                    // { min: 1, max: 20, message: '此空不能为空', trigger: 'blur' },
                ],
                termNumber: [
                    { required: true, trigger: 'blur' },
                    // { min: 1, max: 100, message: '此空不能为空', trigger: 'blur' },
                ],

            },
        }
    },
    mounted() {
        console.log("===============selectData=================");
        console.log(this.selectData);
        this.getStarYear();
        sysDicRequest.ListEnterYear(this.startYear).then(response => {
            if (response.data.resultCode == 200) {
                this.academicYear = response.data.datas;
                this.academicYears=this.academicYear;
            } else {
                ElMessage.error(response.data.message);
            }
        }).catch(error => {
            ElMessage.error(error);
        })
    },
    watch: {
        selectData: {
            deep: true,
            handler(newValue, oldValue) {
                console.log(newValue);
                if (newValue.startenterYear != '') {
                    let smax = 0;
                    let year=0;
                    this.academicYear.forEach(element => {
                        let n = Number(element.text.slice(0, 4));
                        if (n > smax) {
                            smax = n;
                        }
                        if(newValue.startenterYear==element.id){
                            year = Number(element.text.slice(0, 4));
                        }
                    });
                    console.log(year);
                    console.log(smax);
                    this.dyear = smax-year+1;
                    console.log(this.dyear);
                }
                if (newValue.startYear != '' && newValue.startTerm != '') {
                    if (newValue.startTerm == 1) {
                        this.max = this.dyear / 0.5;
                    } else {
                        this.max = this.dyear / 0.5 - 1;
                    }
                    console.log(this.max);
                    if (this.max < this.selectData.termNumber) {
                        this.selectData.termNumber = this.max;
                    }
                }
                console.log(this.selectData);
            }
        },
    },
    methods: {
        getStarYear() {
            let nowDate = new Date();
            let nowyear = nowDate.getFullYear();
            let month = nowDate.getMonth() + 1;
            if (month > 7) {
                this.startYear = nowyear - 3;
            } else {
                this.startYear = nowyear - 4;
            }
        }
    }
}

</script>

<style></style>