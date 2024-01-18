<template>
    <el-card class="c-container">
        <div slot="header" class="flex align-center justify-between">
            <div class="name">
                {{chartName}}
            </div>
            <div>
                数据类型    &nbsp;&nbsp;&nbsp;
                <el-select v-model="dataType" @change="dataTypeChaneg">
                    <el-option v-for="item in dataTypeOption" :label="item.label" :value="item.value" :key="item.value"></el-option>
                </el-select>
            </div>
        </div>
        <div>
            <default-charts v-if="ecahrtOption" height="350px" :setOption="ecahrtOption"></default-charts>
        </div>
    </el-card>
</template>

<script>
import * as echarts from 'echarts';
require('echarts/theme/macarons') // echarts theme
import DefaultCharts from '../../../../../components/Echarts/DefaultCharts'
export default {
    name: 'chart',
    components:{
        DefaultCharts
    },
    props:{
        chartName:{
            type:String,
            default(){
                return '区域1能源介质1'
            }
        },
        options:{
            type:Object,
            default() {
                return {};
            }
        }
    },
    data(){
        return{
            dataType:'',
            dataTypeOption:[
                {
                    label:'实时产能',
                    value:'1'
                },
                {
                    label:'实时负荷',
                    value:'2'
                }
            ],
            ecahrtOption:null
        }
    },
    watch:{
        'options':{
            handler (newVal) {
                this.arrangeOption()
            },
            deep: true,
            immediate: true,
        }
    },
    mounted() {

    },
    methods:{
        dataTypeChaneg(e){
            this.$emit('dataTypeChaneg',e)
        },
        arrangeOption(){
            this.ecahrtOption = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: this.options.xData
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [

                        {
                            type: 'line',
                            stack: 'Total',
                            smooth: true,
                            lineStyle: {
                                width: 3
                            },
                            showSymbol: true,
                            areaStyle: {
                                opacity: 1,
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: 'rgba(84,169,254,0.3)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(84,169,254,0)'
                                    }
                                ])
                            },
                            emphasis: {
                                focus: 'series'
                            },
                            data: this.options.seriesData
                        },
                    ]
                };
        }
    }
}
</script>

<style lang="scss" scoped >
.c-container{
    width: 100%;
    height: 100%;
    .name{
        font-size: 32px;
        font-weight: 500;
    }
}
</style>
