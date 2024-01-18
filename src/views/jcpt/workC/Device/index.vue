<template>
    <!-- 装置 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="50px">
            <el-form-item label="编码:" prop="unitCode">
                <el-input v-model="queryParams.unitCode" placeholder="请输入编码" clearable @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="名称:" prop="unitName">
                <el-input v-model="queryParams.unitName" placeholder="名称" clearable @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="类型:" prop="unitTypeId">
                <el-select v-model="queryParams.unitTypeId" placeholder="类型" clearable>
                    <el-option v-for="dict in zzType" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="界区:" prop="nodeAreaId">
                <el-select v-model="queryParams.nodeAreaId" placeholder="界区" clearable>
                    <el-option v-for="dict in FormJQtype" :key="dict.value" :label="dict.label" :value="dict.value" />
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
            <el-table-column fixed="left" label="编号" align="center" sortable key="unitNum" prop="unitNum"
                v-if="columns[0].visible" />
            <el-table-column label="编码" align="center" sortable key="unitCode" prop="unitCode" v-if="columns[1].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="名称" align="center" sortable key="unitName" prop="unitName" v-if="columns[2].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="别名" align="center" sortable key="unitAlias" prop="unitAlias" v-if="columns[3].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="类型" align="center" sortable key="typeName" prop="typeName" v-if="columns[4].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="界区" align="center" sortable key="nodeAreaName" prop="nodeAreaName"
                v-if="columns[5].visible" :show-overflow-tooltip="true" />
            <el-table-column label="上级装置" align="center" sortable key="upperUnitName" prop="upperUnitName" width="120"
                v-if="columns[6].visible" />
            <el-table-column label="装置加工能力" align="center" sortable key="capacity" prop="capacity" width="130"
                v-if="columns[7].visible" />
            <el-table-column label="板块" align="center" sortable key="sectorId" prop="sectorId" width="120"
                v-if="columns[8].visible" />
            <el-table-column label="启用标识" align="center" prop="useFlag" v-if="columns[9].visible">
                <template slot-scope="scope">
                    <el-checkbox disabled @change="handleChange(scope.row)" true-label="1" false-label="0"
                        v-model="scope.row.useFlag"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="显示顺序" align="center" sortable prop="displayOrder" width="160"
                v-if="columns[10].visible">
            </el-table-column>
            <el-table-column label="备注" align="center" sortable key="des" prop="des" width="120"
                v-if="columns[11].visible" />
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
                        <el-form-item label="编号:" prop="unitNum">
                            <el-input v-model="form.unitNum" placeholder="请输入编号" type="number" maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="编码:" prop="unitCode">
                            <el-input v-model="form.unitCode" placeholder="编码" maxlength="30" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="名称:" prop="unitName">
                            <el-input v-model="form.unitName" placeholder="名称" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="别名:" prop="unitAlias">
                            <el-input v-model="form.unitAlias" placeholder="别名" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="类型:" prop="unitTypeId">
                            <el-select v-model="form.unitTypeId" placeholder="类型">
                                <el-option v-for="(item, index) in zzType" :key="index" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="界区:" prop="nodeAreaId">
                            <el-select v-model="form.nodeAreaId" placeholder="界区">
                                <el-option v-for="dict in FormJQtype" :key="dict.value" :label="dict.label"
                                    :value="dict.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="上级装置:" prop="upperUnitId">
                            <el-select v-model="form.upperUnitId" placeholder="上级装置">
                                <el-option v-for="dict in SJtype" :key="dict.value" :label="dict.label"
                                    :value="dict.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="是否启用:" prop="useFlag">
                            <el-checkbox v-model="form.useFlag" false-label="0" true-label="1"></el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="加工能力:" prop="capacity">
                            <el-input type="number" v-model="form.capacity"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="显示顺序:">
                            <el-input v-model="form.displayOrder" placeholder="显示顺序" type="number"> </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="备注:">
                            <el-input v-model="form.des" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="板块:" prop="sectorId">
                            <el-select v-model="form.sectorId" placeholder="板块">
                                <el-option v-for="dict in sectorOption" :key="dict.value" :label="dict.label"
                                    :value="dict.value"></el-option>
                            </el-select>
                        </el-form-item></el-col>
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
    name: "Device",
    dicts: ['work_c', 'work_type', 'var_end'],
    components: { varPop },
    data() {
        return {
            sectorOption: [],//板块
            SJtype: [],
            zzType: [],
            JQtype: [],
            FormJQtype: [],
            // 列信息
            columns: [
                { key: 0, label: `编号`, visible: true },
                { key: 1, label: `编码`, visible: true },
                { key: 2, label: `名称`, visible: true },
                { key: 3, label: `别名`, visible: true },
                { key: 4, label: `类型`, visible: true },
                { key: 5, label: `界区`, visible: true },
                { key: 6, label: `上级装置`, visible: true },
                { key: 7, label: `装置加工能力`, visible: true },
                { key: 7, label: `板块`, visible: true },
                { key: 8, label: `启用标识`, visible: true },
                { key: 9, label: `显示顺序`, visible: true },
                { key: 10, label: `备注`, visible: true },
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
                unitNum: [
                    { required: true, message: "请输入编号", trigger: "blur" },
                ],
                unitCode: [
                    { required: true, message: "请输入编码", trigger: "blur" }
                ],
                unitName: [
                    { required: true, message: "请输入名称", trigger: "blur" }
                ],
                unitAlias: [
                    { required: true, message: "请选择装置", trigger: "blur" }
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
            this.$api.i_unitList(this.queryParams).then(response => {
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
            //获取板块数据
            this.$api.i_sectorOption().then((res) => {
                if (res.code == 200) {
                    console.log('接口成功', res)
                    this.sectorOption = res.data.map(e => {
                        return {
                            value: e.id,
                            label: e.sectorName
                        }
                    })
                } else {
                    console.log(`接口成功,但接口状态=${res.code}`, res)
                }
            })
                .catch((err) => {
                    console.log('接口失败', err)
                })
            //上级装置
            this.$api.i_unitListall({ unitName: "" }).then(res => {
                this.SJtype = res.data.map(r => {
                    return {
                        label: r.unitName,
                        value: r.id,
                    }
                })
            })
            //装置类型
            this.$api.i_unitTypeList().then(res => {
                this.zzType = res.data.map(r => {
                    return {
                        label: r.typeName,
                        value: r.id,
                    }
                })
            })
            //根据条件查询界区类型
            this.$api.i_nodeAreaList({ nodeAreaType: "2" }).then(res => {
                this.FormJQtype = res.data.map(r => {
                    return {
                        label: r.name,
                        value: r.id,
                    }
                })
            })
            this.$api.i_nodeAreaType().then(res => {
                this.JQtype = res.data.map(r => {
                    return {
                        label: r.nodeAreaTypeName,
                        value: r.id,
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
            const userId = row.id || this.ids[0];
            this.$api.i_unitById({ id: userId }).then(response => {
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
                        this.$api.i_unitSU({
                            "id": this.form.id,
                            "des": this.form.des,
                            "unitNum": this.form.unitNum,
                            "sectorId": this.form.sectorId,
                            "unitCode": this.form.unitCode,
                            "unitName": this.form.unitName,
                            "unitAlias": this.form.unitAlias,
                            "nodeAreaId": this.form.nodeAreaId,
                            "displayOrder": this.form.displayOrder,
                            "upperUnitId": this.form.upperUnitId,
                            "unitTypeId": this.form.unitTypeId,
                            "capacity": this.form.capacity,
                            "useFlag": this.form.useFlag,
                        }).then(response => {
                            this.$modal.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        this.$api.i_unitSU(this.form).then(response => {
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
                return this.$api.i_unitDel({ id: userIds })
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => { });
        },
        /** 导出按钮操作 */
        handleExport() {
            this.download('mes/unit/export', {
                ...this.queryParams
            }, `装置_${new Date().getTime()}.xlsx`)
        },
        /** 导入按钮操作 */
        handleImport() {
            this.upload.title = "数据导入";
            this.upload.open = true;
        },
        /** 下载模板操作 */
        importTemplate() {
            this.download('mes/unit/export', {
            }, `装置_${new Date().getTime()}.xlsx`)
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
