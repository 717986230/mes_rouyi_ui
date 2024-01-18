<template>
    <!-- 复合能源核算单元 -->
    <div class="app-container">
        <div style="margin:10px 5px;font-size: 20px;">复合能源核算单元</div>
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="120px">
            <el-form-item label="核算单元名称:" prop="unitName">
                <el-input size="mini" v-model="form.unitName" placeholder="核算单元名称" maxlength="30" />
            </el-form-item>
            <el-form-item label="核算单元类型:" prop="type">
                <el-select size="mini" v-model="queryParams.type" placeholder="核算单元类型" clearable>
                    <el-option v-for="dict in UnitTypeList" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="是否启用:" prop="useFlag">
                <el-select size="mini" v-model="queryParams.useFlag" placeholder="是否启用" clearable>
                    <el-option v-for="dict in isStart" :key="dict.value" :label="dict.label" :value="dict.value" />
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
            <el-table-column label="核算单元ID" align="center" sortable key="id" prop="id" v-if="columns[0].visible" />
            <el-table-column label="核算单元编码" align="center" sortable key="unitCode" prop="unitCode" v-if="columns[1].visible"
                :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column label="核算单元名称" align="center" sortable key="unitName" prop="unitName" v-if="columns[2].visible"
                :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column label="核算单元别名" align="center" sortable key="unitAlias" prop="unitAlias"
                v-if="columns[2].visible" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column label="核算单元类型" align="center" sortable key="typeName" prop="typeName" v-if="columns[3].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="上级核算单元" align="center" sortable key="upperName" prop="upperName"
                v-if="columns[5].visible" :show-overflow-tooltip="true" />
            <el-table-column label="区域" align="center" sortable key="areaName" prop="areaName" v-if="columns[4].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="是否启用" align="center" sortable key="useFlag" prop="useFlag" v-if="columns[6].visible"
                :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <el-checkbox disabled true-label="1" false-label="0" v-model="scope.row.useFlag"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="说明" align="center" sortable key="des" prop="des" v-if="columns[7].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="排序" align="center" sortable key="displayOrder" prop="displayOrder"
                v-if="columns[8].visible" :show-overflow-tooltip="true" />
            <el-table-column fixed="right" label="操作" width="150" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
                    <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
            @pagination="getList" />
        <el-dialog :title="title" :visible.sync="open" width="850px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="120px">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="核算单元编号:" prop="unitNum">
                            <el-input v-model="form.unitNum" placeholder="核算单元编号" type="number" maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="核算单元编码:" prop="unitCode">
                            <el-input v-model="form.unitCode" placeholder="核算单元编码" maxlength="30" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="核算单元名称:" prop="unitName">
                            <el-input v-model="form.unitName" placeholder="核算单元名称" maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="核算单元别名:" prop="unitAlias">
                            <el-input v-model="form.unitAlias" placeholder="核算单元别名" maxlength="30" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="核算单元类型:" prop="type">
                            <el-select v-model="form.type" placeholder="核算单元类型" clearable @change="handleChange">
                                <el-option v-for="dict in UnitTypeList" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">

                        <el-form-item label="上级核算单元:" prop="upperId">
                            <el-select v-model="form.upperId" placeholder="上级核算单元" clearable>
                                <el-option v-for="dict in UpperUnitList" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="所属区域:" prop="areaId">
                            <el-select v-model="form.areaId" placeholder="所属区域" clearable>
                                <el-option v-for="dict in region" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="是否启用:" prop="useFlag">
                            <el-checkbox true-label="1" false-label="0" v-model="form.useFlag"></el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="描述:" prop="des">
                            <el-input v-model="form.des" placeholder="描述" maxlength="30"> </el-input>
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
    name: "DielectricScalingFactor",
    components: {},
    data() {
        return {
            UpperUnitList: [],//上级核算单元
            UnitTypeList: [],//复合能源核算单元
            region: [],
            isStart: [
                {
                    label: "全部",
                    value: " "
                },
                {
                    label: "启用",
                    value: "0"
                },
                {
                    label: "未启用",
                    value: "1"
                }
            ],
            // 列信息
            columns: [
                { key: 0, label: `核算单元ID`, visible: true },
                { key: 1, label: `核算单元编码`, visible: true },
                { key: 2, label: `核算单元名称`, visible: true },
                { key: 3, label: `核算单元别名`, visible: true },
                { key: 4, label: `核算单元类型`, visible: true },
                { key: 5, label: `上级核算单元`, visible: true },
                { key: 6, label: `区域`, visible: true },
                { key: 7, label: `是否启用`, visible: true },
                { key: 8, label: `说明`, visible: true },
                { key: 9, label: `排序`, visible: true },
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
                url: process.env.VUE_APP_BASE_API + "energy/compositeCalculateUnit/import"
            },
            // 查询参数
            queryParams: {
                "areaId": "",
                "id": undefined,
                "isAsc": "",
                "orderByColumn": "",
                "pageNum": 1,
                "pageSize": 10,
                "reasonable": true,
                "type": "",
                "unitName": "",
                "useFlag": " "
            },
            // 表单校验
            rules: {
                unitNum: [
                    { required: true, message: "编号", trigger: "blur" },
                ],
                unitCode: [
                    { required: true, message: "编码", trigger: "blur" }
                ],
                unitName: [
                    { required: true, message: "名称", trigger: "blur" }
                ],
                unitAlias: [
                    { required: true, message: "别名", trigger: "blur" }
                ],
                type: [
                    { required: true, message: "类型", trigger: "blur" }
                ]
            }
        };
    },
    watch: {},
    created() {

        this.getList();
        this.getOther();
    },
    methods: {
        //核算单元区域改变
        handleChange() {
            //复合能源核算单元区域
            this.$api.e_compositeCalculateUnitareaList({ "type": this.form.type }).then(res => {
                this.region = res.data.map(r => {
                    return {
                        label: r.name,
                        value: r.id
                    }
                })
            })
            this.form.areaId = this.region[0].value
        },
        close() {
            this.$emit('update:visible', false)
        },
        /** 查询用户列表 */
        getList() {
            this.loading = true;
            this.$api.e_compositeCalculateUnitList(this.queryParams).then(response => {
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
        getOther() {
            //复合能源核算单元-上级核算单元下拉列表
            this.$api.e_basicCalculateUnitALLList().then(res => {
                this.UpperUnitList = res.data.map(r => {
                    return {
                        label: r.name,
                        value: r.id
                    }
                })
            })
            //复合能源核算单元类型
            this.$api.e_compositeCalculateUnitTypeList().then(res => {
                this.UnitTypeList = res.data.map(r => {
                    return {
                        label: r.name,
                        value: r.id
                    }
                })
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
                "areaId": undefined,
                "des": "",
                "id": undefined,
                "type": "",
                "unitAlias": "",
                "unitCode": "",
                "unitName": "",
                "unitNum": "",
                "upperId": undefined,
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
            this.$api.e_compositeCalculateUnitByid({ id: userId }).then(response => {
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
                        this.$api.e_compositeCalculateUnitSU({
                            "areaId": this.form.areaId,
                            "des": this.form.des,
                            "id": this.form.id,
                            "type": this.form.type,
                            "unitAlias": this.form.unitAlias,
                            "unitCode": this.form.unitCode,
                            "unitName": this.form.unitName,
                            "unitNum": this.form.unitNum,
                            "upperId": this.form.upperId,
                            "useFlag": this.form.useFlag,
                        }).then(response => {
                            this.$modal.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        this.$api.e_compositeCalculateUnitSU(this.form).then(response => {
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
                return this.$api.e_compositeCalculateUnitDel({ id: userIds })
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => { });
        },
        /** 导出按钮操作 */
        handleExport() {
            this.download('energy/compositeCalculateUnit/export', {
                ...this.queryParams
            }, `复合能源核算单元_${new Date().getTime()}.xlsx`)
        },
        /** 导入按钮操作 */
        handleImport() {
            this.upload.title = "数据导入";
            this.upload.open = true;
        },
        /** 下载模板操作 */
        importTemplate() {
            this.download('energy/compositeCalculateUnit/export', {
            }, `复合能源核算单元_${new Date().getTime()}.xlsx`)
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
