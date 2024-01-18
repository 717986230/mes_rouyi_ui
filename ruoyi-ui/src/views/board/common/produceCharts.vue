<template>
  <div class="p-charts-container">
    <div ref="charts" class="charts"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import {debounce} from "@/utils";
var self;
require('echarts/theme/macarons') // echarts theme
export default {
  name: "produceCharts",
  props:['total','hourOutput','colorArr','name'],
  data(){
    return{
      chart:null,
      thisTotal:'',
      thisHourOutput:'',
      thisColorArr:'',
      thisName:'',
    }
  },
  watch:{
    'total':{
      handler (newVal) {
        this.thisTotal = newVal;
        this.thisHourOutput = this.hourOutput;
        this.thisColorArr = this.colorArr;
        this.thisName = this.name;
        if (this.chart) {
          this.initChart()
        }
      },
      deep: true,
      immediate: true,
    }
  },
  mounted() {
    self = this;
    this.initChart()
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    // this.runram()

    window.addEventListener('resize', this.__resizeHandler)



  },
  methods:{
    initChart(){
      let thisTotal = this.thisTotal = this.total;
      let thisHourOutput = this.thisHourOutput = this.hourOutput;
      let thisColorArr = this.thisColorArr = this.colorArr;
      let thisName = this.thisName = this.name;

      let option = {
        grid: {
          left: '14%',
          right: '14%',
          top: 10,
          bottom: 10,
        },
        series: [
          {
            name: '指针+ 指针背景盘 + 底部名称',
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 240,
            splitNumber: 240,
            radius: "90%",
            center:['38%','60%'],
            itemStyle: {
              color: 'red',
              shadowColor: 'rgba(0,138,255,0.45)',
              shadowBlur: 10,
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            progress: {  //当前进度
              show: true,
              width: 50,
              itemStyle: {
                color: 'rgba(0,0,0,0)' //透明颜色
              }
            },
            pointer: { //仪表盘指针。
              icon: 'path://m0,25.5l6.99997,-25.49999l6.99997,25.49999l-6.99997,25.49999l-6.99997,-25.49999z',
              length: 10,
              width: 4,
              offsetCenter: [0, '-75%'],
              itemStyle: {
                color: thisColorArr[0]
              }
            },
            axisLine: { //仪表盘轴线相关配置。
              roundCap: false,
              lineStyle: {
                width: 20,
                color: [
                  [0, new echarts.graphic.LinearGradient(
                    // 右下左上，渐变色从正下方开始，下面的以此类推
                    1, 0, 0, 0,
                    [
                      {offset: 0, color: thisColorArr[1]},
                      {offset: 1, color:thisColorArr[0]}
                    ]
                  )],
                  [1, new echarts.graphic.LinearGradient(
                    0, 0, 1, 0,
                    [
                      {offset: 0, color: thisColorArr[0]},
                      {offset: 1, color: 'rgba(4, 98, 194, 0)'}
                    ]
                  )]
                ]
              }
            },
            axisTick: {//刻度样式。
              show: false,
              length: 4,
              distance: -90,
              splitNumber: 4,
              lineStyle: {
                width: 4,
                color: thisColorArr[0]
              }
            },
            splitLine: {//分隔线样式。
              show: false,
              length: 12,
              distance: -50,
              lineStyle: {
                width: 3,
                color: '#999'
              }
            },
            axisLabel: {//刻度标签
              // show:false,
              distance: 29,
              color: '#DFEEF3',
              fontSize: self.pxToRem(10),
              rotate: 'tangential',
              formatter: function (v) {
                if (v == thisHourOutput) {
                  // alert(v)
                  return v + '台/h'
                }
              }
            },
            title: {
              show: false
            },
            detail: {
              offsetCenter: [0, '20%'],
              valueAnimation: true,
              formatter: function (value) {
                return '{value|' + thisName + '}';
              },
              rich: {
                value: {
                  fontSize: self.pxToRem(10),
                  fontWeight: 'bolder',
                  color: '#ffffff'
                },
                unit: {
                  fontSize: self.pxToRem(20),
                  color: '#999',
                  padding: [0, 0, -20, 10]
                }
              }
            },
            data: [
              {
                value: thisHourOutput
              }
            ]
          },
          {
            name: '外部刻度样式',
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 240,
            radius: "90%",
            center:['38%','60%'],
            splitNumber: 12,
            itemStyle: {
              color: '#58D9F9',
              shadowColor: 'rgba(0,138,255,0.45)',
              shadowBlur: 10,
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            axisLine: { //仪表盘轴线相关配置。
              show: false,
            },
            axisTick: {//刻度样式。
              show: true,
              length: 2,
              distance: -14,
              splitNumber: 4,
              lineStyle: {
                width: 2,
                color: thisColorArr[0]
              }
            },
            splitLine: {//分隔线样式。
              show: false,
            },
            axisLabel: {//刻度标签
              show: false,
            },
            title: {
              show: false
            },
            detail: {
              show: false,
            }
          },
          {
            name: '中部 总数盘',
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            radius: "58%",
            center:['38%','60%'],
            splitNumber: 12,
            min: 0,
            max: 120,
            pointer: {
              show: false
            },
            axisLine: { //仪表盘轴线相关配置。
              roundCap: false,
              lineStyle: {
                width: 100,
                color: [
                  [0, new echarts.graphic.LinearGradient(
                    // 右下左上，渐变色从正下方开始，下面的以此类推
                    1, 0, 1, 1,
                    [
                      {offset: 0, color: thisColorArr[0]},
                      {offset: 1, color: thisColorArr[0]}
                    ]
                  )],
                  [1, new echarts.graphic.LinearGradient(
                    2, 1, 2, 0,
                    [
                      {offset: 0, color: thisColorArr[0]},
                      {offset: 1, color: 'rgba(4, 98, 194, 0.2)'}
                    ]
                  )]]
              },
            },
            axisTick: {//刻度样式。
              show: false,
            },
            splitLine: {//分隔线样式。
              show: false,
              lineStyle: {
                color: 'red'
              }
            },
            axisLabel: {//刻度标签
              show: false,
            },
            title: {
              show: false
            },
            detail: {
              offsetCenter: [0, '-40%'],
              valueAnimation: true,
              formatter: function (value) {
                return '{value|' + value + '}';
              },
              rich: {
                value: {
                  fontSize: self.pxToRem(14),
                  fontWeight: 'bolder',
                  color: '#ffffff'
                },
                unit: {
                  fontSize: self.pxToRem(20),
                  color: '#999',
                  padding: [0, 0, -20, 10]
                }
              }
            },
            data: [
              {
                value: thisTotal
              }
            ]
          },
          {
            name: "底部左侧条",
            type: "gauge",
            clockwise: true,
            min: 0,
            max: 240,
            radius: "100%",
            center: ["50%", "70%"],
            // 仪表盘半径
            startAngle: 180,
            endAngle: 180,

            axisLabel: {
              // 大刻度标签。
              show: false,
            },
            splitLine: {
              show: false,

            },
            axisLine: {
              // 仪表盘轴线(轮廓线)相关配置。
              show: true,
              lineStyle: {
                // 仪表盘轴线样式。
                opacity: 1,
                width: 50,
                // 表盘宽度
                shadowBlur: 10,
                color: [// 仪表盘轴线颜色
                  [1, 'rgba(0,0,0,0)'
                  ]
                ]
              },
            },
            axisTick: {
              // 小刻度相关
              // 小刻度个数
              show: false
            },
            detail: {
              show: false,
              // 仪表盘详情数据相关

            },
            itemStyle: {

              show: false,
              // 指针样式

            },
            pointer: {
              // 仪表盘指针。
              show: true,
              icon: 'rect',
              offsetCenter: [0, '-110%'],
              length: 20,
              width: 4,
              itemStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: thisColorArr[1]// 0% 处的颜色
                  }, {
                    offset: 1, color: thisColorArr[0] // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
                }
              },

            },
            data: [
              {
                value: 0
              }
            ]
          },
          {
            name: "底部右侧条",
            type: "gauge",
            clockwise: true,
            min: 0,
            max: 240,
            radius: "100%",
            center: ["50%", "70%"],
            // 仪表盘半径
            startAngle: 0,
            axisLabel: {
              // 大刻度标签。
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLine: {
              // 仪表盘轴线(轮廓线)相关配置。
              show: true,
              lineStyle: {
                // 仪表盘轴线样式。
                opacity: 1,
                width: 80,
                // 表盘宽度
                shadowBlur: 10,
                color: [// 仪表盘轴线颜色
                  [1, 'rgba(0,0,0,0)'
                  ]
                ]
              },
            },
            axisTick: {
              // 小刻度相关
              // 小刻度个数
              show: false
            },
            detail: {
              show: false,
              // 仪表盘详情数据相关

            },
            itemStyle: {

              show: false,
              // 指针样式

            },
            pointer: {
              // 仪表盘指针。
              show: true,
              icon: 'rect',
              offsetCenter: [0, '-34%'],
              length: 20,
              width: 4,
              itemStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: thisColorArr[1] // 0% 处的颜色
                  }, {
                    offset: 1, color:  thisColorArr[0] // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
                }
              },

            },
            data: [
              {
                value: 0
              }
            ]
          },
        ]
      };

      this.chart = this.$echarts.init(this.$refs.charts)
      this.chart.setOption(option)
      // 设置图表大小为 '100% x 100%'
      // myChart.resize({
      //   width: '200%',
      //   height: '100%'
      // });
    }
  },
}
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
    width: 130%;
    height: 130%;
  }

}
</style>
