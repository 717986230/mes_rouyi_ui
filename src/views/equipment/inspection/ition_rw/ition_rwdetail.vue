<template>
    <!--设备履历-->
    <div class="f-container">
        <!--标题头-->
        <detail-head :options="options" :tabs="tabs" @currentTab="currentTab = $event"></detail-head>
        <!--基础信息内容-->
        <basic v-if="currentTab == 0" :basicData="basicData"></basic>
        <!--关联备件-->
        <in-or-out v-if="currentTab == 1" :deviceId="deviceId"></in-or-out>
        <!--生命周期日志-->
        <log v-if="currentTab == 2" :deviceId="deviceId"></log>
        <el-row class="foot-btn flex justify-center align-center">
            <el-col :span="24" class="flex justify-center align-center">
                <el-button v-show="currentTab == 0" type="success" @click="handlePass">通过</el-button>
                <el-button v-show="currentTab == 0" @click="handleTurndown" plain type="danger">驳回</el-button>
                <el-button v-show="currentTab == 1" type="success" @click="handleSave">保存</el-button>
                <el-button v-show="currentTab == 1" type="success" @click="handleSaveCom">保存并完成</el-button>
                <el-button @click="onCancel" style="margin-right: 12px">关闭</el-button>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import detailHead from '@/views/equipment/common/detailHead';
