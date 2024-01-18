<template>
    <!-- 设备类型 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch">
            <el-form-item label="类型名称:" prop="name">
                <el-input v-model="queryParams.name" placeholder="类型名称" clearable size="small"
                    @keyup.enter.native="handleQuery" />
            </el-form-item>

            <el-form-item label="是否启用:" prop="useFlag">
                <el-select v-model="queryParams.useFlag" placeholder="是否启用" clearable size="small">
                    <el-option v-for="dict in isUglp" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
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
        <el-table v-loading="loading" :data="deptList" @selection-change="handleSelectionChange">
            <el-table-column fixed="left" type="selection" width="50" align="center" />
            <el-table-column prop="num" key="num" label="类型编号" width="100" fixed sortable align="left"
                v-if="columns[0].visible"></el-table-column>
            <el-table-column prop="code" key="code" label="类型编码" width="100" sortable align="center"
                v-if="columns[1].visible"></el-table-column>
            <el-table-column prop="name" key="name" label="类型名称" width="100" sortable align="center"
                v-if="columns[2].visible"></el-table-column>
            <el-table-column prop="ailas" key="ailas" label="类型别名" width="100" sortable align="center"
                v-if="columns[3].visible"></el-table-column>
            <el-table-column prop="upperName" key="upperName" label="上级类型" width="100" sortable align="center"
                v-if="columns[4].visible"></el-table-column>
            <el-table-column prop="useFlag" label="是否启用" key="useFlag" width="100" sortable align="center"
                v-if="columns[5].visible">
                <template slot-scope="scope">
                    <el-checkbox disabled true-label="1" false-label="0" v-model="scope.row.useFlag"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column prop="des" label="备注" sortable align="center" v-if="columns[6].visible"></el-table-column>
            <el-table-column label="排序" sortable align="center" prop="displayOrder" width="100" v-if="columns[7].visible">
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="130" sortable align="center"
                class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
                    <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="120px">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="类型编号:" prop="num">
                            <el-input type="number" v-model="form.num" placeholder="类型编号" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;"></el-col>
                    <el-col :span="10">
                        <el-form-item label="类型编码:" prop="code">
                            <el-input v-model="form.code" placeholder="类型编码" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="类型名称:" prop="name">
                            <el-input v-model="form.name" placeholder="类型名称" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;"></el-col>
                    <el-col :span="10">
                        <el-form-item label="类型别名:" prop="ailas">
                            <el-input v-model="form.ailas" placeholder="类型别名" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="上级类型:" prop="upperId">
                            <el-select v-model="form.upperId" placeholder="上级类型" clearable size="small">
                                <el-option v-for="dict in ParentDeviceType" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;"></el-col>
                    <el-col :span="10">
                        <el-form-item label="是否启用:" prop="useFlag">
                            <el-checkbox true-label="1" false-label="0" v-model="form.useFlag"></el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="备注:" prop="des">
                            <el-input v-model="form.des" placeholder="备注" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;"></el-col>
                    <el-col :span="10">
                        <el-form-item label="排序:" prop="displayOrder">
                            <el-input v-model="form.displayOrder" placeholder="排序" type="number" />
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
    name: "EquipmentType",
    components: {},
    data() {
        return {
            ParentDeviceType: [],//上级设备类型
            isUglp: [
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
            columns: [
                { key: 0, label: `类型ID`, visible: true },
                { key: 1, label: `类型编码`, visible: true },
                { key: 2, label: `类型名称`, visible: true },
                { key: 3, label: `类型别名`, visible: true },
                { key: 4, label: `上级类型`, visible: true },
                { key: 5, label: `是否启用`, visible: true },
                { key: 6, label: `备注`, visible: true },
                { key: 7, label: `排序`, visible: true },
            ],
            single: true,
            multiple: true,
            mtrlOption: [],
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
                url: process.env.VUE_APP_BASE_API + "device/deviceType/import"
            },
            // 遮罩层
            loading: false,
            // 显示搜索条件
            showSearch: true,
            deptList: [],
            // 弹出层标题
            title: "",
            // 是否显示弹出层
            open: false,
            // 查询参数
            queryParams: {
                "id": undefined,
                "isAsc": "",
                "name": "",
                "orderByColumn": "",
                "pageNum": 1,
                "pageSize": 10,
                "reasonable": true,
                "useFlag": " "
            },
            // 表单参数
            form: {},
            // 表单校验
            rules: {
                name: [
                    { required: true, message: "设备名称", trigger: "blur" }
                ],
                code: [
                    { required: true, message: "请输入编码", trigger: "blur" }
                ],
                num: [
                    { required: true, message: "设备编号", trigger: "blur" }
                ],
                ailas: [
                    { required: true, message: "请输入别名", trigger: "blur" }
                ],
            }
        };
    },
    created() {
        this.getList();
        this.getOther();
    },
    methods: {
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.id);
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        },
        getOther() {
            //上级设备类型
            this.$api.e_deviceTypeUpperList().then(res => {
                this.ParentDeviceType = res.data.map(e => {
                    return {
                        value: e.id,
                        label: e.name
                    }
                })
            })
            //物料类型
            this.$api.i_mtrlType().then(res => {
                this.mtrlOption = res.data.map(e => {
                    return {
                        value: e.id,
                        label: e.mtrlTypeName
                    }
                })
            })
        },

        getList() {
            this.loading = true;
            this.$api.e_deviceTypeList(this.queryParams).then(response => {
                this.deptList = response.rows.map(r => {
                    return {
                        ...r,
                        useFlag: String(r.useFlag)
                    }
                })
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
                "ailas": "",
                "code": "",
                "des": "",
                "displayOrder": "1",
                "id": undefined,
                "name": "",
                "num": "",
                "upperId": undefined,
                "useFlag": "1"
            };
            this.resetForm("form");
        },
        //列表修改启用标识
        handleChange(row) {
            this.$api.i_MESFactorysaveOrUpdata(row).then((res) => {
                if (res.code == 200) {
                    console.log('接口成功', res)
                    this.$message({
                        showClose: true,
                        type: "success",
                        message: "修改数据成功"
                    });
                    this.getList()
                    this.cancel()
                } else {
                    console.log(`接口成功,但接口状态=${res.code}`, res)
                }
            })
                .catch((err) => {
                    console.log('接口失败', err)
                })
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
        /** 新增按钮操作 */
        handleAdd() {
            this.reset();
            this.open = true;
            this.title = "增加信息";
        },
        //列表修改启用标识
        handleUpdate(row) {
            this.reset();
            const userId = row.id || this.ids[0];
            this.$api.e_deviceTypeByid({ id: userId }).then(response => {
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
                        this.$api.e_deviceTypeSaveOrUpdate({
                            "ailas": this.form.ailas,
                            "code": this.form.code,
                            "des": this.form.des,
                            "displayOrder": this.form.displayOrder,
                            "id": this.form.id,
                            "name": this.form.name,
                            "num": this.form.num,
                            "upperId": this.form.upperId,
                            "useFlag": this.form.useFlag,
                        }).then(response => {
                            this.$modal.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        this.$api.e_deviceTypeSaveOrUpdate(this.form).then(response => {
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
            const userId = row.id || this.ids[0];
            this.$modal.confirm('是否确认删除"' + userId + '"的数据项？').then(() => {
                return this.$api.e_deviceTypeDel({ id: userId })
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => { });
        },
        /** 导出按钮操作 */
        handleExport() {
            this.download('device/deviceType/export', {
                ...this.queryParams
            }, `设备类型_${new Date().getTime()}.xlsx`)
        },
        /** 导入按钮操作 */
        handleImport() {
            this.upload.title = "数据导入";
            this.upload.open = true;
        },
        /** 下载模板操作 */
        importTemplate() {
            this.download('device/deviceType/export', {
            }, `设备类型_${new Date().getTime()}.xlsx`)
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
