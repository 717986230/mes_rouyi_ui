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
                <el-button @click="onCancel()">
                    关闭
                </el-button>
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
    name: 'detail',
    components: { Login, detailHead, basic ,inOrOut,log },
    data() {
        return {
            options: {
                title: '库存查询（基础信息）',
                icon: 'device',
                name: '备件名称1',
                column: 2,
                params: {
                    创建人: "admin",
                    更新人: "暂无",
                    创建时间: "2023年12月04日16时23分56秒",
                    更新时间: "暂无",
                }
            },
            currentTab: 0,
            tabs: [
                {
                    name: '基础信息',
                    idx: '0',
                },
                {
                    name: '出入库明细',
                    idx: '1',
                },
                {
                    name: '生命周期日志',
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
                upperLimit:20,
                lowerLimit:1,
                total:1600,
                recodeList:[
                    {
                        id:'1',
                        warehouse:'北1区仓库',
                        num:'1000',
                        position:'5-4架',
                    },
                    {
                        id:'2',
                        warehouse:'北2区仓库',
                        num:'600',
                        position:'1-4架',
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
                        fileType:'excel',
                        fileName: '设备管理工作安排_20240104145038A003.xlsx',
                        fileUrl:'http://192.168.8.59:10300/statics/2024/01/04/设备管理工作安排_20240104145038A003.xlsx',
                        fileUPTime: this.dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                        fileUPUser: 'admin',
                        fileSize: 16568
                    },
                    {
                        timeStamp: new Date('1703664174153').getTime(),
                        fileType:'docx',
                        fileName: '测试word文档_20240104154542A006.docx',
                        fileUrl:'http://192.168.8.59:10300/statics/2024/01/04/测试word文档_20240104154542A006.docx',
                        fileUPTime: this.dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                        fileUPUser: 'admin',
                        fileSize: 865645
                    }
                ],
            },
        }
    },
    computed: {
        deviceId() {
            return this.$route.query.id
        }

    }
}
</script>

<style lang="scss" scoped>
.f-container {}

.content {
    padding-bottom: 80px;
}

.foot-btn {
    z-index: 2;
    width: 100%;
    height: 60px;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #ffffff;
    box-shadow: 0 0 10px #a0a8a0;
}
</style>
