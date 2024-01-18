<template>
    <!-- 管输出厂计量单 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="50px">
            <el-form-item label="日期:" prop="time">
                <el-date-picker v-model="queryParams.time" format="yyyy-MM-dd" type="datetime" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="班次:" prop="classes">
                <el-select v-model="queryParams.classes" placeholder="请选择班次" clearable>
                    <el-option v-for="dict in banCi" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="状态:" prop="status">
                <el-select v-model="queryParams.status" placeholder="请选择状态" clearable>
                    <el-option v-for="dict in SheetStateList" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="handleQuery">搜索</el-button>
                <el-button size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5" v-show="this.queryParams.status == '0'">
                <el-button type="primary" plain size="mini" @click="handleCreate">创建</el-button>
            </el-col>
            <el-col :span="1.5" v-show="this.queryParams.status == '0'">
                <el-button type="primary" plain size="mini" :disabled="single" @click="handleAdd">维护</el-button>
            </el-col>
            <el-col :span="1.5" v-show="this.queryParams.status == '0'">
                <el-button type="success" plain size="mini" @click="handleClose" :disabled="single">关闭</el-button>
            </el-col>
            <el-col :span="1.5" v-show="this.queryParams.status == '0'">
                <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="single" @click="handleDelete">删除
                </el-button>
            </el-col>
            <el-col :span="1.5" v-show="this.queryParams.status == '1'">
                <el-button type="warning" plain size="mini" :disabled="single" @click="handleUnclose">解除关闭</el-button>
            </el-col>
        </el-row>
        <el-table ref="multipleTable" v-if="dataList && dataList.length > 0" border v-loading="loading" :data="dataList"
            @selection-change="handleSelectionChange">
            <el-table-column fixed="left" type="selection" width="50" align="center" />
            <el-table-column prop="props" type="expand">
                <template slot-scope="props">
                    <div style="padding: 0px 50px">
                        <el-table :data="props.row.childList">
                            <el-table-column label="序号" align="center" type="index" />
                            <el-table-column label="表(车、罐)号" align="center" width="200" key="MeasurePointName"
                                prop="MeasurePointName" />
                            <el-table-column label="计量方式" align="center" width="200" key="MeasTypeName"
                                prop="MeasTypeName" />
                            <el-table-column label="前读数(空车)" align="center" width="200" key="Pre" prop="Pre" />
                            <el-table-column label="后读数(重车)" align="center" width="200" key="Aft" prop="Aft" />
                            <el-table-column label="计量量" align="center" width="200" key="MearVal" prop="MearVal" />
                            <el-table-column label="确认量" align="center" width="200" key="ConVal" prop="ConVal" />
                            <el-table-column label="前量(空车)时间" align="center" width="200" key="PreTime" prop="PreTime" />
                            <el-table-column label="后量(重车)时间" align="center" width="200" key="AftTime" prop="AftTime" />
                            <el-table-column label="班次开始时间" align="center" width="200" key="BegShiftTime"
                                prop="BegShiftTime" />
                            <el-table-column label="班次结束时间" align="center" width="200" key="EndShiftTime"
                                prop="EndShiftTime" />
                            <el-table-column label="测量人" align="center" width="200" key="MeasureUserName"
                                prop="MeasureUserName" />
                            <el-table-column label="计量时间" align="center" width="200" key="MeasTime" prop="MeasTime" />
                            <el-table-column label="录入人" align="center" width="200" key="CreateUserName"
                                prop="CreateUserName" />
                            <el-table-column label="录入时间" align="center" width="200" key="CrtTime" prop="CrtTime" />
                            <el-table-column label="确认人" align="center" width="200" key="AuditUserName  "
                                prop="AuditUserName" />
                            <el-table-column label="备注" align="center" width="200" key="des" prop="des" />
                        </el-table>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="单据编号" align="center" key="sheetCode" prop="sheetCode" width="120" />
            <el-table-column label="业务开始班次时间" align="center" key="begShiftTime" prop="begShiftTime" width="150" />
            <el-table-column label="业务结束班次时间" align="center" key="endShiftTime" prop="endShiftTime" width="150" />
            <el-table-column label="进出厂点" align="center" key="smtnNodeName" prop="smtnNodeName" width="120" />
            <el-table-column label="主物料名称" align="center" key="mtrlName" prop="mtrlName" width="120" />
            <el-table-column label="单据总量" align="center" key="conAmount" prop="conAmount" width="120" />
            <el-table-column label="确认总量" align="center" key="ConAmount" prop="ConAmount" width="120" />
            <el-table-column label="单据状态" align="center" key="State" prop="State" width="120" />
            <el-table-column label="物料组分" align="center" key="clsUserName" prop="clsUserName" width="120">
                <template slot-scope="scope">
                    <el-button type="text" @click="handleMaterial">查看</el-button>
                </template>
            </el-table-column>
            <el-table-column label="辅计量" align="center" key="fjl" prop="fjl" width="120">
                <template slot-scope="scope">
                    <el-button type="text" @click="handleMaterial1">查看</el-button>
                </template>
            </el-table-column>
            <el-table-column label="创建人" align="center" key="crtUserName" prop="crtUserName" width="120" />
            <el-table-column label="创建时间" align="center" key="crtTime" prop="crtTime" width="150" />
            <el-table-column label="关闭人" align="center" key="ClsUserName" prop="ClsUserName" width="120" />
            <el-table-column label="关闭时间" align="center" key="CloseTime" prop="CloseTime" width="150" />
            <el-table-column label="备注" align="center" key="remark" prop="remark" width="120" />
        </el-table>
        <!--    物料组分    -->
        <el-dialog title="物料组分" width="30%" :visible.sync="dialogMaterialVisible" @close="dialogMaterialVisible = false">
            <el-table border :data="nowMaterial" style="width: 100%;">
                <el-table-column property="date" label="物料" style="width: 50%;"></el-table-column>
                <el-table-column property="name" label="百分比" style="width: 50%;"></el-table-column>
            </el-table>
        </el-dialog>
        <!--    辅计量    -->
        <el-dialog title="辅计量" width="30%" :visible.sync="dialogMaterialVisible1" @close="dialogMaterialVisible1 = false">
            <el-table border :data="nowMaterial" style="width: 100%;">
                <el-table-column fixed="left" type="index" width="50" align="center" />
                <el-table-column property="date" label="表(车,罐)号" style="width: 50%;"></el-table-column>
                <el-table-column property="name" label="测量方式" style="width: 50%;"></el-table-column>
                <el-table-column property="name" label="前读数(空车)" style="width: 50%;"></el-table-column>
                <el-table-column property="name" label="后读数(重车)" style="width: 50%;"></el-table-column>
                <el-table-column property="name" label="测量量" style="width: 50%;"></el-table-column>
                <el-table-column property="name" label="确认量" style="width: 50%;"></el-table-column>
                <el-table-column property="name" label="前量(空车)时间" style="width: 50%;"></el-table-column>
                <el-table-column property="name" label="后量(空车)时间" style="width: 50%;"></el-table-column>
                <el-table-column property="name" label="业务开始班次时间" style="width: 50%;"></el-table-column>
                <el-table-column property="name" label="业务结束班次时间" style="width: 50%;"></el-table-column>
                <el-table-column property="name" label="录入人" style="width: 50%;"></el-table-column>
                <el-table-column property="name" label="录入时间" style="width: 50%;"></el-table-column>
                <el-table-column property="name" label="测量人" style="width: 50%;"></el-table-column>
                <el-table-column property="name" label="测量时间" style="width: 50%;"></el-table-column>
                <el-table-column property="name" label="确认人" style="width: 50%;"></el-table-column>
                <el-table-column property="name" label="备注" style="width: 50%;"></el-table-column>
            </el-table>
        </el-dialog>
        <!--    计量单创建弹窗    -->
        <el-dialog title="计量单创建弹窗" width="60%" :visible.sync="open" @close="open = false">
            <el-form ref="form" :model="form" :rules="rules" label-width="90px">
                <el-row type="flex" justify="space-around">
                    <el-col :span="10">
                        <el-form-item label="进出厂点:" prop="UnitRdType">
                            <el-select v-model="form.UnitRdType" placeholder="请选择操作类型"
                                @change="form.UnitRdType = $event, operationChange($event)">
                                <el-option v-for="dict in operationType" :key="dict.value" :label="dict.label"
                                    :value="dict"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="物　　料:" prop="UnitRdType">
                            <el-select v-model="form.UnitRdType" placeholder="请选择操作类型"
                                @change="form.UnitRdType = $event, operationChange($event)">
                                <el-option v-for="dict in operationType" :key="dict.value" :label="dict.label"
                                    :value="dict"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="space-around">
                    <el-col :span="10">
                        <el-form-item label="开始班次:" prop="DlvNode">
                            <el-input v-model="form.userName" disabled clearable style="width: 240px" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="结束班次" prop="RcvNode">
                            <el-input v-model="form.userName" disabled clearable style="width: 240px" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="space-around">
                    <el-col :span="10">
                        <el-form-item label="录 入 者:" prop="DlvNode">
                            <el-input v-model="form.userName" disabled clearable style="width: 240px" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="录入日期" prop="RcvNode">
                            <el-input v-model="form.userName" disabled clearable style="width: 240px" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="space-around">
                    <el-col :span="10">
                        <el-form-item label="关 闭 者:" prop="DlvNode">
                            <el-input v-model="form.userName" disabled clearable style="width: 240px" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="结束日期" prop="RcvNode">
                            <el-input v-model="form.userName" disabled clearable style="width: 240px" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="space-around">
                    <el-col :span="10">
                        <el-form-item label="单据总量:" prop="DlvNode">
                            <el-input v-model="form.userName" disabled clearable style="width: 240px" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="确认总量" prop="RcvNode">
                            <el-input v-model="form.userName" clearable style="width: 240px" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="space-around">
                    <el-col :span="10">
                        <el-form-item label="单据编号:" prop="DlvNode">
                            <el-input v-model="form.userName" disabled clearable style="width: 240px" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="订单编号" prop="RcvNode">
                            <el-input v-model="form.userName" disabled clearable style="width: 240px" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="space-around">
                    <el-col :span="22">
                        <el-form-item label="备注:" prop="DlvNode">
                            <el-input type="textarea" v-model="form.desc"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="center">
                    <el-col :span="6" class="flex align-center justify-center">
                        <el-button type="primary" icon="el-icon-plus" size="mini">保存</el-button>
                        <el-button type="success" icon="el-icon-plus" size="mini">完成</el-button>
                    </el-col>
                </el-row>
            </el-form>
            <el-tabs v-model="activeName">
                <el-tab-pane label="计量记录" name="1">
                    <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
                    <el-button type="primary" icon="el-icon-edit" size="mini">维护</el-button>
                    <el-table ref="dialogTableRef" border :data="dialogTable" @selection-change="handleSelectionChange">
                        <el-table-column fixed="left" type="selection" width="50" align="center" />
                        <el-table-column label="表(车、罐)号" align="center" key="SheetCode" prop="SheetCode" width="120" />
                        <el-table-column label="计量方式" align="center" key="BegShiftTime" prop="BegShiftTime" width="150" />
                        <el-table-column label="前读数(空车)" align="center" key="EndShiftTime" prop="EndShiftTime"
                            width="150" />
                        <el-table-column label="后读数(重车)" align="center" key="SmtnNodeName" prop="SmtnNodeName"
                            width="120" />
                        <el-table-column label="计量量" align="center" key="MtrlName" prop="MtrlName" width="120" />
                        <el-table-column label="确认量" align="center" key="Amount" prop="Amount" width="120" />
                        <el-table-column label="前量(空车)时间" align="center" key="ConAmount" prop="ConAmount" width="120" />
                        <el-table-column label="后量(重车)时间" align="center" key="State" prop="State" width="120" />
                        <el-table-column label="班次开始时间" align="center" key="State" prop="State" width="120" />
                        <el-table-column label="班次结束时间" align="center" key="State" prop="State" width="120" />
                        <el-table-column label="测量人" align="center" key="State" prop="State" width="120" />
                        <el-table-column label="录入人" align="center" key="State" prop="State" width="120" />
                        <el-table-column label="计量时间" align="center" key="State" prop="State" width="120" />
                        <el-table-column label="录入时间" align="center" key="State" prop="State" width="120" />
                        <el-table-column label="确认人" align="center" key="State" prop="State" width="120" />
                        <el-table-column label="备注" align="center" key="State" prop="State" width="120" />
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="物料组分" name="2">
                    <el-button type="success" icon="el-icon-plus" size="mini">添加</el-button>
                    <el-button type="primary" icon="el-icon-edit" size="mini">保存</el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
                    <el-table :data="material" @selection-change="handleSelectionChange">
                        <el-table-column fixed="left" type="selection" width="50" align="center" />
                        <el-table-column label="物料" align="center" key="BegShiftTime" prop="BegShiftTime" width="200" />
                        <el-table-column label="百分比" align="center" key="BegShiftTime" prop="BegShiftTime" width="200" />
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: "TankOutputFactoryMeasurementSheet",
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
            material: [],
            //制单状态下拉列表
            DocumentType: [],
            //仪表下拉数据
            instrList: [],
            //侧线下拉数据
            lineList: [],
            //物料下拉数据
            materielList: [],
            //质量等级下拉数据
            rankList: [],
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
            // 表格数据
            dataList: null,
            // 表单参数
            form: {
                CrtTime: '',//创建时间
            },
            // 查询参数
            queryParams: {
                "classes": "0",
                "status": "0",
                "time": new Date()
            },
            // 表单校验
            rules: {
                UnitRdType: [
                    { required: true, message: "请选择操作类型", trigger: "blur" },
                ],
                DlvNode: [
                    { required: true, message: "请选择本方节点", trigger: "blur" }
                ],
                RcvNode: [
                    { required: true, message: "请选择对方节点", trigger: "blur" }
                ],
                BegRdTime: [
                    { required: true, message: "请选择开始时间", trigger: "blur" }
                ],
            },
            //班次类型
            banCi: [{
                label: "白班|08:00:00-20:00:00",
                value: "0"
            }, {
                label: "夜班|20:00:00-08:00:00",
                value: "1"
            }],
            //操作类型
            operationType: [],
            //本方节点
            ourNode: [],
            //对方节点
            othersNode: [],
            expands: [], // 只展开一行放入当前行id
            getRowKeys: (row) => { // 获取当前行id
                return row.SmtinoutBillId || ''; // 这里看这一行中需要根据哪个属性值是id
            },
            //物料弹窗
            dialogMaterialVisible: false,
            dialogMaterialVisible1: false,
            nowMaterial: [],
            nowMaterial1: [],
            //计量单创建
            open: false,
            activeName: '2',//弹窗页签默认选中值
            dialogTable: [],//弹窗中的表格
        };
    },
    watch: {},
    created() {
        this.getList();
        this.getOther();
    },
    methods: {
        getOther() {
            //制单状态列表
            this.$api.DocumentType().then(res => {
                if (res.code == 200) {
                    this.DocumentType = res.data
                }
            });
            //班次下拉数据
            this.$api.classes().then(res => {
                this.banCi = res.data.map(r => {
                    return {
                        label: r.ShiftText,
                        value: r.ShiftId,
                    }
                })
            })
            //侧线下拉数据
            this.$api.lineList().then(res => {
                this.lineList = res.data.map(r => {
                    return {
                        label: r.NodeName,
                        value: r.NodeId,
                    }
                })
            })
            //物料下拉数据
            this.$api.materielList().then(res => {
                this.materielList = res.data.map(r => {
                    return {
                        label: r.PairNodeName,
                        value: r.PairNodeId,
                    }
                })
            })
            //质量等级下拉数据
            this.$api.rankList().then(res => {
                this.rankList = res.data.map(r => {
                    return {
                        label: r.NodeName,
                        value: r.NodeId,
                    }
                })
            })


            //操作类型
            this.$api.operationType().then(res => {
                this.operationType = res.data.map(r => {
                    return {
                        label: r.TypeName,
                        value: r.TypeId,
                    }
                })
            })
        },
        /** 提交按钮 */
        submitForm: function () {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.form.id != undefined) {
                        this.$api.i_tankOutputFactoryMeasurementSheetAdd({
                            "aditTime": this.form.aditTime,
                            "aditUserId": this.form.aditUserId,
                            "amount": this.form.amount,
                            "begShiftTime": this.form.begShiftTime,
                            "berthNo": this.form.berthNo,
                            "bizTypeId": this.form.bizTypeId,
                            "bookedFlag": this.form.bookedFlag,
                            "chkTime": this.form.chkTime,
                            "classes": this.form.classes,
                            "closeTime": this.form.closeTime,
                            "clsUserId": this.form.clsUserId,
                            "clsUserName": this.form.clsUserName,
                            "conAmount": this.form.conAmount,
                            "confTtlVal": this.form.confTtlVal,
                            "crtTime": this.form.crtTime,
                            "crtUserId": this.form.crtUserId,
                            "crtUserName": this.form.crtUserName,
                            "endShiftTime": this.form.endShiftTime,
                            "hasChild": this.form.hasChild,
                            "id": this.form.id,
                            "info": this.form.info,
                            "inoutFlag": this.form.inoutFlag,
                            "isLoss": this.form.isLoss,
                            "isMerge": this.form.isMerge,
                            "measNodeId": this.form.measNodeId,
                            "measNodeName": this.form.measNodeName,
                            "memo": this.form.memo,
                            "mtrlDesc": this.form.mtrlDesc,
                            "mtrlId": this.form.mtrlId,
                            "mtrlName": this.form.mtrlName,
                            "oilTtlWeight": this.form.oilTtlWeight,
                            "orderCode": this.form.orderCode,
                            "orderLine": this.form.orderLine,
                            "sheetCode": this.form.sheetCode,
                            "shipBillId": this.form.shipBillId,
                            "shipCode": this.form.shipCode,
                            "shipInd": this.form.shipInd,
                            "shipNameChn": this.form.shipNameChn,
                            "shipNameEng": this.form.shipNameEng,
                            "shipTtlVal": this.form.shipTtlVal,
                            "smtinoutBillId": this.form.smtinoutBillId,
                            "smtnNodeId": this.form.smtnNodeId,
                            "smtnNodeName": this.form.smtnNodeName,
                            "state": this.form.state,
                            "status": this.form.status,
                            "time": this.form.time,
                            "tradeTtlVal": this.form.tradeTtlVal,
                            "transTypeId": this.form.transTypeId,
                            "trnsLoss": this.form.trnsLoss,
                            "trnsLossRatio": this.form.trnsLossRatio,
                            "zxBegTime": this.form.zxBegTime,
                            "zxEndTime": this.form.zxEndTime,
                        }).then(response => {
                            this.$modal.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        this.$api.i_tankOutputFactoryMeasurementSheetAdd(this.form).then(response => {
                            this.$modal.msgSuccess("新增成功");
                            this.open = false;
                            this.getList();
                        });
                    }
                }
            });
        },
        /** 查询列表 */
        getList() {
            this.loading = true;
            this.$api.i_tankOutputFactoryMeasurementSheetSelece({
                "classes": this.queryParams.classes,
                "status": this.queryParams.status,
                "time": JSON.stringify(new Date(this.queryParams.time)).slice(1, 11)
            }).then(response => {
                this.dataList = response.rows.map(e => {
                    return {
                        ...e,
                        useFlag: String(e.useFlag)
                    }
                })
                this.total = response.total;
            }
            );
            this.loading = false;
        },
        //获取本方节点
        getOurNodes() {
            //本方节点
            this.$api.ourNode({
                rdTypeId: '',//操作类型 id
                unitId: '',//装置 id
            }).then(res => {
                this.ourNode = res.data.map(r => {
                    return {
                        label: r.NodeName,
                        value: r.NodeId,
                    }
                })
            })
        },
        //获取对方节点
        getOtherNodes() {
            //本方节点
            this.$api.otherNodes({
                isUsePhyModel: this.form.checked,//是否使用拓朴结构
                rdTypeId: '',//操作类型 id
                nodeId: '',//本方节点id
            }).then(res => {
                this.othersNode = res.data.map(r => {
                    return {
                        label: r.Name,
                        value: r.Key,
                    }
                })
            })
        },
        //仪表名称 改变
        selectBlur(e, row) {
            console.log('仪表名称 改变', e)
            console.log('仪表名称 改变', row)
            // row.InstrAliasEditable=false
            this.$modal.msgWarning("仪表已改变。请检查对应的侧线和物料信息是否正确。");
        },
        //解除关闭
        handleUnclose() {
            this.$message.success("解除关闭成功")
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
        /** 创建按钮操作 */
        handleCreate() {
            this.open = true;
        },
        handleClose(row) {
            const userIds = row.id || this.ids[0];
            this.$modal.confirm('是否确认删除"' + userIds + '"的数据项？').then(() => {
                this.$api.i_tankOutputFactoryMeasurementSheetClose({ id: userIds })
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => {
            });
        },
        /** 添加按钮操作 */
        handleAdd() {
            //判断需要增加的是 主数据 还是 侧线数据
            //侧线数据 this.expands.length > 0
            if (this.expands.length > 0) {
                let nowRowData = this.dataList.filter(e => e.SmtinoutBillId == this.expands[0])[0].ListSub1
                let nowChildData = nowRowData.length > 0 ? nowRowData[0] : {}
                this.dataList = this.dataList.map(e => {
                    console.log('map', e.ListSub1)
                    this.expands[0] ? e.ListSub1.push(nowChildData) : e.ListSub1
                    return {
                        ...e,
                    }
                })
            } else {
                //主数据
                if (this.ids.length == 0) {
                    this.msgError('请选择一天数据')
                } else if (this.ids.length > 1) {
                    this.msgError('请选择一天数据')
                } else {
                    let nowRowData = this.dataList.filter(e => e.SmtinoutBillId == this.ids[0])[0]
                    nowRowData.SmtinoutBillId = Math.floor((Math.random() * 8000) + 1)
                    this.dataList.push(nowRowData)

                    this.$refs.multipleTable.clearSelection();
                }
            }
        },
        /** 修改按钮操作 */
        handleUpdate(row) {
            const userId = row.id || this.ids[0];
            this.$api.i_nodeAreaById({ id: userId }).then(response => {
                this.form = response.data;
                this.open = true;
                this.title = "修改信息";
            });
        },
        /** 删除按钮操作 */
        handleDelete(row) {
            const userIds = row.id || this.ids[0];
            this.$modal.confirm('是否确认删除"' + userIds + '"的数据项？').then(() => {
                this.$api.i_tankOutputFactoryMeasurementSheetDelete({ id: userIds })
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => {
            });
        },
        //只展开一行
        expandColumn(row, expandedRows) {
            // 每次只展开一行
            let that = this;
            if (expandedRows.length) {
                that.expands = []
                if (row) {
                    that.expands.push(row.SmtinoutBillId)
                    this.single = false;
                }
            } else {
                that.expands = []
                this.single = true;
            }
        },
        //子数据删除
        handleChildDel(row, mIndex, index) {
            console.log('子数据删除', row, mIndex, index)
            this.$modal.confirm('是否确认删除选中的的数据项？').then(() => {
                row.ListSub1.splice(index, 1)
                this.$set(this.dataList, mIndex, row)
            }).then(() => {
                this.$modal.msgSuccess("删除成功");
            }).catch(() => {

            });
        },
        //查看物料组分
        handleMaterial() {
            this.nowMaterial = []
            this.dialogMaterialVisible = true
        },
        handleMaterial1() {
            this.nowMaterial1 = []
            this.dialogMaterialVisible1 = true
        }
    }
};
</script>
<style scoped>
.app-container {
    width: 100%;
    height: calc(100vh - 90px);
    min-height: calc(100vh - 90px);
    overflow-y: auto;
}
</style>
