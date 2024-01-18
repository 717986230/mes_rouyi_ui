<template>
    <!-- 测量点-->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch">
            <el-form-item label="名称:" prop="instrName">
                <el-input size="mini" v-model="queryParams.instrName" placeholder="名称" clearable
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="界区:" prop="nodeAreaName">
                <el-input size="mini" v-model="queryParams.nodeAreaName" placeholder="界区" clearable
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="位号:" prop="tag">
                <el-input size="mini" v-model="queryParams.tag" placeholder="位号" clearable
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="工厂:" prop="mesFctrId">
                <el-select size="mini" v-model="form.mesFctrId" placeholder="工厂" clearable>
                    <el-option v-for="dict in xlMes" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="类型:" prop="typeId">
                <el-select v-model="form.typeId" placeholder="类型" clearable size="mini">
                    <el-option v-for="dict in CLtype" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd11">新增</el-button>
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
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
        <el-table v-loading="loading" :data="deptList" @selection-change="handleSelectionChange" :columns="columns">
            <el-table-column fixed="left" type="selection" width="50" align="center" />
            <el-table-column label="编号" fixed="left" sortable align="center" key="instrNum" prop="instrNum"
                v-if="columns[0].visible" />
            <el-table-column label="名称" sortable align="center" key="instrName" prop="instrName"
                :show-overflow-tooltip="true" v-if="columns[1].visible" />
            <el-table-column label="别名" sortable align="center" key="instrAlias" prop="instrAlias"
                :show-overflow-tooltip="true" v-if="columns[2].visible" />
            <el-table-column label="界区" sortable align="center" key="nodeAreaName" prop="nodeAreaName"
                :show-overflow-tooltip="true" v-if="columns[3].visible" />
            <el-table-column label="工位号" sortable align="center" width="100" key="tag" prop="tag"
                :show-overflow-tooltip="true" v-if="columns[4].visible" />
            <el-table-column label="系数" sortable align="center" key="coefficient" prop="coefficient"
                :show-overflow-tooltip="true" v-if="columns[5].visible" />
            <el-table-column label="量纲" sortable align="center" key="dimensionName" prop="dimensionName"
                :show-overflow-tooltip="true" v-if="columns[6].visible" />
            <el-table-column label="虚实表标识" sortable align="center" width="120" key="realFlag" prop="realFlag"
                :show-overflow-tooltip="true" v-if="columns[7].visible">
                <template slot-scope="scope">
                    <el-checkbox true-label="1" disabled false-label="0" v-model="scope.row.realFlag"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="累计表标识" sortable align="center" width="120" key="accuInstrFlag" prop="accuInstrFlag"
                :show-overflow-tooltip="true" v-if="columns[8].visible">
                <template slot-scope="scope">
                    <el-checkbox true-label="1" false-label="0" disabled v-model="scope.row.accuInstrFlag"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="计量上限" sortable align="center" width="100" key="upSpan" prop="upSpan"
                :show-overflow-tooltip="true" v-if="columns[9].visible" />
            <el-table-column label="计量下限" sortable align="center" width="100" key="dowmSpan" prop="dowmSpan"
                :show-overflow-tooltip="true" v-if="columns[10].visible" />
            <el-table-column label="启用标识" disabled sortable align="center" key="useFlag" prop="useFlag" width="120"
                :show-overflow-tooltip="true" v-if="columns[11].visible">
                <template slot-scope="scope">
                    <el-checkbox true-label="1" false-label="0" disabled v-model="scope.row.useFlag"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="显示顺序" sortable align="center" width="100" key="displayOrder" prop="displayOrder"
                :show-overflow-tooltip="true" v-if="columns[12].visible" />
            <el-table-column label="备注" sortable align="center" width="100" key="des" prop="des"
                :show-overflow-tooltip="true" v-if="columns[13].visible" />
            <el-table-column label="操作" fixed="right" align="center" width="160" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
                    <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
            @pagination="getList" />
        <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="90px">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="编号:" prop="instrNum">
                            <el-input type="number" v-model="form.instrNum" placeholder="请输入编号" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;"></el-col>
                    <el-col :span="10">
                        <el-form-item label="名称:" prop="instrName">
                            <el-input v-model="form.instrName" placeholder="名称" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="别名:" prop="instrAlias">
                            <el-input v-model="form.instrAlias" placeholder="别名" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;"></el-col>
                    <el-col :span="10">
                        <el-form-item label="系数:" prop="coefficient">
                            <el-input v-model="form.coefficient" placeholder="系数" type="number" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="工位号:" prop="tag">
                            <el-input v-model="form.tag" placeholder="工位号" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;"></el-col>
                    <el-col :span="10">
                        <el-form-item label="虚实表标识:" prop="realFlag">
                            <el-checkbox true-label="1" false-label="0" v-model="form.realFlag"></el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="启用标识:" prop="useFlag">
                            <el-checkbox true-label="1" false-label="0" v-model="form.useFlag"></el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;"></el-col>
                    <el-col :span="10">
                        <el-form-item label="累计表标识:" prop="accuInstrFlag">
                            <el-checkbox true-label="1" false-label="0" v-model="form.accuInstrFlag"></el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="量纲:" prop="dimensionId">
                            <el-select v-model="form.dimensionId" placeholder="量纲" clearable size="small">
                                <el-option v-for="dict in LGtype" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;"></el-col>
                    <el-col :span="10">
                        <el-form-item label="工厂:" prop="mesFctrId">
                            <el-select v-model="form.mesFctrId" placeholder="工厂" clearable size="small">
                                <el-option v-for="dict in  xlMes" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="类型:" prop="typeId">
                            <el-select v-model="form.typeId" placeholder="类型" clearable size="small">
                                <el-option v-for="dict in CLtype" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;"></el-col>
                    <el-col :span="10">
                        <el-form-item label="界区:" prop="nodeAreaId">
                            <el-select v-model="form.nodeAreaId" placeholder="界区" clearable size="small">
                                <el-option v-for="dict in JQtype" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="量程上限:" prop="upSpan">
                            <el-input type="number" v-model="form.upSpan" placeholder="量程上限" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;"></el-col>
                    <el-col :span="10">
                        <el-form-item label="量程下限:" prop="dowmSpan">
                            <el-input type="number" v-model="form.dowmSpan" placeholder="量程下限" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="显示顺序:" prop="displayOrder">
                            <el-input v-model="form.displayOrder" placeholder="备注" maxlength="30" type="number" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;"></el-col>
                    <el-col :span="10">
                        <el-form-item label="备注:" prop="des">
                            <el-input v-model="form.des" placeholder="备注" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="位号类型:" prop="tagType">
                            <el-select v-model="form.tagType" placeholder="位号类型" clearable size="small">
                                <el-option v-for="dict in BitNumber" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;"></el-col>
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
    name: "MeasuringPoint",
    components: {},
    data() {
        return {
            BitNumber: [],
            LGtype: [],//量纲-类型
            CLtype: [],//测量点-类型
            JQtype: [], // 界区-类型
            columns: [
                { key: 0, label: `编号`, visible: true },
                { key: 1, label: `名称`, visible: true },
                { key: 2, label: `别名`, visible: true },
                { key: 3, label: `界区`, visible: true },
                { key: 4, label: `工位号`, visible: true },
                { key: 5, label: `系数`, visible: true },
                { key: 6, label: `量纲`, visible: true },
                { key: 7, label: `虚实表标识`, visible: true },
                { key: 8, label: `累计表标识`, visible: true },
                { key: 9, label: `计量上限`, visible: true },
                { key: 10, label: `计量下限`, visible: true },
                { key: 11, label: `启用标识`, visible: true },
                { key: 12, label: `显示顺序`, visible: true },
                { key: 13, label: `备注`, visible: true },
            ],
            xlMes: [],
            tableData: [],//下拉车间部门
            useFlagList: [
                {
                    value: '1',
                    label: "是"
                }, {
                    value: '0',
                    label: "否"
                }
            ],
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
                url: process.env.VUE_APP_BASE_API + "/energy/instrument/import"
            },
            // 选中数组
            ids: [],
            // 非单个禁用
            single: true,
            // 非多个禁用
            multiple: true,
            // 遮罩层
            loading: false,
            // 显示搜索条件
            showSearch: true,
            // 表格树数据
            deptList: [],
            // 部门树选项
            deptOptions: [],
            // 弹出层标题
            title: "",
            // 是否显示弹出层
            open: false,
            // 状态数据字典
            statusOptions: [],
            //表单类型  新增或修改  add edit
            formType: 'add',
            // 查询参数
            queryParams: {
                "id": undefined,
                "instrName": "",
                "isAsc": "",
                "mesFctrId": undefined,
                "nodeAreaName": "",
                "orderByColumn": "",
                "pageNum": 1,
                "pageSize": 10,
                "reasonable": true,
                "tag": "",
                "typeId": undefined
            },
            total:0,
            // 表单参数
            form: {},
            // 表单校验
            rules: {
                instrNum: [
                    { required: true, message: "请输入编号", trigger: "blur" }
                ],
                instrName: [
                    { required: true, message: "请输入名称", trigger: "blur" }
                ],
                instrAlias: [
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
        //工厂下拉框列表  i_MESFactoryall
        getOther() {
            //位号类型
            this.$api.e_numberPositionTypeList().then(res => {
                this.BitNumber = res.data.map(e => {
                    return {
                        value: e.id,
                        label: e.name
                    }
                })
            })
            //测量点-类型
            this.$api.i_insertTypeList().then(res => {
                this.CLtype = res.data.map(e => {
                    return {
                        value: e.id,
                        label: e.name
                    }
                })
            })
            //界区
            this.$api.i_nodeAreaAllList().then(res => {
                this.JQtype = res.data.map(e => {
                    return {
                        value: e.id,
                        label: e.nodeAreaAame
                    }
                })
            })
            //量纲
            this.$api.i_dimension().then(res => {
                this.LGtype = res.data.map(e => {
                    return {
                        value: e.id
                        , label: e.name
                    }
                })
            })
            //工厂
            this.$api.i_MESFactoryall().then(res => {
                this.xlMes = res.data.map(e => {
                    return {
                        value: e.id, label: e.name
                    }
                })
            })
        },
        getList() {
            this.loading = true;
            this.$api.e_instrumentList(this.queryParams).then(response => {
                if (response.code) {
                    this.deptList = response.rows
                    this.total = response.total
                }
            }).catch(() => {
            });
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
                "accuInstrFlag": "1",
                "aheadFlag": "",
                "areaId": "",
                "cabTag": "",
                "coefficient": "", //系数
                "collectTypeId": null,
                "ct": "",
                "des": "",
                "dimensionId": null,
                "displayOrder": "1000",
                "dowmSpan": "",
                "id": undefined,
                "instrAlias": "",
                "instrName": "",
                "instrNum": "",
                "multRatio": "",
                "nodeAreaId": null,
                "pt": "",
                "realFlag": "1",
                "resetzeroModel": "",
                "solutionId": null,
                "sumFlag": "",
                "sureFlag": "1",
                "tag": "",
                "typeId": null,
                "upSpan": "",
                "useFlag": "1"

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
        /** 新增按钮操作 */
        handleAdd11() {
            this.reset();
            this.formType = 'add'
            this.open = true;
            this.title = "增加信息";
        },
        /** 修改按钮操作 */
        handleUpdate(row) {
            this.reset();
            const postId = row.id || this.ids[0]
            this.formType = 'edit'
            this.$api.e_instrumentById({ id: postId }).then(res => {
                let nowData = res.data
                this.form = nowData
                if (this.form.pmesFctrId == "0") {
                    this.form.pmesFctrId = ""
                }
            })
            this.title = "修改信息";
            this.open = true;
        },
        submitForm: function () {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.form.id != undefined) {
                        this.$api.e_instrumentSU({
                            "accuInstrFlag": this.form.accuInstrFlag,
                            "aheadFlag": this.form.aheadFlag,
                            "areaId": this.form.areaId,
                            "cabTag": this.form.cabTag,
                            "coefficient": this.form.coefficient,
                            "collectTypeId": this.form.collectTypeId,
                            "ct": this.form.ct,
                            "des": this.form.des,
                            "dimensionId": this.form.dimensionId,
                            "displayOrder": this.form.displayOrder,
                            "dowmSpan": this.form.dowmSpan,
                            "id": this.form.id,
                            "instrAlias": this.form.instrAlias,
                            "instrName": this.form.instrName,
                            "instrNum": this.form.instrNum,
                            "multRatio": this.form.multRatio,
                            "nodeAreaId": this.form.nodeAreaId,
                            "pt": this.form.pt,
                            "realFlag": this.form.realFlag,
                            "resetzeroModel": this.form.resetzeroModel,
                            "solutionId": this.form.solutionId,
                            "sumFlag": this.form.sumFlag,
                            "sureFlag": this.form.sureFlag,
                            "tag": this.form.tag,
                            "tagType": this.form.tagType,
                            "typeId": this.form.typeId,
                            "upSpan": this.form.upSpan,
                            "useFlag": this.form.useFlag,
                        }).then(response => {
                            this.$modal.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        this.$api.e_instrumentSU(this.form).then(response => {
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
            const postId = row.id || this.ids[0]
            this.$modal.confirm('是否确认删除"' + postId + '"的数据项？').then(() => {
                return this.$api.e_instrumentDel({ id: postId })
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => { });
        },
        /** 导出按钮操作 */
        handleExport() {
            this.download('energy/instrument/export', {
                ...this.queryParams

            }, `测量点_${new Date().getTime()}.xlsx`)
        },
        /** 导入按钮操作 */
        handleImport() {
            this.upload.title = "数据导入";
            this.upload.open = true;
        },
        /** 下载模板操作 */
        importTemplate() {
            this.download('energy/instrument/export', {
            }, `测量点_${new Date().getTime()}.xlsx`)
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
<style lang="scss" scoped></style>
