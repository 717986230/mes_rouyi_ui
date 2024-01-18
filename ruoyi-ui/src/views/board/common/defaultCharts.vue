<template>
  <div class="charts-container">
    <div ref="charts" class="charts"></div>
  </div>

</template>
<script>
import {debounce} from '@/utils'

export default {
  name: 'lineCharts',
  props: ['stylecolor', 'options', 'type'],
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
  },
  destroyed() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },
  watch: {
    options(newVla, oldVla) {
      this.initChart()
    }
  },
  methods: {
    initChart() {
      this.chart = this.$echarts.init(this.$refs.charts)
      const cols = ['#3BDBDB', '#6CEBEB', '#C2FFFF', '#FFFFFF']
      let xData = []
      for (let i = 10; i <= 18; i++) {
        xData.push(i)
      }
      const option = {
        grid: {
          top: '4%',
          left: '2%',
          right: '2%',
          bottom: '2%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3)',
          textStyle: {
            color: '#000'
          },
          axisPointer: {
            type: 'shadow'
          }
        },

        xAxis: [
          {
            type: 'category',
            axisLabel: {
              show: true,
              textStyle: {
                color: 'rgba(255, 255, 255,.8)'
                //fontSize: 18
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#00D2FF'
              }
            },
            axisTick: {
              show: false,
              alignWithLabel: true
            },
            splitLine: {
              show: false
            },
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
          }
        ],
        yAxis: [
          {
            name: '',
            type: 'value',
            min: 0,
            axisLabel: {
              show: false,
              textStyle: {
                color: 'rgba(255, 255, 255,.8)'
                //fontSize: 18
              }
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#8c8c8c'
              }
            },
            axisTick: {
              show: false,
              alignWithLabel: true
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: '#888888'
              }
            }
          }
        ],
        series: [
          {
            name: this.type,
            type: 'line',
            symbolSize: 1,
            symbol: 'circle',
            smooth: true,
            yAxisIndex: 0,
            showSymbol: false,
            lineStyle: {
              width: 2,
              color: this.stylecolor
            },
            itemStyle: {
              normal: {
                color: cols[1],
                areaStyle: {
                  color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0.4,
                      color: 'rgba(194, 255, 255,0.1)'
                    },
                    {
                      offset: 1,
                      color: this.stylecolor
                    }
                  ])
                }
              }
            },
            data: this.options
          }
        ]
      }
      this.chart.setOption(option)
    }
  }
}
</script>

<style scoped lang="scss">
.charts-container {
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
