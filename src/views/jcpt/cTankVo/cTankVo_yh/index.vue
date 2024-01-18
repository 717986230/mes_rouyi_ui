<template>
    <!-- 液化产品系数表 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="50px">
            <el-form-item label="物料:" prop="artcSt">
                <el-select v-model="queryParams.mtrlId" placeholder="请选择物料" clearable>
                    <el-option v-for="dict in sectorOption" :key="dict.value" :label="dict.label" :value="dict.value" />
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
                <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="single"
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
            <el-table-column fixed="left" label="液化产品系数编码" align="center" sortable key="id" prop="id"
                v-if="columns[0].visible" />
            <el-table-column label="物料编码" align="center" sortable key="mtrlCode" prop="mtrlCode" v-if="columns[1].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="物料" align="center" sortable key="mtrlName" prop="mtrlName" v-if="columns[2].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="密度温度系数" align="center" sortable key="denTempCofe" prop="denTempCofe"
                v-if="columns[3].visible" :show-overflow-tooltip="true" />
            <el-table-column label="体积温度系数(温度)" align="center" sortable key="cubaTempCofe" prop="cubaTempCofe"
                v-if="columns[4].visible" :show-overflow-tooltip="true" />
            <el-table-column label="密度" align="center" sortable key="den" prop="den" v-if="columns[5].visible"
                :show-overflow-tooltip="true" />
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
            <el-form ref="form" :model="form" :rules="rules" label-width="150px">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="物料:" prop="mtrlId">
                            <el-select v-model="form.mtrlId" placeholder="物料" clearable>
                                <el-option v-for="dict in sectorOption" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="密度温度系数:" prop="denTempCofe">
                            <el-input v-model="form.denTempCofe" placeholder="密度温度系数" maxlength="30" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="体积温度系数(温度):" prop="cubaTempCofe">
                            <el-input v-model="form.cubaTempCofe" placeholder="体积温度系数(温度)" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="3" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="密度:" prop="den">
                            <el-input v-model="form.den" placeholder="密度" />
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
    name: "cTankVo_yh",
    dicts: ['work_c', 'work_type', 'var_end'],
    data() {
        return {
            sectorOption: [],//物料
            // 列信息
            columns: [
                { key: 0, label: `液化产品系数编码`, visible: true },
                { key: 1, label: `物料编码`, visible: true },
                { key: 2, label: `物料`, visible: true },
                { key: 3, label: `密度温度系数`, visible: true },
                { key: 4, label: `体积温度系数(温度)`, visible: true },
                { key: 5, label: `密度`, visible: true },

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
                url: process.env.VUE_APP_BASE_API + "mes/liquefying/import"
            },
            // 查询参数
            queryParams: {
                "mtrlId": "",
                "pageNum": 1,
                "pageSize": 10,
            },
            // 表单校验
            rules: {
                mtrlId: [
                    { required: true, message: "请选择物料", trigger: "blur" },
                ],
                denTempCofe: [
                    { required: true, message: "请输入密度温度系数", trigger: "blur" }
                ],
                cubaTempCofe: [
                    { required: true, message: "请输入体积温度系数(温度)", trigger: "blur" }
                ],
                den: [
                    { required: true, message: "请输入密度", trigger: "blur" }
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
            this.$api.i_liquefyingList(this.queryParams).then(response => {
                this.userList = response.rows
                this.total = response.total;
                this.loading = false;
            }
            ).catch(error => {
                this.loading = false;
            })
        },
        getOther() {
            //获取物料列表
            this.$api.i_mtrAllList().then((res) => {
                if (res.code == 200) {
                    console.log('接口成功', res)
                    this.sectorOption = res.data.map(e => {
                        return {
                            value: e.id,
                            label: e.name
                        }
                    })
                } else {
                    console.log(`接口成功,但接口状态=${res.code}`, res)
                }
            })
                .catch((err) => {
                    console.log('接口失败', err)
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
                "den": "",
                "stNm": "",
                "cont": "",
                "id": undefined,
                "denTempCofe": "",
                "cubaTempCofe": "",
                "mtrlId": undefined,
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
            this.queryParams.mtrlId = ""
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
            this.$api.i_liquefyingByid({ id: userId }).then(response => {
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
                        this.$api.i_liquefyingSU(this.form).then(response => {
                            this.$modal.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        this.$api.i_liquefyingSU(this.form).then(response => {
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
                return this.$api.i_liquefyingDel({ id: userIds })
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => { });
        },
        /** 导出按钮操作 */
        handleExport() {
            this.download('mes/liquefying/export', {
                ...this.queryParams
            }, `液化产品系数表_${new Date().getTime()}.xlsx`)
        },
        /** 导入按钮操作 */
        handleImport() {
            this.upload.title = "数据导入";
            this.upload.open = true;
        },
        /** 下载模板操作 */
        importTemplate() {
            this.download('mes/unit/export', {
            }, `液化产品系数表_${new Date().getTime()}.xlsx`)
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
            this.$alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + 导入成功 + "</div>", "导入结果", { dangerouslyUseHTMLString: true });
            this.getList();
        },
        // 提交上传文件
        submitFileForm() {
            this.$refs.upload.submit();
        }
    }
};
</script>
