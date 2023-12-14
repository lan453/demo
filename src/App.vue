<template>
  <div class="common-layout">
    <el-container class="app-container">
      <!-- 头页面 -->
      <el-header class="app-header" style="height:120px; width:100%; --el-header-padding: 0 0px;">
        <headerCom></headerCom>
      </el-header>
      <el-container>
        <!-- 侧边栏 -->
        <el-aside width="200px" class="app-aside">
          <indexMenu></indexMenu>
        </el-aside>
        <!-- 主页面 -->
        <el-main class="app-main">
          <mainCom></mainCom>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import headerCom from './components/componentBoot/headerCom.vue';
import asideCom from './components/componentBoot/asideCom.vue';
import mainCom from './components/componentBoot/mainCom.vue';
import indexMenu from './Menu/indexMenu.vue';
export default {
  components: {
    indexMenu,
    headerCom,
   asideCom,
   mainCom 
  },
  data() {
    return {
      
    }
  },
  methods: {
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.app-container {
  height: 650px;
  margin-bottom: 40px;
}

.app-header{
  background-color: #a7dde7;
  color: #333;
  /* 此处设置高度无效，需在声明处设置 */
  /* height: 120px; */
  text-align: center;
  
}

.app-aside {
  /* background-color: #aef7f3; */
  color: #333333;
  text-align: center;
  /* line-height: 35px; */
  border:1px solid rgb(93, 210, 214);
  /* background-color: antiquewhite; */
}

.app-main {
  /* background-color: #d2e4ee; */
  color: #333;
  text-align: center;
  /* line-height: 350px; */
  border:1px solid rgb(93, 210, 214);
}
</style>
