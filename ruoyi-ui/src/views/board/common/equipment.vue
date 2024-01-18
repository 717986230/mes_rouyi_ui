<template>
  <div class="e-container flex flex-direction align-center justify-between">
    <title-bar :isLeft="false" title="设备管理"></title-bar>
    <div class="content">
      <el-row class="h-100 w-100">
        <el-col
          :span="14"
          class="h-100 left flex flex-direction align-center justify-around"
        >
          <div class="btns w-100 flex">
            <div class="btn-box flex align-center">
              <div class="icon color1"></div>
              <div class="text">电气故障</div>
            </div>
            <div class="btn-box flex align-center">
              <div class="icon color2"></div>
              <div class="text">机械故障</div>
            </div>
          </div>
          <div
            v-for="(item, index) in KBs"
            :key="index"
            class="gz-box w-100 flex align-center justify-between"
            :style="{ 'background-image': 'url(' + item.bg + ')' }"
          >
            <div class="num1">
              {{ item.number }}
              <span>台</span>
            </div>
            <div class="num2">
              {{ item.proportion }}
              <span>%</span>
            </div>
          </div>
        </el-col>
        <el-col :span="10" class="h-100 right">
          <pic-charts
            v-if="KBs.electricalEquipment"
            style="width: 100%; height: 50%"
            :KBSy="KBs.electricalEquipment"
          ></pic-charts>
          <pic-charts
            v-if="KBs.machinery"
            style="width: 100%; height: 50%"
            :KBSy="KBs.machinery"
          ></pic-charts>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import TitleBar from "@/views/board/common/titleBar";
import picCharts from "@/views/board/common/equipmentCahrts";
export default {
  name: "equipment",
  components: { TitleBar, picCharts },
  data() {
    return {
      timeId: null,
      KBs: {
        electricalEquipment: {
          number: "0",
          proportion: "0",
          repair: "0",
          notRepair: "0",
            bg: require("@/assets/images/board/dqgz1.png"),
          picType: 0,
        },
        machinery: {
          number: "0",
          proportion: "0",
          repair: "0",
          notRepair: "0",
            bg: require("@/assets/images/board/jxgz1.png"),
          picType: 1,
        },
      }, //设备管理
    };
  },
  watch: {
    KBs: {
      handler(newVal) {
        this.KBs;
      },
      immediate: true,
    },
  },
  created() {
    this.getDate();
    this.timeId = setInterval(() => {
      this.getDate();
    }, 30000);
  },

  beforeDestroy() {
    clearInterval(this.timeId);
  },
  methods: {
    getDate() {
      this.$api.KBSYdeviceManage().then((res) => {
        if (res.code == 200) {
          let data = res.data;
          this.KBs = {
            electricalEquipment: {
              ...data.electricalEquipment,
              bg: require("@/assets/images/boardFinal/dqgz1.png"),
              picType: 0,
            },
            machinery: {
              ...data.machinery,
              bg: require("@/assets/images/boardFinal/jxgz1.png"),
              picType: 1,
            },
          };
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.e-container {
  width: 100%;
  height: 100%;
  .content {
    height: calc(100% - 50px);
    width: 100%;
    .left {
      padding-top: 30px;
      position: relative;
      .btns {
        position: absolute;
        top: 0;
        left: 0;
        .btn-box {
          width: 50%;
          .icon {
            width: 12px;
            height: 12px;

            border-radius: 50%;
          }
          .text {
            font-size: 20px;
            font-family: YouSheBiaoTiHei;
            font-weight: 400;
            color: #ffffff;
            margin-left: 10px;
          }
          .color1 {
            background: #08ffeb;
          }
          .color2 {
            background: #fff600;
          }
        }
      }
      .gz-box {
        height: 50%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;
        .num1 {
          width: 60%;
          height: 100%;
          padding-left: 0px;
          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 22px;
          font-family: YouSheBiaoTiHei;
          font-weight: 400;
          color: #ffffff;
          span {
            font-size: 14px;
            margin-top: 5px;
          }
        }
        .num2 {
          width: 40%;
          height: 100%;
          padding-left: 20px;
          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 22px;
          font-family: YouSheBiaoTiHei;
          font-weight: 400;
          color: #ffffff;
          span {
            font-size: 14px;
            margin-top: 5px;
          }
        }
      }
    }
    .right {
    }
  }
}
</style>
