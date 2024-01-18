<template>
    <!-- 装置生产平衡分析 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="100px">
            <el-form-item label="期初日期:" prop="sDate">
                <el-date-picker v-model="queryParams.date" type="sDate" placeholder="选择期初日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="期初班次:" prop="sClasses">
                <el-select v-model="queryParams.sClasses" placeholder="请选择期初班次" clearable>
                    <el-option v-for="dict in banCi" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="期末日期:" prop="eDate">
                <el-date-picker v-model="queryParams.eDate" type="date" placeholder="选择期末日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="期末班次:" prop="eClasses">
                <el-select v-model="queryParams.eClasses" placeholder="请选择期末班次" clearable>
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
        </el-row>
        <el-table :data="tableList">
            <el-table-column label="序号" type="index" />
            <el-table-column label="装置名称" prop="tankName" key="tankName" width="150"></el-table-column>
            <el-table-column label="侧线名称" prop="tankArea" key="tankArea" width="150"></el-table-column>
            <el-table-column label="物料名称" prop="beginTime" key="beginTime"></el-table-column>
            <el-table-column label="进出" prop="endTime" key="endTime"></el-table-column>
            <el-table-column label="原始量" prop="" key="unlockTime"></el-table-column>
            <el-table-column label="原始收率" prop="tjNum" key="unlockUser" width="150"></el-table-column>
            <el-table-column label="平衡量" prop="tjNum" key="unlockUser" width="150"></el-table-column>
            <el-table-column label="平衡收率" prop="tjNum" key="unlockUser" width="150"></el-table-column>
        </el-table>
        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
            @pagination="getList" />
    </div>
</template>
<script>
export default {
    name: "PaySave",
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
            mesFactory: [
                {
                    label: '已锁定',
                    value: '1'
                },
                {
                    label: '未锁定',
                    value: '2'
                }
            ],
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
            total: 0
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
        },
        /** 查询列表 */
        getList() {
            this.loading = true;
            //主数据
            this.$api.GetQueryData().then((res) => {
                if (res.code == 200) {
                    this.dataList = res.data
                    console.log('页面主数据', this.dataList)
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
        },
        // 空提交
        handleEmptySubmit() {
        },
        // 提交
        handleSubmit() {
        },
        // 解析
        handleAnalyze() {
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


