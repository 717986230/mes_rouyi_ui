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
                title: '维护任务（详细信息）',
                icon: 'tenance',
                name: '维护任务名称1',
                status: '已完成',
                statusNum: 1,
                column: 2,
                params: {
                    维护负责人: "admin",
                    维护验证人: "暂无",
                    实际开始时间: "2021年11月12日08小时15分50秒",
                    实际结束时间: "2022年12月29日11时11分00秒",
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
                item1:'维护任务单号1',
                item2:'维护计划名称1',
                item3:'区域1',
                item4:'设备名称1',
                item5:'2024-01-12 12:12:56',
                item6:'2024-01-12 18:12:56',
                item7:'日常维护',
                item8:'轴承漏油',
                item9:'更换轴承',
                item10:'2024-01-12 13:00:00',
                item11:'2024-01-12 15:00:00',
                //更换配件的列表数据
                item12:[
                    {
                        name:'设备名称1',
                        code:'C-001',
                        model:'Z-2022-01',
                        SpareType:'备件类型1',
                        area:'华东',
                        supplier:'5-4架'
                    },
                    {
                        name:'设备名称2',
                        code:'C-002',
                        model:'Z-2022-02',
                        SpareType:'备件类型2',
                        area:'华东',
                        supplier:'5-4架'
                    },
                    {
                        name:'设备名称3',
                        code:'C-003',
                        model:'Z-2022-03',
                        SpareType:'备件类型3',
                        area:'华东',
                        supplier:'5-4架'
                    },
                    {
                        name:'设备名称4',
                        code:'C-004',
                        model:'Z-2022-04',
                        SpareType:'备件类型4',
                        area:'华东',
                        supplier:'5-4架'
                    },
                    {
                        name:'设备名称5',
                        code:'C-005',
                        model:'Z-2022-05',
                        SpareType:'备件类型5',
                        area:'华东',
                        supplier:'5-4架'
                    },
                ],
                item13:[
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
