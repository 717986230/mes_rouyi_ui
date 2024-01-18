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
                            {{ item.title }}
                        </div>
                        <div class="content flex justify-between mt20 gray">
                            <div class="left w-60 ">
                                <el-row class="flex flex-wrap">
                                    <el-col :span="10" v-for="(key, index) in item.options" :key="index">
                                        {{ key }}
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="right w-40 flex align-end justify-end">
                                {{ item.time }}
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
            logData: []
        }
    },
    created() {
        this.getLog()
    },
    methods: {
        getLog() {
            this.logData = [
                {
                    title: "任务创建",
                    time: "2023-12-01 09:03:56",
                    options: {
                        key2: '肖海亮'
                    }
                },
                {
                    title: "任务执行开始",
                    time: "2023-12-03 18:58:56",
                    options: {
                        key2: '石磊',
                    }
                },
                {
                    title: "任务保存1",
                    time: "2023-12-06 09:00:56",
                    options: {
                        key2: '刘华云',
                    }
                },
                {
                    title: "任务保存2",
                    time: "2023-12-03 18:58:56",
                    options: {
                        key2: '李磊',
                    }
                },
                {
                    title: "任务完成",
                    time: "2023-12-18 13:01:20",
                    options: {
                        key2: '刘海波'
                    }
                },
            ]
        }
    }
}
</script>

<style scoped>
.box-card {
    margin: 15px;
}
</style>