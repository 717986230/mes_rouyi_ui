<template>
    <!-- 统计指标同步配置 -->
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="100px">
            <el-form-item label="报表:" style="margin-left: -20px;" prop="reportId">
                <el-select v-model="queryParams.reportId" placeholder="报表" clearable>
                    <el-option v-for="dict in reportList" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="指标:" style="margin-left: -20px;" prop="indicatorId">
                <el-select v-model="queryParams.indicatorId" placeholder="指标" clearable>
                    <el-option v-for="dict in indexList" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" plain size="mini" @click="handleQuery">查询</el-button>
                <el-button type="primary" plain size="mini" @click="handleSave">保存</el-button>
                <el-button type="success" plain size="mini" @click="handleAddmateriel">添加</el-button>
                <el-button type="danger" plain size="mini" @click="handleDelete">删除</el-button>
                <el-button size="mini" plain @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table border v-loading="loading" :data="dataListTC" @selection-change="handleSelectionChange"
            @cell-dblclick="handleCellDblClick">
            <el-table-column fixed="left" type="selection" width="50" align="center" />
            <el-table-column fixed="left" type="index" width="50" align="center" />
            <el-table-column label="报表" align="center" prop="reportId" key="reportId">
                <template slot-scope="scope">
                    <div @click="scope.row.Editable = true" v-if="!scope.row.Editable" style="width: 100%;height: 30px;">
                        {{
                            scope.row.report
                        }}
                    </div>
                    <el-select v-else v-model="scope.row.report" value-key="label" clearable
                        @change=" scope.row.Editable = false, scope.row.report = $event.label, scope.row.reportId = $event.value">
                        <el-option v-for="dict in reportList" :key="dict.value" :label="dict.label" :value="dict" />
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="指标" align="center" key="indicatorId" prop="indicatorId">
                <template slot-scope="scope">
                    <div @click="scope.row.Editable1 = true" v-if="!scope.row.Editable1" style="width: 100%;height: 30px;">
                        {{
                            scope.row.indicator
                        }}
                    </div>
                    <el-select v-else v-model="scope.row.indicator" clearable
                        @change="scope.row.Editable1 = false, scope.row.indicator = $event.label, scope.row.indicatorId = $event.value">
                        <el-option v-for=" dict in indexList" :key="dict.value" :label="dict.label" :value="dict" />
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="装置" align="center" key="unitId" prop="unitId">
                <template slot-scope="scope">
                    <div @click="scope.row.Editable2 = true" v-if="!scope.row.Editable2" style="width: 100%;height: 30px;">
                        {{
                            scope.row.unit
                        }}
                    </div>
                    <el-select v-else v-model="scope.row.unit" clearable
                        @change="scope.row.Editable2 = false, scope.row.unit = $event.label, scope.row.unitId = $event.value">
                        <el-option v-for=" dict in unitListall" :key="dict.value" :label="dict.label" :value="dict" />
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="物料" align="center" key="mtrlId" prop="mtrlId">
                <template slot-scope="scope">
                    <div @click="scope.row.Editable3 = true" v-if="!scope.row.Editable3" style="width: 100%;height: 30px;">
                        {{
                            scope.row.mtrl
                        }}
                    </div>
                    <el-select v-else v-model="scope.row.mtrl" clearable
                        @change="scope.row.Editable3 = false, scope.row.mtrl = $event.label, scope.row.mtrlId = $event.value">
                        <el-option v-for=" dict in mtrAllList" :key="dict.value" :label="dict.label" :value="dict" />
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="指标分类" align="center" key="indicatorCategoryId" prop="indicatorCategoryId">
                <template slot-scope="scope">
                    <div @click="scope.row.Editable4 = true" v-if="!scope.row.Editable4" style="width: 100%;height: 30px;">
                        {{
                            scope.row.indicatorCategory
                        }}
                    </div>
                    <el-select v-else v-model="scope.row.indicatorCategory" clearable
                        @change="scope.row.Editable4 = false, scope.row.indicatorCategory = $event.label, scope.row.indicatorCategoryId = $event.value">
                        <el-option v-for=" dict in indexTypeList" :key="dict.value" :label="dict.label" :value="dict" />
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="期间类型" align="center" key="periodTypeId" prop="periodTypeId">
                <template slot-scope="scope">
                    <div @click="scope.row.Editable5 = true" v-if="!scope.row.Editable5" style="width: 100%;height: 30px;">
                        {{
                            scope.row.periodType
                        }}
                    </div>
                    <el-select v-else v-model="scope.row.periodType" clearable
                        @change="scope.row.Editable5 = false, scope.row.periodType = $event.label, scope.row.periodTypeId = $event.value">
                        <el-option v-for="dict in formulaTypeList" :key="dict.value" :label="dict.label" :value="dict" />
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="数据类型" align="center" key="dataTypeId" prop="dataTypeId">
                <template slot-scope="scope">
                    <div @click="scope.row.Editable6 = true" v-if="!scope.row.Editable6" style="width: 100%;height: 30px;">
                        {{
                            scope.row.dataType
                        }}
                    </div>
                    <el-select v-else v-model="scope.row.dataType" clearable
                        @change="scope.row.Editable6 = false, scope.row.dataType = $event.label, scope.row.dataTypeId = $event.value">
                        <el-option v-for="
                    dict in dataTypeList" :key="dict.value" :label="dict.label" :value="dict" />
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="是否收率" align="center" prop="isYield">
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.isYield" false-value="0" true-value="1"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="顺序" sortable align="center" key="displayOrder" prop="displayOrder"
                :show-overflow-tooltip="true">
            </el-table-column>
        </el-table>
        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
            @pagination="getList" />
    </div>
