<template>
        <el-tree 
        :data="data" 
        :props="defaultProps" 
        @node-click="handleNodeClick" 
        default-expand-all="ture"/>
</template>

<script>
import ColleageRequest from '@/network/colleage/ColleageRequest'
import { ElMessage } from 'element-plus';
export default {
    components:{

    },
    emits:['queryPaged','InQueryPaged'],
    data() {
        return {
            data:[],
            defaultProps:{
                children:'children',
                label:'text',
            },
            selectColleage:-1,
        }
    },
    mounted(){
        ColleageRequest.listColleageAsTree().then(response=>{
            if(response.data.resultCode==200){
                this.data=response.data.datas;
                console.log(this.data);
            }else{
                ElMessage.error(response.data.message);
            }
        }).catch(error=>{
            ElMessage.error(error);
        })
    },
    methods: {
        handleNodeClick(data){
            this.selectColleage=data.id;
            this.$emit('queryPaged');
            this.$emit('InQueryPaged');
        },
    }
}

</script>

<style></style>