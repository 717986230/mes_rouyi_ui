<template>
    <div class="z-container">
        <!--   能源结算-->
        <iframe :src='src' frameborder="0" class="z-iframe"></iframe>
    </div>
</template>

<script>
export default {
    name: "energyClose",
    data(){
        return{
            src:'/staticPage/mes/energySum.html'
        }
    }
}
</script>

<style lang="scss" scoped>
.z-container{
    width: 100%;
    height: calc(100vh - 80px);
    min-height: calc(100vh - 80px);
    overflow-y: auto;
    .z-iframe{
        width: 100%;
        height:  100%;
    }
}
</style>


