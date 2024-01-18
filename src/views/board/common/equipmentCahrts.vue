<template>
  <div class="e-container">
    <div ref="charts" class="charts"></div>
    <img
      class="charts-bg"
      :src="
        this.KBSy.picType === 0
          ? require('@/assets/images/board/dqgz-bg1.png')
          : require('@/assets/images/board/jxgz-bg1.png')
      "
    />
  </div>
</template>

<script>
var self;
export default {
  name: "equipmentCahrts",
  props: ["KBSy"],
  data() {
    return {};
  },
  watch: {
    KBSy: {
      handler(newVal) {
        this.initChart();
      },
      immediate: true,
    },
  },
  mounted() {
      this.initChart();
  },
  methods: {
    initChart() {
      self = this;
      let {
        notRepair: notRepair,
        repair: repair,
        number: number,
        picType: picType,
        proportion: proportion,
      } = this.KBSy;

      let color1 = picType == 0 ? "#1CC5FD" : "#FDF408"; // 进度条颜色
      let color2 = picType == 0 ? "#1EBEF4" : "#DDA923"; // 指针颜色
      let color3 = picType == 0 ? "#0A4382" : "#53684B"; // 指针背景
      let image1 =
        picType == 0
          ? "image://data:image/svg+xml;base64,PHN2ZyANCiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQogd2lkdGg9IjEzLjc1cHgiIGhlaWdodD0iMTIuNzVweCI+DQogPGc+DQo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiICBmaWxsPSJyZ2IoMCwgMCwgMCkiDQogZD0iTTkuODgyLDExLjI2NCBMMy42MTgsMTEuMjY0IEwwLjQ4Niw1LjYyNyBMMy42MTgsLTAuMDExIEw5Ljg4MiwtMC4wMTEgTDEzLjAxNCw1LjYyNyBMOS44ODIsMTEuMjY0IFoiLz4gPC9nPg0KIDxnPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgIHN0cm9rZT0icmdiKDI4LCAxOTcsIDI1MykiIHN0cm9rZS13aWR0aD0iMS41cHgiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBmaWxsPSJub25lIg0KIGQ9Ik05LjI1NCwxMC4wMTAgTDQuMjQ1LDEwLjAxMCBMMS43NDAsNS42MjUgTDQuMjQ1LDEuMjQxIEw5LjI1NCwxLjI0MSBMMTEuNzU4LDUuNjI1IEw5LjI1NCwxMC4wMTAgWiIvPiA8L2c+DQogPGc+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiAgZmlsbD0icmdiKDI4LCAxOTcsIDI1MykiDQogZD0iTTcuNjgzLDcuNTAyIEw1LjgxMCw3LjUwMiBMNC44NzMsNS42MjMgTDUuODEwLDMuNzQ0IEw3LjY4MywzLjc0NCBMOC42MjAsNS42MjMgTDcuNjgzLDcuNTAyIFoiLz4NCiA8L2c+DQo8L3N2Zz4NCg=="
          : "image://data:image/svg+xml;base64,PHN2ZyANCiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQogd2lkdGg9IjE0Ljc1cHgiIGhlaWdodD0iMTIuNzVweCI+DQo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiICBmaWxsPSJyZ2IoMCwgMCwgMCkiDQogZD0iTTkuOTc3LDExLjc0MiBMMy43MTMsMTEuNzQyIEwwLjU4MSw2LjEwNCBMMy43MTMsMC40NjcgTDkuOTc3LDAuNDY3IEwxMy4xMDksNi4xMDQgTDkuOTc3LDExLjc0MiBaIi8+DQo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiICBzdHJva2U9InJnYigyNTMsIDI0NCwgOCkiIHN0cm9rZS13aWR0aD0iMS41cHgiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBmaWxsPSJub25lIg0KIGQ9Ik05LjM0OCwxMC40ODggTDQuMzM5LDEwLjQ4OCBMMS44MzUsNi4xMDMgTDQuMzM5LDEuNzE4IEw5LjM0OCwxLjcxOCBMMTEuODUzLDYuMTAzIEw5LjM0OCwxMC40ODggWiIvPg0KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiAgZmlsbD0icmdiKDI1MywgMjQ0LCA4KSINCiBkPSJNNy43NzgsNy45ODAgTDUuOTA1LDcuOTgwIEw0Ljk2OCw2LjEwMSBMNS45MDUsNC4yMjIgTDcuNzc4LDQuMjIyIEw4LjcxNSw2LjEwMSBMNy43NzgsNy45ODAgWiIvPg0KPC9zdmc+DQo="; // 外层指针

      let option = {
        tooltip: {
          trigger: "none", // 将 tooltip 触发方式设置为 none
        },
        series: [
          {
            name: "亮色饼图",
            type: "pie",
            radius: ["40%", "55%"],
            center: ["70%", "50%"],
            startAngle: 180,
            data: [
              {
                value: notRepair,
                name: "Search Engine",
                itemStyle: {
                  color: "#fff",
                  decal: {
                    symbol: "none",
                  },
                },
                label: {
                  show: false,
                },
              },
              {
                value: repair,
                itemStyle: {
                  color: color1,
                },
                labelLine: {
                  normal: {
                    show: false,
                  },
                },
                label: {
                  normal: {
                    show: false,
                  },
                },
              },

              {
                value: number / 3,
                itemStyle: {
                  color: "none",
                  decal: {
                    symbol: "none",
                  },
                },
                label: {
                  show: false,
                },
              },
            ],
          },
          {
            type: "gauge",
            radius: "40%", // 位置
            center: ["70%", "50%"],
            startAngle: 0,
            endAngle: 360,
            axisLine: {
              show: true,
              lineStyle: {
                // 轴线样式
                width: 200, // 宽度
                color: [[1, "transparent"]], // 颜色
              },
            },
            axisTick: {
              // 刻度
              show: false,
            },
            splitLine: {
              // 分割线
              show: false,
            },
            axisLabel: {
              // 刻度标签
              show: false,
            },
            pointer: {
              // 仪表盘指针
              show: false,
            },
            detail: {
              fontSize: self.pxToRem(16),
              offsetCenter: [0, 0],
              valueAnimation: false,
              formatter: function (value) {
                return value;
              },
              color: "#fff",
            },
            data: [
              {
                value: repair,
              },
            ],
          },
          {
            type: "gauge",
            startAngle: 180,
            endAngle: 270,
            radius: "70%", // 位置
            center: ["70%", "50%"],
            splitNumber: number,
            min: 0,
            max: number,
            pointer: {
              //仪表盘指针。
              icon: "path://M3,5L0,1H6Z",
              length: "4",
              width: 6,
              offsetCenter: [0, "-86%"],
              itemStyle: {
                color: color2,
              },
            },
            axisLine: {
              //仪表盘轴线相关配置。
              roundCap: false,
              lineStyle: {
                width: 20,
                color: [[1, color3]],
              },
            },
            axisTick: {
              //刻度样式。
              show: false,
            },
            splitLine: {
              //分隔线样式。
              show: false,
              lineStyle: {
                color: "red",
              },
            },
            axisLabel: {
              //刻度标签
              show: false,
            },
            title: {
              show: false,
            },
            detail: {
              show: false,
            },
            data: [
              {
                value: notRepair,
              },
            ],
          },
          {
            type: "gauge",
            startAngle: 180,
            endAngle: 270,
            radius: "75%", // 位置
            center: ["70%", "50%"],
            splitNumber: number,
            min: 0,
            max: number,
            pointer: {
              //仪表盘指针。
              icon: image1,
              length: 10,
              width: 10,
              offsetCenter: [0, "-86%"],
              // itemStyle:{
              //   color:'red'
              // }
            },
            axisLine: {
              //仪表盘轴线相关配置。
              roundCap: false,
              lineStyle: {
                width: 2,
                color: [[1, "#A3CEDE"]],
              },
            },
            axisTick: {
              //刻度样式。
              show: false,
            },
            splitLine: {
              //分隔线样式。
              show: false,
              lineStyle: {
                color: "red",
              },
            },
            axisLabel: {
              //刻度标签
              show: true,
              distance: -30,
              color: "#fff",
              fontSize: self.pxToRem(10),
              rotate: "tangential",
              formatter: function (v) {
                if (v == notRepair) {
                  // alert(v)
                  return "故障 " + notRepair;
                }
              },
            },
            title: {
              show: false,
            },
            detail: {
              show: false,
            },
            data: [
              {
                value: number,
              },
            ],
          },
        ],
      };
      var myChart = this.$echarts.init(this.$refs.charts);
      myChart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.e-container {
  width: 100%;
  height: 100%;
  position: relative;

  .charts {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .charts-bg {
    width: 107px;
    height: 25px;
    position: absolute;
    bottom: 20%;
    left: 20%;
  }
}
</style>
