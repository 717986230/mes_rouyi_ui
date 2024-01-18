<template>
    <!-- 物料温度VCF维护 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="80px">
            <el-form-item label="物料:" prop="mtrlId">
                <el-select v-model="queryParams.mtrlId" placeholder="请选择物料" clearable>
                    <el-option v-for="dict in mtrlIdList" :key="dict.value" :label="dict.label" :value="dict.value" />
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
            <el-col :span="3">
                <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleSave">保存</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList" :columns="columns"></right-toolbar>
        </el-row>
        <el-table v-loading="loading" :data="dataList" @selection-change="handleSelectionChange">
            <el-table-column fixed="left" type="selection" width="50" align="center" />
            <el-table-column label="物料编码" sortable align="center" key="mtrlId" prop="mtrlId" v-if="columns[0].visible"
                             :show-overflow-tooltip="true" />
            <el-table-column label="物料" sortable align="center" key="mtrlName" prop="mtrlName" v-if="columns[1].visible"
                             :show-overflow-tooltip="true" />
            <el-table-column label="温度" sortable align="center" key="temperature" prop="temperature" v-if="columns[2].visible"
                             :show-overflow-tooltip="true" >
                <template slot-scope="scope">
                    <span v-if="!scope.row.isEditingTemp" @click="startEditing_T(scope.row)">{{ scope.row.temperature }}</span>
                    <el-input v-else v-model="scope.row.temperature" type="number" @blur="finishEditing_T(scope.row)" size="small" style="width: 200px"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="VCF值" sortable align="center" key="vcfVal" prop="vcfVal" v-if="columns[3].visible"
                             :show-overflow-tooltip="true" >
                <template slot-scope="scope">
                    <span v-if="!scope.row.isEditingVcf" @click="startEditing_V(scope.row)">{{ scope.row.vcfVal }}</span>
                    <el-input v-else v-model="scope.row.vcfVal" type="number" @blur="finishEditing_V(scope.row)" size="small" style="width: 200px"></el-input>
                </template>
            </el-table-column>
        </el-table>
        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
                    @pagination="getList" />
        <!-- 添加或修改用户配置对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-row type="flex" justify="center">
                    <el-col :span="20">
                        <el-form-item label="物料:" prop="mtrlId">
                            <el-select v-model="form.mtrlId" filterable placeholder="请选择物料" style="width: 100%">
                                <el-option v-for="dict in mtrlIdList" :key="dict.value" :label="dict.label" :value="dict.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="center">
                    <el-col :span="20">
                        <el-form-item label="温度:" prop="temperature">
                            <el-input v-model="form.temperature" type="number" placeholder="请输入温度值" clearable />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="center">
                    <el-col :span="20">
                        <el-form-item label="VCF值:" prop="vcfVal">
                            <el-input v-model="form.vcfVal" type="number" placeholder="请输入VCF值" clearable />
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
    </div>
</template>

