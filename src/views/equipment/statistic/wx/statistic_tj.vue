<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" v-show="showSearch" :inline="true">
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-form-item label="" prop="status">
                        <el-select v-model="queryParams.type" placeholder="变电所" size="small" style="width: 190px"
                            @change="areaChange">
                            <el-option v-for="dict in areaOptions1" :key="dict.dictValue" :label="dict.dictLabel"
                                :value="dict.dictValue" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="" label-width="100px" prop="status">
                        <el-select style="width: 190px" v-model="queryParams.deviceNmae" placeholder="所有电表" clearable
                            multiple collapse-tags size="small">
                            <el-option v-for="(d, index) in areaOptions2" :key="index" :label="d.dictLabel"
                                :value="d.dictValue" />
                        </el-select>
                    </el-form-item></el-col>
                <el-col :span="6">
                    <el-form-item label="" class="flex align-center" label-width="100px">
                        <el-date-picker style="width: 320px" v-model="dateRange" format="yyyy-MM-dd HH:mm"
                            type="datetimerange" :clearable="false" range-separator="至" start-placeholder="开始日期"
                            end-placeholder="结束日期"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item>
                        <el-button type="primary" @click="handleQuery">查询
                        </el-button>
                        <el-button type="primary" @click="handleExport">导出
                        </el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <el-table border v-loading="tableLoading" :data="tableData" style="margin-top: 10px;">
            <el-table-column label="区域" align="center" prop="area" />
            <el-table-column label="点位" align="center" prop="station" />
            <el-table-column label="开始时间电表数" align="center" prop="startDL" />
            <el-table-column label="结束时间电表数" align="center" prop="endDL" />
            <el-table-column label="统计电量(KW)" align="center" prop="differ" />
        </el-table>
    </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
    name: "statistic_tj",
    data() {
        const currentDate = new Date();
        const oneDayAgo = new Date();
        oneDayAgo.setDate(currentDate.getDate() - 1);
        return {
            tableData: [],
            tableLoading: false,
            // 遮罩层
            loading: true,
            // 显示搜索条件
            areaOptions1: [],
            areaOptions2: [],
            showSearch: true,
            areaOptions: [], //区域下拉数据
            statusOptions: [], //工位下拉数据
            dateRange: [oneDayAgo, currentDate],
            queryParams: {
                type: '', //变电所
                pageNum: 1,
                pageSize: 10,
                deviceNmae: []//所有电表
            }
        };
    },
    created() {
        const currentDate = new Date();
        const oneDayAgo = new Date();
        oneDayAgo.setDate(currentDate.getDate() - 1);
        this.dateRange = [oneDayAgo, currentDate];
        this.getTableData();
        this.getDLarea();
    },
    mounted() {
    },
    methods: {
        /** 获取列表 */
        getTableData() {
            this.tableLoading = true;
            let [startTime, endTime] = this.dateRange;
            this.$api
                .PowerHistoryCount(
                    {
                        ...this.queryParams,
                        startTime: dayjs(startTime).format("YYYY-MM-DD HH:mm"),
                        endTime: dayjs(endTime).format("YYYY-MM-DD HH:mm"),
                    }
                )
                .then((res) => {
                    if (res.code === 200) {
                        this.tableData = res.data;
                        this.tableLoading = false;
                    } else {
                        console.log(`接口成功,但接口状态=${res.code}`, res);
                    }
                })
                .catch((err) => {
                    console.log("接口失败", err);
                    this.tableLoading = false;
                });
        },
        //获取区域联动
        getDLarea() {
            this.$api.DLarea().then((res) => {
                if (res.code === 200) {
                    console.log('获取区域联动接口成功', res)
                    this.areaOptions1 = res.data.map(e => {
                        return {
                            dictValue: e.name,
                            dictLabel: e.name,
                            children: e.sbm.map(s => {
                                return {
                                    dictValue: s.name,
                                    dictLabel: s.name
                                }
                            }),
                        }
                    })
                    this.queryParams.type = this.areaOptions1[0].dictValue
                    console.log(this.areaOptions1, 'areaOptions1');
                    this.queryParams.deviceNmae =this.areaOptions1[0].children.map(e => e.dictValue)
                    this.areaOptions2 = this.areaOptions1[0].children.map(e => {
                        return {
                            dictLabel: e.dictLabel,
                            dictValue: e.dictValue
                        }
                    })
                    this.getTableData()
                } else {
                    console.log(`接口成功,但接口状态=${res.code}`, res)
                }
            })
                .catch((err) => {
                    console.log('接口失败', err)
                })
        },
        /** 搜索按钮操作 */
        handleQuery() {
            this.getTableData();
        },
        //区域选择 赋值设备
        areaChange(e) {
            // this.queryParams.deviceNmae = []
            this.areaOptions2 = []
            let ddrs = this.areaOptions1.filter(a => a.dictValue === e)
            this.areaOptions2 = ddrs[0].children
            this.queryParams.deviceNmae = this.areaOptions2.map(item => item.dictValue);
        },
        /** 导出按钮操作 */
        handleExport() {
            this.$confirm('是否确认导出所有数据项?', "警告", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                let [startTime, endTime] = this.dateRange;
                return this.$api.DomPowerH(
                    {
                        ...this.queryParams,
                        startTime: dayjs(startTime).format("YYYY-MM-DD HH:mm"),
                        endTime: dayjs(endTime).format("YYYY-MM-DD HH:mm"),
                    }
                )
            }).then(response => {
                console.log('response', response)
                this.download(response.msg);
            })
        },
    },
};
</script>
<style lang="scss" scoped>
::v-deep .el-form-item {
    margin-bottom: 11px !important;
    margin-top: 11px !important;
}
</style>
