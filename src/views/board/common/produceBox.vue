<template>
  <div class="pBox-container ">
    <div class="box" :style="boxImg">
      <div class="num">23台/h</div>
      <div class="total">231</div>
      <div class="name">总装当班产量</div>
      <svg  :style="svgRotate" class="pointer" width="400" height="50" xmlns="http://www.w3.org/2000/svg">
        <path :fill="pointerColor" stroke="#000" d="m-0.10001,26.61901l56,-17.5l56,17.5l-56,17.5l-56,-17.5z" stroke-width="0" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "produceBox",
  props: ['imgId','rotate'],
  computed: {
    boxImg() {
      console.log(this.imgId)
      return {
        'background-image': 'url(' + require(`@/assets/images/board/pbox${this.imgId}.png`) + ')'
      }
    },
    pointerColor() {
      let color = this.imgId !== 1 ? this.imgId !== 2 ? '#FFF11E' : '#00FFFF' : '#0290FF'
      return color
    },
    svgRotate(){
      return {
        transform: `rotate(${this.rotate}deg)`
      }
    }

  },
  mounted() {
    console.log('asdasd', this.imgId)
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.pBox-container {
  width: 100%;
  height: 100%;

  .box {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center bottom;
    background-size: 60%;
    position: relative;

    .num {
      height: 12px;
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #DFEEF3;
      line-height: 19px;
    }

    .total {
      width: 32px;
      height: 10px;
      font-size: 17px;
      font-family: YouSheBiaoTiHei;
      font-weight: 400;
      color: #F8F8FA;
      line-height: 30px;
      position: absolute;
      bottom: 50%;
      left: calc(50% - 16px);
    }

    .name {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 18px;
      transform: scale(0.7);
      font-size: 12px;
      font-family: Adobe Heiti Std;
      font-weight: normal;
      color: #DFEEF3;
      line-height: 15px;
      position: absolute;
      bottom: 0;
    }

    .pointer {
      width: 44px;
      height: 6px;
      position: absolute;
      bottom: 24px;
      left: calc(50% - 44px);
      transform-origin: right center;

      path{
        transform: scale(0.1);
      }
    }
  }
}
</style>
