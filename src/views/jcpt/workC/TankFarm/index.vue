
<template>
    <!-- 罐区 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="50px">
            <el-form-item label="编码:" prop="tankCode">
                <el-input v-model="queryParams.tankCode" placeholder="编码" clearable @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="名称:" prop="tankAreaName">
                <el-input v-model="queryParams.tankAreaName" placeholder="名称" clearable @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="车间:" prop="mesWspId">
                <el-select v-model="queryParams.mesWspId" placeholder="车间" clearable>
                    <el-option v-for="dict in CJtypeList" :key="dict.value" :label="dict.label"
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
        <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
            <el-table-column fixed="left" type="selection" width="50" align="center" />
            <el-table-column label="编号" align="center" sortable key="tankNum" prop="tankNum" v-if="columns[0].visible" />
            <el-table-column label="编码" align="center" sortable key="tankCode" prop="tankCode" v-if="columns[1].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="名称" align="center" sortable key="tankAreaName" prop="tankAreaName"
                v-if="columns[2].visible" :show-overflow-tooltip="true" />
            <el-table-column label="别名" align="center" sortable key="tankAreaNameAlias" prop="tankAreaNameAlias"
                v-if="columns[3].visible" :show-overflow-tooltip="true" />
            <el-table-column label="车间" align="center" sortable key="mesWspName" prop="mesWspName" v-if="columns[4].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="是否启用" align="center" sortable key="useFlag" prop="useFlag" v-if="columns[5].visible">
                <template slot-scope="scope">
                    <el-checkbox false-label="0" true-label="1" disabled v-model="scope.row.useFlag"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="显示顺序" sortable align="center" key="displayOrder" prop="displayOrder" width="160"
                v-if="columns[6].visible">
            </el-table-column>
            <el-table-column label="备注" align="center" sortable key="des" prop="des" width="120"
                v-if="columns[7].visible" />
            <el-table-column fixed="right" label="操作" align="center" width="160" class-name="small-padding fixed-width">
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
                        <el-form-item label="编号:" prop="tankNum">
                            <el-input v-model="form.tankNum" :disabled="formType == 'edit'" placeholder="请输入编号"
                                maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="名称:" prop="tankAreaName">
                            <el-input v-model="form.tankAreaName" placeholder="请输入名称" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="编码:" prop="tankCode">
                            <el-input v-model="form.tankCode" placeholder="请输入编码" maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="别名:" prop="tankAreaNameAlias">
                            <el-input v-model="form.tankAreaNameAlias" placeholder="请输入别名" />
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
                        <el-form-item label="车间:" prop="mesWspId">
                            <el-select v-model="form.mesWspId" placeholder="车间">
                                <el-option v-for="dict in CJtypeList" :key="dict.value" :label="dict.label"
                                    :value="dict.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="显示顺序:" prop="displayOrder">
                            <el-input v-model="form.displayOrder" placeholder="显示顺序"></el-input>
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
    name: "TankFarm",
    dicts: ['work_c', 'work_type', 'var_end'],
    components: {},
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
            ],
            CJtypeList: [],
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
            formType: "add",

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
                url: process.env.VUE_APP_BASE_API + "/mes/tankArea/import"
            },
            // 查询参数
            queryParams: {
                "tankCode": "",
                "tankAreaName": "",
                "tankNum": "",
                "isAsc": "",
                "orderByColumn": "",
                "pageNum": 1,
                "pageSize": 10,
                "reasonable": true,
                "mesWspId": '',
            },
            // 表单校验
            rules: {
                tankNum: [
                    { required: true, message: "请输入编号", trigger: "blur" },
                ],
                tankCode: [
                    { required: true, message: "请输入编码", trigger: "blur" }
                ],
                tankAreaName: [
                    { required: true, message: "请输入名称", trigger: "blur" }
                ],
                tankAreaNameAlias: [
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
            //获取车间列表
            this.$api.i_mesWorkshopAllLis({ mesWspName: '' }).then(res => {
                if (res.code == 200) {
                    this.CJtypeList = res.data.map(e => {
                        return {
                            label: e.name,
                            value: e.id
                        }
                    })
                }
            });
        },
        //传给子组件的控制方法
        handleClose() {
            this.openGS = false; // 关闭父组件的弹窗
            this.reset();
        },
        getList() {
            this.loading = true;
            this.$api.i_tankAreaList(this.queryParams).then(res => {
                this.userList = res.rows.map(e => {
                    return {
                        ...e,
                        useFlag: String(e.useFlag)
                    }
                })
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
                "useFlag": "1",
                "displayOrder": "1000",
                "id": undefined,
                "isLock": "0",
                "mesWspId": "",
                "tankAreaName": "",
                "tankAreaNameAlias": "",
                "tankCode": "",
                "tankNum": "",
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
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.id);
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        },
        /** 新增按钮操作 */
        handleAdd() {
            this.reset();
            this.formType = 'add'
            this.open = true;
            this.title = "添加信息";
        },
        /** 修改按钮操作 */
        handleUpdate(row) {
            this.reset();
            const userId = row.id || this.ids[0];
            this.$api.i_tankAreaByid({ id: userId }).then(response => {
                this.form = response.data;
                this.form.useFlag = String(response.data.useFlag)
                this.formType = 'edit'
                this.open = true;
                this.title = "修改信息";
            });
        },
        /** 提交按钮 */
        submitForm: function () {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.form.id != undefined) {
                        this.$api.i_tankAreaSU({
                            "des": this.form.des,
                            "displayOrder": this.form.displayOrder,
                            "id": this.form.id,
                            "isLock": this.form.isLock,
                            "mesWspId": this.form.mesWspId,
                            "tankAreaName": this.form.tankAreaName,
                            "tankAreaNameAlias": this.form.tankAreaNameAlias,
                            "tankCode": this.form.tankCode,
                            "tankNum": this.form.tankNum,
                            "useFlag": this.form.useFlag,
                        }).then(response => {
                            this.$modal.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        this.$api.i_tankAreaSU({
                            "des": this.form.des,
                            "displayOrder": this.form.displayOrder,
                            "id": this.form.id,
                            "isLock": this.form.isLock,
                            "mesWspId": this.form.mesWspId,
                            "tankAreaName": this.form.tankAreaName,
                            "tankAreaNameAlias": this.form.tankAreaNameAlias,
                            "tankCode": this.form.tankCode,
                            "tankNum": this.form.tankNum,
                            "useFlag": this.form.useFlag,
                        }).then(response => {
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
                return this.$api.i_tankAreaDel({ id: userIds })
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => { });
        },
        /** 导出按钮操作 */
        handleExport() {
            this.download('mes/tankArea/export', {
                ...this.queryParams
            }, `罐区_${new Date().getTime()}.xlsx`)
        },
        /** 导入按钮操作 */
        handleImport() {
            this.upload.title = "数据导入";
            this.upload.open = true;
        },
        /** 下载模板操作 */
        importTemplate() {
            this.download('mes/tankArea/export', {
            }, `罐区_${new Date().getTime()}.xlsx`)
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
