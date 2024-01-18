<template>
    <!-- 化验分析-->
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
                <el-button type="primary" plain size="mini" @click="handleAdd" :disabled="single">新建</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="single"
                    @click="handleDelete">删除</el-button>
            </el-col>
        </el-row>
        <el-table :data="dataListTC" style="width: 100%;margin-bottom: 20px;" border
            @selection-change="handleSelectionChange">
            <el-table-column fixed="left" type="selection" align="center" />
            <el-table-column fixed="left" width="100" label="罐名称" align="center" key="tankNum" prop="tankNum" sortable>
            </el-table-column>
            <el-table-column label="检尺时间" width="130" align="center" sortable key="gaugeTime" prop="gaugeTime"
                :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    {{ dayjs(scope.row.gaugeTime).format('YYYY-MM-DD HH:mm:ss') }}
                </template>
            </el-table-column>
            <el-table-column label="检尺类型" align="center" width="100" sortable key="gaugeType" prop="gaugeType"
                :show-overflow-tooltip="true" />
            <el-table-column label="物料" align="center" width="100" sortable key="material" prop="material"
                :show-overflow-tooltip="true" />
            <el-table-column label="别名" align="center" width="100" sortable key="alias" prop="alias"
                :show-overflow-tooltip="true" />
            <el-table-column label="质量状态" width="100" align="center" sortable key="qualityStatus" prop="qualityStatus"
                :show-overflow-tooltip="true" />
            <el-table-column label="罐量" align="center" sortable key="tankVolume" prop="tankVolume" width="80" />
            <el-table-column label="罐高" align="center" sortable key="tankHeight" prop="tankHeight" width="80" />
            <el-table-column label="油温" align="center" sortable key="oilTemperature" prop="oilTemperature" width="80" />
            <el-table-column label="大气温度" align="center" sortable key="atmosphericTemperature" prop="atmosphericTemperature"
                width="120" />
            <el-table-column label="密度" align="center" sortable prop="density" key="density" width="80">
            </el-table-column>
            <el-table-column label="气相密度" align="center" sortable key="gasphasedensity" prop="gasphasedensity"
                width="120" />
            <el-table-column label="气相体积" align="center" sortable key="gasphasevolume" prop="gasphasevolume" width="120" />
            <el-table-column label="气相质量" align="center" sortable key="gasphasequality" prop="gasphasequality"
                width="120" />
            <el-table-column label="气相温度" align="center" sortable key="gasphasetemperature" prop="gasphasetemperature"
                width="120" />
            <el-table-column label="液体质量" align="center" sortable key="liquidquality" prop="liquidquality" width="120" />
            <el-table-column label="含水量" align="center" sortable key="watercontent" prop="watercontent" width="100" />
            <el-table-column label="毛计量体积" align="center" sortable key="grossweightvolume" prop="grossweightvolume"
                width="120" />
            <el-table-column label="收付" align="center" sortable key="payment" prop="payment" width="120" />
            <el-table-column label="付操作计数" align="center" sortable key="paymentoperationcount" prop="paymentoperationcount"
                width="120" />
            <el-table-column label="收操作计数" align="center" sortable key="receiptoperationcount" prop="receiptoperationcount"
                width="120" />
            <el-table-column fixed="right" label="提交状态" align="center" sortable key="submissionstatus"
                prop="submissionstatus" width="120" />
            <el-table-column label="备注" align="center" sortable key="remark" prop="remark" width="120" />
        </el-table>
        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
            @pagination="getList" />
        <!-- 新建弹窗 -->
        <el-dialog :title="title" :visible.sync="open" width="1100px" append-to-body show-close>
            <fieldset>
                <legend>
                    <el-checkbox v-model="checked1">详细信息</el-checkbox>
                </legend>
                <el-form v-show="checked1" ref="form" :model="form" :rules="rules" label-width="130px">
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="罐:" prop="unitNum">
                                <el-select v-model="form.unitTypeId" placeholder="罐">
                                    <el-option v-for="(item, index) in zzType" :key="index" :label="item.label"
                                        :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="质量状态:" prop="unitNum">
                                <el-select v-model="form.unitTypeId" placeholder="罐">
                                    <el-option v-for="(item, index) in zzType" :key="index" :label="item.label"
                                        :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="检尺类型:" prop="unitNum">
                                <el-select v-model="form.unitTypeId" placeholder="检尺类型">
                                    <el-option v-for="(item, index) in zzType" :key="index" :label="item.label"
                                        :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="物料:" prop="unitNum">
                                <el-select v-model="form.unitTypeId" placeholder="物料">
                                    <el-option v-for="(item, index) in zzType" :key="index" :label="item.label"
                                        :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="物料别名:" prop="unitNum">
                                <el-select v-model="form.unitTypeId" placeholder="物料别名">
                                    <el-option v-for="(item, index) in zzType" :key="index" :label="item.label"
                                        :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="检尺人:" prop="unitNum">
                                <el-select v-model="form.unitTypeId" placeholder="检尺人">
                                    <el-option v-for="(item, index) in zzType" :key="index" :label="item.label"
                                        :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="检尺时间:" prop="unitNum">
                                <el-select v-model="form.unitTypeId" placeholder="检尺时间">
                                    <el-option v-for="(item, index) in zzType" :key="index" :label="item.label"
                                        :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="仪表油尺:" prop="unitNum">
                                <el-input maxlength="11" type="text"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="油温(℃):" prop="unitNum">
                                <el-input maxlength="11" type="text"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="水尺(m):" prop="unitNum">
                                <el-input maxlength="11" type="text"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="人工油尺(m):" prop="unitNum">
                                <el-input maxlength="11" style="width: 150px;" type="text"></el-input>
                                <span style="margin-right: 10px;">{{ "191.2" }}</span>
                                <span>{{ "19" }}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="压力(MPa):" prop="unitNum">
                                <el-input maxlength="11" type="text"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="含水率(%):" prop="unitNum">
                                <el-input maxlength="11" type="number"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="标准密度(kg/m3):" prop="unitNum">
                                <el-input maxlength="11" type="text" style="width:130px;margin-right: 10px;"></el-input>
                                <el-button size="mini" type="info" @click="MixingDensity">混合密度</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="介质浓度:" prop="unitNum">
                                <el-input maxlength="11" type="number"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="酸碱系数:" prop="unitNum">
                                <el-input maxlength="11" type="number"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="含水量:" prop="unitNum">
                                <el-input maxlength="11" type="number"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="气相温度:" prop="unitNum">
                                <el-input maxlength="11" type="number"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="大气温度:" prop="unitNum">
                                <el-input maxlength="11" type="number"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="修正油尺:" prop="unitNum">
                                <el-input maxlength="11" type="number"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </fieldset>
            <fieldset>
                <legend>
                    <el-checkbox v-model="checked2">空尺计量输出</el-checkbox>
                </legend>
                <el-form ref="form" v-show="checked2" :model="form" :rules="rules" label-width="130px">
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="" prop="unitNum">
                                <el-checkbox v-model="checked">是否空尺</el-checkbox>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="空尺:" prop="unitNum">
                                <el-input maxlength="11" type="text"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="量油尺修正:" prop="unitNum">
                                <el-input maxlength="11" type="text"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="浸油高度:" prop="unitNum">
                                <el-input maxlength="11" type="text"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </fieldset>
            <fieldset>
                <legend>
                    <el-checkbox v-model="checked3">罐量计算结果</el-checkbox>
                </legend>
                <el-form ref="form" v-show="checked3" :model="form" :rules="rules" label-width="130px">
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="毛标准体积:" prop="unitNum">
                                <el-input disabled maxlength="11" type="text" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="水容积:" prop="unitNum">
                                <el-input disabled maxlength="11" type="text" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="VCF:" prop="unitNum">
                                <el-input disabled maxlength="11" type="text" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="净油容积量:" prop="unitNum">
                                <el-input disabled maxlength="11" type="text" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="静压修正值:" prop="unitNum">
                                <el-input disabled maxlength="11" type="text" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="毛标准质量:" prop="unitNum">
                                <el-input disabled maxlength="11" type="text" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="气相密度:" prop="unitNum">
                                <el-input disabled maxlength="11" type="text" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="气相体积:" prop="unitNum">
                                <el-input disabled maxlength="11" type="text" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="气相质量:" prop="unitNum">
                                <el-input disabled maxlength="11" type="text" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="温度修正值:" prop="unitNum">
                                <el-input disabled maxlength="11" type="text" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="毛计量体积:" prop="unitNum">
                                <el-input disabled maxlength="11" type="text" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="盈亏量:" prop="unitNum">
                                <el-input disabled maxlength="11" type="text" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="最大安全容积:" prop="unitNum">
                                <el-input disabled maxlength="11" type="text" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="最大安全量:" prop="unitNum">
                                <el-input disabled maxlength="11" type="text" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="净油质量:" prop="unitNum">
                                <el-input disabled maxlength="11" type="text" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="最小安全容积:" prop="unitNum">
                                <el-input disabled maxlength="11" type="text" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="最小安全量:" prop="unitNum">
                                <el-input disabled maxlength="11" type="text" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="罐确认量:" prop="unitNum">
                                <el-input maxlength="11" type="text" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="备注:" prop="unitNum">
                                <el-input maxlength="11" type="text" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </fieldset>
            <el-row :gutter="10">
                <el-col :span="12" :offset="6">
                    <el-button type="primary" size="mini" @click="DataAcquisition">数据采集</el-button>
                    <el-button type="primary" size="mini" @click="TankSizeCalculation">罐量计算</el-button>
                    <el-button type="primary" size="mini" @click="TableMeasurement">表计量</el-button>
                    <el-button type="info" size="mini" @click="analyze">分析</el-button>
                    <el-button type="warning" size="mini" @click="DeliveryWarehouse">交库</el-button>
                    <span> | </span>
                    <el-button type="success" size="mini" @click="verify">确认</el-button>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: "LaboratoryAnalysis",
    components: {},
    data() {
        return {
            zzType: [],
            checked: false,
            open: false,
            checked1: false,
            checked2: false,
            checked3: false,
            input3: "",
            input4: "",
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
                "tankId": "",
                "time": JSON.stringify(new Date(new Date())).slice(1, 11)
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

        //混合密度
        MixingDensity() {

        },
        //表计量
        TableMeasurement() {

        },
        // 交库
        DeliveryWarehouse() {

        },
        //数据采集
        DataAcquisition() {
            this.$message("数据采集")
        },
        //分析
        analyze() {

        },
        //罐量计算
        TankSizeCalculation() {
            this.$message("罐量计算")
        },
        verify() {
            this.open = false
            this.submitForm()
        },
        Cancel() {
            this.open = false;
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
        toggleRowVisibility(row) {
            row.Editable = true;
        },
        //失焦事件
        handleBlur(row) {
            row.Editable = false
        },
        //仪表名称 改变
        selectBlur(e, row) {
            console.log('仪表名称 改变', e)
            console.log('仪表名称 改变', row)
            this.$modal.msgWarning("仪表已改变。请检查对应的侧线和物料信息是否正确。");
        },
        close() {
            this.$emit('update:visible', false)
        },
        /** 查询用户列表 */
        getList() {
            this.loading = true;
            this.$api.i_analysisSelece(this.queryParams).then(res => {
                this.dataListTC = res.rows  //RecId
                this.total = res.total

            }
            );
            this.loading = false;
            this.$message.success("获取数据成功")
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
        cancelOpenChanTank() {
            this.OpenChangeoverTank = false;
        },
        submitOpenChanTank() {
            this.$message.success("提交成功")
            this.OpenChangeoverTank = false;
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
            if (this.ids.length < 1) {
                this.$message.error("请选择一条数据!")
            } else {
                this.reset();
                this.open = true;
                this.title = "物料移动-化验分析录入";
            }

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
                        this.$api.i_unitSU({
                            "id": this.form.id,
                            "des": this.form.des,
                            "unitNum": this.form.unitNum,
                            "sectorId": this.form.sectorId,
                            "unitCode": this.form.unitCode,
                            "unitName": this.form.unitName,
                            "unitAlias": this.form.unitAlias,
                            "nodeAreaId": this.form.nodeAreaId,
                            "displayOrder": this.form.displayOrder,
                            "upperUnitId": this.form.upperUnitId,
                            "unitTypeId": this.form.unitTypeId,
                            "capacity": this.form.capacity,
                            "useFlag": this.form.useFlag,
                        }).then(response => {
                            this.$modal.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        this.$api.i_unitSU(this.form).then(response => {
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
                return this.$api.i_unitDel({ id: userIds })
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
