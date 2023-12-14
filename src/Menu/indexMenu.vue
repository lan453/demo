<template>
    <el-menu
        default-active="1"
        @open="handleOpen"
        @close="handleClose"
        @select="openTabe"
    >
    <el-menu-item v-for="menu in menus" :index="menu.menuIndex">
        <el-icon>
            <component :is="menu.icon"></component>
        </el-icon>
        <span>{{ menu.name}}</span>
    </el-menu-item>


    </el-menu>
</template>

<script>
import menus from './menu';
export default {
    
    data() {
        return {
            menus:menus
        }
    },
    methods: {
        handleOpen(key,keyPath){
            console.log(key, keyPath);
        },
        handleClose(key,keyPath){
            console.log(key, keyPath);
        },
        select(key,keyPath){
            console.log(key, keyPath);
        },
        openTabe(index,indexPath,item,routeResult){
        console.log(index);
        console.log("=========")
        console.log(this.menus[index-1])
        console.log("=========")
        this.$store.dispatch({
          type:'addTab',
          newTab:this.menus[index-1]
        })
      }

    }
}

</script>

<style></style>