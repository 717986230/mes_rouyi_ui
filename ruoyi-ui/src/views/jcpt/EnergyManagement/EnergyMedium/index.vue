<template>
    <!-- 能源介质 -->
    <div class="app-container">
        <div style="margin:10px 5px;font-size: 20px;">能源介质</div>
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="100px">
            <el-form-item label="物料名称:" prop="mtrlName">
                <el-input size="mini" v-model="queryParams.mtrlName" placeholder="物料名称" clearable
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="物料类型:" prop="mtrlTypeId">
                <el-select size="mini" v-model="queryParams.mtrlTypeId" placeholder="物料类型" clearable>
                    <el-option v-for="dict in MaterialType" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="罐物料标识:" prop="tankIdt">
                <el-select size="mini" v-model="queryParams.tankIdt" placeholder="罐物料标识" clearable>
                    <el-option v-for="dict in isBackkey" :key="dict.value" :label="dict.label" :value="dict.value" />
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
            <el-table-column fixed="left" label="物料ID" align="center" width="90" sortable key="mtrlId" prop="mtrlId"
                v-if="columns[0].visible" />
            <el-table-column label="物料编码" align="center" sortable width="100" key="mtrlCode" prop="mtrlCode"
                v-if="columns[1].visible" :show-overflow-tooltip="true" />
            <el-table-column label="物料名称" align="center" sortable width="100" key="mtrlName" prop="mtrlName"
                v-if="columns[2].visible" :show-overflow-tooltip="true" />
            <el-table-column label="物料别名" align="center" sortable key="mtrlAlias" width="100" prop="mtrlAlias"
                v-if="columns[3].visible" :show-overflow-tooltip="true" />
            <el-table-column label="上级物料名称" align="center" sortable key="upperMtrlName" width="130" prop="upperMtrlName"
                v-if="columns[4].visible" :show-overflow-tooltip="true" />
            <el-table-column label="算法类型" align="center" sortable key="algorithmName" width="100" prop="algorithmName"
                v-if="columns[5].visible" :show-overflow-tooltip="true" />
            <el-table-column label="物料类型" align="center" sortable key="mtrlTypeName" prop="mtrlTypeName" width="120"
                v-if="columns[6].visible" />
            <el-table-column label="数据精度" align="center" sortable key="decStr" prop="decStr" width="130"
                v-if="columns[7].visible" />
            <el-table-column label="量纲" align="center" sortable key="dimensionName" prop="dimensionName" width="120"
                v-if="columns[8].visible" />
            <el-table-column label="罐物料标识" sortable align="center" width="120" key="tankIdt" prop="tankIdt"
                v-if="columns[9].visible">
                <template slot-scope="scope">
                    <el-checkbox disabled @change="handleChange(scope.row)" true-label="1" false-label="0"
                        v-model="scope.row.tankIdt"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="启用标识" sortable align="center" width="120" prop="useFlag" v-if="columns[10].visible">
                <template slot-scope="scope">
                    <el-checkbox disabled @change="handleChange(scope.row)" true-label="1" false-label="0"
                        v-model="scope.row.useFlag"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="备注" align="center" sortable key="des" prop="des" width="120"
                v-if="columns[11].visible" />
            <el-table-column label="排序" align="center" sortable prop="displayOrder" width="160" v-if="columns[12].visible">
            </el-table-column>
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
                        <el-form-item label="物料编号:" prop="mtrlCode">
                            <el-input v-model="form.mtrlCode" placeholder="物料编号" maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="物料编码:" prop="mtrlNum">
                            <el-input v-model="form.mtrlNum" placeholder="物料编码" maxlength="30" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="物料名称:" prop="mtrlName">
                            <el-input v-model="form.mtrlName" placeholder="物料名称" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="物料别名:" prop="mtrlAlias">
                            <el-input v-model="form.mtrlAlias" placeholder="物料别名" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="上级物料名称:" prop="upperMtrlId">
                            <el-select v-model="form.upperMtrlId" placeholder="上级物料名称">
                                <el-option v-for="(item, index) in SuperiorMaterial" :key="index" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="算法类型:" prop="vcfTypeId">
                            <el-select v-model="form.vcfTypeId" placeholder="算法类型">
                                <el-option v-for="dict in Algorithmclass" :key="dict.value" :label="dict.label"
                                    :value="dict.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="物料类型:" prop="mtrlTypeId">
                            <el-select v-model="form.mtrlTypeId" placeholder="物料类型">
                                <el-option v-for="dict in MaterialType" :key="dict.value" :label="dict.label"
                                    :value="dict.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="数据精度:" prop="decStr">
                            <el-input v-model="form.decStr" placeholder="数据精度" type="number"> </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="量纲:" prop="dimensionId">
                            <el-select v-model="form.dimensionId" placeholder="物料类型">
                                <el-option v-for="dict in Dimension" :key="dict.value" :label="dict.label"
                                    :value="dict.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="罐物料标识:" prop="tankIdt">
                            <el-checkbox true-label="1" false-label="0" v-model="form.tankIdt"></el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="是否启用:">
                            <el-checkbox true-label="1" false-label="0" v-model="form.useFlag"></el-checkbox>
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
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="排序:" prop="displayOrder">
                            <el-input v-model="form.displayOrder" placeholder="排序"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
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
    name: "EnergyMedium",
    components: {},
    data() {
        return {
            isBackkey: [
                {
                    label: "全部",
                    value: " "
                },
                {
                    label: "启用",
                    value: "1"
                },
                {
                    label: "未启用",
                    value: "0"
                }
            ],
            isStart: [
                {
                    label: "全部",
                    value: " "
                },
                {
                    label: "启用",
                    value: "1"
                },
                {
                    label: "未启用",
                    value: "0"
                }
            ],
            MaterialType: [],//物料类型
            zzType: [],
            // 列信息
            columns: [
                { key: 0, label: `物料ID`, visible: true },
                { key: 1, label: `物料编码`, visible: true },
                { key: 2, label: `物料名称`, visible: true },
                { key: 3, label: `物料别名`, visible: true },
                { key: 4, label: `上级物料名称`, visible: true },
                { key: 5, label: `算法类型`, visible: true },
                { key: 6, label: `物料类型`, visible: true },
                { key: 7, label: `数据精度`, visible: true },
                { key: 8, label: `量纲`, visible: true },
                { key: 9, label: `罐物料标识`, visible: true },
                { key: 10, label: `是否启用`, visible: true },
                { key: 11, label: `备注`, visible: true },
                { key: 12, label: `排序`, visible: true },
            ],
            Algorithmclass: [],//算法类别
            SuperiorMaterial: [],//上级物料类型
            Dimension: [],//量纲
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
                url: process.env.VUE_APP_BASE_API + "/energy/enMedium/import"
            },
            // 查询参数
            queryParams: {
                "isAsc": "",
                "mtrlId": undefined,
                "mtrlName": "",
                "mtrlTypeId": undefined,
                "orderByColumn": "",
                "pageNum": 1,
                "pageSize": 10,
                "reasonable": true,
                "tankIdt": " ",
                "useFlag": " ",
                "vcfTypeId": undefined
            },
            // 表单校验
            rules: {
                mtrlNum: [
                    { required: true, message: "物料编码", trigger: "blur" },
                ],
                mtrlName: [
                    { required: true, message: "物料名称", trigger: "blur" }
                ],
                mtrlAlias: [
                    { required: true, message: "物料别名", trigger: "blur" }
                ],
                vcfTypeId: [
                    { required: true, message: "算法类型", trigger: "blur" }
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
        close() {
            this.$emit('update:visible', false)
        },
        /** 查询用户列表 */
        getList() {
            this.loading = true;
            this.$api.i_enMediumList(this.queryParams).then(response => {
                this.userList = response.rows;
                this.total = response.total;
                this.loading = false;
            }
            );
        },
        getOther() {

            //量纲
            this.$api.i_dimension().then(res => {
                this.Dimension = res.data.map(r => {
                    return {
                        label: r.name,
                        value: r.id,
                    }
                })
            })
            //算法类别
            this.$api.i_algorithmTypeList().then(res => {
                this.Algorithmclass = res.data.map(r => {
                    return {
                        label: r.algorithmName,
                        value: r.id,
                    }
                })
            })
            //物料类型
            this.$api.i_mtrlType().then(res => {
                this.MaterialType = res.data.map(r => {
                    return {
                        label: r.mtrlTypeName,
                        value: r.id,
                    }
                })
            })
            //上级物料类型
            this.$api.i_enMediumallList().then(res => {
                this.SuperiorMaterial = res.data.map(r => {
                    return {
                        label: r.mtrlName,
                        value: r.mtrlId,
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
                "decStr": 0,
                "des": "",
                "dimensionId": undefined,
                "displayOrder": 0,
                "mtrlAlias": "",
                "mtrlCode": "",
                "mtrlId": undefined,
                "mtrlName": "",
                "mtrlNum": "",
                "mtrlTypeId": undefined,
                "tankIdt": 0,
                "upperMtrlId": "",
                "useFlag": "1",
                "vcfTypeId": undefined
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
            this.ids = selection.map(item => item.mtrlId);
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
            const userId = row.mtrlId || this.ids[0];
            this.$api.i_enMediumById({ mtrlId: userId }).then(res => {
                console.log(res.data, "数据少时诵诗书");
                this.form = res.data;
                this.form.useFlag = String(res.data.useFlag)
            });
            this.open = true;
            this.title = "修改信息";
        },
        /** 提交按钮 */
        submitForm: function () {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.form.mtrlId != undefined) {
                        console.log(this.form, "修改数据");
                        this.$api.i_enMediumSU({
                            "decStr": this.form.decStr,
                            "des": this.form.des,
                            "dimensionId": this.form.dimensionId,
                            "displayOrder": this.form.displayOrder,
                            "mtrlAlias": this.form.mtrlAlias,
                            "mtrlCode": this.form.mtrlCode,
                            "mtrlId": this.form.mtrlId,
                            "mtrlName": this.form.mtrlName,
                            "mtrlNum": this.form.mtrlNum,
                            "mtrlTypeId": this.form.mtrlTypeId,
                            "tankIdt": this.form.tankIdt,
                            "upperMtrlId": this.form.upperMtrlId,
                            "useFlag": this.form.useFlag,
                            "vcfTypeId": this.form.vcfTypeId,
                        }).then(response => {
                            this.$modal.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        this.$api.i_enMediumSU(this.form).then(response => {
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
            const userIds = row.mtrlId || this.ids[0];
            this.$modal.confirm('是否确认删除"' + userIds + '"的数据项？').then(() => {
                return this.$api.i_enMediumDel({ mtrlId: userIds })
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => { });
        },
        /** 导出按钮操作 */
        handleExport() {
            this.download('energy/enMedium/export', {
                ...this.queryParams
            }, `能源介质_${new Date().getTime()}.xlsx`)
        },
        /** 导入按钮操作 */
        handleImport() {
            this.upload.title = "数据导入";
            this.upload.open = true;
        },
        /** 下载模板操作 */
        importTemplate() {
            this.download('energy/enMedium/export', {
            }, `能源介质_${new Date().getTime()}.xlsx`)
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
