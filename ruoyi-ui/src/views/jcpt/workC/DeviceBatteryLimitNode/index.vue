<template>
    <!-- 装置界区节点 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="100px">
            <el-form-item label="装置:" prop="unitName" style="margin-left: -50px;">
                <el-input v-model="queryParams.unitName" placeholder="请输入装置" clearable @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="编码:" prop="nodeCode">
                <el-input v-model="queryParams.nodeCode" placeholder="请输入编码" clearable @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="别名:" prop="nodeAlias">
                <el-input v-model="queryParams.nodeAlias" placeholder="请输入别名" clearable @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="侧线:" prop="sideName">
                <el-input v-model="queryParams.sideName" placeholder="请输入侧线" clearable @keyup.enter.native="handleQuery" />
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
            <el-table-column label="编号" sortable align="center" key="nodeNum" prop="nodeNum" v-if="columns[0].visible" />
            <el-table-column label="编码" sortable align="center" key="nodeCode" prop="nodeCode" v-if="columns[1].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="名称" sortable align="center" key="nodeName" prop="nodeName" v-if="columns[2].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="别名" sortable align="center" key="nodeAlias" prop="nodeAlias" v-if="columns[3].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="所属装置" sortable align="center" width="100" key="unitName" prop="unitName"
                v-if="columns[4].visible" :show-overflow-tooltip="true" />
            <el-table-column label="侧线" sortable align="center" key="sideName" prop="sideName" v-if="columns[5].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="精度" sortable align="center" key="pres" prop="pres" width="120"
                v-if="columns[6].visible" />
            <el-table-column label="公式" sortable align="center" key="formula" prop="formula" width="120"
                v-if="columns[7].visible" />
            <el-table-column label="启用标识" sortable align="center" width="100" prop="useFlag" v-if="columns[8].visible">
                <template slot-scope="scope">
                    <el-checkbox false-label="0" true-label="1" disabled v-model="scope.row.useFlag"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="显示顺序" sortable align="center" prop="displayOrder" key="displayOrder" width="160"
                v-if="columns[9].visible">
            </el-table-column>
            <el-table-column label="描述" sortable align="center" key="des" prop="des" width="120"
                v-if="columns[10].visible" />
            <el-table-column label="装置界区公式" fixed="right" sortable align="center" width="130" v-if="columns[11].visible">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" icon="el-icon-edit-outline"
                        @click="GShandleUpdate(scope.row)"></el-button>
                </template>
            </el-table-column>
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
            <el-form ref="form" :model="form" :rules="rules" label-width="120px">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="编号:" prop="nodeNum">
                            <el-input v-model="form.nodeNum" placeholder="请输入编号" type="number" maxlength="11" />
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
                        <el-form-item label="装置:" prop="unitId">
                            <el-select v-model="form.unitId" placeholder="装置" @change="handleLineChange">
                                <el-option v-for="(item, index) in zztypeList" :key="item.value" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="侧线:" prop="slideNodeId">
                            <el-select v-model="form.slideNodeId" placeholder="侧线">
                                <el-option v-for="dict in clineList" :key="dict.value" :label="dict.label"
                                    :value="dict.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="启用标识:" prop="useFlag">
                            <el-checkbox true-label="1" false-label="0" v-model="form.useFlag"></el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="精度:" prop="pres">
                            <el-input v-model="form.pres" placeholder="精度" type="number" maxlength="11"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="显示顺序:" prop="displayOrder">
                            <el-input v-model="form.displayOrder" type="number"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="备注:" prop="des">
                            <el-input v-model="form.des" placeholder="请输入内容"></el-input>
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
        <varPop :openGS="openGS" @close="handleClose" @submit-to-parent="submitForm"></varPop>
    </div>
</template>

