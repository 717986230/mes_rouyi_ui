
<template>
    <!-- 能效分析 -->
    <div class="app-container">
        <el-row>
            <el-col :span="24">
                <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="100px">
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
        <el-row :gutter=10>
            <el-col :span="24">
                <el-card>
                    <el-row>
                        <div class="buleleft">
                            <span> {{ '能源消耗 / 生产绩效指标' }}</span>
                            <span> {{ UPDATA_TIME }}</span>
                        </div>
                    </el-row>
                    <el-row :gutter=20>
                        <el-col :span="8" v-for="(item, index) in dataList" :key="index" style="margin: 0 0 20px 0;">
                            <div>
                                <div style="display: flex;margin: 0 0 10px 0;">
                                    <div>
                                        {{ item.label }}:
                                    </div>
                                    <el-progress :text-inside="true" :stroke-width="26" :percentage="item.value"
                                        style="width: 260px;"></el-progress>
                                </div>
                                <div style="display: flex;">
                                    <div>
                                        {{ item.label1 }}:
                                    </div>
                                    <el-progress :text-inside="true" :stroke-width="26" :percentage="item.value1"
                                        style="width: 260px;" status="success"></el-progress>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-card style="position: relative;">
                    <div style="width: 100%;height: 50px;">
                        <div class="buleleft">
                            <span> {{ '能源消耗 / 生产绩效指标' }}</span>
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
                    <div
                        style="position: absolute;top: 30px;;left: 20px;display: flex;width: 50%;justify-content: space-between;margin: 20px 0 0 0;">
                        <div style="display: flex;flex-direction: column;" v-for="(item, index) in child" :key="index">
                            <div style="
                            font-size: 18px;
                            font-family: PingFang SC;
                            font-weight: 400;
                            color: #999999;
                            ">{{ item.label }}</div>
                            <div style="
                            font-size: 24px;
                            font-family: PingFang SC;
                            font-weight: 500;
                            color: #333333;
                            ">{{ item.value }}</div>
                        </div>
                    </div>
                    <div class="p-charts-container">

                        <div ref="charts" class="charts"></div>
                    </div>
                </el-card>
            </el-col>
        </el-row>

    </div>
</template>
<script>
import { debounce } from "@/utils";
var self;
export default {
    name: "EfficiencyAnalysis",
    components: {},
    data() {
        return {
            dataList:[],
            Factory: [],//工厂

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
            child: [
                {
                    label: "能源消耗指标",
                    value: '8000t'
                },
                {
                    label: "已消耗量",
                    value: '3000t'
                },
                {
                    label: "剩余消耗量",
                    value: '5000t'
                },
                {
                    label: "当前消耗占比",
                    value: '37'
                },
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
        UPDATA_TIME() {
            // 假设 dateRange 是一个包含两个日期字符串的数组
            const dateRange = this.queryParams.dateRange

            // 将日期字符串转换成 Date 对象
            const startDate = new Date(dateRange[0]);
            const endDate = new Date(dateRange[1]);

            // 获取年月日信息
            const startYear = startDate.getFullYear();
            const startMonth = startDate.getMonth() + 1; // 月份是从0开始的，所以要加1
            const startDay = startDate.getDate();

            const endYear = endDate.getFullYear();
            const endMonth = endDate.getMonth() + 1;
            const endDay = endDate.getDate();

            // 构建中文日期范围字符串
            const chineseDateRange = `${endYear}年${endMonth}月${endDay}日~${startYear}年${startMonth}月${startDay}日`;
            return chineseDateRange
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
            let distitle = this.chartsOp == "1" ? "昨日累积消耗量" : "昨日累积产出量";
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
                    type: 'value'
                },
                series: [
                    {
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line',
                        smooth: true,
                        showBackground: true,
                        backgroundStyle: {
                            color: '#E6F6FE'
                        }
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
            this.dataList = [
                {
                    label: "能源介质1消耗指标",
                    value: Math.floor(Math.random() * 100),
                    label1: "能源介质1生产指标",
                    value1: Math.floor(Math.random() * 100)
                },
                {
                    label: "能源介质1消耗指标",
                    value: Math.floor(Math.random() * 100),
                    label1: "能源介质1生产指标",
                    value1: Math.floor(Math.random() * 100)
                },
                {
                    label: "能源介质1消耗指标",
                    value: Math.floor(Math.random() * 100),
                    label1: "能源介质1生产指标",
                    value1: Math.floor(Math.random() * 100)
                },
                {
                    label: "能源介质1消耗指标",
                    value: Math.floor(Math.random() * 100),
                    label1: "能源介质1生产指标",
                    value1: Math.floor(Math.random() * 100)
                },
                {
                    label: "能源介质1消耗指标",
                    value: Math.floor(Math.random() * 100),
                    label1: "能源介质1生产指标",
                    value1: Math.floor(Math.random() * 100)
                },
                {
                    label: "能源介质1消耗指标",
                    value: Math.floor(Math.random() * 100),
                    label1: "能源介质1生产指标",
                    value1: Math.floor(Math.random() * 100)
                }
            ]
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
::v-deep .el-progress-bar__outer,
::v-deep .el-progress-bar__inner {
    border-radius: 0 !important;
}

.buleleft {
    float: left;
    border-left: 4px solid blue;
    padding-left: 10px;
}

/* .chartsOp {
    float: right;
} */

.app-container {
    width: 100%;
    height: 100%;
    background-color: #EDF6FD;
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
