<template>
  <div class="c-container">
    <div ref="charts" class="charts"></div>
  </div>
</template>
<script>
import { debounce } from "@/utils";
var self;
export default {
  name: "BarView",
  props: ["datalist"],
  data() {
    return {
      chart: null,
      thisDataList: [],
    };
  },
  watch: {
    datalist: {
      handler(newVal) {
        this.thisDataList = newVal;
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
    this.thisDataList = this.datalist;
    setTimeout(() => {
      this.initChart();
    }, 100);
    this.initChart();
      this.__resizeHandler = _.debounce(function () {
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
      let data = this.thisDataList;
      let picDataOpacity = _.cloneDeep(data);
      picDataOpacity.forEach((item) => {
        item.itemStyle.opacity = 0;
      });
      let picDataTransparent = _.cloneDeep(data);
      picDataTransparent.forEach((item) => {
        item.itemStyle.color = "transparent";
      });
      let color1 = data[0].itemStyle.color;
      let color2 = data[1].itemStyle.color;
      let color3 = data[2].itemStyle.color;
      // 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
      function getParametricEquation(
        startRatio,
        endRatio,
        isSelected,
        isHovered,
        k,
        h
      ) {
        // 计算
        let midRatio = (startRatio + endRatio) / 2;

        let startRadian = startRatio * Math.PI * 2;
        let endRadian = endRatio * Math.PI * 2;
        let midRadian = midRatio * Math.PI * 2;

        // 如果只有一个扇形，则不实现选中效果。
        if (startRatio === 0 && endRatio === 1) {
          isSelected = false;
        }

        // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
        k = typeof k !== "undefined" ? k : 1 / 3;

        // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
        let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
        let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;

        // 计算高亮效果的放大比例（未高亮，则比例为 1）
        let hoverRate = isHovered ? 1.05 : 1;

        // 返回曲面参数方程
        return {
          u: {
            min: -Math.PI,
            max: Math.PI * 3,
            step: Math.PI / 32,
          },

          v: {
            min: 0,
            max: Math.PI * 2,
            step: Math.PI / 20,
          },

          x: function (u, v) {
            if (u < startRadian) {
              return (
                offsetX +
                Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
              );
            }
            if (u > endRadian) {
              return (
                offsetX +
                Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
              );
            }
            return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
          },

          y: function (u, v) {
            if (u < startRadian) {
              return (
                offsetY +
                Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
              );
            }
            if (u > endRadian) {
              return (
                offsetY +
                Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
              );
            }
            return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
          },

          z: function (u, v) {
            if (u < -Math.PI * 0.5) {
              return Math.sin(u);
            }
            if (u > Math.PI * 2.5) {
              return Math.sin(u) * h * 0.1;
            }
            return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
          },
        };
      }

      // 生成模拟 3D 饼图的配置项
      function getPie3D(pieData, internalDiameterRatio) {
        let series = [];
        let sumValue = 0;
        let startValue = 0;
        let endValue = 0;
        let legendData = [];
        let k =
          typeof internalDiameterRatio !== "undefined"
            ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
            : 1 / 3;

        // 为每一个饼图数据，生成一个 series-surface 配置
        for (let i = 0; i < pieData.length; i++) {
          sumValue += pieData[i].value;

          let seriesItem = {
            name:
              typeof pieData[i].name === "undefined"
                ? `series${i}`
                : pieData[i].name,
            type: "surface",
            parametric: true,
            wireframe: {
              show: false,
            },
            pieData: pieData[i],
            pieStatus: {
              selected: false,
              hovered: false,
              k: k,
            },
          };

          if (typeof pieData[i].itemStyle != "undefined") {
            let itemStyle = {};

            typeof pieData[i].itemStyle.color != "undefined"
              ? (itemStyle.color = pieData[i].itemStyle.color)
              : null;
            typeof pieData[i].itemStyle.opacity != "undefined"
              ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
              : null;

            seriesItem.itemStyle = itemStyle;
          }
          series.push(seriesItem);
        }

        // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
        // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
        for (let i = 0; i < series.length; i++) {
          endValue = startValue + series[i].pieData.value;

          series[i].pieData.startRatio = startValue / sumValue;
          series[i].pieData.endRatio = endValue / sumValue;
          series[i].parametricEquation = getParametricEquation(
            series[i].pieData.startRatio,
            series[i].pieData.endRatio,
            false,
            false,
            k,
            series[i].pieData.value
          );

          startValue = endValue;

          legendData.push(series[i].name);
        }

        // 准备待返回的配置项，把准备好的 legendData、series 传入。
        let option = {
          //animation: false,
          legend: {
            selectedMode: false, // 关闭图例的选择模式
            orient: "vertical",
            icon: "circle",
            right: 0,
            top: "middle",
            itemGap: 10, //图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
            itemWidth: 8, //图例标记的图形宽度。
            data: legendData,
            textStyle: {
              color: "#fff",
              fontSize: self.pxToRem(10),
            },
          },
          tooltip: {
            formatter: (params) => {
              if (params.seriesName !== "mouseoutSeries") {
                // return `${params.seriesName}<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>${option.series[params.seriesIndex].pieData.value}`;
                return "";
              }
            },
          },
          xAxis3D: {
            min: -1,
            max: 1,
          },
          yAxis3D: {
            min: -1,
            max: 1,
          },
          zAxis3D: {
            min: -1,
            max: "dataMax",
          },
          grid3D: {
            show: false,
            boxHeight: 20,
            // viewControl: {//3d效果可以放大、旋转等，请自己去查看官方配置
            //     alpha: 40,
            //     // beta: 40,
            //     rotateSensitivity: 0,
            //     zoomSensitivity: 0,
            //     panSensitivity: 0,
            //     autoRotate: false
            // },

            viewControl: {
              distance: 275,
              autoRotate: false, //是否开启视角绕物体的自动旋转查看。
              // alpha: 25,
              // beta: 270,
              rotateSensitivity: 0,
              zoomSensitivity: 0,
              panSensitivity: 0,
              autoRotateSpeed: 5,
              animation: false,
              animationDurationUpdate: 5000,
              projection: "orthographic",
              orthographicSize: 150,
            },
            //后处理特效可以为画面添加高光、景深、环境光遮蔽（SSAO）、调色等效果。可以让整个画面更富有质感。
            postEffect: {
              //配置这项会出现锯齿，请自己去查看官方配置有办法解决
              enable: true,
              bloom: {
                enable: true,
                bloomIntensity: 0.1,
              },
              SSAO: {
                enable: true,
                quality: "medium",
                radius: 2,
              },
            },
            left: 10,
            top: 16,
            width: 200,
          },
          series: series,
        };
        return option;
      }

      // 传入数据生成 option
      let option = getPie3D(data, 0.6);
      option.series.push({
        name: "transparentPic",
        type: "pie",
        labelLine: {
          length: 20,
          length2: 4,
          normal: {
            show: true,
            lineStyle: {
              width: 1,
              color: "#fff",
            },
          },
        },
        label: {
          normal: {
            show: true,
            width: 40,
            position: "outside",
            formatter: function (params) {
              let name = params.data.value;
              return params.dataIndex == 0
                ? "{a|" + name + "}{adw|个}"
                : params.dataIndex == 1
                ? "{b|" + name + "}{bdw|个}"
                : "{c|" + name + "}{cdw|个}";
            },
            rich: {
              a: {
                color: color1,
                fontWeight: 600,
                fontSize: self.pxToRem(14),
              },
              b: {
                color: color2,
                fontWeight: 600,
                fontSize: self.pxToRem(14),
              },
              c: {
                color: color3,
                fontWeight: 600,
                fontSize: self.pxToRem(14),
              },
              adw: {
                color: color1,
                fontWeight: 400,
                fontSize: self.pxToRem(10),
              },
              bdw: {
                color: color2,
                fontWeight: 400,
                fontSize: self.pxToRem(10),
              },
              cdw: {
                color: color3,
                fontWeight: 400,
                fontSize: self.pxToRem(10),
              },
            },
          },
        },
        startAngle: -25, //起始角度，支持范围[0, 360]。
        clockwise: false, //饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
        radius: ["70%", "35%"],
        center: ["38%", "59%"], //指示线的位置
        data: picDataTransparent,
      });
      option.series.push({
        name: "opacityPic",
        type: "pie",
        labelLine: {
          length: 20,
          length2: 4,
          normal: {
            show: true,
            lineStyle: {
              width: 1,
            },
          },
        },
        label: {
          normal: {
            show: true,
            position: "outside",
            formatter: "",
          },
        },
        startAngle: -25, //起始角度，支持范围[0, 360]。
        clockwise: false, //饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
        radius: ["70%", "35%"],
        center: ["38%", "59%"], //指示线的位置
        data: picDataOpacity,
      });
      this.chart = this.$echarts.init(this.$refs.charts);
      this.chart.setOption(option);
    },
  },
};
</script>

<style scoped lang="scss">
.c-container {
  width: 302px;
  height: 134px;
  position: relative;
  .charts {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .numlist {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;

    .box {
      position: absolute;
      font-family: Source Han Sans CN sans-serif;
      font-weight: 400;

      .n {
        font-size: 18px;
      }

      .d {
        font-size: 12px;
      }
    }

    .num1 {
      top: 20%;
      left: 0;
      color: #1591f1;
    }

    .num2 {
      top: 20%;
      left: 50%;
      color: #71faf4;
    }

    .num3 {
      bottom: 0;
      left: 50%;
      color: #f9d428;
    }

    .img1 {
      position: absolute;
      top: 35%;
      left: 10%;
      width: 23px;
      height: 13px;
    }

    .img2 {
      position: absolute;
      top: 35%;
      left: 40%;
      width: 27px;
      height: 13px;
    }

    .img3 {
      position: absolute;
      bottom: 10%;
      left: 40%;
      width: 38px;
      height: 14px;
    }
  }
}
</style>
