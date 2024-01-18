<template>
    <!--巡检条目-->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="80px" @submit.native.prevent>

            <el-form-item label="条目名称:" prop="num">
                <el-input type="text" v-model="queryParams.num" maxlength="20" placeholder="条目名称" clearable
                    @keyup.enter.native="handleQuery"></el-input>
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
                <el-button type="primary" plain size="mini" @click="handleImport">导入</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="primary" plain size="mini" @click="handleExport">导出</el-button>
            </el-col>
        </el-row>
        <el-table v-loading="loading" :data="dataList" @selection-change="handleSelectionChange">
            <el-table-column fixed="left" type="selection" width="50" align="center" />
            <el-table-column label="序号" fixed="left" type="index" width="50" align="center" />
            <el-table-column label="巡检条目名称" align="center" key="name" prop="name" :show-overflow-tooltip="true" />
            <el-table-column label="巡检条目编号" align="center" key="num" prop="num" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column label="条目内容" align="center" key="Associatedorder" prop="Associatedorder"
                :show-overflow-tooltip="true" />
            <el-table-column label="创建人" align="center" key="user" prop="user" :show-overflow-tooltip="true" />
            <el-table-column label="创建时间" align="center" key="Plannedtime" prop="Plannedtime" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    {{ dayjs(scope.row.Plannedtime).format('YYYY-MM-DD') }}
                </template>
            </el-table-column>
            <el-table-column label="是否启用" align="center" key="useFlag" prop="useFlag" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <el-checkbox disabled true-label="1" false-label="0" v-model="scope.row.useFlag"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="备注" align="center" key="remark" prop="remark" :show-overflow-tooltip="true">
            </el-table-column>
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
        <el-dialog title="巡检条目信息" :visible.sync="openadd" width="66%" append-to-body>
            <div slot="header" class="clearfix">
                <span>巡检条目信息</span>
            </div>
            <el-form ref="formForm" :model="formForm" label-width="120px" :rules="rulesForm">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="巡检条目名称:" prop="name">
                            <el-input v-model="formForm.name" placeholder="巡检条目名称" type="text" maxlength="30"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="巡检条目编码:" prop="num">
                            <el-input v-model="formForm.num" placeholder="巡检条目编码" :disabled="this.routerId"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="创建人:" prop="user">
                            <el-input v-model="formForm.user" placeholder="创建人" type="text" maxlength="30"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="创建时间:" prop="Plannedtime">
                            <el-date-picker v-model="formForm.Plannedtime" type="datetime" format="yyyy-MM-dd"
                                placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="条目内容:" prop="Associatedorder">
                            <el-input v-model="formForm.Associatedorder" placeholder="条目内容"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="18">
                        <el-form-item label="是否启用:" prop="useFlag">
                            <el-radio v-model="formForm.useFlag" label="1">是</el-radio>
                            <el-radio v-model="formForm.useFlag" label="0">否</el-radio>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="备注:" prop="remark">
                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" v-model="formForm.remark"
                                placeholder="备注"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer clearfixfooter">
                <el-button type="primary" @click="submitFormFormula">保 存</el-button>
                <el-button @click="openadd = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { getToken } from "@/utils/auth";
