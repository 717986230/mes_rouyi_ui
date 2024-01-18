<template>
    <!-- 计量节点 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="100px">
            <el-form-item label="编号:" prop="nodeCode" style="margin-left: -50px;">
                <el-input v-model="queryParams.nodeCode" placeholder="请输入编号" clearable @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="名称:" prop="nodeName">
                <el-input v-model="queryParams.nodeName" placeholder="请输入名称" clearable @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="界区:" prop="nodeAreaId">
                <el-select v-model="queryParams.nodeAreaId" placeholder="界区">
                    <el-option v-for="dict in areaType" :key="dict.value" :label="dict.label"
                        :value="dict.value"></el-option>
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
            <el-table-column label="编号" align="center" key="nodeNum" prop="nodeNum" v-if="columns[0].visible" />
            <el-table-column label="编码" align="center" key="nodeCode" prop="nodeCode" v-if="columns[1].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="名称" align="center" key="nodeName" prop="nodeName" v-if="columns[2].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="别名" align="center" key="nodeAlias" prop="nodeAlias" v-if="columns[3].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="计量公式" align="center" key="formula" prop="formula" v-if="columns[4].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="精度" align="center" key="pres" prop="pres" width="120" v-if="columns[5].visible" />
            <el-table-column label="界区" align="center" key="nodeAreaName" prop="nodeAreaName" width="120"
                v-if="columns[6].visible" />
            <el-table-column label="启用标识" align="center" prop="useFlag" key="useFlag" v-if="columns[7].visible">
                <template slot-scope="scope">
                    <el-checkbox disabled true-label="1" false-label="0" v-model="scope.row.useFlag"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="显示顺序" align="center" prop="displayOrder" key="displayOrder" width="160"
                v-if="columns[8].visible">
            </el-table-column>
            <el-table-column label="备注" align="center" key="des" prop="des" width="120" v-if="columns[9].visible" />
            <el-table-column fixed="right" label="计量点公式编辑" align="center" width="160" class-name="small-padding fixed-width"
                v-if="columns[10].visible">
                <template slot-scope="scope">
                    <el-button style="font-size: 20px;" size="mini" type="text" icon="el-icon-edit-outline"
                        @click="handleFormulaPop(scope.row)"></el-button>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align="center" width="200" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
                    <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
            @pagination="getList" />

        <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="120px">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="编号:" prop="nodeNum">
                            <el-input type="number" :disabled="formType == 'edit'" v-model="form.nodeNum"
                                placeholder="请输入编号" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;"></el-col>
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
                            <el-input v-model="form.pres" type="number">
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="界区类型:" prop="nodeAreaTypeId">
                            <el-select v-model="form.nodeAreaTypeId" placeholder="界区类型">
                                <el-option v-for="(item, index) in areaType" :key="item.value" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="界区:" prop="nodeAreaId">
                            <el-select v-model="form.nodeAreaId" placeholder="界区">
                                <el-option v-for="dict in nodeAreaList" :key="dict.value" :label="dict.label"
                                    :value="dict.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="显示顺序:">
                            <el-input v-model="form.displayOrder" placeholder="显示顺序"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="启用标识:">
                            <el-checkbox true-label="1" false-label="0" v-model="form.useFlag"></el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="备注:">
                            <el-input v-model="form.des" placeholder="备注"></el-input>
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
        <!-- 公式验证编辑 -->
        <var-pop :openGS="openGS" @close="handleClose" @submit-to-parent="submitForm"></var-pop>
    </div>
</template>

