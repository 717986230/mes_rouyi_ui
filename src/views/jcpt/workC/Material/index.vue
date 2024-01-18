<template>
    <!-- 物料 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" :inline="true">
            <el-form-item label="编码:" prop="mtrlCode">
                <el-input v-model="queryParams.mtrlCode" placeholder="请输入编码" clearable size="small"
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="名称:" prop="mtrlName">
                <el-input v-model="queryParams.mtrlName" placeholder="请输入名称" clearable size="small"
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="类型:" prop="mtrlTypeId">
                <el-select v-model="queryParams.mtrlTypeId" placeholder="类型" clearable size="small">
                    <el-option v-for="dict in mtrlOption" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="VCF表类型:" prop="vcfTypeId">
                <el-select v-model="queryParams.vcfTypeId" placeholder="VCF表类型" clearable size="small">
                    <el-option v-for="dict in vcfOption" :key="dict.value" :label="dict.label" :value="dict.value" />
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

        </el-row>
        <el-table v-loading="loading" :data="deptList" @selection-change="handleSelectionChange" height="500">
            <el-table-column fixed="left" type="selection" width="50" align="center" />
            <el-table-column prop="mtrlNum" label="编号" width="100" fixed sortable align="left"
                v-if="columns[0].visible"></el-table-column>
            <el-table-column prop="mtrlCode" label="编码" width="100" sortable align="center"
                v-if="columns[1].visible"></el-table-column>
            <el-table-column prop="mtrlName" label="名称" width="100" sortable align="center"
                v-if="columns[2].visible"></el-table-column>
            <el-table-column prop="mtrlAlias" label="别名" width="100" sortable align="center"
                v-if="columns[3].visible"></el-table-column>
            <el-table-column prop="mtrlTypeName" label="类型" width="100" sortable align="center"
                v-if="columns[4].visible"></el-table-column>
            <el-table-column prop="upperMtrlName" label="上级物料" width="100" sortable align="center"
                v-if="columns[5].visible"></el-table-column>
            <el-table-column prop="vcfTypeName" label="VCF表类型" width="120" sortable align="center"
                v-if="columns[6].visible"></el-table-column>
            <el-table-column prop="dimensionName" label="量纲" width="100" sortable align="center"
                v-if="columns[7].visible"></el-table-column>
            <el-table-column prop="decStr" label="数据精度" width="100" sortable align="center"
                v-if="columns[8].visible"></el-table-column>
            <el-table-column prop="useFlag" label="启用标识" width="100" sortable align="center" v-if="columns[9].visible">
                <template slot-scope="scope">
                    <el-checkbox disabled true-label="1" false-label="0" v-model="scope.row.useFlag"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="显示顺序" sortable align="center" prop="displayOrder" width="100"
                v-if="columns[10].visible">
            </el-table-column>
            <el-table-column prop="des" label="备注" sortable align="center" v-if="columns[11].visible"></el-table-column>
            <el-table-column label="操作" fixed="right" width="130" sortable align="center"
                class-name="small-padding fixed-width" v-if="columns[12].visible">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
                    <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
            @pagination="getList" /> -->
        <el-pagination style="float: right;" background :page-size="queryParams.pageSize" :page-sizes="[5, 10, 20, 50]"
            layout="->,total,sizes, prev, pager, next, jumper" :total="total" :current-page.sync="queryParams.pageNum"
            @size-change="sizeChangeHandle" @current-change="currentChangeHandle">
        </el-pagination>
        <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="120px">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="编号:" prop="mtrlNum">
                            <el-input type="number" :disabled="formType == 'edit'" v-model="form.mtrlNum"
                                placeholder="编号" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;"></el-col>
                    <el-col :span="10">
                        <el-form-item label="编码:" prop="mtrlCode">
                            <el-input v-model="form.mtrlCode" placeholder="编码" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="名称:" prop="mtrlName">
                            <el-input v-model="form.mtrlName" placeholder="名称" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;"></el-col>
                    <el-col :span="10">
                        <el-form-item label="别名:" prop="mtrlAlias">
                            <el-input v-model="form.mtrlAlias" placeholder="别名" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="类型:" prop="mtrlTypeId">
                            <el-select v-model="form.mtrlTypeId" placeholder="类型" clearable size="small">
                                <el-option v-for="dict in mtrlOption" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;"></el-col>
                    <el-col :span="10">
                        <el-form-item label="量纲:" prop="dimensionId">
                            <el-select v-model="form.dimensionId" placeholder="量纲" clearable size="small">
                                <el-option v-for="dict in LgList" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="上级物料:" prop="upperMtrlId">
                            <el-select v-model="form.upperMtrlId" placeholder="上级物料" clearable size="small">
                                <el-option v-for="dict in xlMes" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;"></el-col>
                    <el-col :span="10">
                        <el-form-item label="VCF表类型:" prop="vcfTypeId">
                            <el-select v-model="form.vcfTypeId" placeholder="VCF表类型" clearable size="small">
                                <el-option v-for="dict in vcfOption" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="精度:" prop="decStr">
                            <el-input v-model="form.decStr" type="number" placeholder="数据精度">
                                <template slot="append">%</template>
                            </el-input>
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
                        <el-form-item label="显示顺序:" prop="displayOrder">
                            <el-input v-model="form.displayOrder" placeholder="显示顺序" type="number" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;"></el-col>
                    <el-col :span="10">
                        <el-form-item label="备注:" prop="des">
                            <el-input v-model="form.des" placeholder="备注" />
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
    name: "Material",
    dicts: ["work_c"],
    components: {},
    data() {
        return {
            LgList: [],//量纲
            mtrlOption: [],//物料类型
            vcfOption: [],//vcf类型
            columns: [
                { key: 0, label: `编号`, visible: true },
                { key: 1, label: `编码`, visible: true },
                { key: 2, label: `名称`, visible: true },
                { key: 3, label: `别名`, visible: true },
                { key: 4, label: `类型`, visible: true },
                { key: 5, label: `上级物料`, visible: true },
                { key: 6, label: `VCF表类型`, visible: true },
                { key: 7, label: `量纲`, visible: true },
                { key: 8, label: `数据精度`, visible: true },
                { key: 9, label: `启用标识`, visible: true },
                { key: 10, label: `显示顺序`, visible: true },
                { key: 11, label: `备注`, visible: true },
                { key: 12, label: `操作`, visible: true },
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
            single: true,
            multiple: true,
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
                url: process.env.VUE_APP_BASE_API + "/mes/mtrl/import"
            },
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
            // 总条数
            total: 0,
            totalPage: 0, // 总页数
            pagerCurrentPage: 1, // 分页栏当前页码
            // 查询参数
            queryParams: {
                "isAsc": "0",
                "mtrlCode": "",
                "mtrlName": "",
                "mtrlTypeId": "",
                "orderByColumn": "0",
                "pageNum": 1,
                "pageSize": 10,
                "reasonable": true,
                "vcfTypeId": ""
            },
            // 表单参数
            form: {
                "decStr": 0,
                "des": "",
                "dimensionId": "",
                "mtrlAlias": "",
                "mtrlCode": "",
                "mtrlName": "",
                "mtrlNum": "",
                "mtrlTypeId": '',
                "tankIdt": 0,
                "upperMtrlId": '',
                "useFlag": "1",
                "vcfTypeId": '',
                "displayOrder": 1000,
            },
            // 表单校验
            rules: {
                mtrlNum: [
                    { required: true, message: "请输入编号", trigger: "blur" }
                ],
                mtrlCode: [
                    { required: true, message: "请输入编码", trigger: "blur" }
                ],
                mtrlName: [
                    { required: true, message: "请输入名称", trigger: "blur" }
                ],
                mtrlAlias: [
                    { required: true, message: "请输入别名", trigger: "blur" }
                ],
            }
        };
    },
    created() {
        this.getList();
        this.getOther();
        this.getOther_mtrAll();
    },
    methods: {
        //分页相关事件
        sizeChangeHandle(pagerNum) {
            // console.log(this.ruleForm, "每页条数");
            this.queryParams.pageSize = parseInt(pagerNum);
            this.queryParams.pageNum = 1;
            this.pagerCurrentPage = 1;
            this.getList();
        },
        currentChangeHandle(pageNum) {
            this.queryParams.pageNum = parseInt(pageNum);
            this.getList();
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.mtrlId);
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        },
        getOther() {
            //量纲 /dimension/list
            this.$api.i_dimension().then(res => {
                this.LgList = res.data.map(e => {
                    return {
                        value: e.id,
                        label: e.name
                    }
                })
            })
            //vcf表类型
            this.$api.i_vcfListtype().then(res => {
                this.vcfOption = res.data.map(e => {
                    return {
                        value: e.id,
                        label: e.vcfTypeName
                    }
                })
                console.log(this.vcfOption, "vcf数据别");
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
        getOther_mtrAll() {
            //上级物料
            this.$api.i_mtrAllList().then(res => {
                this.xlMes = res.data.map(e => {
                    return {
                        value: e.id,
                        label: e.name
                    }
                })
            })
        },
        getList() {
            this.loading = true;
            this.$api.i_mtrlList(this.queryParams).then(response => {
                this.deptList = response.rows
                this.total = response.total
                this.totalPage = Math.ceil(this.total / this.queryParams.pageSize);
                // 下面的 if 会在删除文章的时候可能会触发，例如最后一页只有一条数据
                // 删除之后，总页码数就会减一，当前页码数就大于了总页码数，所以要做处理
                if (this.queryParams.pageNum > this.totalPage) {
                    this.queryParams.pageNum = this.totalPage;
                    this.getList();
                }
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
                "decStr": 0,
                "des": "",
                "dimensionId": "",
                "mtrlAlias": "",
                "mtrlCode": "",
                "mtrlName": "",
                "mtrlNum": "",
                "mtrlTypeId": '',
                "tankIdt": 0,
                "upperMtrlId": '',
                "useFlag": "1",
                "vcfTypeId": '',
                "displayOrder": 1000,
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
        handleAdd11() {
            this.getOther_mtrAll()
            this.reset();
            this.formType = 'add'
            this.open = true;
            this.title = "增加信息";
        },

        /** 修改按钮操作 */
        handleUpdate(row) {
            this.reset();
            const userId = row.mtrlId || this.ids[0];
            this.formType = 'edit'
            this.$api.i_mtrlById({ mtrlId: userId }).then(res => {
                let nowData = res.data
                this.form = nowData
                if (this.form.pmesFctrId == "0") {
                    this.form.pmesFctrId = ""
                }
            })

            this.title = "修改信息";
            this.open = true;
        },
        /** 提交按钮 */
        submitForm() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.formType == 'add') {
                        this.$api.i_mtrlSu(this.form).then((res) => {
                            if (res.code == 200) {
                                console.log('接口成功', res)
                                this.$message({
                                    showClose: true,
                                    type: "success",
                                    message: "新增数据成功"
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
                    } else {
                        this.$api.i_mtrlSu(this.form).then((res) => {
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
                    }
                }
            });
        },
        /** 删除按钮操作 */
        handleDelete(row) {
            const userId = row.mtrlId || this.ids[0];
            this.$modal.confirm('是否确认删除"' + userId + '"的数据项？').then(() => {
                return this.$api.i_mtrlDel({ mtrlId: userId })
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => { });


        },
        /** 导出按钮操作 */
        handleExport() {
            this.download('/mes/mtrl/export', {
                ...this.queryParams
            }, `物料_${new Date().getTime()}.xlsx`)
        },
        /** 导入按钮操作 */
        handleImport() {
            this.upload.title = "数据导入";
            this.upload.open = true;
        },
        /** 下载模板操作 */
        importTemplate() {
            this.download('/mes/mtrl/export', {
            }, `物料模板_${new Date().getTime()}.xlsx`)
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
