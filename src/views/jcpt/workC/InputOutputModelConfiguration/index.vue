<template>
    <!-- 投入产出模型配置-装置投入产出 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="120px">
            <el-form-item label="加工方案:" style="margin-left: -50px;" prop="scheName">
                <el-input v-model="queryParams.scheName" placeholder="加工方案" clearable @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="侧线:" style="margin-left: -50px;" prop="nodeName">
                <el-input v-model="queryParams.nodeName" placeholder="侧线" clearable @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="物料:" style="margin-left: -50px;" prop="mtrlName">
                <el-input v-model="queryParams.mtrlName" placeholder="物料" clearable @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="工厂:" prop="mesFctrId">
                <el-select v-model="queryParams.mesFctrId" placeholder="工厂" clearable>
                    <el-option v-for="dict in GCListT" :key="dict.value" :label="dict.label" :value="dict.value" />
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
            <el-table-column label="加工方案" sortable align="center" width="120" prop="scheName" v-if="columns[0].visible" />
            <el-table-column label="侧线" sortable align="center" prop="nodeName" :show-overflow-tooltip="true"
                v-if="columns[1].visible" />
            <el-table-column label="物料" sortable align="center" prop="mtrlName" :show-overflow-tooltip="true"
                v-if="columns[2].visible" />
            <el-table-column label="工厂" sortable align="center" prop="mesFctrName" :show-overflow-tooltip="true"
                v-if="columns[3].visible" />
            <el-table-column label="收率上限" align="center" prop="ratioUplimit" :show-overflow-tooltip="true"
                v-if="columns[4].visible" />
            <el-table-column label="收率下限" align="center" prop="ratioDownlimit" :show-overflow-tooltip="true"
                v-if="columns[5].visible" />
            <el-table-column label="参考收率" align="center" prop="ratio" :show-overflow-tooltip="true"
                v-if="columns[6].visible" />
            <el-table-column label="启用标识" sortable align="center" width="100" v-if="columns[7].visible">
                <template slot-scope="scope">
                    <el-checkbox disabled true-label="1" false-label="0" v-model="scope.row.useFlag"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="显示顺序" sortable align="center" prop="displayOrder" width="160"
                v-if="columns[8].visible" />
            <el-table-column label="备注" sortable align="center" prop="des" width="120" v-if="columns[9].visible" />
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
                        <el-form-item label="工厂:" prop="mesFctrId">
                            <el-select v-model="form.mesFctrId" placeholder="请选择工厂" @change="handleChange">
                                <el-option v-for="dict in GCListT" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="加工方案:" prop="scheId">
                            <el-select v-model="form.scheId" placeholder="请选择加工方案">
                                <el-option v-for="dict in SanvList4" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="侧线:" prop="nodeId">
                            <el-select v-model="form.nodeId" placeholder="请选择侧线">
                                <el-option v-for="dict in SanvList3" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="物料:" prop="mtrlId">
                            <el-select v-model="form.mtrlId" placeholder="请选择物料">
                                <el-option v-for="dict in WLtype" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="收率上限:" prop="ratioUplimit">
                            <el-input v-model="form.ratioUplimit" type="number"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="收率下限:" prop="ratioDownlimit">
                            <el-input v-model="form.ratioDownlimit" type="number"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="参考收率:" prop="ratio">
                            <el-input v-model="form.ratio" type="number"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="显示顺序:" prop="displayOrder">
                            <el-input v-model="form.displayOrder" type="number"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="是否启用:" prop="useFlag">
                            <el-checkbox v-model="form.useFlag" false-label="0" true-label="1"></el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="备注:" prop="des">
                            <el-input v-model="form.des" />
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
    name: "InputOutputModelConfiguration",
    dicts: ['work_c', 'work_type', 'var_end'],
    components: {},
    data() {
        return {
            WLtype: [],
            GCListT: [],
            // 车间, 装置, 侧线，加工方案, 界区
            SanvList1: [],// 车间
            SanvList2: [],// 装置
            SanvList3: [],// 侧线，
            SanvList4: [],//加工方案

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
                url: process.env.VUE_APP_BASE_API + "/mes/inOutput/import"
            },
            // 查询参数
            queryParams: {
                "mesFctrId": "",
                "mtrlName": "",
                "nodeName": "",
                "orderByColumn": "",
                "pageNum": 1,
                "pageSize": 10,
                "reasonable": true,
                "scheName": ""
            },
            // 表单校验
            rules: {
                mesFctrId: [
                    { required: true, message: "请选择", trigger: "blur" }
                ],
                scheId: [
                    { required: true, message: "请选择", trigger: "blur" }
                ],
                nodeId: [
                    { required: true, message: "请选择", trigger: "blur" }
                ],
                mtrlId: [
                    { required: true, message: "请选择", trigger: "blur" }

                ],
            },
            // 列信息
            columns: [
                { key: 0, label: `加工方案`, visible: true },
                { key: 1, label: `侧线`, visible: true },
                { key: 2, label: `物料`, visible: true },
                { key: 3, label: `工厂`, visible: true },
                { key: 4, label: `收率上限`, visible: true },
                { key: 5, label: `收率下线`, visible: true },
                { key: 6, label: `参考收率`, visible: true },
                { key: 7, label: `启用标识`, visible: true },
                { key: 8, label: `显示顺序`, visible: true },
                { key: 9, label: `备注`, visible: true },
            ],
        };
    },
    watch: {},
    created() {
        this.getList();
        this.getOther();
    },
    methods: {
        handleChange(e) {
            // 根据工厂id获取车间,装置,侧线，加工方案,界区 /common/getByFctrId
            this.$api.i_commonGetFc({ mesFctrId: e }).then(res => {
                const mapData = (data) => data.map(e => ({ label: e.name, value: e.id }));
                this.SanvList1 = mapData(res.data.mesWorkshopByIdVOs);
                this.SanvList2 = mapData(res.data.pmNodeAreaGetByIdVOS);
                this.SanvList3 = mapData(res.data.pmSideLineGtByIdVOs);
                this.SanvList4 = mapData(res.data.schemeGetByIdVOs);
                this.form.scheId = this.SanvList4.length > 0 ? this.SanvList4[0].value : "";
                this.form.nodeId = this.SanvList3.length > 0 ? this.SanvList3[0].value : "";

            });
        },
        getOther() {
            //工厂下拉框列表
            this.$api.i_MESFactoryAllList().then(res => {
                this.GCListT = res.data.map(e => {
                    return {
                        label: e.mesFctrName,
                        value: e.mesFctrId
                    }
                })
            })
            //物料
            this.$api.i_mtrAllList().then(res => {
                this.WLtype = res.data.map(e => {
                    return {
                        label: e.name,
                        value: e.id
                    }
                })
            })
        },
        // /** 查询列表 */
        getList() {
            this.loading = true;
            this.$api.i_inOutputList(this.queryParams).then(res => {
                this.userList = res.rows.map(e => {
                    return {
                        ...e,
                        useFlag: String(e.useFlag)
                    }
                })
                this.total = res.total;
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
                "displayOrder": "1000",
                "id": undefined,
                "mtrlId": null,
                "nodeId": null,
                "ratio": "",
                "ratioDownlimit": "",
                "ratioUplimit": "",
                "scheId": null,
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
            const userIds = row.id || this.ids[0];
            this.$api.i_inOutputByid({ id: userIds }).then(res => {
                this.form = res.data
                this.form.useFlag = String(res.data.useFlag)
            })
            this.open = true;
            this.title = "修改信息";
        },
        /** 提交按钮 */
        submitForm: function () {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.form.id != undefined) {
                        this.$api.i_inOutputSU({
                            "des": this.form.des,
                            "displayOrder": this.form.displayOrder,
                            "id": this.form.id,
                            "mtrlId": this.form.mtrlId,
                            "nodeId": this.form.nodeId,
                            "ratio": this.form.ratio,
                            "ratioDownlimit": this.form.ratioDownlimit,
                            "ratioUplimit": this.form.ratioUplimit,
                            "scheId": this.form.scheId,
                            "useFlag": this.form.useFlag,
                        }).then(response => {
                            this.$modal.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        this.$api.i_inOutputSU(this.form).then(response => {
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
                return this.$api.i_inOutputDel({ id: userIds });
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => { });
        },
        /** 导出按钮操作 */
        handleExport() {
            this.download('mes/inOutput/export', {
                ...this.queryParams
            }, `投入产出模型配置_${new Date().getTime()}.xlsx`)
        },
        /** 导入按钮操作 */
        handleImport() {
            this.upload.title = "数据导入";
            this.upload.open = true;
        },
        /** 下载模板操作 */
        importTemplate() {
            this.download('mes/inOutput/export', {
            }, `投入产出模型配置_${new Date().getTime()}.xlsx`)
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
