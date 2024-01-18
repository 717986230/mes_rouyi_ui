<template>
  <div class="p-charts-container">
    <div ref="charts" class="charts"></div>
  </div>
</template>

<script>
import { debounce } from "@/utils";
var self;
export default {
  name: "safeCharts",
  props: {
    online: {},
  },
  data() {
    return {};
  },
  watch: {
    online: {
      handler(newVal) {
        this.online = newVal;
        if (this.chart) {
          this.initChart();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    self = this;
    this.initChart();
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize();
      }
    }, 100);

    window.addEventListener("resize", this.__resizeHandler);
  },
  destroyed() {
    if (!this.chart) {
      return;
    }
    window.removeEventListener("resize", this.__resizeHandler);
    this.chart.dispose();
    this.chart = null;
  },

  methods: {
    initChart() {
      this.chart = this.$echarts.init(this.$refs.charts);
      let dataList = [
        {
          value: this.online.num1,
          name: "车间智慧火灾报警",
          itemStyle: {
            borderWidth: 0,
          },
          emphasis: {
            scale: false, // 禁用高亮时的缩放效果
            itemStyle: {
              opacity: 1, // 禁用高亮时的透明度变化效果
              borderWidth: 0, // 禁用高亮时的边框变化效果
            },
            labelLine: {
              show: false,
            },
          },
        },
        {
          value: this.online.num2,
          name: "消防与燃气报警物联网监控平台 ",
          itemStyle: {
            borderWidth: 0,
          },
          emphasis: {
            scale: false, // 禁用高亮时的缩放效果
            itemStyle: {
              opacity: 1, // 禁用高亮时的透明度变化效果
              borderWidth: 0, // 禁用高亮时的边框变化效果
            },
            labelLine: {
              show: false,
            },
          },
        },
        {
          value: this.online.num3,
          name: "消防水防冻系统",
          itemStyle: {
            borderWidth: 0,
          },
          emphasis: {
            scale: false, // 禁用高亮时的缩放效果
            itemStyle: {
              opacity: 1, // 禁用高亮时的透明度变化效果
              borderWidth: 0, // 禁用高亮时的边框变化效果
            },
            labelLine: {
              show: false,
            },
          },
        },
      ];

      let option = {
        series: [
          {
            name: "数据1",
            type: "pie",
            center: ["50%", "50%"],
            radius: ["75%", "80%"],
            animation: false,
            startAngle: 90,
            z: 3,
            data: [
              {
                value: 400,
                itemStyle: {
                  color: "#FFCC00",
                  borderRadius: "50%",
                },
              },
              {
                value: 100,
                itemStyle: {
                  opacity: 0,
                  color: "#072561",
                },
              },
            ],
            label: {
              normal: {
                show: false,
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
          },
          {
            name: "数据2",
            type: "pie",
            center: ["50%", "50%"],
            radius: ["65%", "70%"],
            animation: false,
            startAngle: 300,
            z: 3,
            emphasis: {},
            data: [
              {
                value: 300,
                itemStyle: {
                  color: "#00F0FF",
                  borderRadius: "50%",
                },
              },
              {
                value: 200,
                itemStyle: {
                  opacity: 0,
                  color: "#072261",
                },
              },
            ],
            label: {
              normal: {
                show: false,
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
          },
          {
            name: "数据3",
            type: "pie",
            center: ["50%", "50%"],
            radius: ["55%", "60%"],
            animation: true,
            startAngle: 180,
            z: 3,
            emphasis: {},
            data: [
              {
                value: 200,
                itemStyle: {
                  color: "#38F9A5",
                  borderRadius: "50%",
                },
              },
              {
                value: 300,
                itemStyle: {
                  opacity: 0,
                  color: "#072261",
                },
              },
            ],
            label: {
              normal: {
                show: false,
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
          },
          {
            name: "遮挡原始饼图",
            type: "gauge",
            radius: "80%",
            center: ["50%", "50%"],
            startAngle: 0,
            endAngle: 360,
            axisLine: {
              show: true,
              lineStyle: {
                // 轴线样式
                width: 300, // 宽度
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
              fontSize: self.pxToRem(20),
              offsetCenter: [0, 0],
              valueAnimation: false,
              formatter: function (value) {
                return value + "\n" + "{desc|原油加工量}";
              },
              rich: {
                desc: {
                  fontSize: self.pxToRem(14),
                  color: "#ffffff",
                },
              },
              color: "#fff",
            },
            data: [
              {
                value: this.online.total ,
              },
            ],
          },
        ],
      };

      this.chart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.p-charts-container {
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
}
</style>
