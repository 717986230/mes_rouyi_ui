<template>
    <!-- 区域能源运行监控 -->
    <div class="app-container">
        <el-form class="w-100" :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="100px">
            <el-form-item>
                <el-form-item label="区域">
                    <el-select v-model="queryParams.area">
                        <el-option v-for="item in areaOption" :value="item.value" :label="item.lang"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" plain icon="el-icon-search" @click="handleSwitch">切换</el-button>
                    <el-button plain icon="el-icon-refresh" @click="handleReset">重置</el-button>
                </el-form-item>
            </el-form-item>
        </el-form>
        <el-tabs type="border-card" v-model="activeTab">
            <el-tab-pane label="能耗" name="1" >
                <div>
                    <consume :canvasConfig="canvasConfig" :animationConfig="animationConfig"></consume>
                </div>
            </el-tab-pane>
            <el-tab-pane label="设备" name="2">
                <div>
                    <device ></device>
                </div>
            </el-tab-pane>
        </el-tabs>
        <chart v-if="options" :chartName="chartName" class="chart" :options="options" @dataTypeChaneg="dataTypeChaneg"></chart>
        <el-row gutter="10">
            <el-col :span="6" v-for="item in  cardListType " :key="item.id">
                <tb-card @handleCard="handleCard" :itemLS="item"/>
            </el-col>
        </el-row>
    </div>
</template>

<script>

