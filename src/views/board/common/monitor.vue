<template>
  <div class="m-container">
    <title-bar title="智能监控"></title-bar>
    <div class="content flex">
      <div class="left flex flex-direction align-center justify-around">
        <div class="top">
          <img src="@/assets/images/boardFinal/monitor-bg.png" class="img1" />
          <img src="@/assets/images/boardFinal/monitor-icon.png" class="img2" />
        </div>
        <div class="text">监控点位</div>
      </div>
      <div class="right flex flex-direction align-center justify-around">
        <div class="legend flex align-center justify-between">
          <div class="name">区域名称</div>
          <div class="online flex align-center">
            <div class="icon color1"></div>
            在线
          </div>
          <div class="online flex align-center">
            <div class="icon color2"></div>
            不在线
          </div>
          <div class="total">在线数/总数（个）</div>
        </div>
        <bar-cahrts
          style="height: 76%; width: 100%"
          :online="initialLlineArr"
          :total="initialBlockBar"
          :names="namelist"
        ></bar-cahrts>
      </div>
    </div>
  </div>
</template>

<script>
import TitleBar from "@/views/board/common/titleBar";
import BarCahrts from "@/views/board/common/barCahrts";
import { numRandom } from "@/utils/num-random";
export default {
  name: "monitor",
  components: { BarCahrts, TitleBar },
  data() {
    return {
      namelist: [],
      initialLlineArr: [3, 1, 8, 6, 3], //在线数量
      initialBlockBar: [3, 1, 11, 8, 3], //总数量
    };
  },
  created() {
    // this.getData();
    // setInterval(() => {
    //   this.getData();
    // }, 30000);
  },
  mounted() {},

  methods: {
    getData() {
      this.$api.KBSYinformation().then((res) => {
        if (res.code == 200) {
          let KB = res.data;
          this.namelist = KB.map((e) => {
            return e.name;
          });
          this.initialLlineArr = KB.map((e) => {
            return e.onLine;
          });
          this.initialBlockBar = KB.map((e) => {
            return e.count;
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.m-container {
  width: 100%;
  height: 100%;
  .content {
    height: calc(100% - 50px);
    width: 100%;
    .left {
      width: 20%;
      height: 100%;
      font-size: 18px;
      font-family: YouSheBiaoTiHei;
      font-weight: 400;
      color: #ffffff;
      line-height: 24px;
      overflow: hidden;
      .top {
        width: 100%;
        position: relative;
        .img1 {
          width: 100%;
          position: absolute;
          left: 0;
          top: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          animation: ring-rotate 5s linear infinite;
        }
        @keyframes ring-rotate {
          0% {
            transform: rotateZ(0deg);
          }

          100% {
            transform: rotateZ(360deg);
          }
        }
        .img2 {
          width: 100%;
          position: absolute;
          left: 0;
          top: 0;
        }
      }
      .text {
      }
    }
    .right {
      width: 76%;
      height: 100%;
      .legend {
        height: 20%;
        width: 100%;
        font-size: 18px;
        font-family: YouSheBiaoTiHei;
        font-weight: 400;
        color: #ffffff;
        line-height: 60px;
        .name {
        }
        .online {
          width: auto;
          flex-wrap: nowrap;
          .icon {
            width: 12px;
            height: 12px;
            margin-right: 12px;
          }
          .color1 {
            background-color: #08ffeb;
          }
          .color2 {
            background-color: #023773;
          }
        }
        .total {
        }
      }
    }
  }
}
</style>
