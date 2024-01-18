<template>
    <!-- 汇流点 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="100px">
            <el-form-item label="编码:" prop="nodeCode" style="margin-left: -50px;">
                <el-input v-model="queryParams.nodeCode" placeholder="请输入编码" clearable @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="名称:" prop="nodeName">
                <el-input v-model="queryParams.nodeName" placeholder="请输入名称" clearable @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="界区:" prop="nodeAreaName">
                <el-input v-model="queryParams.nodeAreaName" placeholder="界区" clearable @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="handleQuery">搜索</el-button>
                <el-button size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
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
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList" :columns="columns"></right-toolbar>
        </el-row>
        <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
            <el-table-column fixed="left" type="selection" width="50" align="center" />
            <el-table-column label="编号" align="center" key="nodeNum" prop="nodeNum" v-if="columns[0].visible" />
            <el-table-column label="编码" align="center" key="nodeCode" prop="nodeCode" v-if="columns[1].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="名称" align="center" key="nodeName" prop="nodeName" v-if="columns[2].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="别名" align="center" key="nodeAlias" prop="nodeAlias" v-if="columns[3].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="精度" align="center" key="pres" prop="pres" width="120" v-if="columns[4].visible" />
            <el-table-column label="界区" align="center" key="nodeAreaName" prop="nodeAreaName" width="120"
                v-if="columns[5].visible" />
            <el-table-column label="启用标识" align="center" prop="useFlag" v-if="columns[6].visible">
                <template slot-scope="scope">
                    <el-checkbox disabled true-label="1" false-label="0" v-model="scope.row.useFlag"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="显示顺序" align="center" prop="displayOrder" width="160" v-if="columns[7].visible">
            </el-table-column>
            <el-table-column label="备注" align="center" key="des" prop="des" width="120" v-if="columns[8].visible" />
            <el-table-column fixed="right" label="操作" align="center" width="160" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
                    <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
            @pagination="getList" />
        <!-- 添加或修改用户配置对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="120px">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="编号:" prop="nodeNum">
                            <el-input v-model="form.nodeNum" placeholder="请输入编号" maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="编码:" prop="nodeCode">
                            <el-input v-model="form.nodeCode" placeholder="编码" maxlength="30" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="名称:" prop="nodeName">
                            <el-input v-model="form.nodeName" placeholder="名称" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="别名:" prop="nodeAlias">
                            <el-input v-model="form.nodeAlias" placeholder="名称" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="精度:" prop="pres">
                            <el-input v-model="form.pres" placeholder="精度" maxlength="11" type="number" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="界区类型:" prop="nodeAreaTypeId">
                            <el-select v-model="form.nodeAreaTypeId" placeholder="界区类型" @change="handleChanegJQ">
                                <el-option v-for="dict in JQtypeList" :key="dict.value" :label="dict.label"
                                    :value="dict.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="界区名称:" prop="nodeAreaId">
                            <el-select v-model="form.nodeAreaId" placeholder="界区名称">
                                <el-option v-for="dict in JQnameList" :key="dict.value" :label="dict.label"
                                    :value="dict.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="显示启用:" prop="useFlag">
                            <el-checkbox true-label="1" false-label="0" v-model="form.useFlag"></el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="备注:" prop="des">
                            <el-input v-model="form.des" placeholder="备注"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="显示顺序:" prop="displayOrder">
                            <el-input v-model="form.displayOrder" placeholder="显示顺序" type="number"
                                maxlength="11"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 新增/修改弹窗 -->
        <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body>
            <el-upload ref="upload" :limit="1" accept=".xlsx, .xls" :headers="upload.headers"
                :action="upload.url + '?updateSupport=' + upload.updateSupport" :disabled="upload.isUploading"
                :on-progress="handleFileUploadProgress" :on-success="handleFileSuccess" :auto-upload="false" drag>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip text-center" slot="tip">
                    <div class="el-upload__tip" slot="tip">
                        <el-checkbox v-model="upload.updateSupport" /> 是否更新已经存在的用户数据
                    </div>
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
    name: "ConfluencePoint",
    dicts: ['work_c', 'work_type', 'var_end'],
    data() {
        return {
            // 列信息
            columns: [
                { key: 0, label: `编号`, visible: true },
                { key: 1, label: `编码`, visible: true },
                { key: 2, label: `名称`, visible: true },
                { key: 3, label: `别名`, visible: true },
                { key: 4, label: `精度`, visible: true },
                { key: 5, label: `界区`, visible: true },
                { key: 6, label: `启用标识`, visible: true },
                { key: 7, label: `显示顺序`, visible: true },
                { key: 8, label: `备注`, visible: true },
            ],
            // 遮罩层
            loading: true,
            // 选中数组
            ids: [],
            // 非单个禁用
            single: true,
            // 非多个禁用
            multiple: true,
            // 显示搜索条件
            showSearch: true,
            // 总条数
            total: 0,
            JQnameList: [],//界区名称列表
            JQtypeList: [],//界区类型列表
            userList: [],
            // 弹出层标题
            title: "",
            // 是否显示弹出层
            open: false,
            openGS: false,
            // 表单参数
            form: {},
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
                url: process.env.VUE_APP_BASE_API + "mes/conflux/import"
            },
            // 查询参数
            queryParams: {
                "id": undefined,
                "isAsc": "",
                "nodeAreaName": "",
                "nodeCode": "",
                "nodeName": "",
                "orderByColumn": "",
                "pageNum": 1,
                "pageSize": 10,
                "reasonable": true
            },
            // 表单校验
            rules: {
                nodeNum: [
                    { required: true, message: "请输入编号", trigger: "blur" },
                    { min: 2, max: 20, message: '用户名称长度必须介于 2 和 20 之间', trigger: 'blur' }
                ],
                nodeCode: [
                    { required: true, message: "请输入编码", trigger: "blur" }
                ],
                nodeName: [
                    { required: true, message: "请输入名称", trigger: "blur" }
                ],
                nodeAlias: [
                    { required: true, message: "请输入别名", trigger: "blur" }
                ],
                unitAlias: [
                    { required: true, message: "请选择装置", trigger: "blur" }
                ],
            }
        };
    },
    watch: {},
    created() {
        this.getList();
        this.getOther();
    },
    methods: {
        getOther() {
            //界区类型列表
            this.$api.i_nodeAreaType().then(res => {
                this.JQtypeList =
                    res.data.map(r => ({
                        label: r.nodeAreaTypeName,
                        value: r.id,
                    }))
            })
        },
        /** 查询用户列表 */
        getList() {
            this.loading = true;
            this.$api.i_confluxList(this.queryParams).then(response => {
                this.userList = response.rows.map(e => {
                    return {
                        ...e,
                        useFlag: String(e.useFlag)
                    }
                })
                this.total = response.total;
                this.loading = false;
            }
            );
        },
        // 取消按钮
        cancel() {
            this.open = false;
            this.reset();
        },
        // 表单重置
        reset() {
            this.form = {
                "id": undefined,
                "isAsc": "",
                "nodeAreaName": "",
                "nodeCode": "",
                "nodeName": "",
                "orderByColumn": "",
                "pageNum": 1,
                "pageSize": 10,
                "reasonable": true,
                "nodeAreaId": "",
                "nodeAreaTypeId": "",
                "useFlag": '1'
            };
            this.resetForm("form");
        },
        handleChanegJQ() {
            this.$api.i_nodeAreaList({ nodeAreaType: this.form.nodeAreaId }).then(res => {
                this.JQnameList = res.data.map(e => {
                    return {
                        label: e.name,
                        value: e.id
                    }
                })
                this.form.nodeAreaId = this.JQnameList[0].value
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
            this.ids = selection.map(item => item.id);
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        },

        /** 新增按钮操作 */
        handleAdd() {
            this.reset();
            this.open = true;
            this.title = "添加信息";
        },
        /** 修改按钮操作 */
        handleUpdate(row) {
            this.reset();
            const userId = row.id || this.ids[0];
            this.$api.i_confluxByid({ id: userId }).then(response => {
                this.form = response.data;
                this.form.nodeAreaTypeId = String(response.data.nodeAreaTypeId)
                // this.form.nodeAreaId = String(response.data.nodeAreaId)
                this.form.useFlag = String(response.data.useFlag)
                this.open = true;
                this.title = "修改信息";
            });
        },
        /** 提交按钮 */
        submitForm: function () {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.form.id != undefined) {
                        this.$api.i_confluxSU({
                            "des": this.form.des,
                            "displayOrder": this.form.displayOrder,
                            "id": this.form.id,
                            "nodeAlias": this.form.nodeAlias,
                            "nodeAreaId": this.form.nodeAreaId,
                            "nodeCode": this.form.nodeCode,
                            "nodeName": this.form.nodeName,
                            "nodeNum": this.form.nodeNum,
                            "pres": this.form.pres,
                            "useFlag": this.form.useFlag,
                        }).then(response => {
                            this.$modal.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        this.$api.i_confluxSU(this.form).then(response => {
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
            const userIds = row.id || this.ids[0];
            this.$modal.confirm('是否确认删除"' + userIds + '"的数据项？').then(() => {
                return this.$api.i_confluxDel({ id: userIds })
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => { });
        },
        /** 导出按钮操作 */
        handleExport() {
            this.download('mes/conflux/export', {
                ...this.queryParams
            }, `汇流点_${new Date().getTime()}.xlsx`)
        },
        /** 导入按钮操作 */
        handleImport() {
            this.upload.title = "数据导入";
            this.upload.open = true;
        },
        /** 下载模板操作 */
        importTemplate() {
            this.download('mes/conflux/export', {
            }, `汇流点_${new Date().getTime()}.xlsx`)
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
