<template>
    <!--设备履历-->
    <div class="f-container">
        <!--标题头-->
        <detail-head :options="options" :tabs="tabs" @currentTab="currentTab = $event"></detail-head>
        <!--基础信息内容-->
        <basic v-if="currentTab == 0" :basicData="basicData"></basic>
        <!--关联备件-->
        <association v-if="currentTab == 1" :deviceId="deviceId"></association>
        <!--维护巡检计划-->
        <plan v-if="currentTab == 2" :deviceId="deviceId"></plan>
        <!--维修维护记录-->
        <plan2 v-if="currentTab == 3" :deviceId="deviceId"></plan2>
        <!--变更调拨记录-->
        <plan3 v-if="currentTab == 4" :deviceId="deviceId"></plan3>
        <!--生命周期日志-->
        <log v-if="currentTab == 5" :deviceId="deviceId"></log>
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
import detailHead from '../common/detailHead';
import basic from './common/basic';
import association from './common/association';
import plan from './common/plan';
import plan2 from './common/plan2';
import plan3 from './common/plan3';
import log from './common/log'
export default {
    name: 'detail',
    components: { detailHead, basic, association,plan,plan2,plan3,log },
    data() {
        return {
            options: {
                title: '设备档案（详细信息）',
                icon: 'device',
                name: '六缸蒸汽机',
                status: '在役',
                statusNum: 1,
                column: 3,
                params: {
                    创建人: "admin",
                    更新人: "暂无",
                    在役时长: "1年11月12日08小时15分50秒",
                    创建时间: "2022年12月29日11时11分00秒",
                    更新时间: "暂无",
                    维修次数: "2",
                }
            },
            currentTab: 0,
            tabs: [
                {
                    name: '基础信息',
                    idx: '0',
                },
                {
                    name: '关联备件',
                    idx: '1',
                },
                {
                    name: '维护巡检计划',
                    idx: '2',
                },
                {
                    name: '维修维护记录',
                    idx: '3',
                },
                {
                    name: '变更调拨记录',
                    idx: '4',
                },
                {
                    name: '生命周期日志',
                    idx: '5',
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
                tagNumber: 12,
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
                        fileUPTime: this.dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                        fileUPUser: 'admin',
                        fileSize: 16568,
                        fileUrl:'http://192.168.8.59:10300/statics/2024/01/04/测试word文档_20240104154542A006.docx',
                        fileType:'docx',
                        fileName:'测试word文档_20240104154542A006.docx'
                    },
                    {
                        timeStamp: new Date('1703664174153').getTime(),
                        fileUPTime: this.dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                        fileUPUser: 'admin',
                        fileSize: 16568,
                        fileUrl:'http://192.168.8.59:10300/statics/2024/01/04/设备管理工作安排_20240104145038A003.xlsx',
                        fileType:'excel',
                        fileName:'设备管理工作安排_20240104145038A003.xlsx'
                    },
                    {
                        timeStamp: new Date('1703664174153').getTime(),
                        fileUPTime: this.dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                        fileUPUser: 'admin',
                        fileSize: 16568,
                        fileUrl:'http://192.168.8.59:10300/statics/2024/01/04/fehelper-127-0-0-1-32767-start-html-1704354606377_20240104155340A007.pdf',
                        fileType:'pdf',
                        fileName:'fehelper-127-0-0-1-32767-start-html-1704354606377_20240104155340A007.pdf'
                    },
                    {
                        timeStamp: new Date('1703664174153').getTime(),
                        fileUPTime: this.dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                        fileUPUser: 'admin',
                        fileSize: 16568,
                        fileUrl:'http://192.168.8.59:10300/statics/2024/01/04/fehelper-127-0-0-1-32767-start-html-1704354606377_20240104155340A007.pdf',
                        fileType:'pdf',
                        fileName:'fehelper-127-0-0-1-32767-start-html-1704354606377_20240104155340A007.pdf'
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