<script>
import { getToken } from "@/utils/auth";
import varPop from "../../component/varPop.vue";
export default {
    name: "MeasurementNode",
    dicts: ['work_c', 'work_type', 'var_end'],
    components: { varPop },
    data() {
        return {
            // 列信息
            columns: [
                { key: 0, label: `编号`, visible: true },
                { key: 1, label: `编码`, visible: true },
                { key: 2, label: `名称`, visible: true },
                { key: 3, label: `别名`, visible: true },
                { key: 4, label: `计量公式`, visible: true },
                { key: 5, label: `精度`, visible: true },
                { key: 6, label: `界区`, visible: true },
                { key: 7, label: `启用标识`, visible: true },
                { key: 8, label: `显示顺序`, visible: true },
                { key: 9, label: `备注`, visible: true },
                { key: 10, label: `计量公式编辑`, visible: true },
            ],
            //界区类型
            areaType: [],
            //界区
            nodeAreaList: [],
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
            dataList: null,
            // 弹出层标题
            title: "",
            formType: 'add',
            // 是否显示弹出层
            open: false,
            openGS: false,

            // 默认密码
            initPassword: undefined,
            // 日期范围
            dateRange: [],
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
                url: process.env.VUE_APP_BASE_API + "mes/measureNode/import"
            },
            // 查询参数
            queryParams: {
                "id": undefined,
                "isAsc": "",
                "nodeAreaId": undefined,
                "nodeCode": "",
                "nodeName": "",
                "orderByColumn": "",
                "pageNum": 1,
                "pageSize": 10,
                "reasonable": true
            },

            // 表单校验
            rules: {
                id: [
                    { required: true, message: "编号不能为空", trigger: "blur" },
                    { pattern: /^7[0-9]{5}$/, message: '范围在700000-799999', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: "请输入编码", trigger: "blur" }
                ],
                name: [
                    { required: true, message: "请输入名称", trigger: "blur" }
                ],
                alias: [
                    { required: true, message: "请输入别名", trigger: "blur" }
                ]
            }
        };
    },
    watch: {
        'form.nodeAreaTypeId': {
            handler(newValue, oldValue) {
                this.geti_nodeAreaList()
            },
            deep: true // 设置 deep 为 true 表示深度监听，适用于对象或数组的变化
        }
    },
    created() {
        this.getList();
        this.getOther()
    },
    methods: {
        //传给子组件的控制方法
        handleClose() {
            this.openGS = false; // 关闭父组件的弹窗
            this.reset();
        },
        // 计算弹窗
        handleFormulaPop(row) {
            this.reset();
            const userId = row.id || this.ids[0];
            this.$api.i_measureNodeByid({ id: userId }).then(response => {
                this.form = response.data;
                this.form.useFlag = String(response.data.useFlag)
                this.openGS = true;
            });
        },
        /** 查询用户列表 */
        getList() {
            this.loading = true;
            this.$api.i_measureNodeList(this.queryParams).then(response => {
                this.dataList = response.rows.map(e => {
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

        //获取其他页面参数
        getOther() {
            //界区类型
            this.$api.i_nodeAreaType().then(res => {
                this.areaType = res.data.map(r => {
                    return {
                        value: r.id,
                        label: r.nodeAreaTypeName
                    }
                })
            })
        },
        //根据界区类型获取界区
        geti_nodeAreaList() {
            this.$api.i_nodeAreaList({
                "mesFctrId": "",
                "nodeAreaTypeId": this.form.nodeAreaTypeId
            }).then(res => {
                this.nodeAreaList = res.data.map(r => {
                    return {
                        value: r.id,
                        label: r.name
                    }
                })
                this.form.nodeAreaId = this.nodeAreaList[0].value
            })
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
                "displayOrder": "1000",
                "formula": "",
                "id": undefined,
                "nodeAlias": "",
                "nodeAreaId": undefined,
                "nodeCode": "",
                "nodeName": "",
                "nodeNum": "",
                "pres": "",
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
            this.dateRange = [];
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
            this.formType = "add";
        },
        /** 修改按钮操作 */
        handleUpdate(row) {
            this.reset();
            const userId = row.id || this.ids[0];
            this.$api.i_measureNodeByid({ id: userId }).then(response => {
                this.form = response.data;
                this.form.useFlag = String(response.data.useFlag)
                this.open = true;
                this.title = "修改信息";
            });
        },
        /** 提交按钮 */
        submitForm: function (field101) {
            if (typeof field101 === 'string') {
                this.$api.i_measureNodeSU({
                    "des": this.form.des,
                    "displayOrder": this.form.displayOrder,
                    "formula": field101,
                    "id": this.form.id,
                    "nodeAlias": this.form.nodeAlias,
                    "nodeAreaId": this.form.nodeAreaId,
                    "nodeCode": this.form.nodeCode,
                    "nodeName": this.form.nodeName,
                    "nodeNum": this.form.nodeNum,
                    "pres": this.form.pres,
                    "useFlag": this.form.useFlag,
                }).then(response => {
                    this.getList();
                }).catch(error => {
                    // 处理请求错误，例如显示错误信息
                    console.error("请求失败:", error);
                });
            } else {
                this.$refs["form"].validate(valid => {
                    if (valid) {
                        if (this.form.id != undefined) {
                            this.$api.i_measureNodeSU({
                                "des": this.form.des,
                                "displayOrder": this.form.displayOrder,
                                "formula": this.form.formula,
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
                            this.$api.i_measureNodeSU(this.form).then(response => {
                                this.$modal.msgSuccess("新增成功");
                                this.open = false;
                                this.getList();
                            });
                        }
                    }
                });
            }

        },
        /** 删除按钮操作 */
        handleDelete(row) {
            const uid = row.id || this.ids[0];
            this.$modal.confirm('是否确认删除"' + uid + '"的数据项？').then(() => {
                return this.$api.i_measureNodeDel({ id: uid })
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => { });
        },
        /** 导出按钮操作 */
        handleExport() {
            this.download('mes/measureNode/export', {
                ...this.queryParams
            }, `计量节点_${new Date().getTime()}.xlsx`)
        },
        /** 导入按钮操作 */
        handleImport() {
            this.upload.title = "数据导入";
            this.upload.open = true;
        },
        /** 下载模板操作 */
        importTemplate() {
            this.download('mes/measureNode/export', {
            }, `计量节点_${new Date().getTime()}.xlsx`)
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
