<template>
    <!-- 罐收付  罐区操作-储罐收付-->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="50px">
            <el-form-item label="日期:" prop="time">
                <div class="block">
                    <el-date-picker style="width:150px" format="yyyy-MM-dd" v-model="queryParams.time" type="datetime"
                        placeholder="选择日期">
                    </el-date-picker>
                </div>
            </el-form-item>
            <el-form-item label="班次:" prop="classes">
                <el-select v-model="queryParams.classes" placeholder="班次" clearable>
                    <el-option v-for="dict in Banci" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="罐区:" prop="tankAreaId">
                <el-select v-model="queryParams.tankAreaId" placeholder="罐区" clearable>
                    <el-option v-for="dict in TankFarm" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="罐:" prop="tankId">
                <el-select v-model="queryParams.tankId" placeholder="罐" clearable>
                    <el-option v-for="dict in Fulltank" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="handleQuery">查询</el-button>
                <el-button type="info" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button type="info" plain size="mini" @click="handleChangTank" :disabled="single">切换罐</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="primary" plain size="mini" @click="handleAdd" :disabled="single">新建</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single"
                    @click="handleUpdate">关闭</el-button>
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
                <el-button type="info" plain icon="el-icon-upload2" size="mini" @click="handleSave">保存</el-button>
            </el-col>
        </el-row>
        <el-table :data="dataList" style="width: 100%;margin-bottom: 20px;" border
            @selection-change="handleSelectionChange">
            <el-table-column fixed="left" type="selection" align="center" />
            <el-table-column fixed="left" width="100" label="罐名称" align="center" key="tankName" prop="tankName" sortable>
            </el-table-column>
            <el-table-column label="检尺时间" width="130" align="center" sortable key="gaugeTime" prop="gaugeTime"
                :show-overflow-tooltip="true" />
            <el-table-column label="检尺类型" align="center" width="100" sortable key="gaugeType" prop="gaugeType"
                :show-overflow-tooltip="true" />
            <el-table-column label="物料" align="center" width="100" sortable key="mtrl" prop="mtrl"
                :show-overflow-tooltip="true" />
            <el-table-column label="别名" align="center" width="100" sortable key="alias" prop="alias"
                :show-overflow-tooltip="true" />
            <el-table-column label="质量状态" width="100" align="center" sortable key="qualityStatus" prop="qualityStatus"
                :show-overflow-tooltip="true" />
            <el-table-column label="罐量" align="center" sortable key="tankVolume" prop="tankVolume" width="80" />
            <el-table-column label="罐高" align="center" sortable key="tankHeight" prop="tankHeight" width="80" />
            <el-table-column label="油温" align="center" sortable key="oilTemperature" prop="oilTemperature" width="80" />
            <el-table-column label="密度" align="center" sortable prop="density" key="density" width="80">
            </el-table-column>
            <el-table-column label="大气温度" align="center" sortable key="atmosphericTemperature" prop="atmosphericTemperature"
                width="120" />
            <el-table-column label="气象密度" align="center" sortable key="meteorologicalDensity" prop="meteorologicalDensity"
                width="120" />
            <el-table-column label="气象体积" align="center" sortable key="meteorologicalVolume" prop="meteorologicalVolume"
                width="120" />
            <el-table-column label="气象质量" align="center" sortable key="meteorologicalQuality" prop="meteorologicalQuality"
                width="120" />
            <el-table-column label="气象温度" align="center" sortable key="meteorologicalTemperature"
                prop="meteorologicalTemperature" width="120" />
            <el-table-column label="液体质量" align="center" sortable key="liquidQuality" prop="liquidQuality" width="120" />
            <el-table-column label="含水量" align="center" sortable key="waterContent" prop="waterContent" width="100" />
            <el-table-column label="毛计量体积" align="center" sortable key="grossVolume" prop="grossVolume" width="120" />
            <el-table-column label="收付" align="center" sortable key="paymentMethod" prop="paymentMethod" width="120" />
            <el-table-column fixed="right" label="提交状态" align="center" sortable key="status" prop="status" width="120" />
        </el-table>
        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
            @pagination="getList" />
        <!-- 新建弹窗 -->
        <el-dialog :title="title" :visible.sync="open" width="830px" append-to-body show-close>
            <el-form ref="form" :model="form" :rules="rules" label-width="110px">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="操作类型:" prop="unitNum">
                            <el-select v-model="form.unitTypeId" placeholder="类型">
                                <el-option v-for="(item, index) in zzType" :key="index" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="使用拓扑结构:" prop="useFlag">
                            <el-checkbox v-model="form.useFlag" false-label="0" true-label="1"></el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="本方节点:" prop="unitNum">
                            <el-select v-model="form.unitTypeId" placeholder="本方节点">
                                <el-option v-for="(item, index) in zzType" :key="index" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="对方节点:" prop="unitNum">
                            <el-select v-model="form.unitTypeId" placeholder="对方节点">
                                <el-option v-for="(item, index) in zzType" :key="index" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="本方物料:" prop="unitNum">
                            <el-select v-model="form.unitTypeId" placeholder="本方物料">
                                <el-option v-for="(item, index) in zzType" :key="index" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="对方物料:" prop="unitNum">
                            <el-select v-model="form.unitTypeId" placeholder="对方物料">
                                <el-option v-for="(item, index) in zzType" :key="index" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-button size="mini" style="line-height: 21px;">组分</el-button>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="本方别名:" prop="unitNum">
                            <el-select v-model="form.unitTypeId" placeholder="本方别名">
                                <el-option v-for="(item, index) in zzType" :key="index" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="对方别名:" prop="unitNum">
                            <el-select v-model="form.unitTypeId" placeholder="对方别名">
                                <el-option v-for="(item, index) in zzType" :key="index" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="开始时间:" prop="capacity">
                            <el-date-picker v-model="queryParams.dateRange" type="datetime" placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="结束时间:">
                            <el-date-picker v-model="queryParams.dateRange" type="datetime" placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="创建时间:" prop="capacity">
                            <el-date-picker v-model="queryParams.dateRange" type="datetime" placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="关闭时间:">
                            <el-date-picker v-model="queryParams.dateRange" type="datetime" placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="创建人:" prop="capacity">
                            <el-select v-model="form.unitTypeId" placeholder="本方别名">
                                <el-option v-for="(item, index) in zzType" :key="index" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="关闭人:">
                            <el-select v-model="form.unitTypeId" placeholder="本方别名">
                                <el-option v-for="(item, index) in zzType" :key="index" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="" prop="capacity" label-width="35px">
                            <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
                                <el-button slot="prepend" size="mini">本方量</el-button>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="height: 10px;">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="" prop="capacity" label-width="35px">
                            <el-input placeholder="请输入内容" v-model="input4" class="input-with-select">
                                <el-button slot="prepend" size="mini">对方量</el-button>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 控制切换罐页面 -->
        <el-dialog :title="TitleChangeoverTank" :visible.sync="OpenChangeoverTank" width="1100px" append-to-body>
            <el-card style="border: 1px solid #ccc;">
                <div>
                    <div style="float: left;">切换罐</div>
                    <div style="float: right; display: flex;">
                        <div>罐源:{{ "G003" }}</div>
                        <div>|</div>
                        <div>班次时间:{{ "夜班|20:00:00-08:00:00 " }}</div>
                    </div>
                </div>
            </el-card>
            <el-card>
                <el-form :model="queryParams" ref="queryForm" size="small" :inline="true">
                    <el-form-item label="日期:" prop="dateRange" label-width="50px">
                        <div class="block">
                            <el-date-picker size="mini" v-model="queryParams.dateRange" type="date" placeholder="选择日期"
                                style="width: 150px;">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                    <el-form-item label="目的罐区:" prop="tctankFarm" label-width="80px">
                        <el-select v-model="queryParams.tankFarm" multiple filterable allow-create default-first-option
                            placeholder="目的罐区" style="width: 150px;">
                            <el-option v-for="item in TankFarm" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="目的罐:" prop="fulltank" label-width="80px">
                        <el-select v-model="queryParams.fulltank" multiple filterable allow-create default-first-option
                            placeholder="目的罐" style="width: 150px;">
                            <el-option v-for="item in Fulltank" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="" prop="useFlag">
                        <el-checkbox v-model="form.useFlag" false-label="0" true-label="1">是否使用拓扑模型</el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="mini" @click="TankhandleQuery">查询</el-button>
                        <el-button type="info" size="mini" @click="cupPing">切罐</el-button>
                        <el-button type="danger" size="mini" @click="UncupPing">取消切罐</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
            <el-card>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <div>源罐收付信息</div>
                        <el-table :data="dataListTC" style="width: 100%;margin-bottom: 20px;" border
                            @selection-change="handleSelectionChange">
                            <el-table-column fixed="left" type="selection" align="center" />
                            <el-table-column fixed="left" width="100" label="罐名称" align="center" key="State" prop="State"
                                sortable>
                            </el-table-column>
                            <el-table-column label="检尺时间" width="130" align="center" sortable key="NodeAlias"
                                prop="NodeAlias" :show-overflow-tooltip="true" />
                            <el-table-column label="检尺类型" align="center" width="100" sortable key="MtrlAlias"
                                prop="MtrlAlias" :show-overflow-tooltip="true" />
                            <el-table-column label="物料" align="center" width="100" sortable key="FormulaData"
                                prop="FormulaData" :show-overflow-tooltip="true" />
                            <el-table-column label="别名" align="center" width="100" sortable key="FormulaData"
                                prop="FormulaData" :show-overflow-tooltip="true" />
                            <el-table-column label="质量状态" width="100" align="center" sortable key="GaugeCcData"
                                prop="GaugeCcData" :show-overflow-tooltip="true" />
                            <el-table-column label="罐量" align="center" sortable key="GaugeTranData" prop="GaugeTranData"
                                width="80" />
                            <el-table-column label="罐高" align="center" sortable key="SideLineData" prop="SideLineData"
                                width="80" />
                            <el-table-column label="油温" align="center" sortable key="InstrData" prop="InstrData"
                                width="80" />
                            <el-table-column fixed="right" label="密度" align="center" sortable prop="RawData" key="RawData"
                                width="80">
                            </el-table-column>
                        </el-table>
                    </el-col>
                    <el-col :span="12">
                        <div>目的罐收付信息</div>
                        <el-table :data="dataListTC" style="width: 100%;margin-bottom: 20px;" border
                            @selection-change="handleSelectionChange">
                            <el-table-column fixed="left" type="selection" align="center" />
                            <el-table-column fixed="left" width="100" label="罐名称" align="center" key="State" prop="State"
                                sortable>
                            </el-table-column>
                            <el-table-column label="检尺时间" width="130" align="center" sortable key="NodeAlias"
                                prop="NodeAlias" :show-overflow-tooltip="true" />
                            <el-table-column label="检尺类型" align="center" width="100" sortable key="MtrlAlias"
                                prop="MtrlAlias" :show-overflow-tooltip="true" />
                            <el-table-column label="物料" align="center" width="100" sortable key="FormulaData"
                                prop="FormulaData" :show-overflow-tooltip="true" />
                            <el-table-column label="别名" align="center" width="100" sortable key="FormulaData"
                                prop="FormulaData" :show-overflow-tooltip="true" />
                            <el-table-column label="质量状态" width="100" align="center" sortable key="GaugeCcData"
                                prop="GaugeCcData" :show-overflow-tooltip="true" />
                            <el-table-column label="罐量" align="center" sortable key="GaugeTranData" prop="GaugeTranData"
                                width="80" />
                            <el-table-column label="罐高" align="center" sortable key="SideLineData" prop="SideLineData"
                                width="80" />
                            <el-table-column fixed="right" label="油温" align="center" sortable key="InstrData"
                                prop="InstrData" width="80" />
                        </el-table>
                    </el-col>
                </el-row>
                <el-row>
                    <div>源罐切换罐历史记录</div>
                    <el-table :data="dataListTC" style="width: 100%;margin-bottom: 20px;" border
                        @selection-change="handleSelectionChange">
                        <el-table-column fixed="left" type="selection" align="center" />
                        <el-table-column fixed="left" width="100" label="罐名称" align="center" key="State" prop="State"
                            sortable>
                        </el-table-column>
                        <el-table-column label="检尺时间" width="130" align="center" sortable key="NodeAlias" prop="NodeAlias"
                            :show-overflow-tooltip="true" />
                        <el-table-column label="检尺类型" align="center" width="100" sortable key="MtrlAlias" prop="MtrlAlias"
                            :show-overflow-tooltip="true" />
                        <el-table-column label="物料" align="center" width="100" sortable key="FormulaData" prop="FormulaData"
                            :show-overflow-tooltip="true" />
                        <el-table-column label="别名" align="center" width="100" sortable key="FormulaData" prop="FormulaData"
                            :show-overflow-tooltip="true" />
                        <el-table-column label="质量状态" width="100" align="center" sortable key="GaugeCcData"
                            prop="GaugeCcData" :show-overflow-tooltip="true" />
                        <el-table-column label="罐量" align="center" sortable key="GaugeTranData" prop="GaugeTranData"
                            width="80" />
                        <el-table-column label="罐高" align="center" sortable key="SideLineData" prop="SideLineData"
                            width="80" />
                        <el-table-column label="油温" align="center" sortable key="InstrData" prop="InstrData" width="80" />
                        <el-table-column fixed="right" label="密度" align="center" sortable prop="RawData" key="RawData"
                            width="80">
                        </el-table-column>
                    </el-table>
                </el-row>
            </el-card>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: "equipmentI",
    components: {},
    data() {
        return {
            input3: "",
            input4: "",
            TitleChangeoverTank: "",
            open: false,
            OpenChangeoverTank: false, //控制切换罐页面
            TankFarm: [],//获取全部罐区
            Fulltank: [],//获取全部罐
            dataList: [],
            dataListTC: [],
            Banci: [{
                label: "白班|08:00:00-20:00:00",
                value: "0"
            }, {
                label: "夜班|20:00:00-08:00:00",
                value: "1"
            }],
            // 遮罩层
            loading: true,
            // 选中数组
            ids: [],
            // 非单个禁用
            single: true,
            // 非多个禁用
            multiple: true,
            // 总条数
            total: 0,
            // 弹出层标题
            title: "",
            // 表单参数
            form: {},
            // 查询参数
            queryParams: {
                "classes": "0",
                "tankAreaId": "",
                "tankId": "1",
                "time": new Date()
            },
            // 表单校验
            rules: {},
        };
    },
    watch: {},
    created() {
        this.getList();
        this.getOther();
    },
    mounted() {
    },
    methods: {
        handleSave() {
            this.$message.success("保存成功")
        },
        //切换罐弹窗查询
        TankhandleQuery() {
            this.$message.success("查询")
        },
        //弹窗切罐
        cupPing() {
            this.$message.success("切罐")
        },
        UncupPing() {
            this.$message.success("取消切罐")
        },
        // close() {
        //     this.$emit('update:visible', false)
        // },
        /** 查询用户列表 */
        getList() {
            this.loading = true;
            this.$api.i_tankPaymentSelece(this.queryParams).then(res => {
                this.dataList = res.rows  //RecId
                this.total = res.total
                this.loading = false;
            }
            );
        },
        getOther() {
            //获取全部罐区
            this.$api.i_tankAreaAll().then(res => {
                // 添加 "全部" 选项
                const allOption = { label: '请选择...', value: ' ' };
                // 将 "全部" 选项添加到数组的开头
                this.TankFarm = [allOption, ...res.data.map(e => ({
                    label: e.name,
                    value: e.id
                }))];
                this.queryParams.tankAreaId = this.TankFarm[0].value
            })
            //获取全部罐
            this.$api.i_tankAllList({
                "tankAreaId": ""
            }).then(res => {
                // 添加 "全部" 选项
                const allOption = { label: '请选择...', value: " " };
                // 将 "全部" 选项添加到数组的开头
                this.Fulltank = [allOption, ...res.data.map(e => ({
                    label: e.name,
                    value: e.id
                }))];
                this.queryParams.tankId = this.Fulltank[0].value
            })
        },
        // 取消按钮
        cancel() {
            this.open = false;
            this.reset();
        },
        close() {
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
        //切换罐
        handleChangTank() {
            if (this.ids.length < 1) {
                this.$message.error("请选择一条数据!")
            } else {
                this.OpenChangeoverTank = true
                this.TitleChangeoverTank = "切换罐"
            }
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
            this.title = "物料移动-收付信息录入";
        },
        /** 修改按钮操作 */
        handleUpdate(row) {
            this.reset();
            const userId = row.id || this.ids[0];
            this.$api.i_unitById({ id: userId }).then(response => {
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
                        this.$api.i_tankPaymentAdd({
                            "mainId": this.ids[0]
                        }).then(response => {
                            this.$modal.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        this.$api.i_tankPaymentAdd({
                            "mainId": this.ids[0]
                        }).then(response => {
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
                return this.$api.i_tankPaymentDelete({ id: userIds });
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => { });
        },
    }
};
</script>
<style lang="scss" scoped>
::v-deep .el-dialog__body {
    padding: 0;
}
</style>
