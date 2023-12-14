<template>
    <!-- 设置closable属性可以定义一个标签是否可移除。 -->
    <!-- @tab-remove,点击tab移除按钮后触发 -->
    <el-tabs v-model="this.$store.state.curentTab" type="card" closable @tab-remove="removeTab">

        <el-tab-pane  v-for="item in this.$store.state.tabs" :key="item.menuIndex" :label="item.name" :name="item.name">
            <component :is="item.component"></component>
        </el-tab-pane>

    </el-tabs>
</template>

<script>
import menus from '@/Menu/menu';
export default {
    data() {
        return {
            menus: menus
        }
    },
    methods: {
        // removeTab(targetName) { //当前的选项卡name
        //     console.log(targetName)
        //     const tabs = this.$store.state.tabs
        //     console.log('======================removeTable=======================')
        //     console.log(tabs)
        //     let activeName = ''
        //     console.log(activeName)
        //     if (activeName === targetName) {
        //         tabs.forEach((tab, index) => {
        //             if (tab.name === targetName) {
        //                 const nextTab = tabs[index + 1] || tabs[index - 1]
        //                 if (nextTab) {
        //                     activeName = nextTab.name
        //                 }
        //             }
        //         })
        //     }

        //     this.$store.state.tabs.name= activeName
        //     this.$store.state.tabs = tabs.filter((tab) => tab.name !== targetName)
        // }

        removeTab(targetName) {
            console.log("===============(targetName)==================")
            console.log("targetName:" + targetName);
            this.$store.dispatch({
                type: 'removeTab',
                targetName: targetName
            });
        }


    }
}

</script>

<style>
main.el-main{
    padding: 1px;
}
</style>