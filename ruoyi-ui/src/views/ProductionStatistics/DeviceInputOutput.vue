<template>
    <!-- 装置投入产出-生产统计 -->
    <div class="app-container">
        <el-card>
            <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="100px">
                <div>
                    <el-form-item label="开始时间:" style="margin-left: -20px;" prop="strTime">
                        <el-date-picker size="mini" format="yyyy-MM-dd" v-model="queryParams.strTime" type="datetime"
                            placeholder="开始时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束时间:" style="margin-left: -20px;" prop="endTime">
                        <el-date-picker size="mini" format="yyyy-MM-dd" v-model="queryParams.endTime" type="datetime"
                            placeholder="结束时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="装置:" style="margin-left: -20px;" prop="unitId">
                        <el-select size="mini" v-model="queryParams.unitId" placeholder="装置" clearable>
                            <el-option v-for="dict in unitListall" :key="dict.value" :label="dict.label"
                                :value="dict.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" plain size="mini" @click="handleQuery">查询</el-button>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="数据类型:" style="margin-left: -20px;" prop="dataType">
                        <el-select size="mini" v-model="queryParams.dataType" placeholder="数据类型" clearable>
                            <el-option v-for="dict in dataType" :key="dict.value" :label="dict.label" :value="dict.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="移动类型:" prop="moveType">
                        <el-select size="mini" v-model="queryParams.moveType" placeholder="移动类型" clearable>
                            <el-option v-for="dict in moveTypeList" :key="dict.value" :label="dict.label"
                                :value="dict.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="" prop="">
                        <el-checkbox v-model="checked">迁移所有</el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="info" plain size="mini" @click="handleTransfer">迁移</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="info" plain size="mini" @click="handleMerger">归并</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="info" plain size="mini" @click="handleRemark">备注</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </el-card>
        <el-card>
            <fieldset>
                <legend>
                    <el-checkbox v-model="checked1">封账信息</el-checkbox>
                </legend>
                <el-form v-show="checked1" ref="form" :model="form" label-width="130px">
                    <el-row :gutter="10" style="height: 50px;">
                    </el-row>
                </el-form>
            </fieldset>
        </el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="侧线投入产出" name="first">
                <el-table border v-loading="loading" :data="unitInputOtputSideinputOtputFind"
                    @selection-change="handleSelectionChange">
                    <el-table-column fixed="left" type="selection" width="50" align="center" />
                    <el-table-column fixed="left" type="index" width="50" align="center" />
                    <el-table-column label="物料名称" align="center" key="mtrl" prop="mtrl">
                    </el-table-column>
                    <el-table-column label="类型" sortable align="center" key="dataType" prop="dataType"
                        :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            {{ scope.row.dataType == 1 ? "原始值" : scope.row.dataType == 2 ? "确认值" : scope.row.dataType == 3 ?
                                "平衡值" : "平衡确认值" }}
                        </template>
                    </el-table-column>
                    <el-table-column label="校正确认量" sortable align="center" key="correctedConfirmationAmount"
                        prop="correctedConfirmationAmount" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column label="原始值" sortable align="center" key="originalAmount" prop="originalAmount"
                        :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column label="收率%" sortable align="center" key="originalAmountYield"
                        prop="originalAmountYield" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column label="确认值" sortable align="center" key="confirmedValue" prop="confirmedValue"
                        :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column label="收率%" sortable align="center" key="confirmedValueYield"
                        prop="confirmedValueYield" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column label="平均值" sortable align="center" key="balancedValue" prop="balancedValue"
                        :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column label="收率%" sortable align="center" key="balancedValueYield" prop="balancedValueYield"
                        :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column label="平衡确认值" sortable align="center" key="balancedConfirmedValue"
                        prop="balancedConfirmedValue" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column label="收率%" sortable align="center" key="balancedConfirmedValueYield"
                        prop="balancedConfirmedValueYield" :show-overflow-tooltip="true">
                    </el-table-column>
                </el-table>
                <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                    :limit.sync="queryParams.pageSize" @pagination="getList" />
            </el-tab-pane>
            <el-tab-pane label="指标" name="second">
                <el-table border v-loading="loading" :data="unitInputOtputIndicatorFind"
                    @selection-change="handleSelectionChange">
                    <el-table-column fixed="left" type="selection" width="50" align="center" />
                    <el-table-column label="指标" align="center" key="indicator" prop="indicator">
                    </el-table-column>
                    <el-table-column label="原始值" sortable align="center" key="initialValue" prop="initialValue"
                        :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column label="确认值" sortable align="center" key="confirmedValue" prop="confirmedValue"
                        :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column label="平衡值" sortable align="center" key="balancedValue" prop="balancedValue"
                        :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column label="平衡确认值" sortable align="center" key="balancedConfirmedValue"
                        prop="balancedConfirmedValue" :show-overflow-tooltip="true">
                    </el-table-column>
                </el-table>
                <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                    :limit.sync="queryParams.pageSize" @pagination="getList" />
            </el-tab-pane>
            <el-tab-pane label="指标组态" name="three">
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd">添加</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="singleEdit"
                            @click="handleEdit">编辑</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="singleEdit"
                            @click="handleDelete">删除</el-button>
                    </el-col>
                </el-row>
                <el-table border v-loading="loading" :data="unitInputOtputIndicatorConfigurationList"
                    @selection-change="handleSelectionChangeEdit">
                    <el-table-column fixed="left" type="selection" width="50" align="center" />
                    <el-table-column label="指标名称" align="center" key="name" prop="name">
                    </el-table-column>
                    <el-table-column label="公式" sortable align="center" key="formula" prop="formula"
                        :show-overflow-tooltip="true">
                    </el-table-column>
                </el-table>
                <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                    :limit.sync="queryParams.pageSize" @pagination="getList" />
            </el-tab-pane>
        </el-tabs>
        <el-dialog :title="title" :visible.sync="open" width="800px">
            <el-form ref="form" :model="form" :rules="DiaFormRules" label-width="90px">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="名称:" prop="name">
                            <el-input v-model="form.name" placeholder="请输入名称" maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="公式:" prop="formula">
                            <el-row type="flex" justify="space-around">
                                <el-col :span="10">
                                    <el-input ref="textInput" @keydown="handleKeyDown" v-model="form.formula"
                                        :autosize="{ minRows: 16, maxRows: 16 }" type="textarea"
                                        placeholder="请输入函数"></el-input>
                                </el-col>
                                <el-col :span="4">
                                    <div class="buttons flex flex-direction align-center justify-around">
                                        <el-button class="el-botton" @click="calculate(0)">+</el-button>
                                        <el-button class="el-botton" @click="calculate(1)">-</el-button>
                                        <el-button class="el-botton" @click="calculate(2)">*</el-button>
                                        <el-button class="el-botton" @click="calculate(3)">/</el-button>
                                    </div>
                                </el-col>
                                <el-col :span="10">
                                    <!-- <el-table height="300" ref="multipleTable" :data="lineData" style="width: 300px;"
                                        :show-header="false" @select="handleSelectionClick" @row-click="handleRowClick">
                                        <el-table-column type="selection"></el-table-column>
                                        <el-table-column prop="label"></el-table-column>
                                    </el-table> -->
                                    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true"
                                        label-width="50px">
                                        <el-form-item label="函数:" prop="factory" style="margin-top: 25px;">
                                            <el-select style="width: 150px;height: 70px;" v-model="queryParams.factory"
                                                placeholder="函数" clearable>
                                                <el-option v-for="dict in FactoryList" :key="dict.value" :label="dict.label"
                                                    :value="dict.value" />
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="物料:" prop="materiel">
                                            <el-select style="width: 150px;height: 70px;" v-model="queryParams.materiel"
                                                placeholder="物料" clearable>
                                                <el-option v-for="dict in FactoryList" :key="dict.value" :label="dict.label"
                                                    :value="dict.value" />
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="移动:" prop="Move">
                                            <el-select style="width: 150px;height: 65px;" v-model="queryParams.Move"
                                                placeholder="移动" clearable>
                                                <el-option v-for="dict in FactoryList" :key="dict.value" :label="dict.label"
                                                    :value="dict.value" />
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="产耗:" prop="consumption">
                                            <el-select style="width: 150px;" v-model="queryParams.consumption"
                                                placeholder="产耗" clearable>
                                                <el-option v-for="dict in FactoryList" :key="dict.value" :label="dict.label"
                                                    :value="dict.value" />
                                            </el-select>
                                        </el-form-item>
                                    </el-form>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">保 存</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>
        <!-- //备注 -->
        <el-dialog :title="titleRemark" :visible.sync="openRemark" width="800px">
            <el-input type="textarea" placeholder="请输入内容" v-model="textarea" maxlength="30" show-word-limit>
            </el-input>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleopenRemark">保 存</el-button>
            </div>
        </el-dialog>
        <!-- 归并 -->
        <el-dialog :title="titleMerger" :visible.sync="openMerger" width="100%">
            <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="100px">
                <div>
                    <el-form-item label="时间:" style="margin-left: -20px;" prop="strTime">
                        <el-date-picker size="mini" v-model="queryParams.strTime" type="date" placeholder="开始时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="未提交:" style="margin-left: -20px;" prop="endTime">
                        <el-select size="mini" v-model="queryParams.unitId" placeholder="未提交" clearable>
                            <el-option v-for="dict in unitListall" :key="dict.value" :label="dict.label"
                                :value="dict.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="精度:" style="margin-left: -20px;" prop="unitId">
                        <el-select size="mini" v-model="queryParams.unitId" placeholder="精度" clearable>
                            <el-option v-for="dict in unitListall" :key="dict.value" :label="dict.label"
                                :value="dict.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" plain size="mini" @click="handlestratMerger">开始归并</el-button>
                        <el-button type="primary" plain size="mini" @click="handleinputMove">导入模型</el-button>
                    </el-form-item>
                </div>
            </el-form>
            <el-table border v-loading="loading" :data="unitInputOtputSideinputOtputFind"
                @selection-change="handleSelectionChange">
                <el-table-column fixed="left" type="selection" width="50" align="center" />
                <el-table-column fixed="left" type="index" width="50" align="center" />
                <el-table-column label="来源" align="center" key="source" prop="source">
                </el-table-column>
                <el-table-column label="来源物料" align="center" key="sourcematerial" prop="sourcematerial"
                    :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="等级" align="center" key="lvel" prop="lvel" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="目的" align="center" key="aim" prop="aim" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="目的物料" align="center" key="aimMaterial" prop="aimMaterial"
                    :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="等级" align="center" key="aimlvel" prop="aimlvel" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="消耗" align="center" key="expend" prop="expend" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="数量" align="center" key="quantity" prop="quantity" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="精度" align="center" key="precision" prop="precision" :show-overflow-tooltip="true">
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: "DeviceInputOutput",
    data() {
        return {
            unitInputOtputIndicatorConfigurationList: [],//指标组态
            unitInputOtputSideinputOtputFind: [], //侧线投入产出查询
            unitListall: [],//装置
            unitInputOtputIndicatorFind: [],//侧线投入产出模型
            textarea: "",
            merger: "",
            dataType: [
                {
                    label: '原始值',
                    value: '0'
                },
                {
                    label: '确认值',
                    value: '1'
                },
                {
                    label: '平衡值',
                    value: '2'
                },
                {
                    label: '平衡确认值',
                    value: '3'
                },
            ],
            moveTypeList: [
                {
                    label: '原始值-->确认值 ',
                    value: '0'
                },
                {
                    label: '确认值-->平衡值',
                    value: '1'
                },
                {
                    label: '平衡值-->平衡确认值',
                    value: '2'
                },
            ],
            checked: false,
            lineData: [],
            isSelected: false,
            checked1: false,
            activeName: 'first',
            titleRemark: "",
            titleMerger: "",
            open: false,
            openRemark: false,
            openMerger: false,
            // 遮罩层
            loading: false,
            // 选中数组
            ids: [],
            // 非单个禁用
            single: true,
            // 非多个禁用
            multiple: true,
            // 总条数
            total: 0,
            idsEdit: [],
            singleEdit: true,
            multipleEdit: true,
            // 弹出层标题
            title: "",
            // 表单参数
            form: {
                formula: ""
            },
            FactoryList: [],//mes工厂
            // 查询参数
            queryParams: {
                "dataType": "1",
                "endTime": new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
                "moveType": "1",
                "strTime": new Date(),
                "unitId": "1734113975915773952",
                "materiel": "",
                "factory": "",
                "Move": "",
                "consumption": ""
            },
            iseditdata: [],
            DiaFormRules: {
                name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
            },
        };
    },
    watch: {
        'selectedRow'(newVal) {
            this.isSelected = newVal != null ? true : false
        }
    },
    created() {
        this.getList();
        this.getOther()
        this.queryParams.dataType = this.dataType[0].value
        this.queryParams.moveType = this.moveTypeList[0].value
    },
    methods: {
        handleopenRemark() {
            this.openRemark = false
            this.$message.success("备注信息添加成功")
        },
        handlestratMerger() {
            this.$message.success('开始合并')
        },
        handleinputMove() {
            this.$confirm('请选择候选模型数据！', '提示', {
                confirmButtonText: '确定',
                // cancelButtonText: '取消',
                type: 'warning'
            })
        },
        handleAdd() {
            this.title = '创建指标组态信息'
            this.open = true
            this.$nextTick(() => {
                this.$refs.form.clearValidate()
            })
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        getOther() {
            //装置
            this.$api.i_unitListall({
                "unitName": ""
            }).then(res => {
                this.unitListall = res.data.map(r => {
                    return {
                        label: r.unitName,
                        value: r.id
                    }
                })
                this.queryParams.unitId = this.unitListall[0].value
            })
            //装置下的 侧线公式
            this.$api.InitSideName().then(res => {
                let beforeData = [
                    {
                        label: '进侧线总和',
                        value: `INSTREAM()`
                    },
                    {
                        label: '出侧线总和',
                        value: `OUTSTREAM()`
                    },
                    {
                        label: '消耗线总和',
                        value: `CONSPSTREAM()`
                    }
                ]
                let lineData = res.data.map(e => {
                    return {
                        label: e.SideLineAlias,
                        value: `STREAM(${e.SideLineAlias})`
                    }
                })
                this.lineData = beforeData.concat(lineData)
            })
            //工厂下拉列表
            this.$api.i_MESFactoryAllList().then(res => {
                this.FactoryList = res.data.map(e => {
                    return {
                        label: e.mesFctrName,
                        value: e.mesFctrId
                    }
                })
            })
        },
        /** 查询用户列表 */
        getList() {
            //侧线投入产出查询
            this.$api.P_unitInputOtputSideinputOtputFind({
                "dataType": this.queryParams.dataType,
                "endTime": JSON.stringify(new Date(this.queryParams.endTime)).slice(1, 11),
                "moveType": this.queryParams.moveType,
                "strTime": JSON.stringify(new Date(this.queryParams.strTime)).slice(1, 11),
                "unitId": this.queryParams.unitId,
            }).then(res => {
                this.unitInputOtputSideinputOtputFind = res.data
            })
            //指标-列表
            this.$api.P_unitInputOtputIndicatorFind().then(res => {
                this.unitInputOtputIndicatorFind = res.data
            })
            //指标组态-列表
            this.$api.P_unitInputOtputIndicatorConfigurationList().then(res => {
                this.unitInputOtputIndicatorConfigurationList = res.rows
            })
        },
        //弹窗 取消
        cancel() {
            this.form = {
                formula: ""
            }
            this.open = false
        },
        handleKeyDown(event) {
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                event.preventDefault(); // 阻止光标移动事件默认行为
            }
        },
        calculate(e) {
            const input = this.$refs.textInput.$refs.textarea;
            const startPos = input.selectionStart;
            const endPos = input.selectionEnd;
            const beforeText = this.form.formula.substring(0, startPos);
            const afterText = this.form.formula.substring(endPos);
            this.form.formula = beforeText + this.getCharacterForIndex(e) + afterText;
            // Update Vue's reactivity
            this.$forceUpdate();
            // Focus and move cursor
            this.$nextTick(() => {
                input.focus();
                input.setSelectionRange(startPos + 1, startPos + 1);
            });
        },
        getCharacterForIndex(index) {
            switch (index) {
                case 0:
                    return "+";
                case 1:
                    return "-";
                case 2:
                    return '*';
                case 3:
                    return "/";
                default:
                    return "";
            }
        },
        //弹窗 确定
        submitForm: function () {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.form.id != undefined) {
                        this.$api.P_unitInputOtputIndicatorConfigurationSaveOrUpdate({
                            "formula": this.form.formula,
                            "id": this.form.id,
                            "name": this.form.name,
                        }).then(response => {
                            this.$modal.msgSuccess("修改成功");
                            this.getList();
                            this.open = false;
                        });
                    } else {
                        this.$api.P_unitInputOtputIndicatorConfigurationSaveOrUpdate({
                            "formula": this.form.formula,
                            "id": this.form.id,
                            "name": this.form.name,
                        }).then(response => {
                            this.$modal.msgSuccess("新增成功");
                            this.getList();
                            this.open = false;
                        });
                    }
                }
            });
        },
        handleRowClick(row) {
            console.log('handleRowClick row', row)
            if (this.selectedRow === row) {
                this.selectedRow = null
                this.$refs.multipleTable.clearSelection();
            } else {
                this.selectedRow = row
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(row);
            }
        },
        handleSelectionClick(selection, row) {
            console.log('handleSelectionClick row', selection, row)
            if (this.selectedRow === row) {
                this.selectedRow = null
                this.$refs.multipleTable.clearSelection();
            } else {
                this.selectedRow = row
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(row);
            }
        },
        // 表单重置
        reset() {
            this.form = {
                "formula": "",
                "id": undefined,
                "name": "",
            };
            this.resetForm("form");
        },
        //备注
        handleRemark() {
            this.openRemark = true
            this.titleRemark = "备注信息"
        },
        //归并
        handleMerger() {
            this.openMerger = true
            this.titleMerger = "归并操作"

        },
        //迁移
        handleTransfer() {
            this.$confirm('确定要进行数据迁移吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message.success('迁移成功');
                this.ids = [];
            }).catch(() => {
                this.$message.info('已取消迁移');
            });
        },
        /** 搜索按钮操作 */
        handleQuery() {
            this.queryParams.pageNum = 1;
            this.getList();
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.$refs['queryForm'].resetFields();
            console.log()
            this.queryParams = {
                ...this.queryParams,
                ...{
                    id: '',
                    tankName: ''
                }
            }
            this.handleQuery();
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.id);
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        },
        handleSelectionChangeEdit(selection) {
            this.idsEdit = selection.map(item => item.id);
            this.singleEdit = selection.length != 1;
            this.multipleEdit = !selection.length;
        },
        //编辑
        handleEdit() {
            this.open = true
            let uids = this.idsEdit[0];
            let AccessoriesList = this.unitInputOtputIndicatorConfigurationList.filter(e => e.id == uids)[0]
            this.form = {
                "formula": AccessoriesList.formula,
                "id": AccessoriesList.id,
                "name": AccessoriesList.name,
            }
            console.log("筛选数据", AccessoriesList);
            this.getList()
        },
        /** 删除按钮操作 */
        handleDelete(row) {
            const userIds = row.id || this.idsEdit[0];
            this.$modal.confirm('是否确认删除"' + userIds + '"的数据项？').then(() => {
                this.$api.P_unitInputOtputIndicatorConfigurationDelete({ id: userIds })
            }).then(() => {
                this.$nextTick(() => {
                    this.getList();
                });
                this.$modal.msgSuccess("删除成功");

            }).catch(() => { });
        },
    }
};
</script>
<style lang="scss" scoped>
::v-deep .el-card__body {
    padding: 10px 10px 10px 10px !important;
}

.selectedtop {
    background-color: rgb(175, 175, 175);
    color: white;
}

.app-container {
    width: 100%;
    height: calc(100vh - 90px);
    min-height: calc(100vh - 90px);
    overflow-y: auto;
}

.buttons {
    height: 100%;

    .el-botton {
        width: 60px;
        color: black;
        font-size: 24px;
        font-weight: bold;
        text-align: justify;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .el-button+.el-button {
        margin-left: 0;
    }
}

::v-deep .el-dialog__footer {
    text-align: center;
}
</style>
