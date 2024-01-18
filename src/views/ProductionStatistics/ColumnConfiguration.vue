<template>
    <!-- 物料平衡表列组态 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="100px">
            <el-form-item label="MES工厂:" style="margin-left: -20px;" prop="factoryList">
                <el-select v-model="queryParams.factoryList" placeholder="MES工厂" clearable>
                    <el-option v-for="dict in FactoryList" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="平衡表:" prop="cid">
                <el-select v-model="queryParams.cid" placeholder="平衡表" clearable>
                    <el-option v-for="dict in balanceItemsOptions" :key="dict.value" :label="dict.label"
                        :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" plain size="mini" @click="handleQuery">查询</el-button>
                <el-button type="success" plain size="mini" @click="handleSave">保存</el-button>
                <el-button type="primary" plain size="mini" @click="handleAdd">添加</el-button>
                <el-button type="danger" plain size="mini" @click="handleDelete" :disabled="single">删除</el-button>
                <el-button size="mini" plain @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table border v-loading="loading" :data="dataListTC" @selection-change="handleSelectionChange"
            @cell-dblclick="handleCellDblClick">
            <el-table-column fixed="left" type="selection" width="50" align="center" />
            <el-table-column label="平衡项" align="center" key="NodeAliasId" prop="NodeAlias">
                <template slot-scope="scope">
                    <div v-if="!scope.row.Editable" @click="scope.row.Editable = true" style="width: 100%;height: 30px;"> {{
                        scope.row.NodeAlias }}
                    </div>
                    <el-select v-else v-model="scope.row.NodeAlias" placeholder="请选择" value-key="label" style="width: 100%;"
                        @change=" scope.row.Editable = false, scope.row.NodeAlias = $event.label, scope.row.NodeAliasId = $event.value">
                        <el-option v-for="its in balanceItemsOptions" :key="its.value" :label="its.label"
                            :value="its"></el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="顺序" sortable align="center" key="FormulaDataId" prop="FormulaData"
                :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <div v-if="!scope.row.Editable1" @click="scope.row.Editable1 = true" style="width: 100%;height: 30px;">
                        {{
                            scope.row.FormulaData }}
                    </div>
                    <el-input v-else ref="usernameRef" v-model="scope.row.FormulaData" @blur="scope.row.Editable1 = false"
                        autofocus />
                </template>
            </el-table-column>
        </el-table>
        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
            @pagination="getList" />
        <!-- 新增信息 -->
        <el-dialog :title="title" :visible.sync="open" width="600px" align append-to-body>
            <el-form ref="form" :model="form" :rules="rules">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="" prop="mtrlName">
                            <el-input v-model="form.mtrlName" maxlength="11" @keyup.enter.native="handleQuery" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" style="margin-left:10px ;">
                        <div class="dialog-footer">
                            <el-button type="primary" @click="submitForm">确 定</el-button>
                            <el-button @click="cancel">取 消</el-button>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-card style="border: 1px solid #666;">
                        <div class="card-body">
                            <table class="ulcss">
                                <tr class="cs" v-for=" e in sideLineList" @click="handleTopItemSelected(e)"
                                    :class="{ selectedtop: form.mtrlId == e.id }" style=" display: block;width: 100%;">
                                    <td>
                                        {{ e.name }}
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </el-card>
                </el-row>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: "ColumnConfiguration",
    data() {
        return {
            balanceItemsOptions: [],
            open: false,
            sideLineList: [],//弹窗选择数据
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
            dataList: [],
            dataListTC: [],
            // 弹出层标题
            title: "",
            // 表单参数
            form: {},
            FactoryList: [],//mes工厂
            Banci: [{
                label: "白班|08:00:00-20:00:00",
                value: "0"
            }, {
                label: "夜班|20:00:00-08:00:00",
                value: "1"
            }],
            // 查询参数
            queryParams: {
                factoryList: "",
                "id": undefined,
                "isAsc": "",
                "mtrlId": undefined,
                "orderByColumn": "",
                "pageNum": 1,
                "pageSize": 10,
                "reasonable": true,
                tankName1: "",
            },
            // 表单校验
            rules: {},
            iseditdata: [],
        };
    },
    watch: {},
    created() {
        this.getList();
        this.getOther()
    },
    methods: {
        getOther() {
            //工厂下拉列表
            this.$api.i_MESFactoryAllList().then(res => {
                this.FactoryList = res.data.map(e => {
                    return {
                        label: e.mesFctrName,
                        value: e.mesFctrId
                    }
                })
            })
            //平衡项下拉列表
            this.$api.P_balanceList().then(res => {
                this.balanceItemsOptions = res.data.map(r => {
                    return {
                        label: r.name,
                        value: r.id
                    }
                })
            })
        },
        //保存
        handleSave() {
            function compareArrays(arr1, arr2) {
                // 比较数组长度
                if (arr1.length !== arr2.length) {
                    return "数组长度不相同";
                }
                for (let i = 0; i < arr1.length; i++) {
                    const item1 = arr1[i];
                    const item2 = arr2[i]
                    // 比较两个对象是否相同
                    if (JSON.stringify(item1) !== JSON.stringify(item2)) {
                        return `元素 ${i + 1} 有变化:\n${JSON.stringify(item1)}\n${JSON.stringify(item2)}`;
                    }
                }
                return false;
            }
            console.log(this.iseditdata, this.dataListTC);
            const isDataChanged = compareArrays(this.iseditdata, this.dataListTC);
            if (!isDataChanged) {
                this.$message.error("没有添加或修改需要保存的数据!")
            } else {
                this.$message.success("保存成功!")
            }
            let isEdit = false
            if (isEdit) {
                this.$message.error("没有添加或修改需要保存的数据!")
            }
        },
        //双击修改
        toggleRowVisibility(row) {
            row.Editable = true;
        },
        toggleRowVisibility1(row) {
            row.Editable1 = true;
        },
        //失焦事件
        handleBlur(row) {
            row.Editable = false;
        },
        handleBlur1(row) {
            row.Editable1 = false
        },
        handleTopItemSelected(row) {
            this.form.mtrlName = row.name; // Update the selected index
            this.form.mtrlId = row.id
        },
        handleCellDblClick(row, column, event) {
            // Check if the double-clicked cell is in the "mtrlId" column
            if (column.property === 'mtrlName') {
                this.handleEdit(row);
            }
        },
        handleEdit(row) {
            this.reset();
            if (row.id) {
                this.$api.i_mtrlTemVcfByid({ id: row.id }).then(response => {
                    this.form = response.data;
                });
            }
            this.open = true;
            this.title = "物料"
        },
        /** 查询用户列表 */
        getList() {
            this.loading = true;
            this.$api.GetShiftSmtMainSubData(this.queryParams).then(res => {
                let List = res.list  //RecId
                let subList = res.subList  //ClsRecId
                let Listam = List.map(e => {
                    return {
                        ...e,
                        subList: subList.filter(k => e.RecId == k.ClsRecId)
                    }
                })
                this.dataList = Listam.map(p => {
                    return {
                        ...p,
                        ...{
                            Editable: false,
                            Editable1: false,
                            subList: p.subList.map(r => {
                                return {
                                    ...r,
                                    ...{
                                        editable: false,
                                        editable1: false,
                                    }
                                }
                            })
                        }
                    }
                })
                this.dataListTC = this.dataList.slice(0, 5);
                this.iseditdata = JSON.parse(JSON.stringify(this.dataList.slice(0, 5)));

                this.total = this.dataList.length
                console.log(this.dataListTC, "数据收拾收拾");
                this.loading = false;
            }
            );
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
                "mtrlId": undefined,
                "temperature": "",
                "vcfVal": "",
                mtrlName: ""
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
        /** 提交按钮 */
        submitForm: function () {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.form.id != undefined) {
                        this.$api.i_mtrlTemVcfSU({
                            "id": this.form.id,
                            "mtrlId": this.form.mtrlId,
                            "temperature": this.form.temperature,
                            "vcfVal": this.form.vcfVal,
                        }).then(response => {
                            this.$modal.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        this.$api.i_mtrlTemVcfSU(this.form).then(response => {
                            this.$modal.msgSuccess("新增成功");
                            this.open = false;
                            this.getList();
                        });
                    }
                }
            });
        },
        /** 新增按钮操作 */
        handleAdd() {
            this.dataListTC.push({
                "id": undefined,
                "mtrlId": undefined,
                "temperature": "",
                "vcfVal": "",
                Editable1: true,
                Editable: true,

            })
            this.reset();
            // this.title = "添加信息";
            // this.open = true;
        },
        /** 修改按钮操作 */
        handleUpdate(row) {
            this.reset();
            const userId = row.id || this.ids[0];
            this.$api.i_mtrlTemVcfByid({ id: userId }).then(response => {
                this.form = response.data;
                this.open = true;
                this.title = "修改信息";
            });
        },
        /** 删除按钮操作 */
        handleDelete(row) {
            const userIds = row.id || this.ids[0];
            this.$modal.confirm('是否确认删除"' + userIds + '"的数据项？').then(() => {
                this.$api.P_mtrlCloumuConfigurationDelete({ id: userIds })
            }).then(() => {
                this.$modal.msgSuccess("删除成功");
                this.getList();
            }).catch(() => { });
        },
    }
};
</script>
<style lang="scss" scoped>
::v-deep .el-card__body {
    padding: 0 !important;
}

.selectedtop {
    background-color: rgb(175, 175, 175);
    color: white;
}
</style>
