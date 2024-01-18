<template>
    <!-- 能源节点 -->
    <div class="app-container">
        <div style="margin:10px 5px;font-size: 20px;">能源节点</div>
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="100px">
            <el-form-item label="节点名称:" prop="nodeName" style="margin-left: -20px;">
                <el-input size="mini" v-model="queryParams.nodeName" placeholder="节点名称" maxlength="30"
                    style="width: 150px;" />
            </el-form-item>
            <el-form-item label="节点类型:" prop="type">
                <el-select size="mini" v-model="queryParams.type" placeholder="节点类型" clearable style="width: 150px;">
                    <el-option v-for="dict in nodeTypeList" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="所属区域:" prop="nodeAreaType">
                <el-select size="mini" v-model="queryParams.nodeAreaType" placeholder="所属区域" clearable
                    style="width: 150px;">
                    <el-option v-for="dict in OwningRegionType" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>

            <el-form-item label="是否启用:" prop="useFlag">
                <el-select size="mini" v-model="queryParams.useFlag" placeholder="是否启用" clearable style="width: 150px;">
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
            <el-table-column fixed="left" label="节点ID" align="center" width="90" sortable key="id" prop="id"
                v-if="columns[0].visible" />
            <el-table-column label="节点编码" align="center" sortable width="100" key="nodeCode" prop="nodeCode"
                v-if="columns[1].visible" :show-overflow-tooltip="true" />
            <el-table-column label="节点名称" align="center" sortable width="100" key="nodeName" prop="nodeName"
                v-if="columns[2].visible" :show-overflow-tooltip="true" />
            <el-table-column label="节点别名" align="center" sortable key="nodeAlias" width="100" prop="nodeAlias"
                v-if="columns[3].visible" :show-overflow-tooltip="true" />
            <el-table-column label="节点类型" align="center" sortable key="typeName" width="130" prop="typeName"
                v-if="columns[4].visible" :show-overflow-tooltip="true" />
            <el-table-column label="所属区域" align="center" sortable key="nodeAreaTypeName" width="100" prop="nodeAreaTypeName"
                v-if="columns[4].visible" :show-overflow-tooltip="true" />
            <el-table-column label="节点精度" align="center" sortable key="decStr" width="100" prop="decStr"
                v-if="columns[5].visible" :show-overflow-tooltip="true" />
            <el-table-column label="是否启用" sortable align="center" width="120" key="useFlag" prop="useFlag"
                v-if="columns[10].visible">
                <template slot-scope="scope">
                    <el-checkbox disabled @change="handleChange(scope.row)" true-label="1" false-label="0"
                        v-model="scope.row.useFlag"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="显示顺序" align="center" sortable key="displayOrder" prop="displayOrder" width="160"
                v-if="columns[11].visible">
            </el-table-column>
            <el-table-column label="说明" align="center" sortable key="des" prop="des" width="120"
                v-if="columns[12].visible" />
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
                        <el-form-item label="节点编号:" prop="nodeNum">
                            <el-input v-model="form.nodeNum" placeholder="节点编号" type="number" maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="节点编码:" prop="nodeCode">
                            <el-input v-model="form.nodeCode" placeholder="节点编码" maxlength="30" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="所属区域类型:" prop="nodeAreaType">
                            <el-select v-model="form.nodeAreaType" placeholder="所属区域" clearable @change="handleArea">
                                <el-option v-for="dict in OwningRegionType" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="所属区域:" prop="nodeAreaId">
                            <el-select v-model="form.nodeAreaId" placeholder="所属区域" clearable>
                                <el-option v-for="dict in OwningRegion" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="介质名称:" prop="mediumId">
                            <el-select v-model="form.mediumId" placeholder="介质名称">
                                <el-option v-for="(item, index) in SuperiorMaterial" :key="index" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="节点名称:" prop="nodeName">
                            <el-input v-model="form.nodeName" placeholder="节点名称" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="节点别名:" prop="nodeAlias">
                            <el-input v-model="form.nodeAlias" placeholder="节点别名" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="节点类型:" prop="type">
                            <el-select v-model="form.type" placeholder="节点类型">
                                <el-option v-for="(item, index) in nodeTypeList" :key="index" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="节点精度:" prop="decStr">
                            <el-input v-model="form.decStr" placeholder="节点精度" type="number" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="是否启用:" prop="useFlag">
                            <el-checkbox true-label="1" false-label="0" v-model="form.useFlag"></el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="显示顺序:" prop="displayOrder">
                            <el-input type="number" v-model="form.displayOrder" placeholder="显示顺序"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="说明:" prop="des">
                            <el-input v-model="form.des" placeholder="说明"> </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="方向:" prop="direction">
                            <el-select v-model="form.direction" placeholder="方向">
                                <el-option v-for="(item, index) in inorout" :key="index" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
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
    name: "EnergyNodes",
    components: {},

    data() {
        return {
            SuperiorMaterial: [],//介质名称
            OwningRegion: [],//所属区域
            OwningRegionType: [],//所属区域类型
            nodeTypeList: [],//节点类型
            inorout: [],//进出类型
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
                { key: 0, label: `节点ID`, visible: true },
                { key: 1, label: `节点编码`, visible: true },
                { key: 2, label: `节点名称`, visible: true },
                { key: 3, label: `节点别名`, visible: true },
                { key: 4, label: `节点类型`, visible: true },
                { key: 5, label: `节点精度`, visible: true },
                { key: 6, label: `装置界区`, visible: true },
                { key: 8, label: `罐区`, visible: true },
                { key: 9, label: `装卸台`, visible: true },
                { key: 10, label: `仓库`, visible: true },
                { key: 11, label: `是否启用`, visible: true },
                { key: 11, label: `显示顺序`, visible: true },
                { key: 12, label: `说明`, visible: true },
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
                url: process.env.VUE_APP_BASE_API + "/energy/energyNode/import"
            },
            // 查询参数
            queryParams: {
                "type": "",
                "isAsc": "",
                "pageNum": 1,
                "nodeName": "",
                "pageSize": 10,
                "id": undefined,
                "reasonable": true,
                "nodeAreaType": "",
                "orderByColumn": "",
                "mediumId": undefined,
                "useFlag": " "
            },
            // 表单校验
            rules: {
                nodeNum: [
                    { required: true, message: "请输入编号", trigger: "blur" },
                ],
                nodeCode: [
                    { required: true, message: "请输入编码", trigger: "blur" }
                ],
                nodeAreaType: [
                    { required: true, message: "所属区域", trigger: "blur" }
                ],
                mediumId: [
                    { required: true, message: "介质名称", trigger: "blur" }
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
        handleArea() {
            //根据条件查询界区类型
            this.$api.i_nodeAreaList({
                "mesFctrId": "",
                "nodeAreaType": this.form.nodeAreaType
            }).then(res => {
                this.OwningRegion = res.data.map(r => {
                    return {
                        label: r.name,
                        value: r.id,
                    }
                })
            })
            this.form.nodeAreaId = this.OwningRegion[0].value
        },
        close() {
            this.$emit('update:visible', false)
        },
        /** 查询用户列表 */
        getList() {
            this.loading = true;
            this.$api.e_energyNodeList(this.queryParams).then(response => {
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
            //上级物料类型
            this.$api.i_enMediumallList().then(res => {
                this.SuperiorMaterial = res.data.map(r => {
                    return {
                        label: r.mtrlName,
                        value: r.mtrlId,
                    }
                })
            })
            //所属区域
            this.$api.i_nodeAreaList(
                {
                    "mesFctrId": "",
                    "nodeAreaType": this.queryParams.nodeAreaType,
                }
            ).then(res => {
                this.OwningRegion = res.data.map(r => {
                    return {
                        label: r.name,
                        value: r.id,
                    }
                })
            })
            //所属区域类型
            this.$api.i_nodeAreaType().then(res => {
                this.OwningRegionType = res.data.map(r => {
                    return {
                        label: r.nodeAreaTypeName,
                        value: r.id,
                    }
                })
            })

            //节点类型
            this.$api.i_nodeTypeList().then(res => {
                this.nodeTypeList = res.data.map(r => {
                    return {
                        label: r.name,
                        value: r.id
                    }
                })
            })
            this.$api.e_directionList().then(res => {
                this.inorout = res.data.map(r => {
                    return {
                        label: r.name,
                        value: r.id
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
                "decStr": "",
                "des": "",
                "direction": "",
                "displayOrder": "",
                "id": undefined,
                "mediumId": "",
                "nodeAlias": "",
                "nodeAreaId": "",
                "nodeAreaType": "",
                "nodeCode": "",
                "nodeName": "",
                "nodeNum": "",
                "type": "",
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
            this.$api.e_energyNodeById({ id: userId }).then(response => {
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
                        this.$api.e_energyNodeSU({
                            "decStr": this.form.decStr,
                            "des": this.form.des,
                            "direction": this.form.direction,
                            "displayOrder": this.form.displayOrder,
                            "id": this.form.id,
                            "mediumId": this.form.mediumId,
                            "nodeAlias": this.form.nodeAlias,
                            "nodeAreaType": this.form.nodeAreaType,
                            "nodeAreaId": this.form.nodeAreaId,
                            "nodeCode": this.form.nodeCode,
                            "nodeName": this.form.nodeName,
                            "nodeNum": this.form.nodeNum,
                            "type": this.form.type,
                            "useFlag": this.form.useFlag,
                        }).then(response => {
                            this.$modal.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        this.$api.e_energyNodeSU(this.form).then(response => {
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
                return this.$api.e_energyNodeDel({ id: userIds })
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => { });
        },
        /** 导出按钮操作 */
        handleExport() {
            this.download('energy/energyNode/export', {
                ...this.queryParams
            }, `能源节点_${new Date().getTime()}.xlsx`)
        },
        /** 导入按钮操作 */
        handleImport() {
            this.upload.title = "数据导入";
            this.upload.open = true;
        },
        /** 下载模板操作 */
        importTemplate() {
            this.download('energy/energyNode/export', {
            }, `能源节点_${new Date().getTime()}.xlsx`)
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
