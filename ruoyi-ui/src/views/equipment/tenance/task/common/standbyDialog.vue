<template>
        <el-row :gutter="20">
            <el-col :span="24" :xs="24">
                <el-form :model="queryParams" ref="queryForm" size="small" :inline="true"  label-width="80px">
                    <el-form-item label="备件名称" prop="InventoryName">
                        <el-input v-model="queryParams.InventoryName" placeholder="请输入备件名称" clearable style="width: 240px"
                        />
                    </el-form-item>
                    <el-form-item label="备件编码" prop="code">
                        <el-input v-model="queryParams.code" placeholder="请输入备件编码" clearable style="width: 240px"
                        />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
                    </el-form-item>
                </el-form>
                <el-table ref="standbyTable" v-loading="loading" :data="tableData" @selection-change="handleSelectionChange">
                    <el-table-column fixed="left" type="selection" width="50" align="center" />
                    <el-table-column fixed="left" label="序号"  type="index" width="50" align="center" />
                    <el-table-column label="备件名称" align="center" sortable key="spareName" prop="spareName" :show-overflow-tooltip="true" />
                    <el-table-column label="备件编号" align="center" sortable key="code" prop="code"
                                     :show-overflow-tooltip="true" />
                    <el-table-column label="规格型号" align="center" sortable key="model" prop="model" :show-overflow-tooltip="true" />
                    <el-table-column label="备件类型" align="center" sortable key="SpareType" prop="SpareType" :show-overflow-tooltip="true" />
                    <el-table-column label="单位" align="center" sortable key="unit" prop="unit" />
                    <el-table-column label="库存总数" align="center" sortable key="total" prop="total" width="120" />
                </el-table>
                <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
                            @pagination="getList" />
            </el-col>
            <el-col :span="24" :xs="24" class="flex justify-center align-center " style="height: 80px">
                <el-button type="success" size="mini" :disabled="ids.length==0" @click="handleConfirm">确认</el-button>
                <el-button type="info"  size="mini" @click="handleCancel">取消</el-button>
            </el-col>
        </el-row>
</template>

<script>
import { deptTreeSelect } from "@/api/system/user";
import _ from 'lodash';
import { getToken } from "@/utils/auth";
export default {
    name: "standbyDialog",
    data() {
        return {
            //遮罩层
            loading: false,
            // 是否显示搜索
            showSearch: true,
            //列表数据
            tableData: [],
            // 双项绑定search
            queryParams: {
                InventoryName:'',
                code:'',
                pageNum: 1,
                pageSize: 10,
            },
            total: 0,
            // 选中数组
            ids: [],
        };
    },
    created() {
        this.getList();
    },
    methods: {
        /** 查询列表 */
        getList() {
            this.loading = true;
            this.$api.spareList(this.queryParams).then(response => {
                    this.tableData = response.data
                    this.total = response.total;
                    this.loading = false;
                }
            );
        },
        // 表单重置
        reset() {
            this.resetForm("form");
        },
        /** 搜索按钮操作 */
        handleQuery: _.debounce(function () {
            this.queryParams.pageNum = 1;
            this.getList();
        }, 1000),
        /** 重置按钮操作 */
        resetQuery() {
            this.resetForm("queryForm");
            this.queryParams.deptId = undefined;
            this.handleQuery();
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection
        },
        //
        handleConfirm(){
            this.$emit('selectStandby',this.ids)
            this.ids = []
            this.$refs.standbyTable.clearSelection()
        },
        handleCancel(){
            this.$emit('cancel');
            this.ids = []
            this.$refs.standbyTable.clearSelection()
        }
    }
};
</script>
<style lang="scss" scoped>

</style>