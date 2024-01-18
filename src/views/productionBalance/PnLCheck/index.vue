<template>
    <!-- 移动盈亏检查 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="100px">
            <el-form-item label="日期:" prop="date">
                <el-date-picker v-model="queryParams.date" type="date" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="班次:" prop="classes">
                <el-select v-model="queryParams.classes" placeholder="请选择班次" clearable>
                    <el-option v-for="dict in banCi" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="MES工厂:" prop="mesWspId">
                <el-select v-model="queryParams.mesWspId" placeholder="请选择状态" clearable>
                    <el-option v-for="dict in mesFactory" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="handleQuery">搜索</el-button>
                <el-button size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="single"
                    @click="handleUnsubmit">解除提交</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleEmptySubmit">空提交</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="multiple"
                    @click="handleSubmit">提交</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="info" plain icon="el-icon-refresh" size="mini" @click="handleAnalyze">解析</el-button>
            </el-col>
            <el-col :offset="1" :span="15">
                移动总量:{{ otherData.totalMovement }}
                <el-divider direction="vertical"></el-divider>
                绝对偏差:{{ otherData.absoluteDeviation }}
                <el-divider direction="vertical"></el-divider>
                绝对偏差率(%):{{ otherData.absoluteDeviationRate }}
                <el-divider direction="vertical"></el-divider>
                相对偏差:{{ otherData.relativeDeviation }}
                <el-divider direction="vertical"></el-divider>
                相对偏差率(%):{{ otherData.relativeDeviationRate }}
                <el-divider direction="vertical"></el-divider>
            </el-col>
        </el-row>
        <el-table border :data="tableList">
            <el-table-column label="序号" type="index" />
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-table class="p20" border :data="props.row.SubList">
                        <el-table-column label="组" prop="GrpId" key="GrpId" width="80"></el-table-column>
                        <el-table-column label="子组" prop="SubGrpId" key="SubGrpId" width="100"></el-table-column>
                        <el-table-column label="子组偏差" prop="SgDiff" key="SgDiff" width="100"></el-table-column>
                        <el-table-column label="子组移动量" prop="SgMvVal" key="SgMvVal" width="100"></el-table-column>
                        <el-table-column label="偏差率(%)" prop="GrpErrRadio" key="GrpErrRadio" width="100"></el-table-column>
                        <el-table-column label="源节点名称" prop="SrNodeName" key="SrNodeName" width="200"></el-table-column>
                        <el-table-column label="源节点物料" prop="SrMtrlName" key="SrMtrlName" width="200"></el-table-column>
                        <el-table-column label="目的节点名称" prop="TgNodeName" key="TgNodeName" width="200"></el-table-column>
                        <el-table-column label="目的物料名称" prop="TgMtrlName" key="TgMtrlName" width="200"></el-table-column>
                        <el-table-column label="源变化量" prop="SrBegVal" key="SrBegVal" width="100"></el-table-column>
                        <el-table-column label="目的变化量" prop="GrpDiffVal" key="GrpDiffVal" width="100"></el-table-column>
                        <el-table-column label="平衡量" prop="GrpErrVal" key="GrpErrVal" width="100"></el-table-column>
                        <el-table-column label="移动开始时间" prop="MoveBegTime" key="MoveBegTime" width="180"></el-table-column>
                        <el-table-column label="移动结束时间" prop="MoveEndTime" key="MoveEndTime" width="180"></el-table-column>
                        <el-table-column label="源前量" prop="SrBegVal" key="SrBegVal" width="150"></el-table-column>
                        <el-table-column label="源前量时间" prop="SrBegTime" key="SrBegTime" width="180"></el-table-column>
                        <el-table-column label="源后量" prop="SrEndVal" key="SrEndVal" width="150"></el-table-column>
                        <el-table-column label="源后量时间" prop="SrEndTime" key="SrEndTime" width="180"></el-table-column>
                        <el-table-column label="目的前量" prop="TgBegVal" key="TgBegVal" width="150"></el-table-column>
                        <el-table-column label="目的前量时间" prop="TgBegTime" key="TgBegTime" width="180"></el-table-column>
                        <el-table-column label="目的后量" prop="TgEndVal" key="TgEndVal" width="150"></el-table-column>
                        <el-table-column label="目的后量时间" prop="TgEndTime" key="TgEndTime" width="180"></el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column label="组" prop="GrpId" key="GrpId" width="150"></el-table-column>
            <el-table-column label="组总入量" prop="GrpInVal" key="GrpInVal" width="150"></el-table-column>
            <el-table-column label="组总出量" prop="GrpOutVal" key="GrpOutVal" width="150"></el-table-column>
            <el-table-column label="组存差" prop="GrpDiffVal" key="GrpDiffVal"></el-table-column>
            <el-table-column label="组移动总量" prop="GrpMvsumVal" key="GrpMvsumVal" width="150"></el-table-column>
            <el-table-column label="组偏差" prop="GrpErrVal" key="GrpErrVal"></el-table-column>
            <el-table-column label="偏差率" prop="GrpErrRadio" key="GrpErrRadio"></el-table-column>
            <el-table-column label="周期开始时间" prop="PeriBegTime" key="PeriBegTime"></el-table-column>
            <el-table-column label="周期结束时间" prop="PeriEndTime" key="PeriEndTime"></el-table-column>

        </el-table>
        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
            @pagination="getList" />
    </div>
