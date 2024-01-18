<template>
    <!-- 区域能效总览 -->
    <div class="app-container">
        <el-row>
            <el-col :span="24">
                <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="100px">
                    <el-form-item label="区域:" prop="nodeAreaId" style="margin-left: -50px;">
                        <el-select v-model="queryParams.unitTypeId" placeholder="区域" clearable>
                            <el-option v-for="dict in Factory" :key="dict.value" :label="dict.label" :value="dict.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="日期:" prop="dateRange" style="margin-left: -40px;">
                        <div class="block">
                            <el-date-picker v-model="queryParams.dateRange" type="datetimerange" range-separator="至"
                                            start-placeholder="开始日期" end-placeholder="结束日期">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" size="mini" @click="handleQuery">切换</el-button>
                        <el-button size="mini" type="success" plain @click="resetQuery">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <consume :canvasConfig="canvasConfig" :animationConfig="animationConfig"></consume>
        <el-row>
            <el-col :span="24">
                <el-card>
                    <div slot="header" class="flex align-center justify-between chartsOp">
                        <div class="name">
                            {{ echartsTitile }}
                        </div>
                        <div>
                            数据类型    &nbsp;&nbsp;&nbsp;
                            <el-select v-model="chartsOp">
                                <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="p-charts-container">
                        <div ref="charts" class="charts"></div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter=10>
            <el-col :span="8" v-for="item in  cardListType " :key="item.id">
                <TbCard @handleCard="handleCard" :itemLS="item"></TbCard>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import TbCard from "../../common/TbCard.vue";
