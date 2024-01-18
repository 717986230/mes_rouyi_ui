<template>
    <!-- 加工方案 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="100px">
            <el-form-item label="名称:" prop="scheName" style="margin-left: -50px;">
                <el-input v-model="queryParams.scheName" clearable @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="装置:" prop="unitId">
                <el-select v-model="queryParams.unitId" placeholder="装置" clearable size="small">
                    <el-option v-for="dict in ZZtype" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
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
            <el-table-column label="编号" fixed="left" sortable align="center" key="scheNum" prop="scheNum"
                v-if="columns[0].visible" />
            <el-table-column label="名称" sortable align="center" key="scheName" prop="scheName" v-if="columns[1].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="别名" sortable align="center" key="scheAlias" prop="scheAlias" v-if="columns[2].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="装置" sortable align="center" key="unitName" prop="unitName" width="120"
                v-if="columns[3].visible" :show-overflow-tooltip="true" />
            <el-table-column label="启用标识" sortable align="center" prop="useFlag" width="120" v-if="columns[4].visible">
                <template slot-scope="scope">
                    <el-checkbox disabled @change="handleChange(scope.row)" true-label="1" false-label="0"
                        v-model="scope.row.useFlag"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="是否默认加工方案" sortable align="center" key="dftId" prop="dftId" width="150"
                v-if="columns[5].visible">
                <template slot-scope="scope">
                    <el-checkbox disabled @change="handleChange(scope.row)" true-label="1" false-label="0"
                        v-model="scope.row.dftId"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="显示顺序" sortable align="center" key="displayOrder" prop="displayOrder" width="160"
                v-if="columns[6].visible">
            </el-table-column>
            <el-table-column label="备注" sortable align="center" key="des" prop="des" width="120"
                v-if="columns[7].visible" />
            <el-table-column label="操作" fixed="right" align="center" width="160" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
                    <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
            @pagination="getList" />
        <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="130px">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="编号:" prop="scheNum">
                            <el-input v-model="form.scheNum" placeholder="编号" maxlength="30" type="number" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="名称:" prop="scheName">
                            <el-input v-model="form.scheName" placeholder="名称" maxlength="11" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="别名:" prop="scheAlias">
                            <el-input v-model="form.scheAlias" placeholder="别名" maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="装置:" prop="unitId">
                            <el-select v-model="form.unitId" placeholder="装置">
                                <el-option v-for="(item, index) in ZZtype" :key="index" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="是否启用:" prop="useFlag">
                            <el-checkbox false-label="0" true-label="1" v-model="form.useFlag"></el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="是否默认加工方案:" prop="dftId">
                            <el-checkbox false-label="0" true-label="1" v-model="form.dftId"></el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="备注:" prop="des">
                            <el-input v-model="form.des" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="显示顺序:" prop="displayOrder">
                            <el-input v-model="form.displayOrder" placeholder="显示顺序" type="number"></el-input>
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
        <!-- 公式验证编辑 -->
        <varPop :openGS="openGS" @close="handleClose"></varPop>
    </div>
</template>
<script>
import { getToken } from "@/utils/auth";
import varPop from "../../component/varPop.vue";
export default {
    name: "ProcessingScheme",
    dicts: ['work_c', 'work_type', 'var_end'],
    components: { varPop },
    data() {
        return {
            ZZtype: [],
            // 列信息
            columns: [
                { key: 0, label: `编号`, visible: true },
                { key: 1, label: `名称`, visible: true },
                { key: 2, label: `别名`, visible: true },
                { key: 3, label: `装置`, visible: true },
                { key: 4, label: `启用标识`, visible: true },
                { key: 5, label: `是否默认加工方案`, visible: true },
                { key: 6, label: `显示顺序`, visible: true },
                { key: 7, label: `备注`, visible: true },
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
            // 用户表格数据
            userList: null,
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
                url: process.env.VUE_APP_BASE_API + "/mes/pminnsmtnode/import"
            },
            // 查询参数
            queryParams: {
                "pageNum": 1,
                "pageSize": 10,
                "des": "",
                "dftId": "",
                "displayOrder": "",
                "id": "",
                "scheName": "",
                "scheAlias": "",
                "scheNum": "",
                "unitId": "",
                "useFlag": ""
            },
            // 表单校验
            rules: {
                scheNum: [
                    { required: true, message: "请输入编号", trigger: "blur" },
                ],
                scheName: [
                    { required: true, message: "请输入编码", trigger: "blur" }
                ],
                scheAlias: [
                    { required: true, message: "请输入别名", trigger: "blur" }
                ],
            }
        };
    },
    watch: {},
    created() {
        this.getList();
        this.getOther()
    },
    methods: {
        getOther() {
            this.$api.i_unitListall({ unitName: "" }).then(res => {
                this.ZZtype = res.data.map(e => {
                    return {
                        label: e.unitName,
                        value: e.id
                    }
                })
            })
        },
        //传给子组件的控制方法
        handleClose() {
            this.openGS = false; // 关闭父组件的弹窗
            this.reset();
        },
        onOpen() { },
        onClose() {
            this.$refs['elForm'].resetFields()
        },
        close() {
            this.$emit('update:visible', false)
        },
        /** 查询用户列表 */
        getList() {
            this.loading = true;
            this.$api.i_schemeList(this.queryParams).then(res => {
                this.userList = res.rows
            })
            this.loading = false;
        },
        // 取消按钮
        cancel() {
            this.open = false;
            this.reset();
        },
        // 表单重置
        reset() {
            this.form = {
                "des": "",
                "dftId": "",
                "displayOrder": "1000",
                "id": undefined,
                "scheAame": "",
                "scheAlias": "",
                "scheNum": "",
                "unitId": "",
                "useFlag": "1"
            };
            this.resetForm("form");
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
        /** 提交按钮 */
        submitForm: function () {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.form.id != undefined) {
                        this.$api.i_schemeSU({
                            id: this.form.id,
                            des: this.form.des,
                            dftId: this.form.dftId,
                            unitId: this.form.unitId,
                            useFlag: this.form.useFlag,
                            scheNum: this.form.scheNum,
                            unitName: this.form.unitName,
                            scheName: this.form.scheName,
                            scheAlias: this.form.scheAlias,
                            displayOrder: this.form.displayOrder
                        }).then(response => {
                            this.$modal.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        this.$api.i_schemeSU(this.form).then(response => {
                            this.$modal.msgSuccess("新增成功");
                            this.open = false;
                            this.getList();
                        });
                    }
                }
            });
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
            this.$api.i_schemeBYid({ id: userId }).then(response => {
                this.form = response.data;
                this.open = true;
                this.title = "修改信息";
            });
        },
        /** 删除按钮操作 */
        handleDelete(row) {
            const userIds = row.id || this.ids[0];
            this.$modal.confirm('是否确认删除"' + this.ids + '"的数据项？').then(() => {
                return this.$api.i_schemeDel({ id: userIds })
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => { });
        },
        /** 导出按钮操作 */
        handleExport() {
            this.download('mes/scheme/export', {
                ...this.queryParams

            }, `加工方案_${new Date().getTime()}.xlsx`)
        },
        /** 导入按钮操作 */
        handleImport() {
            this.upload.title = "数据导入";
            this.upload.open = true;
        },
        /** 下载模板操作 */
        importTemplate() {
            this.download('mes/scheme/export', {
            }, `加工方案_${new Date().getTime()}.xlsx`)
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
