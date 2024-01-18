<template>
    <!-- 实物转换 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="100px">
            <el-form-item label="MES工厂:" style="margin-left: -20px;" prop="mesFctrId">
                <el-select size="mini" v-model="queryParams.mesFctrId" placeholder="MES工厂" clearable>
                    <el-option v-for="dict in FactoryList" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item size="mini" label="起始时间:" style="margin-left: -20px;" prop="strTime">
                <el-date-picker v-model="queryParams.strTime" type="datetime" format="yyyy-MM-dd" placeholder="起始时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item size="mini" label="截止时间:" style="margin-left: -20px;" prop="endTime">
                <el-date-picker v-model="queryParams.endTime" type="datetime" format="yyyy-MM-dd" placeholder="截止时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" plain size="mini" @click="handleQuery">查询</el-button>
                <el-button type="success" plain size="mini" @click="handleConvert">转换</el-button>
                <el-button type="success" plain size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table border v-loading="loading" :data="tableDate" @selection-change="handleSelectionChange">
            <el-table-column fixed="left" type="selection" width="50" align="center" />
            <el-table-column label="装卸台名称" align="center" key="name" prop="name">
            </el-table-column>
            <el-table-column label="标识" align="center" key="id" prop="id">
            </el-table-column>
            <el-table-column label="物料" align="center" key="mtrl" prop="mtrl">
            </el-table-column>
            <el-table-column label="罐收(付)量" align="center" key="singleQuantity" prop="singleQuantity">
            </el-table-column>
            <el-table-column label="统计量" align="center" key="measure" prop="measure">
            </el-table-column>
            <el-table-column label="计量单量" sortable align="center" key="countMeasure" prop="countMeasure"
                :show-overflow-tooltip="true">
            </el-table-column>
        </el-table>
        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
            @pagination="getList" />
    </div>
</template>
<script>
export default {
    name: "PhysicalConversion",
    data() {
        return {
            // 遮罩层
            loading: false,
            // 选中数组
            ids: [],
            // 非单个禁用
            single: true,
            // 非多个禁用
            multiple: true,
            // 总条数
            total: 0,
            FactoryList: [],//mes工厂
            tableDate: [],
            // 表单参数
            form: {},
            // 查询参数
            queryParams: {
                "endTime": new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
                "mesFctrId": "1",
                "strTime": new Date()
            },
            // 表单校验
            rules: {},
        };
    },
    watch: {},
    created() {
        this.getOther()
        this.getList()
    },
    methods: {
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
        //转换
        handleConvert() {
            this.$message.success("转换")
        },
        /** 查询用户列表 */
        getList() {
            this.loading = true
            this.$api.P_physicalConversionSelect({
                "endTime": JSON.stringify(new Date(this.queryParams.endTime)).slice(1, 11),
                "strTime": JSON.stringify(new Date(this.queryParams.strTime)).slice(1, 11),
                "mesFctrId": this.queryParams.mesFctrId,
            }).then(res => {
                this.tableDate = res.rows
                this.total = res.total
            }
            );
            this.loading = false;
        },
        /** 搜索按钮操作 */
        handleQuery() {
            this.queryParams.pageNum = 1
            this.getList();
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.$refs['queryForm'].resetFields();
            this.handleQuery();
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.id);
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        },
    }
};
</script>
