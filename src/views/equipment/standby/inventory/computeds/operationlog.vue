<!-- 操作日志 -->
<template>
    <!--基础信息内容-->
    <div class="content basic">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>操作日志</span>
            </div>
            <el-timeline>
                <el-timeline-item v-for="( e, index ) in  basicData " :timestamp="dayjs(e.starTime).format('YYYY/MM/DD')"
                    placement="top" :key="index">
                    <el-card style="background: #eefaf5">
                        <div class="flex flex-direction align-start justify-around">
                            <h4>{{ e.title }}</h4>
                            <p>{{ e.deptName }}</p>
                            <div class="w-100 flex align-center justify-between">
                                <span>{{ e.nickName }}</span>
                                <span>
                                    {{
                                        dayjs(e.starTime).format("YYYY.MM.DD HH:mm:ss")
                                    }}
                                </span>
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
    name: 'operationlog',
    props: ['basicData'],
    data() {
        return {
        }
    },
    created() {
    },
    methods: {

    }
}
</script>

<style scoped>
.box-card{
    margin: 15px;
}
</style>