</template>
<script>
export default {
    name: "PnLCheck",
    data() {
        return {
            banCi: [{
                label: "白班|08:00:00-20:00:00",
                value: "0"
            }, {
                label: "夜班|20:00:00-08:00:00",
                value: "1"
            }],
            //mes工厂下拉列表
            mesFactory: [],
            //页签选中项
            activeName: '1',
            // 查询参数
            queryParams: {
                "isAsc": "",
                "pageNum": 1,
                "pageSize": 10,
                "mesWspId": "",
                "mesFctrName": "",
                "nodeAreaCode": "",
                "unitAreaName": "",
                "reasonable": true,
                "orderByColumn": "",
                "unitAreaAlias": "",
            },
            //tabs 高度
            tabsHeight: 500,
            tableList: [],
            total: 0,
            otherData: {
                totalMovement: 0, //移动总量
                absoluteDeviation: 0, //移动偏差
                absoluteDeviationRate: 0, //移动偏差率
                relativeDeviation: 0, //相对偏差
                relativeDeviationRate: 0, //相对偏差率
            }
        };
    },
    watch: {},
    created() {
        this.getList();
        this.getOther();
    },
    mounted() {
        // 获取当前页面的高度
        var pageHeight = window.innerHeight;
        console.log('pageHeight: ' + pageHeight)
        // 计算 <div> 的最大高度，可根据需要进行调整
        var maxDivHeight = pageHeight - 180; // 减去 100px 的边距
        this.tabsHeight = maxDivHeight
    },
    methods: {
        getOther() {
            //班次下拉数据
            this.$api.classes().then(res => {
                this.banCi = res.data.map(r => {
                    return {
                        label: r.ShiftText,
                        value: r.ShiftId,
                    }
                })
            })
            //工厂下拉数据
            this.$api.i_MESFactoryAllList().then(res => {
                this.mesFactory = res.data.map(e => {
                    return {
                        label: e.mesFctrName,
                        value: e.mesFctrId
                    }
                })
            })
        },
        /** 查询列表 */
        getList() {
            this.loading = true;
            //主数据
            this.$api.AssemblyErrorCheckDataSet().then((res) => {
                if (res.code == 200) {
                    this.tableList = res.data
                    console.log('查询列表',this.tableList)
                    console.table(this.tableList)
                    this.loading = false;
                }
            }).catch(err => {
                this.loading = false;
            })
        },

        /** 搜索按钮操作 */
        handleQuery() {
            this.queryParams.pageNum = 1;
            this.getList();
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.resetForm("queryForm");
            this.handleQuery();
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.MtrlMoveDataId);
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        },
        // 解除提交
        handleUnsubmit() {
            this.msgSuccess("解除提交成功");
        },
        // 空提交
        handleEmptySubmit() {
            this.msgSuccess("空提交成功");
        },
        // 提交
        handleSubmit() {
            this.msgSuccess("提交成功");
        },
        // 解析
        handleAnalyze() {
            this.msgSuccess("解析成功");
        },
        /** 删除按钮操作 */
        handleDelete(row) {
            const userIds = row.id || this.ids[0];
            this.$modal.confirm('是否确认删除"' + this.ids + '"的数据项？').then(() => {

            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => {
            });
        },
        //只展开一行
        expandColumn(row, expandedRows) {
            // 每次只展开一行
            let that = this;
            if (expandedRows.length) {
                that.expands = []
                if (row) {
                    that.expands.push(row.MtrlMoveDataId)
                    this.single = false;
                }
            } else {
                that.expands = []
                this.single = true;
            }
        },
    }
};
</script>
<style scoped>
.app-container {
    width: 100%;
    height: calc(100vh - 90px);
    min-height: calc(100vh - 90px);
    overflow-y: auto;
}

::v-deep .el-tabs__content {
    height: calc(100% - 60px);
}

::v-deep .pagination-container {
    padding: 0 !important;
}
</style>

