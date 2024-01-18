<template>
    <!-- 进出厂班量 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="50px">
            <el-form-item label="日期:" prop="time">
                <div class="block">
                    <el-date-picker v-model="queryParams.time" type="datetime" placeholder="选择日期">
                    </el-date-picker>
                </div>
            </el-form-item>
            <el-form-item label="班次:" prop="classes">
                <el-select v-model="queryParams.classes" placeholder="班次" clearable>
                    <el-option v-for="dict in Banci" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="success" size="mini" @click="handleWithdraw">提取</el-button>
                <el-button type="primary" size="mini" @click="handleQuery">查询</el-button>
                <el-button size="mini" @click="resetQuery">保存</el-button>
                <el-button type="primary" plain size="mini" @click="handleResetting"
                    style="margin-left: 200px;">复位</el-button>
                <el-button type="success" plain size="mini" :disabled="single" @click="handleUpdate">提交</el-button>
                <el-button type="danger" plain size="mini" :disabled="single" @click="handleUnsubmit">解除提交</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="dataListTC" style="width: 100%;margin-bottom: 20px;" border
            @selection-change="handleSelectionChange">
            <el-table-column fixed="left" type="selection" align="center" />
            <el-table-column fixed="left" prop="props" type="expand">
                <template slot-scope="props">
                    <div style="padding: 0px 50px">
                        <el-table :data="props.row.subList" :row-class-name="tableRowClassName">
                            <el-table-column fixed="left" type="index" align="center" />
                            <el-table-column label="类型" align="center" prop="GaugeType" width="130" />
                            <el-table-column label="计量名称" align="center" prop="GaugeName" width="130">
                            </el-table-column>
                            <el-table-column label="前后差值" align="center" prop="PreVal" width="130">
                            </el-table-column>
                            <el-table-column label="前量" align="center" prop="DftFlg" width="130">
                            </el-table-column>
                            <el-table-column label="前量时间" align="center" prop="DftFlg" width="130">
                                <template slot-scope="scope">
                                    {{ dayjs(scope.row.DftTime).format("YYYY-MM-DD HH:mm:ss") }}
                                </template>
                            </el-table-column>
                            <el-table-column label="后量" align="center" prop="DftFlg" width="130">
                            </el-table-column>
                            <el-table-column label="后量时间" align="center" prop="DftFlg" width="130">
                                <template slot-scope="scope">
                                    {{ dayjs(scope.row.DftTime).format("YYYY-MM-DD HH:mm:ss") }}
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </template>
            </el-table-column>
            <el-table-column fixed="left" label="状态" align="center" key="state" sortable>
                <template slot-scope="scope">
                    {{ scope.row.state }}
                </template>
            </el-table-column>
            <el-table-column label="进出厂点名称" width="130" align="center" sortable key="nodeAlias" prop="nodeAlias"
                :show-overflow-tooltip="true" />
            <el-table-column label="物料名称" align="center" width="100" sortable key="mtrlAlias" prop="mtrlAlias"
                :show-overflow-tooltip="true" />
            <el-table-column label="原始量" align="center" width="100" sortable key="instrData" prop="instrData"
                :show-overflow-tooltip="true" />
            <el-table-column label="确认量" align="center" width="100" key="billData" sortable :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <div @click="toggleRowVisibility(scope.row)">
                        <span v-if="!scope.row.Editable"> {{
                            scope.row.billData
                        }}</span>
                        <el-input v-else ref="usernameRef" v-model="scope.row.billData" @blur="handleBlur(scope.row)"
                            autofocus />
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="罐量" align="center" sortable key="tankData" prop="tankData"
                :show-overflow-tooltip="true" />
            <el-table-column label="仪表量" align="center" sortable key="affData" prop="affData" width="120" />
            <el-table-column label="侧线量" align="center" sortable key="formulaData" prop="formulaData" width="130" />
            <el-table-column label="计量单位" align="center" sortable key="gaugeTranData" prop="gaugeTranData" width="120" />
            <el-table-column label="槽车量" align="center" sortable prop="gaugeCarData" key="gaugeCarData" width="160">
            </el-table-column>
            <el-table-column label="轨道衡量" align="center" sortable key="sideLineData" prop="sideLineData" width="120" />
            <el-table-column label="汽车衡量" align="center" sortable key="gaugeCcData" prop="gaugeCcData" width="120" />
            <el-table-column label="计量公式量" align="center" sortable key="rawData" prop="rawData" width="120" />
            <el-table-column label="录入人" align="center" sortable key="crtUser" prop="crtUser" width="120" />
            <el-table-column label="录入时间" align="center" sortable key="periodBegTime" prop="periodBegTime" width="120">
                <template slot-scope="scope">
                    {{ dayjs(scope.row.periodBegTime).format("YYYY-MM-DD HH:mm:ss") }}
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="提交状态" align="center" sortable key="smtState" prop="smtState" width="120">
                <template slot-scope="scope">
                    {{ scope.row.smtState == 0 ? "已提交" : "未提交" }}
                </template>
            </el-table-column>
        </el-table>
        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
            @pagination="getList" />
    </div>
</template>
<script>
export default {
    name: "factoryInOut",
    components: {},
    data() {
        return {
            dataListTC: [],
            dataList: [],
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
            // 用户表格数据
            userList: null,
            // 弹出层标题
            title: "",
            // 表单参数
            form: {},
            // 查询参数
            queryParams: {
                "classes": "0",
                "time": JSON.stringify(new Date(new Date())).slice(1, 11),
            },
            // expands: [], // 只展开一行放入当前行id
            // getRowKeys: (row) => { // 获取当前行id
            //     return row.RecId || ''; // 这里看这一行中需要根据哪个属性值是id
            // },
        };
    },
    watch: {},
    created() {
        this.getOther();
    },
    mounted() {
    },
    methods: {
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
            this.$api.i_factoryInOutSelece(this.queryParams).then(res => {
                this.dataListTC = res.rows.map(e => {
                    return {
                        ...e,
                        Editable: false,
                    }
                })  //RecId
                this.total = res.total
                this.loading = false;
            }
            );
        },
        getOther() {

        },
        //提取点击提取获取数据
        handleWithdraw() {
            if (this.queryParams.classes == "0") {
                this.$modal.confirm('未到末班,不能操作!').then(() => {
                })
            } else {
                this.getList()
            }
        },
        //复位
        handleResetting() {
            this.queryParams.classes = "0"
            this.queryParams.dateRange = new Date()
            this.dataListTC = []
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
            if (this.queryParams.classes == "0") {
                return
            } else {
                this.queryParams.pageNum = 1;
                this.getList();
            }
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
        /** 提交按钮操作 */
        handleUpdate() {
            const uids = this.ids[0];
            if (uids) {
                this.getList()
            } else {
                this.$modal.confirm('选中的数据中有未保存的,不能提交').then(() => { })
            }
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
        handleUnsubmit(row) {
            const userIds = row.id || this.ids[0];
            this.$modal.confirm('是否确认解除提交？').then(() => {
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("解除提交成功");
            }).catch(() => { });
        },
    }
};
</script>
