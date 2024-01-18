<template>
    <!-- Old船运出厂计量单 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="60px">
            <el-form-item label="日期:" prop="BeginTime">
                <el-date-picker v-model="queryParams.BeginTime" type="datetime" placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="班次:" prop="InOutType">
                <el-select size="mini" v-model="queryParams.InOutType" placeholder="班次" clearable>
                    <el-option v-for="dict in banCi" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="状态:" prop="SheetState">
                <el-select size="mini" v-model="queryParams.SheetState" placeholder="状态" clearable>
                    <el-option v-for="dict in SheetStateList" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="handleQuery">查询</el-button>
                <el-button size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5" v-show="this.queryParams.SheetState == '0'">
                <el-button type="primary" plain size="mini" @click="handleAdd">创建</el-button>
            </el-col>
            <el-col :span="1.5" v-show="this.queryParams.SheetState == '0'">
                <el-button type="success" plain size="mini" :disabled="single" @click="handleUpdate">维护</el-button>
            </el-col>
            <el-col :span="1.5" v-show="this.queryParams.SheetState == '0'">
                <el-button type="success" plain size="mini" :disabled="single" @click="handleUpdate">关闭</el-button>
            </el-col>
            <el-col :span="1.5" v-show="this.queryParams.SheetState == '0'">
                <el-button type="danger" plain size="mini" :disabled="single" @click="handleDelete">删除</el-button>
            </el-col>
            <el-col :span="1.5" v-show="this.queryParams.SheetState == '1'">
                <el-button type="warning" plain icon="el-icon-delete" size="mini" :disabled="single"
                    @click="handleUnclose">解除关闭</el-button>
            </el-col>
        </el-row>
        <el-table v-loading="loading" :data="dataList" border @selection-change="handleSelectionChange">
            <el-table-column fixed="left" type="index" width="50" align="center" />
            <el-table-column fixed="left" type="selection" width="50" align="center" />
            <el-table-column fixed="left" label="单据编号" align="center" key="LocationName" prop="LocationName" />
            <el-table-column label="业务开始班次时间" align="center" sortable key="MtrlName" prop="MtrlName" width="160"
                :show-overflow-tooltip="true" />
            <el-table-column label="业务结束班次时间" align="center" sortable key="Batch" prop="Batch" width="160"
                :show-overflow-tooltip="true" />
            <el-table-column label="进出厂点" align="center" sortable key="Rank" prop="Rank" :show-overflow-tooltip="true"
                width="100" />
            <el-table-column label="船名" align="center" sortable key="WgtPerPack" prop="WgtPerPack"
                :show-overflow-tooltip="true" />
            <el-table-column label="提单总量" align="center" sortable key="AmntAftBook" prop="AmntAftBook" width="100"
                :show-overflow-tooltip="true" />
            <el-table-column label="商检总量" align="center" sortable key="WgtAftBook" prop="WgtAftBook" width="100" />
            <el-table-column label="自检总量" align="center" sortable key="WgtDim" prop="WgtDim" width="100" />
            <el-table-column label="途耗" align="center" sortable key="EndShiftTime" prop="EndShiftTime" />
            <el-table-column label="单据状态" align="center" sortable key="EndShiftTime1" prop="EndShiftTime1" width="100" />
            <el-table-column label="创建人" align="center" sortable key="EndShiftTime2" prop="EndShiftTime2" width="100" />
            <el-table-column label="创建时间" align="center" sortable key="EndShiftTime3" prop="EndShiftTime3" width="100" />
            <el-table-column label="关闭人" align="center" sortable key="EndShiftTime4" prop="EndShiftTime4" width="100" />
            <el-table-column label="关闭时间" align="center" sortable key="EndShiftTime5" prop="EndShiftTime5" width="100" />
            <el-table-column label="备注" align="center" sortable key="EndShiftTime6" prop="EndShiftTime6" width="100" />
        </el-table>
        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
            @pagination="getList" />
        <!-- 新增弹窗 -->
        <el-dialog :title="title" :visible.sync="open" width="1200px" append-to-body>
            <el-form ref="formDialog" :model="form" :rules="rules" label-width="120px">
                <el-row type="flex" justify="space-between">
                    <el-col :span="6">
                        <el-form-item label="进出厂点:" prop="OpeTypeId">
                            <el-select :value="form.OpeTypeId" value-key="label" style="width: 150px;" placeholder="进出厂点"
                                clearable size="mini">
                                <el-option v-for="dict in OpeTypeList" :key="dict.value" :label="dict.label"
                                    :value="dict" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="船名:" prop="OpeTypeId">
                            <el-select :value="form.OpeTypeId" value-key="label" style="width: 150px;" placeholder="船名"
                                clearable size="mini">
                                <el-option v-for="dict in OpeTypeList" :key="dict.value" :label="dict.label"
                                    :value="dict" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="提单总量:" prop="OpeTypeId">
                            <el-input v-model="form.OpeTypeId" type="text" style="width: 150px;" size="mini"
                                maxlength="11"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="开卸时间:" prop="OpeTypeId">
                            <el-date-picker v-model="form.OpeTypeId" size="mini" style="width: 150px;" type="datetime"
                                placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="商检总量:" prop="SrNodeId">
                            <el-input v-model="form.SrNodeId" type="text" style="width: 150px;" size="mini"
                                maxlength="11"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="完货时间:" prop="SrMtrlId">
                            <el-date-picker v-model="form.SrMtrlId" style="width: 150px;" type="datetime" size="mini"
                                placeholder="完货时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="自检总量:" prop="SrRankId">
                            <el-input v-model="form.SrRankId" type="text" style="width: 150px;" size="mini"
                                maxlength="11"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="靠泊时间:" prop="SrBatch">
                            <el-date-picker v-model="form.SrBatch" style="width: 150px;" type="datetime" size="mini"
                                placeholder="靠泊时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="与商检差:" prop="TgNodeId">
                            <el-input v-model="form.TgNodeId" type="text" size="mini" style="width: 150px;"
                                maxlength="11"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="离泊时间:" prop="TgMtrlId">
                            <el-date-picker v-model="form.SrBatch" style="width: 150px;" type="datetime" size="mini"
                                placeholder="离泊时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="途耗总量:" prop="TgRankId">
                            <el-input v-model="form.TgRankId" type="text" style="width: 150px;" size="mini"
                                maxlength="11"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="途耗率:" prop="TgBatch">
                            <el-input v-model="form.TgBatch" placeholder="途耗率" style="width: 150px;" size="mini"
                                maxlength="11">
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="发货港:" prop="WgtPerPack">
                            <el-input v-model="form.WgtPerPack" size="mini" style="width: 150px;" type="number"
                                placeholder="发货港" maxlength="30">
                                <template slot="append">KG/件</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="内外贸:" prop="Amnt">
                            <el-input v-model="form.Amnt" size="mini" style="width: 150px;" type="number" placeholder="内外贸"
                                maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="开始班次:" prop="Dim">
                            <el-select :value="form.Dim" value-key="label" style="width: 150px;" @change="form.Dim = $event"
                                placeholder="开始班次" clearable size="mini">
                                <el-option v-for="dict in WgtPerPackList" :key="dict.value" :label="dict.label"
                                    :value="dict" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="结束班次:" prop="Weight">
                            <el-select :value="form.Dim" value-key="label" style="width: 150px;" @change="form.Dim = $event"
                                placeholder="结束班次" clearable size="mini">
                                <el-option v-for="dict in WgtPerPackList" :key="dict.value" :label="dict.label"
                                    :value="dict" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="录入者:" prop="Customer">
                            <el-input size="mini" v-model="form.Customer" style="width: 150px;" placeholder="录入者"
                                maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="录入时间:" prop="oddNum">
                            <el-date-picker v-model="form.oddNum" size="mini" style="width: 150px;" type="datetime"
                                placeholder="录入时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="关闭者:" prop="TransTypeId">
                            <el-input size="mini" v-model="form.TransTypeId" style="width: 150px;" placeholder="关闭者"
                                maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="关闭时间:" prop="VehiCode">
                            <el-date-picker v-model="form.VehiCode" style="width: 150px;" size="mini" type="datetime"
                                placeholder="关闭时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7"></el-col>
                    <el-col :span="3">
                        <el-form-item label="">
                            <el-button type="info" plain size="mini">船期计划</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item label="">
                            <el-dropdown>
                                <el-button type="primary" size="mini" plain>{{ buttonText }}</el-button>
                                <el-dropdown-menu>
                                    <el-dropdown-item @click.native="selectOption('Option1')">只计算主计量单</el-dropdown-item>
                                    <el-dropdown-item @click.native="selectOption('Option2')">通过罐计量计算</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item label="">
                            <el-button type="" plain size="mini">分摊</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item label="">
                            <el-button type="success" plain size="mini">保存</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item label="">
                            <el-button type="success" plain size="mini">完成</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2"></el-col>
                </el-row>
            </el-form>
            <el-card class="box-card">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="计量记录" name="first">
                        <el-button type="success" size="mini" @click="TableMeasurement"
                            :disabled="single_dialog">表计量</el-button>
                        <el-button type="success" size="mini" @click="TableMeasurement"
                            :disabled="single_dialog">槽车计量</el-button>
                        <el-button type="success" size="mini" @click="TableMeasurement"
                            :disabled="single_dialog">槽车导入</el-button>
                        <el-button type="success" size="mini" @click="TrackscaleMeasurement"
                            :disabled="single_dialog">轨道衡计量</el-button>
                        <el-button type="success" size="mini" @click="TrackScaleImport"
                            :disabled="single_dialog">轨道衡导入</el-button>
                        <el-button type="success" size="mini" @click="TableMeasurement"
                            :disabled="single_dialog">汽车衡计量</el-button>
                        <el-button type="success" size="mini" @click="TableMeasurement"
                            :disabled="single_dialog">汽车衡导入</el-button>
                        <el-button type="success" size="mini" @click="TankMetering"
                            :disabled="single_dialog">罐计量</el-button>
                        <el-button type="success" size="mini" @click="ShipMeasurement"
                            :disabled="single_dialog">船计量</el-button>
                        <el-button type="danger" size="mini" @click="handleDel" :disabled="single_dialog">删除</el-button>
                        <el-button type="primary" size="mini" @click="handleMaintenance" :disabled="single_dialog">
                            维护</el-button>
                        <el-table border v-loading="loading" :data="MoveRecordList"
                            @selection-change="handleSelectionChange_dialog">
                            <el-table-column fixed="left" type="selection" width="50" align="center" />
                            <el-table-column label="序号" align="center" type="index" />
                            <el-table-column label="物料" align="center" key="SrMtrlName" prop="SrMtrlName" />
                            <el-table-column label="贸易类型" align="center" key="TgMtrlName" prop="TgMtrlName" />
                            <el-table-column label="提单量" align="center" key="SrNodeName" prop="SrNodeName" />
                            <el-table-column label="自检量" align="center" key="TgNodeName" prop="TgNodeName" />
                            <el-table-column label="确认量" align="center" key="SrRankName" prop="SrRankName" />
                            <el-table-column label="自检途耗" align="center" key="TgRankName" prop="TgRankName" />
                            <el-table-column label="自检途耗率(%)" align="center" key="SrBatch" prop="SrBatch" width="160" />
                            <el-table-column label="商检量" align="center" key="TgBatch" prop="TgBatch" width="120" />
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="卸船对应罐计量" name="second">
                        <el-row :gutter="10" class="mb8">
                            <el-col :span="1.5">
                                <el-button type="primary" plain size="mini" @click="handleTankmetering">罐计量</el-button>
                            </el-col>
                            <el-col :span="1.5">
                                <el-button type="success" plain size="mini" :disabled="single"
                                    @click="handleUpdate">保存</el-button>
                            </el-col>
                            <el-col :span="1.5">
                                <el-button type="danger" plain size="mini" :disabled="multiple"
                                    @click="handleDelete">删除</el-button>
                            </el-col>
                        </el-row>
                        <el-table border v-loading="loading" :data="MoveRecordList"
                            @selection-change="handleSelectionChange_dialog">
                            <el-table-column fixed="left" type="selection" width="50" align="center" />
                            <el-table-column label="序号" align="center" type="index" />
                            <el-table-column label="罐" align="center" key="SrMtrlName" prop="SrMtrlName" />
                            <el-table-column label="泊位物料" align="center" key="TgMtrlName" prop="TgMtrlName" />
                            <el-table-column label="物料" align="center" key="SrNodeName" prop="SrNodeName" />
                            <el-table-column label="前检尺" align="center" key="TgNodeName" prop="TgNodeName" />
                            <el-table-column label="后检尺" align="center" key="SrRankName" prop="SrRankName" />
                            <el-table-column label="前检尺时间" align="center" key="TgRankName" prop="TgRankName" />
                            <el-table-column label="后检尺时间" align="center" key="SrBatch" prop="SrBatch" width="160" />
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </el-card>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: "OldShippingFactoryMeasurementForm",
    components: {},
    data() {
        return {
            SheetStateList: [
                {
                    label: "制单状态",
                    value: "0"
                }, {
                    label: "关闭状态",
                    value: "1"
                }
            ],
            OpeTypeList: [],
            WgtPerPackList: [],
            activeName: 'first',
            selectedOption: "计算",
            open: false,
            title: "",
            // 选中数组
            ids: [],
            // 非单个禁用
            single: true,
            single_dialog: true,
            multiple_dialog: true,
            // 非多个禁用
            multiple: true,

            LocationId: [
                {
                    label: "石油焦库位",
                    value: "0"
                },
                {
                    label: "球状石油焦",
                    value: "1"
                }
            ],
            materialGrade: [
                {
                    label: "(空)",
                    value: "(空)"
                }, {
                    label: "破包料",
                    value: "破包料"
                }, {
                    label: "扫地料",
                    value: "扫地料"
                }, {
                    label: "等外品",
                    value: "等外品"
                }, {
                    label: "优等品",
                    value: "优等品"
                }, {
                    label: "一级品",
                    value: "一级品"
                }, {
                    label: "合格品",
                    value: "合格品"
                }, {
                    label: "废料",
                    value: "废料"
                },
                {
                    label: "无等级",
                    value: "无等级"
                },
                {
                    label: "未指定",
                    value: "未指定"
                },

            ],
            form: {

            },
            MoveRecordList: [],
            banCi: [{
                label: "白班|08:00:00-20:00:00",
                value: "0"
            }, {
                label: "夜班|20:00:00-08:00:00",
                value: "1"
            }],
            // 遮罩层
            loading: true,
            total: 0,
            dataList: [],
            // 查询参数
            queryParams: {
                SheetState: "0",
                InOutType: "0",
                BeginTime: new Date(),
            },
            // 表单校验
            rules: {}
        };
    },
    computed: {
        buttonText() {
            switch (this.selectedOption) {
                case 'Option1':
                    return '只计算主计量单';
                case 'Option2':
                    return '通过罐计量计算';
                default:
                    return '计算';
            }
        },
    },
    watch: {},
    created() {
        this.getList();
        this.getOther();
    },
    mounted() { },
    methods: {
        getOther() {
            //班次下拉数据
            this.$api.classes().then(res => {
                this.banCi = res.data.map(r => {
                    return {
                        label: r.ShiftText,
                        value: r.ShiftId,
                    }
                })
            })
        },
        //解除关闭
        handleUnclose() {
            this.$message.success("解除关闭成功")
        },
        handleDelete() {

        },
        handleUpdate() { },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        selectOption(option) {
            console.log("选择了", option);
            // 处理选项的选择
            this.selectedOption = option;
        },
        //创建
        handleAdd() {
            this.reset();
            this.open = true;
            this.title = "主计量单信息";
        },
        handleTankmetering() {

        },
        submitForm() {
            this.open = false
        },
        /** 查询用户列表 */
        getList() {
            this.loading = true;
            this.$api.QueryInventorys().then(response => {
                this.dataList = response.list
                this.total = response.list.length;
                this.loading = false;
            }
            );
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.id);
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        },
        //弹窗中 列表 多选
        handleSelectionChange_dialog(selection) {
            console.log('弹窗列表多选', selection)
            let ids = []
            selection.forEach((val, index) => {
                this.MoveRecordList.forEach((v, i) => {
                    // id 是每一行的数据id
                    if (val.time == v.time) {
                        console.log(i);
                        ids.push(i)
                    }

                })
            })
            this.ids_dialog = ids
            this.single_dialog = selection.length != 1;
            this.multiple_dialog = !selection.length;
        },
        // 表单重置
        reset() {
            this.form = {
                OpeTypeId: "",//业务单类型
                SrNodeId: "",//来源节点
                SrMtrlId: "",//来源物料
                SrRankId: "",//来源等级
                SrBatch: "",//来源批次
                TgNodeId: "",//目标节点
                TgMtrlId: "",//目标物料
                TgRankId: "",//目标等级
                TgBatch: "",//目标批次
                WgtPerPack: "",//物料规格
                Dim: "",//重量单位
                Amnt: "",//移动件数
                Weight: "",//移动重量
                Customer: "",//客户
                oddNum: "",//交货单号
                TransTypeId: "",//运输类型
                VehiCode: "",//车牌号
                user: "",//领料人
                des: "",//描述
            };
            this.resetForm("form");
        },
        // 取消按钮
        cancel() {
            this.open = false;
            this.reset();
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
    }
};
</script>
