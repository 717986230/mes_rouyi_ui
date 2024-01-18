<template>
  <div class="b-container">
    <div ref="charts" class="charts"></div>
  </div>
</template>

<script>
import { debounce } from "@/utils";
var self;
export default {
  name: "barCahrts",
  props: ["online", "total", "names"],
  data() {
    return {
      chart: null,
      thisOnline: null,
    };
  },
  watch: {
    online: {
      handler(newVal) {
        this.thisOnline = newVal;
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
    this.thisOnline = this.online;
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
      let initialLlineArr = this.thisOnline;
      let initialBlockBar = this.total;
      var ydata = this.names; //y轴
      var onlineArr = initialLlineArr.map((item, index) => {
        return (item / initialBlockBar[index]) * 35;
      }); //在线数量色块
      var blockBar = [35, 35, 35, 35, 13]; //深色背景块
      var balckLineBar = [35, 35, 35, 35, 35]; //背景分割线
      var rich = {
        //富文本
        white: {
          color: "rgba(255,255,255,0.5)",
          fontSize: self.pxToRem(16),
        },
      };
      var option = {
        backgroundColor: "transparent",
        grid: {
          left: "14%",
          right: "14%",
          top: 10,
          bottom: 10,
        },
        tooltip: {
          show: false, //关闭悬浮提示
          trigger: "item",
          textStyle: {
            fontSize: self.pxToRem(12),
          },
          formatter: "{b0}:{c0}",
        },
        xAxis: {
          max: 35,
          splitLine: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        legend: {
          show: false,
        },
        yAxis: [
          {
            type: "category",
            inverse: false,
            data: ydata,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              margin: 10,
              textStyle: {
                color: "rgba(255,255,255,0.8)",
                fontSize: self.pxToRem(14),
              },
            },
          },
        ],
        series: [
          {
            //内
            type: "bar",
            barWidth: 20,
            label: {
              show: false,
            },
            legendHoverLink: false,
            silent: true,
            itemStyle: {
              color: "#08FFEB",
              // color: {
              //     type: 'linear',
              //     x: 0,
              //     y: 0,
              //     x2: 1,
              //     y2: 0,
              //     colorStops: [{
              //         offset: 0,
              //         color: '#3279e2' // 0% 处的颜色
              //     }, {
              //         offset: 1,
              //         color: '#45b9e7' // 100% 处的颜色
              //     }],
              //     globalCoord: false // 缺省为 false
              // } //底色
            },
            data: onlineArr,
            z: 100,
          },
          {
            //外
            type: "bar",
            barWidth: 20,
            barGap: "-100%",
            label: {
              normal: {
                show: true,
                position: "right",
                textStyle: {
                  color: "rgba(255,255,255,0.5)",
                  fontSize: self.pxToRem(14),
                },
                formatter: function (data) {
                  return (
                    initialLlineArr[data.dataIndex] +
                    "/" +
                    Number(initialBlockBar[data.dataIndex])
                  );
                },
                rich: rich,
              },
            },
            legendHoverLink: false,
            silent: true,
            data: balckLineBar,
            itemStyle: {
              color: "#023773",
            },
            z: 98,
          },
          {
            //分隔
            type: "pictorialBar",
            animationDuration: 0,
            itemStyle: {
              color: "rgba(0,0,0,0.7)",
            },
            label: {
              show: false,
            },
            symbol: "rect",
            symbolClip: true,
            symbolSize: [1, 20],
            symbolPosition: "start",
            symbolOffset: [0, 0],
            data: balckLineBar,
            z: 101,
            symbolRepeat: 36, // 设置每个数据项生成的象形柱的数量
          },
        ],
      };
      this.chart = this.$echarts.init(this.$refs.charts);
      this.chart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.b-container {
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
