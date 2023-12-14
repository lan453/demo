<template>
    <div class="block text-center" style="width: 100%;">
        <el-carousel height="120px" style="width: 100%;">
            <el-carousel-item v-for="item in imgwrap" :key="item.url">
                <img :src="item.url" />
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
    data() {
        return {
            imgwrap: [
                { url: require("./img/1.png") },
                { url: require("./img/2.png") },
                { url: require("./img/3.png") }
            ]
        }
    },
    methods: {
    }
}

</script>

<style>

</style>