export default {
    name: "ition_tm",
    components: {},
    data() {
        return {
            openadd: false,
            formForm: {
                useFlag: "1",
                Plannedtime: new Date()
            },
            dataList: [
                {
                    id: 1,    //id
                    useFlag: "1",
                    name: "维修领用",
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
                    useFlag: "1",

                    name: "维护领用",
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
                    useFlag: "0",
                    id: 3,    //id
                    num: "PNQG-20025", // 订单编号
                    status: 3, // 审核状态
                    name: "维护领用",
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
                    useFlag: "1",
                    id: 4,    //id
                    num: "PNQG-20026", // 订单编号
                    status: 2, // 审核状态
                    name: "维修领用",
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
                    useFlag: "0",
                    id: 5,    //id
                    name: "备用领用",
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
            rules: {},
            rulesForm: {
                name: [{ required: true, message: "请输入名称", trigger: "blur" }],
                num: [{ required: true, message: "请输入编号", trigger: "blur" }],
                useFlag: [{ required: true, message: "请选择是否启用", trigger: "change" }],
                remark: [{ required: true, message: "请输入内容", trigger: "blur" }]
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
            if (this.queryParams.num != "") {
                nowData = this.dataList.filter((item) => {
                    return item.num == this.queryParams.num;
                });
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
                    name: "维修领用",
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
                    name: "维护领用",
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
                    name: "维护领用",
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
                    name: "维修领用",
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
                    name: "备用领用",
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
            this.formForm = {
                useFlag: "1",
                Plannedtime: new Date()
            }
            this.openadd = true
        },
        //修改
        handleUpdate() {
            let ids = this.ids[0];
            let newD = this.dataList.find(m => m.id == ids)
            this.formForm = newD
            this.openadd = true
        },
        submitFormFormula() {
            this.$refs["formForm"].validate(valid => {
                if (valid) {
                    this.dataList.unshift(this.formForm)
                    this.openadd = false
                    this.$message.success("保存成功")
                }
            })
        },
        close() {
            done()
        },
        handleSubmit() {
            //提交
            let yid = this.ids[0]
            let gaidata = this.dataList.find(m => m.id == yid)
            gaidata.status = 4
            // 提交
            this.$message.success("提交成功")
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
        },
        /** 提交按钮 */
        handlePicture(row) {
            this.filesDialog = {
                type: 'imgs', // files || imgs
                data: [
                    {
                        url: require('@/assets/images/equipment/img.png')
                    },
                    {
                        url: require('@/assets/images/equipment/img.png')
                    },
                    {
                        url: require('@/assets/images/equipment/img.png')
                    },
                    {
                        url: require('@/assets/images/equipment/img.png')
                    }
                ],
                title: '设备图片',
                visible: true,
                width: '800px',
            }
        },
        /** 文档按钮 */
        handleDocument() {
            this.filesDialog = {
                type: 'files', // files || imgs
                data: [
                    {
                        type: 'word',
                        name: 'Word文档1',
                        url: require('@/assets/images/equipment/img.png'),
                        fileUrl: 'http://192.168.8.59:10300/statics/2024/01/04/测试word文档_20240104154542A006.docx',
                        fileType: 'docx',
                        fileName: '测试word文档_20240104154542A006.docx'
                    },
                    {
                        type: 'excel',
                        name: 'excel文档1',
                        url: require('@/assets/images/equipment/img.png'),
                        fileUrl: 'http://192.168.8.59:10300/statics/2024/01/04/设备管理工作安排_20240104145038A003.xlsx',
                        fileType: 'excel',
                        fileName: '设备管理工作安排_20240104145038A003.xlsx'
                    },
                    {
                        type: 'ppt',
                        name: 'ppt文档1',
                        url: require('@/assets/images/equipment/img.png'),
                        fileUrl: 'http://192.168.8.59:10300/statics/2024/01/04/fehelper-127-0-0-1-32767-start-html-1704354606377_20240104155340A007.pdf',
                        fileType: 'pdf',
                        fileName: 'fehelper-127-0-0-1-32767-start-html-1704354606377_20240104155340A007.pdf'
                    },
                    {
                        type: 'pdf',
                        name: 'pdf文档1',
                        url: require('@/assets/images/equipment/img.png'),
                        fileUrl: 'http://192.168.8.59:10300/statics/2024/01/04/fehelper-127-0-0-1-32767-start-html-1704354606377_20240104155340A007.pdf',
                        fileType: 'pdf',
                        fileName: 'fehelper-127-0-0-1-32767-start-html-1704354606377_20240104155340A007.pdf'
                    }
                ]
            }
        }
    }
};
</script>
<style scope>
.column-name {
    color: #00c6ff;
    cursor: pointer;
}

.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
    border-color: #e40f51;
}
</style>