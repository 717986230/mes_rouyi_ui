<template>
    <!-- 立罐分米(厘米)维护 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="100px">
            <el-form-item label="罐:" style="margin-left: -60px;" prop="tankName">
                <el-input v-model="queryParams.tankName" placeholder="请输入罐" maxlength="11" />
            </el-form-item>
            <el-form-item label="液位高度≥" prop="hgt">
                <el-input v-model="queryParams.hgt" placeholder="请输入液位高度" maxlength="11" type="number" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="handleQuery">查询</el-button>
                <el-button size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
            <el-form-item label="罐:" style="float: right;">
                <el-select style="margin-right:10px ;" placeholder="请选择罐" filterable v-model="queryParams.id" clearable
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
            <el-table-column label="罐编号" sortable align="center" key="id" prop="id" v-if="columns[0].visible" />
            <el-table-column label="罐" sortable align="center" key="tankName" prop="tankName" :show-overflow-tooltip="true"
                v-if="columns[1].visible" />
            <el-table-column label="液位高度" sortable align="center" key="hgt" prop="hgt" :show-overflow-tooltip="true"
                v-if="columns[2].visible" />
            <el-table-column label="分米罐容值" sortable align="center" key="dmCuba" prop="dmCuba" :show-overflow-tooltip="true"
                v-if="columns[3].visible" />
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
        <el-dialog :title="title" :visible.sync="open" width="500px" align append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="120px">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="罐:" prop="tankId">
                            <el-select style="width: 250px;" :disabled="form.id" v-model="form.tankId" placeholder="请选择罐"
                                clearable>
                                <el-option v-for="tank in tankList" :key="tank.value" :label="tank.label"
                                    :value="tank.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item label="液位高度:" prop="hgt">
                            <el-input style="width: 250px;" :disabled="form.id" type="number" v-model="form.hgt"
                                placeholder="请输入液位高度" maxlength="11" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="分米罐容值:" prop="dmCuba">
                            <el-input style="width: 250px;" type="number" v-model="form.dmCuba" placeholder="请输入分米罐容值"
                                maxlength="30" />
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
    name: "cTankVo_lgf",
    dicts: ['work_c', 'work_type', 'var_end'],
    data() {
        return {
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
            dataList: null,
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
                url: process.env.VUE_APP_BASE_API + "mes/stdDmCuab/import"
            },
            // 查询参数
            queryParams: {
                "hgt": "",
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
                tankId: [{ required: true, message: "请选择罐", trigger: "change" }],
                hgt: [{ required: true, message: "请输入液位高度", trigger: "change" }],
                dmCuba: [{ required: true, message: "请输入分米罐容值", trigger: "change" }],
            },
            // 列信息
            columns: [
                { key: 0, label: `罐编号`, visible: true },
                { key: 1, label: `罐`, visible: true },
                { key: 2, label: `液位高度`, visible: true },
                { key: 3, label: `分米罐容值`, visible: true },
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
        /** 查询用户列表 */
        getList() {
            this.loading = true;
            this.$api.i_stdDmCuabList(this.queryParams).then(response => {
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
                "dmCuba": "",
                "hgt": "",
                "id": undefined,
                "tankId": undefined
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
                    id: '',
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
                    if (this.form.id != undefined) {
                        this.$api.i_stdDmCuabSU({
                            "dmCuba": this.form.dmCuba,
                            "hgt": this.form.hgt,
                            "id": this.form.id,
                            "tankId": this.form.tankId,
                        }).then(response => {
                            this.$modal.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        this.$api.i_stdDmCuabSU(this.form).then(response => {
                            this.$modal.msgSuccess("新增成功");
                            this.open = false;
                            this.getList();
                        });
                    }
                }
            });
        },
        /** 新增按钮操作 */
        handleAdd() {
            this.reset();
            this.title = "添加信息";
            this.open = true;
        },
        /** 修改按钮操作 */
        handleUpdate(row) {
            this.reset();
            const userId = row.id || this.ids[0];
            this.$api.i_stdDmCuabByid({ id: userId }).then(response => {
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
                this.$api.i_stdDmCuabDel({ id: userIds })
            }).then(() => {
                this.$modal.msgSuccess("删除成功");
                this.getList();
            }).catch(() => { });
        },
        /** 导出按钮操作 */
        handleExport() {
            this.download('mes/stdDmCuab/export', {
                ...this.queryParams
            }, `立罐分米(厘米)维护_${new Date().getTime()}.xlsx`)
        },
        /** 导入按钮操作 */
        handleImport() {
            this.upload.title = "数据导入";
            this.upload.open = true;
        },
        /** 下载模板操作 */
        importTemplate() {
            this.download('mes/stdDmCuab/export', {
            }, `立罐分米(厘米)维护_${new Date().getTime()}.xlsx`)
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
        tankNameChange(e) {
            console.log(e)
            let nowData = this.tankList.filter(item => item.tankName == e)[0]
            this.queryParams.id = nowData.id
        },

        //批量删除
        handleBatchDelete() {
            this.$modal.confirm('是否确认批量删除"' + this.queryParams.id + '"的数据项？').then(() => {
                return this.$api.i_stdDmCuabdeleteByTankId({ tankId: this.queryParams.id })
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => { });
        },

    }
};
</script>
