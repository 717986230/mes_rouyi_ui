<template>
    <!-- 罐计量 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="80px">
            <el-form-item label="罐类型:" prop="tankTypeId">
                <el-select v-model="queryParams.tankTypeId" placeholder="罐类型" clearable style="width: 100px;">
                    <el-option v-for="dict in tanktype" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="罐计量:" prop="measTypeId">
                <el-select v-model="queryParams.measTypeId" placeholder="罐计量" clearable style="width: 100px;">
                    <el-option v-for="dict in tankMeasAll" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="工厂:" prop="mesFctrId">
                <el-select v-model="queryParams.mesFctrId" placeholder="工厂" clearable style="width: 100px;">
                    <el-option v-for="dict in Factory" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="罐名:" prop="tankName">
                <el-input v-model="queryParams.tankName" placeholder="罐名" maxlength="30" />
            </el-form-item>
            <el-form-item label="位号:" prop="tagNum">
                <el-input v-model="queryParams.tagNum" placeholder="位号" maxlength="30" />
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
            <el-table-column label="ID" sortable align="center" key="id" prop="id" v-if="columns[0].visible" />
            <el-table-column label="名称" sortable align="center" key="tankName" prop="tankName" v-if="columns[1].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="别名" sortable align="center" key="tankAlias" prop="tankAlias" v-if="columns[2].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="位号" sortable align="center" key="tagNum" prop="tagNum" width="120"
                v-if="columns[3].visible" :show-overflow-tooltip="true" />
            <el-table-column label="启用标识" sortable align="center" prop="useFlag" key="useFlag" width="120"
                v-if="columns[4].visible">
                <template slot-scope="scope">
                    <el-checkbox disabled @change="handleChange(scope.row)" true-label="1" false-label="0"
                        v-model="scope.row.useFlag"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="计算类型名称" sortable align="center" key="measTypeName" prop="measTypeName"
                v-if="columns[5].visible" :show-overflow-tooltip="true" />
            <el-table-column label="计量系数" sortable align="center" key="coefficient" prop="coefficient" width="120"
                v-if="columns[6].visible" />
            <el-table-column label="显示顺序" sortable align="center" prop="displayOrder" width="160" v-if="columns[7].visible">
            </el-table-column>
            <el-table-column label="备注" sortable align="center" key="des" prop="des" width="120"
                v-if="columns[8].visible" />
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
            <el-form ref="form" :model="form" :rules="rules" label-width="120px">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="工厂:" prop="mesFctrId">
                            <el-select v-model="form.mesFctrId" placeholder="工厂" @change="changeFactory">
                                <el-option v-for="(dict, index) in Factory" :key="index" :label="dict.label"
                                    :value="dict.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="界区类型:" prop="tankTypeId">
                            <el-select v-model="form.tankTypeId" placeholder="界区类型" disabled>
                                <el-option v-for="(item, index) in BoundaryType" :key="index" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="界区:" prop="tankAreaId">
                            <el-select v-model="form.tankAreaId" placeholder="界区">
                                <el-option v-for="(item, index) in SanvList2" :key="index" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="罐:" prop="tankId">
                            <el-select v-model="form.tankId" placeholder="罐">
                                <el-option v-for="(item, index) in SanvList1" :key="index" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="启用标识:">
                            <el-checkbox v-model="form.useFlag" false-label="0" true-label="1"></el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="位号:" prop="tagNum">
                            <el-input v-model="form.tagNum" placeholder="位号" > </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="计量类型:" prop="measTypeId">
                            <el-select v-model="form.measTypeId" placeholder="计量类型">
                                <el-option v-for="dict in tankMeasAll" :key="dict.value" :label="dict.label"
                                    :value="dict.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="计量系数:" prop="coefficient">
                            <el-input v-model="form.coefficient" placeholder="计量系数" type="number" maxlength="30"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="显示顺序:" prop="displayOrder">
                            <el-input v-model="form.displayOrder" type="number" maxlength="30"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="备注:" prop="des">
                            <el-input v-model="form.des" placeholder="请输入内容" maxlength="30"></el-input>
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
    name: "cTankVo_jl",
    dicts: ['pot_measure_add', 'disabled'],
    components: {},
    data() {
        return {
            tankMeasAll: [],//罐计量类型
            SanvList1: [],//罐
            SanvList2: [],//界区
            BoundaryType: [],//界区类型
            Factory: [],//工厂
            tanktype: [],//罐类型
            // 列信息
            columns: [
                { key: 0, label: `编号`, visible: true },
                { key: 1, label: `名称`, visible: true },
                { key: 2, label: `别名`, visible: true },
                { key: 3, label: `位号`, visible: true },
                { key: 4, label: `启用标识`, visible: true },
                { key: 5, label: `计算类型名称`, visible: true },
                { key: 6, label: `计量系数`, visible: true },
                { key: 7, label: `显示顺序`, visible: true },
                { key: 8, label: `备注`, visible: true },
            ],
            air: [
                {
                    label: "无定义", value: "0"
                }
            ],
            airType: [
                {
                    label: "罐区", value: "0"
                },
                {
                    label: "装置界区", value: "1"
                },
                {
                    label: "仓库", value: "2"
                },
                {
                    label: "装卸台", value: "3"
                },
                {
                    label: "办公区", value: "4"
                },
            ],
            pot: [
                {
                    label: "TK6502B(化工)", value: "0"
                },
                {
                    label: "TK6502A(化工)", value: "1"
                }
            ],
            roleOptions: [
                {
                    label: "1", value: "1"
                },
                {
                    label: "2", value: "2"
                },
                {
                    label: "3", value: "3"
                }
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
                url: process.env.VUE_APP_BASE_API + "/mes/tankMeas/import"
            },
            // 查询参数
            queryParams: {
                "id": undefined,
                "isAsc": "",
                "measTypeId": "",
                "mesFctrId": undefined,
                "orderByColumn": "",
                "pageNum": 1,
                "pageSize": 10,
                "reasonable": true,
                "tagNum": "",
                "tankName": "",
                "tankTypeId": ""
            },
            // 表单校验
            rules: {
                tankAreaId: [
                    { required: true, message: "请选择界区", trigger: "blur" }
                ],
                tankId: [
                    { required: true, message: "请选择罐", trigger: "blur" }
                ],
                mesFctrId: [
                    { required: true, message: "请输入罐工厂", trigger: "blur" }
                ],
            }
        };
    },
    watch: {},
    created() {
        this.getOther();
        this.getList();
    },
    methods: {
        //工厂改变
        changeFactory() {
            // 根据工厂id获取车间,装置,侧线，加工方案,界区,罐区 /common/getByFctrId
            this.$api.i_commonGetFc({ mesFctrId: this.form.tankTypeId }).then(res => {
                const mapData = (data) => data.map(e => ({ label: e.name, value: e.id }));
                this.SanvList2 = mapData(res.data.pmNodeAreaGetByIdVOS);// 界区
                this.form.tankAreaId = this.SanvList2.length > 0 ? this.SanvList2[0].value : "";// 界区
            });
            //全部罐
            this.$api.i_GtankgetByDTOList({
                "mesFctrId": this.form.mesFctrId,
                "tankName": this.form.tankName
            }).then((res) => {
                if (res.code == 200) {
                    this.SanvList1 = res.data.map(r => {
                        return {
                            label: r.tankName,
                            value: r.id
                        }
                    })
                    this.form.tankId = this.SanvList1.length > 0 ? this.SanvList1[0].value : ""; // 罐
                } else {
                    console.log(`接口成功,但接口状态=${res.code}`, res)
                }

            })
        },
        getOther() {
            //罐计量类型
            this.$api.i_tankMeasAllList().then(res => {
                this.tankMeasAll = res.data.map(r => {
                    return {
                        label: r.name,
                        value: r.id
                    }
                })
            })
            //界区类型
            this.$api.i_nodeAreaType().then(res => {
                this.BoundaryType = res.data.map(r => {
                    return {
                        label: r.nodeAreaTypeName,
                        value: r.id,
                    }
                })
            })

            //工厂
            this.$api.i_MESFactoryAllList().then(res => {
                this.Factory = res.data.map(e => {
                    return {
                        label: e.mesFctrName,
                        value: e.mesFctrId
                    }
                })
            })
            //罐类型
            this.$api.i_tankType().then(res => {
                this.tanktype = res.data.map(r => {
                    return {
                        label: r.name,
                        value: r.id
                    }
                })
            })
        },
        /** 查询用户列表 */
        getList() {
            this.loading = true;
            this.$api.i_tankMeasList(this.queryParams).then(res => {
                this.userList = res.rows.map(r => {
                    return {
                        ...r,
                        useFlag: String(r.useFlag)
                    }
                })

                this.total = res.total
                this.loading = false;
            })
        },
        // 取消按钮
        cancel() {
            this.reset();
            this.open = false;
        },
        // 表单重置
        reset() {
            this.form = {
                tankId: "",//罐
                tankAreaId: "",//界区
                tankTypeId: "1",//界区类型
                "coefficient": "",
                "des": "",
                "displayOrder": "1",
                "id": undefined,
                "measTypeId": undefined,
                "tagNum": "",
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
                        this.$api.i_tankMeasSU({
                            tankTypeId: this.form.tankTypeId,
                            // "brokenflag": this.form.brokenflag,
                            "coefficient": this.form.coefficient,
                            "des": this.form.des,
                            "displayOrder": this.form.displayOrder,
                            "id": this.form.id,
                            "measTypeId": this.form.measTypeId,
                            "tagNum": this.form.tagNum,
                            "tankId": this.form.tankId,
                            "useFlag": this.form.useFlag
                        }).then(response => {
                            this.$modal.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        this.$api.i_tankMeasSU(this.form).then(response => {
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
            this.open = true;
            this.title = "添加信息";
        },
        /** 修改按钮操作 */
        handleUpdate(row) {
            this.reset();
            const userId = row.id || this.ids[0];
            this.changeFactory();
            this.$api.i_tankMeasById({ id: userId }).then(response => {
                this.form = response.data;
                this.form.useFlag = String(this.form.useFlag);
                this.form.tankTypeId = String(this.form.tankTypeId);
                this.open = true;
                this.title = "修改信息";
            });
        },
        /** 删除按钮操作 */
        handleDelete(row) {
            const userIds = row.id || this.ids[0];
            this.$modal.confirm('是否确认删除"' + userIds + '"的数据项？').then(() => {
                return this.$api.i_tankMeasDel({ id: userIds })
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => { });
        },
        /** 导出按钮操作 */
        handleExport() {
            this.download('mes/tankMeas/export', {
                ...this.queryParams
            }, `罐计量_${new Date().getTime()}.xlsx`)
        },
        /** 导入按钮操作 */
        handleImport() {
            this.upload.title = "数据导入";
            this.upload.open = true;
        },
        /** 下载模板操作 */
        importTemplate() {
            this.download('mes/tankMeas/export', {
            }, `罐计量_${new Date().getTime()}.xlsx`)
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
