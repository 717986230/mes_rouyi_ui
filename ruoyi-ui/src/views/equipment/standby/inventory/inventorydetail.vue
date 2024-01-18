<template>
    <div>
        <!--标题头-->
        <detailHead :options="options" iSprogress :tabs="tabs" @currentTab="currentTab = $event"></detailHead>
        <DetailsInfo v-if="currentTab == 0" :basicData="datafilterdata" :PopwindowDate="PopwindowDate"></DetailsInfo>
        <TaskexEcution v-if="currentTab == 1" :basicData="datafilterdata"> </TaskexEcution>
        <OperationLog v-if="currentTab == 2" :basicData="RecordAllVOInfo"></OperationLog>

        <el-row class="foot-btn flex justify-center align-center">
            <el-col :span="24" class="flex justify-center align-center">
                <el-button type="success" @click="submitForm">保存</el-button>
                <el-button @click="onCancel()" style="margin-right: 12px">{{ isCreate ? "取消" : "关闭" }}</el-button>
                <!--维修人员操作按钮-->
                <div v-show="activeName == 'cloum'">
                    <el-button v-hasPermi="['equipment:repair:claim']" :disabled="isWorkStatus !== '2'" type="success"
                        @click="onSubmit3(3)">
                        维修完成
                    </el-button>
                </div>
                <!--操作人员操作按钮-->
                <div v-show="activeName == 'genInfo'">
                    <!--      操作人员提交-->
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
import detailHead from '@/views/equipment/common/detailHead.vue';
import DetailsInfo from './computeds/detailsinfo.vue'
import OperationLog from './computeds/operationlog.vue'
import TaskexEcution from './computeds/taskexecution.vue'
export default {
    name: "inventorydetail",
    components: { DetailsInfo, OperationLog, TaskexEcution, detailHead },
    data() {
        return {
            options: {
                title: '盘点管理（任务执行）',
                icon: 'device',
                num: "POK-1102",
                auditor: "李磊",
                name: '六缸蒸汽机',
                status: '已提交',
                statusNum: 1,
                column: 2,
                user: '33',
                params: {
                    创建人: "利亚",
                    更新人: "李波",
                    创建时间: "2023年12月26日",
                    更新时间: "2023年12月27日",
                }
            },
            currentTab: 0,
            tabs: [
                {
                    name: '详细信息',
                    idx: '0',
                },
                {
                    name: '任务执行',
                    idx: '1',
                },
                {
                    name: '操作日志',
                    idx: '2',
                },
            ],
            routerId: "",
            activeName: 'first',
            loading: false,
            PopwindowDate: [
                {
                    id: 1,    //id
                    name: "液压阀", // 设备名称
                    Specificationmodel: "BG-11120", // 规格型号
                    Sparenumber: "BG-11120NKJ",
                    Sparetype: "消耗配件",
                    Inventorywarehouse: "耗材仓库",
                    Storagelocation: "耗材仓库-MKL",
                    Inventoryquantity: 12,
                    Countquantity: 22,
                    Inventoryprofit: 9,
                    unit: "个",
                }, {
                    id: 2,    //id
                    name: "火花塞", // 设备名称
                    Specificationmodel: "BG-11122", // 规格型号
                    Sparenumber: "BG-11122NKJ",
                    Sparetype: "消耗配件",
                    Inventorywarehouse: "耗材仓库",
                    Storagelocation: "耗材仓库-MKL",
                    Inventoryquantity: 78,
                    Countquantity: 44,
                    Inventoryprofit: 19,
                    unit: "套",
                }, {
                    id: 3,    //id
                    name: "前轧钢配件", // 设备名称
                    Specificationmodel: "BG-11125", // 规格型号
                    Sparenumber: "BG-11125NKJ",
                    Sparetype: "备用配件",
                    Inventorywarehouse: "备用仓库",
                    Storagelocation: "备用仓库-KJH",
                    Inventoryquantity: 8,
                    Countquantity: 41,
                    Inventoryprofit: 69,
                    unit: "箱",
                }, {
                    id: 4, //id
                    name: "喷漆盒栓", // 设备名称
                    Specificationmodel: "BG-11127", // 规格型号
                    Sparenumber: "BG-11127NKJ",
                    Sparetype: "主动更换件",
                    Inventorywarehouse: "铸件仓库",
                    Storagelocation: "铸件仓库-JJJ",
                    Inventoryquantity: 33,
                    Countquantity: 12,
                    Inventoryprofit: 89,
                    unit: "项",
                }
            ],
            dataList: [
                {
                    id: 1,    //id
                    num: "PD-100020", // 订单编号
                    status: 0, // 审核状态
                    statustext: "未开始",
                    Inventoryrule: "自由规则",
                    Stash: "配件仓库",
                    Plannedparts: "液压缸",
                    Scheduledstarttime: "2023年12月15日",
                    Scheduledendtime: "2023-12-25",
                    Actualstarttime: "2023年12月15日",
                    Actualendtime: "2023年12月15日",
                    isLoop: "1",
                    user: 0,
                    auditor: "李海",
                    remark: "石杜-备注"
                }, {
                    id: 2,    //id
                    num: "PD-100022", // 订单编号
                    status: 1, // 审核状态
                    statustext: "执行中",
                    Inventoryrule: "生产规则",
                    Stash: "生产仓库",
                    Plannedparts: "柴油机液压阀",
                    Scheduledstarttime: "2023年12月15日",
                    Scheduledendtime: "2023-12-25",
                    Actualstarttime: "2023年12月15日",
                    Actualendtime: "2023年12月15日",
                    isLoop: "0",
                    user: 56,
                    auditor: "杜海波",
                    remark: "王宁-备注"
                }, {
                    id: 3,    //id
                    num: "PD-100024", // 订单编号
                    status: 2, // 审核状态
                    statustext: "已完成",
                    Inventoryrule: "准确挑选",
                    Stash: "备件仓库",
                    Plannedparts: "后遥感控件",
                    Scheduledstarttime: "2023年12月15日",
                    Scheduledendtime: "2023-12-25",
                    Actualstarttime: "2023年12月15日",
                    Actualendtime: "2023年12月15日",
                    isLoop: "0",
                    user: 100,
                    auditor: "杨南",
                    remark: "时圣博-备注"
                }, {
                    id: 4,    //id
                    num: "PD-100028", // 订单编号
                    status: 3, // 审核状态
                    statustext: "已逾期",
                    Inventoryrule: "快速规则",
                    Stash: "临时仓库",
                    Plannedparts: "快插拨打火头",
                    Scheduledstarttime: "2023年12月15日",
                    Scheduledendtime: "2023-12-25",
                    Actualstarttime: "2023年12月15日",
                    Actualendtime: "2023年12月15日",
                    isLoop: "1",
                    user: 71,
                    auditor: "诺楠",
                    remark: "亚月-备注"
                },
                {
                    id: 5,    //id
                    num: "PD-100029", // 订单编号
                    status: 3, // 审核状态
                    statustext: "已逾期",
                    Inventoryrule: "标准规则",
                    Stash: "行政物品仓库",
                    Plannedparts: "打印机",
                    Scheduledstarttime: "2023年12月15日",
                    Scheduledendtime: "2023-12-25",
                    Actualstarttime: "2023年12月15日",
                    Actualendtime: "2023年12月15日",
                    isLoop: "1",
                    user: 29,
                    auditor: "图卡罗",
                    remark: "哈雅-备注"
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
            RecordAllVOInfo: [],//操作记录
            datafilterdata: {},//详情参数
        }
    },
    created() {
        this.routerId = this.$route.query.id
        this.datafilterdata = this.dataList.find((item) => item.id == this.routerId)
        this.options = {
            title: '盘点管理（任务执行）',
            icon: 'Archive',
            num: this.datafilterdata.num,
            auditor: this.datafilterdata.auditor,
            name: this.datafilterdata.num,
            status: this.datafilterdata.statustext,
            statusNum: this.datafilterdata.status,
            column: 2,
            user: this.datafilterdata.user,
            params: {
                创建人: this.datafilterdata.auditor,
                更新人: this.datafilterdata.auditor,
                创建时间: this.datafilterdata.Scheduledstarttime,
                更新时间: this.datafilterdata.Actualstarttime,
            }
        },
            this.getOperateList()
    },
    methods: {
        submitForm() {
            this.$message.success("保存成功")
            // 调用全局挂载的方法，关闭当前页
            this.$store.dispatch("tagsView/delView", this.$route);
            // 返回上一步路由
            this.$router.go(-1);
        },
        getOperateList() {
            //查操作记录
            this.$api
                .WXRecordAllVO(this.$route.query.id)
                .then((res) => {
                    if (res.code == 200 && res.data !== undefined) {
                        this.RecordAllVOInfo = res.data;
                    } else {
                        this.RecordAllVOInfo = [];
                    }
                })
                .catch((e) => { });
        },
        //失焦事件
        handleBlur() {

        },
        handleClick(tab, event) {
            console.log(tab, event);
        },

        //关闭
        onCancel() {
            // 调用全局挂载的方法，关闭当前页
            this.$store.dispatch("tagsView/delView", this.$route);
            // 返回上一步路由
            this.$router.go(-1);
        },
        handleSave() {
            this.$message.success("保存成功")
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
    position: static;
    bottom: 0;
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
