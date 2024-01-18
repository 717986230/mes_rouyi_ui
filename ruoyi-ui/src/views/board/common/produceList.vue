<template>
  <div class="textbox flex flex-direction align-center justify-around">
    <div
      class="row flex align-center justify-between"
      v-for="(item, index) in this.pieList"
      :key="index"
    >
      <div class="desc flex align-center">
        <img class="icon" :src="item.img" alt />
        <div class="name">{{ item.productName }}</div>
      </div>
      <div class="capacity flex align-center justify-end">
        <div class="num" :style="{ color: item.color }">
          {{ item.currentBeat}}
        </div>
        <div class="unit">{{ item.unit }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "produceList",
  props: ["pieList"],
  data() {
    return {};
  },
  mounted() {
    console.log(this.pieList, "pieList");
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.textbox {
  width: 100%;
  height: 100%;
  .row {
    width: 100%;
    .desc {
      width: 50%;
      height: 30px;
      .icon {
        width: 28px;
        height: 29px;
      }
      .name {
        margin-left: 16px;
        height: 14px;
        font-size: 14px;
        font-weight: 400;
        color: #ffffff;
        line-height: 17px;
      }
    }
    .capacity {
      width: 50%;
      height: 30px;
      .num {
        height: 19px;
        font-size: 23px;
        font-weight: 400;
        line-height: 17px;
        color: #fff;
      }
      .unit {
        height: 14px;
        margin-left: 12px;
        font-size: 14px;
        font-weight: 400;
        color: #ffffff;
        line-height: 17px;
      }
    }
  }
}
</style>
