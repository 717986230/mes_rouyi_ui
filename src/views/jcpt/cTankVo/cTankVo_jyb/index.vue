<template>
    <!-- 立罐静压修正表 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="100px">
            <el-form-item label="罐:" style="margin-left: -50px;">
                <el-select placeholder="请选择罐" filterable prop="tankName" v-model="queryParams.tankName" clearable>
                    <el-option v-for="tank in tankList" :key="tank.value" :label="tank.label" :value="tank.label" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="handleQuery">查询</el-button>
                <el-button size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
            <el-form-item label="罐:" style="float: right;">
                <el-select style="margin-right:10px ;" placeholder="请选择罐" filterable v-model="queryParams.tankId" clearable
                    @change="tankNameChange">
                    <el-option v-for="tank in tankList" :key="tank.value" :label="tank.label" :value="tank.value" />
                </el-select>
                <el-button type="danger" plain icon="el-icon-delete" size="mini" @click="handleBatchDelete">批量删除</el-button>
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
                <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="single"
                    @click="handleDelete">删除</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="info" plain icon="el-icon-upload2" size="mini" @click="handleImport">导入</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport">导出</el-button>
            </el-col>

        </el-row>
        <el-table v-loading="loading" :data="dataList" @selection-change="handleSelectionChange">
            <el-table-column fixed="left" type="selection" width="50" align="center" />
            <el-table-column label="罐编号" sortable align="center" key="tankId" prop="tankId" v-if="columns[0].visible" />
            <el-table-column label="罐" sortable align="center" key="tankName" prop="tankName" :show-overflow-tooltip="true"
                v-if="columns[1].visible" />
            <el-table-column label="液位整数位" sortable align="center" key="intPl" prop="intPl" :show-overflow-tooltip="true"
                v-if="columns[2].visible" />
            <el-table-column label="液位第一小数位" sortable align="center" key="fstDecFra" prop="fstDecFra" width="120"
                :show-overflow-tooltip="true" v-if="columns[3].visible" />
            <el-table-column label="静压修正值" sortable align="center" key="presRevCofe" prop="presRevCofe"
                :show-overflow-tooltip="true" v-if="columns[4].visible" />
            <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
                    <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
            @pagination="getList" />
        <!-- 新增信息 -->
        <el-dialog :title="title" :visible.sync="open" width="800px" align append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="130px">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="罐:" prop="tankId">
                            <el-select v-model="form.tankId" placeholder="请选择罐" clearable>
                                <el-option v-for="tank in tankList" :key="tank.value" :label="tank.label"
                                    :value="tank.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="页面整数位:" prop="intPl">
                            <el-input type="number" v-model="form.intPl" placeholder="请输入页面整数位" maxlength="11" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="液面第一小数位:" prop="fstDecFra">
                            <el-input type="number" v-model="form.fstDecFra" placeholder="液面第一小数位" maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="静压修正值:" prop="presRevCofe">
                            <el-input type="number" v-model="form.presRevCofe" placeholder="请输入静压修正值" />
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
    </div>
</template>

