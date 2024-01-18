<template>
  <div class="imgbox flex flex-direction align-center">
    <p class="num flex align-end justify-center">
      <span class="t1">{{ total }}</span>
      <span class="t2">台</span>
    </p>
    <p class="text">当日质检合格量</p>
  </div>
</template>

<script>
export default {
  name: "produceTotal",
  props:['total']
}
</script>

<style lang="scss" scoped>

.imgbox{
  height:160px;
  width: auto;
  min-width: 60%;
  padding-top: 16px;
  position: relative;
  background-image: url('~@/assets/images/board/paom.gif');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  .num{
    width: 100%;
    height: 17px;

    font-family: PangMenZhengDao;
    font-weight: 400;
    color: #FFFFFF;
    .t1{
      font-size: 25px;
    }
    .t2{
      font-size: 16px;
    }
  }
  .text{
    position: absolute;
    bottom: 0;
    height: 16px;
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #FFFFFF;
  }
}
</style>