</template>
<script>
export default {
    name: "StatisticalIndicatorSynchronizationConfiguration",
    data() {
        return {
            checked: false,
            FactoryList: [],//工厂下拉列表
            selectedFile: null, // Add this property
            Upfile: "",//上传文件名称
            sideLineList: [],//弹窗选择数据
            // 遮罩层
            loading: false,
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
            dataList: [],
            dataListTC: [],
            // 弹出层标题
            title: "",
            // 表单参数
            form: {
                "dataType": "",
                "dataTypeId": undefined,
                "displayOrder": 0,
                "id": undefined,
                "indicator": "",
                "indicatorCategory": "",
                "indicatorCategoryId": undefined,
                "indicatorId": undefined,
                "mtrl": "",
                "mtrlId": undefined,
                "periodType": "",
                "periodTypeId": undefined,
                "report": "",
                "reportId": undefined,
                "unit": "",
                "unitId": undefined,
                "useFlag": "1",
            },
            open: false,
            // 查询参数
            queryParams: {
                // "id": undefined,
                "indicatorId": "",
                // "isAsc": "",
                // "orderByColumn": "",
                // "reasonable": true,
                "reportId": "",
                "pageNum": 1,
                "pageSize": 10
            },
            // 表单校验
            rules: {},
            dataTypeList: [],//数据类型列表
            indexList: [],//指标列表
            indexTypeList: [],//指标分类列表
            formulaTypeList: [],//期间类型列表
            reportList: [],//报表列表
            mtrAllList: [],// 物料
            unitListall: [],//装置
            CanList: [],//原数据
        };
    },
    watch: {},
    created() {
        this.getList();
        this.getOther();
    },
    methods: {

        getOther() {
            //数据类型列表
            this.$api.P_reportFormDateTypeList({}).then(res => {
                this.dataTypeList = res.data.map(e => {
                    return {
                        label: e.name,
                        value: e.id
                    }
                })
            })
            //指标
            this.$api.P_reportFormIndexList({}).then(res => {
                this.indexList = res.data.map(e => {
                    return {
                        label: e.name,
                        value: e.id
                    }
                })
            })
            //指标分类
            this.$api.P_reportFormIndexTypeList({}).then(res => {
                this.indexTypeList = res.data.map(e => {
                    return {
                        label: e.name,
                        value: e.id
                    }
                })
            })
            //期间类型
            this.$api.P_reportFormPeriodList({}).then(res => {
                this.formulaTypeList = res.data.map(e => {
                    return {
                        label: e.name,
                        value: e.id
                    }
                })
            })
            //报表
            this.$api.P_reportFormSelect().then(res => {
                this.reportList = res.data.map(e => {
                    return {
                        label: e.name,
                        value: e.id
                    }
                })
            })
            //装置
            this.$api.i_unitListall({ "unitName": "" }).then(res => {
                this.unitListall = res.data.map(e => {
                    return {
                        label: e.unitName,
                        value: e.id
                    }
                })
            })
            //物料
            this.$api.i_mtrAllList().then(res => {
                this.mtrAllList = res.data.map(e => {
                    return {
                        label: e.name,
                        value: e.id
                    }
                })
            })
            //工厂下拉列表
            this.$api.i_MESFactoryAllList().then(res => {
                this.FactoryList = res.data.map(e => {
                    return {
                        label: e.label,
                        value: e.value
                    }
                })
            })
        },
        Cancel() {
            this.open = false
        },
        verify() {
            this.open = false
        },
        handleNodeClick() { },

        handleTCedit() {
            this.open = true
            this.title = "选择物料树"
        },
        handleClose(done) {
            done()
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
            this.$api.P_indexSynList(this.queryParams).then(res => {
                // let subList = res.subList
                // let Listam = List.map(e => {
                //     return {
                //         ...e,
                //         subList: subList.filter(k => e.RecId == k.ClsRecId)
                //     }
                // })

                this.dataListTC = res.rows.map(p => {
                    return {
                        ...p,
                        ...{
                            Editable: false,
                            Editable1: false,
                            Editable2: false,
                            Editable3: false,
                            Editable4: false,
                            Editable5: false,
                            Editable6: false,
                            // subList: p.subList.map(r => {
                            //     return {
                            //         ...r,
                            //         ...{
                            //             editable: false,
                            //             editable1: false,
                            //         }
                            //     }
                            // })
                        }
                    }
                })
                this.CanList = JSON.parse(JSON.stringify(this.dataListTC))
                // this.dataListTC = [
                //     {
                //         id: 1,
                //         reportId: "32",
                //         report: "12",
                //         indicatorId: "11",
                //         indicator: "12",
                //         unitId: "2",
                //         unit: "3",
                //         mtrlId: "1",
                //         mtrl: "12",
                //         indicatorCategoryId: '22',
                //         indicatorCategory: "22",
                //         periodTypeId: "12",
                //         periodType: "212",
                //         dataTypeId: "22",
                //         dataType: "12",
                //         isYield: "1",
                //         displayOrder: "1",
                //         Editable: false,
                //         Editable1: false,
                //         Editable2: false,
                //         Editable3: false,
                //         Editable4: false,
                //         Editable5: false,
                //         Editable6: false,
                //     },
                //     {
                //         id: 2,
                //         reportId: "112",
                //         report: "12",
                //         indicatorId: "11",
                //         indicator: "12",
                //         unitId: "2",
                //         unit: "3",
                //         mtrlId: "1",
                //         mtrl: "12",
                //         indicatorCategoryId: '22',
                //         indicatorCategory: "22",
                //         periodTypeId: "12",
                //         periodType: "212",
                //         dataTypeId: "22",
                //         dataType: "12",
                //         isYield: "1",
                //         displayOrder: "2",
                //         Editable: false,
                //         Editable1: false,
                //         Editable2: false,
                //         Editable3: false,
                //         Editable4: false,
                //         Editable5: false,
                //         Editable6: false,
                //     }
                // ]
            }
            );
            this.loading = false;
        },

        // 取消按钮
        cancel() {
            this.open = false;
            this.reset();
        },
        // 表单重置
        reset() {
            this.form = {
                "dataType": "",
                "dataTypeId": undefined,
                "displayOrder": 0,
                "id": undefined,
                "indicator": "",
                "indicatorCategory": "",
                "indicatorCategoryId": undefined,
                "indicatorId": undefined,
                "mtrl": "",
                "mtrlId": undefined,
                "periodType": "",
                "periodTypeId": undefined,
                "report": "",
                "reportId": undefined,
                "unit": "",
                "unitId": undefined,
                "useFlag": "1",
            };
            this.resetForm("form");
        },
        //保存按钮
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
            const isDataChanged = compareArrays(this.dataListTC, this.CanList);
            if (!isDataChanged) {
                this.$message.error("没有添加或修改需要保存的数据!")
            } else {
                this.$message.error("数据改变!")
                this.submitForm()

            }
            let isEdit = false
            if (isEdit) {
                this.$message.error("没有添加或修改需要保存的数据!")
            }
        },
        /** 搜索按钮操作 */
        handleQuery() {
            this.queryParams.pageNum = 1;
            this.getList();
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.$refs['queryForm'].resetFields();
            this.dataListTC = this.CanList
            this.queryParams = {
                "indicatorId": "",
                "reportId": "",
                "pageNum": 1,
                "pageSize": 10
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
            let rows = this.dataListTC
            if (rows[0].id != undefined) {
                this.$api.P_indexSynSaveOrUpdata({
                    "dataType": rows[0].dataType,
                    "dataTypeId": rows[0].dataTypeId,
                    "displayOrder": rows[0].displayOrder,
                    "id": rows[0].id,
                    "indicator": rows[0].indicator,
                    "indicatorCategory": rows[0].indicatorCategory,
                    "indicatorCategoryId": rows[0].indicatorCategoryId,
                    "indicatorId": rows[0].indicatorId,
                    "mtrl": rows[0].mtrl,
                    "mtrlId": rows[0].mtrlId,
                    "periodType": rows[0].periodType,
                    "periodTypeId": rows[0].periodTypeId,
                    "report": rows[0].report,
                    "reportId": rows[0].reportId,
                    "unit": rows[0].unit,
                    "unitId": rows[0].unitId,
                    "useFlag": rows[0].useFlag,
                }).then(response => {
                    this.$modal.msgSuccess("修改成功");
                    this.open = false;
                    this.getList();
                });
            } else {
                this.$api.P_indexSynSaveOrUpdata({
                    "dataType": rows[0].dataType,
                    "dataTypeId": rows[0].dataTypeId,
                    "displayOrder": rows[0].displayOrder,
                    "id": undefined,
                    "indicator": rows[0].indicator,
                    "indicatorCategory": rows[0].indicatorCategory,
                    "indicatorCategoryId": rows[0].indicatorCategoryId,
                    "indicatorId": rows[0].indicatorId,
                    "mtrl": rows[0].mtrl,
                    "mtrlId": rows[0].mtrlId,
                    "periodType": rows[0].periodType,
                    "periodTypeId": rows[0].periodTypeId,
                    "report": rows[0].report,
                    "reportId": rows[0].reportId,
                    "unit": rows[0].unit,
                    "unitId": rows[0].unitId,
                    "useFlag": rows[0].useFlag,
                }).then(response => {
                    this.$modal.msgSuccess("保存成功");
                    this.open = false;
                    this.getList();
                });
            }
        },
        handleAddmateriel() {
            this.dataListTC.unshift({
                id: "",
                reportId: "",
                report: "",
                indicatorId: "",
                indicator: "",
                unitId: "",
                unit: "",
                mtrlId: "",
                mtrl: "",
                indicatorCategoryId: "",
                indicatorCategory: "",
                periodTypeId: "",
                periodType: "",
                dataTypeId: "",
                dataType: "",
                isYield: "",
                displayOrder: this.dataListTC.length + 1,
                Editable: true,
                Editable1: true,
                Editable2: true,
                Editable3: true,
                Editable4: true,
                Editable5: true,
                Editable6: true,
            })
        },

        /** 删除按钮操作 */
        handleDelete(row) {
            const userIds = row.id || this.ids[0];
            this.$modal.confirm('是否确认删除"' + userIds + '"的数据项？').then(() => {
                this.$api.P_indexSynDelete({ id: userIds })
            }).then(() => {
                this.$modal.msgSuccess("删除成功");
                this.getList();
            }).catch(() => { });
        },
    }
};
</script>
<style lang="scss" scoped>
::v-deep .el-dialog__body {
    padding: 0;
}

::v-deep .el-card__body {
    padding: 0 !important;
}

.selectedtop {
    background-color: rgb(175, 175, 175);
    color: white;
}

.treeboxflex {
    margin: 10px auto;
    width: 200px;
}
</style>
