<template>
    <!-- 侧线 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="110px">
            <el-form-item label="编码:" style="margin-left: -60px;" prop="nodeCode">
                <el-input v-model="queryParams.nodeCode" placeholder="请输入编码" clearable @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="名称:" prop="nodeName">
                <el-input v-model="queryParams.nodeName" placeholder="请输入名称" clearable @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="侧线进出类型:" prop="slineInoutTypeId">
                <el-select v-model="queryParams.slineInoutTypeId" placeholder="侧线进出类型" clearable>
                    <el-option v-for="dict in CXtype" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="装置:" prop="unitId">
                <el-select v-model="queryParams.unitId" placeholder="装置" clearable>
                    <el-option v-for="dict in ZZUList" :key="dict.value" :label="dict.label" :value="dict.value" />
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
            <el-table-column label="编号" fixed="left" sortable align="center" width="100" prop="nodeNum" key="nodeNum"
                v-if="columns[0].visible" />
            <el-table-column label="编码" sortable align="center" key="nodeCode" prop="nodeCode" :show-overflow-tooltip="true"
                v-if="columns[1].visible" />
            <el-table-column label="名称" sortable align="center" key="nodeName" prop="nodeName" :show-overflow-tooltip="true"
                v-if="columns[2].visible" />
            <el-table-column label="别名" sortable align="center" key="nodeAlias" prop="nodeAlias"
                :show-overflow-tooltip="true" v-if="columns[3].visible" />
            <el-table-column label="精度" align="center" sortable prop="pres" key="pres" :show-overflow-tooltip="true"
                v-if="columns[4].visible" />
            <el-table-column label="装置组" align="center" sortable width="100" key="groupName" prop="groupName"
                :show-overflow-tooltip="true" v-if="columns[5].visible" />
            <el-table-column label="装置" align="center" sortable key="unitName" prop="unitName" :show-overflow-tooltip="true"
                v-if="columns[6].visible" />
            <el-table-column label="侧线物料类型" align="center" sortable width="130" key="slineMtrlTypeName"
                prop="slineMtrlTypeName" :show-overflow-tooltip="true" v-if="columns[7].visible" />
            <el-table-column label="侧线进出类型" align="center" sortable width="130" key='slineInoutTypeName'
                prop="slineInoutTypeName" :show-overflow-tooltip="true" v-if="columns[8].visible" />
            <el-table-column label="回流关联侧线编号" align="center" sortable width="150" key="refSideLineId" prop="refSideLineId"
                :show-overflow-tooltip="true" v-if="columns[9].visible" />
            <el-table-column label="界区计量公式" align="center" sortable width="150" key="areaForm" prop="areaForm"
                :show-overflow-tooltip="true" v-if="columns[10].visible" />
            <el-table-column label="是否校正" sortable align="center" prop="isRvs" width="100" v-if="columns[11].visible">
                <template slot-scope="scope">
                    <el-checkbox disabled false-label="0" true-label="1" v-model="scope.row.useFlag"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="侧线计量公式" align="center" sortable width="150" key="formula" prop="formula"
                :show-overflow-tooltip="true" v-if="columns[12].visible" />
            <el-table-column label="启用标识" sortable align="center" width="100" prop="useFlag" key="useFlag"
                v-if="columns[13].visible">
                <template slot-scope="scope">
                    <el-checkbox disabled false-label="0" true-label="1" v-model="scope.row.useFlag"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="显示顺序" sortable align="center" key="displayOrder" prop="displayOrder" width="160"
                v-if="columns[14].visible" />
            <el-table-column label="备注" sortable align="center" key="des" prop="des" width="120"
                v-if="columns[15].visible" />
            <el-table-column fixed="right" label="界区计量公式" sortable align="center" :show-overflow-tooltip="true" width="100"
                v-if="columns[16].visible">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" icon="el-icon-edit-outline"
                        @click="GShandleUpdate1(scope.row)"></el-button>
                </template>
            </el-table-column>
            <el-table-column fixed="right" sortable label="侧线计量公式" align="center" width="100" :show-overflow-tooltip="true"
                v-if="columns[17].visible">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" icon="el-icon-edit-outline"
                        @click="GShandleUpdate2(scope.row)"></el-button>
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
                            <el-input v-model="form.nodeNum" placeholder="编号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="编码:" prop="nodeCode">
                            <el-input v-model="form.nodeCode" placeholder="编码"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="名称:" prop="nodeName">
                            <el-input v-model="form.nodeName" placeholder="名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="别名:" prop="nodeAlias">
                            <el-input v-model="form.nodeAlias" placeholder="别名"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="装置组:" prop="unitGroupId">
                            <el-select v-model="form.unitGroupId" placeholder="装置组">
                                <el-option v-for="dict in ZZUList" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="装置:" prop="unitId">
                            <el-select v-model="form.unitId" placeholder="装置">
                                <el-option v-for="dict in ZZUList" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="侧线物料类型:" prop="slineMtrlTypeId">
                            <el-select v-model="form.slineMtrlTypeId" placeholder="侧线物料类型">
                                <el-option v-for="dict in CXWLlist" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="是否校正:" prop="isRvs">
                            <el-checkbox true-label="1" false-label="0" v-model="form.isRvs"></el-checkbox>
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
                        <el-form-item label="侧线进出类型:" prop="slineInoutTypeId">
                            <el-select v-model="form.slineInoutTypeId" placeholder="侧线进出类型">
                                <el-option v-for="dict in CXtype" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="精度:" prop="pres">
                            <el-input v-model="form.pres" placeholder="精度" type="number"></el-input>
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
                        <el-form-item label="关联侧线:" prop="refSideLineId">
                            <el-input v-model="form.refSideLineId" placeholder="关联侧线" type="number"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="备注:">
                            <el-input v-model="form.des" maxlength="30" placeholder="备注"></el-input>
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
        <!-- 公式验证编辑 -->
        <varPop :openGS="openGS" @close="handleClose" @submit-to-parent="submitForm"></varPop>
    </div>
