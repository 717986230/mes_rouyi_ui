<template>
  <div class="rightbotbox" v-if="combinedData">
    <div v-for="(e, index) in combinedData" :key="index" class="magerbox">
      <img class="img4bg" :src="e.img4" alt />
      <div class="img3bg">
        <img class="img3" :src="e.img3" alt />
      </div>
      <div class="yzimgbox">
        <!-- <p class="titlete" :style="{ color: e.titstcl }">{{e.title}}</p> -->
        <p class="titlete">{{ e.title }}</p>
        <div class="nbbox">
          <el-progress
            type="circle"
            class="yzdw"
            :width="35"
            :stroke-width="2"
            color="rgba(250,250,210,1)"
            :percentage="e.goodProductNumProportion"
          ></el-progress>
          <div class="textbox">
            <p class="yzboxp1">{{ e.goodProductNum }}</p>
            <p class="yzboxp2">{{ e.p2 }}</p>
          </div>
        </div>
        <div class="nbbox1">
          <el-progress type="circle" class="yzdw" :width="35" :stroke-width="2" :percentage="e.nogoodNumProportion"></el-progress>
          <div class="textbox">
            <p class="yzboxp1">{{ e.nogoodNum }}</p>
            <p class="yzboxp2">{{ e.p4 }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'shebeimager',
  data() {
    return {
      combinedData: [
        {
          goodProductNumProportion: 0,
          nogoodNumProportion: 0,
          titstcl: '#8EFFD9',
          title: '管输',
          goodProductNum: 0,
          p2: '进厂量',
          nogoodNum: 0,
          p4: '出厂量',
          img1: require('@/assets/images/board/icon(25).png'),
          img2: require('@/assets/images/board/icon (38).png'),
          img3: require('@/assets/images/board/sbgl1.png'),
          img4: require('@/assets/images/board/gifpic (10).gif')
        },
        {
          goodProductNumProportion: 0,
          nogoodNumProportion: 0,
          titstcl: '#FEFE8B',
          title: '汽运',
          goodProductNum: 0,
          p2: '进厂量',
          nogoodNum: 0,
          p4: '出厂量',
          img1: require('@/assets/images/board/icon(25).png'),
          img2: require('@/assets/images/board/icon (38).png'),
          img3: require('@/assets/images/board/sbgl2.png'),
          img4: require('@/assets/images/board/gifpic (7).gif')
        },
        {
          goodProductNumProportion: 0,
          nogoodNumProportion: 0,
          titstcl: '#6FEFFE',
          title: '船运',
          goodProductNum: 0,
          p2: '进厂量',
          nogoodNum: 0,
          p4: '出场量',
          img1: require('@/assets/images/board/icon(25).png'),
          img2: require('@/assets/images/board/icon (38).png'),
          img3: require('@/assets/images/board/sbgl3.png'),
          img4: require('@/assets/images/board/gifpic (5).gif')
        }
      ],
      timerId: null
    }
  },
  mounted() {
    // this.getRall()
    // this.timerId = setInterval(() => {
    //   this.getRall()
    // }, 30000)
  },
  beforeDestroy() {
    clearInterval(this.timerId)
  },
  methods: {
    getRall() {
      const promise1 = this.$api.KBSYcomponents()
      const promise2 = this.$api.KBSYpainting()
      const promise3 = this.$api.KBSYquality()
      Promise.all([promise1, promise2, promise3])
        .then(res => {
          const areAllSuccessful = res.every(res => res.code === 200)
          if (areAllSuccessful) {
            this.combinedData = [
              {
                goodProductNumProportion: res[0].data.goodProductNumProportion,
                nogoodNumProportion: res[0].data.nogoodNumProportion,
                goodProductNum: res[0].data.goodProductNum,
                nogoodNum: res[0].data.nogoodNum,
                titstcl: '#8EFFD9',
                title: '零部件',
                p2: '良品数',
                p4: '不良品数',
                img1: require('@/assets/images/board/icon(25).png'),
                img2: require('@/assets/images/board/icon (38).png'),
                img3: require('@/assets/images/board/sbgl1.png'),
                img4: require('@/assets/images/board/gifpic (10).gif')
              },
              {
                goodProductNumProportion: res[1].data.goodProductNumProportion,
                nogoodNumProportion: res[1].data.nogoodNumProportion,
                goodProductNum: res[1].data.goodProductNum,
                nogoodNum: res[1].data.nogoodNum,
                titstcl: '#FEFE8B',
                title: '烘干房',
                p2: '正常数量',
                p4: '异常数量',
                img1: require('@/assets/images/board/icon(25).png'),
                img2: require('@/assets/images/board/icon (38).png'),
                img3: require('@/assets/images/board/sbgl2.png'),
                img4: require('@/assets/images/board/gifpic (7).gif')
              },
              {
                goodProductNumProportion: res[2].data.goodProductNumProportion,
                nogoodNumProportion: res[2].data.nogoodNumProportion,
                goodProductNum: res[2].data.goodProductNum,
                nogoodNum: res[2].data.nogoodNum,
                titstcl: '#6FEFFE',
                title: '质量信息',
                p2: '已改善问题',
                p4: '未改善数量',
                img1: require('@/assets/images/board/icon(25).png'),
                img2: require('@/assets/images/board/icon (38).png'),
                img3: require('@/assets/images/board/sbgl3.png'),
                img4: require('@/assets/images/board/gifpic (5).gif')
              }
            ]
          }
        })
        .catch(err => {
          this.combinedData = [
            {
              goodProductNumProportion: 0,
              nogoodNumProportion: 0,
              titstcl: '#8EFFD9',
              title: '零部件',
              goodProductNum: 0,
              p2: '良品数',
              nogoodNum: 0,
              p4: '不良品数',
              img1: require('@/assets/images/board/icon(25).png'),
              img2: require('@/assets/images/board/icon (38).png'),
              img3: require('@/assets/images/board/sbgl1.png'),
              img4: require('@/assets/images/board/gifpic (10).gif')
            },
            {
              goodProductNumProportion: 0,
              nogoodNumProportion: 0,
              titstcl: '#FEFE8B',
              title: '烘干房',
              goodProductNum: 0,
              p2: '正常数量',
              nogoodNum: 0,
              p4: '异常数量',
              img1: require('@/assets/images/board/icon(25).png'),
              img2: require('@/assets/images/board/icon (38).png'),
              img3: require('@/assets/images/board/sbgl2.png'),
              img4: require('@/assets/images/board/gifpic (7).gif')
            },
            {
              goodProductNumProportion: 0,
              nogoodNumProportion: 0,
              titstcl: '#6FEFFE',
              title: '质量信息',
              goodProductNum: 0,
              p2: '已改善问题',
              nogoodNum: 0,
              p4: '未改善数量',
              img1: require('@/assets/images/board/icon(25).png'),
              img2: require('@/assets/images/board/icon (38).png'),
              img3: require('@/assets/images/board/sbgl3.png'),
              img4: require('@/assets/images/board/gifpic (5).gif')
            }
          ]
        })
    }
  }
}
</script>

