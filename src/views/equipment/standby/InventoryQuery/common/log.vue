<template>
    <!-- 操作日志 -->
    <div class="content basic">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>操作日志</span>
            </div>
            <el-timeline>
                <el-timeline-item v-for="( item, index ) in  logData " :timestamp="dayjs(item.time).format('YYYY/MM/DD')"
                                  placement="top" :key="index">
                    <el-card style="background: #eefaf5">
                        <div class="title normal">
                            {{item.title}}
                        </div>
                        <div class="content flex justify-between mt20 gray">
                            <div class="left w-60 ">
                                <el-row class="flex flex-wrap">
                                    <el-col :span="10" v-for="key in item.options">
                                        {{key}}
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="right w-40 flex align-end justify-end">
                                {{item.time}}
                            </div>
                        </div>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </el-card>
    </div>
</template>
<script>
export default {
    name: 'log',
    props: ['deviceId'],
    data() {
        return {
            logData:[]
        }
    },
    created() {
        this.getLog()
    },
    methods: {
        getLog(){
            this.logData = [
                {
                    title: "发起请购",
                    time: "2023-12-01 09:03:56",
                    options:{
                        key1:'产品研发部',
                        key2:'admin'
                    }
                },
                {
                    title: "采购入库",
                    time: "2023-12-03 18:58:56",
                    options:{
                        key1:'仓库1',
                        key2:'admin',
                        key3:'5-4架',
                        key4:'85件'
                    }
                },
                {
                    title: "领用出库",
                    time: "2023-12-06 09:00:56",
                    options:{
                        key1:'仓库1',
                        key2:'admin',
                        key3:'5-4架',
                        key4:'2件'
                    }
                },
                {
                    title: "报废入库",
                    time: "2023-12-03 18:58:56",
                    options:{
                        key1:'废品仓库',
                        key2:'admin',
                        key3:'1-1架',
                        key4:'1件'
                    }
                },
                {
                    title: "发起请购",
                    time: "2023-12-18 13:01:20",
                    options:{
                        key1:'产品研发部',
                        key2:'admin'
                    }
                },
            ]
        }
    }
}
</script>

<style scoped>
.box-card{
    margin: 15px;
}
</style>