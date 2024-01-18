<template>
    <!-- 库位 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch">
            <el-form-item label="编码:" prop="nodeCode">
                <el-input v-model="queryParams.nodeCode" placeholder="请输入编码" clearable size="small"
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="名称:" prop="nodeName">
                <el-input v-model="queryParams.nodeName" placeholder="请输入名称" clearable size="small"
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="界区:" prop="nodeAreaId">
                <el-select v-model="queryParams.nodeAreaId" placeholder="界区" clearable size="small">
                    <el-option v-for="dict in mtrlOption" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
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
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList" :columns="columns"></right-toolbar>
        </el-row>
        <el-table v-loading="loading" :data="deptList" @selection-change="handleSelectionChange">
            <el-table-column fixed="left" type="selection" width="50" align="center" />
            <el-table-column prop="nodeNum" label="编号" key="nodeNum" fixed sortable align="left"
                v-if="columns[0].visible"></el-table-column>
            <el-table-column prop="nodeCode" label="编码" key="nodeCode" sortable align="center"
                v-if="columns[1].visible"></el-table-column>
            <el-table-column prop="nodeName" label="名称" key="nodeName" sortable align="center"
                v-if="columns[2].visible"></el-table-column>
            <el-table-column prop="nodeAlias" label="别名" key="nodeAlias" sortable align="center"
                v-if="columns[3].visible"></el-table-column>
            <el-table-column prop="pres" key="pres" label="精度"  sortable align="center"
                v-if="columns[4].visible"></el-table-column>
            <el-table-column prop="nodeAreaName" key="nodeAreaName" label="界区" sortable align="center"
                v-if="columns[5].visible"></el-table-column>
            <el-table-column prop="useFlag" label="启用标识" key="useFlag"  sortable align="center"
                v-if="columns[6].visible">
                <template slot-scope="scope">
                    <el-checkbox disabled true-label="1" false-label="0" v-model="scope.row.useFlag"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="显示顺序" sortable align="center" key="displayOrder" prop="displayOrder" 
                v-if="columns[7].visible">
            </el-table-column>
            <el-table-column prop="des" label="备注" key="des" sortable align="center"
                v-if="columns[8].visible"></el-table-column>
            <el-table-column label="操作" fixed="right" width="130" sortable align="center"
                class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
                    <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="120px">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="编号:" prop="nodeNum">
                            <el-input type="number" v-model="form.nodeNum" placeholder="编号" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;"></el-col>
                    <el-col :span="10">
                        <el-form-item label="编码:" prop="nodeCode">
                            <el-input v-model="form.nodeCode" placeholder="编码" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="名称:" prop="nodeName">
                            <el-input v-model="form.nodeName" placeholder="名称" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;"></el-col>
                    <el-col :span="10">
                        <el-form-item label="别名:" prop="nodeAlias">
                            <el-input v-model="form.nodeAlias" placeholder="别名" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="精度:" prop="pres">
                            <el-input v-model="form.pres" type="number" placeholder="数据精度">
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;"></el-col>
                    <el-col :span="10">
                        <el-form-item label="启用标识   :" prop="useFlag">
                            <el-checkbox true-label="1" false-label="0" v-model="form.useFlag"></el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="显示顺序:" prop="displayOrder">
                            <el-input v-model="form.displayOrder" placeholder="显示顺序" type="number" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;"></el-col>
                    <el-col :span="10">
                        <el-form-item label="界区:" prop="nodeAreaId">
                            <el-select v-model="form.nodeAreaId" placeholder="界区" clearable size="small">
                                <el-option v-for="dict in mtrlOption" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="备注:" prop="des">
                            <el-input v-model="form.des" placeholder="备注" />
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
    name: "WarehouseLocation",
    dicts: ["work_c"],
    components: {},
    data() {
        return {
            mtrlOption: [],//界区类型
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
            single: true,
            multiple: true,
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
                url: process.env.VUE_APP_BASE_API + "/mes/mtrl/import"
            },
            // 遮罩层
            loading: false,
            // 显示搜索条件
            showSearch: true,
            // 表格树数据
            deptList: [],
            // 部门树选项
            deptOptions: [],
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
                "nodeCode": "",
                "nodeName": "",
                "orderByColumn": "",
                "pageNum": 1,
                "pageSize": 10,
                nodeAreaId: ''
            },
            // 表单参数
            form: {
                "decStr": 0,
                "des": "",
                "dimensionId": "",
                "mtrlAlias": "",
                "mtrlCode": "",
                "mtrlName": "",
                "mtrlNum": "",
                "mtrlTypeId": '',
                "tankIdt": 0,
                "upperMtrlId": '',
                "useFlag": "1",
                "vcfTypeId": '',
                "displayOrder": 1000,
            },
            // 表单校验
            rules: {
                mtrlNum: [
                    { required: true, message: "请输入编号", trigger: "blur" }
                ],
                mtrlCode: [
                    { required: true, message: "请输入编码", trigger: "blur" }
                ],
                mtrlName: [
                    { required: true, message: "请输入名称", trigger: "blur" }
                ],
                mtrlAlias: [
                    { required: true, message: "请输入别名", trigger: "blur" }
                ],
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
        getOther() {
            //界区类型
            this.$api.i_nodeAreaList({ "nodeAreaType": "3" }).then(res => {
                this.mtrlOption = res.data.map(e => {
                    return {
                        label: e.name,
                        value: e.id,
                    }
                })
            })
        },
        getList() {
            this.loading = true;
            this.$api.i_locationList(this.queryParams).then(response => {
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
                "des": "",
                "pres": "",
                "id": undefined,
                "nodeAlias": "",
                "nodeCode": "",
                "nodeName": "",
                "nodeNum": "",
                "useFlag": "1",
                "nodeAreaId": null,
                "displayOrder": "1000",
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
            const userId = row.id || this.ids[0];
            this.open = true;
            this.$api.i_locationByid({ id: userId }).then(response => {
                this.form = response.data;
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
                        this.$api.i_locationSU({
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
                        this.$api.i_locationSU(this.form).then(response => {
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
            const userId = row.id || this.ids[0];
            this.$modal.confirm('是否确认删除"' + userId + '"的数据项？').then(() => {
                return this.$api.i_locationDel({ id: userId })
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => { });
        },
        /** 导出按钮操作 */
        handleExport() {
            this.download('/mes/location/export', {
                ...this.queryParams
            }, `库位_${new Date().getTime()}.xlsx`)
        },
        /** 导入按钮操作 */
        handleImport() {
            this.upload.title = "数据导入";
            this.upload.open = true;
        },
        /** 下载模板操作 */
        importTemplate() {
            this.download('/mes/location/export', {
            }, `库位_${new Date().getTime()}.xlsx`)
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
