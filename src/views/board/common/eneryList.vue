<template>
  <div
    class="list-box w-100 h-100 flex flex-direction align-center justify-around"
  >
    <div
      v-for="(item, index) in dataList"
      class="row flex align-center justify-around"
    >
      <div class="name flex align-center">
        <div class="icon" :style="{ backgroundColor: item.color }"></div>
        {{ item.name }}
      </div>
      <div class="type">用电</div>
      <div class="num">{{ item.quantity }}kW·h</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "eneryList",
  props: ["dataList"],
};
</script>

<style lang="scss" scoped>
.list-box {
  background: url("~@/assets/images/board/enery-bg.png") no-repeat center;
  background-size: 100%;
  .row {
    width: 80%;
    font-size: 16px;
    font-family: YouSheBiaoTiHei;
    font-weight: 400;
    color: #ffffff;
    .name {
      width: auto;
      white-space: nowrap;

      .icon {
        width: 12px;
        height: 12px;
        margin-right: 12px;
      }
    }

    .type {
      min-width: 50px;
      text-align: center;
    }

    .num {
      min-width: 100px;
      text-align: center;
    }
  }
}
</style>
