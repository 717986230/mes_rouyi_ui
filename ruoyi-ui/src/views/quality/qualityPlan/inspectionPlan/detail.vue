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
                "inspectionNumber": "zdf-5682842",
                "planList": [{
                    "id": 1704784641170,
                    "item": "材质检验",
                    "item1": "材质",
                    "item2": "化学药品分析",
                    "item3": "化学检验",
                    "item4": "220",
                    "item5": "210",
                    "item6": "10",
                    "item7": "250",
                    "item8": "30"
                }, {
                    "id": 1704784690985,
                    "item": "材质检验",
                    "item1": "材质2",
                    "item2": "化学药品分析",
                    "item3": "化学检验",
                    "item4": "100",
                    "item5": "90",
                    "item6": "10",
                    "item7": "110",
                    "item8": "10"
                }],
                "name": "材料检验",
                "establish": "2024-01-12 12:45:12",
                "subUser":"admin",
                "subTime":"2021-01-09 16:08:21",
                "upTime":"2024-01-12 12:45:12",
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
