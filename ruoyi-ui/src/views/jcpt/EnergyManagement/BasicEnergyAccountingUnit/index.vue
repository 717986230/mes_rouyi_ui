<template>
    <!-- 基本能源核算单元 -->
    <div class="app-container">
        <div style="margin:10px 5px;font-size: 20px;">基本能源核算单元</div>
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="120px">
            <el-form-item label="核算单元名称:" prop="name">
                <el-input size="mini" v-model="queryParams.name" placeholder="核算单元名称" maxlength="30" />
            </el-form-item>
            <el-form-item label="核算单元类型:" prop="unitType">
                <el-select size="mini" v-model="queryParams.unitType" placeholder="核算单元类型" clearable>
                    <el-option v-for="dict in OwningRegion" :key="dict.value" :label="dict.label" :value="dict.value" />
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
            <el-table-column label="核算单元编号" align="center" sortable key="num" prop="num" v-if="columns[1].visible"
                :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column label="核算单元名称" align="center" sortable key="name" prop="name" v-if="columns[2].visible"
                :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column label="核算单元别名" align="center" sortable key="alias" prop="alias" v-if="columns[3].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="所属区域" align="center" sortable key="areaTypeName" prop="areaTypeName"
                v-if="columns[4].visible" :show-overflow-tooltip="true" />
            <el-table-column label="核算单元类型" align="center" sortable key="unitTypeName" prop="unitTypeName"
                v-if="columns[5].visible" :show-overflow-tooltip="true" />
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
            <el-table-column fixed="right" label="操作" align="center" width="150" class-name="small-padding fixed-width">
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
                        <el-form-item label="核算单元编号:" prop="num">
                            <el-input v-model="form.num" placeholder="核算单元编号" type="number" maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="核算单元名称:" prop="name">
                            <el-input v-model="form.name" placeholder="核算单元名称" maxlength="30" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="核算单元别名:" prop="alias">
                            <el-input v-model="form.alias" placeholder="核算单元别名" maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="关联区域类型:" prop="areaType">
                            <el-select v-model="form.areaType" placeholder="关联区域类型" clearable @change="handleArea">
                                <el-option v-for="dict in OwningRegion" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="核算单元类型:" prop="unitType">
                            <el-select v-model="form.unitType" placeholder="核算单元类型" clearable>
                                <el-option v-for="dict in  OwningRegion" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="所属区域:" prop="areaId">
                            <el-select v-model="form.areaId" placeholder="所属区域" clearable>
                                <el-option v-for="dict in FormJQtype" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="是否启用:" prop="useFlag">
                            <el-checkbox true-label="1" false-label="0" v-model="form.useFlag"></el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="描述:" prop="des">
                            <el-input v-model="form.des" placeholder="描述" maxlength="30"> </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="排序:" prop="displayOrder">
                            <el-input type="number" v-model="form.displayOrder" placeholder="排序"></el-input>
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
            OwningRegion: [],//所属区域
            FormJQtype: [],//核算单元类型
            JQtype: [],
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
                { key: 4, label: `关联区域类型`, visible: true },
                { key: 5, label: `所属区域`, visible: true },
                { key: 6, label: `核算单元类型`, visible: true },
                { key: 7, label: `启用标识`, visible: true },
                { key: 8, label: `描述`, visible: true },
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
            userList: [],
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
                url: process.env.VUE_APP_BASE_API + "energy/basicCalculateUnit/import"
            },
            // 查询参数
            queryParams: {
                "id": undefined,
                "isAsc": "",
                "name": "",
                "orderByColumn": "",
                "pageNum": 1,
                "pageSize": 10,
                "reasonable": true,
                "unitType": "",
                "useFlag": " "
            },
            // 表单校验
            rules: {
                num: [
                    { required: true, message: "请输入编码", trigger: "blur" }
                ],
                name: [
                    { required: true, message: "请输入名称", trigger: "blur" }
                ],
                alias: [
                    { required: true, message: "请选择别名", trigger: "blur" }
                ],
            }
        };
    },
    watch: {

    },
    created() {
        this.getList();
        this.getOther();
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        //关联区域改变，核算单元下拉数据变化
        handleArea() {
            //根据条件查询界区类型
            this.$api.i_nodeAreaList({
                "mesFctrId": "",
                "nodeAreaType": this.form.areaType
            }).then(res => {
                this.FormJQtype = res.data.map(r => {
                    return {
                        label: r.name,
                        value: r.id,
                    }
                })
            })
            this.form.areaId = this.FormJQtype[0].value
        },
        close() {
            this.$emit('update:visible', false)
        },
        /** 查询用户列表 */
        getList() {
            this.loading = true;
            this.$api.e_basicCalculateUnitList(this.queryParams).then(response => {
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
            //所属区域
            this.$api.i_nodeAreaType().then(res => {
                this.OwningRegion = res.data.map(r => {
                    return {
                        label: r.nodeAreaTypeName,
                        value: r.id,
                    }
                })
            })
            //根据条件查询界区类型
            this.$api.i_nodeAreaList({
                "mesFctrId": "",
                "nodeAreaType": this.form.areaType
            }).then(res => {
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
                "alias": "",
                "areaId": undefined,
                "areaType": "",
                "des": "",
                "displayOrder": "1",
                "id": undefined,
                "name": "",
                "num": "",
                "unitType": "",
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
            this.$api.e_basicCalculateUnitByid({ id: userId }).then(response => {
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
                        this.$api.e_basicCalculateUnitSU({
                            "alias": this.form.alias,
                            "areaId": this.form.areaId,
                            "areaType": this.form.areaType,
                            "des": this.form.des,
                            "displayOrder": this.form.displayOrder,
                            "id": this.form.id,
                            "name": this.form.name,
                            "num": this.form.num,
                            "unitType": this.form.unitType,
                            "useFlag": this.form.useFlag,
                        }).then(response => {
                            this.$modal.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        this.$api.e_basicCalculateUnitSU(this.form).then(response => {
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
                return this.$api.e_basicCalculateUnitDel({ id: userIds })
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => { });
        },
        /** 导出按钮操作 */
        handleExport() {
            this.download('energy/basicCalculateUnit/export', {
                ...this.queryParams
            }, `基础能源核算单元_${new Date().getTime()}.xlsx`)
        },
        /** 导入按钮操作 */
        handleImport() {
            this.upload.title = "数据导入";
            this.upload.open = true;
        },
        /** 下载模板操作 */
        importTemplate() {
            this.download('energy/basicCalculateUnit/export', {
            }, `基础能源核算单元_${new Date().getTime()}.xlsx`)
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
