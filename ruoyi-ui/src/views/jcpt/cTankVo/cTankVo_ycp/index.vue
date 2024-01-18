<template>
    <!-- 液化产品系数(体积温度)表 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch">
            <el-form-item label="名称:" prop="mesFctrName">
                <el-input v-model="queryParams.mesFctrName" placeholder="请输入名称" clearable size="small"
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="别名:" prop="mesFctrName">
                <el-input v-model="queryParams.mesFctrName" placeholder="请输入别名" clearable size="small"
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item>
                <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd11">新增</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single"
                    @click="handleUpdate">修改</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple"
                    @click="handleDelete">删除</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="info" plain icon="el-icon-upload2" size="mini" @click="handleImport">导入</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport">导出</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
        <el-table v-loading="loading" :data="deptList" @selection-change="handleSelectionChange" :columns="columns">
            <el-table-column fixed="left" type="selection" width="50" align="center" />
            <el-table-column label="体积温度系数编码" sortable align="center" key="id" prop="id" v-if="columns[0].visible" />
            <el-table-column label="密度下限" sortable align="center" key="denFlrLmt" prop="denFlrLmt"
                :show-overflow-tooltip="true" v-if="columns[1].visible" />
            <el-table-column label="密度上限" sortable align="center" key="denUpLmt" prop="denUpLmt"
                :show-overflow-tooltip="true" v-if="columns[2].visible" />
            <el-table-column label="体积温度系数(温度)" sortable align="center" key="cubaTempCofe" prop="cubaTempCofe"
                :show-overflow-tooltip="true" v-if="columns[3].visible" />
            <el-table-column label="操作" v-if="columns[4].visible" align="center" width="160"
                class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
                    <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="150px">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="密度下限:" prop="denFlrLmt">
                            <el-input v-model="form.denFlrLmt" placeholder="密度下限" maxlength="11" type="number" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="密度上限:" prop="denUpLmt">
                            <el-input v-model="form.denUpLmt" placeholder="密度上限" maxlength="11" type="number" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="体积温度系数(温度):" prop="cubaTempCofe">
                            <el-input v-model="form.cubaTempCofe" placeholder="体积温度系数(温度)" maxlength="11" type="number" />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 导入弹窗 -->
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
    name: "cTankVo_ycp",
    components: {},
    data() {
        return {
            columns: [
                { key: 0, label: `液化产品系数编码`, visible: true },
                { key: 1, label: `物料编码`, visible: true },
                { key: 2, label: `物料`, visible: true },
                { key: 3, label: `密度温度系数`, visible: true },
                { key: 4, label: `体积温度系数(温度)`, visible: true },
                { key: 5, label: `密度`, visible: true },
            ],
            xlMes: [],
            tableData: [],//下拉车间部门
            // 用户导入参数
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
                url: process.env.VUE_APP_BASE_API + "/mes/cubaTempCoef/import"

            },
            // 选中数组
            ids: [],
            // 非单个禁用
            single: true,
            // 非多个禁用
            multiple: true,
            // 遮罩层
            loading: false,
            // 显示搜索条件
            showSearch: true,
            // 表格树数据
            deptList: [],
            // 弹出层标题
            title: "",
            // 是否显示弹出层
            open: false,
            // 状态数据字典
            statusOptions: [],
            //表单类型  新增或修改  add edit
            formType: 'add',
            // 查询参数
            queryParams: {
                "cubaTempCofe": "",
                "denFlrLmt": "",
                "denUpLmt": "",
                "id": undefined,
                "isAsc": "",
                "orderByColumn": "",
                "pageNum": 1,
                "pageSize": 10,
                "reasonable": true
            },
            // 表单参数
            form: {},
            // 表单校验
            rules: {
                denFlrLmt: [{
                    required: true,
                    message: '密度下限不能为空',
                    trigger: 'blur'
                }],
                denUpLmt: [{
                    required: true,
                    message: '密度上限不能为空',
                    trigger: 'blur'
                }],
                cubaTempCofe: [{
                    required: true,
                    message: '体积温度系数(温度)不能为空',
                    trigger: 'blur'
                }]
            }
        };
    },
    created() {
        this.getList();
        this.getOther();
    },
    methods: {
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.id);
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        },
        //工厂下拉框列表  i_MESFactoryall
        getOther() {
            this.$api.i_MESFactoryall().then(res => {
                this.xlMes = res.data.map(e => {
                    return {
                        value: e.id
                        , label: e.name
                    }
                })
            })
        },
        getList() {
            this.loading = true;
            this.$api.i_cubaTempCoefList(this.queryParams).then(response => {
                this.deptList = response.rows.map(e => {
                    return {
                        ...e,
                        useFlag: String(e.useFlag)
                    }
                })
                this.loading = false;
            });
        },
        // 取消按钮
        cancel() {
            this.open = false;
            this.reset();
        },
        // 表单重置
        reset() {
            this.form = {
                "cubaTempCofe": "0",
                "denFlrLmt": "0",
                "denUpLmt": "0",
                "id": undefined,
            };
            this.resetForm("form");
        },
        /** 搜索按钮操作 */
        handleQuery() {
            this.getList();
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.resetForm("queryForm");
            this.handleQuery();
        },
        /** 新增按钮操作 */
        handleAdd11() {
            this.reset();
            this.open = true;
            this.title = "增加信息";
        },
        /** 修改按钮操作 */
        handleUpdate(row) {
            this.reset();
            const postId = row.id || this.ids[0]
            this.formType = 'edit'
            this.$api.i_cubaTempCoefByid({ id: postId }).then(res => {
                let nowData = res.data
                this.form = nowData
                this.form.fctrTypeId = String(res.data.fctrTypeId)
                this.form.useFlag = String(res.data.useFlag)
                if (this.form.pmesFctrId == "0") {
                    this.form.pmesFctrId = ""
                }
            })
            this.title = "修改信息";
            this.open = true;
        },
        /** 提交按钮 */
        submitForm: function () {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.form.id != undefined) {
                        this.$api.i_cubaTempCoefSU({
                            "cubaTempCofe": this.form.cubaTempCofe,
                            "denFlrLmt": this.form.denFlrLmt,
                            "denUpLmt": this.form.denUpLmt,
                            "id": this.form.id,

                        }).then(response => {
                            this.$modal.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        this.$api.i_cubaTempCoefSU(this.form).then(response => {
                            this.$modal.msgSuccess("新增成功");
                            this.open = false;
                            this.getList();
                        });
                    }
                }
            });
        },
        /** 删除按钮操作 */
        handleDelete(row) {
            const postId = row.id || this.ids[0]
            this.$modal.confirm('是否确认删除"' + postId + '"的数据项？').then(() => {
                return this.$api.i_cubaTempCoefDel({ id: postId })
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => { });
        },

        /** 导出按钮操作 */
        handleExport() {
            this.download('/mes/cubaTempCoef/export', {
                ...this.queryParams
            }, `液化产品系数(体积温度)表_${new Date().getTime()}.xlsx`)
        },
        /** 导入按钮操作 */
        handleImport() {
            this.upload.title = "数据导入";
            this.upload.open = true;
        },
        /** 下载模板操作 */
        importTemplate() {
            this.download('/mes/cubaTempCoef/export', {
            }, `液化产品系数(体积温度)表 _${new Date().getTime()}.xlsx`)
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
<style lang="scss" scoped></style>
