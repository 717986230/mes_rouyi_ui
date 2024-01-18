<template>
    <!-- 能源节点计量模型配置 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="100px">
            <el-form-item label="介质:" prop="mediumId" style="margin-left: -50px;">
                <el-select size="mini" v-model="queryParams.mediumId" placeholder="节点类型" clearable>
                    <el-option v-for="dict in FormJQtype" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="节点类型:" prop="type">
                <el-select size="mini" v-model="queryParams.type" placeholder="节点类型" clearable>
                    <el-option v-for="dict in nodeTypeList" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="节点名称:" prop="nodeName">
                <el-input size="mini" v-model="queryParams.nodeName" placeholder="节点名称" clearable
                    @keyup.enter.native="handleQuery" />
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
        <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange" border>
            <el-table-column fixed="left" type="selection" width="50" align="center" />
            <el-table-column fixed="left" label="节点名称" align="center" sortable key="typeName" prop="typeName"
                v-if="columns[0].visible" />
            <el-table-column label="介质名称" align="center" sortable key="mtrlName" prop="mtrlName" v-if="columns[1].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="节点类型" align="center" sortable key="type" prop="type" v-if="columns[2].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="区域名称" align="center" sortable key="nodeAreaTypeName" prop="nodeAreaTypeName"
                v-if="columns[3].visible" :show-overflow-tooltip="true" />
            <el-table-column label="计算公式" align="center" sortable key="formula" prop="formula" v-if="columns[4].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="权重分摊" align="center" sortable key="isShare" prop="isShare" v-if="columns[5].visible"
                :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.isShare" false-label="0" true-label="1" disabled></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="分摊系数" align="center" sortable key="shareCoefficient" prop="shareCoefficient" width="120"
                v-if="columns[6].visible" />
            <el-table-column label="小数位数" align="center" sortable key="places" prop="places" width="130"
                v-if="columns[7].visible">
                <!-- <template slot-scope="scope">
                    <div v-if="!scope.row.Editable" @click="toggleRowVisibility(scope.row)"> {{ scope.row.places }}
                    </div>
                    <el-input v-else ref="usernameRef" v-model="scope.row.places" @blur="handleBlur(scope.row)" autofocus />
                </template> -->
            </el-table-column>
            <el-table-column label="日最大值" align="center" sortable key="maxVal" prop="maxVal" width="120"
                v-if="columns[8].visible" />
            <el-table-column label="计量单位" align="center" sortable key="dimensionName" prop="dimensionName" width="120"
                v-if="columns[9].visible" />
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
                        <el-form-item label="能源节点:" prop="nodeId">
                            <el-select v-model="form.nodeId" placeholder="能源节点">
                                <el-option v-for="(item, index) in EnergyNode" :key="item.value" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="计算公式:" prop="formula">
                            <el-select v-model="form.formula" placeholder="计算公式">
                                <el-option v-for="(item, index) in Algorithmclass" :key="index" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="分摊系数:" prop="shareCoefficient">
                            <el-select v-model="form.shareCoefficient" placeholder="分摊系数">
                                <el-option v-for="(item, index) in fenTan" :key="index" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="权重分摊:" prop="isShare">
                            <el-checkbox v-model="form.isShare" false-label="0" true-label="1"></el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="日最大值:" prop="maxVal">
                            <el-input-number v-model="form.maxVal" placeholder="日最大值" :controls="false"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="小数位数:" prop="places">
                            <el-input-number v-model="form.places" placeholder="小数位数" :controls="false"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="计量单位:" prop="dimensionId">
                            <el-select v-model="form.dimensionId" placeholder="计量单位">
                                <el-option v-for="(item, index) in Dimension" :key="index" :label="item.label"
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
        <!-- 公式验证编辑 -->
        <varPop :openGS="openGS" @close="handleClose"></varPop>
    </div>
