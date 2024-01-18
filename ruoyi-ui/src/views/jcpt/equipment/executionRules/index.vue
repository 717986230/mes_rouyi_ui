<template>
    <!--    执行规则-->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="150px">
            <el-form-item label="规则名称:" prop="name" style="margin-left: -50px;">
                <el-input v-model="queryParams.name" placeholder="请输入规则名称" clearable @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="是否启用:" prop="useFlag">
                <el-select v-model="queryParams.useFlag" placeholder="请选择是否启用" clearable>
                    <el-option v-for="dict in isUseFlag" :key="dict.value" :label="dict.label" :value="dict.value" />
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
                <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="single"
                    @click="handleDelete">删除</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="info" plain :disabled="single" icon="el-icon-circle-close" size="mini"
                    @click="clickDisabled">停用</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="warning" plain :disabled="single" icon="el-icon-circle-check" size="mini"
                    @click="clickEnable">启用</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList" :columns="columns"></right-toolbar>
        </el-row>
        <el-table v-loading="loading" :data="dataList" @selection-change="handleSelectionChange">

            <el-table-column fixed="left" type="selection" width="50" align="center" />
            <el-table-column label="序号" align="center" type="index" />
            <el-table-column label="规则名称" align="center" key="name" prop="name" v-if="columns[1].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="规则类型" align="center" key="ruleName" prop="ruleName" v-if="columns[2].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="执行规则类型" width="120" align="center" key="timeName" prop="timeName"
                v-if="columns[3].visible" :show-overflow-tooltip="true" />
            <el-table-column label="执行频率" align="center" key="frequency" prop="frequency" v-if="columns[4].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="执行间隔" align="center" key="intervalV" prop="intervalV" v-if="columns[5].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="是否启用" align="center" prop="useFlag" key="useFlag" v-if="columns[6].visible">
                <template slot-scope="scope">
                    <el-checkbox false-label="0" true-label="1" disabled v-model="scope.row.useFlag"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="开始执行时间" align="center" key="startTime" prop="startTime" width="120"
                v-if="columns[7].visible">
                <template slot-scope="scope">
                    {{ dayjs(scope.row.startTime).format('YYYY-MM-DD HH:mm:ss') }}
                </template>
            </el-table-column>
            <el-table-column label="结束执行时间" align="center" key="endTime" prop="endTime" width="120"
                v-if="columns[8].visible">
                <template slot-scope="scope">
                    {{ dayjs(scope.row.endTime).format('YYYY-MM-DD HH:mm:ss') }}
                </template>
            </el-table-column>
            <el-table-column label="制定人" align="center" key="createUser" prop="createUser" width="120"
                v-if="columns[9].visible" />
            <el-table-column label="制定时间" align="center" key="createTime" prop="createTime" width="120"
                v-if="columns[10].visible">
                <template slot-scope="scope">
                    {{ dayjs(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss') }}
                </template>
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
        <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="120px">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="规则名称:" prop="name">
                            <el-input size="small" v-model="form.name" placeholder="请输入规则名称" maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="规则类型:" prop="ruleType">
                            <el-select size="small" v-model="form.ruleType" placeholder="规则类型">
                                <el-option v-for="(item, index) in ruleTypeList " :key="item.value" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="执行规则类型:" prop="timeType">
                            <el-select size="small" v-model="form.timeType" placeholder="请选择执行规则类型" @change="updateOptions">
                                <el-option v-for="(item, index) in ExecutiveRule  " :key="item.value" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="14">
                        <el-form-item label-width="225px" label="执行频率:" prop="frequency">
                            <el-input size="small" type="number" style="width: 80px;" v-model="form.frequency">
                            </el-input>
                            <el-input size="small" disabled style="width: 130px;" placeholder="次/每">
                                <template slot="append">{{ unit }}</template>
                            </el-input>
                        </el-form-item>
                        <!-- <el-form-item label-width="0" prop="executionRulesID">
                            <el-select :disabled="!form.executionRulesID" v-model="form.executionRulesID2"
                                placeholder="请先选择执行规则类型">
                                <el-option v-for="(item, index) in childOption  " :key="index" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item> -->
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="执行间隔:" prop="intervalV">
                            <el-input size="small" v-model="form.intervalV" type="number" max="10000" min="1"
                                placeholder="请输入执行间隔">
                                <template slot="append">{{ unit }}</template>
                            </el-input>
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
                        <el-form-item label="开始时间:" prop="startTime">
                            <el-date-picker v-model="form.startTime" type="datetime" placeholder="开始时间" size="small"
                                style="width: 198px;">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="结束时间:" prop="endTime">
                            <el-date-picker v-model="form.endTime" type="datetime" placeholder="结束时间" size="small"
                                style="width: 198px;">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
    name: "executionRules",
    data() {
        return {
            isBtntrue: false,
            unit: "周",//执行间隔后缀
            ExecutiveRule: [],//执行频率
            ruleTypeList: [

            ],
            // 列信息
            columns: [
                { key: 0, label: `序号`, visible: true },
                { key: 1, label: `规则名称`, visible: true },
                { key: 2, label: `规则类型`, visible: true },
                { key: 3, label: `执行规则类型`, visible: true },
                { key: 4, label: `执行频率`, visible: true },
                { key: 5, label: `执行间隔`, visible: true },
                { key: 6, label: `是否启用`, visible: true },
                { key: 7, label: `开始执行时间`, visible: true },
                { key: 8, label: `结束执行时间`, visible: true },
                { key: 9, label: `制定人`, visible: true },
                { key: 10, label: `制定时间`, visible: true },
            ],
            isUseFlag: [
                { label: '全部', value: ' ' },
                { label: '启用', value: '1' },
                { label: '停用', value: '0' }
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
            open: false,
            dataList: [],
            // 弹出层标题
            title: "",
            // 表单参数
            form: {},
            // 查询参数
            queryParams: {
                "id": undefined,
                "isAsc": "",
                "name": "",
                "orderByColumn": "",
                "pageNum": 1,
                "pageSize": 10,
                "reasonable": true,
                "useFlag": " "
            },
            // 表单校验
            rules: {
                endTime: [
                    { required: true, message: '结束时间', trigger: 'blur' },
                    // 添加其他校验规则
                ],
                frequency: [
                    { required: true, message: '执行频率', trigger: 'blur' },
                    // 添加其他校验规则
                ],
                intervalV: [
                    { required: true, message: '请输入执行间隔', trigger: 'blur' },
                    // 添加其他校验规则
                ],
                name: [
                    { required: true, message: '请选择规则名称', trigger: 'blur' },
                    // 添加其他校验规则
                ],
                ruleType: [
                    { required: true, message: '规则类型', trigger: 'blur' },
                    // 添加其他校验规则
                ],
                startTime: [
                    { required: true, message: '开始时间', trigger: 'blur' },
                    // 添加其他校验规则
                ],
                timeType: [
                    { required: true, message: '请选择执行规则类型', trigger: 'blur' },
                    // 添加其他校验规则
                ],
            },
        };
    },
    computed: {},
    watch: {},
    created() {
        this.getList();
        this.getOther()
    },
    methods: {
        getOther() {
            this.$api.e_ruleTypeList().then(res => {
                this.ruleTypeList = res.data.map(r => {
                    return {
                        label: r.ruleName,
                        value: r.id
                    }
                })
            })
            //执行规则类型
            this.$api.e_timeTypeList().then(res => {
                this.ExecutiveRule = res.data.map(r => {
                    return {
                        label: r.name,
                        value: r.id
                    }
                })
            })
        },
        // 禁用
        clickDisabled() {
            this.$api.e_executeRuleByid({ id: this.ids[0] }).then(response => {
                this.form = response.data;
                this.isBtntrue = true
                this.form.useFlag = "0"
                this.submitForm()
                this.isBtntrue = false

            });

        },
        // 启用
        clickEnable() {
            this.$api.e_executeRuleByid({ id: this.ids[0] }).then(response => {
                this.form = response.data;
                this.isBtntrue = true
                this.form.useFlag = "1"
                this.submitForm()
                this.isBtntrue = false
            });

        },
        updateOptions(e) {
            let unitw = this.ExecutiveRule.find(r => r.value == e).label
            this.unit = unitw
        },
        //传给子组件的控制方法
        handleClose() {
            this.openGS = false;
            this.reset();
        },

        getList() {
            this.loading = true;
            this.$api.e_executeRuleList(this.queryParams).then(res => {
                this.dataList = res.rows.map(r => {
                    return {
                        ...r,
                        useFlag: String(r.useFlag),
                    }
                });
                this.total = res.total;
                this.loading = false;
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
                "name": "",
                "frequency": "1",
                "id": undefined,
                "intervalV": "1",
                "ruleType": "",
                "timeType": "3",
                "useFlag": "1",
                "startTime": new Date(),
                "endTime": new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
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
            this.$api.e_executeRuleByid({ id: userId }).then(response => {
                this.form = response.data;
                this.form.useFlag = String(response.data.useFlag)
                this.open = true;
                this.title = "修改信息";
            });
        },
        /** 提交按钮 */
        submitForm: function () {
            if (this.isBtntrue === true) {
                console.log("sssssss", this.form);
                this.$api.e_executeRuleSaveOrUpdate({
                    "id": this.form.id,
                    "name": this.form.name,
                    "endTime": this.form.endTime,
                    "frequency": this.form.frequency,
                    "intervalV": this.form.intervalV,
                    "ruleType": this.form.ruleType,
                    "startTime": this.form.startTime,
                    "timeType": this.form.timeType,
                    "useFlag": this.form.useFlag,
                }).then(response => {
                    this.$modal.msgSuccess("修改成功");
                    this.getList();
                });
            } else {
                this.$refs["form"].validate(valid => {
                    if (valid) {
                        if (this.form.id != undefined) {
                            this.$api.e_executeRuleSaveOrUpdate({
                                "id": this.form.id,
                                "name": this.form.name,
                                "endTime": this.form.endTime,
                                "frequency": this.form.frequency,
                                "intervalV": this.form.intervalV,
                                "ruleType": this.form.ruleType,
                                "startTime": this.form.startTime,
                                "timeType": this.form.timeType,
                                "useFlag": this.form.useFlag,
                            }).then(response => {
                                this.$modal.msgSuccess("修改成功");
                                this.open = false;
                                this.getList();
                            });
                        } else {
                            this.$api.e_executeRuleSaveOrUpdate(this.form).then(response => {
                                this.$modal.msgSuccess("新增成功");
                                this.open = false;
                                this.getList();
                            });
                        }
                    }
                });
            }

        },
        /** 删除按钮操作 */
        handleDelete(row) {
            const userIds = row.id || this.ids[0];
            this.$modal.confirm('是否确认删除"' + userIds + '"的数据项？').then(() => {
                return this.$api.e_executeRuleDel({ id: userIds });
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => { });
        },

    }
};
</script>
