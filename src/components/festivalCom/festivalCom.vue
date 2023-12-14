<template>
    <div>
        <el-container style="height: 480px;">
            <el-header class="fe-header">
                <festivalHeader ref="festivalHeaderRef"  @queryFestivalRegTable="queryFestivalRegTable"></festivalHeader>
            </el-header>
            <el-container class="festivalCont">
                <el-aside class="fe-aside" width="180px">
                    <festivalAside ref="festivalAsideRef" @queryFestivalRegTable="queryFestivalRegTable"></festivalAside>
                </el-aside>
                <el-main class="fe-main">
                    <festivalRegTable ref="festivalRegTableRef"></festivalRegTable>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
  

<script>
import festivalHeader from "./festivalHeader.vue"
import festivalAside from "./festivalAside.vue"
import festivalRegTable from "./festivalRegTable.vue"
import commonRequest from '@/network/common/commonRequest'
export default {
    components: {
        festivalHeader,
        festivalAside,
        festivalRegTable,
    },
    data() {
        return {

        }
    },
    methods: {
        queryFestivalRegTable() {
            const id = this.$refs.festivalHeaderRef.classData.id;
            if (id != '' || id != null) {
                let param= this.$refs.festivalAsideRef.param;
                param.recordadviceId=id;
                console.log(param);
                commonRequest.queryFestivalReg(param).then(response => {
                    console.log(response.data);
                    this.$refs.festivalRegTableRef.classData = response.data;
                }).catch(error => {
                    console.log(error);
                })
            }

        }
    }
}

</script>

<style>
.fe-header {
    line-height: 60px;
    border: 1px solid rgb(93, 210, 214);
}

.fe-aside {
    line-height: 60px;
    border: 1px solid rgb(93, 210, 214);
}

.fe-main {
    line-height: 60px;
    border: 1px solid rgb(93, 210, 214);
}
</style>