import basic from './common/basic';
import inOrOut from './common/inOrOut'
import log from './common/log'
import Login from '../../../login'
export default {
    name: 'ition_rwdetail',
    components: { Login, detailHead, basic, inOrOut, log },
    data() {
        return {
            options: {
                title: '巡检任务（详细信息/验证）',
                icon: 'spyglass',
                name: '备件名称1',
                status: '未提交',
                statusNum: 0,
                column: 2,
                params: {
                    巡检负责人: "admin",
                    巡检验证人: "暂无",
                    实际开始时间: "2023年12月04日16时23分56秒",
                    实际结束时间: "暂无",
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
            basicData: {
                DeviceName: "6缸起动机",
                DeviceNumber: "D001",
                ProductionTime: "2021-01-01",
                PhoneNumber: "13245678900",
                ResponsiblePerson: "张三",
                Manufacturer: "制造商A",
                PurchaseTime: "2020-12-01",
                StorageLocation: "存放位置1",
                DeviceType: "1",
                CurrentStatus: "在役",
                CurrentStatusId: "1",
                Remarks: "备注信息",
                parents: '起重机',
                parentsId: 1,
                spareUnit: '架',
                model: "z-6-1002",
                area: '',
                areaID: '1710940819244048384',
                startTime: '2023-01-01',
                demandId: 1,
                demand: '需求1',
                demandDept: '',
                demandDeptId: '',
                supplier: '供应商111',
                ServiceLife: '7',
                price: 25000,
                upperLimit: 20,
                lowerLimit: 1,
                total: 1600,
                recodeList: [
                    {
                        id: '1',
                        warehouse: '北1区仓库',
                        num: '1000',
                        position: '5-4架',
                    },
                    {
                        id: '2',
                        warehouse: '北2区仓库',
                        num: '600',
                        position: '1-4架',
                    }
                ],
                accessor: [
                    {
                        url: 'http://192.168.8.59:10300/statics/2023/12/27/立罐3_20231227155738A001.png',
                        pictureName: '立罐3.png',
                        pictureType: 0,
                        imgSize: 15953,
                    }
                ],
                files: [
                    {
                        timeStamp: new Date('1703664174153').getTime(),
                        fileType: 'excel',
                        fileName: '设备管理工作安排_20240104145038A003.xlsx',
                        fileUrl: 'http://192.168.8.59:10300/statics/2024/01/04/设备管理工作安排_20240104145038A003.xlsx',
                        fileUPTime: this.dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                        fileUPUser: 'admin',
                        fileSize: 16568
                    },
                    {
                        timeStamp: new Date('1703664174153').getTime(),
                        fileType: 'docx',
                        fileName: '测试word文档_20240104154542A006.docx',
                        fileUrl: 'http://192.168.8.59:10300/statics/2024/01/04/测试word文档_20240104154542A006.docx',
                        fileUPTime: this.dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                        fileUPUser: 'admin',
                        fileSize: 865645
                    }
                ],
            },
            dataList: [],
        }
    },
    computed: {
        deviceId() {
            return this.$route.query.id
        }
    },
    created() {
        this.dataList = [
            {
                id: 1,    //id
                name: "盘点巡检",
                Equipmentinvolved: "空压机",
                Inspectioncontent: "液压阀检测",
                Claimtype: "维修领用",
                Associatedorder: "维修单号1",
                num: "PNQG-20023", // 订单编号
                useFlag: "0",
                status: 1, // 审核状态
                statustext: "未提交", // 审核状态
                Purchasetime: "2023-11-31",
                Plannedtime: "2023-12-01",
                Actualtime: "2023年12月15日",
                department: "技术部",
                user: "杨波",
                auditor: "王帆",
                remark: "王帆-备注"
            }, {
                name: "抽查巡检",
                id: 2,    //id
                Claimtype: "维护领用",
                Equipmentinvolved: "风冷机",
                Inspectioncontent: "风冷检测",
                Associatedorder: "维修单号2",
                num: "PNQG-20024", // 订单编号
                status: 5, // 审核状态
                statustext: "未审核", // 审核状态
                Purchasetime: "2023-12-15",
                Plannedtime: "2023-11-20",
                Actualtime: "2023年12月24日",
                department: "行政部",
                user: "李丽",
                useFlag: "1",
                auditor: "石昊",
                remark: "石昊-备注"
            }, {
                name: "抽查巡检",
                id: 3,    //id
                Equipmentinvolved: "抽芽机",
                Inspectioncontent: "抽芽机检测",
                num: "PNQG-20025", // 订单编号
                status: 3, // 审核状态
                Claimtype: "维护领用",
                Associatedorder: "维修单号3",
                statustext: "已撤回", // 审核状
                Purchasetime: "2023-12-23",
                Plannedtime: "2023-12-23",
                Actualtime: "2023年12月28日",
                department: "销售部",
                user: "石晓雅",
                useFlag: "0",
                auditor: "伊月",
                remark: "伊月-备注"
            }, {
                name: "盘点巡检",
                id: 4,    //id
                num: "PNQG-20026", // 订单编号
                status: 2, // 审核状态
                Claimtype: "维修领用",
                Equipmentinvolved: "暖灯机",
                Inspectioncontent: "暖灯机检测",
                Associatedorder: "维修单号1",
                statustext: "审核通过", // 审核状态
                Purchasetime: "2023-12-20",
                Plannedtime: "2023-12-25",
                Actualtime: "2023年12月29日",
                department: "行政部",
                user: "南柠",
                auditor: "蓝泉",
                useFlag: "1",
                remark: "蓝泉-备注",
            },
            {
                name: "安全巡检",
                id: 5,    //id
                Equipmentinvolved: "空气切割机",
                Inspectioncontent: "空气切割机检测",
                Claimtype: "备用领用",
                Associatedorder: "维修单号4",
                num: "PNQG-20027", // 订单编号
                status: 4, // 审核状态
                statustext: "驳回", // 审核状态
                Purchasetime: "2023-12-13",
                Plannedtime: "2023-12-25",
                Actualtime: "2023年12月29日",
                department: "总裁办",
                user: "李海",
                auditor: "胡南",
                remark: "胡南-备注",
                useFlag: "1"
            }
        ]
        let routid = this.$route.query.id;
        if (routid) {
            let nD = this.dataList.find(item => item.id == routid);
            this.options = {
                title: '巡检任务（详细信息/验证）',
                icon: 'spyglass',
                name: nD.name,
                status: nD.statustext,
                statusNum: nD.status,
                column: 2,
                params: {
                    巡检负责人: nD.user,
                    巡检验证人: nD.auditor,
                    实际开始时间: nD.Purchasetime,
                    实际结束时间: nD.Plannedtime,
                }
            }
        }
    },
    methods: {
        onCancel() {
            // 调用全局挂载的方法，关闭当前页
            this.$store.dispatch("tagsView/delView", this.$route);
            // 返回上一步路由
            this.$router.go(-1);
        },
        handleSave() {
            // 调用全局挂载的方法，关闭当前页
            this.$store.dispatch("tagsView/delView", this.$route);
            // 返回上一步路由
            this.$router.go(-1);
        },
        handleSaveCom() {
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
        },
        handleTurndown() {

        }
    }
}
</script>

<style lang="scss" scoped>
.content {
    padding-bottom: 80px;
}

.foot-btn {
    z-index: 9;
    width: 100%;
    height: 60px;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #ffffff;
    box-shadow: 0 0 10px #a0a8a0;
}
</style>
