<template>
    <div class="configerdetail">
        <!-- 设备测量点组态（详细信息） -->
        <div style="margin: 20px;font-size:24px ;">
            设备测量点组态（详细信息）
        </div>
        <el-card class="box-card" v-model="datafilterdata">
            <div class="topboxheader">
                <svg version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="50px" height="39px"
                    xmlns="http://www.w3.org/2000/svg">
                    <g transform="matrix(1 0 0 1 -40 -116 )">
                        <path
                            d="M 9.66796875 27.3249289772727  C 10.3655133928571 26.6324573863636  10.7142857142857 25.796875  10.7142857142857 24.8181818181818  C 10.7142857142857 23.8394886363636  10.3655133928571 23.00390625  9.66796875 22.3114346590909  C 8.97042410714286 21.6189630681818  8.12872023809524 21.2727272727273  7.14285714285714 21.2727272727273  C 6.15699404761905 21.2727272727273  5.31529017857143 21.6189630681818  4.61774553571429 22.3114346590909  C 3.92020089285714 23.00390625  3.57142857142857 23.8394886363636  3.57142857142857 24.8181818181818  C 3.57142857142857 25.796875  3.92020089285714 26.6324573863636  4.61774553571429 27.3249289772727  C 5.31529017857143 28.0174005681818  6.15699404761905 28.3636363636364  7.14285714285714 28.3636363636364  C 8.12872023809524 28.3636363636364  8.97042410714286 28.0174005681818  9.66796875 27.3249289772727  Z M 15.0251116071429 14.9158380681818  C 15.72265625 14.2233664772727  16.0714285714286 13.3877840909091  16.0714285714286 12.4090909090909  C 16.0714285714286 11.4303977272727  15.72265625 10.5948153409091  15.0251116071429 9.90234375  C 14.3275669642857 9.20987215909091  13.4858630952381 8.86363636363637  12.5 8.86363636363637  C 11.5141369047619 8.86363636363637  10.6724330357143 9.20987215909091  9.97488839285714 9.90234375  C 9.27734375 10.5948153409091  8.92857142857143 11.4303977272727  8.92857142857143 12.4090909090909  C 8.92857142857143 13.3877840909091  9.27734375 14.2233664772727  9.97488839285714 14.9158380681818  C 10.6724330357143 15.6083096590909  11.5141369047619 15.9545454545455  12.5 15.9545454545455  C 13.4858630952381 15.9545454545455  14.3275669642857 15.6083096590909  15.0251116071429 14.9158380681818  Z M 30.0223214285714 28.2528409090909  C 29.6130952380952 27.2002840909091  28.9434523809524 26.3600852272727  28.0133928571429 25.7322443181818  L 30.8314732142857 15.1512784090909  C 30.9430803571429 14.6711647727273  30.8733258928571 14.2233664772727  30.6222098214286 13.8078835227273  C 30.37109375 13.3924005681818  30.0130208333333 13.1200284090909  29.5479910714286 12.9907670454545  C 29.0829613095238 12.8615056818182  28.6365327380952 12.9215198863636  28.2087053571429 13.1708096590909  C 27.7808779761905 13.4200994318182  27.5018601190476 13.7848011363636  27.3716517857143 14.2649147727273  L 24.5535714285714 24.8458806818182  C 23.4375 24.9382102272727  22.4423363095238 25.33984375  21.5680803571429 26.05078125  C 20.6938244047619 26.76171875  20.1078869047619 27.6711647727273  19.8102678571429 28.7791193181818  C 19.4382440476191 30.2009943181818  19.624255952381 31.5490056818182  20.3683035714286 32.8231534090909  C 21.1123511904762 34.0973011363636  22.2005208333333 34.9190340909091  23.6328125 35.2883522727273  C 25.0651041666667 35.6576704545455  26.4229910714286 35.4730113636364  27.7064732142857 34.734375  C 28.9899553571429 33.9957386363636  29.8177083333333 32.9154829545455  30.1897321428571 31.4936079545455  C 30.4873511904762 30.3856534090909  30.4315476190476 29.3053977272727  30.0223214285714 28.2528409090909  Z M 45.3822544642857 27.3249289772727  C 46.0797991071429 26.6324573863636  46.4285714285714 25.796875  46.4285714285714 24.8181818181818  C 46.4285714285714 23.8394886363636  46.0797991071429 23.00390625  45.3822544642857 22.3114346590909  C 44.6847098214286 21.6189630681818  43.843005952381 21.2727272727273  42.8571428571429 21.2727272727273  C 41.8712797619048 21.2727272727273  41.0295758928571 21.6189630681818  40.33203125 22.3114346590909  C 39.6344866071429 23.00390625  39.2857142857143 23.8394886363636  39.2857142857143 24.8181818181818  C 39.2857142857143 25.796875  39.6344866071429 26.6324573863636  40.33203125 27.3249289772727  C 41.0295758928571 28.0174005681818  41.8712797619048 28.3636363636364  42.8571428571429 28.3636363636364  C 43.843005952381 28.3636363636364  44.6847098214286 28.0174005681818  45.3822544642857 27.3249289772727  Z M 27.5251116071429 9.59765625  C 28.22265625 8.90518465909091  28.5714285714286 8.06960227272727  28.5714285714286 7.09090909090909  C 28.5714285714286 6.11221590909091  28.22265625 5.27663352272727  27.5251116071429 4.58416193181818  C 26.8275669642857 3.89169034090909  25.9858630952381 3.54545454545455  25 3.54545454545455  C 24.0141369047619 3.54545454545455  23.1724330357143 3.89169034090909  22.4748883928571 4.58416193181818  C 21.77734375 5.27663352272727  21.4285714285714 6.11221590909091  21.4285714285714 7.09090909090909  C 21.4285714285714 8.06960227272727  21.77734375 8.90518465909091  22.4748883928571 9.59765625  C 23.1724330357143 10.2901278409091  24.0141369047619 10.6363636363636  25 10.6363636363636  C 25.9858630952381 10.6363636363636  26.8275669642857 10.2901278409091  27.5251116071429 9.59765625  Z M 40.0251116071429 14.9158380681818  C 40.72265625 14.2233664772727  41.0714285714286 13.3877840909091  41.0714285714286 12.4090909090909  C 41.0714285714286 11.4303977272727  40.72265625 10.5948153409091  40.0251116071429 9.90234375  C 39.3275669642857 9.20987215909091  38.4858630952381 8.86363636363637  37.5 8.86363636363637  C 36.5141369047619 8.86363636363637  35.6724330357143 9.20987215909091  34.9748883928571 9.90234375  C 34.27734375 10.5948153409091  33.9285714285714 11.4303977272727  33.9285714285714 12.4090909090909  C 33.9285714285714 13.3877840909091  34.27734375 14.2233664772727  34.9748883928571 14.9158380681818  C 35.6724330357143 15.6083096590909  36.5141369047619 15.9545454545455  37.5 15.9545454545455  C 38.4858630952381 15.9545454545455  39.3275669642857 15.6083096590909  40.0251116071429 14.9158380681818  Z M 48.0189732142857 15.1789772727273  C 49.3396577380952 18.2443181818182  50 21.4573863636364  50 24.8181818181818  C 50 29.6377840909091  48.6886160714286 34.0973011363636  46.0658482142857 38.1967329545455  C 45.7124255952381 38.7322443181818  45.210193452381 39  44.5591517857143 39  L 5.44084821428571 39  C 4.78980654761905 39  4.28757440476191 38.7322443181818  3.93415178571429 38.1967329545455  C 1.31138392857143 34.1157670454545  0 29.65625  0 24.8181818181818  C 0 21.4573863636364  0.660342261904762 18.2443181818182  1.98102678571429 15.1789772727273  C 3.30171130952381 12.1136363636364  5.078125 9.47301136363637  7.31026785714286 7.25710227272727  C 9.54241071428571 5.04119318181818  12.202380952381 3.27769886363636  15.2901785714286 1.96661931818182  C 18.3779761904762 0.65553977272727  21.6145833333333 0  25 0  C 28.3854166666667 0  31.6220238095238 0.65553977272727  34.7098214285714 1.96661931818182  C 37.7976190476191 3.27769886363636  40.4575892857143 5.04119318181818  42.6897321428571 7.25710227272727  C 44.921875 9.47301136363637  46.6982886904762 12.1136363636364  48.0189732142857 15.1789772727273  Z "
                            fill-rule="nonzero" fill="#027db4" stroke="none" transform="matrix(1 0 0 1 40 116 )" />
                    </g>
                </svg>
                <p style="margin-left: 20px;">{{ datafilterdata.num }}</p>
                <div class="svg-icon2">
                    <type-box :text="datafilterdata.statustext" :status="datafilterdata.status"></type-box>
                </div>
            </div>
            <el-descriptions title="" :column=2 style="margin-left: 30px;">
                <el-descriptions-item label="更新人">{{ datafilterdata.user }}</el-descriptions-item>
                <el-descriptions-item label="更新时间">{{ datafilterdata.Purchasetime }}</el-descriptions-item>
            </el-descriptions>
        </el-card>
        <el-card class="box-card">
            <el-descriptions title="测量点组态信息" :column=2 style="margin-left: 30px;">
                <el-descriptions-item label="设备">{{ datafilterdata.department }}</el-descriptions-item>
                <el-descriptions-item label="设备编码">{{ datafilterdata.num }}</el-descriptions-item>
                <el-descriptions-item label="设备名称">{{ datafilterdata.name }}</el-descriptions-item>
                <el-descriptions-item label="设备类型">{{ datafilterdata.nameType }}</el-descriptions-item>
                <el-descriptions-item label="关联测点">{{ datafilterdata.correlationpoint }}</el-descriptions-item>
            </el-descriptions>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>修改记录</span>
            </div>
            <el-timeline>
                <el-timeline-item v-for="( e, index ) in  RecordAllVOInfo "
                    :timestamp="dayjs(e.starTime).format('YYYY/MM/DD')" placement="top" :key="index">
                    <el-card style="background: #eefaf5">
                        <div class="flex flex-direction align-start justify-around">
                            <h4>{{ e.title }}</h4>
                            <div class="flex">
                                <div style="margin-right: 50px;">{{ e.deptName }}</div>
                                <div>
                                    <div>{{ e.Ytestnode }}</div>
                                    <div>{{ e.Ntestnode }}</div>
                                </div>
                            </div>
                            <div class="w-100 flex align-center justify-between">
                                <span>{{ e.nickName }}</span>
                                <span>
                                    {{
                                        dayjs(e.starTime).format("YYYY.MM.DD HH:mm:ss")
                                    }}
                                </span>
                            </div>
                        </div>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </el-card>
        <el-row class="foot-btn flex justify-center align-center">
            <el-col :span="24" class="flex justify-center align-center">
                <el-button @click="handleClose" style="margin-right: 12px">{{ isCreate ? "取消" : "关闭" }}</el-button>
                <!--维修人员操作按钮-->
                <div v-show="activeName == 'cloum'">
                    <el-button v-hasPermi="['equipment:repair:claim']" :disabled="isWorkStatus !== '2'" type="success"
                        @click="onSubmit3(3)">
                        维修完成
                    </el-button>
                </div>
                <!--操作人员操作按钮-->
                <div v-show="activeName == 'genInfo'">
                    <!--操作人员提交-->
                    <el-button v-hasPermi="['equipment:repair:add']" :disabled="isWorkStatus == '6' || isWorkStatus !== '3'"
                        type="success" @click="onSubmit4(4)">提交
                    </el-button>
                    <!-- 驳回按钮状态为2时不可以驳回 状态为6时不可驳回 -->
                    <el-button v-hasPermi="['equipment:repair:add']" @click="BHhandler"
                        :disabled="isWorkStatus == '6' || isWorkStatus <= 2" type="danger">
                        驳回
                    </el-button>
                </div>
                <!--工程师-->
                <div v-show="activeName == 'genInfo1'">
                    <el-button v-hasPermi="['equipment:repair:acceptance']"
                        :disabled="isWorkStatus == '6' || isWorkStatus !== '4'" type="success" @click="onSubmit5(5)">
                        提交
                    </el-button>
                    <el-button v-hasPermi="['equipment:repair:acceptance']" @click="BHhandler"
                        :disabled="isWorkStatus == '6' || isWorkStatus !== '4'" type="danger">
                        驳回
                    </el-button>
                </div>
                <!--      设备主管抽检-->
                <div v-show="activeName == 'genInfo2'">
                    <el-button v-hasPermi="['equipment:repair:check']"
                        :disabled="isWorkStatus == '6' || isWorkStatus !== '5'" type="success" @click="onSubmit6(6)">
                        提交
                    </el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name: "configerdetail",
    components: {},
    data() {
        return {
            RecordAllVOInfo: [],//修改记录
            dataList: [
                {
                    id: 1,    //id
                    name: "液压控制器",
                    nameType: "主要部件",
                    correlationpoint: "测量点1,测量点2",
                    num: "QG-20023", // 订单编号
                    status: 1, // 审核状态
                    statustext: "在役",
                    Purchasetime: "2023年12月15日",
                    Plannedtime: "2023-12-25",
                    Actualtime: "2023年12月21日",
                    department: "技术部",
                    user: "杨波",
                    auditor: "王帆",
                    remark: "王帆-备注"
                }, {
                    id: 2,    //id
                    name: "聚乙烯检测模块",
                    correlationpoint: "测量点1",
                    nameType: "模块部件",
                    num: "QG-20024", // 订单编号
                    status: 2, // 审核状态
                    statustext: "备用",
                    Purchasetime: "2023年12月15日",
                    Plannedtime: "2023-12-25",
                    Actualtime: "2023年12月20日",
                    department: "行政部",
                    user: "李丽",
                    auditor: "石昊",
                    remark: "石昊-备注"
                }, {
                    id: 3,    //id
                    name: "液压销售样品",
                    correlationpoint: "测量点1,测量点2",
                    nameType: "销售样品",
                    num: "QG-20025", // 订单编号
                    status: 3, // 审核状态
                    statustext: "停役",
                    Purchasetime: "2023年12月15日",
                    Plannedtime: "2023-12-25",
                    Actualtime: "2023年12月25日",
                    department: "销售部",
                    user: "石晓雅",
                    auditor: "伊月",
                    remark: "伊月-备注"
                }, {
                    id: 4,    //id
                    name: "打印机配件",
                    nameType: "行政备件",
                    num: "QG-20026", // 订单编号
                    status: 4, // 审核状态
                    statustext: "试运行",
                    correlationpoint: "测量点1,测量点2",
                    Purchasetime: "2023年12月15日",
                    Plannedtime: "2023-12-25",
                    Actualtime: "2023年12月17日",
                    department: "行政部",
                    user: "南柠",
                    auditor: "蓝泉",
                    remark: "蓝泉-备注"
                },
                {
                    id: 5,    //id
                    name: "记录档案",
                    nameType: "行政备件",
                    correlationpoint: "测量点2",
                    num: "QG-20027", // 订单编号
                    status: 5, // 审核状态
                    statustext: "报废",
                    Purchasetime: "2023年12月15日",
                    Plannedtime: "2023-12-25",
                    Actualtime: "2023年12月19日",
                    department: "总裁办",
                    user: "李海",
                    auditor: "胡南",
                    remark: "胡南-备注"
                }
            ],
            loading: false,
            rules: {},
            routerId: "",
            datafilterdata: {},
        }
    },
    created() {
        this.getOperateList()
        this.routerId = this.$route.query.id
        this.datafilterdata = this.dataList.find((item) => item.id == this.routerId)
    },
    methods: {
        BHhandler() { },
        getOperateList() {
            //查操作记录
            this.$api
                .WXRecordAllVO1(this.$route.query.id)
                .then((res) => {
                    if (res.code == 200 && res.data !== undefined) {
                        this.RecordAllVOInfo = res.data;
                    } else {
                        this.RecordAllVOInfo = [];
                    }
                })
                .catch((e) => { });
        },
        //关闭
        handleClose() {
            // 调用全局挂载的方法，关闭当前页
            this.$store.dispatch("tagsView/delView", this.$route);
            // 返回上一步路由
            this.$router.go(-1);
        },
    }
}
</script>
<style scoped>
.configerdetail {}

.foot-btn {
    z-index: 9;
    width: 100%;
    height: 80px;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #ffffff;
    box-shadow: 0 0 10px #a0a8a0;
}

.box-card {
    margin: 20px 0;
}

.clearfixfooter {
    margin: 30px;
    text-align: center;
}

.topboxheader {
    position: relative;
    display: flex;
    align-items: center;
    font-size: 30px;
}
</style>