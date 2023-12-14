<template>
    <el-row class="tac">
        <el-col>
            <el-menu @open="handleOpen" @close="handleClose">
                <el-menu-item index="1">
                    <el-icon>
                        <Management />
                    </el-icon>
                    <span>学院管理</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <el-icon>
                        <Reading />
                    </el-icon>
                    <span>班级管理</span>
                </el-menu-item>
                <el-menu-item index="3">
                    <el-icon>
                        <UserFilled />
                    </el-icon>
                    <span>学生管理</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <el-icon>
                        <Avatar />
                    </el-icon>
                    <span>辅导员管理</span>
                </el-menu-item>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
import {
    Avatar,
    Reading,
    Management,
    UserFilled,
} from '@element-plus/icons-vue'
export default {
    components: {
        Avatar,
        Reading,
        Management,
        UserFilled,
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
</style>