<template>
    <!-- mes车间 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch">
            <el-form-item label="名称:" prop="mesWspName">
                <el-input v-model="queryParams.mesWspName" placeholder="请输入名称" clearable size="small"
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="别名:" prop="mesWspAlias">
                <el-input v-model="queryParams.mesWspAlias" placeholder="请输入别名" clearable size="small"
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="工厂:" prop="mesFctrId">
                <el-select v-model="queryParams.mesFctrId" placeholder="工厂" clearable size="small">
                    <el-option v-for="dict in xlMes" :key="dict.value" :label="dict.label" :value="dict.value" />
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
            <el-table-column label="编号" sortable align="center" key="mesWspNum" prop="mesWspNum"
                v-if="columns[0].visible" />
            <el-table-column label="编码" sortable align="center" key="mesWspCode" prop="mesWspCode"
                :show-overflow-tooltip="true" v-if="columns[1].visible" />
            <el-table-column label="名称" sortable align="center" key="mesWspName" prop="mesWspName"
                :show-overflow-tooltip="true" v-if="columns[2].visible" />
            <el-table-column label="别名" sortable align="center" key="mesWspAlias" prop="mesWspAlias"
                :show-overflow-tooltip="true" v-if="columns[3].visible" />
            <el-table-column label="工厂" sortable align="center" key="mesFctrName" prop="mesFctrName"
                :show-overflow-tooltip="true" v-if="columns[4].visible" />
            <el-table-column label="启用标识" disabled sortable align="center" key="useFlag" prop="useFlag" width="120"
                :show-overflow-tooltip="true" v-if="columns[5].visible">
                <template slot-scope="scope">
                    <el-checkbox true-label="1" false-label="0" disabled v-model="scope.row.useFlag"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="显示顺序" sortable align="center" width="100" key="displayOrder" prop="displayOrder"
                :show-overflow-tooltip="true" v-if="columns[6].visible" />
            <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
                    <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination style="float: right;" background :page-size="queryParams.pageSize" :page-sizes="[5, 10, 20, 50]"
            layout="->,total,sizes, prev, pager, next, jumper" :total="total" :current-page.sync="queryParams.pageNum"
            @size-change="sizeChangeHandle" @current-change="currentChangeHandle">
        </el-pagination>
        <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="编号:" prop="mesWspNum">
                            <el-input type="number" v-model="form.mesWspNum" placeholder="请输入编号" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;"></el-col>
                    <el-col :span="10">
                        <el-form-item label="编码:" prop="mesWspCode">
                            <el-input v-model="form.mesWspCode" placeholder="请输入编码" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="名称:" prop="mesWspName">
                            <el-input v-model="form.mesWspName" placeholder="名称" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;"></el-col>
                    <el-col :span="10">
                        <el-form-item label="别名:" prop="mesWspAlias">
                            <el-input v-model="form.mesWspAlias" placeholder="别名" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="工厂:" prop="mesFctrId">
                            <el-select v-model="form.mesFctrId" placeholder="工厂" clearable style="width: 236px;">
                                <el-option v-for="dict in xlMes" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;"></el-col>
                    <el-col :span="10">
                        <el-form-item label="显示顺序:" prop="displayOrder">
                            <el-input type="number" v-model="form.displayOrder" placeholder="显示顺序" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="是否启用:" prop="useFlag">
                            <el-checkbox true-label="1" false-label="0" v-model="form.useFlag"></el-checkbox>
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
                        <el-form-item label="车间类型:" prop="type">
                            <el-select v-model="form.type" placeholder="车间类型" clearable style="width: 236px;">
                                <el-option v-for="dict in mesWorkshopType" :key="dict.value" :label="dict.label"
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
    name: "MesWorkshop",
    components: {},
    data() {
        return {
            totalPage: 0, // 总页数
            pagerCurrentPage: 1, // 分页栏当前页码
            total: 0,
            mesWorkshopType: [],//mes车间类型
            columns: [
                { key: 0, label: `编号`, visible: true },
                { key: 1, label: `编码`, visible: true },
                { key: 2, label: `名称`, visible: true },
                { key: 3, label: `别名`, visible: true },
                { key: 4, label: `工厂`, visible: true },
                { key: 5, label: `启用标识`, visible: true },
                { key: 6, label: `显示顺序`, visible: true },
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
                url: process.env.VUE_APP_BASE_API + "mes/mesWorkshop/import"

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
                "id": "",
                "isAsc": "",
                "mesFctrId": "",
                "mesWspAlias": "",
                "mesWspName": "",
                "orderByColumn": "",
                "pageNum": 1,
                "pageSize": 10,
                "reasonable": true
            },
            // 表单参数
            form: {},
            // 表单校验
            rules: {
                mesWspNum: [
                    { required: true, message: "请输入编号", trigger: "blur" }
                ],
                mesWspCode: [
                    { required: true, message: "请输入编码", trigger: "blur" }
                ],
                mesWspName: [
                    { required: true, message: "请输入名称", trigger: "blur" }
                ],
                mesWspAlias: [
                    { required: true, message: "请输入别名", trigger: "blur" }
                ],
                mesFctrId: [
                    { required: true, message: "请输入工厂", trigger: "blur" }
                ],
                type: [
                    { required: true, message: "请选择车间类型", trigger: "blur" }
                ]
            }
        };
    },
    created() {
        this.getList();
        this.getOther();
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
            this.ids = selection.map(item => item.id);
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        },
        getOther() {
            //mes车间类型
            this.$api.i_mesWorkshopType().then(res => {
                this.mesWorkshopType = res.data.map(e => {
                    return {
                        label: e.name,
                        value: e.id
                    }
                })
            })
            //工厂下拉框列表  i_MESFactoryall
            this.$api.i_MESFactoryAllList().then(res => {
                this.xlMes = res.data.map(e => {
                    return {
                        label: e.mesFctrName,
                        value: e.mesFctrId
                    }
                })
            })
        },
        getList() {
            this.loading = true;
            this.$api.i_mesWorkshop(this.queryParams).then(response => {
                this.deptList = response.rows.map(e => {
                    return {
                        ...e,
                        useFlag: String(e.useFlag)
                    }

                })
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

        // 字典状态字典翻译
        statusFormat(row, column) {
            return this.selectDictLabel(this.statusOptions, row.status);
        },
        // 取消按钮
        cancel() {
            this.open = false;
            this.reset();
        },
        // 表单重置
        reset() {
            this.form = {
                "type": 1,
                "des": "",
                "displayOrder": "1000",
                "id": "",
                "mesFctrId": "",
                "mesWspAlias": "",
                "mesWspCode": "",
                "mesWspName": "",
                "mesWspNum": "",
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
            this.$api.i_mesWorkshopgetById({ id: postId }).then(res => {
                let nowData = res.data
                this.form = nowData
                this.form.useFlag = String(res.data.useFlag)
                this.form.type = Number(res.data.type)

            })
            this.title = "修改信息";
            this.open = true;
        },
        /** 提交按钮 */
        submitForm() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.formType == 'add') {
                        this.$api.i_saveOrUpdata(this.form).then((res) => {
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
                        this.$api.i_saveOrUpdata(this.form).then((res) => {
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
            const postId = row.id || this.ids[0]
            this.$modal.confirm('是否确认删除"' + postId + '"的数据项？').then(() => {
                return this.$api.i_mesWorkshopdelete({ id: postId })
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => { });

        },
        /** 导出按钮操作 */
        handleExport() {
            this.download('mes/mesWorkshop/export', {
                ...this.queryParams
            }, `MES车间_${new Date().getTime()}.xlsx`)
        },
        /** 导入按钮操作 */
        handleImport() {
            this.upload.title = "数据导入";
            this.upload.open = true;
        },
        /** 下载模板操作 */
        importTemplate() {
            this.download('mes/mesWorkshop/export', {
            }, `MES车间_${new Date().getTime()}.xlsx`)
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