import consume from '../../operationMonitoring/area/common/consume'
import { debounce } from "@/utils";
var self;
export default {
    name: "areaEnergyEfficiency",
    components: { TbCard,consume },
    data() {
        return {
            echartsTitile: "工厂1能源介质1界区1",
            cardTitile: "工厂1能源介质1",//顶部卡片标题
            gradientColor: '#FDDDDE',
            Factory: [],//工厂
            cardListType: [
                {
                    card1: "工厂1能源介质1界区1",
                    iscol: 1,
                    id: 1,
                    child: [
                        {
                            label: "能源总消耗量",
                            value: "7438t"
                        },
                        {
                            label: "能源总生产量",
                            value: "7438t"
                        }
                        , {
                            label: "能源综合单耗",
                            value: "125标煤"
                        },
                    ]
                },
                {
                    id: 2,

                    card1: "工厂2能源介质2界区2",
                    child: [
                        {
                            label: "能源总消耗量",
                            value: "7438t"
                        },
                        {
                            label: "能源总生产量",
                            value: "7438t"
                        }
                        , {
                            label: "能源综合单耗",
                            value: "125标煤"
                        },
                    ]
                }, {
                    id: 3,

                    card1: "工厂3能源介质3界区13",
                    child: [
                        {
                            label: "能源总消耗量",
                            value: "7438t"
                        },
                        {
                            label: "能源总生产量",
                            value: "7438t"
                        }
                        , {
                            label: "能源综合单耗",
                            value: "125标煤"
                        },
                    ]
                }, {
                    id: 4,

                    card1: "工厂4能源介质4界区4",
                    child: [
                        {
                            label: "能源总消耗量",
                            value: "7438t"
                        },
                        {
                            label: "能源总生产量",
                            value: "7438t"
                        }
                        , {
                            label: "能源综合单耗",
                            value: "125标煤"
                        },
                    ]
                },
                {
                    id: 5,

                    card1: "工厂1能源介质1界区1",
                    child: [
                        {
                            label: "能源总消耗量",
                            value: "7438t"
                        },
                        {
                            label: "能源总生产量",
                            value: "7438t"
                        }
                        , {
                            label: "能源综合单耗",
                            value: "125标煤"
                        },
                    ]
                },
                {
                    id: 6,
                    card1: "工厂1能源介质1界区1",
                    child: [
                        {
                            label: "能源总消耗量",
                            value: "7438t"
                        },
                        {
                            label: "能源总生产量",
                            value: "7438t"
                        }
                        , {
                            label: "能源综合单耗",
                            value: "125标煤"
                        },
                    ]
                },
            ],
            opt: [
                {
                    value: '1',
                    label: '昨日累积消耗量'
                },
                {
                    value: '2',
                    label: '昨日累积产出量'
                }
            ],
            chartsOp: "1",
            chart: null,
            zzType: [],
            cardList: [
                {
                    card1: "工厂1能源介质1",
                    // cardtime: new Date(),
                    color: "#BC5FFE",
                    img: require("@/assets/operatMonit/pw-left.png"),
                    child1: [
                        45682, 45682, 24591
                    ],
                    child: [
                        '能源总消耗量（单位：t）', '能源总生产量（单位：t）', '能源综合单耗（单位：标煤）'
                    ],
                },

            ],
            // 遮罩层
            loading: true,
            // 表单参数
            form: {},
            // 查询参数
            queryParams: {
                dateRange: [new Date().setDate(new Date().getDate() - 1),new Date() ],//时间
                "id": "",
                "isAsc": "",
                "nodeAreaId": "",
                "orderByColumn": "",
                "pageNum": 1,
                "pageSize": 10,
                "reasonable": true,
                "unitCode": "",
                "unitAlias": "",
                "unitName": "",
                "unitTypeId": ""
            },
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
        };
    },
    computed: {},
    watch: {
        chartsOp: {
            handler(newVal, oldVal) {
                this.initChart();
            },
            immediate: true
        },
    },
    created() {
        this.getList();
        this.getOther();
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
    destroyed() {
        if (!this.chart) {
            return;
        }
        window.removeEventListener("resize", this.__resizeHandler);
        this.chart.dispose();
        this.chart = null;
    },
    methods: {
        handleCard(item, index) {
            this.echartsTitile = `${item.card1}${this.chartsOp == "1" ? "昨日累积消耗量" : "昨日累积产出量"}` ;
            this.cardTitile = item.card1
            this.initChart()
        },
        initChart() {
            this.chart = this.$echarts.init(this.$refs.charts);
            let option = {
                grid: {
                    left: "1%",
                    right: "0",
                    bottom: "0",
                    containLabel: true,
                },
                tooltip: {
                    trigger: "axis",
                    show: false,
                },

                //   legend: {
                //     data: ["2011年"],
                //   },
                calculable: true,
                xAxis: [
                    {
                        type: "category",
                        data: [
                            "界区1",
                            "界区2",
                            "界区3",
                            "界区4",
                            "界区5",
                            "界区6",
                            "界区7",
                            "界区8",
                            "界区9",
                            "界区10",
                        ],
                        axisLine: {
                            show: true,
                        },
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                    },
                    {
                        type: "category",
                        data: [120, 200, 150, 80, 70, 110, 130, 70, 110, 130],
                        axisLine: {
                            show: false,
                        },
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                    },
                ],
                yAxis: [
                    {
                        type: "value",
                        boundaryGap: [0, 0],
                        show: true,
                        axisLine: {
                            show: true,
                        },
                        splitLine: {
                            show: true,
                        },
                        axisTick: {
                            show: true,
                        },
                    },
                ],
                series: [
                    {
                        name: "",
                        type: "bar",
                        z: 10,
                        tooltip: {
                            show: false,
                        },
                        barMaxWidth: "30%",
                        data: [120, 200, 150, 80, 70, 110, 130, 70, 110, 130],
                    },
                    {
                        type: "bar",
                        silent: true,
                        itemStyle: {
                            normal: {
                                color: "#ddd",
                            },
                        },
                        tooltip: {
                            show: false,
                        },
                        barGap: "-100%",
                        barMaxWidth: "30%",
                        data: [300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300],
                    },
                ],
            };

            let option1 = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#58AAFC'
                        }
                    }
                },

                grid: {
                    left: "1%",
                    right: "0",
                    bottom: "0",
                    containLabel: true,
                },
                xAxis: {
                    type: 'category',
                    data: ['界区1', '界区2', '界区3', '界区4', '界区5', '界区6', '界区7', '界区8', '界区9', '界区10']
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        data: [820, 932, 901, 934, 1290, 1330, 1320, 1290, 1330, 1320],
                        type: 'line',
                        smooth: true,
                    }
                ]
            };
            if (this.chartsOp == "1") {
                this.chart.dispose();
                this.chart = this.$echarts.init(this.$refs.charts);
                this.chart.setOption(option);
            } else {
                this.chart.dispose();
                this.chart = this.$echarts.init(this.$refs.charts);
                this.chart.setOption(option1);
            }
        },
        /** 查询用户列表 */
        getList() {
            this.loading = true;
            this.$api.i_unitList(this.queryParams).then(response => {
                    this.userList = response.rows.map(e => {
                        return {
                            ...e,
                            useFlag: String(e.useFlag)
                        }
                    })
                    this.total = response.total;
                    this.loading = false;
                }
            );
        },
        getOther() {
            //工厂
            this.$api.i_MESFactoryAllList().then(res => {
                this.Factory = res.data.map(e => {
                    return {
                        label: e.mesFctrName,
                        value: e.mesFctrId
                    }
                })
            })
        },
        // 取消按钮
        cancel() {
            this.open = false;
            this.reset();
        },
        // 表单重置
        reset() {
            this.form = {
                "id": undefined,
                "des": "",
                "capacity": 0,
                "unitNum": "",
                "useFlag": "1",
                "sectorId": "",
                "unitCode": "",
                "unitName": "",
                "unitAlias": "",
                "nodeAreaId": "",
                "unitTypeId": "",
                "upperUnitId": "",
                "displayOrder": "1000",
            };
            this.resetForm("form");
        },
        /** 搜索按钮操作 */
        handleQuery() {
            this.queryParams.pageNum = 1;
            this.getList();
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.isShow = false
            this.resetForm("queryForm");
            this.handleQuery();
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.id);
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        },
        /** 新增按钮操作 */
        handleAdd() {
            this.reset();
            this.open = true;
            this.title = "添加信息";
        },
        /** 修改按钮操作 */
        handleUpdate(row) {
            this.reset();
            const userId = row.id || this.ids[0];
            this.$api.i_unitById({ id: userId }).then(response => {
                this.form = response.data;
                this.form.useFlag = String(response.data.useFlag)
                this.open = true;
                this.title = "修改信息";
            });
        },
    }
};
</script>

<style lang="scss" scoped>
.child1 {
    font-size: 58px;
    font-family: HarmonyOS_Sans_TC_Bold;
    font-weight: 400;
    color: #333333;
    display: flex;
    width: 60%;
    height: 30px;
    justify-content: space-between;
    margin-top: 30px;
    line-height: 10px;
}

.child {
    font-size: 22px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #666666;
    display: flex;
    width: 66%;
    height: 50px;
    justify-content: space-between;
    line-height: 50px;
}

.card-title {
    margin-bottom: 20px;
    font-size: 28px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #333333;
}


/* .chartsOp {
    float: right;
} */

.app-container {
    width: 100%;
    height: 100%;
    background-color: #EDF6FD;
    .name{
        font-size: 32px;
        font-weight: 500;
    }
}

.cardbgimg {
    position: relative;
    padding: 30px;
    width: 100%;
    height: 300px;
    background: url('~@/assets/operatMonit/bgenery.png')no-repeat center;
    background-size: 100%;
}


.p-charts-container {
    width: 100%;
    height: 280px;
    position: relative;


    .charts {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

}

.el-row {
    margin-bottom: 20px;

    &:last-child {
        margin-bottom: 0;
    }
}
</style>
