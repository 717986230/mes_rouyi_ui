<template>
    <!--设备履历-->
    <div class="f-container">
        <!--标题头-->
        <el-col :span="24" class="card-box mt10">
            <el-card class="box-card">
                <el-tabs class="mt20 " v-model="currentTab">
                    <el-tab-pane v-for="(item, index) in tabs" :key="index" :label="item.name" :name="item.idx"
                                 class="small bold">
                    </el-tab-pane>
                </el-tabs>
            </el-card>
        </el-col>
        <!--基础信息内容-->
        <basic v-if="currentTab == 0" :basicData="basicData"></basic>
        <!--生命周期日志-->
        <log v-if="currentTab == 2" :logData="logData"></log>
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
import basic from './common/basic';
import log from '@/views/quality/common/log'
export default {
    name: 'detail',
    components: { basic ,log },
    data() {
        return {
            currentTab: 0,
            tabs: [
                {
                    name: '基础信息',
                    idx: '0',
                },
                // {
                //     name: '出入库明细',
                //     idx: '1',
                // },
                {
                    name: '生命周期日志',
                    idx: '2',
                },
            ],
            basicData:{
                "inspectionNumber":"dz-42546579",
                "subUser":"admin",
                "subTime":"2024-01-08 16:45:23",
                "upTime":"2024-01-09 12:45:23",
                "planList": [{
                    "id": 1704766981308,
                    "item": "辛烷值检测",
                    "item1": "燃爆辛烷值",
                    "item2": "",
                    "item4": "95",
                    "item5": "92",
                    "item6": "3",
                    "item7": "97",
                    "item8": "2",
                    "item9": "95",
                    "item10": "0",
                    "item11": "5",
                    "item12": "合格",
                    "item13": "合格"
                }],
                "inspectionQuantity": 100,
                "inspectionQuantity2": 50,
                "sampleDestructionCount": 2,
                "nonconformingQuantity": 3,
                "conformingQuantity": 45,
                "isLoop": "1",
                "samplesNum": 50,
                "acceptanceNum": 40,
                "rejectionNum": 5,
                "department": "生产部门",
                "inspector":"春昀",
                "receivingWarehouse": "切片销售代保管仓库",
                "location": "5-4架",
                "itemType": "产品",
                "itemName": "95号成品油",
                "itemCode": "2535-1256",
                "specification": "95#",
                "unit": "吨",
                "batchNumber": "20240109",
                "inspector2": 102,
                "inspectionDate": "20210109 12:12:00",
                "inspectionMethod": 1,
                "standards": "GB-2012",
                "batch": "9-15",
                "inspectionLevel": "特殊(S-1)",
                "AQL": "0.40",
                "inspectionResult": "合格"
            },
            logData:[]
        }
    },
    computed: {
        deviceId() {
            return this.$route.query.id
        }

    },
    created() {
        this.logData = [
            {
                title: "修改",
                time: "2023-12-01 09:03:56",
                options:{
                    key1:'产品研发部',
                    key2:'admin'
                }
            },
            {
                title: "修改",
                time: "2023-12-03 18:58:56",
                options:{
                    key1:'仓库1',
                    key2:'admin',
                    key3:'5-4架',
                    key4:'85件'
                }
            },
            {
                title: "修改",
                time: "2023-12-06 09:00:56",
                options:{
                    key1:'仓库1',
                    key2:'admin',
                    key3:'5-4架',
                    key4:'2件'
                }
            },
            {
                title: "修改",
                time: "2023-12-03 18:58:56",
                options:{
                    key1:'废品仓库',
                    key2:'admin',
                    key3:'1-1架',
                    key4:'1件'
                }
            },
            {
                title: "创建",
                time: "2023-12-18 13:01:20",
                options:{
                    key1:'产品研发部',
                    key2:'admin'
                }
            },
        ]
    },
    methods:{

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
