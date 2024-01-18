<template>
    <!--维修任务详情-->
    <div class="f-container">
        <!--标题头-->
        <detail-head :options="options" :tabs="tabs" @currentTab="currentTab = $event"></detail-head>
        <!--基础信息内容-->
        <basic v-if="currentTab==0" :basicData="basicData"></basic>
        <!--任务执行-->
        <execution v-if="currentTab==1"></execution>
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
import detailHead from '../../common/detailHead';
import basic from './common/basic';
import execution from './common/execution'
import log from './common/log'
export default {
    name: 'detail',
    components: {  detailHead,basic,execution,log },
    data() {
        return {
            options: {
                title: '维修任务（详细信息）',
                icon: 'repair',
                name: '维修任务名称1',
                status: '已完成',
                statusNum: 1,
                column: 2,
                params: {
                    报修人: "admin",
                    审核人: "暂无",
                    报修时间: "2021年11月12日08小时15分50秒",
                    审核通过时间: "2022年12月29日11时11分00秒",
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
                parents: '起重机',
                parentsId: 1,
                DeviceName: "6缸起动机",
                DeviceNumber: "D001",
                DeviceType: "1",
                DeviceTypeName:"重要设备",
                model: "z-6-1002",
                area: '东一区',
                //维修开始时间
                repairStartTime:'2024-01-12 12:12:56',
                //维修结束时间
                repairEndTime:'2024-01-16 10:20:16',
                //维修总时长
                repairTotalTime:'4天02时20分',
                //故障分析
                faultAnalysis:'可能是气管破裂',
                //故障类型
                faultType:'电气故障',
                //故障详情
                faultDetail:'气管破裂 导致漏气,发生异响',
                //故障处理方式
                faultHandling:'更换气管',
                //维修负责人
                repairHead:'张工',
                //是否更换配件
                replaceAccessories:1,
                //更换配件的列表数据
                accessories:[
                    {
                        spareName:'备件1',
                        code:'C-001',
                        model:'Z-2022-01',
                        SpareType:'备件类型1',
                        unit:'个',
                        num:200,
                        manufacturer:'华东制造厂',
                        supplier:'华北平原总销'
                    },
                    {
                        spareName:'备件2',
                        code:'C-002',
                        model:'Z-2022-02',
                        SpareType:'备件类型2',
                        unit:'个',
                        num:50,
                        manufacturer:'华东制造厂',
                        supplier:'华北平原总销'
                    },
                    {
                        spareName:'备件3',
                        code:'C-003',
                        model:'Z-2022-03',
                        SpareType:'备件类型3',
                        unit:'架',
                        num:80,
                        manufacturer:'华东制造厂',
                        supplier:'华北平原总销'
                    },
                    {
                        spareName:'备件4',
                        code:'C-004',
                        model:'Z-2022-04',
                        SpareType:'备件类型4',
                        unit:'盒',
                        num:10,
                        manufacturer:'华东制造厂',
                        supplier:'华北平原总销'
                    },
                ],
                accessor: [
                    {
                        url: 'http://192.168.8.59:10300/statics/2023/12/27/立罐3_20231227155738A001.png',
                        pictureName: '立罐3.png',
                        pictureType: 0,
                        imgSize: 15953,
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