</template>
<script>
import { getToken } from "@/utils/auth";
import varPop from "../../component/varPop.vue";
export default {
    name: "EnergyNodeMeasurementModelConfiguration",
    components: { varPop },
    data() {
        return {
            fenTan: [
                {
                    label: '-1',
                    value: '-1'
                }, {
                    label: '0',
                    value: '0'
                }, {
                    label: '1',
                    value: '1'
                }
            ],
            Dimension: [],//计量单位
            Algorithmclass: [],//算法类别
            EnergyNode: [],//能源节点
            nodeTypeList: [],//节点类型
            FormJQtype: [],//介质
            // 列信息
            columns: [
                { key: 0, label: `节点名称`, visible: true },
                { key: 1, label: `介质名称`, visible: true },
                { key: 2, label: `节点类型`, visible: true },
                { key: 3, label: `区域名称`, visible: true },
                { key: 4, label: `计算公式`, visible: true },
                { key: 5, label: `权重分摊`, visible: true },
                { key: 6, label: `分摊系数`, visible: true },
                { key: 7, label: `小数位数`, visible: true },
                { key: 7, label: `日最大值`, visible: true },
                { key: 8, label: `计量单位`, visible: true },
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
                url: process.env.VUE_APP_BASE_API + "/energy/energyNodeMeasure/import"
            },
            // 查询参数
            queryParams: {
                "id": undefined,
                "isAsc": "",
                "mediumId": undefined,
                "nodeName": "",
                "orderByColumn": "",
                "pageNum": 1,
                "pageSize": 10,
                "reasonable": true,
                "type": ""
            },
            // 表单校验
            rules: {
                typeName: [
                    { required: true, message: "节点名称", trigger: "blur" },
                ],
                type: [
                    { required: true, message: "节点类型", trigger: "blur" }
                ],
                nodeAreaType: [
                    { required: true, message: "区域类型", trigger: "blur" }
                ],
                nodeId: [
                    { required: true, message: "能源节点", trigger: "blur" }
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
        // toggleRowVisibility(row) {
        //     row.Editable = true;
        // },
        //失焦事件
        // handleBlur(row) {
        //     row.Editable = false
        // },
        //传给子组件的控制方法
        handleClose() {
            this.openGS = false; // 关闭父组件的弹窗
            this.reset();
        },
        close() {
            this.$emit('update:visible', false)
        },
        /** 查询用户列表 */
        getList() {
            this.loading = true;
            this.$api.e_energyNodeMeasureList(this.queryParams).then(response => {
                let List = response.rows  //RecId
                this.userList = List.map(p => {
                    return {
                        ...p,
                        isShare: String(p.isShare),
                        Editable: false,
                    }
                })
                this.total = response.total;
                this.loading = false;
            }
            );
        },
        getOther() {
            //计量单位
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
            //能源节点
            this.$api.e_energyNodeALLList().then(res => {
                this.EnergyNode = res.data.map(r => {
                    return {
                        label: r.nodeName,
                        value: r.id,
                    }
                })
                console.log("能源节点", this.EnergyNode);
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
            //全部介质
            this.$api.e_enMediumallList().then(res => {
                this.FormJQtype = res.data.map(r => {
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
                "dimensionId": undefined,
                "formula": "",
                "id": undefined,
                "isShare": "1",
                "maxVal": "",
                "nodeId": undefined,
                "places": "",
                "shareCoefficient": "",
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
            this.$api.e_energyNodeMeasureByid({ id: userId }).then(response => {
                this.form = response.data;
                this.form.isShare = String(response.data.isShare)
                this.open = true;
                this.title = "修改信息";
            });
        },
        /** 提交按钮 */
        submitForm: function () {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.form.id != undefined) {
                        this.$api.e_energyNodeMeasureSU({
                            "dimensionId": this.form.dimensionId,
                            "formula": this.form.formula,
                            "id": this.form.id,
                            "isShare": this.form.isShare,
                            "maxVal": this.form.maxVal,
                            "nodeId": this.form.nodeId,
                            "places": this.form.places,
                            "shareCoefficient": this.form.shareCoefficient,
                        }).then(response => {
                            this.$modal.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        this.$api.e_energyNodeMeasureSU(this.form).then(response => {
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
                return this.$api.e_energyNodeMeasureDel({ id: userIds })
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => { });
        },
        /** 导出按钮操作 */
        handleExport() {
            this.download('energy/energyNodeMeasure/export', {
                ...this.queryParams
            }, `能源节点计量模型配置_${new Date().getTime()}.xlsx`)
        },
        /** 导入按钮操作 */
        handleImport() {
            this.upload.title = "数据导入";
            this.upload.open = true;
        },
        /** 下载模板操作 */
        importTemplate() {
            this.download('energy/energyNodeMeasure/export', {
            }, `能源节点计量模型配置_${new Date().getTime()}.xlsx`)
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