import consume from './common/consume'
import Device from './common/device'
import chart from './common/chart'
import Chart from './common/chart'
import TbCard from '@/views/energy/common/TbCard.vue'
export default {
    name: 'operationMonitoring',
    components:{
        Chart,
        Device,
        consume,
        TbCard
    },
    data(){
        return{
            queryParams:{
                area:''
            },
            activeTab: '1',
            areaOption:[],
            canvasConfig:{
                //宽
                width:1397,
                //高
                height:1080,
                //中心点
                center:{
                    x:698.5,
                    y:540
                },
                //渐变背景三角
                triangleConfig:[
                    {
                        name:"左侧渐变",//名称
                        radius:500,//半径
                        colors:['rgba(11,85,226,1.000)','rgba(11,85,226,0)'],//渐变色值
                        startAngle:215 * Math.PI / 180,//起始角度
                        endAngle:145 * Math.PI / 180,//起始角度
                        endX:270,//渐变终点X
                        endY:540,//渐变终点Y
                    },
                    {
                        name:"右侧渐变",//名称
                        radius:500,//半径
                        colors:['rgba(10,190,31,1.000)','rgba(10,190,31,0)'],//渐变色值
                        startAngle:35 * Math.PI / 180,//起始角度
                        endAngle:-35 * Math.PI / 180,//起始角度
                        endX:1140,//渐变终点X
                        endY:540,//渐变终点Y
                    }
                ],
                //圆圈
                arcConfig:[
                    {
                        name:'最外层圈',
                        radius:341,//半径
                        borderColor:'#5099F8',//边框颜色
                        borderWeight:1,//边框宽度
                        bgColor:'#EAF3FE',//背景颜色
                    },
                    {
                        name:'中间层圈',
                        radius:253,//半径
                        borderColor:'#5099F8',//边框颜色
                        borderWeight:1,//边框宽度
                        bgColor:'rgba(80,153,248,0.12)',//背景颜色
                    },
                    {
                        name:'最里层圈',
                        radius:209,//半径
                        borderColor:'#5099F8',//边框颜色
                        borderWeight:1,//边框宽度
                        bgColor:'rgba(80,153,248,0.12)',//背景颜色
                    }
                ],
                //静态图
                staticImg:[
                    {
                        name:'主图',
                        src:require("@/assets/images/energy/mainImg.png"),//主图
                        width: 334,
                        height:248,
                        isCenter:true,
                        x:0,
                        y:0
                    },
                ],
                //管网
                pipeConfig:{
                    btnImg:require("@/assets/images/energy/btn.png"),
                    name:'上下按钮模块',
                    radius:450,//半径
                    borderColor:'red',//边框颜色
                    borderWeight:1,//边框宽度
                    bgColor:'transparent',//背景颜色
                    topBtnList:[
                        {
                            name:'管线1',
                            in:true,
                            out:true,
                            inDesc:'能量介质1进能量介质1进',
                            inValue:'1325t/h',
                            outDesc:'能量介质2出',
                            outValue:'1005t/h',
                        },
                        {
                            name:'管线2',
                            in:true,
                            out:false,
                            inDesc:'能量介质1进',
                            inValue:'256/h',
                        },
                        {
                            name:'管线3',
                            in:false,
                            out:true,
                            desc:'能量介质1进',
                            value:'1325t/h',
                            outDesc:'能量介质2出',
                            outValue:'956/h',
                        }
                    ],
                    btoBtnList:[
                        {
                            name:'管线4',
                            in:true,
                            out:true,
                            inDesc:'能量介质4进',
                            inValue:'1325t/h',
                            outDesc:'能量介质4出',
                            outValue:'1005t/h',
                        },
                        {
                            name:'管线5',
                            in:true,
                            out:false,
                            inDesc:'能量介质5进',
                            inValue:'256/h',
                            outDesc:'能量介质4出',
                            outValue:'1005t/h',
                        },
                        {
                            name:'管线6',
                            in:false,
                            out:true,
                            inDesc:'',
                            inValue:'',
                            outDesc:'能量介质6出',
                            outValue:'123/h',
                        },
                        {
                            name:'管线八',
                            in:false,
                            out:true,
                            inDesc:'',
                            inValue:'',
                            outDesc:'能量介质8出',
                            outValue:'96/h',
                        }
                    ],
                },
                //左右介质数据
                mediumConfig:{
                    btnImg1:require("@/assets/images/energy/blueBtn.png"),
                    btnImg2:require("@/assets/images/energy/greenBtn.png"),
                    arrow1:require("@/assets/images/energy/blueArrow.png"),
                    arrow2:require("@/assets/images/energy/greenArrow.png"),
                    name:'左右按钮模块',
                    radius:450,//半径
                    borderColor:'blue',//边框颜色
                    borderWeight:1,//边框宽度
                    bgColor:'transparent',//背景颜色
                    leftBtnList:[
                        {
                            name:'能量介质1进',
                            in:true,
                            out:true,
                            Desc:'能量介质1进能量介质1进',
                            Value:'1325t/h',
                        },
                        {
                            name:'能量介质2进',
                            in:true,
                            out:false,
                            Desc:'能量介质1进',
                            Value:'256/h',
                        },
                        {
                            name:'能量介质3进',
                            in:false,
                            out:true,
                            Desc:'能量介质1进',
                            Value:'1325t/h',
                        },
                        {
                            name:'能量介质4进',
                            in:false,
                            out:true,
                            Desc:'能量介质1进',
                            Value:'1325t/h',
                        },
                        {
                            name:'能量介质5进',
                            in:false,
                            out:true,
                            Desc:'能量介质5进',
                            Value:'1325t/h',
                        }
                    ],
                    rightBtnList:[
                        {
                            name:'能量介质004出',
                            in:true,
                            out:true,
                            Desc:'能量介质4进',
                            Value:'1325t/h',
                        },
                        {
                            name:'能量介质003出',
                            in:true,
                            out:false,
                            Desc:'能量介质5进',
                            Value:'256/h',
                        },
                        {
                            name:'能量介质002出',
                            in:false,
                            out:true,
                            Desc:'能量介质5进',
                            Value:'256/h',
                        },
                        {
                            name:'能量介质001出',
                            in:false,
                            out:true,
                            Desc:'能量介质5进',
                            Value:'256/h',
                        },
                        {
                            name:'能量介质000出',
                            in:false,
                            out:true,
                            Desc:'能量介质5进',
                            Value:'256/h',
                        },
                        {
                            name:'能量介质007出',
                            in:false,
                            out:true,
                            Desc:'能量介质5进',
                            Value:'256/h',
                        }
                    ],
                }
            },
            //动画canvas配置
            animationConfig:{
                leftPoints:[],
                rightPoints:[],
                //宽
                width:1397,
                //高
                height:1080,
                //中心点
                center:{
                    x:698.5,
                    y:540
                },
                lastPoints1:[],
                lastPoints2:[],
                moveNowCount:0,//当前移动下标
            },
            cardListType: [
                {
                    card1: "工厂1能源介质1界区1",
                    iscol: 1,
                    id: 1,
                    child: [
                        {
                            label: "实时负荷",
                            value: "7438t/h"
                        },
                        {
                            label: "实时产出",
                            value: "7438t/h"
                        }
                        , {
                            label: "昨日累积消耗量",
                            value: "12567t"
                        },
                        {
                            label: "昨日累积产出量",
                            value: "12573t"
                        }
                    ]
                },
                {
                    id: 2,

                    card1: "工厂2能源介质2界区2",
                    child: [
                        {
                            label: "实时负荷",
                            value: "7438t/h"
                        },
                        {
                            label: "实时产出",
                            value: "7438t/h"
                        }
                        , {
                            label: "昨日累积消耗量",
                            value: "12567t"
                        },
                        {
                            label: "昨日累积产出量",
                            value: "12573t"
                        }
                    ]
                }, {
                    id: 3,

                    card1: "工厂3能源介质3界区13",
                    child: [
                        {
                            label: "实时负荷",
                            value: "7438t/h"
                        },
                        {
                            label: "实时产出",
                            value: "7438t/h"
                        }
                        , {
                            label: "昨日累积消耗量",
                            value: "12567t"
                        },
                        {
                            label: "昨日累积产出量",
                            value: "12573t"
                        }
                    ]
                }, {
                    id: 4,

                    card1: "工厂4能源介质4界区4",
                    child: [
                        {
                            label: "实时负荷",
                            value: "7438t/h"
                        },
                        {
                            label: "实时产出",
                            value: "7438t/h"
                        }
                        , {
                            label: "昨日累积消耗量",
                            value: "12567t"
                        },
                        {
                            label: "昨日累积产出量",
                            value: "12573t"
                        }
                    ]
                },
                {
                    id: 5,

                    card1: "工厂1能源介质1界区1",
                    child: [
                        {
                            label: "实时负荷",
                            value: "7438t/h"
                        },
                        {
                            label: "实时产出",
                            value: "7438t/h"
                        }
                        , {
                            label: "昨日累积消耗量",
                            value: "12567t"
                        },
                        {
                            label: "昨日累积产出量",
                            value: "12573t"
                        }
                    ]
                },
                {
                    id: 6,
                    card1: "工厂1能源介质1界区1",
                    child: [
                        {
                            label: "实时负荷",
                            value: "7438t/h"
                        },
                        {
                            label: "实时产出",
                            value: "7438t/h"
                        }
                        , {
                            label: "昨日累积消耗量",
                            value: "12567t"
                        },
                        {
                            label: "昨日累积产出量",
                            value: "12573t"
                        }
                    ]
                },
            ],
            //实时产能
            capacity:{
                xData:['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00'],
                seriesData:[4600, 10569, 14986, 13888, 16745, 15633, 18950]
            },
            //实时负荷
            load:{
                xData:['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00'],
                seriesData:[4600, 10569, 14986, 13888, 16745, 15633, 18950, 14986, 13888, 16745,'19562']
            },
            //chart 传参
            options:{
                xData:['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00'],
                seriesData:[4600, 10569, 14986, 13888, 16745, 15633, 18950]
            },
            //图标名称
            chartName:'工厂1能源介质1界区1'
        }
    },
    created() {
      this.getOtherData();
    },
    mounted() {
    },
    methods:{
        getOtherData(){
           this.areaOption = [
               {
                   label: '区域1',
                   value:1,
               },
               {
                   label: '区域2',
                   value:2,
               },
               {
                   label: '区域3',
                   value:3,
               }
           ]
        },
        /*切换按钮操作*/
        handleSwitch(){
            //查询数据 todo
        },
        /*重置*/
        handleReset(){
            this.queryParams.area = ''
        },
        /*卡片点击回调*/
        handleCard(item){
            this.chartName = item.card1
        },
        /*数据类型发生变化*/
        dataTypeChaneg(e){
            if(e == '1'){
                this.options = this.capacity

            }else{
                this.options = this.load
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.app-container {
    width: 100%;
    height: calc(100vh - 90px);
    min-height: calc(100vh - 90px);
    overflow-y: auto;
    ::v-deep .el-form-item--small .el-form-item{
        margin-bottom: 0;
    }
    .chart{
        width: 100%;
        height: 400px;
        margin-top: 20px;
    }
}

</style>
