<template>
  <div class="s-container">
    <title-bar title="生产管理"></title-bar>
    <el-row
      type="flex"
      justify="space-between"
      style="height: 35%; width: 100%"
    >
      <el-col :span="10" class="flex align-center justify-between">
        <div class="icon-box">
          <img
            src="@/assets/images/boardFinal/safe-icon-bg.png"
            alt=""
            class="bg"
          />
          <img
            src="@/assets/images/boardFinal/safe-icon.png"
            alt=""
            class="icon"
          />
        </div>
        <div class="decs h-100 flex flex-direction align-start justify-around">
          <div class="name">当班运行装置</div>
          <div class="num">
            {{ KB.countQuantity || 0 }} <span class="dw">套</span>
          </div>
        </div>
      </el-col>
      <el-col :span="14" style="height: 120%">
        <pie3d :datalist="dataList3D"></pie3d>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" style="height: 55%">
      <el-col :span="23" style="position: relative">
        <div
          class="online-data flex flex-direction align-center justify-around"
        >
          <div class="row flex flex-direction align-end self-start">
            <div class="name name1">重整装置</div>
            <div class="nums flex">
              <div class="num">今日加工量 {{ KB.fireWaterOnLong || 0 }}</div>
              <div class="rate">
                今日收率
                {{ KB.fireWaterScale || 0 }}%
              </div>
            </div>
          </div>
          <div class="row flex flex-direction align-start self-center">
            <div class="name name2">轻烃回收装置 </div>
            <div class="nums flex">
              <div class="num">今日加工量 {{ KB.gasOnLong || 0 }}个</div>
              <div class="rate">
                  今日收率
                {{ KB.gasScale || 0 }}%
              </div>
            </div>
          </div>
          <div
            class="row flex flex-direction align-end self-start"
            style="padding-right: 30px"
          >
            <div class="name name3">蜡油加烃装置</div>
            <div class="nums flex">
              <div class="num">今日加工量 {{ KB.fireOnLong || 0 }}个</div>
              <div class="rate">
                  今日收率
                {{ KB.fireScale || 0 }}%
              </div>
            </div>
          </div>
        </div>

        <div class="scharts">
          <s-charts :online="onlineData"></s-charts>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TitleBar from "@/views/board/common/titleBar";
import pie3d from "@/views/board/common/pie3d";
import sCharts from "@/views/board/common/safeCharts";

export default {
  name: "safe",
  components: { TitleBar, pie3d, sCharts },
  data() {
    return {
      bjNum: 6,
      KB: [],
      onlineData: {
        total: 100, //
        tnum1: 20,
        tnum2: 90,
        tnum3: 55,
        num1: 20,
        num2: 30,
        num3: 50,
      },
      dataList3D: [
        {
          name: "消防水防冻系统",
          value: 12, //
          itemStyle: {
            color: "#1591F1",
          },
        },
        {
          name: "消防燃气报警系统",
          value:8, //
          itemStyle: {
            color: "#71FAF4",
          },
        },
        {
          name: "车间火灾报警系统",
          value: 16, //
          itemStyle: {
            color: "#F6F900",
          },
        },
      ],
      timeId: null,
    };
  },
  created() {
    // this.getDate();
    // this.timeId = setInterval(() => {
    //   this.getDate();
    // }, 30000);
  },

  beforeDestroy() {
    clearInterval(this.timeId);
  },
  watch: {
    onlineData: {
      handler(newVal) {
        this.onlineData = newVal;
      },
      immediate: true,
    },
  },
  mounted() {},
  methods: {
    getDate() {
      this.$api
        .KBSYsecutity()
        .then((res) => {
          if (res.code == 200) {
            this.KB = res.data;
            let Ks = res.data;
            this.onlineData = {
              total: Ks.onLongCount,
              tnum1: 20,
              tnum2: 90,
              tnum3: 55,
              num1: 20,
              num2: 30,
              num3: 50,
            };
            this.dataList3D = [
              {
                name: "消防水防冻系统",
                value: Ks.fireWaterQuantity || 0,
                itemStyle: {
                  color: "#1591F1",
                },
              },
              {
                name: "消防燃气报警系统",
                value: Ks.gasQuantity || 0,
                itemStyle: {
                  color: "#71FAF4",
                },
              },
              {
                name: "车间火灾报警系统",
                value: Ks.fireQuantity || 0,
                itemStyle: {
                  color: "#F6F900",
                },
              },
            ];
            console.log("数据获取成功", res.data);
          }
        })
        .catch((err) => {
          this.onlineData = {
            total: 100,
            tnum1: 20,
            tnum2: 90,
            tnum3: 55,
            num1: 20,
            num2: 30,
            num3: 50,
          };
          this.dataList3D = [
            {
              name: "消防水防冻系统",
              value: 0, //
              itemStyle: {
                color: "#1591F1",
              },
            },
            {
              name: "消防燃气报警系统",
              value: 0, //
              itemStyle: {
                color: "#71FAF4",
              },
            },
            {
              name: "车间火灾报警系统",
              value: 0, //
              itemStyle: {
                color: "#F6F900",
              },
            },
          ];
          console.log("数据获取失败");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.icon-box {
  width: 92px;
  height: 89px;
  position: relative;

  .bg {
    width: 92px;
    height: 89px;
    position: absolute;
    left: 0;
    top: 0;
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

  .icon {
    width: 23px;
    height: 28px;
    position: absolute;
    left: calc(50% - 11px);
    top: calc(50% - 14px);
  }
}

.decs {
  .name {
    font-size: 18px;
    font-family: YouSheBiaoTiHei sans-serif;
    font-weight: 400;
    color: #f4fdff;
    line-height: 19px;
  }

  .num {
    font-size: 40px;
    font-family: YouSheBiaoTiHei sans-serif;
    font-weight: 400;
    color: #f98a38;
    line-height: 19px;

    .dw {
      font-size: 24px;
    }
  }
}

.online-data {
  width: 100%;
  height: 166px;
  background: url("~@/assets/images/boardFinal/online.png") no-repeat center
    right;
  background-size: 275px 166px;

  .row {
    width: 250px;

    .name {
      font-size: 12px;
      font-family: Microsoft YaHei sans-serif;
      font-weight: 400;
      line-height: 20px;
    }

    .name1 {
      color: #38f9a5;
    }

    .name2 {
      color: #00f0ff;
    }

    .name3 {
      color: #ffcc00;
    }

    .nums {
      font-size: 12px;
      font-family: Microsoft YaHei sans-serif;
      font-weight: 400;
      color: #ffffff;
      line-height: 20px;
      white-space: nowrap;

      .num {
        width: auto;
      }

      .rate {
        width: auto;
        margin-left: 20px;
      }
    }
  }

  .total {
  }
}
.scharts {
  width: 150px;
  height: 150px;
  position: absolute;
  right: 0;
  top: calc(50% - 75px);
  background: url("~@/assets/images/boardFinal/scharts-bg.png") no-repeat;
  background-size: 100% 100%;
}
</style>
