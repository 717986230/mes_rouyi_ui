<template>
    <!--备品备件申领-->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="80px" @submit.native.prevent>
            <el-form-item label="申领日期:" prop="requisitionDate">
                <el-date-picker v-model="queryParams.requisitionDate" type="datetime" placeholder="申领日期" style="width: 100%"
                    clearable>
                </el-date-picker>
            </el-form-item>
            <el-form-item label="审核状态:" prop="status">
                <el-select size="mini" v-model="queryParams.status" placeholder="审核状态" clearable>
                    <el-option v-for="dict in AuditStatus" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="申领部门:" prop="department">
                <el-select size="mini" v-model="queryParams.department" placeholder="申领部门" clearable>
                    <el-option v-for="dict in RequisitionDepartment" :key="dict.value" :label="dict.label"
                        :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="申领单号:" prop="num">
                <el-input type="text" v-model="queryParams.num" maxlength="20" placeholder="申领单号" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="handleQuery">搜索</el-button>
                <el-button size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button type="success" size="mini" plain @click="handleAdd">新增</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="info" plain size="mini" @click="handleUpdate" :disabled="single">修改</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="danger" plain size="mini" :disabled="single" @click="handleDelete">删除</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="primary" plain size="mini" :disabled="single" @click="handleSubmit">提交</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="danger" plain size="mini" :disabled="single" @click="handleRevocation">撤回</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="success" plain size="mini" :disabled="single" @click="handlePass">通过</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="danger" plain size="mini" :disabled="single" @click="handleTurndown">驳回</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="primary" plain size="mini" @click="handleImport">导入</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="primary" plain size="mini" @click="handleExport">导出</el-button>
            </el-col>
        </el-row>
        <el-table v-loading="loading" :data="dataList" @selection-change="handleSelectionChange">
            <el-table-column fixed="left" type="selection" width="50" align="center" />
            <el-table-column label="序号" fixed="left" type="index" width="50" align="center" />
            <el-table-column label="申领单号" align="center" key="num" prop="num" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <div :title="scope.row.num" class="column-name" @click="handleToDetail(scope.row.id)">
                        {{ scope.row.num }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="申领类型" align="center" key="Claimtype" prop="Claimtype" :show-overflow-tooltip="true" />
            <el-table-column label="关联工单" align="center" key="Associatedorder" prop="Associatedorder"
                :show-overflow-tooltip="true" />
            <el-table-column label="审核状态" align="center" key="statustext" prop="statustext" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    {{ scope.row.status == 1 ? '未提交' : scope.row.status == 2 ? '审核通过' : scope.row.status == 3 ? "已撤回" :
                        scope.row.status == 4 ? "未审核" : scope.row.status == 5 ? "驳回" : "" }}
                </template>
            </el-table-column>
            <el-table-column label="申领时间" align="center" key="Purchasetime" prop="Purchasetime"
                :show-overflow-tooltip="true" />
            <el-table-column label="计划领用时间" align="center" key="Plannedtime" prop="Plannedtime"
                :show-overflow-tooltip="true" />
            <el-table-column label="实际领用时间" align="center" key="Actualtime" prop="Actualtime"
                :show-overflow-tooltip="true" />
            <el-table-column label="申领部门" align="center" key="department" prop="department" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column label="申领人" align="center" key="user" prop="user" :show-overflow-tooltip="true" />
        </el-table>
        <!-- <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
            @pagination="getList" /> -->
        <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body>
            <el-upload ref="upload" :limit="1" accept=".xlsx, .xls" :headers="upload.headers"
                :action="upload.url + '?updateSupport=' + upload.updateSupport" :disabled="upload.isUploading"
                :on-progress="handleFileUploadProgress" :on-success="handleFileSuccess" :auto-upload="false" drag>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip text-center" slot="tip">
                    <span>仅允许导入xls、xlsx格式文件。</span>
                    <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;"
                        @click="importTemplate">下载模板</el-link>
                </div>
            </el-upload>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitFileForm">确 定</el-button>
                <el-button @click="upload.open = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { getToken } from "@/utils/auth";
export default {
    name: "spareGet",
    components: {},
    data() {
        return {
            dataList: [
                {
                    id: 1,    //id
                    Claimtype: "维修领用",
                    Associatedorder: "维修单号1",
                    num: "PNQG-20023", // 订单编号
                    status: 1, // 审核状态
                    statustext: "未提交", // 审核状态
                    Purchasetime: "2023年11月31日",
                    Plannedtime: "2023-12-01",
                    Actualtime: "2023年12月15日",
                    department: "技术部",
                    user: "杨波",
                    auditor: "王帆",
                    remark: "王帆-备注"
                }, {
                    id: 2,    //id
                    Claimtype: "维护领用",
                    Associatedorder: "维修单号2",
                    num: "PNQG-20024", // 订单编号
                    status: 5, // 审核状态
                    statustext: "未审核", // 审核状态
                    Purchasetime: "2023年12月15日",
                    Plannedtime: "2023-11-20",
                    Actualtime: "2023年12月24日",
                    department: "行政部",
                    user: "李丽",
                    auditor: "石昊",
                    remark: "石昊-备注"
                }, {
                    id: 3,    //id
                    num: "PNQG-20025", // 订单编号
                    status: 3, // 审核状态
                    Claimtype: "维护领用",
                    Associatedorder: "维修单号3",
                    statustext: "已撤回", // 审核状
                    Purchasetime: "2023年12月23日",
                    Plannedtime: "2023-12-23",
                    Actualtime: "2023年12月28日",
                    department: "销售部",
                    user: "石晓雅",
                    auditor: "伊月",
                    remark: "伊月-备注"
                }, {
                    id: 4,    //id
                    num: "PNQG-20026", // 订单编号
                    status: 2, // 审核状态
                    Claimtype: "维修领用",
                    Associatedorder: "维修单号1",
                    statustext: "审核通过", // 审核状态
                    Purchasetime: "2023年12月20日",
                    Plannedtime: "2023-12-25",
                    Actualtime: "2023年12月29日",
                    department: "行政部",
                    user: "南柠",
                    auditor: "蓝泉",
                    remark: "蓝泉-备注"
                },
                {
                    id: 5,    //id
                    Claimtype: "备用领用",
                    Associatedorder: "维修单号4",
                    num: "PNQG-20027", // 订单编号
                    status: 4, // 审核状态
                    statustext: "驳回", // 审核状态
                    Purchasetime: "2023年12月13日",
                    Plannedtime: "2023-12-25",
                    Actualtime: "2023年12月29日",
                    department: "总裁办",
                    user: "李海",
                    auditor: "胡南",
                    remark: "胡南-备注"
                }
            ],
            AuditStatus: [
                {
                    label: "全部",
                    value: "0"
                },
                {
                    label: "未提交",
                    value: "1"
                }, {
                    label: "审核通过",
                    value: "2"
                }, {
                    label: "已撤回",
                    value: "3"
                }, {
                    label: "未审核",
                    value: "4"
                }, {
                    label: "驳回",
                    value: "5"
                },

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
                    label: "行政部",
                    value: "行政部"
                }, {
                    label: "总裁办",
                    value: "总裁办"
                }, {
                    label: "销售部",
                    value: "销售部"
                },
                {
                    label: "后勤部",
                    value: "后勤部"
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
            total: 0,
            title: "",
            open: false,
            upload: {
                // 是否显示弹出层（用户导入）
                open: false,
                // 弹出层标题（用户导入）
                title: "",
                // 是否禁用上传
                isUploading: false,
                // 是否更新已经存在的用户数据
                updateSupport: 0,
                // 设置上传的请求头部
                headers: { Authorization: "Bearer " + getToken() },
                // 上传的地址
                url: process.env.VUE_APP_BASE_API + ""
            },
            // 查询参数
            queryParams: {
                requisitionDate: new Date(),
                department: "0",
                num: "",
                status: "0"
            },
            // 表单校验
            rules: {

            },
        };
    },
    watch: {},
    created() {
        this.total = this.dataList.length
    },
    methods: {
        // 取消按钮
        cancel() {
            this.open = false;
            this.reset();
        },
        // 表单重置
        reset() {
            this.resetForm("form");
        },
        /** 搜索按钮操作 */
        handleQuery() {
            let nowData
            if (this.queryParams.department != "0") {
                nowData = this.dataList.filter((item) => {
                    return item.department == this.queryParams.department;
                });
            }
            if (this.queryParams.status != "0") {
                nowData = this.dataList.filter((item) => {
                    //接收新数组
                    return item.status == this.queryParams.status;
                });
            }
            if (this.queryParams.num) {
                nowData = this.dataList.filter((item) => {
                    return item.num == this.queryParams.num;
                });
            }
            if (this.queryParams.department == "0" && this.queryParams.status == "0" && this.queryParams.num == "") {
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
                    Claimtype: "维修领用",
                    Associatedorder: "维修单号1",
                    num: "QG-20023", // 订单编号
                    status: 1, // 审核状态
                    statustext: "未提交", // 审核状态
                    Purchasetime: "2023年12月15日",
                    Plannedtime: "2023-12-25",
                    Actualtime: "2023年12月15日",
                    department: "技术部",
                    user: "杨波",
                    auditor: "王帆",
                    remark: "王帆-备注"
                }, {
                    id: 2,    //id
                    Claimtype: "维护领用",
                    Associatedorder: "维修单号2",
                    num: "QG-20024", // 订单编号
                    status: 4, // 审核状态
                    statustext: "未审核", // 审核状态
                    Purchasetime: "2023年12月15日",
                    Plannedtime: "2023-12-25",
                    Actualtime: "2023年12月15日",
                    department: "行政部",
                    user: "李丽",
                    auditor: "石昊",
                    remark: "石昊-备注"
                }, {
                    id: 3,    //id
                    num: "QG-20025", // 订单编号
                    status: 3, // 审核状态
                    Claimtype: "维护领用",
                    Associatedorder: "维修单号3",
                    statustext: "已撤回", // 审核状
                    Purchasetime: "2023年12月15日",
                    Plannedtime: "2023-12-25",
                    Actualtime: "2023年12月15日",
                    department: "销售部",
                    user: "石晓雅",
                    auditor: "伊月",
                    remark: "伊月-备注"
                }, {
                    id: 4,    //id
                    num: "QG-20026", // 订单编号
                    status: 2, // 审核状态
                    Claimtype: "维修领用",
                    Associatedorder: "维修单号1",
                    statustext: "审核通过", // 审核状态
                    Purchasetime: "2023年12月15日",
                    Plannedtime: "2023-12-25",
                    Actualtime: "2023年12月15日",
                    department: "行政部",
                    user: "南柠",
                    auditor: "蓝泉",
                    remark: "蓝泉-备注"
                },
                {
                    id: 5,    //id
                    Claimtype: "备用领用",
                    Associatedorder: "维修单号4",
                    num: "QG-20027", // 订单编号
                    status: 5, // 审核状态
                    statustext: "驳回", // 审核状态
                    Purchasetime: "2023年12月15日",
                    Plannedtime: "2023-12-25",
                    Actualtime: "2023年12月15日",
                    department: "总裁办",
                    user: "李海",
                    auditor: "胡南",
                    remark: "胡南-备注"
                }
            ]
            this.dataList = data
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.id);
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        },
        /** 新增按钮操作 */
        handleAdd() {
            this.$router.push("/equipment/spareGetadd");
        },
        //修改
        handleUpdate() {
            let nowData = this.dataList.filter((item) => {
                return item.id == this.ids[0];
            })[0];
            this.$router.push({
                path: "/equipment/spareGetadd",
                query: {
                    id: nowData.id,
                },
            });
        },
        /*跳转去详情*/
        handleToDetail(id) {
            this.$router.push({
                path: "/equipment/spareGetdetail",
                query: {
                    id: id,
                },
            });
        },
        handleSubmit() {
            //提交
            let yid = this.ids[0]
            let gaidata = this.dataList.find(m => m.id == yid)
            gaidata.status = 4
            // 提交
            this.$message.success("提交成功")
        },
        handleRevocation() {
            let yid = this.ids[0]
            let gaidata = this.dataList.find(m => m.id == yid)
            gaidata.status = 3
            //撤回
            this.$message.success("撤回成功")
        },
        handlePass() {
            //通过
            let yid = this.ids[0]
            let gaidata = this.dataList.find(m => m.id == yid)
            gaidata.status = 2
            this.$message.success("通过成功")
        },
        handleTurndown() {
            //驳回
            let yid = this.ids[0]
            let gaidata = this.dataList.find(m => m.id == yid)
            gaidata.status = 1
            this.$message.success("驳回成功")
        },
        /** 删除按钮操作 */
        handleDelete() {
            if (this.ids.length === 0) {
                this.$message.warning('请选择要删除的数据');
                return;
            }
            // Show a confirmation dialog
            this.$confirm('确认删除选中的数据吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // Filter out the selected items from the dataList
                this.dataList = this.dataList.filter(item => !this.ids.includes(item.id));

                // Provide feedback
                this.$message.success('删除成功');

                // Reset the selection
                this.ids = [];
            }).catch(() => {
                // User canceled the deletion
                this.$message.info('已取消删除');
            });
        },
        /** 导出按钮操作 */
        handleExport() {
            this.download('energy/basicCalculateUnit/export', {
                ...this.queryParams
            }, `测量点组态_${new Date().getTime()}.xlsx`)
        },
        /** 导入按钮操作 */
        handleImport() {
            this.upload.title = "数据导入";
            this.upload.open = true;
        },
        /** 下载模板操作 */
        importTemplate() {
            this.download('energy/basicCalculateUnit/export', {
            }, `测量点组态_${new Date().getTime()}.xlsx`)
        },
        // 文件上传中处理
        handleFileUploadProgress(event, file, fileList) {
            this.upload.isUploading = true;
        },
        // 文件上传成功处理
        handleFileSuccess(response, file, fileList) {
            this.upload.open = false;
            this.upload.isUploading = false;
            this.$refs.upload.clearFiles();
            this.$alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + response.msg + "</div>", "导入结果", { dangerouslyUseHTMLString: true });
            this.getList();
        },
        // 提交上传文件
        submitFileForm() {
            this.$refs.upload.submit();
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