<style scoped lang="scss">
p,
a {
  margin: 0;
  padding: 0;
}

.rightbotbox {
  height: calc(100% - 30px);
  width: 100%;
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
}

.magerbox {
  height: 100%;
  width: 25%;
  position: relative;
  left: 0;
  .img3bg {
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    width: 120px;
    .img3 {
      width: 120px;
      height: 287px;
    }
  }

  .img4bg {
    width: 28%;
    position: absolute;
    left: 26%;
  }

  .yzimgbox {
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    width: 120px;

    .titlete {
      line-height: 255px;
      width: 120px;
      height: 130px;
      margin: 0 auto;
      font-size: 18px;
      font-family: PangMenZhengDao sans-serif;
      font-weight: 400;
      color: #ffffff;
      // position: absolute;
      // top: 35%;
      // left: 0;
      text-align: center;
    }

    .nbbox {
      width: 117px;
      position: absolute;
      top: 55%;
      left: 0;
      display: flex;
      flex-wrap: nowrap;
      align-content: center;
      align-items: center;
      color: white;
      padding: 0 10px;

      .textbox {
        text-align: center;

        .yzboxp1 {
          color: white;
          font-size: 18px;
        }

        .yzboxp2 {
          width: 70px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          color: white;
          font-size: 12px;
        }
      }
    }

    .nbbox1 {
      width: 117px;
      position: absolute;
      top: 70%;
      left: 0;
      display: flex;
      padding: 0 10px;
      flex-wrap: nowrap;
      align-content: center;
      align-items: center;
      color: white;
      .textbox {
        text-align: center;
        .yzboxp1 {
          color: white;
          font-size: 18px;
        }

        .yzboxp2 {
          width: 70px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          font-size: 12px;
          color: white;
        }
      }
    }
  }
}

.yzdw {
  background: url('~@/assets/images/board/icon (38).png') no-repeat;
  width: 40px;
  height: 40px;
}

::v-deep .el-progress-circle__track {
  stroke: rgba(255, 255, 255, 0);
}

::v-deep .el-progress--circle .el-progress__text,
.el-progress--dashboard .el-progress__text {
  color: white;
  width: 0 !important;
  top: 47% !important;
  left: 6px !important;
}
</style>