<script>
import { getToken } from "@/utils/auth";
export default {
    name: "cTankVo_jyb",
    dicts: ['work_c', 'work_type', 'var_end'],
    data() {
        return {
            // 列信息

            roleOptions: [
                {
                    label: "1", value: "1"
                },
                {
                    label: "2", value: "2"
                },
                {
                    label: "3", value: "3"
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
            dataList: null,
            // 弹出层标题
            title: "",
            formType: "add",

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
                url: process.env.VUE_APP_BASE_API + "/mes/stdPresCoef/import"
            },
            // 查询参数
            queryParams: {
                "id": undefined,
                "isAsc": "",
                "orderByColumn": "",
                "pageNum": 1,
                "pageSize": 10,
                "reasonable": true,
                "tankName": ""
            },

            // 表单校验
            rules: {
                tankId: [
                    { required: true, message: "请选择罐", trigger: "blur" },
                ],
                intPl: [
                    { required: true, message: "请输入液面整数位", trigger: "blur" },
                ],
                fstDecFra: [
                    { required: true, message: "请输入液面第一小数位", trigger: "blur" },
                ],
                presRevCofe: [
                    { required: true, message: "请输入静压修正值", trigger: "blur" },
                ],
            },
            //列数据
            // 列信息
            columns: [
                { key: 0, label: `罐编号`, visible: true },
                { key: 1, label: `罐`, visible: true },
                { key: 2, label: `页面整数位`, visible: true },
                { key: 3, label: `液面第一小数位`, visible: true },
                { key: 4, label: `静压修正值`, visible: true },
            ],
            //罐数据
            tankList: [],

        };
    },
    watch: {},
    created() {
        this.getList();
        this.getTankList();
    },
    methods: {
        tankNameChange(e) {
            let nowData = this.tankList.filter(item => item.tankName == e)[0]
            this.queryParams.id = nowData.id
        },
        /** 查询用户列表 */
        getList() {
            this.loading = true;
            this.$api.i_stdPresCoefList(this.queryParams).then((res) => {
                if (res.code == 200) {
                    console.log('接口成功', res)
                    this.dataList = res.rows
                    this.total = res.total;
                } else {
                    console.log(`接口成功,但接口状态=${res.code}`, res)
                }
            }).catch((err) => {
                console.log('接口失败', err)
            })
            this.loading = false;
        },
        //获取罐列表
        getTankList() {
            //罐类型
            this.$api.i_tankAllList({
                tankAreaId: ""
            }).then(res => {
                this.tankList = res.data.map(e => {
                    return {
                        value: e.id,
                        label: e.name
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
                tankId: '',
                intPl: '',
                presRevCofe: '',
                fstDecFra: '',
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
            this.$refs['queryForm'].resetFields();
            console.log()
            this.queryParams = {
                ...this.queryParams,
                ...{
                    tankName: ''
                }
            }
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
                    this.$api.i_stdPresCoefAddOrUpdate(this.form).then((res) => {
                        if (res.code == 200) {
                            console.log('接口成功', res)
                            this.$modal.msgSuccess(this.formType == 'edit' ? "修改成功" : "新增成功");
                            this.open = false;
                            this.getList();
                        } else {
                            console.log(`接口成功,但接口状态=${res.code}`, res)
                            this.open = false;
                            this.getList();
                        }
                    })
                        .catch((err) => {
                            console.log('接口失败', err)
                            this.$modal.msgError(err);
                            this.open = false;
                            this.getList();
                        })
                }
            });
        },
        /** 新增按钮操作 */
        handleAdd() {
            this.reset();
            this.title = "添加信息";
            this.formType = 'add'
            this.open = true;

        },
        /** 修改按钮操作 */
        handleUpdate(row) {
            this.reset();
            const userId = row.id || this.ids[0];
            this.$api.i_stdPresCoefByid({ id: userId }).then(response => {
                this.form = response.data;
                this.open = true;
                this.title = "修改信息";
            });
        },

        /** 删除按钮操作 */
        handleDelete(row) {
            const userIds = row.id || this.ids[0];
            this.$modal.confirm('是否确认删除"' + userIds + '"的数据项？').then(() => {
            }).then(() => {
                this.$api.i_stdPresCoefDel({ id: userIds }).then((res) => {
                    if (res.code == 200) {
                        console.log('接口成功', res)
                        this.$modal.msgSuccess("删除成功");
                        this.getList();
                    } else {
                        console.log(`接口成功,但接口状态=${res.code}`, res)
                    }
                })
                    .catch((err) => {
                        console.log('接口失败', err)
                        this.$modal.msgError(err);
                    })
            }).catch(() => { });
        },
        /** 导出按钮操作 */
        handleExport() {
            this.download('mes/stdPresCoef/export', {
                ...this.queryParams
            }, `立罐静压修正表_${new Date().getTime()}.xlsx`)
        },
        /** 导入按钮操作 */
        handleImport() {
            this.upload.title = "数据导入";
            this.upload.open = true;
        },
        /** 下载模板操作 */
        importTemplate() {
            this.download('system/user/importTemplate', {
            }, `立罐静压修正表_${new Date().getTime()}.xlsx`)
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
        },
        //批量删除
        handleBatchDelete() {
            this.$modal.confirm('是否确认批量删除"' + this.queryParams.tankId + '"的所有数据项？').then(() => {
            }).then(() => {
                this.$api.i_stdPresCoefDelByTankId({ tankId: this.queryParams.tankId }).then((res) => {
                    if (res.code == 200) {
                        this.$modal.msgSuccess("删除成功");
                        this.queryParams.tankId = ''
                        this.getList();
                    } else {
                        console.log(`接口成功,但接口状态=${res.code}`, res)
                    }
                })
            }).catch(() => { });
        }
    }
};
</script>

