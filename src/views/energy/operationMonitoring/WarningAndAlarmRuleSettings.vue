<template>
    <!-- 预警报警规则设置 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="100px">
            <el-form-item label="名称:" prop="unitName">
                <el-input v-model="queryParams.unitName" placeholder="名称" clearable @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="规则等级:" prop="unitTypeId">
                <el-select v-model="queryParams.unitTypeId" placeholder="规则等级" clearable  @change="ruleHierarchyChange">
                    <el-option v-for="dict in ruleHierarchy" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="量值类型:" prop="nodeAreaId">
                <el-select v-model="queryParams.nodeAreaId" placeholder="量值类型" clearable>
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
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
        <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
            <el-table-column fixed="left" type="selection" width="50" align="center" />
            <el-table-column label="序号" fixed="left" type="index" width="50" align="center" />
            <el-table-column label="名称" align="center" sortable key="name" prop="name"
                :show-overflow-tooltip="true" />
            <el-table-column label="规则等级" align="center" sortable key="ruleLevel" prop="ruleLevel"
                :show-overflow-tooltip="true" />
            <el-table-column label="量值类型" align="center" sortable key="measurementType" prop="measurementType"
                :show-overflow-tooltip="true" />
            <el-table-column label="能源介质" align="center" sortable key="energyMedium" prop="energyMedium"
                v-if="columns[5].visible" :show-overflow-tooltip="true" />
            <el-table-column label="报警上限" align="center" sortable key="alarmUpperLimit" prop="alarmUpperLimit" width="120"
                v-if="columns[6].visible" />
            <el-table-column label="报警下限" align="center" sortable key="alarmLowerLimit" prop="alarmLowerLimit" width="130"
                v-if="columns[7].visible" />
            <el-table-column label="启用标识" align="center" prop="enableFlag" v-if="columns[9].visible">
                <template slot-scope="scope">
                    <el-checkbox disabled @change="handleChange(scope.row)" true-label="1" false-label="0"
                        v-model="scope.row.enableFlag"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="备注" align="center" sortable key="remarks" prop="remarks" width="120"
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
                        <el-form-item label="名称:" prop="name">
                            <el-input v-model="form.name" placeholder="名称" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="规则等级:" prop="ruleLevel">
                            <el-select v-model="form.ruleLevel" placeholder="规则等级" @change="ruleHierarchyChange">
                                <el-option v-for="(item, index) in ruleHierarchy" :key="index" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="能源介质:" prop="energyMedium">
                            <el-select v-model="form.energyMedium" placeholder="能源介质">
                                <el-option v-for="(item, index) in EnergyMediumOption" :key="index" :label="item.label"
                                    :value="item.label"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="量值类型:" prop="measurementType">
                            <el-select v-model="form.measurementType" placeholder="量值类型">
                                <el-option v-for="dict in FormJQtype" :key="dict.value" :label="dict.label"
                                    :value="dict.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="报警上限:" prop="alarmUpperLimit">
                            <el-input type="number" v-model="form.alarmUpperLimit"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="报警下限:" prop="alarmLowerLimit">
                            <el-input v-model="form.alarmLowerLimit" type="number"> </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="是否启用:" prop="enableFlag">
                            <el-checkbox v-model="form.enableFlag" false-label="0" true-label="1"></el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="备注:">
                            <el-input v-model="form.remarks" placeholder="请输入内容"></el-input>
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
    name: "WarningAndAlarmRuleSettings",
    data() {
        return {
            textList: [
                {
                    tx: "全厂级",
                    te: "实时负荷、日累积消耗量、实时产量、日累积生产量"
                },
                {
                    tx: "管网级",
                    te: "实时温度、实时压力、实时流量、振动速度"
                },
                {
                    tx: "区域级",
                    te: "实时负荷、日累积消耗量、实时产量、日累积生产量"
                },
                {
                    tx: "设备级",
                    te: "实时负荷、实时耗水、实时耗汽、实时设备效率"
                },
            ],
            //量值类型
            magnitudeType: [
                {
                    label: "全部",
                    value: "1"
                },
                {
                    label: "实时负荷",
                    value: "2"
                },
                {
                    label: "日累积消耗量",
                    value: "3"
                },
                {
                    label: "月累积消耗量",
                    value: "4"
                }
            ],
            //规则等级
            ruleHierarchy: [
                {
                    label: "全厂级",
                    value: "1"
                },
                {
                    label: "管网级",
                    value: "2"
                },
                {
                    label: "区域级",
                    value: "3"
                },
                {
                    label: "设备级",
                    value: "4"
                },
            ],
            //能源介质
            EnergyMediumOption:[
                {
                    label: "电",
                    value: "2"
                },
                {
                    label: "热",
                    value: "3"
                },
                {
                    label: "燃气",
                    value: "4"
                },
                {
                    label: "水",
                    value: "5"
                },
            ],
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
            // 表单参数
            form: {
                measurementType:''
            },
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
                name: [
                    { required: true, message: "请输入名称", trigger: "blur" },
                ],
                ruleLevel: [
                    { required: true, message: "请选择规则等级", trigger: "blur" }
                ],
                energyMedium: [
                    { required: true, message: "请选择能源介质", trigger: "blur" }
                ],
                measurementType: [
                    { required: true, message: "请选择规则等级", trigger: "blur" }
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

        /** 查询用户列表 */
        getList() {
            this.loading = true;
            this.$api.i_warningRuleSetting(this.queryParams).then(response => {
                this.userList = response.data.rows
                this.total = response.data.total;
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

            this.$api.i_nodeAreaType().then(res => {
                this.JQtype = res.data.map(r => {
                    return {
                        label: r.nodeAreaTypeName,
                        value: r.id,
                    }
                })
            })
        },
        ruleHierarchyChange(e) {
            console.log('ruleHierarchyChange',e)
            // 根据下拉框一的选项值，设置下拉框二的选项列表

            switch (e) {
                case '1':
                    this.FormJQtype = [
                        { label: '实时负荷', value: '实时负荷' },
                        { label: '日累积消耗量', value: '日累积消耗量' },
                        { label: '实时产量', value: '实时产量' },
                        { label: '日累积生产量', value: '日累积生产量' }
                    ];

                    break;
                case '2':
                    this.FormJQtype = [
                        { label: '实时温度', value: '实时温度' },
                        { label: '实时压力', value: '实时压力' },
                        { label: '实时流量', value: '实时流量' },
                        { label: '振动速度', value: '振动速度' }
                    ];
                    break;
                case '3':
                    this.FormJQtype = [
                        { label: '实时负荷', value: '实时负荷' },
                        { label: '日累积消耗量', value: '日累积消耗量' },
                        { label: '实时产量', value: '实时产量' },
                        { label: '日累积生产量', value: '日累积生产量' }
                    ];
                    break;
                case '4':
                    this.FormJQtype = [
                        { label: '实时负荷', value: '实时负荷' },
                        { label: '实时耗水', value: '实时耗水' },
                        { label: '实时耗汽', value: '实时耗汽' },
                        { label: '实时设备效率', value: '实时设备效率' }
                    ];
                    break;
                default:
                    this.FormJQtype = [];
                    break;
            }
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
            this.form = row;
            this.open = true;
            this.title = "修改信息";
        },
        /** 提交按钮 */
        submitForm: function () {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    this.msgSuccess("新增成功");
                    this.open = false;
                    this.getList();
                }
            });
        },
        /** 删除按钮操作 */
        handleDelete(row) {

            const userIds = row.id || this.ids[0];
            this.$modal.confirm('是否确认删除"' + userIds + '"的数据项？').then(() => {

            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => { });
        },
        /** 导出按钮操作 */
        handleExport() {
            this.download('mes/unit/export', {
                ...this.queryParams
            }, `预警报警规则设置_${new Date().getTime()}.xlsx`)
        },
        /** 导入按钮操作 */
        handleImport() {
            this.upload.title = "数据导入";
            this.upload.open = true;
        },
        /** 下载模板操作 */
        importTemplate() {
            this.download('mes/unit/export', {
            }, `预警报警规则设置_${new Date().getTime()}.xlsx`)
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