</template>

<script>
import { getToken } from "@/utils/auth";
import varPop from "../../component/varPop.vue";
export default {
    name: "Siding",
    dicts: ['work_c', 'work_type', 'var_end'],
    components: { varPop },
    data() {
        return {
            isGShandleUpdate1: true,//判断是否是界区计量按钮点击进入的弹窗
            CXtype: [],//侧线进出类型
            ZZUList: [],//装置，装置组类型
            CXWLlist: [],//侧线物料类型
            // 列信息
            columns: [
                { key: 0, label: `编号`, visible: true },
                { key: 1, label: `编码`, visible: true },
                { key: 2, label: `名称`, visible: true },
                { key: 3, label: `别名`, visible: true },
                { key: 4, label: `精度`, visible: true },
                { key: 5, label: `装置组`, visible: true },
                { key: 6, label: `装置`, visible: true },
                { key: 7, label: `侧线物料类型`, visible: true },
                { key: 8, label: `侧线进出类型`, visible: true },
                { key: 9, label: `回流关联侧线编号`, visible: true },
                { key: 10, label: `回流关联侧线编号`, visible: true },
                { key: 11, label: `是否校正`, visible: true },
                { key: 12, label: `回流关联侧线编号`, visible: true },
                { key: 13, label: `启用标识`, visible: true },
                { key: 14, label: `显示顺序`, visible: true },
                { key: 15, label: `备注`, visible: true },
                { key: 16, label: `界区计量公式`, visible: true },
                { key: 17, label: `侧线计量公式`, visible: true },
            ],
            outType: [
                { label: '所有', value: "0" },
                { label: '进', value: "1" },
                { label: '出', value: "2" },
                { label: '消耗', value: "3" },
                { label: '存差', value: "4" },
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
                url: process.env.VUE_APP_BASE_API + "/mes/sideLine/import"
            },
            // 查询参数
            queryParams: {
                "id": "",
                "isAsc": "",
                "nodeCode": "",
                "nodeName": "",
                "orderByColumn": "",
                "pageNum": 1,
                "pageSize": 10,
                "reasonable": true,
                "slineInoutTypeId": "",
                "unitId": ""
            },
            // 表单校验
            rules: {
                nodeNum: [
                    { required: true, message: "编号", trigger: "blur" }
                ],
                nodeCode: [
                    { required: true, message: "编码", trigger: "blur" }
                ],
                nodeName: [
                    { required: true, message: "名称", trigger: "blur" }
                ],
                nodeAlias: [
                    { required: true, message: "别名", trigger: "blur" }
                ],
            },

        };
    },
    watch: {},
    created() {
        this.getList();
        this.getOther();
    },
    methods: {
        getOther() {
            //侧线物料类型
            this.$api.i_slineMtrlType().then(res => {
                this.CXWLtype = res.data.map(e => {
                    return {
                        label: e.name,
                        value: e.id
                    }
                })
            })
            //侧线进出类型
            this.$api.i_slineIOTypeList().then(res => {
                this.CXtype = res.data.map(e => {
                    return {
                        label: e.name,
                        value: e.id
                    }
                })
            })
            //装置  / 装置组
            this.$api.i_unitListall({ unitName: "" }).then(res => {
                this.ZZUList = res.data.map(e => {
                    return {
                        label: e.unitName,
                        value: e.id
                    }
                })
            })
            //侧线物料字典
            this.$api.i_slineMtrlType().then(res => {
                this.CXWLlist = res.data.map(r => {
                    return {
                        label: r.name,
                        value: r.id
                    }
                })
            })
        },
        // 界区计量公式按钮
        GShandleUpdate1(row) {
            this.reset();
            this.isGShandleUpdate1 = true
            const userId = row.id || this.ids[0];
            this.$api.i_sideLineByID({ id: userId }).then(response => {
                this.form = response.data;
                this.openGS = true;
            });

        },
        //侧线计量公式按钮
        GShandleUpdate2(row) {
            this.reset();
            this.isGShandleUpdate1 = false
            const userId = row.id || this.ids[0];
            this.$api.i_sideLineByID({ id: userId }).then(response => {
                this.form = response.data;
                this.openGS = true;
            });
        },
        //传给子组件的控制方法
        handleClose() {
            this.openGS = false; // 关闭父组件的弹窗
            this.reset();
        },
        /** 查询列表 */
        getList() {
            this.loading = true;
            this.$api.i_sideLineList(this.queryParams).then(response => {
                this.userList = response.rows
                this.total = response.total
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
                "areaForm": "",
                "des": "",
                "displayOrder": "1000",
                "formula": "",
                "id": undefined,
                "isRvs": "1",
                "nodeAlias": "",
                "nodeCode": "",
                "nodeName": "",
                "nodeNum": "",
                "pres": "",
                "refSideLineId": null,
                "slineInoutTypeId": null,
                "slineMtrlTypeId": null,
                "slineSuMtrlTypeId": null,
                "unitGroupId": null,
                "unitId": null,
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
            this.$api.i_sideLineByID({ id: userId }).then(response => {
                this.form = response.data;
                this.open = true;
                this.title = "修改信息";
            });
        },
        /** 提交按钮 */
        submitForm: function (field101) {
            if (typeof field101 === 'string') {
                this.$api.i_sideLineSU({
                    "id": this.form.id,
                    "des": this.form.des,
                    "pres": this.form.pres,
                    "isRvs": this.form.isRvs,
                    "unitId": this.form.unitId,
                    "useFlag": this.form.useFlag,
                    "nodeNum": this.form.nodeNum,
                    "formula": this.isGShandleUpdate1 ? this.form.formula : field101,
                    "nodeCode": this.form.nodeCode,
                    "nodeName": this.form.nodeName,
                    "areaForm": this.isGShandleUpdate1 ? field101 : this.form.areaForm,
                    "nodeAlias": this.form.nodeAlias,
                    "unitGroupId": this.form.unitGroupId,
                    "displayOrder": this.form.displayOrder,
                    "refSideLineId": this.form.refSideLineId,
                    "slineInoutTypeId": Number(this.form.slineInoutTypeId),
                    "slineMtrlTypeId": Number(this.form.slineMtrlTypeId),
                    "slineSuMtrlTypeId": this.form.slineSuMtrlTypeId,
                }).then(response => {
                    this.getList();
                }).catch(error => {
                    // 处理请求错误，例如显示错误信息
                    console.error("请求失败:", error);
                });
            }
            this.$refs["form"].validate(valid => {
                if (valid) {
                    const requestData = {
                        "id": this.form.id !== undefined ? this.form.id : undefined,
                        "des": this.form.des,
                        "pres": this.form.pres,
                        "isRvs": this.form.isRvs,
                        "unitId": this.form.unitId,
                        "useFlag": this.form.useFlag,
                        "nodeNum": this.form.nodeNum,
                        "formula": this.form.formula,
                        "nodeCode": this.form.nodeCode,
                        "nodeName": this.form.nodeName,
                        "areaForm": this.form.areaForm,
                        "nodeAlias": this.form.nodeAlias,
                        "unitGroupId": this.form.unitGroupId,
                        "displayOrder": this.form.displayOrder,
                        "refSideLineId": this.form.refSideLineId,
                        "slineInoutTypeId": Number(this.form.slineInoutTypeId),
                        "slineMtrlTypeId": Number(this.form.slineMtrlTypeId),
                        "slineSuMtrlTypeId": this.form.slineSuMtrlTypeId,
                    };

                    this.$api.i_sideLineSU(requestData).then(response => {
                        if (this.form.id !== undefined) {
                            this.$modal.msgSuccess("修改成功");
                        } else {
                            this.$modal.msgSuccess("新增成功");
                        }
                        this.open = false;
                        this.getList();
                    }).catch(error => {
                        // 处理请求错误，例如显示错误信息
                        console.error("请求失败:", error);
                    });
                }
            });
        },

        /** 删除按钮操作 */
        handleDelete(row) {
            const userIds = row.id || this.ids[0];
            this.$modal.confirm('是否确认删除"' + userIds + '"的数据项？').then(() => {
                return this.$api.i_sideLineDel({ id: userIds })
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => { });
        },
        /** 导出按钮操作 */
        handleExport() {
            this.download('mes/sideLine/export', {
                ...this.queryParams
            }, `侧线_${new Date().getTime()}.xlsx`)
        },
        /** 导入按钮操作 */
        handleImport() {
            this.upload.title = "数据导入";
            this.upload.open = true;
        },
        /** 下载模板操作 */
        importTemplate() {
            this.download('mes/sideLine/export', {
            }, `侧线_${new Date().getTime()}.xlsx`)
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
