
<template>
    <!-- 管网运行监控 -->
    <div class="app-container">
        <el-row>
            <el-col :span="24">
                <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="100px">
                    <el-form-item label="管网:" prop="nodeAreaId" style="margin-left: -50px;">
                        <el-select v-model="queryParams.unitTypeId" placeholder="管网" clearable>
                            <el-option v-for="dict in Factory" :key="dict.value" :label="dict.label" :value="dict.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="mini" @click="handleQuery">切换</el-button>
                        <el-button size="mini" @click="resetQuery">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-card class="box-card">
                    <img src="../../../assets/operatMonit/j.png" alt="" style="width: 100%;height: 100%;transform: scale(0.8)">

                    <!-- <div v-for="(i, index) in  itemList " :key="index" :style="{
                        position: 'absolute', top: i.x + 'px', left: i.y + 'px', fontSize: pxToRem(24) + 'px',
                    }">{{ i.name }}
                    </div>
                    <div v-for="(ik, index) in  child " :key="index"
                        :style="{ position: 'absolute', top: ik.x + 'px', left: ik.y + 'px', fontSize: pxToRem(24) + 'px', }">
                        {{ ik.name
                        }}
                    </div> -->
                </el-card>
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
        <el-row gutter="10">
            <el-col :span="8" v-for="( item, index ) in  cardListType " :key="index">
                <TbCard @handleCard="handleCard" :itemLS="item"></TbCard>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { debounce } from "@/utils";
import TbCard from "../common/TbCard.vue";