<script>
import { getToken } from "@/utils/auth";
import varPop from "../../component/varPop.vue";
export default {
    name: "DeviceBatteryLimitNode",
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
                { key: 4, label: `所属装置`, visible: true },
                { key: 5, label: `侧线`, visible: true },
                { key: 6, label: `精度`, visible: true },
                { key: 7, label: `公式`, visible: true },
                { key: 8, label: `启用标识`, visible: true },
                { key: 9, label: `排序`, visible: true },
                { key: 10, label: `描述`, visible: true },
                { key: 11, label: `装置界区`, visible: true },
            ],

            zztypeList: [],
            clineList: [],//侧线列表
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
            // 是否显示弹出层
            open: false,
            openGS: false,

            // 表单参数
            form: {
            },

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
                url: process.env.VUE_APP_BASE_API + "/mes/unitAreaNode/import"
            },
            // 查询参数
            queryParams: {
                "id": undefined,
                "isAsc": "",
                "nodNum": "",
                "nodeAlias": "",
                "nodeCode": "",
                "nodeName": "",
                "orderByColumn": "",
                "pageNum": 1,
                "pageSize": 10,
                "reasonable": true,
                "sideName": "",
                "unitName": ""
            },
            // 表单校验
            rules: {
                unitId: [
                    { required: true, message: "请选择装置", trigger: "blur" }
                ],
                nodeCode: [
                    { required: true, message: "请输入编码", trigger: "blur" }
                ],
                nodeName: [
                    { required: true, message: "请输入名称", trigger: "blur" }
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
        //根据装置选中获取侧线
        handleLineChange() {
            //根据装置查侧线列表
            this.$api.i_sideLineALLList({
                "mesFctrId": "",
                "nodeName": "",
                "unitId": this.form.unitId
            }).then(res => {
                this.clineList = res.data.map(r => {
                    return {
                        label: r.nodeName,
                        value: r.id,
                    }
                })
                this.form.slideNodeId = this.clineList.length > 0 ? this.clineList[0].value : ""
            })

        },
        //传给子组件的控制方法
        handleClose() {
            this.openGS = false;
            this.reset();
        },

        getOther() {
            //获取全部装置
            this.$api.i_unitListall({
                "unitName": ""
            }).then(res => {
                this.zztypeList = res.data.map(r => {
                    return {
                        label: r.unitName,
                        value: r.id,
                    }
                })
            })
        },
        getList() {
            this.loading = true;
            this.$api.i_unitAreaNodeList(this.queryParams).then(response => {
                this.dataList = response.rows.map(e => {
                    return {
                        ...e,
                        useFlag: String(e.useFlag)
                    }
                })
                this.total = response.total;
            }
            );
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
                "displayOrder": "1000",
                "formula": "",
                "id": undefined,
                "nodeAlias": "",
                "nodeCode": "",
                "nodeName": "",
                "nodeNum": "",
                "pres": "",
                "slideNodeId": undefined,
                "useFlag": "1"
            };
            this.resetForm("form");
        },
        // 源公式按钮
        GShandleUpdate(row) {
            this.reset();
            const userId = row.id || this.ids[0];
            this.$api.i_unitAreaNodeByid({ id: userId }).then(response => {
                this.form = response.data;
                this.openGS = true;
            });
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
            this.$api.i_unitAreaNodeByid({ id: userId }).then(response => {
                this.form = response.data;
                this.form.useFlag = String(response.data.useFlag)
                this.open = true;
                this.title = "修改信息";
            });
        },
        /** 提交按钮 */
        submitForm: function (field101) {
            const formData = {
                "des": this.form.des,
                "displayOrder": this.form.displayOrder,
                "formula": typeof field101 === 'string' ? field101 : this.form.formula,
                "id": this.form.id,
                "nodeAlias": this.form.nodeAlias,
                "nodeCode": this.form.nodeCode,
                "nodeName": this.form.nodeName,
                "nodeNum": this.form.nodeNum,
                "pres": this.form.pres,
                "slideNodeId": this.form.slideNodeId,
                "useFlag": this.form.useFlag,
            };
            const handleResponse = (response, message) => {
                this.$modal.msgSuccess(message);
                this.open = false;
                this.getList();
            };
            const handleError = (error) => {
                console.error("请求失败:", error);
            };

            if (typeof field101 === 'string') {
                this.$api.i_unitAreaNodeSU(formData)
                    .then(response => handleResponse(response, "修改成功"))
                    .catch(error => handleError(error));
            } else {
                this.$refs["form"].validate(valid => {
                    if (valid) {
                        if (this.form.id !== undefined) {
                            this.$api.i_unitAreaNodeSU(formData)
                                .then(response => handleResponse(response, "修改成功"))
                                .catch(error => handleError(error));
                        } else {
                            this.$api.i_unitAreaNodeSU(formData)
                                .then(response => handleResponse(response, "新增成功"))
                                .catch(error => handleError(error));
                        }
                    }
                });
            }
        },

        /** 删除按钮操作 */
        handleDelete(row) {
            const userIds = row.id || this.ids[0];
            this.$modal.confirm('是否确认删除"' + userIds + '"的数据项？').then(() => {
                return this.$api.i_unitAreaNodeDel({ id: userIds })
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => { });
        },
        /** 导出按钮操作 */
        handleExport() {
            this.download('mes/unitAreaNode/export', {
                ...this.queryParams
            }, `装置界区节点_${new Date().getTime()}.xlsx`)
        },
        /** 导入按钮操作 */
        handleImport() {
            this.upload.title = "数据导入";
            this.upload.open = true;
        },
        /** 下载模板操作 */
        importTemplate() {
            this.download('mes/unitAreaNode/export', {
            }, `装置界区节点_${new Date().getTime()}.xlsx`)
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
