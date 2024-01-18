<template>
  <div class="top flex align-center justify-around">
    <div class="type-box" v-for="(item,index) in dataList">
      <img class="img"
           :src="item.status? require('@/assets/images/board/enery-b.png') :require('@/assets/images/board/enery-r.png')"></img>
      <div class="text flex flex-direction align-center justify-between">
        <div class="p1">{{ item.status | statusFilter }}</div>
        <div class="p2">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "eneryType",
  props:['dataList'],
  filters:{
    statusFilter(val){
      return val?'运行':'未运行'
    }
  },
}
</script>

<style lang="scss" scoped>
.top {
  height: 26%;
  width: 100%;

  .type-box {
    width: 16%;
    height: 100%;
    position: relative;

    .img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2;
    }

    .text {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;

      .p1 {
        height: 12px;
        font-size: 15px;
        font-family: YouSheBiaoTiHei;
        font-weight: 400;
        color: #FFFFFF;

      }

      .p2 {
        height: 9px;
        font-size: 12px;
        font-family: YouSheBiaoTiHei;
        font-weight: 400;
        color: #FFFFFF;
      }
    }
  }
}
</style>