var self;
export default {
    name: "PipelineNetworkOperationMonitoring",
    components: { TbCard },

    data() {
        return {
            gradientColor: '#FDDDDE',

            itemListjtxt: [
                {
                    img: require('../../../assets/operatMonit/jtxt.png'),
                    x: 175,
                    y: 120
                },

                {
                    img: require('../../../assets/operatMonit/jtxt.png'),
                    x: 117,
                    y: 356
                },
                {
                    img: require('../../../assets/operatMonit/jtxt.png'),
                    x: 117,
                    y: 1017
                },
                {
                    img: require('../../../assets/operatMonit/jtxt.png'),
                    x: 173,
                    y: 661
                },
            ],
            itemListjtxb: [
                {
                    img: require('../../../assets/operatMonit/jtxb.png'),
                    x: 116,
                    y: 430
                },
                {
                    img: require('../../../assets/operatMonit/jtxb.png'),
                    x: 172,
                    y: 735
                },
                {
                    img: require('../../../assets/operatMonit/jtxb.png'),
                    x: 172,
                    y: 1315
                },
            ],

            itemList: [
                {
                    name: "外购",
                    x: 237,
                    y: 78,

                },
                {
                    name: "界区1",
                    x: 51,
                    y: 373,

                },
                {
                    name: "界区2",
                    x: 238,
                    y: 676,

                },
                {
                    name: "界区3",
                    x: 53,
                    y: 972,

                },
                {
                    name: "外销",
                    x: 238,
                    y: 1280,

                }
            ],
            child: [
                {
                    name: "管网1外购测点",
                    x: 174,
                    y: 139,
                },
                {
                    name: "管网1界区1测点1",
                    x: 115,
                    y: 192,
                },
                {
                    name: "管网1界区1测点2",
                    x: 113,
                    y: 447,
                },
                {
                    name: "管网1界区2测点1",
                    x: 173,
                    y: 495,
                },
                {
                    name: "管网1界区2测点2",
                    x: 171,
                    y: 755,
                },
                {
                    name: "管网1界区3测点1",
                    x: 116,
                    y: 1034,
                },
                {
                    name: "管网1外销测点1",
                    x: 173,
                    y: 1136,
                }
            ],
            Factory: [],//工厂
            cardListType: [
                {
                    card1: "管网1外购测点",
                    child: [
                        {
                            label: "实时流量",
                            value: "25t/h"
                        },
                        {
                            label: "实时温度",
                            value: "158℃"
                        }
                        , {
                            label: "实时压力",
                            value: "1.38MPa"
                        },
                        {
                            label: "振动速度",
                            value: "0.3mm/s"
                        }
                    ]
                },
                {
                    card1: "管网1界区1测点1",
                    child: [
                        {
                            label: "实时流量",
                            value: "25t/h"
                        },
                        {
                            label: "实时温度",
                            value: "158℃"
                        }
                        , {
                            label: "实时压力",
                            value: "1.38MPa"
                        },
                        {
                            label: "振动速度",
                            value: "0.3mm/s"
                        }
                    ]
                }, {
                    card1: "管网1界区1测点2",
                    child: [
                        {
                            label: "实时流量",
                            value: "25t/h"
                        },
                        {
                            label: "实时温度",
                            value: "158℃"
                        }
                        , {
                            label: "实时压力",
                            value: "1.38MPa"
                        },
                        {
                            label: "振动速度",
                            value: "0.3mm/s"
                        }
                    ]
                }, {
                    card1: "管网1界区2测点1",
                    child: [
                        {
                            label: "实时流量",
                            value: "25t/h"
                        },
                        {
                            label: "实时温度",
                            value: "158℃"
                        }
                        , {
                            label: "实时压力",
                            value: "1.38MPa"
                        },
                        {
                            label: "振动速度",
                            value: "0.3mm/s"
                        }
                    ]
                },
                {
                    card1: "管网1界区2测点2",
                    iscol: 1,
                    child: [
                        {
                            label: "实时流量",
                            value: "25t/h"
                        },
                        {
                            label: "实时温度",
                            value: "158℃"
                        }
                        , {
                            label: "实时压力",
                            value: "1.38MPa"
                        },
                        {
                            label: "振动速度",
                            value: "0.9mm/s"
                        }
                    ]
                },
                {
                    card1: "管网1界区2测点3",
                    child: [
                        {
                            label: "实时流量",
                            value: "25t/h"
                        },
                        {
                            label: "实时温度",
                            value: "158℃"
                        }
                        , {
                            label: "实时压力",
                            value: "1.38MPa"
                        },
                        {
                            label: "振动速度",
                            value: "0.3mm/s"
                        }
                    ]
                },
            ],
            opt: [
                {
                    value: '1',
                    label: '实时流量'
                },
                {
                    value: '2',
                    label: '实时温度'
                }
                ,
                {
                    value: '3',
                    label: '实时压力'
                }
                ,
                {
                    value: '4',
                    label: '振动速度'
                }
            ],
            chartsOp: "1",
            chart: null,
            zzType: [],

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
            echartsTitile: "管网1外购测点"
        };
    },
    computed: {
        updata_title() {
            let distitle = this.chartsOp == "1" ? "实时流量" : this.chartsOp == "2" ? "实时温度" : this.chartsOp == "3" ? "实时压力" : "振动速度"
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
            let option = {
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
            this.chart.setOption(option);

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
/* .chartsOp {
    float: right;
} */
.app-container {
    width: 100%;
    height: 100%;
    background-color: #EDF6FD;

    .box-card {
        width: 100%;
        position: relative;

        .jt1 {
            width: 90px;
            height: 30px;
            position: absolute;
            top: 115px;
            left: 654px;
            animation: fadeInOut 2s infinite;
        }

        .jtxb {
            width: 15px;
            height: 30px;
            position: absolute;
            top: 115px;
            left: 427px;
            animation: fadeInOut 2s infinite;
        }

        .jtxt {
            width: 15px;
            height: 30px;
            position: absolute;
            top: 114px;
            left: 355px;
            animation: fadeInOut 2s infinite;
        }
    }
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

@keyframes fadeInOut {

    0%,
    100% {
        opacity: 0;
    }

    50% {
        opacity: 1;
    }
}

.cycling-image {
    width: 15px;
    height: 30px;
    position: absolute;
    animation: fadeInOut 2s infinite;
}
</style>
