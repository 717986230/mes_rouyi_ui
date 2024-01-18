<template>
    <!-- MES工厂数据锁定机制 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="100px">
            <el-form-item label="MES工厂:" style="margin-left: -20px;" prop="mesFctrId">
                <el-select v-model="queryParams.mesFctrId" placeholder="MES工厂" clearable>
                    <el-option v-for="dict in FactoryList" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="日期:" style="margin-left: -20px;" prop="time">
                <el-date-picker v-model="queryParams.time" type="date" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" plain size="mini" @click="handleQuery">查询</el-button>
                <el-button size="mini" plain @click="resetQuery">重置</el-button>
                <el-button type="danger" plain size="mini" @click="handleDelete"
                    :disabled="single && single1">删除</el-button>
            </el-form-item>
        </el-form>
        <el-tabs v-model="queryParams.type" @tab-click="handleClick">
            <el-tab-pane label="工厂数据" name="1">
                <el-table border v-loading="loading" :data="tableDate" @selection-change="handleSelectionChange">
                    <el-table-column fixed="left" type="selection" width="50" align="center" />
                    <el-table-column label="开始时间" align="center" key="strTime" prop="strTime">
                        <template slot-scope="scope">
                            {{ scope.row.strTime }}
                        </template>
                    </el-table-column>
                    <el-table-column label="结束时间" sortable align="center" key="endTime" prop="endTime"
                        :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            {{ scope.row.endTime }}
                        </template>
                    </el-table-column>
                    <el-table-column label="提交时间" sortable align="center" key="subTime" prop="subTime"
                        :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            {{ scope.row.subTime }}
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" sortable align="center" key="status" prop="status"
                        :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            {{ scope.row.status == 0 ? "未提交" : "已提交" }}
                        </template>
                    </el-table-column>
                </el-table>
                <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                    :limit.sync="queryParams.pageSize" @pagination="getList" />
            </el-tab-pane>
            <el-tab-pane label="仓库名称" name="2">
                <el-table border v-loading="loading" :data="tableDate" @selection-change="handleSelectionChange1">
                    <el-table-column fixed="left" type="selection" width="50" align="center" />
                    <el-table-column label="开始时间" align="center" key="strTime" prop="strTime">
                        <template slot-scope="scope">
                            {{ scope.row.strTime }}
                        </template>
                    </el-table-column>
                    <el-table-column label="结束时间" sortable align="center" key="endTime" prop="endTime"
                        :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            {{ scope.row.endTime }}
                        </template>
                    </el-table-column>
                    <el-table-column label="仓库名称" sortable align="center" key="warehouseName" prop="warehouseName"
                        :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column label="提交时间" sortable align="center" key="subTime" prop="subTime"
                        :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            {{ scope.row.subTime }}
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" sortable align="center" key=" status" prop=" status"
                        :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            {{ scope.row.status == 0 ? "未提交" : "已提交" }}
                        </template>
                    </el-table-column>
                </el-table>
                <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                    :limit.sync="queryParams.pageSize" @pagination="getList" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
export default {
    name: "FactoryDataLockingMechanism",
    data() {
        return {
            loading: true,
            total: 0,
            FactoryList: [],//mes工厂
            ids: [],
            ids1: [],
            single: true,
            single1: true,
            // 查询参数
            queryParams: {
                "id": undefined,
                "isAsc": "",
                "orderByColumn": "",
                "pageNum": 1,
                "pageSize": 10,
                "reasonable": true,
                "time": new Date(),
                "mesFctrId": '1',
                "type": "1",
            },
            // 表单校验
            rules: {},
            tableDate: [],//查询列表数据
        };
    },
    watch: {},
    computed: {},
    created() {
        this.getOther();
        this.getList();
    },
    methods: {
        handleClick(tab, event) {
            this.queryParams.type = tab.name
            this.getList();
        },
        getOther() {
            //工厂下拉列表
            this.$api.i_MESFactoryAllList().then(res => {
                this.FactoryList = res.data.map(e => {
                    return {
                        label: e.mesFctrName,
                        value: e.mesFctrId
                    }
                })
            })
        },
        /** 查询用户列表 */
        getList() {
            this.loading = true;
            this.$api.P_MESLockSelect({
                "mesFctrId": this.queryParams.mesFctrId,
                "time": JSON.stringify(new Date(this.queryParams.time)).slice(1, 11),
                "type": Number(this.queryParams.type)
            }).then(res => {
                this.tableDate = res.rows
            })
            this.loading = false;
        },
        /** 搜索按钮操作 */
        handleQuery() {
            this.queryParams.pageNum = 1;
            this.getList();
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.$refs['queryForm'].resetFields();
            this.queryParams = {
                ...this.queryParams,
            }
            this.handleQuery();
        },
        /** 删除按钮操作 */
        handleDelete(row) {
            const userIds = row.id || this.ids[0] || this.ids1[0];
            this.$modal.confirm('是否确认删除"' + userIds + '"的数据项？').then(() => {
                this.$api.P_MESLockDelete({ id: userIds, type: Number(this.queryParams.type) })
            }).then(() => {
                setTimeout(() => {
                    this.getList();
                }, 200);
                this.$modal.msgSuccess("删除成功");
            }).catch(() => { });
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.id);
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        },
        handleSelectionChange1(selection) {
            this.ids1 = selection.map(item => item.id);
            this.single1 = selection.length != 1;
            this.multiple1 = !selection.length;
        },
    }
};
</script>
<style lang="scss" scoped>
::v-deep .el-card__body {
    padding: 10px 10px 50px 10px !important;
}

.selectedtop {
    background-color: rgb(175, 175, 175);
    color: white;
}
</style>
