<template>
    <!-- 装卸台 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="50px">
            <el-form-item label="编码:" prop="nodeAreaCode">
                <el-input v-model="queryParams.nodeAreaCode" clearable size="small" placeholder="编码"></el-input>
            </el-form-item>
            <el-form-item label="名称:" prop="nodeAreaName">
                <el-input v-model="queryParams.nodeAreaName" clearable size="small" placeholder="名称"></el-input>
            </el-form-item>
            <el-form-item label="类型:" prop="loadrackTypeId">
                <el-select v-model="queryParams.loadrackTypeId" placeholder="类型" clearable>
                    <el-option v-for="dict in zxttype" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="车间:" prop="mesWspId">
                <el-select v-model="queryParams.mesWspId" placeholder="车间" clearable>
                    <el-option v-for="dict in mesCJdata" :key="dict.value" :label="dict.label" :value="dict.value" />
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
        <el-table v-loading="loading" :data="dataList" @selection-change="handleSelectionChange">
            <el-table-column fixed="left" type="selection" width="50" align="center" />
            <el-table-column label="编号" sortable width="80" align="center" key="loadrackNum" prop="loadrackNum"
                v-if="columns[0].visible" />
            <el-table-column label="编码" sortable width="200" align="center" key="nodeAreaCode" prop="nodeAreaCode"
                v-if="columns[1].visible">
            </el-table-column>
            <el-table-column label="名称" sortable align="center" key="nodeAreaName" prop="nodeAreaName"
                v-if="columns[2].visible" />
            <el-table-column label="别名" align="center" key="nodeAreaAlias" prop="nodeAreaAlias" v-if="columns[3].visible" />
            <el-table-column label="类型" align="center" key="loadrackTypeName" prop="loadrackTypeName"
                v-if="columns[4].visible" />
            <el-table-column label="车间" align="center" key="mesWspName" prop="mesWspName" v-if="columns[5].visible" />
            <el-table-column label="启用标识" sortable prop="useFlag" key="useFlag" width="100" align="center"
                v-if="columns[6].visible">
                <template slot-scope="scope">
                    <el-checkbox disabled true-label="1" false-label="0" v-model="scope.row.useFlag"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="排序字段" prop="displayOrder" key="displayOrder" sortable width="100" align="center"
                v-if="columns[7].visible">
            </el-table-column>
            <el-table-column label="备注" prop="des" key="des" sortable width="150" align="center" v-if="columns[8].visible">
            </el-table-column>
            <el-table-column fixed="right" label="操作" align="center" width="160" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
                    <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
            @pagination="getList" />
        <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body center>
            <el-form ref="form" :model="form" :rules="rules" label-width="120px">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="编号:" prop="loadrackNum">
                            <el-input v-model="form.loadrackNum" placeholder="请输入编号" maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="编码:" prop="nodeAreaCode">
                            <el-input v-model="form.nodeAreaCode" placeholder="编码" maxlength="30" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="名称:" prop="nodeAreaName">
                            <el-input v-model="form.nodeAreaName" placeholder="名称" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="别名:" prop="nodeAreaAlias">
                            <el-input v-model="form.nodeAreaAlias" placeholder="名称" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="是否启用:" prop="useFlag">
                            <el-checkbox true-label="1" false-label="0" v-model="form.useFlag"></el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="车间:" prop="mesWspId">
                            <el-select v-model="form.mesWspId" placeholder="罐区">
                                <el-option v-for="(dict, index) in mesCJdata" :key="index" :label="dict.label"
                                    :value="dict.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="类型:" prop="loadrackTypeId">
                            <el-select v-model="form.loadrackTypeId" placeholder="类型">
                                <el-option v-for="(dict, index) in zxttype" :key="index" :label="dict.label"
                                    :value="dict.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="显示顺序:" prop="displayOrder">
                            <el-input v-model="form.displayOrder" placeholder="显示顺序"></el-input>
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
                    <!-- <div class="el-upload__tip" slot="tip">
                        <el-checkbox v-model="upload.updateSupport" /> 是否更新已经存在的用户数据
                    </div> -->
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
    name: "LoadingDock",
    components: {},
    data() {
        return {
            mesCJdata: [],
            zxttype: [],
            dataList: [],
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
                url: process.env.VUE_APP_BASE_API + "/mes/loadrack/import"
            },
            // 查询参数
            queryParams: {
                "loadrackTypeId": null,
                "mesWspId": null,
                "nodeAreaCode": "",
                "nodeAreaName": "",
                "pageNum": 1,
                "pageSize": 10,
            },
            // 表单校验
            rules: {
                id: [
                    { required: true, message: "编号", trigger: "blur" },
                ],
                code: [
                    { required: true, message: "编码", trigger: "blur" }
                ],
                name: [
                    { required: true, message: "名称", trigger: "blur" }
                ],
                alias: [
                    { required: true, message: "别名", trigger: "blur" }
                ],
            },
            // 列信息
            columns: [
                { key: 0, label: `编号`, visible: true },
                { key: 1, label: `编码`, visible: true },
                { key: 2, label: `名称`, visible: true },
                { key: 3, label: `别名`, visible: true },
                { key: 4, label: `类型`, visible: true },
                { key: 5, label: `车间`, visible: true },
                { key: 6, label: `启用标识`, visible: true },
                { key: 7, label: `排序字段`, visible: true },
                { key: 8, label: `备注`, visible: true },
            ],
        };
    },
    watch: {},
    created() {
        this.getList();
        this.getOther();
    },
    methods: {
        getOther() {
            //mes车间
            this.$api.i_mesWorkshopAllLis({ mesWspName: "" }).then(res => {
                this.mesCJdata = res.data.map(e => {
                    return {
                        label: e.name,
                        value: e.id
                    }
                })
            })
            //装卸台类型
            this.$api.i_loadrackLTY().then(res => {
                this.zxttype = res.data.map(e => {
                    return {
                        label: e.name,
                        value: e.id
                    }
                })
            })
        },
        /** 查询列表 */
        getList() {
            this.loading = true;
            this.$api.i_loadrackList(this.queryParams).then(res => {
                this.dataList = res.rows.map(e => {
                    return {
                        ...e,
                        useFlag: String(e.useFlag)
                    }
                })
                this.total = res.total
            })
            this.loading = false;
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
            this.$api.i_loadrackByid({ id: userId }).then(response => {
                this.form = response.data;
                this.form.useFlag = String(response.data.useFlag)
                this.open = true;
                this.title = "修改信息";
            });
        },
        /** 删除按钮操作 */
        handleDelete(row) {
            const userIds = row.id || this.ids[0];
            this.$modal.confirm('是否确认删除"' + userIds + '"的数据项？').then(() => {
                return this.$api.i_loadrackDel({ id: userIds })
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => { });
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
                "useFlag": "1",
                "id": undefined,
                "mesWspId": null,
                "loadrackNum": "",
                "nodeAreaCode": "",
                "nodAreaeName": "",
                "nodeAreaAlias": "",
                "loadrackTypeId": null,
                "displayOrder": "1000",
            };
            this.resetForm("form");
        },
        /** 提交按钮 */

        submitForm: function () {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.form.id != undefined) {
                        this.$api.i_loadrackSU({
                            des: this.form.des,
                            displayOrder: this.form.displayOrder,
                            id: this.form.id,
                            loadrackNum: this.form.loadrackNum,
                            loadrackTypeId: this.form.loadrackTypeId,
                            loadrackTypeName: this.form.loadrackTypeName,
                            mesFctrId: this.form.mesFctrId,
                            mesWspId: this.form.mesWspId,
                            mesWspName: this.form.mesWspName,
                            nodeAreaAlias: this.form.nodeAreaAlias,
                            nodeAreaCode: this.form.nodeAreaCode,
                            nodeAreaName: this.form.nodeAreaName,
                            nodeAreaTypeId: this.form.nodeAreaTypeId,
                            nodeAreaTypeName: this.form.nodeAreaTypeName,
                            useFlag: this.form.useFlag,
                        }).then(response => {
                            this.$modal.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        this.$api.i_loadrackSU(this.form).then(response => {
                            this.$modal.msgSuccess("新增成功");
                            this.open = false;
                            this.getList();
                        });
                    }
                }
            });
        },
        /** 搜索按钮操作 */
        handleQuery() {
            this.queryParams.pageNum = 1;
            this.getList();
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.dateRange = [];
            this.resetForm("queryForm");
            this.handleQuery();
        },
        /** 导出按钮操作 */
        handleExport() {
            this.download('mes/loadrack/export', {
                ...this.queryParams
            }, `装卸台_${new Date().getTime()}.xlsx`)
        },
        /** 导入按钮操作 */
        handleImport() {
            this.upload.title = "数据导入";
            this.upload.open = true;
        },
        /** 下载模板操作 */
        importTemplate() {
            this.download('mes/loadrack/export', {
            }, `装卸台__${new Date().getTime()}.xlsx`)
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