<script>
import { listUser, getUser, delUser, addUser, updateUser } from "@/api/system/user";
import { getToken } from "@/utils/auth";
export default {
    name: "cTankVo_vcfwh",
    dicts: ['work_c', 'math_type'],
    data() {
        return {
            //物料options
            mtrlIdList:[],
            // 列信息
            columns: [
                { key: 0, label: `物料编码`, visible: true },
                { key: 1, label: `物料`, visible: true },
                { key: 2, label: `温度`, visible: true },
                { key: 3, label: `VCF值`, visible: true },
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

            // 用户表格数据
            dataList: null,
            // 弹出层标题
            title: "",
            // 是否显示弹出层
            open: false,
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
                url: process.env.VUE_APP_BASE_API + "/mes/mtrlTemVcf/import"
            },
            // 查询参数
            queryParams: {
                mtrlId:'',
                pageNum: 1,
                pageSize: 10,
            },
            //新增 from
            form: {
                mtrlId:'', //物料id
                temperature:'', //温度
                vcfVal:'', //vcf值
            },
            //表单验证
            rules:{
                mtrlId: [
                    { required: true, message: "请选择物料", trigger: "change" },
                ],
                vcfVal: [
                    { required: true, message: "请输入VCF值", trigger: "blur" },
                ],
                temperature: [
                    { required: true, message: "请输入温度", trigger: "blur" },
                ],
            }
        };
    },
    watch: {},
    created() {
        this.getList();
        this.getOtherData();
    },
    methods: {
        /** 查询用户列表 */
        getList() {
            this.loading = true;

            this.$api.i_mtrlTemVcfList(this.queryParams).then(res => {
                this.dataList = res.rows.map((e)=>{
                    return {
                        ...e,
                        ...{
                            isEditingTemp:false,
                            isEditingVcf:false,
                        }
                    }
                });
                this.total = res.total;
                this.loading = false;
                }
            )
                .catch(err=>{
                    this.loading = false;
                })


        },

        getOtherData(){
            this.$api.i_mtrAllList().then(res => {
                this.mtrlIdList = res.data.map(e => {
                    return {
                        label: e.name,
                        value: e.id
                    }
                })
            })
        },

        /** 搜索按钮操作 */
        handleQuery() {
            this.queryParams.pageNum = 1;
            this.getList();
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.resetForm("queryForm");
            this.queryParams.id = undefined;
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
                    console.log(this.form)
                    this.$api.i_mtrlTemVcfSU(this.form).then((res) => {
                        if (res.code == 200) {
                            this.msgSuccess(this.form.vcfId?"修改成功":"新增成功");
                            this.open = false;
                            this.getList()
                        } else {
                            console.log(`接口成功,但接口状态=${res.code}`, res)
                        }
                    })
                        .catch((err) => {
                            console.log('接口失败', err)
                        })
                }
            });
        },
        // 表单重置
        reset() {
            this.form = {
                vcfId:'', //id
                mtrlId:'', //物料id
                mtrlCode:'', //物料编码
                mtrlName:'', //物料名称
                mtrlAlias:'', //物料别名
                temp:'', //温度
                vcfVal:'', //vcf值
            };
            this.resetForm("form");
        },
        /** 新增按钮操作 */
        handleAdd() {
            this.reset()
            this.open = true;
            this.title = "新增信息";
        },
        /** 修改按钮操作 */
        handleUpdate() {
            this.reset();
            let nowData = this.dataList.filter(e=>e.id == this.ids[0])[0]
            this.form = nowData
            this.open = true;
            this.title = "修改信息";
        },

        /** 删除按钮操作 */
        handleDelete(row) {
            const ids = row.id || this.ids[0];
            this.$modal.confirm('是否确认删除用户编号为"' + ids + '"的数据项？').then( ()=> {
                this.$api.i_mtrlTemVcfDel({id:ids})
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => { });
        },
        /** 导出按钮操作 */
        handleExport() {
            this.download('mes/mtrlTemVcf/export', {
                ...this.queryParams
            }, `物料温度VCF维护_${new Date().getTime()}.xlsx`)
        },
        /** 导入按钮操作 */
        handleImport() {
            this.upload.title = "用户导入";
            this.upload.open = true;
        },
        /** 下载模板操作 */
        importTemplate() {
            this.download('system/user/importTemplate', {
            }, `user_template_${new Date().getTime()}.xlsx`)
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
        // 取消按钮
        cancel() {
            this.open = false;
            this.reset();
        },
        //温度输入框 点击
        startEditing_T(row) {
            row.isEditingTemp = true;
        },
        //温度输出框 输入完成
        finishEditing_T(row) {
            row.isEditingTemp = false;
        },
        //vcf值输入框 点击
        startEditing_V(row) {
            row.isEditingVcf = true;
        },
        //vcf值输出框 输入完成
        finishEditing_V(row) {
            row.isEditingVcf = false;
        },
        //保存列表中的修改
        handleSave(){
            this.msgSuccess("修改成功");
        }
    }
};
</script>
