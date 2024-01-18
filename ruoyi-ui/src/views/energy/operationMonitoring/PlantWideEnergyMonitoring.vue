
<template>
    <!-- 全厂能源监控 -->
    <div class="app-container">
        <el-row>
            <el-col :span="24">
                <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="100px">
                    <el-form-item label="工厂:" prop="nodeAreaId" style="margin-left: -50px;">
                        <el-select v-model="queryParams.unitTypeId" placeholder="工厂" clearable>
                            <el-option v-for="dict in Factory" :key="dict.value" :label="dict.label" :value="dict.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="能源介质:" prop="unitTypeId">
                        <el-select v-model="queryParams.unitTypeId" placeholder="能源介质" clearable>
                            <el-option v-for="dict in zzType" :key="dict.value" :label="dict.label" :value="dict.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" size="mini" @click="handleQuery">切换</el-button>
                        <el-button size="mini" type="success" plain @click="resetQuery">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-row :gutter=20>
            <el-col :span="12">
                <div class="cardbgimg">
                    <div class="card-title">{{ cardList[0].card1 }}</div>
                    <div :style="{
                        fontSize: '70px', color: cardList[0].color,
                        fontFamily: 'HarmonyOS_Sans_TC_Bold',
                        fontWeight: '400',
                    }">{{ cardList[0].card2 }}</div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="cardbgimg1">
                    <div class="card-title">{{ cardList[1].card1 }}</div>
                    <div :style="{
                        fontSize: '70px', color: cardList[1].color,
                        fontFamily: 'HarmonyOS_Sans_TC_Bold',
                        fontWeight: '400',
                    }">{{ cardList[1].card2 }}</div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-card>
                    <div style="width: 100%;height: 50px;">
                        <div style="float: left;">
                            <span style="font-size: 20px;
                            font-family: Source Han Sans CN;
                            font-weight: 400;
                            color: #333333;
                            "> {{ echartsTitile + updata_title }}</span>
                            <span> {{ UPDATA_TIME }}</span>
                        </div>
                        <div class="chartsOp" style="float: right;">
                            数据类型:
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
import TbCard from "../common/TbCard.vue";
import { debounce } from "@/utils";
var self;
export default {
    name: "PlantWideEnergyMonitoring",
    components: { TbCard },
    data() {
        return {
            gradientColor: '#FDDDDE',
            Factory: [],//工厂
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
                    card1: "工厂1能源介质1昨日累积消耗量（单位：t）",
                    card2: "347",
                    color: "#BC5FFE",
                    img: require("../../../assets/operatMonit/pw-left.png")
                },
                {
                    card1: "工厂1能源介质1昨日累积产出量（单位：t）",
                    card2: "82510",
                    color: "#3C9CFD",
                    img: require("../../../assets/operatMonit/pw-right.png")
                }
            ],
            // 遮罩层
            loading: true,
            // 表单参数
            form: {},
            // 查询参数
            queryParams: {
                dateRange: [new Date(), new Date().setDate(new Date().getDate() - 1)],//时间
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
            echartsTitile: "工厂1能源介质1界区1"
        };
    },
    computed: {
           updata_title() {
            let distitle = this.chartsOp == "1" ? "昨日累积消耗量" : "昨日累积产出量";
            return distitle
        }
    },
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
            this.echartsTitile = item.card1
            this.initChart()
        },
        initChart() {
            this.chart = this.$echarts.init(this.$refs.charts);
            // let distitle = this.chartsOp == "1" ? "昨日累积消耗量" : "昨日累积产出量";
            let option = {
                // title: {
                //     text: this.echartsTitile + distitle,
                //     // subtext: "数据来自网络",
                //     // sublink: "http://",
                // },
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
                // title: {
                //     text: this.echartsTitile + distitle,
                // },
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
}

.cardbgimg1 {
    padding: 30px;
    width: 100%;
    height: 100%;
    background: url('../../../assets/operatMonit/pw-left.png')no-repeat center;
    background-size: 100%;
}

.cardbgimg {
    padding: 30px;
    width: 100%;
    height: 100%;
    background: url('../../../assets/operatMonit/pw-right.png')no-repeat center;
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
