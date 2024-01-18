<template>
    <!-- 操作日志 -->
    <div class="content basic">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="normal m20 bold">操作日志</span>
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
    props: {
        logData:{
            type: Array,
            default: () => []
        }
    },
}
</script>

<style scoped>
.box-card{
    margin: 15px;
}
</style>