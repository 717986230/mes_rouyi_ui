<template>
    <!-- 能源绩效指标规则 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="100px">
            <el-form-item label="名称:" prop="unitName" style="margin-left: -50px;">
                <el-input v-model="queryParams.unitName" placeholder="名称" clearable @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="规则等级:" prop="unitTypeId">
                <el-select v-model="queryParams.unitTypeId" placeholder="规则等级" clearable>
                    <el-option v-for="dict in ruleHierarchy" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="量值类型:" prop="nodeAreaId">
                <el-select v-model="queryParams.nodeAreaId" placeholder="量值类型" clearable>
                    <el-option v-for="dict in magnitudeType" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="指标类型:" prop="nodeAreaId1">
                <el-select v-model="queryParams.nodeAreaId1" placeholder="指标类型" clearable>
                    <el-option v-for="dict in dataType" :key="dict.value" :label="dict.label" :value="dict.value" />
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
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
        <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
            <el-table-column fixed="left" type="selection" width="50" align="center" />
            <el-table-column label="序号" fixed="left" type="index" width="50" align="center" />
            <el-table-column label="名称" align="center" sortable key="name" prop="name" :show-overflow-tooltip="true" />
            <el-table-column label="规则等级" align="center" sortable key="ruleLevel" prop="ruleLevel"
                :show-overflow-tooltip="true" />
            <el-table-column label="量值类型" align="center" sortable key="valueType" prop="valueType"
                :show-overflow-tooltip="true" />
            <el-table-column label="能源介质" align="center" sortable key="energyMedium" prop="energyMedium"
                :show-overflow-tooltip="true" />
            <el-table-column label="指标量" align="center" sortable key="metricQuantity" prop="metricQuantity" width="120" />
            <el-table-column label="指标类型" align="center" sortable key="metricType" prop="metricType" width="130" />
            <el-table-column label="有效开始时间" align="center" sortable key="effectiveStartTime" prop="effectiveStartTime"
                width="130" />
            <el-table-column label="有效结束时间" align="center" sortable key="effectiveEndTime" prop="effectiveEndTime"
                width="130" />
            <el-table-column label="启用标识" align="center">
                <template slot-scope="scope">
                    <el-checkbox disabled @change="handleChange(scope.row)" true-label="1" false-label="0"
                        v-model="scope.row.enableFlag"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="备注" align="center" sortable key="remarks" prop="remarks" width="120" />
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
                        <el-form-item label="名称:" prop="name">
                            <el-input v-model="form.name" placeholder="名称" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="规则等级:" prop="ruleLevel">
                            <el-select v-model="form.ruleLevel" placeholder="规则等级">
                                <el-option v-for="(item, index) in ruleHierarchy" :key="index" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="能源介质:" prop="energyMedium">
                            <el-select v-model="form.energyMedium" placeholder="能源介质">
                                <el-option v-for="(item, index) in energyMaterial" :key="index" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="量值类型:" prop="valueType">
                            <el-select v-model="form.valueType" placeholder="量值类型">
                                <el-option v-for="dict in magnitudeType" :key="dict.value" :label="dict.label"
                                    :value="dict.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="指标量:" prop="metricQuantity">
                            <el-input type="number" v-model="form.metricQuantity"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="指标类型:" prop="metricType">
                            <el-select v-model="form.metricType" placeholder="指标类型">
                                <el-option v-for="dict in dataType" :key="dict.value" :label="dict.label"
                                    :value="dict.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="是否启用:" prop="enableFlag">
                            <el-checkbox v-model="form.enableFlag" false-label="0" true-label="1"></el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="备注:">
                            <el-input v-model="form.remarks" placeholder="请输入内容"></el-input>
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
    name: "RulesForEnergyPerformanceIndicators",
    data() {
        return {
            //指标类型
            dataType: [
                {
                    label: "班指标",
                    value: "1"
                },
                {
                    label: "日指标",
                    value: "2"
                },
                {
                    label: "旬指标",
                    value: "3"
                },
                {
                    label: "月指标",
                    value: "4"
                },
                {
                    label: "年指标",
                    value: "5"
                }
            ],
            //量值类型
            magnitudeType: [
                {
                    label: "全部",
                    value: "1"
                },
                {
                    label: "消耗品",
                    value: "2"
                },
                {
                    label: "生产品",
                    value: "3"
                },
                {
                    label: "单耗",
                    value: "4"
                }
            ],
            //规则等级
            ruleHierarchy: [
                {
                    label: "全部",
                    value: "1"
                },
                {
                    label: "全厂级",
                    value: "2"
                },
                {
                    label: "管网级",
                    value: "3"
                },
                {
                    label: "区域级",
                    value: "4"
                },
                {
                    label: "设备级",
                    value: "5"
                },
            ],
            //能源介质 选项
            energyMaterial: [
                {
                    label: "天然气",
                    value: "2"
                },
                {
                    label: "电力",
                    value: "3"
                },
                {
                    label: "燃煤",
                    value: "4"
                },
                {
                    label: "石油",
                    value: "5"
                },
                {
                    label: "天然气",
                }
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
                url: process.env.VUE_APP_BASE_API + "/mes/unit/import"
            },
            // 查询参数
            queryParams: {
                "id": "",
                "isAsc": "",
                "nodeAreaId": "",
                "orderByColumn": "",
                "pageNum": 1,
                "pageSize": 10,
                "reasonable": true,
                "unitCode": "",
                "unitAlias": "",
                "unitName": "",
                "unitTypeId": ""
            },
            // 表单校验
            rules: {
                displayOrder: [
                    { required: true, message: "请选择", trigger: "blur" },
                ],
                unitAlias: [
                    { required: true, message: "请输入", trigger: "blur" }
                ],
                unitName: [
                    { required: true, message: "请输入名称", trigger: "blur" }
                ],
                nodeAreaId: [
                    { required: true, message: "请选择", trigger: "blur" }
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
            this.$api.i_energyPerformanceIndicatorRuleList(this.queryParams).then(response => {
                this.userList = response.data.rows
                this.total = response.data.total;
                this.loading = false;
            }
            );
        },
        getOther() {


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
                "des": "",
                "capacity": 0,
                "unitNum": "",
                "useFlag": "1",
                "sectorId": "",
                "unitCode": "",
                "unitName": "",
                "unitAlias": "",
                "nodeAreaId": "",
                "unitTypeId": "",
                "upperUnitId": "",
                "displayOrder": "1000",
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
            this.form = row;
            this.open = true;
            this.title = "修改信息";
        },
        /** 提交按钮 */
        submitForm: function () {
            this.msgSuccess('保存成功')
            this.open = false;
            this.getList();
            return false
        },
        /** 删除按钮操作 */
        handleDelete(row) {
            const userIds = row.id || this.ids[0];
            this.$modal.confirm('是否确认删除"' + userIds + '"的数据项？').then(() => {

            }).then(() => {
                this.getList();
                this.msgSuccess("删除成功");
            }).catch(() => { });
        },
        /** 导出按钮操作 */
        handleExport() {
            this.download('mes/unit/export', {
                ...this.queryParams
            }, `能源绩效指标规则_${new Date().getTime()}.xlsx`)
        },
        /** 导入按钮操作 */
        handleImport() {
            this.upload.title = "数据导入";
            this.upload.open = true;
        },
        /** 下载模板操作 */
        importTemplate() {
            this.download('mes/unit/export', {
            }, `能源绩效指标规则_${new Date().getTime()}.xlsx`)
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
