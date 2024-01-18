<!-- 采购跟踪详细信息 -->
<template>
    <div>
        <div style="margin: 20px;font-size:24px ;">
            采购跟踪（详细信息）
        </div>
        <el-card class="box-card" v-model="datafilterdata">
            <div class="topboxheader">
                <svg t="1703669304623" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="6247" width="48" height="48">
                    <path
                        d="M930.2 275.5c-19.5-28.2-51.6-45.1-85.8-45.1H263.2l-3.6-18.2c-6.7-33.8-29.2-61-59-74.7-13.3-6.1-28-9.5-43.4-9.5H106c-10.4 0-19.6 5-25.5 12.7-4.1 5.3-6.5 12-6.5 19.3 0 17.7 14.3 32 32 32h51.3c19.3 0.1 35.9 13.7 39.7 32.7l31.5 159.1c20.9 119.9 30.9 167.5 37.3 188.2l16.1 81.2c6.4 31.9 34.3 54.9 66.8 55H798c17.7 0 32-14.3 32-32s-14.3-32-32-32H348.6c-2 0-3.8-1.4-4.2-3.4l-7.6-38.6c19.6 0.5 46.2 0.6 82.9 0.6 16.7 0 35.5 0 56.6-0.1 95.3-0.3 207.1-1.4 284.1-2.3 58-0.5 109.6-36.7 129.8-91L942 371.9c12.1-32.2 7.7-68.2-11.8-96.4zM370.3 739c-31.5-0.1-60 18.9-72.1 48-12.1 29.1-5.5 62.6 16.8 84.9s55.8 29 84.9 16.9c29.1-12 48.1-40.5 48.1-72 0.1-42.9-34.7-77.7-77.7-77.8zM740.6 739c-31.5-0.1-60 18.9-72.1 48-12.1 29.1-5.5 62.6 16.8 84.9 22.3 22.3 55.8 29 84.9 16.9 29.1-12 48.1-40.5 48.1-72 0-42.9-34.8-77.7-77.7-77.8z"
                        fill="#1296db" p-id="6248"></path>
                </svg>
                <p>{{ this.routernum == 1 ? datafilterdata.num : datafilterdata.Purchasenumber }}</p>
                <div class="svg-icon2">
                    <type-box :text="datafilterdata.statustext" :status="datafilterdata.status"></type-box>
                </div>
            </div>
            <el-descriptions title="" :column=2 style="margin-left: 30px;">
                <el-descriptions-item label="请购人">{{ datafilterdata.user }}</el-descriptions-item>
                <el-descriptions-item label="请购部门">{{ datafilterdata.auditor }}</el-descriptions-item>
                <el-descriptions-item label="请购时间">{{ datafilterdata.Purchasetime }}</el-descriptions-item>
                <el-descriptions-item label="审核时间">
                    {{ datafilterdata.Actualtime }}
                </el-descriptions-item>
            </el-descriptions>
        </el-card>
        <el-card class="box-card" v-if="this.routernum == 1">
            <el-descriptions title="请购基础信息" :column=2 style="margin-left: 30px;">
                <el-descriptions-item label="请购部门">{{ datafilterdata.department }}</el-descriptions-item>
                <el-descriptions-item label="计划使用时间">{{ datafilterdata.Plannedtime }}</el-descriptions-item>
                <el-descriptions-item label="请购原因">{{ datafilterdata.remark }}</el-descriptions-item>
            </el-descriptions>
        </el-card>
        <el-card class="box-card" v-else>
            <el-descriptions title="采购信息" :column=2 style="margin-left: 30px;">
                <el-descriptions-item label="关联请购单号">{{ datafilterdata.num }}</el-descriptions-item>
                <el-descriptions-item label="计划使用时间">{{ datafilterdata.Plannedtime }}</el-descriptions-item>
                <el-descriptions-item label="请购原因">{{ datafilterdata.remark }}</el-descriptions-item>
                <el-descriptions-item label="生产厂家">{{ datafilterdata.manufacturer }}</el-descriptions-item>
                <el-descriptions-item label="供应商">{{ datafilterdata.supplier }}</el-descriptions-item>
                <el-descriptions-item label="预计到货时间">{{ datafilterdata.Plannedtime }}</el-descriptions-item>
            </el-descriptions>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>{{ this.routernum == 1 ? '请购明细' : "采购明细" }}</span>
            </div>
            <el-table v-loading="loading" :data="PopwindowDate" :rules="rules">
                <el-table-column label="序号" fixed="left" type="index" width="50" align="center" />
                <el-table-column label="设备名称" align="center" sortable key="name" prop="name" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="规格型号" align="center" sortable key="modelValue" prop="modelValue"
                    :show-overflow-tooltip="true" />
                <el-table-column label="生产厂家" align="center" sortable key="manufacturer" prop="manufacturer"
                    :show-overflow-tooltip="true" />
                <el-table-column label="单位" align="center" sortable key="unit" prop="unit" :show-overflow-tooltip="true" />
                <el-table-column label="请购数量" align="center" sortable key="quantity" prop="quantity"
                    :show-overflow-tooltip="true">
                </el-table-column>
            </el-table>
        </el-card>
        <el-row class="foot-btn flex justify-center align-center">
            <el-col :span="24" class="flex justify-center align-center">
                <el-button type="success" @click="handlePass" v-show="this.routernum == 1">通过</el-button>
                <el-button @click="handleTurndown" plain type="danger" v-show="this.routernum == 1">驳回</el-button>
                <el-button @click="handleClose" style="margin-right: 12px">关闭</el-button>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name: "trackdetail",
    components: {},
    data() {
        return {
            routernum: undefined,//判断是否是点击采购关联订单跳转的
            dataList: [
                {
                    id: 1,    //id
                    num: "XS-100010", // 订单编号
                    Purchasenumber: "HEXS-100010",
                    status: 0, // 审核状态
                    statustext: "未完成",
                    Purchasetime: "2023年12月15日",
                    Plannedtime: "2023-12-25",
                    Actualtime: "2023年12月15日",
                    department: "销售部",
                    user: "李嘉琪",
                    auditor: "王海波",
                    supplier: "施耐德",
                    manufacturer: "施耐德工厂部",
                    remark: "王海波-备注"
                }, {
                    id: 2,    //id
                    num: "JS-10012", // 订单编号
                    Purchasenumber: "HEJS-10012",
                    status: 2, // 审核状态
                    statustext: "已完成",
                    Purchasetime: "2023年12月15日",
                    Plannedtime: "2023-12-25",
                    Actualtime: "2023年12月15日",
                    department: "技术部",
                    user: "王维虎",
                    auditor: "李思",
                    supplier: "施耐德",
                    manufacturer: "施耐德工厂部",
                    remark: "李思-备注"
                }, {
                    id: 3,    //id
                    num: "ZC-100012", // 订单编号
                    Purchasenumber: "HEZC-100012",
                    status: 0, // 审核状态
                    statustext: "未完成",
                    Purchasetime: "2023年12月15日",
                    Plannedtime: "2023-12-25",
                    Actualtime: "2023年12月15日",
                    department: "总裁办",
                    user: "杜蒽",
                    auditor: "史雅",
                    supplier: "施耐德",
                    manufacturer: "施耐德工厂部",
                    remark: "史雅-备注"
                }, {
                    id: 4,    //id
                    num: "XZ-100013", // 订单编号
                    Purchasenumber: "HEXZ-100013",
                    statustext: "未完成",
                    status: 0, // 审核状态
                    Purchasetime: "2023年12月15日",
                    Plannedtime: "2023-12-25",
                    Actualtime: "2023年12月15日",
                    department: "行政部",
                    user: "施琦琦",
                    auditor: "黄涛",
                    supplier: "得力士",
                    manufacturer: "得力士工厂部",
                    remark: "黄涛-备注"
                },
                {
                    id: 5,    //id
                    num: "JS-10015", // 订单编号
                    Purchasenumber: "HEJS-10015",
                    status: 2, // 审核状态
                    statustext: "已完成",
                    Purchasetime: "2023年12月15日",
                    Plannedtime: "2023-12-25",
                    Actualtime: "2023年12月15日",
                    department: "技术部",
                    user: "东烟海",
                    auditor: "尚鹏",
                    supplier: "得力士",
                    manufacturer: "得力士工厂部",
                    remark: "尚鹏-备注"
                }
            ],
            loading: false,
            PopwindowDate: [
                {
                    id: 1,    //id
                    name: "液压后杠", // 设备名称
                    modelValue: "OUJ-10022", // 规格型号
                    manufacturer: "海联帆",//生产厂家
                    unit: "个",
                    quantity: "12"
                }, {
                    id: 2,    //id
                    name: "前挡器", // 设备名称
                    modelValue: "PUJ-10023", // 规格型号
                    manufacturer: "得利士",//生产厂家
                    unit: "套",
                    quantity: "22"
                }, {
                    id: 3,    //id
                    name: "拖动扳手", // 设备名称
                    modelValue: "OPU-100029", // 规格型号
                    manufacturer: "施耐德",//生产厂家
                    unit: "米",
                    quantity: "14"
                }, {
                    id: 4,    //id
                    name: "全身套条件", // 设备名称
                    modelValue: "TYP-10089", // 规格型号
                    manufacturer: "虎卡",//生产厂家
                    unit: "盒",
                    quantity: "2"
                }
            ],
            rules: {
                name: [
                    { required: true, message: "请输入设备名称", trigger: "blur" }
                ],
                modelValue: [
                    { required: true, message: "请输入规格型号", trigger: "blur" }
                ],
                manufacturer: [
                    { required: true, message: "请输入生产厂家", trigger: "blur" }
                ],
                unit: [
                    { required: true, message: "单位", trigger: "blur" }

                ]
            },
            routerId: "",
            datafilterdata: {}
        }
    },
    created() {
        this.routernum = this.$route.query.num
        this.routerId = this.$route.query.id
        this.datafilterdata = this.dataList.find((item) => item.id == this.routerId)
    },
    methods: {
        //关闭
        handleClose() {
            // 调用全局挂载的方法，关闭当前页
            this.$store.dispatch("tagsView/delView", this.$route);
            // 返回上一步路由
            this.$router.go(-1);
        },
        handlePass() {
            // 调用全局挂载的方法，关闭当前页
            this.$store.dispatch("tagsView/delView", this.$route);
            // 返回上一步路由
            this.$router.go(-1);
            this.$message.success("通过")
        },
        handleTurndown() {
            // 调用全局挂载的方法，关闭当前页
            this.$store.dispatch("tagsView/delView", this.$route);
            // 返回上一步路由
            this.$router.go(-1);
            this.$message.success("驳回成功")
        },
    }
}
</script>
<style scoped>
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
