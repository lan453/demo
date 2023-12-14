<template>
    <el-tree :data="data" 
    :props="defaultProps" 
    @node-click="handleNodeClick" 
    node-key="id"
    :default-expanded-keys="selectId"
    highlight-current="true"
    />
</template>

<script>
import ColleageRequest from '@/network/colleage/ColleageRequest'
import { ElMessage } from 'element-plus';
export default {
    emits:['StuQueryPage'],
    data() {
        return {
            data: [],
            defaultProps: {
                children: 'children',
                label: 'text',
            },
            param:{
                colleageId:'',
                enteryear:'',
                classId:'',
                name:'',
            },
            selectId:[-1],
        }
    },
    methods: {
        handleNodeClick(data,node ,TreeNode,object){
            this.clearParam();
            if(node.level==2){
                this.param.colleageId=node.data.id;
            }else if(node.level==3){
                this.param.colleageId=node.parent.data.id;
                this.param.enteryear=node.data.id;
            }else if(node.level==4){
                this.param.enteryear=node.parent.data.id;
                this.param.classId=node.data.id;
            }
            this.$emit('StuQueryPage');
        },
        clearParam(){
            this.param.colleageId='';
            this.param.enteryear='';
            this.param.classId='';
        }
    },
    mounted(){
        ColleageRequest.ListCEATree().then(response=>{
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
}

</script>

<style></style>