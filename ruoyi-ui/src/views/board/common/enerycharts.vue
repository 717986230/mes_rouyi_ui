<template>
  <div class="p-charts-container">
    <div ref="charts" class="charts"></div>
  </div>
</template>

<script>
var self;
export default {
  name: "enerycharts",
  props: ["dataList", "total"],
  data() {
    return {};
  },
  watch: {
    total(newTotal) {
      // React to prop changes
      this.initChart();
    },
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      self = this;
      var option;
      var imgSrc =
        "data:image/png;base64,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";
      // 数据初始化
      let name = "总电量";
      let num = this.total;
      let numtotal = [{ value: num, name: "总电量" }];
      option = {
        graphic: {
          elements: [
            {
              type: "image",
              z: 1,
              style: {
                image: imgSrc,
                width: self.remToEcharts(96),
                height: self.remToEcharts(96),
              },
              left: "center",
              top: "center",
            },
          ],
        },

        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["60%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            itemStyle: {
              normal: {
                borderWidth: 1, // 将边框宽度设置为 10
                borderRadius: "50%", // 将圆角半径设置为 5
              },
            },

            emphasis: {
              scale: true,
              scaleSize: 10,
              // label: {
              //   show: true,
              //   fontSize: 24,
              //   fontWeight: 'bold',
              //   formatter: function (value) {
              //     console.log('value====',value)
              //     return 'asd'
              //   }
              // }
            },
            labelLine: {
              show: false,
            },
            data: numtotal,
          },
          {
            type: "gauge",
            radius: "40%", // 位置
            center: ["50%", "50%"],
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
              offsetCenter: [0, 0],
              valueAnimation: false,
              formatter: function (value) {
                return "{name|" + name + "}" + "\n" + "{val|" + num + "}";
              },
              rich: {
                name: {
                  color: "rgba(255,255,255,0.9)",
                  fontSize: self.pxToRem(14),
                },
                val: {
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: self.pxToRem(20),
                },
              },
              color: "#fff",
            },
            data: [
              {
                value: num,
              },
            ],
          },
        ],
      };

      var myChart = this.$echarts.init(this.$refs.charts);
      option && myChart.setOption(option);
      myChart.on("mouseover", function (params) {
        if (params.data) {
          name = params.data.name || "";
          num = params.data.value || "";
          myChart.setOption(option);
        }
      });
      myChart.on("mouseout", function (params) {
        name = "总电量";
        num = self.total;
        myChart.setOption(option);
      });
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
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
}
</style>
