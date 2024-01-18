<template>
    <div class="z-container">
        <!--   节点量确认-->
        <iframe :src='src' frameborder="0" class="z-iframe"></iframe>
    </div>
</template>

<script>
export default {
    name: "nodesConfirm",
    data(){
        return{
            src:'/staticPage/mes/nodesConfirm.html'
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




