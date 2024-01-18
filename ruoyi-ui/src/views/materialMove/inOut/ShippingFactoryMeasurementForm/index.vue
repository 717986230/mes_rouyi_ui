<template>
    <!-- 船运出厂计量单 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="60px">
            <el-form-item label="日期:" prop="time">
                <el-date-picker v-model="queryParams.time" format="yyyy-MM-dd" type="datetime" placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="班次:" prop="classes">
                <el-select size="mini" v-model="queryParams.classes" placeholder="班次" clearable>
                    <el-option v-for="dict in banCi" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="状态:" prop="status">
                <el-select size="mini" v-model="queryParams.status" placeholder="状态" clearable>
                    <el-option v-for="dict in SheetStateList" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="handleQuery">查询</el-button>
                <el-button size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5" v-show="this.queryParams.status == '0'">
                <el-button type="primary" plain size="mini" @click="handleAdd">创建</el-button>
            </el-col>
            <el-col :span="1.5" v-show="this.queryParams.status == '0'">
                <el-button type="success" plain size="mini" :disabled="single" @click="handleUpdate">维护</el-button>
            </el-col>
            <el-col :span="1.5" v-show="this.queryParams.status == '0'">
                <el-button type="success" plain size="mini" :disabled="single" @click="handleClose">关闭</el-button>
            </el-col>
            <el-col :span="1.5" v-show="this.queryParams.status == '0'">
                <el-button type="danger" plain size="mini" :disabled="single" @click="handleDelete">删除</el-button>
            </el-col>
            <el-col :span="1.5" v-show="this.queryParams.status == '1'">
                <el-button type="warning" plain icon="el-icon-delete" size="mini" :disabled="single"
                    @click="handleUnclose">解除关闭</el-button>
            </el-col>
        </el-row>
        <el-table v-loading="loading" :data="dataList" border @selection-change="handleSelectionChange">
            <el-table-column fixed="left" type="index" width="50" align="center" />
            <el-table-column fixed="left" type="selection" width="50" align="center" />
            <el-table-column fixed="left" label="单据编号" align="center" key="code" prop="code" />
            <el-table-column label="业务开始班次时间" align="center" sortable key="startTime" prop="startTime" width="160"
                :show-overflow-tooltip="true">
                <!-- <template slot-scope="scope">
                    {{ dayjs(scope.row.startTime).format('YYYY-MM-DD HH:mm:ss') }}
                </template> -->
            </el-table-column>
            <el-table-column label="业务结束班次时间" align="center" sortable key="endTime" prop="endTime" width="160"
                :show-overflow-tooltip="true">
                <!-- <template slot-scope="scope">
                    {{ dayjs(scope.row.endTime).format('YYYY-MM-DD HH:mm:ss') }}
                </template> -->
            </el-table-column>
            <el-table-column label="进出厂点" align="center" sortable key="inoutName" prop="inoutName"
                :show-overflow-tooltip="true" width="100" />
            <el-table-column label="船名" align="center" sortable key="shipName" prop="shipName"
                :show-overflow-tooltip="true" />
            <el-table-column label="提单总量" align="center" sortable key="propose" prop="propose" width="100"
                :show-overflow-tooltip="true" />
            <el-table-column label="商检总量" align="center" sortable key="inspection" prop="inspection" width="100" />
            <el-table-column label="自检总量" align="center" sortable key="selfTest" prop="selfTest" width="100" />
            <el-table-column label="途耗" align="center" sortable key="consume" prop="consume" />
            <el-table-column label="单据状态" align="center" sortable key="status" prop="status" width="100" />
            <el-table-column label="创建人" align="center" sortable key="createUser" prop="createUser" width="100" />
            <el-table-column label="创建时间" align="center" sortable key="createTime" prop="createTime" width="100">
                <!-- <template solt-scope="scope">
                    {{ dayjs(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss') }}
                </template> -->
            </el-table-column>
            <el-table-column label="关闭人" align="center" sortable key="closeUser" prop="closeUser" width="100" />
            <el-table-column label="关闭时间" align="center" sortable key="closeTime" prop="closeTime" width="100">
                <!-- <template solt-scope="scope">
                    {{ dayjs(scope.row.closeTime).format('YYYY-MM-DD HH:mm:ss') }}
                </template> -->
            </el-table-column>
            <el-table-column label="备注" align="center" sortable key="remark" prop="remark" width="100" />
        </el-table>
        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
            @pagination="getList" />
        <!-- 新增弹窗 -->
        <el-dialog :title="title" :visible.sync="open" width="1200px" append-to-body>
            <el-form ref="formDialog" :model="form" :rules="rules" label-width="120px">
                <el-row type="flex" justify="space-between">
                    <el-col :span="6">
                        <el-form-item label="进出厂点:" prop="classes">
                            <el-select :value="form.classes" value-key="label" style="width: 150px;" placeholder="进出厂点"
                                clearable size="mini">
                                <el-option v-for="dict in OpeTypeList" :key="dict.value" :label="dict.label"
                                    :value="dict" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="船名:" prop="shipName">
                            <el-select :value="form.shipName" value-key="label" style="width: 150px;" placeholder="船名"
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
                        <el-form-item label="开卸时间:" prop="startTime">
                            <el-date-picker v-model="form.startTime" size="mini" style="width: 150px;" type="datetime"
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
                        <el-form-item label="完货时间:" prop="endTime">
                            <el-date-picker v-model="form.endTime" style="width: 150px;" type="datetime" size="mini"
                                placeholder="完货时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="自检总量:" prop="selfTest">
                            <el-input v-model="form.selfTest" type="text" style="width: 150px;" size="mini"
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
                        <el-form-item label="途耗率:" prop="consume">
                            <el-input v-model="form.consume" placeholder="途耗率" style="width: 150px;" size="mini"
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
                        <el-form-item label="录入者:" prop="createUser">
                            <el-input size="mini" v-model="form.createUser" style="width: 150px;" placeholder="录入者"
                                maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="录入时间:" prop="createTime">
                            <el-date-picker v-model="form.createTime" size="mini" style="width: 150px;" type="datetime"
                                placeholder="录入时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="关闭者:" prop="closeUser">
                            <el-input size="mini" v-model="form.closeUser" style="width: 150px;" placeholder="关闭者"
                                maxlength="30" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="关闭时间:" prop="closeTime">
                            <el-date-picker v-model="form.closeTime" style="width: 150px;" size="mini" type="datetime"
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
                        <el-row :gutter="10" class="mb8">
                            <el-col :span="1.5">
                                <el-button type="primary" plain size="mini" @click="handleAdd">添加</el-button>
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
    name: "ShippingFactoryMeasurementForm",
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
                "classes": "0",
                "status": "0",
                "time": new Date()
            },
            // 表单校验
            rules: {
                OpeTypeId: [
                    { required: true, message: "请输入", trigger: "blur" },
                ]
            }
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
        this.getOther()
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
        //关闭
        handleClose(row) {
            const userIds = row.id || this.ids[0];
            this.$modal.confirm('是否确认关闭"' + userIds + '"的数据项？').then(() => {
                return this.$api.i_shipOutClose({ id: userIds })
            }).then(() => {
                this.$modal.msgSuccess("关闭成功");
                this.getList();
            }).catch(() => { });
        },
        //维护
        handleMaintenance() { },
        /** 删除按钮操作 */
        handleDelete(row) {
            const userIds = row.id || this.ids[0];
            this.$modal.confirm('是否确认删除"' + userIds + '"的数据项？').then(() => {
                return this.$api.i_shipOutDelete({ id: userIds })
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => { });
        },
        //关闭
        handleOff() {
            let uid = this.ids[0]
            this.$api.i_shipOutClose({ id: uid }).then(res => {
                if (res.data.code == 200) {
                    this.$message.success("关闭成功")
                    this.getList();
                } else {
                    this.$message.error(res.data.msg)
                }
            })
        },
        handleTankmetering() { },
        submitForm: function () {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.form.id != undefined) {
                        this.$api.i_shipOutAdd({
                            "classes": this.form.classes,
                            "closeTime": this.form.closeTime,
                            "closeUser": this.form.closeUser,
                            "code": this.form.code,
                            "consume": this.form.consume,
                            "createTime": this.form.createTime,
                            "createUser": this.form.createUser,
                            "endTime": this.form.endTime,
                            "id": this.form.id,
                            "inoutName": this.form.inoutName,
                            "inspection": this.form.inspection,
                            "propose": this.form.propose,
                            "remark": this.form.remark,
                            "selfTest": this.form.selfTest,
                            "shipName": this.form.shipName,
                            "startTime": this.form.startTime,
                            "status": this.form.status,
                            "time": this.form.time,
                        }).then(response => {
                            this.$modal.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        this.$api.i_shipOutAdd(this.form).then(response => {
                            this.$modal.msgSuccess("新增成功");
                            this.open = false;
                            this.getList();
                        });
                    }
                }
            });
        },
        /** 查询用户列表 */
        getList() {
            this.loading = true;
            this.$api.i_shipOutSelece(
                {
                    "classes": this.queryParams.classes,
                    "status": this.queryParams.status,
                    "time": JSON.stringify(new Date(this.queryParams.time)).slice(1, 11)
                }
            ).then(res => {
                this.dataList = res.rows
                this.total = res.total;
            });
            this.loading = false;
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
        },
        // 表单重置
        reset() {
            this.form = {
                "classes": "",
                "closeTime": "",
                "closeUser": "",
                "code": "",
                "consume": "",
                "createTime": "",
                "createUser": "",
                "endTime": "",
                "id": undefined,
                "inoutName": "",
                "inspection": "",
                "propose": "",
                "remark": "",
                "selfTest": "",
                "shipName": "",
                "startTime": "",
                "status": "",
                "time": ""
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
