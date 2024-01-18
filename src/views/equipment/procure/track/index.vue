<template>
    <!-- 采购跟踪-->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="80px">
            <el-form-item label="订单状态:" prop="status">
                <el-select size="mini" v-model="queryParams.status" placeholder="订单状态" clearable>
                    <el-option v-for="dict in AuditStatus" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="请购部门:" prop="department">
                <el-select size="mini" v-model="queryParams.department" placeholder="请购部门" clearable>
                    <el-option v-for="dict in RequisitionDepartment" :key="dict.value" :label="dict.label"
                        :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="采购单号:" prop="Purchasenumber">
                <el-input type="text" v-model="queryParams.Purchasenumber" maxlength="20" placeholder="采购单号"
                    clearable></el-input>
            </el-form-item>
            <el-form-item label="请购单号:" prop="requisitionnumber">
                <el-input type="text" v-model="queryParams.requisitionnumber" maxlength="20" placeholder="请购单号"
                    clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="handleQuery">搜索</el-button>
                <el-button size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table v-loading="loading" :data="dataList" @selection-change="handleSelectionChange">
            <el-table-column fixed="left" type="selection" width="50" align="center" />
            <el-table-column label="序号" fixed="left" type="index" width="50" align="center" />
            <el-table-column label="采购单号" align="center" sortable key="Purchasenumber" prop="Purchasenumber"
                :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <div :title="scope.row.Purchasenumber" class="column-name" @click="handleToDetail(scope.row.id)">
                        {{ scope.row.Purchasenumber }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="审核状态" align="center" sortable key="status" prop="status" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    {{ scope.row.status == "0" ? '未完成' : "已完成" }}
                </template>
            </el-table-column>
            <el-table-column label="订单完成时间" align="center" sortable key="Purchasetime" prop="Purchasetime"
                :show-overflow-tooltip="true" />
            <el-table-column label="关联请购单" align="center" sortable key="num" prop="num" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <div :title="scope.row.num" class="column-name" @click="handleToDetailnum(scope.row.id)">
                        {{ scope.row.num }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="请购部门" align="center" sortable key="department" prop="department"
                :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column label="请购人" align="center" sortable key="user" prop="user" :show-overflow-tooltip="true" />
            <el-table-column label="生产厂家" align="center" sortable key="manufacturer" prop="manufacturer"
                :show-overflow-tooltip="true" />
            <el-table-column label="供应商" align="center" sortable key="supplier" prop="supplier"
                :show-overflow-tooltip="true" />
            <el-table-column label="备注" align="center" sortable key="remark" prop="remark" :show-overflow-tooltip="true" />
        </el-table>
        <!-- <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
            @pagination="getList" /> -->
    </div>
</template>
<script>
export default {
    name: "track",
    components: {},
    data() {
        return {
            dataList: [
                {
                    id: 1,    //id
                    num: "XS-100010", // 订单编号
                    Purchasenumber: "HEXS-100010",
                    status: "0", // 审核状态
                    statustext: "未完成",
                    Purchasetime: "2023年12月15日",
                    Plannedtime: "2023-12-25",
                    Actualtime: "2023年12月15日",
                    department: "销售部",
                    user: "李嘉琪",
                    auditor: "王海波",
                    supplier: "施耐德",
                    manufacturer: "施耐德工厂部",
                    remark: "王海波-备注"
                }, {
                    id: 2,    //id
                    num: "JS-10012", // 订单编号
                    Purchasenumber: "HEJS-10012",
                    status: "3", // 审核状态
                    statustext: "已完成",
                    Purchasetime: "2023年12月15日",
                    Plannedtime: "2023-12-25",
                    Actualtime: "2023年12月15日",
                    department: "技术部",
                    user: "王维虎",
                    auditor: "李思",
                    supplier: "施耐德",
                    manufacturer: "施耐德工厂部",
                    remark: "李思-备注"
                }, {
                    id: 3,    //id
                    num: "ZC-100012", // 订单编号
                    Purchasenumber: "HEZC-100012",
                    status: "0", // 审核状态
                    statustext: "未完成",
                    Purchasetime: "2023年12月15日",
                    Plannedtime: "2023-12-25",
                    Actualtime: "2023年12月15日",
                    department: "总裁办",
                    user: "杜蒽",
                    auditor: "史雅",
                    supplier: "施耐德",
                    manufacturer: "施耐德工厂部",
                    remark: "史雅-备注"
                }, {
                    id: 4,    //id
                    num: "XZ-100013", // 订单编号
                    Purchasenumber: "HEXZ-100013",
                    statustext: "未完成",
                    status: "0", // 审核状态
                    Purchasetime: "2023年12月15日",
                    Plannedtime: "2023-12-25",
                    Actualtime: "2023年12月15日",
                    department: "行政部",
                    user: "施琦琦",
                    auditor: "黄涛",
                    supplier: "得力士",
                    manufacturer: "得力士工厂部",
                    remark: "黄涛-备注"
                },
                {
                    id: 5,    //id
                    num: "JS-10015", // 订单编号
                    Purchasenumber: "HEJS-10015",
                    status: "3", // 审核状态
                    statustext: "已完成",
                    Purchasetime: "2023年12月15日",
                    Plannedtime: "2023-12-25",
                    Actualtime: "2023年12月15日",
                    department: "技术部",
                    user: "东烟海",
                    auditor: "尚鹏",
                    supplier: "得力士",
                    manufacturer: "得力士工厂部",
                    remark: "尚鹏-备注"
                }
            ],
            AuditStatus: [
                {
                    label: "全部",
                    value: " "
                },
                {
                    label: "已完成",
                    value: "1"
                }, {
                    label: "未完成",
                    value: "0"
                }
            ],
            RequisitionDepartment: [ // 请购部门
                {
                    label: "全部",
                    value: "0"
                },
                {
                    label: "技术部",
                    value: "技术部"
                }, {
                    label: "销售部",
                    value: "销售部"
                }, {
                    label: "行政部",
                    value: "行政部"
                }, {
                    label: "总裁办",
                    value: "总裁办"
                }
            ],
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
            // 弹出层标题
            title: "",
            queryParams: {
                department: "0",
                requisitionnumber: "",
                Purchasenumber: "",
                status: " "
            },
            // 表单校验
            rules: {}
        };
    },
    watch: {},
    created() { },
    methods: {
        /** 搜索按钮操作 */
        handleQuery() {
            let nowData
            if (this.queryParams.department != "0") {
                nowData = this.dataList.filter((item) => {
                    return item.department == this.queryParams.department;
                });
            }
            if (this.queryParams.status != " ") {
                nowData = this.dataList.filter((item) => {
                    //接收新数组
                    return item.status == this.queryParams.status;
                });
            }
            if (this.queryParams.status == " " && this.queryParams.department == "0") {
                return this.dataList
            }
            this.dataList = nowData;
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.resetForm("queryForm");
            // this.handleQuery();
            let data = [
                {
                    id: 1,    //id
                    num: "XS-100010", // 订单编号
                    Purchasenumber: "HEXS-100010",
                    status: "0", // 审核状态
                    statustext: "未完成",
                    Purchasetime: "2023年12月15日",
                    Plannedtime: "2023-12-25",
                    Actualtime: "2023年12月15日",
                    department: "销售部",
                    user: "李嘉琪",
                    auditor: "王海波",
                    supplier: "施耐德",
                    manufacturer: "施耐德工厂部",
                    remark: "王海波-备注"
                }, {
                    id: 2,    //id
                    num: "JS-10012", // 订单编号
                    Purchasenumber: "HEJS-10012",
                    status: "3", // 审核状态
                    statustext: "已完成",
                    Purchasetime: "2023年12月15日",
                    Plannedtime: "2023-12-25",
                    Actualtime: "2023年12月15日",
                    department: "技术部",
                    user: "王维虎",
                    auditor: "李思",
                    supplier: "施耐德",
                    manufacturer: "施耐德工厂部",
                    remark: "李思-备注"
                }, {
                    id: 3,    //id
                    num: "ZC-100012", // 订单编号
                    Purchasenumber: "HEZC-100012",
                    status: "0", // 审核状态
                    statustext: "未完成",
                    Purchasetime: "2023年12月15日",
                    Plannedtime: "2023-12-25",
                    Actualtime: "2023年12月15日",
                    department: "总裁办",
                    user: "杜蒽",
                    auditor: "史雅",
                    supplier: "施耐德",
                    manufacturer: "施耐德工厂部",
                    remark: "史雅-备注"
                }, {
                    id: 4,    //id
                    num: "XZ-100013", // 订单编号
                    Purchasenumber: "HEXZ-100013",
                    statustext: "未完成",
                    status: "0", // 审核状态
                    Purchasetime: "2023年12月15日",
                    Plannedtime: "2023-12-25",
                    Actualtime: "2023年12月15日",
                    department: "行政部",
                    user: "施琦琦",
                    auditor: "黄涛",
                    supplier: "得力士",
                    manufacturer: "得力士工厂部",
                    remark: "黄涛-备注"
                },
                {
                    id: 5,    //id
                    num: "JS-10015", // 订单编号
                    Purchasenumber: "HEJS-10015",
                    status: "3", // 审核状态
                    statustext: "已完成",
                    Purchasetime: "2023年12月15日",
                    Plannedtime: "2023-12-25",
                    Actualtime: "2023年12月15日",
                    department: "技术部",
                    user: "东烟海",
                    auditor: "尚鹏",
                    supplier: "得力士",
                    manufacturer: "得力士工厂部",
                    remark: "尚鹏-备注"
                }
            ]
            this.dataList = data
        },
        // 表单重置
        reset() {
            this.resetForm("form");
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.id);
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        },
        /*跳转去详情*/
        handleToDetail(id) {
            this.$router.push({
                path: "/equipment/trackdetail",
                query: {
                    id: id,
                },
            });
        },
        /*关联采购订单跳转去详情*/
        handleToDetailnum(id) {
            this.$router.push({
                path: "/equipment/trackdetail",
                query: {
                    id: id,
                    num: 1
                },
            });
        }
    }
};
</script>
<style scope>
.column-name {
    color: #00c6ff;
    cursor: pointer;
}
</style>