<template>
    <div class="app-container">
        <div class="title flex align-center justify-between">
            <div class="block cs" @click="linkTo('/board/index-1')"></div>
            <div class="block cs" @click="linkTo('/board/index-1')"></div>
        </div>

    </div>
</template>

<script>
export default {
    name: "index-2",
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        linkTo(path) {
            this.$router.push(path)
        }
    }
}
</script>

<style lang="scss" scoped>
.app-container {
    position: relative;
    width: 100vw;
    height: 100vh;
    background: url("~@/assets/images/board/index2-1920.jpg") no-repeat center;
    background-size: 100% 100%;

    .title {
        position: absolute;
        top: 0%;
        left: 0%;
        width: 100%;
        height: 120px;

        .block {
            width: 100px;
            height: 100%;
        }
    }
}

@media (min-aspect-ratio: 1920/1080) and (max-aspect-ratio: 1920/1080) {
    .app-container {
        position: relative;
        width: 100vw;
        height: 100vh;
        background: url("~@/assets/images/board/index2-1920.jpg") no-repeat center;
        background-size: 100% 100%;
    }
}

@media (min-aspect-ratio: 2560/1664) and (max-aspect-ratio: 2560/1600) {
    .app-container {
        position: relative;
        width: 100vw;
        height: 100vh;
        background: url("~@/assets/images/board/index2-2560.jpg") no-repeat center;
        background-size: 100% 100%;
    }
}

@media (min-aspect-ratio: 4/3) and (max-aspect-ratio: 4/3) {
    .app-container {
        position: relative;
        width: 100vw;
        height: 100vh;
        background: url("~@/assets/images/board/index2-2496.jpg") no-repeat center;
        background-size: 100% 100%;
    }
}
</style>
