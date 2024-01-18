<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts';
require('echarts/theme/macarons') // echarts theme

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    setOption:{
      type: Object,
      default: {}
    },
  },
    watch:{
        'setOption':{
            handler (newVal) {
                if (this.chart) {
                    this.initChart()
                }
            },
            deep: true,
            immediate: true,
        }
    },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
      this.initChart()
    this.__resizeHandler = _.debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption(this.setOption)
    }
  }
}
</script>
